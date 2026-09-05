# Joint Journey - DTAC Readiness Checklist

**Purpose:** Track what we *have* vs *need* across the five DTAC areas, so we can
complete the NHS Digital Technology Assessment Criteria quickly when a trust asks.
**Legend:** ✅ done · 🟡 partial · ⬜ to do.
**Last updated:** 15/08/2026

> DTAC isn't a pass/fail certificate - it's the evidence pack a trust reviews
> before deployment. Build it once, reuse for every trust.

---

## A. Clinical safety (DCB0129)
- ✅ Hazard Log (markdown + Excel, v0.5) → `clinical-safety/hazard-log.md`, `clinical-safety/Joint Journey - Hazard Log (DCB0129).xlsx`
- ✅ Clinical Safety Case Report (v0.2) → `clinical-safety/clinical-safety-case-report.md`
- ✅ Clinical Safety Officer appointed + registered (Mr Benjamin Zucker)
- ✅ Safety actions closed: red-flag signposting (v0.2), safety screening questionnaire (v0.4), nutrition safeguards (v0.4), mental health crisis signposting (v0.5), floor transfer wording (v0.5)
- ✅ Clinical advisory board content review (August 2026) - content reviewed; formal sign-off in progress
- ✅ Intended Use Statement and Safety Summary → `clinical-safety/Joint Journey - Intended Use and Safety Summary.docx`
- ⬜ Formal CSO sign-off of Hazard Log (version bump to v1.0) - *after advisory board sign-off completes*

## B. Data protection (UK GDPR / DPA 2018)
- ✅ Privacy policy exists and up to date (`privacy.html`, updated August 2026)
- ✅ Explicit consent captured at signup (health-data + optional contact)
- ✅ Lawful basis documented: consent (Art. 6(1)(a)) + explicit consent for health data (Art. 9(2)(a)) → `dpia.md` section 3
- ✅ DPIA drafted (v0.2) → `dpia.md`. Outcome: proceed with conditions.
- ✅ Data residency confirmed: Firestore + Storage in europe-west2 (London, UK) → `dpia.md` section 7
- ✅ Sub-processor register → `sub-processor-register.md` (Firebase, Netlify; GA removed August 2026)
- ✅ Records of Processing Activities (ROPA) → `ropa.md`
- ✅ Retention periods confirmed: active data while account active; inactive accounts 24 months; evaluation data 5 years pseudonymised → `dpia.md` section 6
- ✅ Google Analytics removed (August 2026) - no third-party analytics, no US data transfers for browsing
- ⬜ Data-sharing agreement template (for trust pilots) - *draft when trust identified*
- ⬜ ICO registration - *check if required given consent-based processing*
- ⬜ In-app data export / delete-my-data flow (Art. 17/20) - *user can request via email; automated flow to build*

## C. Technical security
- ✅ Authenticated accounts (Firebase Auth)
- ✅ Encryption in transit (HTTPS everywhere)
- ✅ Encryption at rest (Firebase/Google Cloud default - AES-256)
- ✅ Firestore security rules audited + hardened + deployed → `security/firestore-rules-audit.md` (PASS)
- ✅ Per-user data isolation enforced (user can only read/write own document)
- ✅ Least-privilege admin access; MFA on admin/founder accounts
- ✅ Incident-response / breach-response runbook → `security/breach-response-runbook.md`
- ⬜ **Cyber Essentials** certification - *do now (~£300, self-assessment via IASME)*
- ⬜ Basic penetration test - *before wider rollout*
- ⬜ Enable App Check (Firebase) - *recommended to prevent API abuse*
- ⬜ Backup & disaster-recovery documented - *Firestore has automatic backups; document recovery process*

## D. Interoperability
- ✅ Interoperability statement → `interoperability-statement.md`
- ✅ Data formats documented (JSON/Firestore; PROMs as structured data; CSV export via admin script)
- ✅ Current integration position stated (standalone; no EHR integration)
- ✅ PROMs use validated instruments (Oxford Hip Score, Oxford Knee Score) enabling comparison with national benchmarks
- ⬜ User-facing data export (download your data) - *planned*
- ⬜ FHIR/HL7 - *not currently required; noted for future if EHR integration needed*

## E. Usability & accessibility
- ✅ WCAG 2.1 AA accessibility pass completed (`css/a11y.css`)
- ✅ Accessibility statement page (`accessibility.html`, updated July 2026)
- ✅ Semantic HTML, keyboard navigation, colour contrast, focus indicators, skip links, ARIA labels
- ✅ Simple, large-text, mobile-friendly UI designed for older users
- 🟡 Usability testing with target users - session script and plan exist (`patient-testing/`); testing ongoing
- ⬜ Documented evidence of older / low-tech-confidence user testing results

---

## Outstanding items (priority order)

1. **Cyber Essentials** - self-assessment via IASME (~£300). Can do now, no trust required.
2. **Formal CSO sign-off** of Hazard Log → v1.0. Dependent on advisory board sign-off completing.
3. **In-app data export/delete** - build user-facing "download my data" / "delete my account" flow.
4. **Data-sharing agreement template** - draft when a pilot trust is identified.
5. **App Check** - enable Firebase App Check to prevent API abuse from scripts.
6. **Documented user testing results** - write up findings from patient testing sessions.

## Notes
- Google Analytics has been removed from all pages (August 2026). All engagement data is tracked via Firestore (user's own account data, never sent to third parties). No analytics cookies are used.
- Many DTAC items double as genuine product improvements (accessibility, security) - not just paperwork.
- This checklist is the DTAC submission backbone. Keep it updated at each release.
