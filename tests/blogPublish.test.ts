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

  it("requires a featured image for published articles", async () => {
    const err = await handlePublish(
      baseArticle({ status: "published", featuredImage: undefined }),
    ).catch((e) => e);
    expect(err.fields["featuredImage.url"]).toBeTruthy();
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

  it("returns 409 when the same externalId arrives with different content", async () => {
    const body = baseArticle({
      externalId: `${PREFIX}pub1`,
      status: "published",
      title: "A Different Title",
    });
    const err = await handlePublish(body, { fetchImpl: fakeFetchOk() }).catch((e) => e);
    expect(err.httpStatus).toBe(409);
    expect(err.code).toBe("EXTERNAL_ID_CONFLICT");
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
  it("drafts are not publicly accessible", async () => {
    const body = baseArticle({ externalId: `${PREFIX}draft1`, slug: "vitest-draft-article" });
    await handlePublish(body, { fetchImpl: fakeFetchOk() });
    const res = await request(app).get("/api/blog/articles/vitest-draft-article");
    expect(res.status).toBe(404);
    const list = await request(app).get("/api/blog/articles");
    expect(list.body.some((a: any) => a.slug === "vitest-draft-article")).toBe(false);
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

describe("helpers", () => {
  it("slugify produces URL-safe slugs", () => {
    expect(slugify("Héllo, World! 123")).toBe("hello-world-123");
  });
});
