---
name: Analytics privacy scope
description: Why custom analytics starts narrowly rather than tracking all conversion funnels.
---

Prefer fixed marketing-action events without custom payloads. Treat expansion into individual inquiries, role choices, and privacy requests as a separate privacy decision.

**Why:** This site's mobility inquiry flows can reveal health-related interests even without names or contact details. Redacting form fields alone does not address sensitive behavioral inference.

**How to apply:** Review the sensitivity of the action and page before adding events. This restriction concerns custom instrumentation; it does not disable the hosting provider's automatic pageviews.

Meta advertising uses an opt-out preference model on its approved public pages. A saved decline and Global Privacy Control both override the default enabled state; permission to implement is not permission to publish.

**Why:** The owner explicitly changed the prior opt-in decision. A loaded vendor SDK can persist across SPA navigation, so withdrawal still needs document isolation and cookie cleanup.

**How to apply:** Preserve the narrow page allowlist and default-deny host/URL checks. Never load when GPC is enabled or a decline is saved. Do not relax exclusions for campaign parameters, inquiry pages, or sensitive content merely to increase event counts.