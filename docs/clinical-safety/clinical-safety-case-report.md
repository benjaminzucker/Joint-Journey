# Joint Journey — Clinical Safety Case Report (DCB0129)

**Version:** 0.2 (draft) · **Date:** 15/08/2026
**Manufacturer:** Elan Health Ltd (company number 17347255).
**Clinical Safety Officer:** Mr Benjamin Zucker (registered CSO).
**Status:** Working draft - updated to reflect hazard log v0.5 and advisory board review (August 2026). To be signed off by the CSO before deployment.


> This report summarises the clinical risk management for Joint Journey. It sits
> on top of the Hazard Log (`hazard-log.md`) and is the document an NHS trust /
> DTAC reviewer will want to see.

---

## 1. Product overview
Joint Journey is a web application providing exercise, nutrition, educational and
psychological-wellbeing support to adults awaiting elective hip or knee
replacement. See `../intended-purpose-and-claims-policy.md` for the formal
intended purpose. It does not diagnose, does not direct treatment, and is not a
substitute for the clinical team.

## 2. Scope of this safety case
- **In scope:** the web app, its content, the Oxford-Score programme banding, and
  user data display.
- **Out of scope:** the trust's own deployment processes (covered by the trust's
  DCB0160), and third-party platforms (hosting, video) except where they affect
  clinical safety.

## 3. Clinical risk management system
- Risk approach: 5×5 likelihood × severity (see Hazard Log).
- Hazard identification: structured review of each feature + clinical input from
  the CSO and clinical advisory board.
- Acceptability: residual risk ≤ 6 considered acceptable, or justified and documented.

## 4. Summary of hazards & mitigations
10 hazards identified (H01–H10). Key themes and the controls relied upon:


| ID | Hazard (summary) | Key mitigation | Residual |
|----|------------------|----------------|----------|
| H01 | Unsafe exercise → injury | PAR-Q-style safety screening (v0.4); pre-exercise safety check (v0.2); "stop if sharp pain"; levelling; GP caution; floor transfer wording reviewed by advisory board (v0.5) | 4 |
| H02 | App used instead of seeking help | Red-flag "when to seek help" signposting on every view + disclaimers (v0.2) | 4 |
| H03 | Wrong programme band | Self-adjust level; validated score; boundary checks | 4 |
| H04 | Harmful dieting | Min-calorie floor; deficit capped 300-500 kcal/day; "consult your doctor" safety check for at-risk conditions (v0.4) | 3 |
| H05 | Mental-health distress | Crisis signposting (v0.2); explicit mental health crisis entry with 999/111/Samaritans (v0.5); "not therapy" framing | 4 |
| H06 | Wrong data displayed | Validation, testing, release checks | 2 |
| H07 | Data breach | DPIA; Firestore rules audited (PASS); breach-response runbook; access control; GA removed | 3 |
| H08 | Accessibility barrier | WCAG 2.1 AA pass (a11y.css); captions; older-user testing | 4 |
| H09 | Outdated clinical content | Annual review; version control; guideline monitoring; advisory board review | 2 |
| H10 | Third-party service failure | High-availability SLAs; local caching; text-based fallback | 2 |

Full detail and scoring: see `hazard-log.md` (v0.5, updated 11/08/2026).


## 5. Residual risk statement
After the mitigations above are implemented, residual clinical risk is assessed as
**acceptable** for a low-risk prehabilitation/wellbeing product, on the basis that:
- the app provides general guidance, not individualised treatment;
- robust safety-netting/signposting directs users to clinical care when needed;
- no clinical decision is automated beyond sorting into generic exercise levels.

*(To be confirmed by CSO once open actions are closed.)*

## 6. Open safety actions
Carried from the Hazard Log - status as of 15/08/2026:
- [x] CSO appointed and trained - *Mr Benjamin Zucker registered as CSO.*
- [x] Red-flag / crisis signposting added (H02, H05) - *Persistent "When to seek help" panel live on every in-app view (v0.2). Explicit mental health crisis entry added (v0.5).*
- [x] Pre-start exercise safety screening (H01) - *Pre-exercise safety check live (v0.2). PAR-Q-style safety screening questionnaire added to onboarding (v0.4). Floor transfer wording reviewed by advisory board (v0.5).*
- [x] Nutrition safeguards (H04) - *Calorie deficit capped at 300-500 kcal/day, minimum calorie floors, only applied when BMI indicates weight to lose. "Consult your doctor" collapsible added to nutrition page (v0.4).*
- [x] Crisis signposting in wellbeing content (H05) - *Samaritans 116 123 in the persistent panel (site-wide, v0.2). Expanded with "thoughts of self-harm" and 24/7 note (v0.5).*
- [x] WCAG 2.1 AA accessibility pass (H08) - *Completed: a11y.css deployed.*
- [x] DPIA cross-referenced for H07 - *DPIA path, data controller, and data residency added (v0.3). Breach-response runbook created. Google Analytics removed.*
- [ ] Clinical advisory board review and sign-off of all hazard domains (H01-H10) - *Content review underway (Aug 2026); formal sign-off pending.*
- [ ] Formal CSO sign-off of Hazard Log (version bump to v1.0)


## 7. Post-market / ongoing safety
- Log and review any incidents or user-reported safety concerns.
- Re-assess the safety case at each significant release or content change.
- Maintain a feedback route (the in-app feedback button) for safety issues.

## 8. Sign-off
| Role | Name | Signature | Date |
|------|------|-----------|------|
| Clinical Safety Officer | | | |
