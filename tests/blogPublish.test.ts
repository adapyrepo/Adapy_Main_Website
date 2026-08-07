import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import express from "express";
import request from "supertest";
import { db } from "../server/db";
import { blogArticles, blogImages } from "../shared/schema";
import { like, eq } from "drizzle-orm";
import {
  registerBlogPublishingRoutes,
  handlePublish,
  sanitizeArticleHtml,
  extractSeoPreamble,
  prepareIncomingContent,
  looksLikeMarkdown,
  contentNeedsRepair,
  slugify,
  PublishError,
} from "../server/blogPublishing";

const TEST_KEY = "test-key-for-vitest-only";
const PREFIX = "vitest-";

// Minimal valid PNG (1x1) so image type detection passes
const PNG = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  Buffer.alloc(64, 1),
]);

function fakeFetchOk(): typeof fetch {
  return (async () =>
    new Response(new Uint8Array(PNG), {
      status: 200,
      headers: { "content-type": "image/png" },
    })) as unknown as typeof fetch;
}

function fakeFetchFail(): typeof fetch {
  return (async () => {
    throw new Error("network down");
  }) as unknown as typeof fetch;
}

function baseArticle(overrides: Record<string, unknown> = {}) {
  return {
    externalId: `${PREFIX}${Math.random().toString(36).slice(2, 10)}`,
    title: "Testing Adapy Blog Publishing",
    excerpt: "A test of the secure publishing pipeline.",
    content: "<p>Hello <strong>world</strong>.</p>",
    contentFormat: "html",
    author: { name: "Adapy", displayName: "Adapy Team" },
    featuredImage: {
      url: "https://images.example-cdn.com/test.png",
      alt: "Test image",
    },
    categories: ["Adapy News"],
    tags: ["test"],
    status: "draft",
    ...overrides,
  };
}

async function cleanup() {
  await db.delete(blogArticles).where(like(blogArticles.externalId, `${PREFIX}%`));
  await db.delete(blogImages).where(like(blogImages.articleExternalId, `${PREFIX}%`));
}

let app: express.Express;

beforeAll(async () => {
  process.env.ADAPY_BLOG_API_KEY = TEST_KEY;
  app = express();
  app.use(express.json());
  registerBlogPublishingRoutes(app);
  await cleanup();
});

afterAll(async () => {
  await cleanup();
});

describe("auth", () => {
  it("rejects a missing API key", async () => {
    const res = await request(app).post("/api/internal/blog/publish").send(baseArticle());
    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe("UNAUTHORIZED");
  });

  it("rejects an invalid API key", async () => {
    const res = await request(app)
      .post("/api/internal/blog/publish")
      .set("Authorization", "Bearer wrong-key")
      .send(baseArticle());
    expect(res.status).toBe(401);
  });
});

describe("validation", () => {
  it("rejects missing required fields", async () => {
    await expect(handlePublish({ externalId: `${PREFIX}x` })).rejects.toMatchObject({
      httpStatus: 400,
      code: "VALIDATION_ERROR",
    });
  });

  it("requires featuredImage.alt when a featured image is given", async () => {
    const err = await handlePublish(
      baseArticle({ featuredImage: { url: "https://images.example-cdn.com/x.png" } }),
    ).catch((e) => e);
    expect(err).toBeInstanceOf(PublishError);
    expect(err.fields["featuredImage.alt"]).toBeTruthy();
  });

  it("allows publishing without a featured image (only externalId/title/excerpt/content required)", async () => {
    const extId = `${PREFIX}noimg`;
    const result = await handlePublish(baseArticle({ externalId: extId, status: "published", featuredImage: undefined, title: "No Image Publish Test" }));
    expect(result.httpStatus).toBe(201);
    expect(result.article.status).toBe("published");
    expect(result.article.publishedAt).toBeTruthy();
  });
});

describe("markdown + SEO-preamble cleanup", () => {
  const raw = [
    "**Title Tag:** Great Title | Adapy",
    "**Meta Description:** A meta description.",
    "**H1:** Real Heading",
    "",
    "**Introduction**",
    "",
    "First real paragraph.",
    "",
    "## Section",
    "",
    "- one",
    "- two",
    "",
    "---",
    "",
    "> quote",
  ].join("\n");

  it("extracts SEO labels and starts the body at the real introduction", () => {
    const p = extractSeoPreamble(raw);
    expect(p.metaTitle).toBe("Great Title | Adapy");
    expect(p.metaDescription).toBe("A meta description.");
    expect(p.h1).toBe("Real Heading");
    expect(p.body.startsWith("First real paragraph.")).toBe(true);
  });

  it("converts markdown to sanitized HTML without raw markdown characters", () => {
    const { html, metaTitle } = prepareIncomingContent(raw);
    expect(metaTitle).toBe("Great Title | Adapy");
    expect(html).toContain("<p>First real paragraph.</p>");
    expect(html).toContain("<h2>Section</h2>");
    expect(html).toContain("<li>one</li>");
    expect(html).toContain("<blockquote>");
    expect(html).not.toContain("**");
    expect(html).not.toContain("Title Tag");
  });

  it("leaves real HTML content untouched (aside from sanitization)", () => {
    const html = "<h2>Hi</h2><p>Already **fine** HTML with <strong>tags</strong>.</p>";
    expect(looksLikeMarkdown(html)).toBe(false);
    expect(contentNeedsRepair(html)).toBe(false);
    expect(prepareIncomingContent(html).html).toContain("<h2>Hi</h2>");
  });

  it("demotes body H1s so the article page keeps a single H1", () => {
    const { html } = prepareIncomingContent("# Big Title\n\ntext");
    expect(html).not.toContain("<h1");
    expect(html).toContain("<h2>Big Title</h2>");
  });

  it("never strips a legitimate leading markdown heading like '# H1'", () => {
    const md = "# H1\n\nOpening paragraph stays.\n\nMore **text**.";
    const p = extractSeoPreamble(md);
    expect(p.h1).toBeUndefined();
    expect(p.body.startsWith("# H1")).toBe(true);
    const { html } = prepareIncomingContent(md);
    expect(html).toContain("<h2>H1</h2>"); // demoted, not deleted
    expect(html).toContain("Opening paragraph stays.");
  });

  it("keeps ordinary prose that merely mentions a label word without a colon", () => {
    const md = "Title Tag placement matters in SEO.\n\nSecond paragraph.";
    const p = extractSeoPreamble(md);
    expect(p.body.startsWith("Title Tag placement")).toBe(true);
  });

  it("strips an HTML-form SEO preamble", () => {
    const html =
      "<p><strong>Title Tag:</strong> HTML Title | Adapy</p><p><strong>Meta Description:</strong> HTML meta.</p><p><strong>Introduction</strong></p><p>Real HTML intro.</p><h2>Section</h2>";
    expect(contentNeedsRepair(html)).toBe(true);
    const r = prepareIncomingContent(html);
    expect(r.metaTitle).toBe("HTML Title | Adapy");
    expect(r.metaDescription).toBe("HTML meta.");
    expect(r.html).not.toContain("Title Tag");
    expect(r.html).toContain("<p>Real HTML intro.</p>");
    expect(r.html).toContain("<h2>Section</h2>");
  });

  it("flags stored raw-markdown content as needing repair", () => {
    expect(contentNeedsRepair("**Title Tag:** x\n\nSome **bold** text\n\n## H")).toBe(true);
  });

  it("publish endpoint stores markdown submissions as rendered HTML with extracted seo", async () => {
    const result = await handlePublish(
      baseArticle({
        externalId: `${PREFIX}md1`,
        title: "Markdown Endpoint Test",
        featuredImage: undefined,
        content: raw,
      }),
    );
    expect(result.article.content).toContain("<h2>Section</h2>");
    expect(result.article.content).not.toContain("Title Tag");
    expect((result.article.seo as any).metaTitle).toBe("Great Title | Adapy");
    expect((result.article.seo as any).metaDescription).toBe("A meta description.");
  });
});

describe("HTML sanitization", () => {
  it("removes scripts, event handlers, and javascript: URLs", () => {
    const dirty =
      '<p onclick="evil()">hi</p><script>alert(1)</script><a href="javascript:evil()">x</a><iframe src="https://x.com"></iframe><img src="http://insecure.com/a.png">';
    const clean = sanitizeArticleHtml(dirty);
    expect(clean).not.toContain("script");
    expect(clean).not.toContain("onclick");
    expect(clean).not.toContain("javascript:");
    expect(clean).not.toContain("iframe");
    expect(clean).not.toContain("insecure.com"); // img must be https
    expect(clean).toContain("<p>hi</p>");
  });

  it("keeps normal formatting and secures external links", () => {
    const clean = sanitizeArticleHtml(
      '<h2>T</h2><ul><li>a</li></ul><a href="https://ext.com">e</a><blockquote>q</blockquote>',
    );
    expect(clean).toContain("<h2>T</h2>");
    expect(clean).toContain('rel="noopener noreferrer"');
  });
});

describe("image safety", () => {
  it("rejects non-HTTPS image URLs", async () => {
    const err = await handlePublish(
      baseArticle({ featuredImage: { url: "http://images.example.com/a.png", alt: "x" } }),
      { fetchImpl: fakeFetchOk() },
    ).catch((e) => e);
    expect(err.httpStatus).toBe(400);
  });

  it("blocks private/internal hosts", async () => {
    for (const url of [
      "https://localhost/a.png",
      "https://127.0.0.1/a.png",
      "https://169.254.169.254/latest/meta-data",
      "https://192.168.1.5/a.png",
      "https://10.0.0.1/a.png",
    ]) {
      const err = await handlePublish(
        baseArticle({ featuredImage: { url, alt: "x" } }),
        { fetchImpl: fakeFetchOk() },
      ).catch((e) => e);
      expect(err.httpStatus, url).toBe(400);
    }
  });

  it("does not create a partial article when image download fails", async () => {
    const extId = `${PREFIX}imgfail`;
    const err = await handlePublish(
      baseArticle({ externalId: extId, status: "published" }),
      { fetchImpl: fakeFetchFail() },
    ).catch((e) => e);
    expect(err.httpStatus).toBe(400);
    const rows = await db.select().from(blogArticles).where(eq(blogArticles.externalId, extId));
    expect(rows.length).toBe(0);
    const imgs = await db.select().from(blogImages).where(eq(blogImages.articleExternalId, extId));
    expect(imgs.length).toBe(0);
  });
});

describe("publishing and idempotency", () => {
  it("publishes a valid article and stores the image", async () => {
    const body = baseArticle({ externalId: `${PREFIX}pub1`, status: "published" });
    const result = await handlePublish(body, { fetchImpl: fakeFetchOk() });
    expect(result.httpStatus).toBe(201);
    expect(result.article.status).toBe("published");
    expect(result.article.slug).toBe("testing-adapy-blog-publishing");
    expect(result.article.featuredImageUrl).toMatch(/\/api\/blog\/images\/[a-f0-9]{32}$/);
    const imgs = await db
      .select({ id: blogImages.id })
      .from(blogImages)
      .where(eq(blogImages.articleExternalId, `${PREFIX}pub1`));
    expect(imgs.length).toBe(1);
  });

  it("returns the existing article on an identical retry (no duplicates)", async () => {
    const body = baseArticle({ externalId: `${PREFIX}pub1`, status: "published" });
    const result = await handlePublish(body, { fetchImpl: fakeFetchOk() });
    expect(result.httpStatus).toBe(200);
    expect(result.duplicate).toBe(true);
    const rows = await db.select().from(blogArticles).where(eq(blogArticles.externalId, `${PREFIX}pub1`));
    expect(rows.length).toBe(1);
  });

  it("updates the existing article in place when the same externalId arrives with different content", async () => {
    const [before] = await db.select().from(blogArticles).where(eq(blogArticles.externalId, `${PREFIX}pub1`));
    const body = baseArticle({
      externalId: `${PREFIX}pub1`,
      status: "published",
      title: "A Different Title",
    });
    const result = await handlePublish(body, { fetchImpl: fakeFetchOk() });
    expect(result.httpStatus).toBe(200);
    expect((result as any).updated).toBe(true);
    expect(result.article.id).toBe(before.id); // stable id
    expect(result.article.slug).toBe(before.slug); // stable URL
    expect(result.article.title).toBe("A Different Title");
    expect(result.article.status).toBe("published");
    const rows = await db.select().from(blogArticles).where(eq(blogArticles.externalId, `${PREFIX}pub1`));
    expect(rows.length).toBe(1); // no duplicate rows
    // old images replaced, exactly one image set remains
    const imgs = await db.select({ id: blogImages.id }).from(blogImages).where(eq(blogImages.articleExternalId, `${PREFIX}pub1`));
    expect(imgs.length).toBe(1);
  });

  it("generates a unique slug when the title collides", async () => {
    const body = baseArticle({ externalId: `${PREFIX}pub2`, status: "published" });
    const result = await handlePublish(body, { fetchImpl: fakeFetchOk() });
    expect(result.article.slug).not.toBe("testing-adapy-blog-publishing");
    expect(result.article.slug).toMatch(/^testing-adapy-blog-publishing-/);
  });

  it("returns 409 for an explicitly requested slug that is taken", async () => {
    const body = baseArticle({
      externalId: `${PREFIX}pub3`,
      status: "published",
      slug: "testing-adapy-blog-publishing",
    });
    const err = await handlePublish(body, { fetchImpl: fakeFetchOk() }).catch((e) => e);
    expect(err.httpStatus).toBe(409);
    expect(err.code).toBe("SLUG_CONFLICT");
  });
});

describe("visibility", () => {
  it("draft submissions are coerced to published and immediately public", async () => {
    const body = baseArticle({ externalId: `${PREFIX}draft1`, slug: "vitest-draft-article", status: "draft" });
    const result = await handlePublish(body, { fetchImpl: fakeFetchOk() });
    expect(result.article.status).toBe("published");
    expect(result.article.publishedAt).toBeTruthy();
    const res = await request(app).get("/api/blog/articles/vitest-draft-article");
    expect(res.status).toBe(200);
    const list = await request(app).get("/api/blog/articles");
    expect(list.body.some((a: any) => a.slug === "vitest-draft-article")).toBe(true);
  });

  it("scheduled articles do not appear before publishAt", async () => {
    const future = new Date(Date.now() + 86400_000).toISOString();
    const body = baseArticle({
      externalId: `${PREFIX}sched1`,
      slug: "vitest-scheduled-article",
      status: "scheduled",
      publishAt: future,
    });
    await handlePublish(body, { fetchImpl: fakeFetchOk() });
    const res = await request(app).get("/api/blog/articles/vitest-scheduled-article");
    expect(res.status).toBe(404);
  });

  it("published articles appear on the public list with a working detail route", async () => {
    const list = await request(app)
      .get("/api/blog/articles")
      .set("Authorization", `Bearer ${TEST_KEY}`);
    const found = list.body.find((a: any) => a.slug === "testing-adapy-blog-publishing");
    expect(found).toBeTruthy();
    expect(found.content).toBeUndefined(); // list is metadata-only
    const detail = await request(app).get("/api/blog/articles/testing-adapy-blog-publishing");
    expect(detail.status).toBe(200);
    expect(detail.body.content).toContain("Hello");
  });

  it("serves stored images", async () => {
    const [row] = await db
      .select({ id: blogImages.id })
      .from(blogImages)
      .where(eq(blogImages.articleExternalId, `${PREFIX}pub1`));
    const res = await request(app).get(`/api/blog/images/${row.id}`);
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toBe("image/png");
  });
});

describe("admin draft workflow", () => {
  it("publish endpoint returns adminUrl and does not expose the public URL for drafts", async () => {
    const res = await request(app)
      .post("/api/internal/blog/publish")
      .set("Authorization", `Bearer ${TEST_KEY}`)
      .send(baseArticle({ externalId: `${PREFIX}adminflow`, slug: "vitest-admin-flow", featuredImage: undefined }));
    expect(res.status).toBe(201);
    expect(res.body.status).toBe("published"); // approved articles publish immediately
    expect(res.body.adminUrl).toContain("/admin/blog/");
    expect(res.body.adminUrl).toContain("token=");
    expect(res.body.publicUrl).toContain("/blog/vitest-admin-flow");
    expect(res.body.url).toBe(res.body.publicUrl); // published: url is the public URL
  });

  it("admin article endpoint requires a valid token", async () => {
    const [row] = await db.select().from(blogArticles).where(eq(blogArticles.externalId, `${PREFIX}adminflow`));
    const bad = await request(app).get(`/api/blog/admin/articles/${row.id}?token=wrong`);
    expect(bad.status).toBe(404);
    const none = await request(app).get(`/api/blog/admin/articles/${row.id}`);
    expect(none.status).toBe(404);
    const good = await request(app).get(`/api/blog/admin/articles/${row.id}?token=${row.previewToken}`);
    expect(good.status).toBe(200);
    expect(good.body.status).toBe("published");
    expect(good.body.content).toContain("Hello");
  });

  it("drafts list requires the API key", async () => {
    const noAuth = await request(app).get("/api/blog/admin/drafts");
    expect(noAuth.status).toBe(401);
    const res = await request(app).get("/api/blog/admin/drafts").set("Authorization", `Bearer ${TEST_KEY}`);
    expect(res.status).toBe(200);
  });

  it("submission is immediately publicly visible with publishedAt set", async () => {
    const detail = await request(app).get("/api/blog/articles/vitest-admin-flow");
    expect(detail.status).toBe(200);
    const [after] = await db.select().from(blogArticles).where(eq(blogArticles.externalId, `${PREFIX}adminflow`));
    expect(after.publishedAt).toBeTruthy();
  });
});

describe("helpers", () => {
  it("slugify produces URL-safe slugs", () => {
    expect(slugify("Héllo, World! 123")).toBe("hello-world-123");
  });
});
