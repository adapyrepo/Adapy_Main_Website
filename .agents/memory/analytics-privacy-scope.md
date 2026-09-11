---
name: Analytics privacy scope
description: Why custom analytics starts narrowly rather than tracking all conversion funnels.
---

Prefer fixed marketing-action events without custom payloads. Treat expansion into individual inquiries, role choices, and privacy requests as a separate privacy decision.

**Why:** This site's mobility inquiry flows can reveal health-related interests even without names or contact details. Redacting form fields alone does not address sensitive behavioral inference.

**How to apply:** Review the sensitivity of the action and page before adding events. This restriction concerns custom instrumentation; it does not disable the hosting provider's automatic pageviews.

Meta advertising uses an opt-out model. The owner explicitly requested that only a saved opt-out or Global Privacy Control block initialization; permission to implement is not permission to publish.

**Why:** The owner explicitly changed the prior opt-in decision. A loaded vendor SDK can persist across SPA navigation, so withdrawal still needs document isolation and cookie cleanup.

**How to apply:** Do not reintroduce the superseded Meta route/referrer allowlist or admin-session check without a new user decision. Never load when GPC is enabled or a decline is saved. Keep these Meta requirements separate from the custom marketing-action analytics policy above.