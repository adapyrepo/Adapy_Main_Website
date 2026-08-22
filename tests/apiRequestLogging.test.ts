import express from "express";
import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApiRequestLogger } from "../server/apiRequestLogging";

function loggedApp() {
  const logs: string[] = [];
  const app = express();
  app.use(createApiRequestLogger((message) => logs.push(message)));
  return { app, logs };
}

describe("API response logging", () => {
  it.each([
    "/api/privacy-requests",
    "/api/admin/privacy-requests",
    "/api/admin/privacy-requests/MHMDA-PRIVATE123",
    "/api/admin/privacy-requests/MHMDA-PRIVATE123/fulfill",
  ])("omits privacy-request response bodies for %s", async (path) => {
    const { app, logs } = loggedApp();
    app.get(path, (_req, res) => {
      res.json({
        publicId: "MHMDA-PRIVATE123",
        requestType: "deletion",
        fullName: "Private Requester",
        email: "private@example.test",
        phone: "555-0100",
        dueAt: "2026-09-20T00:00:00.000Z",
        events: [{ eventType: "identity_verified" }],
      });
    });

    await request(app).get(path).expect(200);

    const loggedPath = path
      .replace(
        "/api/admin/privacy-requests/MHMDA-PRIVATE123",
        "/api/admin/privacy-requests/:publicId",
      );
    expect(logs).toHaveLength(1);
    expect(logs[0]).toContain(`GET ${loggedPath} 200`);
    expect(logs[0]).not.toContain("MHMDA-PRIVATE123");
    expect(logs[0]).not.toContain("Private Requester");
    expect(logs[0]).not.toContain("private@example.test");
    expect(logs[0]).not.toContain("555-0100");
    expect(logs[0]).not.toContain("deletion");
    expect(logs[0]).not.toContain("identity_verified");
  });

  it("still redacts sensitive lead fields on other API responses", async () => {
    const { app, logs } = loggedApp();
    app.get("/api/example", (_req, res) => {
      res.json({
        id: "safe-id",
        situation: "private health details",
        adaptive_equipment: "private equipment details",
      });
    });

    await request(app).get("/api/example").expect(200);

    expect(logs[0]).toContain("safe-id");
    expect(logs[0]).toContain("[redacted-sensitive]");
    expect(logs[0]).not.toContain("private health details");
    expect(logs[0]).not.toContain("private equipment details");
  });
});