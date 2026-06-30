# Joint Journey — Clinical Advisory Board pack

This folder contains everything needed to set up and run the Joint Journey
Clinical Advisory Board, and to **evidence** that clinical content has been
reviewed (which our DCB0129 clinical safety case and any NHS DTAC submission
require — names alone are not enough).

## Contents
| File | Purpose |
|---|---|
| `terms-of-reference.md` | What the board is, who's on it, how it runs, decision rights. |
| `advisor-agreement-template.md` | Engagement letter per advisor (deliverables, IP, confidentiality, compensation). |
| `conflict-of-interest-policy.md` | CoI rules — essential for NHS credibility. |
| `conflict-of-interest-register.md` | Live register of declared interests. |
| `meeting-minutes-template.md` | Record of each meeting (the oversight audit trail). |
| `outreach-messages.md` | Ready-to-send messages: psychologist (warm), physio, dietitian. |
| `content-review-and-signoff-log.docx` | **Word** — the core review/sign-off record to send to reviewers. |
| `reviewer-signoff-statement.docx` | **Word** — short per-reviewer sign-off statement. |
| `generate_docx.py` | Script that regenerates the two Word files from this repo. |

## How the pieces fit together
1. **Recruit** advisors using `outreach-messages.md`.
2. **Engage** each with `advisor-agreement-template.md` + log their interests in
   `conflict-of-interest-register.md`.
3. **Review:** advisors review their pillar's content; record each review in
   `content-review-and-signoff-log.docx` and capture a `reviewer-signoff-statement.docx`.
4. **Hazards:** their input is attributed in `../clinical-safety/hazard-log.md`.
5. **Minutes:** each meeting recorded with `meeting-minutes-template.md`.
6. This evidence feeds the **Clinical Safety Case Report** and the **DTAC** pack.

## Regenerating the Word files
```
cd docs/advisory-board
python3 generate_docx.py
```
Requires `python-docx` (`pip3 install python-docx`).

> ⚠️ These are working templates, not legal advice. Have the advisor agreement
> and CoI policy reviewed by a solicitor before signing, especially the equity/IP terms.
