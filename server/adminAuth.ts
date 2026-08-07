import type { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import crypto from "crypto";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { pool, db } from "./db";
import { blogArticles } from "@shared/schema";
import { desc, eq } from "drizzle-orm";
import {
  publishRequestSchema,
  handlePublish,
  PublishError,
  deleteArticleByExternalId,
} from "./blogPublishing";

// ---------------------------------------------------------------------------
// Credential verification (scrypt, timing-safe). The plaintext password is
// never stored anywhere — only ADMIN_PASSWORD_HASH ("salt:hex") in env.
// ---------------------------------------------------------------------------

function verifyPassword(password: string, stored: string): boolean {
  const [salt, hashHex] = stored.split(":");
  if (!salt || !hashHex) return false;
  const expected = Buffer.from(hashHex, "hex");
  const actual = crypto.scryptSync(password, salt, expected.length);
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}

function timingSafeEqualStr(a: string, b: string): boolean {
  const ah = crypto.createHash("sha256").update(a).digest();
  const bh = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ah, bh);
}

export function requireAdminSession(req: Request, res: Response, next: NextFunction) {
  if ((req.session as any)?.adminEmail) return next();
  return res.status(401).json({ success: false, error: { code: "UNAUTHORIZED", message: "Login required." } });
}

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

const loginSchema = z.object({
  email: z.string().min(1).max(200),
  password: z.string().min(1).max(200),
});

// Admin editor payload — same shape the publish pipeline accepts, minus
// externalId (managed server-side for admin-created articles).
const adminArticleSchema = publishRequestSchema.omit({ externalId: true });

export function registerAdminRoutes(app: Express) {
  const sessionSecret = process.env.SESSION_SECRET;
  if (!sessionSecret) {
    console.error("[admin] SESSION_SECRET is not set; admin panel disabled.");
    return;
  }

  const PgStore = connectPgSimple(session);
  const sessionMiddleware = session({
    store: new PgStore({ pool, tableName: "admin_sessions", createTableIfMissing: true }),
    name: "adapy.admin.sid",
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 12, // 12 hours
    },
  });

  // Session only exists on admin API paths — public pages stay cookie-free.
  app.use("/api/admin", sessionMiddleware);

  const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: { code: "RATE_LIMITED", message: "Too many login attempts. Try again later." } },
  });

  app.post("/api/admin/login", loginLimiter, (req, res) => {
    const parsed = loginSchema.safeParse(req.body);
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminHash = process.env.ADMIN_PASSWORD_HASH;
    if (!parsed.success || !adminEmail || !adminHash) {
      return res.status(401).json({ success: false, error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password." } });
    }
    const { email, password } = parsed.data;
    const emailOk = timingSafeEqualStr(email.trim().toLowerCase(), adminEmail.toLowerCase());
    const passwordOk = verifyPassword(password, adminHash);
    if (!emailOk || !passwordOk) {
      console.log("[admin] failed login attempt");
      return res.status(401).json({ success: false, error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password." } });
    }
    req.session.regenerate((err) => {
      if (err) return res.status(500).json({ success: false, error: { code: "INTERNAL_ERROR", message: "Login failed." } });
      (req.session as any).adminEmail = adminEmail;
      res.json({ success: true, email: adminEmail });
    });
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy(() => {
      res.clearCookie("adapy.admin.sid");
      res.json({ success: true });
    });
  });

  app.get("/api/admin/me", (req, res) => {
    const email = (req.session as any)?.adminEmail;
    if (!email) return res.status(401).json({ success: false });
    res.json({ success: true, email });
  });

  // ------------------------------------------------------------------
  // Blog CRUD (session-protected)
  // ------------------------------------------------------------------

  app.get("/api/admin/blog/articles", requireAdminSession, async (_req, res) => {
    const rows = await db
      .select({
        id: blogArticles.id,
        externalId: blogArticles.externalId,
        title: blogArticles.title,
        slug: blogArticles.slug,
        status: blogArticles.status,
        excerpt: blogArticles.excerpt,
        publishedAt: blogArticles.publishedAt,
        updatedAt: blogArticles.updatedAt,
        createdAt: blogArticles.createdAt,
      })
      .from(blogArticles)
      .orderBy(desc(blogArticles.createdAt));
    res.json({ success: true, articles: rows });
  });

  app.get("/api/admin/blog/articles/:externalId", requireAdminSession, async (req, res) => {
    const [a] = await db.select().from(blogArticles).where(eq(blogArticles.externalId, req.params.externalId));
    if (!a) return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Article not found." } });
    const { previewToken, ...safe } = a as any;
    res.json({ success: true, article: safe });
  });

  // Create (POST) or update (PUT with externalId). Both reuse the hardened
  // publish pipeline: sanitization, markdown handling, slug logic, upsert.
  async function saveArticle(req: Request, res: Response, externalId: string) {
    const parsed = adminArticleSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: { code: "VALIDATION_ERROR", message: parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ") },
      });
    }
    try {
      const result = await handlePublish({ ...parsed.data, externalId });
      const a = result.article;
      res.status(result.httpStatus === 201 ? 201 : 200).json({
        success: true,
        externalId: a.externalId,
        slug: a.slug,
        status: a.status,
        updated: (result as any).updated ?? false,
      });
    } catch (err) {
      if (err instanceof PublishError) {
        return res.status(err.httpStatus).json({ success: false, error: { code: err.code, message: err.message } });
      }
      console.error("[admin-blog] save failed:", err instanceof Error ? err.message : err);
      res.status(500).json({ success: false, error: { code: "INTERNAL_ERROR", message: "Saving the article failed." } });
    }
  }

  app.post("/api/admin/blog/articles", requireAdminSession, async (req, res) => {
    await saveArticle(req, res, `admin-${crypto.randomUUID()}`);
  });

  app.put("/api/admin/blog/articles/:externalId", requireAdminSession, async (req, res) => {
    await saveArticle(req, res, req.params.externalId);
  });

  app.delete("/api/admin/blog/articles/:externalId", requireAdminSession, async (req, res) => {
    try {
      const deleted = await deleteArticleByExternalId(req.params.externalId);
      res.json({ success: true, deleted });
    } catch (err) {
      console.error("[admin-blog] delete failed:", err instanceof Error ? err.message : err);
      res.status(500).json({ success: false, error: { code: "INTERNAL_ERROR", message: "Deletion failed." } });
    }
  });
}
