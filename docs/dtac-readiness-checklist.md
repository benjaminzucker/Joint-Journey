# Joint Journey — DTAC Readiness Checklist

**Purpose:** Track what we *have* vs *need* across the five DTAC areas, so we can
complete the NHS Digital Technology Assessment Criteria quickly when a trust asks.
**Legend:** ✅ have · 🟡 partial · ⬜ to do.

> DTAC isn't a pass/fail certificate — it's the evidence pack a trust reviews
> before deployment. Build it once, reuse for every trust.

---

## A. Clinical safety (DCB0129)
- 🟡 Hazard Log drafted → `clinical-safety/hazard-log.md`
- 🟡 Clinical Safety Case Report drafted → `clinical-safety/clinical-safety-case-report.md`
- ⬜ Clinical Safety Officer appointed + trained (Ben)
- ⬜ Open safety actions closed (red-flag signposting, screening, etc.)
- ⬜ CSO sign-off

## B. Data protection (UK GDPR / DPA 2018)
- ✅ Privacy policy exists (`privacy.html`)
- ✅ Explicit consent captured at signup (health-data + optional contact)
- 🟡 Lawful basis documented (likely consent / legitimate interests — confirm)
- ⬜ **DPIA** (Data Protection Impact Assessment) — *high priority, can do now*
- ⬜ Data-sharing agreement template (for trust pilots)
- ⬜ ICO registration (if not already)
- ⬜ Records of processing; data retention & deletion policy
- ⬜ Sub-processor list (Firebase/Google, hosting, analytics) + locations (data residency)

## C. Technical security
- 🟡 Authenticated accounts (Firebase Auth)
- ⬜ **Cyber Essentials** certification (achievable now)
- ⬜ Penetration test (basic)
- ⬜ Access control / least-privilege documented
- ⬜ Backup & disaster-recovery notes
- ⬜ Incident-response / breach process
- ⬜ Confirm encryption in transit (HTTPS ✅) and at rest

## D. Interoperability
- ⬜ Document data formats / export capability
- ⬜ State current integration position (standalone now; can export PROMs/outcomes)
- ⬜ (Future) consider standards if EHR integration is ever needed

## E. Usability & accessibility
- 🟡 Simple, large-text, mobile-friendly UI
- ⬜ **WCAG 2.1 AA** review + fixes (contrast, focus, alt text, captions)
- ⬜ Accessibility statement page
- 🟡 Usability testing with target users (Phase 0) → feed results in here
- ⬜ Evidence of older / low-tech-confidence user testing

---

## What we can do NOW (no trust required)
1. **DPIA** — the single most useful Phase 1 doc to draft now (template available from ICO).
2. **Cyber Essentials** — self-assessment certification, low cost.
3. **WCAG 2.1 AA accessibility pass** — directly improves the product for older users too.
4. **Document sub-processors + data residency** (where Firebase stores data).
5. **Finish the clinical safety docs** (already drafted here) and book CSO training.

## Notes
- Many DTAC items double as genuine product improvements (accessibility, security) — not just paperwork.
- Keep this checklist updated; it becomes your DTAC submission backbone.
