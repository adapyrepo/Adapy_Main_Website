// Sensitive lead fields captured by the User and Dealer funnels.
//
// Per docs/compliance/posture.md, the free-text `situation` and
// `adaptive_equipment` fields can reveal a person's disability or health
// condition, and `mhmda_consent_at` records a Washington consumer-health-data
// consent event. They live in the General zone but are the high-water mark for
// General-zone controls: they must be tagged as sensitive in storage/access
// logs and must never be echoed into product analytics events, error/Sentry
// payloads, application logs, or LLM prompt context.
//
// This module is the single source of truth. Any surface that logs, reports, or
// forwards lead data to a third party (analytics, error tracking, LLMs) must
// route it through `redactSensitiveLeadFields` first.
export const SENSITIVE_LEAD_FIELDS = [
  "situation",
  "adaptive_equipment",
  "mhmda_consent_at",
] as const;

export type SensitiveLeadField = (typeof SENSITIVE_LEAD_FIELDS)[number];

const SENSITIVE_SET = new Set<string>(SENSITIVE_LEAD_FIELDS);

export function isSensitiveLeadField(field: string): boolean {
  return SENSITIVE_SET.has(field);
}

export const SENSITIVE_REDACTION = "[redacted-sensitive]";

// Returns the sensitive field names actually present (with a non-empty value)
// in a lead payload. Used to tag which fields the receiving store must treat as
// sensitive without exposing their values.
export function presentSensitiveFields(
  payload: Record<string, unknown> | null | undefined,
): SensitiveLeadField[] {
  if (!payload || typeof payload !== "object") return [];
  return SENSITIVE_LEAD_FIELDS.filter((field) => {
    const value = payload[field];
    return value !== undefined && value !== null && value !== "";
  });
}

// Recursively replaces any sensitive lead field value with a redaction marker so
// the result is safe to write to logs, analytics events, error reports, or LLM
// context. Does not mutate the input.
export function redactSensitiveLeadFields<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => redactSensitiveLeadFields(item)) as unknown as T;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      out[key] = isSensitiveLeadField(key)
        ? SENSITIVE_REDACTION
        : redactSensitiveLeadFields(val);
    }
    return out as unknown as T;
  }
  return value;
}
