import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createPrivacyEventHash,
  PRIVACY_EVENT_GENESIS,
  verifyPrivacyEventChain,
} from "../server/privacyAudit";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("privacy audit chain", () => {
  it("detects a changed historical event", () => {
    vi.stubEnv("SESSION_SECRET", "audit-test-secret");
    const createdAt = new Date("2026-08-22T00:00:00.000Z");
    const first = {
      privacyRequestId: 9,
      eventType: "acknowledgement_sent",
      actorEmail: "privacy@example.test",
      createdAt,
      previousHash: PRIVACY_EVENT_GENESIS,
    };
    const firstHash = createPrivacyEventHash(first);
    const second = {
      privacyRequestId: 9,
      eventType: "identity_verified",
      actorEmail: "privacy@example.test",
      createdAt: new Date("2026-08-22T00:01:00.000Z"),
      previousHash: firstHash,
    };
    const secondHash = createPrivacyEventHash(second);
    const events = [
      { ...first, eventHash: firstHash },
      { ...second, eventHash: secondHash },
    ];

    expect(verifyPrivacyEventChain(events)).toBe(true);
    expect(
      verifyPrivacyEventChain([
        { ...events[0], eventType: "identity_verification_skipped" },
        events[1],
      ]),
    ).toBe(false);
  });
});