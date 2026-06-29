# Joint Journey — Pilot / Service Evaluation & Data Plan

**Version:** 0.1 (draft) · **Status:** Design now so the data is usable later.

> Drafting this *before* the pilot is the difference between a publishable,
> sellable evaluation and a year of messy data. None of this needs a trust yet.

---

## 1. Aim
Evaluate, in a real NHS waiting-list population, whether Joint Journey:
- is **used** (engagement/adherence),
- is **valued** (patient satisfaction/confidence), and
- is **associated with** improved outcomes (length of stay; Oxford Score change).

## 2. Service evaluation vs research (decide early)
- **Service evaluation** (measuring an existing service against standards): lighter,
  usually **no HRA/REC ethics** needed. Good for a first free pilot.
- **Research** (testing a hypothesis / generating generalisable knowledge): needs
  **HRA/REC approval**, but is publishable as a study.
- **Recommendation:** start as a **service evaluation**; if we want a robust
  causal claim later, design a proper study (Phase 3). Confirm classification with
  the trust's R&D / governance office.

## 3. Design
- **Population:** adults on the waiting list for primary hip or knee replacement at the pilot trust.
- **Intervention:** access to Joint Journey from listing until surgery.
- **Comparator (for context, not a trial):** historical / concurrent waiting-list
  patients not using the app (e.g. trust's existing average LOS and PROMs).
- **Duration:** ~12 months recruitment + 6-month post-op follow-up window.

## 4. Outcome measures
**Primary**
- **Length of hospital stay** (days) — the key health-economic metric.

**Secondary — clinical / PROM**
- **Oxford Hip/Knee Score**: pre-op (baseline at signup) and ~6 months post-op (change score).
- Readmissions / complications within 90 days (if trust can supply).

**Secondary — engagement (from the app)**
- % users completing onboarding; active days; exercise sessions completed;
  mindset modules completed; weight logs; retention over time.

**Secondary — experience**
- Patient satisfaction / confidence (short in-app survey, e.g. pre-op confidence
  rating; net satisfaction).

## 5. Data we already capture (and gaps)
| Measure | Captured now? | Action |
|---|---|---|
| Oxford Score (pre-op) | ✅ at onboarding | none |
| Oxford Score (6mo post-op) | 🟡 planned email re-score | confirm follow-up mechanism |
| Engagement (sessions, streak, modules) | ✅ | ensure exportable |
| Weight | ✅ | none |
| Satisfaction / confidence | 🟡 partial (feedback) | add short structured survey |
| Length of stay | ⬜ partial (post-op check-in asks nights) | confirm source: self-report + trust data |
| Readmission/complications | ⬜ | obtain from trust if possible |

## 6. Data governance (links to other docs)
- Consent: already captured at signup; ensure it covers evaluation use.
- **DPIA** required (see DTAC checklist).
- Data minimisation; pseudonymise for analysis; clear retention period.
- Data-sharing agreement with the trust for any trust-held data (LOS, readmissions).

## 7. Analysis plan (simple, pre-specified)
- Descriptive: engagement and satisfaction distributions.
- Oxford Score: paired change (pre vs 6-month post).
- LOS: compare pilot cohort vs historical/concurrent baseline (report as
  association, with caveats — not causal unless designed as research).
- Pre-specify to avoid cherry-picking.

## 8. Outputs
- Internal results deck (for trusts/investors).
- **Health-economic summary**: bed-days saved × ~£300–400/day vs cost per patient.
- Aim for a **published service evaluation / poster / paper**.

## 9. Things to do NOW (no trust needed)
- [ ] Decide service-evaluation vs research framing.
- [ ] Finalise the outcome set above and lock definitions.
- [ ] Build/confirm a clean **data export** for engagement + PROMs.
- [ ] Add a short **satisfaction/confidence survey** in-app.
- [ ] Confirm the **6-month re-score** follow-up mechanism works.
- [ ] Draft the **DPIA** and a **data-sharing agreement** template.
