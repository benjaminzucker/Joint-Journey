# Joint Journey — Clinical Safety Case Report (DCB0129)

**Version:** 0.1 (draft) · **Date:** [ ]
**Manufacturer:** Elan Health Ltd (company number 17347255).
**Clinical Safety Officer:** Mr Benjamin Zucker (registered CSO).
**Status:** Working draft. To be completed and signed off by the CSO before deployment.


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
| H01 | Unsafe exercise → injury | Safety screening, "stop if sharp pain", levelling, GP caution | 6 |
| H02 | App used instead of seeking help | Red-flag "when to seek help" signposting + disclaimers | 4 |
| H03 | Wrong programme band | Self-adjust level; validated score; boundary checks | 4 |
| H04 | Harmful dieting | Min-calorie floor; condition cautions; dietitian signpost | 3 |
| H05 | Mental-health distress | Crisis signposting; "not therapy" framing | 4 |
| H06 | Wrong data displayed | Validation, testing, release checks | 2 |
| H07 | Data breach | DPIA, Cyber Essentials, access control | 3 |
| H08 | Accessibility barrier | WCAG 2.1 AA; captions; older-user testing | 4 |
| H09 | Outdated clinical content | Annual review; version control; guideline monitoring | 2 |
| H10 | Third-party service failure | High-availability SLAs; local caching; text-based fallback | 2 |

Full detail and scoring: see `hazard-log.md` (v0.3, 18/07/2026).


## 5. Residual risk statement
After the mitigations above are implemented, residual clinical risk is assessed as
**acceptable** for a low-risk prehabilitation/wellbeing product, on the basis that:
- the app provides general guidance, not individualised treatment;
- robust safety-netting/signposting directs users to clinical care when needed;
- no clinical decision is automated beyond sorting into generic exercise levels.

*(To be confirmed by CSO once open actions are closed.)*

## 6. Open safety actions
Carried from the Hazard Log (v0.3) — status as of 18/07/2026:
- [x] CSO appointed and trained — *Mr Benjamin Zucker registered as CSO.*
- [x] Red-flag / crisis signposting added (H02, H05) — *Persistent "When to seek help" panel live on every in-app view.*
- [~] Pre-start exercise safety screening (H01) — *Pre-exercise safety check live; formal screening questionnaire still to add.*
- [ ] Nutrition safeguards: minimum-calorie floor + condition cautions (H04)
- [x] Crisis signposting in wellbeing content (H05) — *Samaritans 116 123 in the persistent panel (site-wide).*
- [ ] WCAG 2.1 AA accessibility pass (H08)
- [x] DPIA cross-referenced for H07 — *DPIA path, data controller, and data residency added.*
- [ ] Clinical advisory board review and sign-off of all hazard domains (H01–H10)
- [ ] Formal CSO sign-off of Hazard Log (version bump to v1.0)


## 7. Post-market / ongoing safety
- Log and review any incidents or user-reported safety concerns.
- Re-assess the safety case at each significant release or content change.
- Maintain a feedback route (the in-app feedback button) for safety issues.

## 8. Sign-off
| Role | Name | Signature | Date |
|------|------|-----------|------|
| Clinical Safety Officer | | | |
