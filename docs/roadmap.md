# Joint Journey — Roadmap

A single, phased plan from "MVP built" to "scaled across NHS trusts."
Markers: ✅ done · [~] in progress · 👉 current focus.

> How to use this: work top to bottom. Don't start a later phase's heavy work
> (clinical safety, DTAC) until the phase before it genuinely requires it.

---

## 📍 Progress log (most recent first)
- **30 Jun 2026** — Phase 0 advisory board + CSO:
  - **Clinical Advisory Board pack built** → `docs/advisory-board/` (Terms of
    Reference, advisor agreement, conflict-of-interest policy + register, minutes
    template, outreach messages, and **Word** content-review/sign-off log +
    reviewer sign-off statement to send to reviewers). Reviewer attribution wired
    into the hazard log.
  - **Members:** psychology pillar likely filled (founder's contact); recruiting
    an MSK physiotherapist (priority) and a registered dietitian; patient
    representative (PPIE) seat to add.
  - **CSO decision:** founder to be the **named Clinical Safety Officer** (best
    long-term value/control vs paying an external CSO per change). Pursuing an
    **earlier CSO Training Academy course** (DCB0129/0160, CPD-certified) instead
    of waiting until January; enquiry email drafted →
    `clinical-safety/cso-course-enquiry-email.md`.
- **29 Jun 2026** — Phase 1 pilot-readiness work:
  - DPIA drafted; **data residency confirmed** — Firestore **and** Storage in
    `europe-west2` (London, UK). Residency risk closed.
  - **Firestore security rules audited** (PASS — per-user isolation verified
    against the code) and **hardened** (feedback collection: anti-uid-spoofing +
    message size cap). Hardened rules **deployed to the live database** and
    verified. → `docs/security/firestore-rules-audit.md`.
  - **WCAG 2.1 AA accessibility pass** on the app (skip link, visible focus,
    landmarks, accessible labels, reduced-motion, 44px targets) → `css/a11y.css`.
  - **One-time in-app safety acknowledgement** added at onboarding (red-flag +
    999/111/Samaritans signposting), without nagging users before every exercise.

---


## PHASE 0 — Validate & protect  👉 YOU ARE HERE
*Low cost, do these in parallel. No heavy regulatory work yet.*

- [x] **MVP built** — exercise, nutrition, mindset, getting-ready, Oxford Score, "Why It Works"
- [ ] **Patient usability testing** — 5–10 *deliberately diverse* patients (age, tech-confidence, hip/knee). Watch them use it; iterate.
- [ ] **Intended Purpose + claims policy** — one-page guardrail so we don't make clinical claims before we have data (keeps us a non-device for now). *(See `intended-purpose-and-claims-policy.md`.)*
- [ ] **Apply to NHS Clinical Entrepreneur Programme (CEP)** — free, no equity, opens doors for every later phase.
- [~] **Recruit a small clinical advisory board** — governance + recruitment pack built → `docs/advisory-board/` (ToR, advisor agreement, CoI policy/register, review/sign-off log, outreach). Psychology pillar likely filled; **physiotherapist (priority)** + dietitian + patient rep to recruit. Small vesting equity (~0.25–0.5% each, FAST-style) ± honoraria. Keep "advisors" separate from any trust that will "buy" (conflict of interest).
- [ ] *(MHRA enquiry drafted and parked until Phase 3 — see `regulatory/mhra-enquiry-draft.md`.)*

**Next 2–3 actions:** patient testing · write the intended-purpose/claims guardrail · apply to CEP.

---

## PHASE 1 — Get pilot-ready *(much of this can be done NOW, before a trust)*
*Goal: become something an NHS trust is allowed to deploy. Most is documentation/design and needs no trust — a good use of waiting time.*

- [~] **Pilot designed as a service evaluation + data plan** — drafted → `pilot-service-evaluation-plan.md`. Finalise outcomes + data export.
- [~] **Clinical safety (DCB0129)** — drafts done → `clinical-safety/hazard-log.md`, `clinical-safety/clinical-safety-case-report.md`. Still: appoint/​train CSO (Ben), close open safety actions, sign off.
- [~] **Data protection** — DPIA drafted → `dpia.md`; **data residency confirmed (London, `europe-west2`)** ✅. Still: finalise retention periods, legal entity & processor list, lawful basis, data-sharing/joint-controller agreement (with trust), and DPO/sign-off. Plus build in-app export/delete-my-data flow.
- [~] **Security** — Firestore rules **audited + hardened + deployed** ✅ (`security/firestore-rules-audit.md`). Still: Cyber Essentials (do now); NHS DSPT; enable App Check; basic penetration test; breach-response runbook + ROPA.
- [~] **DTAC pack** — readiness tracked → `dtac-readiness-checklist.md`. **Accessibility: WCAG 2.1 AA pass done** ✅ (`css/a11y.css`). Still bundle the other areas (clinical safety, data protection, security, interoperability, usability). *Note: review/remove Google Analytics before a trust pilot.*
- [ ] **Housekeeping** — company formation; insurance (professional indemnity + product liability); basic IP/trademark.

> **Can do now without a trust:** ✅ DPIA (residency done) · ✅ WCAG 2.1 AA accessibility pass · ✅ Firestore rules hardened/deployed · Cyber Essentials · finish clinical-safety docs + book CSO training · lock the evaluation outcome set + data export · breach-response runbook.

---

## PHASE 2 — Run the free trust pilot *(~12 months)*
- [ ] Deploy free at one trust.
- [ ] Collect outcome data; provide light engagement support.
- [ ] Aim to **publish the service evaluation** (a paper is the best sales asset).

---

## PHASE 3 — Prove it, then decide on claims
- [ ] Analyse data. If outcomes (esp. length of stay) are good:
  - [ ] **Send the MHRA enquiry**; register as a medical device if required.
  - [ ] Lock **claims** (engagement/satisfaction likely fine; length-of-stay is the device trigger).
  - [ ] Build a **health-economic case** (cost per patient vs bed-days/readmissions saved).

---

## PHASE 4 — Fund & build the team
- [ ] **Funding** — SBRI Healthcare, NIHR i4i, Innovate UK (non-dilutive) or angels/VC; or self-fund + bring in a health-tech-experienced co-founder/advisor.
- [ ] Invest in **marketing**, **technical support**, and **patient-engagement coaches** (people who call patients — the differentiator).

---

## PHASE 5 — Scale B2B across trusts
- [ ] Sell via **NHS procurement frameworks** (e.g. G-Cloud).
- [ ] **Volume-based pricing** — per-patient fee that decreases at higher volumes, ideally + an annual platform licence so revenue isn't purely volume-dependent.
- [ ] Expand trust by trust, using published evidence + the health-economic case.

---

### Mapping to the original 7-step plan
1. Show patients, get feedback, iterate → **Phase 0**
2. Apply for NHS Clinical Entrepreneur Programme → **Phase 0**
3. Complete regulatory components → **Phase 1**
4. Free to a trust for a year, collect outcomes → **Phase 2**
5. Apply for funding / bring in experienced team → **Phase 4**
6. Invest in marketing, tech support, engagement coaches → **Phase 4**
7. B2B across trusts, volume-based pricing → **Phase 5**

*This document is a living plan — update the checkboxes as you go.*
