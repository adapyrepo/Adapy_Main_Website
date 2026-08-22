---
name: Lead form authentication
description: How the external Supabase lead-intake function authenticates website form submissions.
---

The Supabase lead-intake Edge Function authenticates a request against the `api_key` stored on the active `lead_forms` database row selected by the submitted slug. It does not read a separate per-form Edge Function secret.

Dealer Inquiry (`dealer`) and User Inquiry (`qualify-form`) are separate forms and must use separate server-side credentials.

**Why:** Sending dealer requests with the User Inquiry slug/key caused authentication failures and routed the wrong kind of lead.

**How to apply:** When adding or repairing a website lead form, match its slug to the intended `lead_forms` row and store that row’s key in a dedicated Replit secret. Never expose the key to the browser or chat.