# Joint Journey — Retention Analytics

A small, **read-only** Node script that reads every user document from Firestore
(using the Firebase **Admin SDK**) and reports the headline engagement numbers:

- How many people signed up
- What **%** returned at least once after signing up
- **Week-1 / Week-2 / Week-4** retention
- What **%** are **regular weekly users**
- Of users with a surgery date, what **%** were **active in the month before surgery**

It prints a summary to the console and writes a per-user CSV
(`retention-report.csv`) you can verify and drop into an appendix.

> It **never writes to Firestore** and it does **not** change your security rules.
> All user data stays server-side — nothing is exposed in a browser.

---

## One-time setup

### 1. Install Node (if you haven't)
Check with `node -v`. **This machine doesn't have Node yet**, so:

1. Go to <https://nodejs.org> and download the **LTS** macOS installer (`.pkg`).
2. Run the installer (click through the defaults).
3. **Quit and reopen your terminal / VS Code** so `node` and `npm` are picked up.
4. Confirm it worked: `node -v` should print a version like `v20.x`.


### 2. Download a service-account key
1. Go to the [Firebase console](https://console.firebase.google.com) → project **jointjourney-4cf64**.
2. **⚙️ Project settings** → **Service accounts** tab.
3. Click **Generate new private key** → **Generate key**. A `.json` file downloads.
4. Rename it to **`serviceAccountKey.json`** and put it in this `analytics/` folder.

> ⚠️ This key grants full admin access to your project. It is **gitignored** so it
> will never be committed. Do not email it, commit it, or share it. If it ever
> leaks, revoke it in the same Service accounts screen.

### 3. Install dependencies
```bash
cd analytics
npm install
```

---

## Running the report

```bash
cd analytics
npm run retention
```

You'll see something like:

```
=== Joint Journey — Retention Report ===
Generated: 2026-07-03T16:00:00.000Z

--- Signups ---
  Total accounts created:                             42
  Counted as signups (onboarded only):                39

--- Return / weekly engagement ---
  Returned at least once after signup:                71.8%  (28/39)
  Regular weekly users (active ≥1 day in ≥50% of weeks): 46.2%  (18/39)
  Week-1 retention:                                   64.1%  (25/39)
  Week-2 retention:                                   51.3%  (20/39)
  Week-4 retention:                                   38.5%  (12/31)

--- Pre-op month (30 days before surgery) ---
  Users with a surgery date:                          18
  Active in pre-op month (≥4 days):                   61.1%  (11/18)

--- In plain English ---
  Of 39 people who signed up, 71.8% came back at least once,
  and 46.2% were regular weekly users.
  In the month before surgery, 61.1% were active users (11/18).

📄 Per-user CSV written to: .../analytics/retention-report.csv
```

The CSV has one row per user (`retention-report.csv`) with signup/surgery dates,
weeks enrolled, active days, and each yes/no flag, so you can sanity-check the
aggregates by hand.

---

## Definitions (and how to change them)

Everything that defines a metric lives in the `CONFIG` block at the top of
`retention.js`. Edit a value, save, re-run — no other changes needed.

| Setting | Default | Meaning |
|---|---|---|
| `ONBOARDED_ONLY` | `true` | Only count users who finished onboarding as a "signup". |
| `EXCLUDE_EMAILS` | `[]` | Emails to ignore (your own test accounts). |
| `REGULAR_WEEKLY_MIN_FRACTION` | `0.5` | "Regular weekly user" = active in ≥1 day in at least this fraction of their enrolled weeks. |
| `REGULAR_IGNORE_CURRENT_WEEK` | `true` | Don't penalise someone for the current partial week. |
| `PREOP_WINDOW_DAYS` | `30` | Length of the "month before surgery" window. |
| `PREOP_MIN_ACTIVE_DAYS` | `4` | Days of activity needed in that window to count as "active" (≈ weekly). |

**What counts as an "active day":** any tracked action that day — completing an
exercise, logging mood, or logging weight.

**A note on denominators:** Week-N retention only counts users for whom that week
has actually elapsed (you can't judge week-4 retention on someone who signed up
three days ago). Those users show `n/a` in the CSV and are excluded from that
percentage. Same idea for the pre-op window — a user is only judged once their
pre-op month has begun.

---

## Privacy note
`serviceAccountKey.json` and `retention-report.csv` both contain sensitive data
(admin credentials / patient emails) and are **gitignored**. Keep them local,
and delete the CSV when you're done if you don't need to retain it.
