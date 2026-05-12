# Data Zones

Adapy data lives in one of three zones. The zone determines what data is allowed, who can access it, how long it is kept, and what controls are required to move data across the boundary.

A zone is not a database — it is a *policy boundary* that is then implemented in databases, schemas, network segments, IAM roles, log destinations, and vendor contracts. The same physical Postgres cluster can host multiple zones if the schemas, roles, and audit pipes are separated; what matters is that the boundary is enforceable and provable.

---

## Zone 1 — Regulated-Clinical

**Purpose.** Hold data that is PHI because it is collected or processed on behalf of a covered entity (today: CDRS clinicians and OTs; tomorrow: hospital-owned mobility programs).

**Allowed data**
- Patient identity (name, DOB, MRN-equivalent clinic ID)
- Clinical notes, prescribed equipment configurations, training milestones
- Smart Hub / Safety Module telemetry **joined to a patient**
- Outcomes reports (Independence Uptime, Justification Packet, Outcomes Dashboard, etc.)
- Re-evaluation history
- Audit logs of clinician access

**Disallowed data**
- Marketing analytics, lead-capture data, newsletter status
- NEMT trip records (those belong in Regulated-Transport)
- Raw, un-joined device telemetry (lives in General)

**Access**
- Authenticated clinician users only, scoped to their clinic and their assigned patients (row-level)
- Adapy support: break-glass only, requires ticketed reason, every access written to the audit log
- No third-party vendor access without a signed BAA

**Encryption**
- TLS 1.2+ in transit, mTLS for service-to-service
- AES-256 at rest, with keys held in a managed KMS; rotation at least annually
- Field-level encryption for free-text clinical notes

**Audit logging**
- Every read of a patient record is logged with actor, patient ID, timestamp, source IP, and reason code
- Logs retained 6 years (HIPAA documentation retention)
- Logs shipped to a write-once destination separate from the application database

**Retention**
- Patient records retained per the originating clinic's record-retention policy (typically 7–10 years, jurisdiction-dependent)
- Justification packets retained as long as the underlying patient record
- Backups encrypted with the same key class as the primary data

**Crossing rules — into the zone**
- Telemetry from General → Regulated-Clinical: allowed only via a patient-join service that records the join in the audit log; the original device-keyed record stays in General
- User input from General → Regulated-Clinical: only through authenticated clinician sessions

**Crossing rules — out of the zone**
- No automated outflow. PHI does not appear in marketing analytics, error reports, third-party logging, or LLM context windows.
- De-identified aggregates (Safe Harbor or Expert Determination) may exit the zone for product analytics; the de-identification process and re-identification risk assessment live with the data engineering team and must be documented per export.

---

## Zone 2 — Regulated-Transport

**Purpose.** Hold data that is PHI because it describes a Medicaid-funded NEMT trip or a trip provided on behalf of a covered entity (broker, MCO, transit agency operating as a BA).

**Allowed data**
- Trip records: rider identity, pickup, drop-off, trip purpose code, broker ID, vehicle, driver
- Smart Hub / Safety Module telemetry **joined to a trip**
- Eligibility and authorization records received from the broker
- Audit logs of dispatcher and broker access

**Disallowed data**
- Clinical notes (Regulated-Clinical)
- General marketing data
- Personal app accounts of riders that exist outside an NEMT context

**Access**
- Authenticated dispatcher and broker users, scoped to their organization and the trips they are authorized to see
- Driver app shows only the rider information needed to complete the assigned trip and only for the duration of the trip
- Adapy support: break-glass with the same controls as Regulated-Clinical

**Encryption**
- Identical to Regulated-Clinical
- GPS breadcrumbs joined to a rider treated as PHI; raw vehicle GPS without rider linkage is General

**Audit logging**
- Every read of a trip record logged with actor, trip ID, timestamp, source IP
- 6-year retention, write-once destination

**Retention**
- Trip records retained per the broker's record-retention obligation (often 6 years from trip date for Medicaid recordkeeping)
- Driver-app cached trip data wiped at end of shift
- Backups encrypted with the same key class as the primary data

**Crossing rules — into the zone**
- Telemetry from General → Regulated-Transport: allowed only via a trip-join service that writes the join to the audit log
- Eligibility data from broker → zone: ingested over a documented integration with a signed BAA

**Crossing rules — out of the zone**
- No automated outflow.
- De-identified aggregates may exit for fleet operational reporting using the same de-identification process as Regulated-Clinical.
- Required disclosures to the broker happen *inside* the zone (broker is in-zone via BAA), not by exporting to a separate broker system.

---

## Zone 3 — General

**Purpose.** Everything that is neither Regulated-Clinical nor Regulated-Transport. This is the default zone for the marketing site, lead capture, dealer accounts (unless flagged), and raw device telemetry that has not been joined to a person.

**Allowed data**
- Contact requests (`contact_requests` table)
- Newsletter subscribers (`subscribers` table)
- Product catalog (`products` table)
- Dealer accounts and the dealer's own business records
- Raw, vehicle-keyed device telemetry from Smart Hub, Safety Modules, Wireless Controllers
- Web analytics, error monitoring, marketing attribution

**Disallowed data**
- Anything keyed to a clinician's patient
- Anything keyed to a Medicaid trip or rider
- Any record that combines disability diagnosis with identity (those are MHMDA "consumer health data" and either need an MHMDA-specific consent surface in this zone or must be promoted to Regulated-Clinical)

**Access**
- Public for unauthenticated marketing pages
- Authenticated for dealer accounts, scoped to the dealer's organization
- Adapy staff per role; no break-glass concept needed because there is no PHI

**Encryption**
- TLS in transit
- AES-256 at rest for the application database
- No field-level encryption requirement, but secrets and credentials always encrypted at rest

**Audit logging**
- Standard application access logs
- 90-day retention for application logs; 1-year retention for security-relevant events

**Retention**
- Contact requests retained for the duration of the active sales relationship plus 2 years, then deleted
- Newsletter subscribers retained until unsubscribe; unsubscribe processed within 10 business days (CAN-SPAM)
- Device telemetry retained for the operational lifetime of the device + 2 years; aggregated indefinitely
- CCPA/CPRA deletion requests honored within 45 days

**Crossing rules — into the zone**
- Aggregated, de-identified data from Regulated zones may enter (per the rules in those zones)
- Identifiable data from a Regulated zone *never* enters

**Crossing rules — out of the zone**
- Telemetry → Regulated-Clinical join: outbound *reference* only; the General-zone record is unchanged, the join lives in the regulated zone
- Telemetry → Regulated-Transport join: same pattern
- A General-zone account that is later flagged as covered-entity-operated is moved to Regulated-Clinical via a one-way migration that re-keys and re-encrypts the records

---

## Zone summary

| Zone | Trigger | Default for | Strictest control |
|---|---|---|---|
| Regulated-Clinical | Data handled on behalf of a covered entity (CDRS clinic, hospital mobility program) | CDRS Portal, joined telemetry, outcomes reports | Per-record audit log, 6-year log retention, BAA-gated vendors |
| Regulated-Transport | Medicaid-funded or covered-entity-funded transportation | NEMT Fleet, trip-joined telemetry | Same as Clinical, plus driver-app session-bounded caching |
| General | Default | Marketing, leads, newsletter, raw telemetry, dealer accounts | CCPA/CPRA deletion within 45 days, MHMDA notice on disability-implying intake |
