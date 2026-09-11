---
name: Analytics privacy scope
description: Why custom analytics starts narrowly rather than tracking all conversion funnels.
---

Prefer fixed marketing-action events without custom payloads. Treat expansion into individual inquiries, role choices, and privacy requests as a separate privacy decision.

**Why:** This site's mobility inquiry flows can reveal health-related interests even without names or contact details. Redacting form fields alone does not address sensitive behavioral inference.

**How to apply:** Review the sensitivity of the action and page before adding events. This restriction concerns custom instrumentation; it does not disable the hosting provider's automatic pageviews.

Meta advertising has a separate consent and activation boundary. Keep it off until the owner verifies Meta's account-side matching/automatic-event settings and approves activation; do not treat permission to implement as permission to publish.

**Why:** The owner approved a consent-gated implementation for review only. A loaded vendor SDK can persist across SPA navigation, and remote Meta settings can enable data collection beyond the explicit PageView call.

**How to apply:** Preserve the narrow page allowlist and default-deny host/URL checks. Do not relax exclusions for campaign parameters, inquiry pages, or sensitive content merely to increase event counts. Review remote settings and real outbound payloads before activation.