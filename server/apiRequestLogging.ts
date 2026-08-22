import type { RequestHandler } from "express";
import { redactSensitiveLeadFields } from "@shared/sensitiveFields";

function isPrivacyRequestPath(path: string): boolean {
  return (
    path === "/api/privacy-requests" ||
    path.startsWith("/api/privacy-requests/") ||
    path === "/api/admin/privacy-requests" ||
    path.startsWith("/api/admin/privacy-requests/")
  );
}

function safeApiLogPath(path: string): string {
  const adminPrefix = "/api/admin/privacy-requests";
  if (!path.startsWith(`${adminPrefix}/`)) return path;

  const segments = path.slice(adminPrefix.length + 1).split("/");
  const actionSuffix =
    segments.length > 1 ? `/${segments.slice(1).join("/")}` : "";
  return `${adminPrefix}/:publicId${actionSuffix}`;
}

export function createApiRequestLogger(
  writeLog: (message: string) => void,
): RequestHandler {
  return (req, res, next) => {
    const start = Date.now();
    const path = req.path;
    let capturedJsonResponse: unknown;

    const originalResJson = res.json;
    res.json = function (bodyJson, ...args) {
      capturedJsonResponse = bodyJson;
      return originalResJson.apply(res, [bodyJson, ...args]);
    };

    res.on("finish", () => {
      if (!path.startsWith("/api")) return;

      const duration = Date.now() - start;
      const loggedPath = safeApiLogPath(path);
      let logLine = `${req.method} ${loggedPath} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse && !isPrivacyRequestPath(path)) {
        logLine += ` :: ${JSON.stringify(
          redactSensitiveLeadFields(capturedJsonResponse),
        )}`;
      }
      writeLog(logLine);
    });

    next();
  };
}