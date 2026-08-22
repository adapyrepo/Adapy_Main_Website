import crypto from "crypto";

export const PRIVACY_EVENT_GENESIS = "GENESIS";

type PrivacyEventForHash = {
  privacyRequestId: number;
  eventType: string;
  actorEmail: string;
  createdAt: Date;
  previousHash: string;
};

export function createPrivacyEventHash(event: PrivacyEventForHash): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is required to write privacy audit events.");
  }

  const canonical = [
    event.privacyRequestId,
    event.eventType,
    event.actorEmail,
    event.createdAt.toISOString(),
    event.previousHash,
  ].join("|");
  return crypto.createHmac("sha256", secret).update(canonical).digest("hex");
}

export function verifyPrivacyEventChain(
  events: Array<{
    privacyRequestId: number;
    eventType: string;
    actorEmail: string;
    createdAt: Date;
    previousHash: string;
    eventHash: string;
  }>,
): boolean {
  let previousHash = PRIVACY_EVENT_GENESIS;
  for (const event of events) {
    if (event.previousHash !== previousHash) return false;
    const expectedHash = createPrivacyEventHash(event);
    if (
      event.eventHash.length !== expectedHash.length ||
      !/^[a-f0-9]+$/i.test(event.eventHash)
    ) {
      return false;
    }
    if (
      !crypto.timingSafeEqual(
        Buffer.from(expectedHash, "hex"),
        Buffer.from(event.eventHash, "hex"),
      )
    ) {
      return false;
    }
    previousHash = event.eventHash;
  }
  return true;
}