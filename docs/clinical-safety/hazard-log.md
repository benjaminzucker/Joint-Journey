# Joint Journey — Clinical Safety Hazard Log (DCB0129)

**Standard:** DCB0129 (Clinical Risk Management: manufacturer of health IT).
**Clinical Safety Officer (CSO):** [Mr Benjamin Zucker — to complete CSO training].
**Version:** 0.1 (draft) · **Date:** [ ] · **Status:** Working draft for review by CSO.

> ⚠️ Draft for completion. The CSO must review, adjust ratings, and sign off
> before any deployment. Risk ratings here are first-pass estimates.

## Risk scoring (simple 5×5)
- **Likelihood:** 1 Very low · 2 Low · 3 Medium · 4 High · 5 Very high
- **Severity:** 1 Minor · 2 Significant · 3 Serious · 4 Major · 5 Catastrophic
- **Risk = Likelihood × Severity.** Target: reduce all to "acceptable" (≤ 6) after mitigation, or document why residual risk is justified.

## Clinical review & attribution
Domain hazards are reviewed by the relevant **Clinical Advisory Board** member and
recorded as evidence (not just names) — see `../advisory-board/`:
- **Exercise / ROM (H01, H03):** Physiotherapy advisor — [name], [date]
- **Nutrition (H04):** Dietetics advisor — [name], [date]
- **Mental health (H05):** Psychology advisor — [name], [date]
- **Other (H02, H06–H08):** Founder/CSO + multidisciplinary — [name], [date]

Each review is captured in `../advisory-board/content-review-and-signoff-log.docx`
and `reviewer-signoff-statement.docx`. Add a **"Reviewed by: [name], [date]"** line
to each hazard below as advisors sign off.

---


## Hazards

### H01 — User performs an exercise that is unsafe for them and is injured
- **Cause:** Generic programme not suited to a specific comorbidity; user pushes too hard.
- **Effect:** Musculoskeletal injury, fall, pain flare.
- **Initial L×S:** 3 × 3 = 9
- **Existing controls:** "Stop if sharp pain" guidance; "hold onto something sturdy"; "talk to your GP before starting if you have heart/respiratory/balance issues"; gentle/standard/active levelling; warm-up instructions.
- **Further mitigations:** Pre-start safety screening questions; clearer red-flag guidance; video demonstrations of correct form.
- **Residual L×S:** 2 × 3 = 6 (acceptable)

### H02 — User relies on the app *instead of* seeking medical help; a problem is missed
- **Cause:** User interprets app as a substitute for clinical care.
- **Effect:** Delayed diagnosis/treatment (e.g. DVT, infection, worsening condition).
- **Initial L×S:** 2 × 4 = 8
- **Existing controls:** "Not a substitute for medical advice" disclaimers; signposting to surgeon/GP.
- **Further mitigations:** Prominent, repeated "when to seek help / call 111 / 999" red-flag list; safety-netting copy in key modules.
- **Residual L×S:** 2 × 4 = 8 → reduce to 1 × 4 = 4 with explicit red-flag signposting.

### H03 — Oxford-Score banding places user in the wrong programme level
- **Cause:** User mis-enters score; rule edge cases; "both joints" logic.
- **Effect:** Programme too hard (injury risk) or too easy (suboptimal prep).
- **Initial L×S:** 3 × 2 = 6
- **Existing controls:** Validated Oxford questionnaire; "both joints" uses the lower (most limiting) score; user can self-adjust starting level.
- **Further mitigations:** Allow easy level change; "this felt too hard/easy?" prompt; sanity-check banding boundaries.
- **Residual L×S:** 2 × 2 = 4 (acceptable)

### H04 — Incorrect nutrition / calorie information leads to harmful dieting
- **Cause:** Generic calorie/BMI calculation applied to someone for whom it's inappropriate (e.g. underweight, eating disorder, diabetes).
- **Effect:** Unsafe weight loss / nutritional harm.
- **Initial L×S:** 2 × 3 = 6
- **Existing controls:** Presented as general guidance; estimates noted as approximate.
- **Further mitigations:** Floor on minimum calories; signpost to GP/dietitian for medical conditions; exclude/caution for low BMI.
- **Residual L×S:** 1 × 3 = 3 (acceptable)

### H05 — Mental-health content distresses a vulnerable user / misses risk
- **Cause:** Modules on pain/anxiety surface distress; no route for a user in crisis.
- **Effect:** Worsening distress; missed safeguarding/crisis situation.
- **Initial L×S:** 2 × 4 = 8
- **Existing controls:** Evidence-based supportive content.
- **Further mitigations:** Crisis signposting (Samaritans/111/GP) in mindset modules; clear "this is not therapy" framing.
- **Residual L×S:** 1 × 4 = 4 (acceptable)

### H06 — Software error displays wrong data (weight, score, progress)
- **Cause:** Bug; sync/caching issue; data-write failure.
- **Effect:** User confusion; wrong self-management decision.
- **Initial L×S:** 2 × 2 = 4
- **Existing controls:** Data shown is user's own; no clinical decision driven by it.
- **Further mitigations:** Input validation; testing; release checks.
- **Residual L×S:** 1 × 2 = 2 (acceptable)

### H07 — Data loss / breach of personal health data
- **Cause:** Security/hosting failure; misconfiguration.
- **Effect:** Privacy harm; loss of trust. *(Detail handled in DPIA/DTAC, cross-referenced here.)*
- **Initial L×S:** 2 × 3 = 6
- **Existing controls:** Authenticated accounts; consent at signup; cloud database.
- **Further mitigations:** See DPIA; Cyber Essentials; access controls; backups.
- **Residual L×S:** 1 × 3 = 3 (acceptable)

### H08 — Accessibility barrier excludes/ misleads older or impaired users
- **Cause:** Poor contrast, small targets, no captions → misreads instructions.
- **Effect:** Misuse of exercises; exclusion.
- **Initial L×S:** 3 × 2 = 6
- **Existing controls:** Large fonts, simple layout.
- **Further mitigations:** WCAG 2.1 AA review; captions on videos; tested with older users.
- **Residual L×S:** 2 × 2 = 4 (acceptable)

---

## Open actions (to close before deployment)
- [ ] CSO appointed + trained; this log reviewed and signed off.
- [ ] Add explicit red-flag / "when to seek help" content (H02, H05).
- [ ] Add pre-start exercise safety screening (H01).
- [ ] Minimum-calorie floor + condition cautions (H04).
- [ ] Crisis signposting in mindset modules (H05).
- [ ] WCAG 2.1 AA accessibility pass (H08).
- [ ] Cross-reference DPIA for H07.
