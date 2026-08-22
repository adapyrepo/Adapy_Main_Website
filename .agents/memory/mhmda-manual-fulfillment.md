---
name: MHMDA manual fulfillment
description: Why Washington privacy-request fulfillment is intentionally a manual operator process.
---

Washington MHMDA access, recipient-list, consent-withdrawal, and deletion requests must remain a manual operator process unless the user explicitly revisits this decision. The website may track requests, enforce workflow gates, and record audit evidence, but it should not automatically mutate the external lead store.

**Why:** The user explicitly chose manual deletion and withdrawal handling instead of provisioning a service-role credential for automatic changes. Manual work also allows the operator to verify legal holds, lead matches, follow-up suppression, and dealer acknowledgements before attesting completion.

**How to apply:** Preserve the authenticated queue, SOP, deadline tracking, manual fulfillment attestation, dealer confirmation, and separate final-response gate. Do not reintroduce a lead-store mutation adapter as a default or deployment requirement.