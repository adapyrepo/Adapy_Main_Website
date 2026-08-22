import { z } from "zod";

export const privacyCompletionSchema = z.object({
  responseDelivered: z.literal(true),
});

export const manualFulfillmentSchema = z.object({
  leadStoreActionCompleted: z.literal(true),
  dealerCount: z.number().int().nonnegative(),
  dealerAcknowledged: z.boolean(),
});

export type PrivacyWorkflowError = {
  code: string;
  message: string;
};

export function getManualFulfillmentError(
  requestType: string,
  dealerCount: number,
  dealerAcknowledged: boolean,
): PrivacyWorkflowError | null {
  const dealerAcknowledgementRequired =
    (requestType === "deletion" || requestType === "withdrawal") &&
    dealerCount > 0;
  if (dealerAcknowledgementRequired && !dealerAcknowledged) {
    return {
      code: "DEALER_CONFIRMATION_REQUIRED",
      message:
        "Record the dealer's written acknowledgement before confirming fulfillment.",
    };
  }
  return null;
}

export function getPrivacyClosureError(request: {
  externalActionStatus: string;
  acknowledgedAt: Date | null;
  identityVerifiedAt: Date | null;
  requestType: string;
  dealerCount: number | null;
  dealerNotificationStatus: string;
}): PrivacyWorkflowError | null {
  if (request.externalActionStatus !== "completed") {
    return {
      code: "EXTERNAL_ACTION_NOT_CONFIRMED",
      message: "The lead-store action must be confirmed before closing this request.",
    };
  }
  if (!request.acknowledgedAt) {
    return {
      code: "ACKNOWLEDGEMENT_REQUIRED",
      message: "Record the acknowledgement before closing this request.",
    };
  }
  if (!request.identityVerifiedAt) {
    return {
      code: "IDENTITY_NOT_VERIFIED",
      message: "Verify the requester's identity before closing this request.",
    };
  }
  if (
    (request.requestType === "deletion" ||
      request.requestType === "withdrawal") &&
    request.dealerCount !== 0 &&
    request.dealerNotificationStatus !== "acknowledged"
  ) {
    return {
      code: "DEALER_CONFIRMATION_REQUIRED",
      message: "Dealer acknowledgement is required before closing this request.",
    };
  }
  return null;
}