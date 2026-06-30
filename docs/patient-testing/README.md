# Joint Journey — Patient Testing Kit

A lightweight discovery test with **5–10 people** to check the app is usable, understandable, credible, and worth following — *before* we invest further.

This folder contains:

| File | What it's for |
|------|----------------|
| `create-google-form.gs` | A Google Apps Script that **auto-builds the feedback Google Form** in your own Drive. |
| `session-script.md` | The short script for *you* to run each ~20-minute session. |
| `README.md` | This file — how to build the form and how to score the results. |

---

## Step 1 — Build the Google Form (≈2 minutes)

1. Go to **https://script.google.com** and click **New project**.
2. Delete the placeholder `function myFunction() {}` code.
3. Open `create-google-form.gs` (in this folder), copy **everything**, and paste it in.
4. Click **Save** (💾), then **Run** (▶). If asked which function, choose **`createJointJourneyForm`**.
5. Google will ask you to **authorise** — this is just your own script acting on your own Drive. Click through *Advanced → Go to project (unsafe)* if shown (it says "unsafe" for any personal script; it's yours).
6. When it finishes, open **View → Logs** (or the Execution log at the bottom). It prints two links:
   - **EDIT** link — opens the form so you can tweak wording.
   - **SHARE** link — the live link to send to testers.

The new form also appears in your Google Drive, titled **"Joint Journey — Tester Feedback."**

## Step 2 — Connect responses to a spreadsheet

Open the form → **Responses** tab → green **Link to Sheets** icon → *Create a new spreadsheet*. Every submission now lands in that sheet, one row per tester.

## Step 3 — Recruit 5–10 testers

Aim for a **mix**, not just confident tech users:
- A few people actually on a hip/knee waiting list (ideal).
- A spread of ages, including some **65+**.
- At least 2–3 who describe themselves as **not confident** with phones/websites — they reveal the real usability problems.

Keep it ethical: if posting in a patient forum/Facebook group, **ask the moderator's permission first**, and be transparent that you built it and want honest feedback.

---

## Scoring the SUS (System Usability Scale)

The last 10 questions are the standard SUS. For **each respondent**:

1. **Odd-numbered items (1,3,5,7,9):** score = (their answer − 1)
2. **Even-numbered items (2,4,6,8,10):** score = (5 − their answer)
3. Add up all 10 adjusted scores (range 0–40).
4. **Multiply by 2.5** → final SUS score **0–100**.

Then **average** the scores across all testers.

**Interpreting it:**
- **~68 = average** (the global benchmark)
- **80+ = good / excellent**
- **below ~50 = a real usability problem to fix**

### Quick spreadsheet formula
If your linked Sheet has the 10 SUS answers in columns (say `Q1…Q10`), the per-row SUS score is:

```
=2.5 * (
   (Q1-1)+(Q3-1)+(Q5-1)+(Q7-1)+(Q9-1) +
   (5-Q2)+(5-Q4)+(5-Q6)+(5-Q8)+(5-Q10)
)
```

Replace `Q1…Q10` with the actual cell references for that row, then drag down and average the column.

---

## What "good" looks like for this round (suggested success criteria)

- **SUS median ≥ 68** (usable for a first build).
- **≥ 80%** could create an account and look around unaided.
- **Most** rate "understood the benefit" and "credible" as 4–5.
- A few **usable testimonial quotes** (with permission).
- A clear, ranked **list of the top confusions to fix** before wider release.

> ⚠️ **Honest caveat:** the "would you follow it?" and "would you pay?" questions are *hypothetical* — people reliably over-state both. Treat them as directional interest, not a forecast. Real adherence and real payment only show up later in the pilot.
