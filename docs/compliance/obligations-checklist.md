# Obligations Checklist

Each line is meant to become a ticket. Items are grouped by zone, then by category. Status is intentionally blank — this is the starting backlog, not a status report.

---

## Regulated-Clinical (CDRS Portal, joined telemetry)

### Business Associate Agreements
- [ ] Maintain a standard Adapy BAA template (drafted by counsel, not in this repo).
- [ ] No CDRS Portal account may be activated without a signed, counter-signed BAA on file.
- [ ] BAAs are required with every downstream subprocessor that touches the Clinical zone (cloud, transactional email, error monitoring, LLM provider, backup vendor).
- [ ] Maintain a vendor-BAA register and review annually.

### Encryption
- [ ] TLS 1.2+ for all client connections; HSTS enabled.
- [ ] mTLS or signed service tokens for service-to-service calls within the zone.
- [ ] AES-256 at rest for the Clinical schema and its backups.
- [ ] KMS-managed keys, customer-managed where the clinic requires it.
- [ ] Field-level encryption for free-text clinical notes and for the Justification Packet contents.
- [ ] Annual key rotation; documented rotation procedure.

### Audit logging
- [ ] Every read and write of a patient record produces a structured log entry: actor, patient ID, action, timestamp, source IP, reason code.
- [ ] Logs ship to a write-once destination (object lock or WORM service) within 60 seconds of the event.
- [ ] 6-year log retention.
- [ ] Quarterly review of break-glass access events.

### Access control
- [ ] Clinician SSO via the clinic's identity provider where available; otherwise Adapy-issued credentials with MFA required.
- [ ] Row-level scoping to assigned patients.
- [ ] Adapy support has no standing access; break-glass requires a ticket reference and writes to the audit log.
- [ ] Quarterly access review with each clinic.

### Training
- [ ] Annual HIPAA training for any Adapy employee or contractor with potential Clinical-zone access.
- [ ] Role-specific training for engineers building Clinical-zone features (de-identification, log scrubbing, what is and is not PHI).
- [ ] Training records retained 6 years.

### Vendor diligence
- [ ] Security questionnaire for every Clinical-zone vendor before contract signing.
- [ ] Annual re-attestation.
- [ ] No LLM or analytics vendor without BAA *and* zero-retention contract terms.

### Breach response
- [ ] Documented incident-response runbook with roles, escalation paths, and clock starts.
- [ ] HIPAA breach notification: notify affected individuals and HHS within 60 days (sooner per state law where applicable).
- [ ] Counsel-on-call relationship pre-established.
- [ ] Post-incident review within 30 days of containment.

### Data subject rights
- [ ] Honor patient access, amendment, and accounting-of-disclosures requests via the originating clinic (we are the BA, not the covered entity).
- [ ] Maintain disclosure log per 45 CFR 164.528.

---

## Regulated-Transport (NEMT Fleet, trip-joined telemetry)

### Business Associate Agreements
- [ ] BAA in place with each broker / transit agency before trip data is ingested.
- [ ] Subprocessor BAAs identical in scope to the Clinical zone.

### Encryption
- [ ] Identical posture to Regulated-Clinical.
- [ ] Driver-app local cache encrypted at rest on the device; cache wiped at end of shift.

### Audit logging
- [ ] Every read of a trip record produces a structured entry: actor, trip ID, timestamp, source IP.
- [ ] 6-year retention, write-once destination.
- [ ] Driver-app reads logged with driver ID and shift ID.

### Access control
- [ ] Broker / dispatcher SSO scoped to organization and trip ownership.
- [ ] Driver app shows only the assigned-trip roster for the active shift.
- [ ] Break-glass identical to Clinical zone.

### Training
- [ ] Annual HIPAA training for Transport-zone-touching staff.
- [ ] Driver-facing training at onboarding: what data is on the device, what to do if the device is lost.

### Vendor diligence
- [ ] Same questionnaire and re-attestation cycle as Clinical zone.

### Breach response
- [ ] Same runbook as Clinical zone.
- [ ] Coordinate notifications with the broker — usually broker leads, Adapy supports as BA.

### Medicaid recordkeeping
- [ ] Trip records retained per the broker's record-retention obligation (commonly 6 years from trip date); align Adapy retention to the longest applicable.

---

## General (marketing, leads, raw telemetry, dealer accounts)

### Privacy notices
- [ ] `/privacy` page kept current with actual practice (FTC § 5 — promises must be kept).
- [ ] CCPA/CPRA-compliant notice at collection on every form.
- [ ] MHMDA-aligned consumer health data notice on the WA-resident path of the User Funnel and any future intake that implies disability.

### Consumer rights
- [ ] CCPA/CPRA access, deletion, correction, and opt-out-of-sale requests honored within 45 days.
- [ ] "Do Not Sell or Share" link in the global footer where applicable.
- [ ] Newsletter unsubscribe processed within 10 business days (CAN-SPAM).
- [ ] Maintain a request log with timestamps for regulator inquiries.

### Marketing claims
- [ ] Every safety or capability claim on hardware pages (Smart Hub, Safety Modules, Wireless Controllers, Harness Integration) substantiated with engineering documentation before publication.
- [ ] Third-party brand names on the Harness Integration page reviewed annually for trademark and accuracy.

### Encryption and access
- [ ] TLS in transit; AES-256 at rest for the application database.
- [ ] Secrets in a managed secret store, not in source.
- [ ] Role-based access for Adapy staff; quarterly access review.

### Logging
- [ ] Application access logs retained 90 days.
- [ ] Security-relevant events retained 1 year.
- [ ] PHI never logged from this zone (it should never be in this zone in the first place — this is a defense-in-depth scrubber).

### Vendor diligence
- [ ] Lightweight security review for every General-zone vendor at contract signing.
- [ ] Annual re-attestation for vendors handling PII.

### Breach response
- [ ] State data-breach laws apply; notify per the strictest applicable jurisdiction (do not enumerate all 50 states here — counsel determines).
- [ ] Same incident-response runbook as the regulated zones.

---

## Cross-cutting

- [ ] Annual posture review of this folder; update on every material feature launch.
- [ ] Data-flow diagram (`segmentation-architecture.md`) updated whenever a new data source, third party, or zone-crossing service is introduced.
- [ ] Pen test annually; targeted testing of zone boundaries.
- [ ] Tabletop exercise annually on a simulated PHI breach.

---

## Appendix — Engineering follow-ups implied by this posture

These are the code and infrastructure changes the posture implies. They are *listed*, not implemented in this task. Each is scoped enough to become its own future task without re-deriving the rationale.

### Schema and storage
- [ ] Introduce `clinical` and `transport` Postgres schemas alongside the current `general` (default) schema. Wire Drizzle to a per-schema connection pool.
- [ ] Add KMS key references per zone; configure Postgres TDE or column-level encryption for clinical free-text fields.
- [ ] Add a `dealer_covered_entity` boolean on dealer accounts so a dealer flagged as operating on behalf of a covered entity is migrated into Regulated-Clinical.
- [ ] Implement the patient-join and trip-join tables inside their respective zones, keyed only by vehicle ID for the cross-zone reference.

### Auth and access
- [ ] Replace the single application role with three database roles (`general_app`, `clinical_app`, `transport_app`). Each backend process assumes only the role it needs.
- [ ] Add SSO providers for clinics and brokers; require MFA for all regulated-zone users.
- [ ] Build a break-glass workflow with reason capture and an automatic audit log entry.

### Audit logging
- [ ] Add audit-log middleware on every Clinical-zone and Transport-zone endpoint. Middleware records actor, target ID, action, IP, reason code.
- [ ] Provision write-once log storage (S3 Object Lock or equivalent) and ship logs out of the application within 60 seconds.
- [ ] Build a quarterly access-review report (per clinic, per broker).

### Lead intake (current implementation gaps)
- [ ] Remove the hardcoded `X-Form-Api-Key` from `UserFunnel.tsx`, `DealerFunnel.tsx`, and `NEMTFleet.tsx`. Replace with a server-side proxy or short-lived signed token issued by the Adapy backend.
- [ ] Decide whether to keep the Supabase Functions intake under Adapy's vendor-diligence and audit controls (sign a DPA, document retention) or replace it with a first-party endpoint inside `server/routes.ts`.
- [ ] Treat `situation` and `adaptive_equipment` as sensitive fields in storage and logging — no echo to analytics, error reports, or LLM context.

### Sign-up and onboarding
- [ ] Gate CDRS Portal sign-up behind a BAA workflow: clinic submits → counsel review → counter-sign → account provisioned.
- [ ] Same gate for NEMT Fleet broker onboarding.
- [ ] Add a CCPA/CPRA request intake page and route it to a tracked queue.
- [ ] Add the MHMDA notice surface on the WA-resident User Funnel path.

### De-identification
- [ ] Build a de-identification service for aggregate exports out of the regulated zones (Safe Harbor as the default; Expert Determination for richer outputs).
- [ ] Log every export with source zone, recipient, and the de-identification methodology used.

### Logging hygiene
- [ ] Add a PHI redaction layer on the structured logger. Allow-list field names per zone; everything else gets redacted.
- [ ] Configure error monitoring (Sentry or equivalent) with a BAA and PHI-scrubbing rules; no PHI in error payloads.

### LLM and analytics boundaries
- [ ] Maintain an explicit allow-list of LLM providers per zone. General-zone uses provider A; Regulated zones use provider B with BAA + zero-retention.
- [ ] Configure analytics SDKs to receive only General-zone events. No regulated identifiers in analytics payloads.

### Driver app
- [ ] Implement session-bounded cache on the driver app. End-of-shift wipe on a forced log-out.
- [ ] Remote-wipe capability for lost devices.

### Vendor and contract automation
- [ ] Maintain a machine-readable vendor inventory tagged by zone access.
- [ ] Trigger a re-attestation reminder annually per vendor.

### Documentation
- [ ] Update `replit.md` to reference this folder.
- [ ] Add a CONTRIBUTING note: any new endpoint that handles patient or trip data must declare its zone in the PR description.
