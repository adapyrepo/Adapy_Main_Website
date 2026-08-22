---
name: Lead form authentication
description: How the external Supabase lead-intake function authenticates website form submissions.
---

The Supabase lead-intake Edge Function authenticates a request against the `api_key` stored on the active `lead_forms` database row selected by the submitted slug. It does not read a separate per-form Edge Function secret.

Dealer Inquiry (`dealer`), User Inquiry (`qualify-form`), NEMT Fleet (`fleet`), and Custom Quote (`customquote`) are separate forms and must use separate server-side credentials.

**Why:** Sending a form with another form’s slug/key causes authentication failures or routes the wrong kind of lead. Putting a key in browser code exposes it publicly.

**How to apply:** When adding or repairing a website lead form, match its slug to the intended `lead_forms` row and store that row’s key in a dedicated Replit secret. Never expose the key to the browser or chat.