# Joint Journey — Clinical Safety Hazard Log (DCB0129)

**Standard:** DCB0129 (Clinical Risk Management: manufacturer of health IT).
**Manufacturer:** Elan Health Ltd (company number 17347255).
**Clinical Safety Officer (CSO):** Mr Benjamin Zucker (registered CSO).

**Version:** 0.3 (draft) · **Date:** 18/07/2026 · **Status:** Working draft — CSO registered; awaiting advisory board review and sign-off.


> ⚠️ Draft for completion. The CSO must review, adjust ratings, and sign off
> before any deployment. Risk ratings here are first-pass estimates.

> **Change log (v0.3, 18/07/2026):** CSO now registered (action closed).
> Manufacturer updated to Elan Health Ltd (company number 17347255). DPIA
> cross-reference added to H07 (action closed). Two additional hazards added
> (H09 — outdated content; H10 — third-party service failure) for completeness.

> **Change log (v0.2, 13/07/2026):** In-app safety controls implemented and
> moved from "further mitigations" to "controls now in place" — a persistent
> "When to seek help" control in the app header on every in-app view that opens
> a red-flag panel (999/111/GP/surgical team) (H02), crisis signposting including
> Samaritans within that same panel (H05), and a pre-exercise safety check at the
> top of the exercise programme (H01). Related open actions updated below.




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
- **Existing controls:** "Stop if sharp pain" guidance; "hold onto something sturdy"; "talk to your GP before starting if you have heart/respiratory/balance issues"; gentle/standard/active levelling; warm-up instructions. **(v0.2 — implemented) Pre-exercise safety check** collapsible at the top of the exercise programme: warm up, use support/footwear, stop for sharp pain/dizziness/chest pain/breathlessness, use gentle isometric holds on sore days, and check with GP/physio first if relevant.
- **Further mitigations:** Formal pre-start safety screening questionnaire; video demonstrations of correct form.
- **Residual L×S:** 2 × 3 = 6 (acceptable) — pre-exercise safety check now live; residual to fall further once a formal screening questionnaire and form videos are added.


### H02 — User relies on the app *instead of* seeking medical help; a problem is missed
- **Cause:** User interprets app as a substitute for clinical care.
- **Effect:** Delayed diagnosis/treatment (e.g. DVT, infection, worsening condition).
- **Initial L×S:** 2 × 4 = 8
- **Existing controls:** "Not a substitute for medical advice" disclaimers; signposting to surgeon/GP. **(v0.2 — implemented) Persistent "When to seek help" control** in the app header on every in-app view, opening a panel that lists: call **999** for emergencies (fall/injury, chest pain, severe breathlessness, hot swollen calf, signs of stroke), **111** for urgent advice, and **GP/surgical team** for wound/fever/worsening pain, with an explicit reminder that the app does not replace the user's own healthcare team.

- **Further mitigations:** Extend safety-netting copy into individual education/"after surgery" modules as content grows.
- **Residual L×S:** 1 × 4 = 4 (acceptable) — reduced from 2 × 4 = 8 now that explicit, repeated red-flag signposting is live on every view.


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
- **Existing controls:** Evidence-based supportive content. **(v0.2 — implemented) Crisis signposting** — the persistent "When to seek help" panel (site-wide, including the wellbeing content) surfaces **Samaritans 116 123**, plus 111/999 and GP routes, and states the app does not replace the user's healthcare team.
- **Further mitigations:** Reinforce "this is not therapy" framing and repeat crisis signposting within individual mindset modules as content grows.
- **Residual L×S:** 1 × 4 = 4 (acceptable) — crisis signposting now live site-wide.


### H06 — Software error displays wrong data (weight, score, progress)
- **Cause:** Bug; sync/caching issue; data-write failure.
- **Effect:** User confusion; wrong self-management decision.
- **Initial L×S:** 2 × 2 = 4
- **Existing controls:** Data shown is user's own; no clinical decision driven by it.
- **Further mitigations:** Input validation; testing; release checks.
- **Residual L×S:** 1 × 2 = 2 (acceptable)

### H07 — Data loss / breach of personal health data
- **Cause:** Security/hosting failure; misconfiguration.
- **Effect:** Privacy harm; loss of trust.
- **Initial L×S:** 2 × 3 = 6
- **Existing controls:** Authenticated accounts; consent at signup; cloud database (Firestore in `europe-west2`). Firestore security rules independently audited — see `../security/firestore-rules-audit.md` (result: PASS).
- **Further mitigations:** Cyber Essentials certification; automated backups; incident-response procedure (72h ICO notification).
- **Cross-reference:** Full risk assessment in DPIA (`../dpia.md`, sections 7–8). Data controller: Elan Health Ltd. Data residency confirmed UK (`europe-west2`).
- **Residual L×S:** 1 × 3 = 3 (acceptable)


### H08 — Accessibility barrier excludes / misleads older or impaired users
- **Cause:** Poor contrast, small targets, no captions → misreads instructions.
- **Effect:** Misuse of exercises; exclusion.
- **Initial L×S:** 3 × 2 = 6
- **Existing controls:** Large fonts, simple layout.
- **Further mitigations:** WCAG 2.1 AA review; captions on videos; tested with older users.
- **Residual L×S:** 2 × 2 = 4 (acceptable)


### H09 — User follows outdated or superseded clinical content *(added v0.3)*
- **Cause:** Guidelines change after content was written; content not reviewed/updated.
- **Effect:** User follows advice that is no longer current best practice; suboptimal or unsafe preparation.
- **Initial L×S:** 2 × 2 = 4
- **Existing controls:** Content developed with reference to current NICE guidelines and CSP resources (June–July 2026). Version-controlled in git with dated change logs.
- **Further mitigations:** Scheduled annual content review by CSO and advisory board; content tagged with "last reviewed" dates visible to users; monitoring of NICE/CSP guideline updates.
- **Residual L×S:** 1 × 2 = 2 (acceptable) — low risk for a newly written product; increases over time if reviews are not conducted.


### H10 — Third-party service failure disrupts the user experience *(added v0.3)*
- **Cause:** Firebase outage; YouTube/Vimeo video removed or unavailable; hosting (Netlify) down.
- **Effect:** User cannot access exercises, content, or their data; loss of trust; interruption to programme.
- **Initial L×S:** 2 × 2 = 4
- **Existing controls:** Firebase and Netlify have high-availability SLAs (99.95%+). Local-storage caching means the app partially works offline. Exercise descriptions are text-based (not solely reliant on video).
- **Further mitigations:** PWA offline mode (service worker); self-hosted exercise videos/illustrations as fallback; monitoring/alerting on uptime.
- **Residual L×S:** 1 × 2 = 2 (acceptable) — no clinical harm from temporary unavailability; user can resume when service returns.

---

## Open actions (to close before deployment)
- [x] CSO appointed + trained. — *Done v0.3: Mr Benjamin Zucker registered as CSO. Log to be formally reviewed and signed off before go-live.*
- [x] Add explicit red-flag / "when to seek help" content (H02, H05). — *Done v0.2: persistent panel on every in-app view.*
- [~] Add pre-start exercise safety screening (H01). — *Partial v0.2: pre-exercise safety check live; formal screening questionnaire still to add.*
- [ ] Minimum-calorie floor + condition cautions (H04).
- [x] Crisis signposting in mindset modules (H05). — *Done v0.2: Samaritans 116 123 in the persistent panel (site-wide); reinforce within modules as content grows.*
- [ ] WCAG 2.1 AA accessibility pass (H08).
- [x] Cross-reference DPIA for H07. — *Done v0.3: DPIA path, data controller, and data residency added to H07.*
- [ ] Clinical advisory board review and sign-off of all hazard domains (H01–H10).
- [ ] Formal CSO sign-off of this log (version bump to v1.0).


