import { describe, expect, it } from "vitest";
import {
  getManualFulfillmentError,
  getPrivacyClosureError,
  manualFulfillmentSchema,
  privacyCompletionSchema,
} from "../server/privacyRequestWorkflow";

const readyToClose = {
  externalActionStatus: "completed",
  acknowledgedAt: new Date("2026-08-22T00:00:00.000Z"),
  identityVerifiedAt: new Date("2026-08-22T00:01:00.000Z"),
  requestType: "deletion",
  dealerCount: 1,
  dealerNotificationStatus: "acknowledged",
};

describe("manual privacy-request workflow", () => {
  it("requires explicit manual-action and final-response attestations", () => {
    expect(manualFulfillmentSchema.safeParse({}).success).toBe(false);
    expect(privacyCompletionSchema.safeParse({}).success).toBe(false);
    expect(
      manualFulfillmentSchema.safeParse({
        leadStoreActionCompleted: true,
        dealerCount: 0,
        dealerAcknowledged: false,
      }).success,
    ).toBe(true);
    expect(
      privacyCompletionSchema.safeParse({ responseDelivered: true }).success,
    ).toBe(true);
  });

  it("requires written dealer acknowledgement for deletion and withdrawal", () => {
    expect(getManualFulfillmentError("deletion", 1, false)?.code).toBe(
      "DEALER_CONFIRMATION_REQUIRED",
    );
    expect(getManualFulfillmentError("withdrawal", 1, false)?.code).toBe(
      "DEALER_CONFIRMATION_REQUIRED",
    );
    expect(getManualFulfillmentError("access", 1, false)).toBeNull();
    expect(getManualFulfillmentError("deletion", 0, false)).toBeNull();
    expect(getManualFulfillmentError("deletion", 1, true)).toBeNull();
  });

  it.each([
    [
      "EXTERNAL_ACTION_NOT_CONFIRMED",
      { externalActionStatus: "not_started" },
    ],
    ["ACKNOWLEDGEMENT_REQUIRED", { acknowledgedAt: null }],
    ["IDENTITY_NOT_VERIFIED", { identityVerifiedAt: null }],
    [
      "DEALER_CONFIRMATION_REQUIRED",
      { dealerNotificationStatus: "not_started" },
    ],
  ])("blocks closure with %s", (code, override) => {
    expect(getPrivacyClosureError({ ...readyToClose, ...override })?.code).toBe(
      code,
    );
  });

  it("allows closure only after every required gate is recorded", () => {
    expect(getPrivacyClosureError(readyToClose)).toBeNull();
  });
});