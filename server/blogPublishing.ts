import type { Express, Request, Response, NextFunction } from "express";
import { z } from "zod";
import crypto from "crypto";
import dns from "dns/promises";
import net from "net";
import sanitizeHtml from "sanitize-html";
import rateLimit from "express-rate-limit";
import { db } from "./db";
import { blogArticles, blogImages, type BlogArticle } from "@shared/schema";
import { eq, and, lte, desc, or, inArray } from "drizzle-orm";
import { STATIC_BLOG_SLUGS } from "./staticBlogSlugs";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10 MB
const MAX_IMAGES_PER_ARTICLE = 12;
const PUBLIC_SITE_URL = () =>
  (process.env.PUBLIC_SITE_URL || "https://adapy.com").replace(/\/+$/, "");

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------

const imageObject = z.object({
  url: z.string().max(2048).optional(),
  sourceUrl: z.string().max(2048).optional(),
  alt: z.string().max(500).optional(),
  caption: z.string().max(1000).optional(),
});

export const publishRequestSchema = z.object({
  externalId: z.string().min(1).max(200),
  title: z.string().min(1).max(300),
  slug: z
    .string()
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase letters, numbers, and hyphens.")
    .optional(),
  excerpt: z.string().min(1).max(1000),
  content: z.string().min(1).max(400_000),
  contentFormat: z.literal("html").default("html"),
  author: z
    .object({
      name: z.string().min(1).max(120),
      displayName: z.string().max(120).optional(),
    })
    .default({ name: "Adapy" }),
  featuredImage: imageObject.optional(),
  inlineImages: z.array(imageObject).max(MAX_IMAGES_PER_ARTICLE).optional(),
  categories: z.array(z.string().max(100)).max(10).optional(),
  tags: z.array(z.string().max(100)).max(25).optional(),
  seo: z
    .object({
      metaTitle: z.string().max(300).optional(),
      metaDescription: z.string().max(500).optional(),
      keywords: z.array(z.string().max(100)).max(25).optional(),
    })
    .optional(),
  status: z.enum(["published", "scheduled", "draft"]).default("published"),
  publishAt: z
    .string()
    .refine((v) => !Number.isNaN(Date.parse(v)), "publishAt must be a valid ISO 8601 date.")
    .optional(),
});

export type PublishRequest = z.infer<typeof publishRequestSchema>;

// ---------------------------------------------------------------------------
// HTML sanitization
// ---------------------------------------------------------------------------

export function sanitizeArticleHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "p", "h1", "h2", "h3", "h4", "h5", "h6",
      "strong", "b", "em", "i", "u", "s", "sub", "sup",
      "ul", "ol", "li",
      "a", "blockquote", "code", "pre", "hr", "br",
      "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption",
      "img", "figure", "figcaption", "span",
    ],
    allowedAttributes: {
      a: ["href", "title", "rel", "target"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      th: ["colspan", "rowspan", "scope"],
      td: ["colspan", "rowspan"],
    },
    allowedSchemes: ["https", "http", "mailto"],
    allowedSchemesByTag: { img: ["https"] },
    disallowedTagsMode: "discard",
    transformTags: {
      a: (tagName, attribs) => {
        const href = attribs.href || "";
        const isExternal = /^https?:\/\//i.test(href);
        return {
          tagName,
          attribs: isExternal
            ? { ...attribs, rel: "noopener noreferrer", target: "_blank" }
            : attribs,
        };
      },
    },
  });
}

// ---------------------------------------------------------------------------
// Slug helpers
// ---------------------------------------------------------------------------

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120) || "article";
}

// ---------------------------------------------------------------------------
// SSRF-safe image download
// ---------------------------------------------------------------------------

function isPrivateIp(ip: string): boolean {
  if (net.isIPv6(ip)) {
    const lower = ip.toLowerCase();
    if (lower === "::1" || lower.startsWith("fe80:") || lower.startsWith("fc") || lower.startsWith("fd")) return true;
    if (lower.startsWith("::ffff:")) return isPrivateIp(lower.slice(7));
    return false;
  }
  const parts = ip.split(".").map(Number);
  if (parts.length !== 4 || parts.some((n) => Number.isNaN(n))) return true;
  const [a, b] = parts;
  return (
    a === 0 || a === 10 || a === 127 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) || // link-local + cloud metadata 169.254.169.254
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    a >= 224
  );
}

export async function assertSafeImageUrl(rawUrl: string): Promise<{ url: URL; addresses: { address: string; family: number }[] }> {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new PublishError(400, "VALIDATION_ERROR", `Invalid image URL: ${rawUrl.slice(0, 100)}`);
  }
  if (url.protocol !== "https:") {
    throw new PublishError(400, "VALIDATION_ERROR", "Image URLs must use HTTPS.");
  }
  const host = url.hostname;
  if (host === "localhost" || host.endsWith(".local") || host.endsWith(".internal") || host === "metadata.google.internal") {
    throw new PublishError(400, "VALIDATION_ERROR", "Image URL host is not allowed.");
  }
  if (net.isIP(host)) {
    if (isPrivateIp(host)) throw new PublishError(400, "VALIDATION_ERROR", "Image URL host is not allowed.");
    return { url, addresses: [{ address: host, family: net.isIP(host) }] };
  }
  let addresses;
  try {
    addresses = await dns.lookup(host, { all: true });
  } catch {
    throw new PublishError(400, "IMAGE_FETCH_FAILED", `Could not resolve image host: ${host}`);
  }
  if (addresses.length === 0 || addresses.some((a) => isPrivateIp(a.address))) {
    throw new PublishError(400, "VALIDATION_ERROR", "Image URL resolves to a disallowed address.");
  }
  return { url, addresses };
}

// Fetch that pins the connection to the addresses we already vetted, so a
// DNS-rebinding attacker cannot swap in a private address between our check
// and the actual request. TLS SNI/hostname verification is preserved because
// the URL hostname is unchanged — only the socket lookup is pinned.
async function pinnedFetch(url: URL, vetted: { address: string; family: number }[]): Promise<globalThis.Response> {
  const { fetch: undiciFetch, Agent } = await import("undici");
  const dispatcher = new Agent({
    connect: {
      lookup: (_hostname, _opts, cb) => {
        // Return only the addresses we validated; re-check defensively.
        const safe = vetted.filter((a) => !isPrivateIp(a.address));
        if (safe.length === 0) return cb(new Error("No safe addresses"), [] as any);
        cb(null, safe.map((a) => ({ address: a.address, family: a.family })) as any);
      },
    },
  });
  try {
    return (await undiciFetch(url.toString(), {
      redirect: "error",
      signal: AbortSignal.timeout(20_000),
      headers: { "User-Agent": "AdapyBlogPublisher/1.0" },
      dispatcher,
    })) as unknown as globalThis.Response;
  } finally {
    // Close lazily; keep sockets alive long enough to finish the body read.
    setTimeout(() => dispatcher.close().catch(() => {}), 60_000).unref();
  }
}

const IMAGE_SIGNATURES: { type: string; check: (b: Buffer) => boolean }[] = [
  { type: "image/jpeg", check: (b) => b.length > 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  { type: "image/png", check: (b) => b.length > 8 && b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) },
  { type: "image/webp", check: (b) => b.length > 12 && b.subarray(0, 4).toString("ascii") === "RIFF" && b.subarray(8, 12).toString("ascii") === "WEBP" },
];

export function detectImageType(buf: Buffer): string | null {
  for (const sig of IMAGE_SIGNATURES) if (sig.check(buf)) return sig.type;
  return null;
}

export interface FetchedImage {
  data: Buffer;
  contentType: string;
}

export async function downloadImage(rawUrl: string, fetchImpl?: typeof fetch): Promise<FetchedImage> {
  const { url, addresses } = await assertSafeImageUrl(rawUrl);
  let res: globalThis.Response;
  try {
    res = fetchImpl
      ? await fetchImpl(url.toString(), {
          redirect: "error",
          signal: AbortSignal.timeout(20_000),
          headers: { "User-Agent": "AdapyBlogPublisher/1.0" },
        })
      : await pinnedFetch(url, addresses);
  } catch {
    throw new PublishError(400, "IMAGE_FETCH_FAILED", `Failed to download image: ${url.hostname}`);
  }
  if (!res.ok) {
    throw new PublishError(400, "IMAGE_FETCH_FAILED", `Image download returned HTTP ${res.status}.`);
  }
  const lenHeader = res.headers.get("content-length");
  if (lenHeader && Number(lenHeader) > MAX_IMAGE_BYTES) {
    throw new PublishError(413, "IMAGE_TOO_LARGE", "Image exceeds the 10 MB limit.");
  }
  const chunks: Buffer[] = [];
  let total = 0;
  const reader = res.body?.getReader();
  if (!reader) throw new PublishError(400, "IMAGE_FETCH_FAILED", "Empty image response.");
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_IMAGE_BYTES) {
      reader.cancel().catch(() => {});
      throw new PublishError(413, "IMAGE_TOO_LARGE", "Image exceeds the 10 MB limit.");
    }
    chunks.push(Buffer.from(value));
  }
  const data = Buffer.concat(chunks);
  const contentType = detectImageType(data);
  if (!contentType) {
    throw new PublishError(400, "UNSUPPORTED_IMAGE", "Image must be a valid JPEG, PNG, or WebP file.");
  }
  return { data, contentType };
}

// ---------------------------------------------------------------------------
// Errors
// ---------------------------------------------------------------------------

export class PublishError extends Error {
  constructor(
    public httpStatus: number,
    public code: string,
    message: string,
    public fields?: Record<string, string>,
  ) {
    super(message);
  }
}

function sendError(res: Response, err: PublishError) {
  res.status(err.httpStatus).json({
    success: false,
    error: { code: err.code, message: err.message, ...(err.fields ? { fields: err.fields } : {}) },
  });
}

// ---------------------------------------------------------------------------
// Idempotency hash
// ---------------------------------------------------------------------------

export function payloadHash(body: PublishRequest): string {
  const canonical = JSON.stringify({
    externalId: body.externalId,
    title: body.title,
    slug: body.slug ?? null,
    excerpt: body.excerpt,
    content: body.content,
    author: body.author,
    featuredImage: body.featuredImage ?? null,
    inlineImages: body.inlineImages ?? null,
    categories: body.categories ?? null,
    tags: body.tags ?? null,
    seo: body.seo ?? null,
    status: body.status,
    publishAt: body.publishAt ?? null,
  });
  return crypto.createHash("sha256").update(canonical).digest("hex");
}

// ---------------------------------------------------------------------------
// Auth middleware
// ---------------------------------------------------------------------------

function timingSafeEqualStr(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

export function requireBlogApiKey(req: Request, res: Response, next: NextFunction) {
  const configured = process.env.ADAPY_BLOG_API_KEY;
  if (!configured) {
    return res.status(503).json({
      success: false,
      error: { code: "NOT_CONFIGURED", message: "Blog publishing is not configured on the server." },
    });
  }
  if (process.env.NODE_ENV === "production") {
    const proto = (req.headers["x-forwarded-proto"] as string | undefined)?.split(",")[0]?.trim() || req.protocol;
    if (proto !== "https") {
      return res.status(403).json({
        success: false,
        error: { code: "HTTPS_REQUIRED", message: "This endpoint requires HTTPS." },
      });
    }
  }
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ") || !timingSafeEqualStr(header.slice(7), configured)) {
    return res.status(401).json({
      success: false,
      error: { code: "UNAUTHORIZED", message: "Missing or invalid API key." },
    });
  }
  next();
}

// ---------------------------------------------------------------------------
// Public helpers (visible articles)
// ---------------------------------------------------------------------------

export function visibleArticleFilter() {
  const now = new Date();
  return or(
    and(eq(blogArticles.status, "published")),
    and(eq(blogArticles.status, "scheduled"), lte(blogArticles.publishAt, now)),
  );
}

export function isArticleVisible(a: BlogArticle, now = new Date()): boolean {
  if (a.status === "published") return !a.publishAt || a.publishAt <= now;
  if (a.status === "scheduled") return !!a.publishAt && a.publishAt <= now;
  return false;
}

export function articleUrl(a: { slug: string }): string {
  return `${PUBLIC_SITE_URL()}/blog/${a.slug}`;
}

export function adminArticleUrl(a: { id: number; previewToken: string }): string {
  return `${PUBLIC_SITE_URL()}/admin/blog/${a.id}/preview?token=${a.previewToken}`;
}

export function effectivePublishedAt(a: BlogArticle): Date | null {
  return a.publishedAt ?? a.publishAt ?? null;
}

function toPublicArticle(a: BlogArticle) {
  return {
    id: a.id,
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    content: a.content,
    author: a.authorDisplayName || a.authorName,
    featuredImage: {
      url: a.featuredImageUrl,
      alt: a.featuredImageAlt,
      caption: a.featuredImageCaption,
    },
    categories: a.categories ?? [],
    tags: a.tags ?? [],
    seo: a.seo ?? {},
    publishedAt: (effectivePublishedAt(a) ?? a.createdAt).toISOString(),
  };
}

// ---------------------------------------------------------------------------
// Core publish logic
// ---------------------------------------------------------------------------

interface PublishDeps {
  fetchImpl?: typeof fetch;
}

export async function handlePublish(body: unknown, deps: PublishDeps = {}) {
  const parsed = publishRequestSchema.safeParse(body);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      fields[issue.path.join(".")] = issue.message;
    }
    throw new PublishError(400, "VALIDATION_ERROR", "The article could not be published.", fields);
  }
  const input = parsed.data;

  // Featured image rules — optional (required fields are externalId, title,
  // excerpt, content), but any provided image must have alt text.
  if (input.featuredImage?.url && !input.featuredImage.alt) {
    throw new PublishError(400, "VALIDATION_ERROR", "The article could not be published.", {
      "featuredImage.alt": "Alt text is required.",
    });
  }
  if (input.status === "scheduled" && !input.publishAt) {
    throw new PublishError(400, "VALIDATION_ERROR", "The article could not be published.", {
      publishAt: "publishAt is required for scheduled articles.",
    });
  }

  const hash = payloadHash(input);

  // Idempotency / upsert: articles arriving here were already approved in the
  // Adapy management application, so the same externalId means "update &
  // republish this article", never a conflict.
  const [existing] = await db.select().from(blogArticles).where(eq(blogArticles.externalId, input.externalId));
  if (existing && existing.payloadHash === hash && existing.status === "published") {
    return { httpStatus: 200, article: existing, duplicate: true };
  }

  // Slug — updates keep their existing slug so published URLs stay stable.
  let slug: string;
  if (existing) {
    slug = existing.slug;
  } else {
    slug = input.slug || slugify(input.title);
    const [slugTaken] = await db.select({ id: blogArticles.id }).from(blogArticles).where(eq(blogArticles.slug, slug));
    if (slugTaken || STATIC_BLOG_SLUGS.has(slug)) {
      if (input.slug) {
        throw new PublishError(409, "SLUG_CONFLICT", `The slug "${slug}" is already in use.`);
      }
      slug = `${slug}-${input.externalId.replace(/[^a-z0-9]/gi, "").slice(-8).toLowerCase() || crypto.randomBytes(3).toString("hex")}`;
      const [stillTaken] = await db.select({ id: blogArticles.id }).from(blogArticles).where(eq(blogArticles.slug, slug));
      if (stillTaken) {
        throw new PublishError(409, "SLUG_CONFLICT", `The slug "${slug}" is already in use.`);
      }
    }
  }

  // Sanitize content
  let content = sanitizeArticleHtml(input.content);

  // Download and store images
  const fetchImpl = deps.fetchImpl ?? fetch;
  const storedImageIds: string[] = [];
  let featuredImageUrl: string | null = null;

  try {
    const urlMap = new Map<string, string>(); // source url -> hosted path
    const toFetch: { source: string }[] = [];
    if (input.featuredImage?.url) toFetch.push({ source: input.featuredImage.url });
    for (const img of input.inlineImages ?? []) {
      if (img.sourceUrl || img.url) toFetch.push({ source: (img.sourceUrl || img.url)! });
    }
    for (const { source } of toFetch) {
      if (urlMap.has(source)) continue;
      const fetched = await downloadImage(source, fetchImpl);
      const id = crypto.randomUUID().replace(/-/g, "");
      await db.insert(blogImages).values({
        id,
        articleExternalId: input.externalId,
        contentType: fetched.contentType,
        data: fetched.data,
        byteSize: fetched.data.length,
      });
      storedImageIds.push(id);
      urlMap.set(source, `${PUBLIC_SITE_URL()}/api/blog/images/${id}`);
    }
    if (input.featuredImage?.url) {
      featuredImageUrl = urlMap.get(input.featuredImage.url) ?? null;
    }
    // Replace temporary URLs inside the content with permanent hosted URLs
    for (const [source, hosted] of Array.from(urlMap.entries())) {
      content = content.split(source).join(hosted);
    }

    // Every image left in the content must now point at our own hosted images —
    // reject anything external so no temporary/third-party URLs survive publishing.
    const hostedPrefix = `${PUBLIC_SITE_URL()}/api/blog/images/`;
    const externalImgs: string[] = [];
    for (const m of Array.from(content.matchAll(/<img[^>]*\ssrc="([^"]+)"/gi))) {
      const src = m[1];
      if (!src.startsWith(hostedPrefix) && !src.startsWith("/api/blog/images/")) {
        externalImgs.push(src);
      }
    }
    if (externalImgs.length > 0) {
      throw new PublishError(400, "VALIDATION_ERROR", "All images used in content must be declared in inlineImages so they can be stored permanently.", {
        inlineImages: `Undeclared image URL(s): ${externalImgs.slice(0, 3).join(", ").slice(0, 300)}`,
      });
    }

    const now = new Date();
    const publishAt = input.publishAt ? new Date(input.publishAt) : null;
    // Articles reaching this endpoint were already approved upstream, so
    // "draft" is coerced to an immediate publish. Explicit future scheduling
    // (status "scheduled" or a future publishAt) is still honored.
    let status = input.status === "draft" ? "published" : input.status;
    let publishedAt: Date | null = null;
    if (status === "published") {
      if (publishAt && publishAt > now) {
        status = "scheduled";
      } else {
        publishedAt = publishAt ?? now;
      }
    }

    const articleFields = {
      title: input.title,
      excerpt: input.excerpt,
      content,
      authorName: input.author.name,
      authorDisplayName: input.author.displayName ?? null,
      featuredImageUrl,
      featuredImageAlt: input.featuredImage?.alt ?? null,
      featuredImageCaption: input.featuredImage?.caption ?? null,
      categories: input.categories ?? [],
      tags: input.tags ?? [],
      seo: input.seo ?? {},
      status,
      publishAt,
      payloadHash: hash,
    };

    if (existing) {
      // Update & republish the existing article (stable id + slug)
      const [updated] = await db
        .update(blogArticles)
        .set({
          ...articleFields,
          publishedAt: publishedAt ? existing.publishedAt ?? publishedAt : existing.publishedAt,
          updatedAt: now,
        })
        .where(eq(blogArticles.id, existing.id))
        .returning();
      if (!updated) throw new Error("Article update did not complete.");
      // Remove images belonging to the previous version (keep the new set)
      const oldImages = await db.select({ id: blogImages.id }).from(blogImages).where(eq(blogImages.articleExternalId, input.externalId));
      const stale = oldImages.map((i) => i.id).filter((id) => !storedImageIds.includes(id));
      if (stale.length > 0) {
        await db.delete(blogImages).where(inArray(blogImages.id, stale));
      }
      return { httpStatus: 200, article: updated, duplicate: false, updated: true };
    }

    let created: BlogArticle;
    try {
      [created] = await db
        .insert(blogArticles)
        .values({
          externalId: input.externalId,
          slug,
          ...articleFields,
          publishedAt,
          previewToken: crypto.randomBytes(24).toString("hex"),
        })
        .returning();
    } catch (err: any) {
      // Concurrent retry safety: a unique violation means another request won
      // the race. Resolve it the same way the up-front checks would have.
      if (err?.code === "23505" || err?.cause?.code === "23505") {
        const [winner] = await db.select().from(blogArticles).where(eq(blogArticles.externalId, input.externalId));
        if (winner) {
          // Another request created this externalId concurrently — treat as
          // the idempotent success case and drop our redundant images.
          if (storedImageIds.length > 0) {
            await db.delete(blogImages).where(inArray(blogImages.id, storedImageIds));
          }
          return { httpStatus: 200, article: winner, duplicate: true };
        }
        throw new PublishError(409, "SLUG_CONFLICT", `The slug "${slug}" is already in use.`);
      }
      throw err;
    }

    return { httpStatus: 201, article: created, duplicate: false };
  } catch (err) {
    // Roll back any stored images so a failed publish leaves nothing behind
    if (storedImageIds.length > 0) {
      await db.delete(blogImages).where(inArray(blogImages.id, storedImageIds)).catch?.(() => {});
    }
    throw err;
  }
}

// ---------------------------------------------------------------------------
// Route registration
// ---------------------------------------------------------------------------

export function registerBlogPublishingRoutes(app: Express) {
  const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      error: { code: "RATE_LIMITED", message: "Rate limit exceeded. Try again later." },
    },
  });

  app.post(
    "/api/internal/blog/publish",
    requireBlogApiKey, // auth first so invalid callers can't exhaust the quota
    limiter,
    async (req, res) => {
      try {
        const result = await handlePublish(req.body);
        let a = result.article;
        // Older rows may predate preview tokens — mint one on demand.
        if (!a.previewToken) {
          const token = crypto.randomBytes(24).toString("hex");
          [a] = await db.update(blogArticles).set({ previewToken: token }).where(eq(blogArticles.id, a.id)).returning();
        }
        res.status(result.httpStatus).json({
          success: true,
          articleId: String(a.id),
          externalId: a.externalId,
          status: a.status,
          slug: a.slug,
          url: a.status === "draft" ? adminArticleUrl(a) : articleUrl(a),
          adminUrl: adminArticleUrl(a),
          publicUrl: articleUrl(a),
          publishedAt: (effectivePublishedAt(a) ?? a.createdAt).toISOString(),
          duplicate: result.duplicate,
          updated: (result as any).updated ?? false,
        });
      } catch (err) {
        if (err instanceof PublishError) return sendError(res, err);
        console.error("[blog-publish] unexpected failure:", err instanceof Error ? err.message : err);
        res.status(500).json({
          success: false,
          error: { code: "INTERNAL_ERROR", message: "An unexpected error occurred." },
        });
      }
    },
  );

  // Public: list visible articles (metadata only)
  app.get("/api/blog/articles", async (_req, res) => {
    const rows = await db
      .select()
      .from(blogArticles)
      .where(visibleArticleFilter())
      .orderBy(desc(blogArticles.publishedAt), desc(blogArticles.publishAt), desc(blogArticles.createdAt));
    res.json(
      rows.filter((a) => isArticleVisible(a)).map((a) => {
        const p = toPublicArticle(a);
        return { ...p, content: undefined };
      }),
    );
  });

  // Public: single article by slug
  app.get("/api/blog/articles/:slug", async (req, res) => {
    const [a] = await db.select().from(blogArticles).where(eq(blogArticles.slug, req.params.slug));
    if (!a || !isArticleVisible(a)) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(toPublicArticle(a));
  });

  // ------------------------------------------------------------------
  // Admin: draft preview & publish (per-article preview token, only ever
  // returned through the API-key-protected publish endpoint / drafts list)
  // ------------------------------------------------------------------

  const loadArticleForToken = async (req: Request): Promise<BlogArticle> => {
    const id = Number(req.params.id);
    const token = String(req.query.token ?? req.headers["x-preview-token"] ?? "");
    if (!Number.isInteger(id) || !token) {
      throw new PublishError(404, "NOT_FOUND", "Article not found.");
    }
    const [a] = await db.select().from(blogArticles).where(eq(blogArticles.id, id));
    if (!a || !a.previewToken || !timingSafeEqualStr(token, a.previewToken)) {
      throw new PublishError(404, "NOT_FOUND", "Article not found.");
    }
    return a;
  };

  // Admin: fetch any article (draft/scheduled/published) with a valid preview token
  app.get("/api/blog/admin/articles/:id", async (req, res) => {
    try {
      const a = await loadArticleForToken(req);
      res.json({ ...toPublicArticle(a), status: a.status, publicUrl: articleUrl(a) });
    } catch (err) {
      if (err instanceof PublishError) return sendError(res, err);
      res.status(500).json({ success: false, error: { code: "INTERNAL_ERROR", message: "Unexpected error." } });
    }
  });

  // Admin: publish a draft (or scheduled article) immediately
  app.post("/api/blog/admin/articles/:id/publish", async (req, res) => {
    try {
      const a = await loadArticleForToken(req);
      if (a.status === "published") {
        return res.json({ success: true, status: "published", articleId: String(a.id), publicUrl: articleUrl(a), alreadyPublished: true });
      }
      const [updated] = await db
        .update(blogArticles)
        .set({ status: "published", publishedAt: a.publishedAt ?? new Date(), publishAt: null, updatedAt: new Date() })
        .where(eq(blogArticles.id, a.id))
        .returning();
      res.json({ success: true, status: updated.status, articleId: String(updated.id), publicUrl: articleUrl(updated) });
    } catch (err) {
      if (err instanceof PublishError) return sendError(res, err);
      console.error("[blog-admin] publish failed:", err instanceof Error ? err.message : err);
      res.status(500).json({ success: false, error: { code: "INTERNAL_ERROR", message: "Unexpected error." } });
    }
  });

  // Admin: list drafts (requires the API key — for the Back Office / admins)
  app.get("/api/blog/admin/drafts", requireBlogApiKey, async (_req, res) => {
    const rows = await db.select().from(blogArticles).where(eq(blogArticles.status, "draft")).orderBy(desc(blogArticles.createdAt));
    // Mint preview tokens for any drafts created before tokens existed
    for (let i = 0; i < rows.length; i++) {
      if (!rows[i].previewToken) {
        const token = crypto.randomBytes(24).toString("hex");
        [rows[i]] = await db.update(blogArticles).set({ previewToken: token }).where(eq(blogArticles.id, rows[i].id)).returning();
      }
    }
    res.json(
      rows.map((a) => ({
        articleId: String(a.id),
        title: a.title,
        slug: a.slug,
        excerpt: a.excerpt,
        createdAt: a.createdAt.toISOString(),
        adminUrl: a.previewToken ? adminArticleUrl(a) : null,
        publicUrl: articleUrl(a),
      })),
    );
  });

  // Public: serve stored images
  app.get("/api/blog/images/:id", async (req, res) => {
    const id = req.params.id;
    if (!/^[a-f0-9]{32}$/.test(id)) return res.status(404).end();
    const [img] = await db.select().from(blogImages).where(eq(blogImages.id, id));
    if (!img) return res.status(404).end();
    res.setHeader("Content-Type", img.contentType);
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.send(img.data);
  });
}
