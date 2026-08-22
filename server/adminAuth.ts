import type { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import crypto from "crypto";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { pool, db } from "./db";
import {
  blogArticles,
  privacyRequestEvents,
  privacyRequests,
} from "@shared/schema";
import { asc, desc, eq } from "drizzle-orm";
import {
  publishRequestSchema,
  handlePublish,
  PublishError,
  deleteArticleByExternalId,
} from "./blogPublishing";
import {
  createPrivacyEventHash,
  PRIVACY_EVENT_GENESIS,
  verifyPrivacyEventChain,
} from "./privacyAudit";
import {
  getManualFulfillmentError,
  getPrivacyClosureError,
  manualFulfillmentSchema,
  privacyCompletionSchema,
} from "./privacyRequestWorkflow";

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
  // MHMDA privacy-request fulfillment (session-protected)
  // ------------------------------------------------------------------

  app.get("/api/admin/privacy-requests", requireAdminSession, async (_req, res) => {
    const requests = await db
      .select({
        publicId: privacyRequests.publicId,
        requestType: privacyRequests.requestType,
        fullName: privacyRequests.fullName,
        email: privacyRequests.email,
        phone: privacyRequests.phone,
        status: privacyRequests.status,
        submittedAt: privacyRequests.submittedAt,
        dueAt: privacyRequests.dueAt,
        acknowledgedAt: privacyRequests.acknowledgedAt,
        identityVerifiedAt: privacyRequests.identityVerifiedAt,
        externalActionStatus: privacyRequests.externalActionStatus,
        dealerNotificationStatus: privacyRequests.dealerNotificationStatus,
        dealerCount: privacyRequests.dealerCount,
        completedAt: privacyRequests.completedAt,
      })
      .from(privacyRequests)
      .orderBy(desc(privacyRequests.submittedAt));
    res.json({ success: true, requests });
  });

  app.get("/api/admin/privacy-requests/:publicId", requireAdminSession, async (req, res) => {
    const detail = await db.transaction(async (transaction) => {
      const [request] = await transaction
        .select()
        .from(privacyRequests)
        .where(eq(privacyRequests.publicId, req.params.publicId))
        .for("share");
      if (!request) return null;

      const events = await transaction
        .select()
        .from(privacyRequestEvents)
        .where(eq(privacyRequestEvents.privacyRequestId, request.id))
        .orderBy(asc(privacyRequestEvents.id));
      return { request, events };
    });
    if (!detail) {
      return res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "Privacy request not found." },
      });
    }

    const { request, events } = detail;
    const evidenceIntegrity =
      events.length > 0
        ? verifyPrivacyEventChain(events)
        : request.status === "received" &&
          !request.acknowledgedAt &&
          !request.identityVerifiedAt &&
          request.externalActionStatus === "not_started" &&
          !request.completedAt;
    res.json({ success: true, request, events: [...events].reverse(), evidenceIntegrity });
  });

  type PrivacyTransaction = Parameters<
    Parameters<typeof db.transaction>[0]
  >[0];

  class PrivacyRouteError extends Error {
    constructor(
      readonly status: number,
      readonly code: string,
      message: string,
    ) {
      super(message);
    }
  }

  async function respondWithPrivacyTransaction(
    res: Response,
    operation: (
      transaction: PrivacyTransaction,
    ) => Promise<Record<string, unknown>>,
  ) {
    try {
      const result = await db.transaction(operation);
      return res.json({ success: true, ...result });
    } catch (error) {
      if (error instanceof PrivacyRouteError) {
        return res.status(error.status).json({
          success: false,
          error: { code: error.code, message: error.message },
        });
      }
      console.error(
        "[privacy-workflow] transaction failed",
        error instanceof Error ? error.message : error,
      );
      return res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "The privacy request could not be updated.",
        },
      });
    }
  }

  async function findPrivacyRequestForUpdate(
    transaction: PrivacyTransaction,
    publicId: string,
  ) {
    const [request] = await transaction
      .select()
      .from(privacyRequests)
      .where(eq(privacyRequests.publicId, publicId))
      .for("update");
    if (!request) {
      throw new PrivacyRouteError(404, "NOT_FOUND", "Privacy request not found.");
    }
    return request;
  }

  async function recordPrivacyEvent(
    transaction: PrivacyTransaction,
    requestId: number,
    eventType: string,
    actorEmail: string,
  ) {
    const [lastEvent] = await transaction
      .select({ eventHash: privacyRequestEvents.eventHash })
      .from(privacyRequestEvents)
      .where(eq(privacyRequestEvents.privacyRequestId, requestId))
      .orderBy(desc(privacyRequestEvents.id))
      .limit(1);
    const createdAt = new Date();
    const previousHash = lastEvent?.eventHash ?? PRIVACY_EVENT_GENESIS;
    const eventHash = createPrivacyEventHash({
      privacyRequestId: requestId,
      eventType,
      actorEmail,
      createdAt,
      previousHash,
    });
    await transaction.insert(privacyRequestEvents).values({
      privacyRequestId: requestId,
      eventType,
      actorEmail,
      previousHash,
      eventHash,
      createdAt,
    });
  }

  app.post(
    "/api/admin/privacy-requests/:publicId/verify",
    requireAdminSession,
    async (req, res) => {
      return respondWithPrivacyTransaction(res, async (transaction) => {
        const request = await findPrivacyRequestForUpdate(
          transaction,
          req.params.publicId,
        );
        if (request.status === "completed") {
          throw new PrivacyRouteError(
            409,
            "ALREADY_COMPLETED",
            "Privacy request is already complete.",
          );
        }

        const identityVerifiedAt = request.identityVerifiedAt ?? new Date();
        await transaction
          .update(privacyRequests)
          .set({ identityVerifiedAt, status: "identity_verified" })
          .where(eq(privacyRequests.id, request.id));
        await recordPrivacyEvent(
          transaction,
          request.id,
          "identity_verified",
          (req.session as any).adminEmail,
        );
        return { status: "identity_verified" };
      });
    },
  );

  app.post(
    "/api/admin/privacy-requests/:publicId/acknowledge",
    requireAdminSession,
    async (req, res) => {
      return respondWithPrivacyTransaction(res, async (transaction) => {
        const request = await findPrivacyRequestForUpdate(
          transaction,
          req.params.publicId,
        );
        if (request.status === "completed") {
          throw new PrivacyRouteError(
            409,
            "ALREADY_COMPLETED",
            "Privacy request is already complete.",
          );
        }

        const acknowledgedAt = request.acknowledgedAt ?? new Date();
        const status = request.identityVerifiedAt
          ? "identity_verified"
          : "acknowledged";
        await transaction
          .update(privacyRequests)
          .set({ acknowledgedAt, status })
          .where(eq(privacyRequests.id, request.id));
        await recordPrivacyEvent(
          transaction,
          request.id,
          "acknowledgement_sent",
          (req.session as any).adminEmail,
        );
        return { status };
      });
    },
  );

  app.post(
    "/api/admin/privacy-requests/:publicId/fulfill",
    requireAdminSession,
    async (req, res) => {
      const parsed = manualFulfillmentSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          error: {
            code: "MANUAL_FULFILLMENT_CONFIRMATION_REQUIRED",
            message:
              "Confirm the manual lead-store action and dealer acknowledgement before recording fulfillment.",
          },
        });
      }
      return respondWithPrivacyTransaction(res, async (transaction) => {
        const request = await findPrivacyRequestForUpdate(
          transaction,
          req.params.publicId,
        );
        if (request.status === "completed") {
          throw new PrivacyRouteError(
            409,
            "ALREADY_COMPLETED",
            "Privacy request is already complete.",
          );
        }
        if (!request.acknowledgedAt) {
          throw new PrivacyRouteError(
            409,
            "ACKNOWLEDGEMENT_REQUIRED",
            "Record the acknowledgement before confirming fulfillment.",
          );
        }
        if (!request.identityVerifiedAt) {
          throw new PrivacyRouteError(
            409,
            "IDENTITY_NOT_VERIFIED",
            "Verify the requester's identity before changing or disclosing data.",
          );
        }
        const manualFulfillmentError = getManualFulfillmentError(
          request.requestType,
          parsed.data.dealerCount,
          parsed.data.dealerAcknowledged,
        );
        if (manualFulfillmentError) {
          throw new PrivacyRouteError(
            400,
            manualFulfillmentError.code,
            manualFulfillmentError.message,
          );
        }

        const externalActionCompletedAt = new Date();
        const dealerNotification =
          parsed.data.dealerCount > 0 &&
          (request.requestType === "deletion" ||
            request.requestType === "withdrawal")
            ? "acknowledged"
            : "not_required";
        await transaction
          .update(privacyRequests)
          .set({
            status: "fulfilled_pending_response",
            externalActionStatus: "completed",
            externalActionCompletedAt,
            dealerNotificationStatus: dealerNotification,
            dealerNotificationCompletedAt: externalActionCompletedAt,
            dealerCount: parsed.data.dealerCount,
          })
          .where(eq(privacyRequests.id, request.id));
        await recordPrivacyEvent(
          transaction,
          request.id,
          "manual_lead_store_action_confirmed",
          (req.session as any).adminEmail,
        );
        if (dealerNotification !== "not_required") {
          await recordPrivacyEvent(
            transaction,
            request.id,
            "dealer_notification_acknowledged",
            (req.session as any).adminEmail,
          );
        }

        return {
          status: "fulfilled_pending_response",
          dealerNotification,
          dealerCount: parsed.data.dealerCount,
        };
      });
    },
  );

  app.post(
    "/api/admin/privacy-requests/:publicId/complete",
    requireAdminSession,
    async (req, res) => {
      const parsed = privacyCompletionSchema.safeParse(req.body);
      if (!parsed.success || parsed.data.responseDelivered !== true) {
        return res.status(400).json({
          success: false,
          error: {
            code: "RESPONSE_CONFIRMATION_REQUIRED",
            message: "Confirm that the final response was delivered before closing the request.",
          },
        });
      }

      return respondWithPrivacyTransaction(res, async (transaction) => {
        const request = await findPrivacyRequestForUpdate(
          transaction,
          req.params.publicId,
        );
        if (request.status === "completed") {
          return { status: "completed" };
        }
        const closureError = getPrivacyClosureError(request);
        if (closureError) {
          throw new PrivacyRouteError(
            409,
            closureError.code,
            closureError.message,
          );
        }

        const completedAt = new Date();
        await transaction
          .update(privacyRequests)
          .set({ status: "completed", completedAt })
          .where(eq(privacyRequests.id, request.id));
        await recordPrivacyEvent(
          transaction,
          request.id,
          "final_response_delivered_and_request_completed",
          (req.session as any).adminEmail,
        );
        return { status: "completed" };
      });
    },
  );

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
