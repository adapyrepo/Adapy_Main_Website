# Adapy Compliance Posture

## Executive summary

Adapy is one product, but it operates across four very different regulatory contexts:

1. **Device telemetry from a personal adaptive vehicle** — by itself, this is consumer IoT data, not protected health information.
2. **Clinician workflows in the CDRS Portal** — occupational therapists and certified driver rehabilitation specialists prescribing adaptive equipment generate clinical records. This is PHI when handled on behalf of a covered entity, and is subject to HIPAA via a Business Associate Agreement.
3. **Medicaid-funded NEMT trips** — non-emergency medical transportation data (rider identity, pickup, drop-off, trip purpose) is PHI by default because the broker and transit provider are covered entities or their business associates.
4. **Marketing site, lead capture, newsletter, dealer/fleet sales funnels** — general consumer privacy obligations only (CCPA/CPRA where applicable, state UDAP, CAN-SPAM for newsletter).

Treating the entire platform under HIPAA is operationally expensive and slows the marketing site to a crawl. Treating it all as consumer software is dangerous and uninsurable. The answer is **segmentation**: keep regulated data in named, audited zones, keep general data outside them, and make the boundary explicit.

This document maps each Adapy feature to its regime, explains why, and points to the data-zone definitions and segmentation architecture that follow.

> Hand this summary to legal counsel, a CDRS clinic, or an NEMT broker as-is. The remainder of the folder is for engineering and security.

---

## Regulatory regimes referenced

| Short name | Full reference | Where it bites Adapy |
|---|---|---|
| HIPAA (BA) | Health Insurance Portability and Accountability Act, business-associate liability under 45 CFR §§ 160, 164 | CDRS Portal, NEMT Fleet trip data |
| MHMDA | Washington My Health My Data Act | Any "consumer health data" we collect from WA residents (e.g. mobility-impairment status implied by app signup) |
| CCPA/CPRA | California Consumer Privacy Act / Privacy Rights Act | Marketing site, newsletter, contact requests, dealer/fleet leads from CA residents |
| State UDAP | State unfair-and-deceptive-practices acts | All consumer-facing claims, especially safety claims on Smart Hub / Safety Modules |
| CAN-SPAM | 15 USC § 7701 | Newsletter, transactional vs. promotional email |
| FTC Section 5 | 15 USC § 45 | Privacy promises in `/privacy`, security claims everywhere |
| State data-breach laws | 50 separate statutes | Any zone, triggered by unauthorized acquisition |

We deliberately do **not** address SOC 2, ISO 27001, or HITRUST in this document — they are certification scaffolding that sits *on top of* the posture defined here, and belong in a separate planning track.

---

## Feature-by-feature mapping

Each row lists what the feature collects or displays, who the data is about, who can see it, and which regime applies. Zone assignments are defined in `data-zones.md`.

### Marketing & lead capture

| Feature | Data | Subject | Audience | Regime | Zone |
|---|---|---|---|---|---|
| **Home** (`/`) | None collected; renders product copy and CTAs | n/a | Public | None (UDAP for claims accuracy) | General |
| **Platform** (`/platform`) | None collected | n/a | Public | None (UDAP) | General |
| **Smart Hub** (`/hardware/smart-hub`) | None collected | n/a | Public | None (UDAP — safety claims must be substantiated) | General |
| **Safety Modules** (`/hardware/safety-modules`) | None collected | n/a | Public | None (UDAP — CO/temperature/voltage monitoring claims) | General |
| **Wireless Controllers** (`/hardware/wireless-controllers`) | None collected | n/a | Public | None (UDAP) | General |
| **Harness Integration** (`/hardware/harness-integration`) | None collected | n/a | Public | None (UDAP — third-party brand names appear) | General |
| **Pricing** (`/pricing`) | None collected | n/a | Public | None | General |
| **Products** (`/products`) | None collected (catalog rendered from `products` table) | n/a | Public | None (UDAP) | General |
| **Blog** (`/blog`) | None collected | n/a | Public | None (UDAP — claims accuracy in posts) | General |
| **Contact** (`/contact`) | Name, email, company, message, request type | Prospect (often dealer/fleet operator, sometimes end user) | Adapy sales | CCPA/CPRA, CAN-SPAM if subscribed | General |
| **Newsletter subscription** | Email | Subscriber | Adapy marketing | CCPA/CPRA, CAN-SPAM | General |
| **Privacy / Terms** (`/privacy`, `/terms`) | None collected | n/a | Public | FTC § 5 (promises must be kept) | General |

**Reasoning.** None of the marketing surfaces collect health information today. Disability status is *implied* by interest in adaptive equipment, but the contact form asks for company and request type, not medical history. Treat all of this as ordinary B2B/B2C lead capture under CCPA/CPRA and CAN-SPAM. The exposure here is reputational and FTC-driven: any safety claim made on a hardware page must match what the product actually does.

### Audience funnels

| Feature | Data | Subject | Audience | Regime | Zone |
|---|---|---|---|---|---|
| **User Funnel** (`/user-funnel`) | First/last name, email, phone, city, state, country, **situation** (free-text), **adaptive_equipment** (free-text); submitted to an external Supabase function endpoint | End user with a disability (often explicit in `situation`/`adaptive_equipment` fields) | Adapy sales | CCPA/CPRA, **MHMDA for WA residents** (and any other state with consumer-health-data law), CAN-SPAM | General — see note |
| **Dealer Funnel** (`/dealer-funnel`) | First/last name, email, phone, company name, city, state, country, situation, adaptive_equipment; submitted to the same external Supabase endpoint | Dealer staff (and incidentally their end customer if described in free-text) | Adapy sales | CCPA/CPRA, CAN-SPAM; MHMDA if a WA-resident end user is described in free-text | General |
| **Individual Solutions** (`/solutions/individual`) | None collected directly; routes visitors to the User Funnel | End user (implied) | Public | None at this surface; downstream regime is the User Funnel's | General |

**Note on the User Funnel.** Unlike the lightweight contact form, the User Funnel asks for `situation` and `adaptive_equipment` as free-text. A WA resident describing their disability or required equipment is providing consumer health data under MHMDA, full stop. Three practical mitigations:
- (a) Add an MHMDA-aligned consumer health data notice before the WA-resident path (and any other state with equivalent law), with explicit consent capture.
- (b) Treat `situation` and `adaptive_equipment` as sensitive fields in storage and access logs even though they live in the General zone.
- (c) Apply minimum-necessary discipline — do not echo these fields into marketing analytics, error reports, or LLM context.

The funnel does not need to be elevated into Regulated-Clinical (no covered-entity relationship), but it is the most sensitive surface in the General zone and should be treated as the high-water mark for General-zone controls.

**Sensitive-field handling (applied).** Mitigations (b) and (c) are now enforced in code for both funnels:
- `shared/sensitiveFields.ts` is the single source of truth. It names the sensitive lead fields — `situation`, `adaptive_equipment`, and the WA consent timestamp `mhmda_consent_at` — and exports `redactSensitiveLeadFields()` (a recursive redactor) plus `presentSensitiveFields()`.
- **Access logs.** The Express request logger suppresses response bodies entirely for public and admin privacy-request routes. Other `/api` response bodies run through `redactSensitiveLeadFields()` before logging, so sensitive lead fields never reach application/access logs even if the upstream lead store echoes them back.
- **Storage tagging.** The lead proxy (`POST /api/lead-proxy` in `server/routes.ts`) sends an `X-Sensitive-Fields` header listing the sensitive fields present in each submission, so the receiving store can tag them as sensitive in its own storage and access logs. The values are still transmitted (they are the reason the lead exists) but flagged for restricted handling.
- **Analytics / error reports / LLM context.** No product-analytics, error-tracking (Sentry), or LLM integration exists in the codebase today. The exclusion is nonetheless enforceable going forward: any such integration must route lead data through `redactSensitiveLeadFields()` (documented in that module) rather than passing raw payloads. Reviewers should treat a raw lead payload reaching analytics/error/LLM code as a defect.

**Note on the external submission endpoint.** Both funnels and the NEMT Fleet form post to an Adapy-controlled proxy (`POST /api/lead-proxy` in `server/routes.ts`) which injects the upstream `X-Form-Api-Key` server-side from the `LEAD_FORM_API_KEY_QUALIFY` and `LEAD_FORM_API_KEY_FLEET` environment variables before forwarding to the Supabase Functions endpoint. The receiving Supabase function and its storage are still, in effect, an extension of the General zone and are governed by whatever protections Supabase and the receiving function provide. See the "Current implementation gaps" section below for the remaining vendor-diligence work.

### Operator surfaces (PHI exposure)

| Feature | Data | Subject | Audience | Regime | Zone |
|---|---|---|---|---|---|
| **CDRS Portal** (`/software/cdrs`) | Client identity, prescribed configuration, usage sessions, success/failure rate, training milestones, justification packets, re-evaluation notes | Clinician's patient | The prescribing OT/CDRS, their clinic | **HIPAA** as business associate of the clinic | **Regulated-Clinical** |
| **NEMT Fleet** (`/solutions/nemt`) | Marketing page **plus a fleet-lead intake form** (first/last name, company, email, phone, fleet size, wheelchair vehicle count, state, adaptive equipment description); production deployments would carry trip identity, driver, vehicle, and equipment cycle data tied to a Medicaid-funded ride | Lead form: broker/operator staff. Production: Medicaid beneficiary / NEMT rider | Lead form: Adapy sales. Production: NEMT broker, transit provider, dispatcher | Lead form: CCPA/CPRA, CAN-SPAM. Production: **HIPAA** as business associate of the broker/provider | Lead form: General. Production trip data: **Regulated-Transport** |
| **Dealer Dashboard** (`/software/dealer`) | Vehicle identity, install record, equipment health, service history; **end-user PII only when the dealer adds it** | The dealer's customer | Dealer staff | CCPA/CPRA + state UDAP; HIPAA only if the dealer is operating on behalf of a covered entity (rare today) | General by default, **Regulated-Clinical** if a covered-entity flag is set on the account |

**Reasoning — CDRS.** The clinician is a covered entity (or works for one). Any system they use to store or transmit patient information about adaptive driving prescriptions is acting as a business associate. A signed BAA, encryption, audit logging, breach SLAs, and training all become required. The 12 reports listed on the CDRS Portal page (Independence Uptime, Justification Packet, Outcomes Dashboard, etc.) are derived from PHI and inherit PHI protection.

**Reasoning — NEMT.** Medicaid-funded transportation is treated as healthcare under HIPAA: the trip itself is the service. Pickup/drop-off addresses combined with rider identity reveal where someone receives care, which is PHI. Adapy's role inside an NEMT deployment is business associate of the broker or transit agency.

**Reasoning — Dealer Dashboard.** A vehicle install record is not inherently PHI — it's an asset record. The dealer is generally not a covered entity. We mark it as General by default but keep a feature flag that can promote a dealer account into the Regulated-Clinical zone (e.g., a hospital-owned mobility program), at which point the same controls as CDRS apply.

### Devices and infrastructure

| Feature | Data | Subject | Audience | Regime | Zone |
|---|---|---|---|---|---|
| **Smart Hub telemetry** | Equipment cycle counts, voltages, temperatures, error codes, GPS (if enabled) — keyed to a vehicle ID | Vehicle (not a person) | Adapy ops, dealer, fleet operator | None *until joined to a person* | General |
| **Smart Hub telemetry → CDRS join** | Same telemetry, joined to a clinician's patient ID | Patient | Clinician | HIPAA | **Regulated-Clinical** |
| **Smart Hub telemetry → NEMT join** | Same telemetry, joined to a trip and rider | Rider | NEMT operator | HIPAA | **Regulated-Transport** |
| **Safety Modules** | Sensor readings (CO, temperature, battery, GPS) | Vehicle | Same as Smart Hub | Same as Smart Hub | Same as Smart Hub |
| **Wireless Controllers** | Control input events | Vehicle | Same as Smart Hub | Same as Smart Hub | Same as Smart Hub |
| **Harness Integration** | Equipment model and serial mapping | Vehicle / equipment | Dealer, manufacturer | None | General |

**The single most important rule on this page:** raw device telemetry is not PHI. *Telemetry joined to a patient or to a Medicaid trip is PHI.* The join — not the sensor — creates the regulated record. Segmentation must keep the join inside the regulated zones and never echo the joined dataset back into the General zone.

---

## Current implementation gaps (posture vs. reality)

This posture describes the target state. As of May 2026, the live codebase has known gaps that the posture documents but does not yet enforce. Surfacing them here so counsel and engineering see posture and reality side-by-side:

- ~~**Hardcoded form API key in the frontend bundle.**~~ **Resolved.** `UserFunnel.tsx`, `DealerFunnel.tsx`, and `NEMTFleet.tsx` now post to the Adapy-controlled `POST /api/lead-proxy` endpoint, which injects the upstream `X-Form-Api-Key` from the `LEAD_FORM_API_KEY_QUALIFY` and `LEAD_FORM_API_KEY_FLEET` environment variables. No API keys ship in the client bundle. The previously-hardcoded keys should be rotated upstream since they were public.
- **External lead endpoint outside the documented zone topology.** Funnel submissions go directly to a Supabase Functions URL rather than through Adapy's own backend. The receiving function and its storage are functionally part of the General zone but are not under Adapy's audit-log, retention, or vendor-diligence controls today. They need either to be brought under those controls or to be replaced with a first-party intake.
- **MHMDA request handling has an authenticated manual workflow.** Washington residents can submit an access, recipient-list, consent-withdrawal, or deletion ticket through `/privacy-request`. An admin must record acknowledgement and identity verification, complete the lead-store and dealer steps in the internal SOP, and attest to those results in the protected workflow. Tickets cannot be closed without confirmed manual fulfillment, required dealer acknowledgement, and final-response confirmation.
- **No PHI redaction layer on logging.** The application logger has no field allow-list. This is acceptable today because no PHI is collected, but it must be in place before the Clinical or Transport schemas exist.
- **`shared/schema.ts` is single-zone.** Only General-zone tables exist (`products`, `contact_requests`, `subscribers`). Clinical and Transport schemas are described in `data-zones.md` and `segmentation-architecture.md` but are not yet in code.

These gaps are tracked as concrete tickets in the engineering follow-ups appendix of `obligations-checklist.md`.

---

## How to use this document

- Engineering uses `data-zones.md` and `segmentation-architecture.md` to decide where a new endpoint, table, or third-party vendor sits.
- Security uses `obligations-checklist.md` to translate the posture into BAAs, audit log retention, training scope, and breach SLAs.
- The "engineering follow-ups appendix" at the end of `obligations-checklist.md` is the seed list for future tasks — it is the "what changes in code" companion to this posture, intentionally not implemented in this task.

---

## Limits of this document

- Not legal advice. Counsel must review before this posture is relied on for a regulated deployment.
- No state-by-state breach matrix. We name the obligation and link out; we do not enumerate all 50 states.
- No SOC 2 / HITRUST / ISO planning.
- No BAA contract language. Templates live with counsel.
- The posture assumes the current feature set as of May 2026 and the schema in `shared/schema.ts`. New collection points require a re-mapping.
