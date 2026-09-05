# Joint Journey - Interoperability Statement

**Version:** 1.0 | **Date:** 15/08/2026
**Organisation:** Elan Health Ltd (company number 17347255)

> Supports DTAC section D (Interoperability). Documents the current data formats,
> export capabilities, and integration position of Joint Journey.

---

## 1. Current integration position

Joint Journey is a **standalone web application**. It does not currently integrate
with NHS systems (e.g. EPR/EHR, PAS, e-Referral) or any other clinical system.

Users access the application directly via a web browser. All data is entered by
the patient themselves and stored in their own account.

---

## 2. Data formats

### User data (Firestore)
- Stored as JSON documents in Google Cloud Firestore.
- Each user has a single document (`users/{uid}`) containing their profile,
  progress, exercise completion records, mood logs, weight logs, Oxford Score
  responses, and safety screening answers.

### Patient Reported Outcome Measures (PROMs)
- **Oxford Hip Score** and **Oxford Knee Score**: 12 questions each, scored 0-4
  per question (0-48 total). Stored as structured data (individual question
  responses + total score + date).
- Scores can be exported as CSV via the admin analytics script (`analytics/retention.js`).

### Exercise completion data
- Stored as date-keyed objects: `{ "YYYY-MM-DD": ["exercise-id-1", "exercise-id-2", ...] }`
- Exportable as CSV showing per-day, per-exercise completion.

---

## 3. Export capabilities

### Currently available
- **Admin CSV export** via the retention analytics script (Node.js, Firebase Admin SDK).
  Outputs per-user engagement data: signup date, surgery date, active days,
  weekly retention, pre-op activity, exercise completion.
- **User-facing data**: users can view their own progress, scores, and history
  within the app. A formal user data export (download your data) feature is
  planned but not yet built.

### Planned
- **User data export** (UK GDPR Article 20 - right to data portability): allow
  users to download their complete data as a structured file (JSON or CSV).
- **Aggregate PROMs export**: anonymised/pseudonymised outcome data for service
  evaluation reporting to trusts.

---

## 4. Standards

### Currently used
- **Oxford Hip Score / Oxford Knee Score**: validated, widely-used PROMs in
  orthopaedic care. Enables comparison with national benchmarks (NJR, PROMs programme).

### Not currently required
- **FHIR / HL7**: not used. Joint Journey does not exchange data with clinical
  systems. If EHR integration is required in future (e.g. sending PROMs to a
  trust's EPR), FHIR QuestionnaireResponse resources would be the appropriate
  standard to adopt.
- **SNOMED CT / ICD-10**: not used. The application does not record diagnoses
  or clinical codes.

---

## 5. Future considerations

If a trust requests integration (e.g. pulling referral data from e-RS, or pushing
PROMs back to the EPR), the architecture supports this via:
- Firebase Cloud Functions (server-side API endpoints)
- Standard REST/FHIR APIs
- Secure data exchange via NHS MESH or similar

This would require a formal integration specification, testing, and likely
DCB0129/DCB0160 review of the integration-specific hazards.
