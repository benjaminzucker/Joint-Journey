# Joint Journey — Data Protection Impact Assessment (DPIA)

**Version:** 0.2 (draft) · **Date:** 15/08/2026 · **Data Controller:** Elan Health Ltd (company number 17347255) · **Owner:** Mr Benjamin Zucker

**Status:** Working draft. To be reviewed before any pilot/deployment, and updated
whenever processing changes. A DPIA is required because we process **special
category (health) data** at scale.

> ⚠️ Draft to support DTAC and governance. Have it reviewed by a data-protection
> adviser / the pilot trust's DPO before go-live.

---

## 1. Overview of the processing
Joint Journey is a web application supporting adults awaiting hip/knee replacement.
It collects information the user enters and usage data, to deliver a personalised
prehabilitation programme and to evaluate the service.

- **Controller:** Elan Health Ltd (company number 17347255), 154 Beesmoor Road, Frampton Cotterell, Bristol, BS36 2JN.

- **Processors / sub-processors:** See `sub-processor-register.md` for full details. Summary: Google Firebase (authentication, Firestore database, Cloud Storage) - database in europe-west2 (London, UK); Netlify (static hosting - no personal data stored). Google Analytics was previously used but has been removed (August 2026). No email marketing processor currently in use.
- **Users / data subjects:** adults (18+) on the waiting list for hip or knee replacement.

## 2. Data we collect
### a. Account / identity
- Name, email address, password (managed by Firebase Auth — we never store raw passwords).
- Optional contact details (phone) for engagement/follow-up.

### b. Health & programme data (special category)
- Joint(s) affected (hip / knee / both); surgical status.
- **Oxford Hip/Knee Score** — pre-operative (at signup) and the questionnaire responses.
- Weight (and BMI derived); mood / wellbeing check-ins.
- Exercise completion / adherence; module completion; engagement (active days, streaks).

### c. Post-operative outcome data (special category) — *evaluation*
Collected after surgery, via in-app prompt and/or follow-up email:
- **Whether the operation took place** (and approximate date).
- **Length of hospital stay** (nights) — self-reported and/or trust-supplied.
- **Patient satisfaction / confidence** (short structured survey).
- **Oxford Score repeated at ~6 months post-op** (change score).
- Readmissions / complications where the user reports them or the trust supplies them.

### d. Technical
- Standard log/analytics data (device, approximate usage) — minimise; avoid unnecessary tracking.

## 3. Purpose & lawful basis (UK GDPR)
| Purpose | Lawful basis (Art. 6) | Special-category condition (Art. 9) |
|---|---|---|
| Deliver the prehab programme to the user | Consent / contract | Explicit consent (Art. 9(2)(a)) |
| Service evaluation / improvement | Legitimate interests / consent | Explicit consent; or health/social-care (Art. 9(2)(h)) if delivered with a trust |
| Optional research (later) | Consent | Explicit consent + HRA/REC approval |

- **Consent** is captured at signup, with a clear, granular, plain-English explanation; users can withdraw.
- Lawful basis to be confirmed with the pilot trust's DPO (joint-controller arrangement may apply during a trust pilot).

## 4. Necessity & proportionality
- **Data minimisation:** only collect what's needed for the programme and evaluation. No unnecessary identifiers.
- **Purpose limitation:** health data is not used for advertising or sold.
- **Pseudonymisation:** analysis/evaluation uses pseudonymised data wherever possible.
- **Transparency:** privacy policy (`privacy.html`) explains all of the above in plain English.

## 5. Data subject rights
- Access, rectification, erasure, restriction, portability, and objection are supported.
- A clear route to request these (in-app / email to hello@jointjourney.org). Account deletion removes personal data within 30 days.

## 6. Retention
- Active-account data retained while the account is active.
- Evaluation data retained for 5 years in pseudonymised form, then deleted/aggregated.
- Inactive accounts deleted/anonymised after 24 months of inactivity.
- Feedback data retained for the lifetime of the product, reviewed periodically.
- See `ropa.md` for per-activity retention periods.

## 7. Security measures (cross-ref DTAC + Hazard Log H07)
- **Data residency:** Cloud Firestore (database) and Cloud Storage are both
  provisioned in **`europe-west2` (London, UK)**. Firebase Authentication is
  operated on Google global infrastructure under Google Cloud's Data Processing
  Terms (incorporating SCCs/UK addendum where applicable). No application data
  store is located outside the UK/EU.
- Encryption in transit (HTTPS) and at rest (Firebase default).
- Authenticated access; Firestore security rules (`firestore.rules`) restrict each user to their own data. **Independently reviewed — see `docs/security/firestore-rules-audit.md` (result: PASS, per-user isolation enforced; feedback collection hardened against uid-spoofing and oversized writes).**
- Least-privilege admin access; MFA on admin/founder accounts.
- Cyber Essentials (planned).
- Incident/breach response documented - see `security/breach-response-runbook.md` (notify ICO within 72h if required).
- App Check and Firestore rules regression tests recommended before wider rollout.
- Google Analytics removed (August 2026) - no third-party analytics cookies or US data transfers for browsing behaviour.
- Sub-processor register maintained - see `sub-processor-register.md`.
- Records of processing activities maintained - see `ropa.md`.

## 8. Risks & mitigations
| Risk | Likelihood | Impact | Mitigation | Residual |
|---|---|---|---|---|
| Unauthorised access to health data | Low | High | Auth + Firestore rules + MFA + least privilege | Low |
| Data stored outside UK/EU without safeguards | ~~Medium~~ Low | Medium | **Resolved:** Firestore + Storage confirmed in `europe-west2` (London); Auth under Google DPA/SCCs | Low |
| Excessive data collection | Medium | Medium | Data-minimisation review; collect only listed fields | Low |
| User unclear what they consent to | Medium | Medium | Granular, plain-English consent at signup | Low |
| Re-identification from "anonymous" evaluation data | Low | Medium | Pseudonymise; aggregate before sharing | Low |
| Breach not detected/reported in time | Low | High | Incident-response process; logging; 72h ICO notification | Low |

## 9. Consultation
- [ ] Internal review (founder / CSO).
- [ ] Clinical advisory board input.
- [ ] Pilot trust's Data Protection Officer (before deployment).
- [ ] ICO consultation only if high residual risk remains (not anticipated).

## 10. Outcome / sign-off
- DPIA outcome: **Proceed with conditions** (complete Cyber Essentials; build in-app data export/delete; finalise joint-controller arrangement with pilot trust).
- Data residency: confirmed (europe-west2, London). Retention periods: confirmed (see section 6). Sub-processors: documented (see sub-processor-register.md). Breach response: documented (see security/breach-response-runbook.md). Google Analytics: removed.

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Controller / Founder | | | |
| DPO (if appointed / trust) | | | |
