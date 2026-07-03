/* ============================================================================
   JOINT JOURNEY - Retention & Engagement Analytics
   ----------------------------------------------------------------------------
   Reads every user document from Firestore (via the Firebase Admin SDK, which
   bypasses the client security rules) and computes the headline retention
   numbers you can quote to surgeons / in your doctorate / for DTAC & CSO work:

     - How many people signed up
     - What % returned at least once after signing up
     - Week-1 / Week-2 / Week-4 retention
     - What % are "regular weekly users"
     - Of those with a surgery date, what % were active in the month before it

   NOTHING is written back to Firestore. This is read-only. It prints a summary
   to the console and writes a per-user CSV (analytics/retention-report.csv) so
   you can verify the numbers and drop them into an appendix.

   HOW TO RUN (see analytics/README.md for the full walkthrough):
     1. Download a service-account key from the Firebase console and save it as
        analytics/serviceAccountKey.json  (this file is gitignored - never commit it)
     2. cd analytics && npm install
     3. npm run retention
   ============================================================================ */

'use strict';

const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

/* ============================================================================
   CONFIG - tweak these freely. Everything that defines a "metric" lives here.
   ============================================================================ */
const CONFIG = {
  // Only count users who finished onboarding as a "signup". Set to false to
  // count every account that was ever created (including abandoned signups).
  ONBOARDED_ONLY: true,

  // Email addresses to exclude entirely (your own test accounts, demos, etc.).
  // Case-insensitive exact match on the user's email.
  EXCLUDE_EMAILS: [
    // 'ben@example.com',
    // 'test@jointjourney.org',
  ],

  // A user is a "regular weekly user" if they were active on >= 1 day in at
  // least this fraction of the ISO-weeks they have been enrolled.
  // 0.5 = "active in at least half of their weeks".
  REGULAR_WEEKLY_MIN_FRACTION: 0.5,

  // Ignore the current (partial) week when judging "regular weekly user", so
  // someone who just signed up today isn't unfairly marked as lapsed.
  REGULAR_IGNORE_CURRENT_WEEK: true,

  // Pre-op window: how many days before surgery we look at.
  PREOP_WINDOW_DAYS: 30,

  // Within that pre-op window, a user counts as "active" if they were active on
  // at least this many distinct days (4 ≈ roughly once a week for a month).
  PREOP_MIN_ACTIVE_DAYS: 4,

  // Where to write the per-user CSV.
  CSV_PATH: path.join(__dirname, 'retention-report.csv'),
};

/* ============================================================================
   FIREBASE ADMIN INIT
   ============================================================================ */
const KEY_PATH = path.join(__dirname, 'serviceAccountKey.json');
if (!fs.existsSync(KEY_PATH)) {
  console.error('\n❌ Missing service-account key.');
  console.error('   Expected file: ' + KEY_PATH);
  console.error('   See analytics/README.md for how to download it from the Firebase console.\n');
  process.exit(1);
}
const serviceAccount = require(KEY_PATH);
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

/* ============================================================================
   DATE HELPERS
   ============================================================================ */
const MS_PER_DAY = 24 * 60 * 60 * 1000;

// Parse anything date-ish into a JS Date (or null). Handles ISO strings,
// 'YYYY-MM-DD', and Firestore Timestamps.
function toDate(value) {
  if (!value) return null;
  if (typeof value.toDate === 'function') return value.toDate(); // Firestore Timestamp
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

// Normalise a Date to a 'YYYY-MM-DD' day-key (UTC) so activity on the same
// calendar day is counted once, regardless of time.
function dayKey(date) {
  return date.toISOString().slice(0, 10);
}

// Whole days between two day-keys / dates (b - a), floored.
function daysBetween(a, b) {
  return Math.floor((b.getTime() - a.getTime()) / MS_PER_DAY);
}

/* ============================================================================
   PER-USER ACTIVITY EXTRACTION
   Build the set of distinct calendar days on which a user did *anything*
   trackable: completed an exercise, logged mood, or logged weight.
   ============================================================================ */
function getActiveDayKeys(user) {
  const days = new Set();
  const progress = user.progress || {};

  // exercisesCompleted is an object keyed by 'YYYY-MM-DD' -> [exerciseIds]
  const ex = progress.exercisesCompleted || {};
  Object.keys(ex).forEach(function (key) {
    const arr = ex[key];
    if (Array.isArray(arr) && arr.length > 0) days.add(key);
  });

  // moodLog: array of entries with a date
  (progress.moodLog || []).forEach(function (entry) {
    const d = toDate(entry && (entry.date || entry.timestamp || entry.day));
    if (d) days.add(dayKey(d));
  });

  // weightLog: array of entries with a date
  (progress.weightLog || []).forEach(function (entry) {
    const d = toDate(entry && (entry.date || entry.timestamp || entry.day));
    if (d) days.add(dayKey(d));
  });

  return days;
}

// ISO-week identifier ('YYYY-Www') for a day-key, so we can count weekly activity.
function isoWeekKey(dayKeyStr) {
  const d = new Date(dayKeyStr + 'T00:00:00Z');
  const target = new Date(d.getTime());
  const dayNum = (d.getUTCDay() + 6) % 7; // Mon=0..Sun=6
  target.setUTCDate(target.getUTCDate() - dayNum + 3); // nearest Thursday
  const firstThursday = new Date(Date.UTC(target.getUTCFullYear(), 0, 4));
  const week = 1 + Math.round(((target - firstThursday) / MS_PER_DAY - 3 + ((firstThursday.getUTCDay() + 6) % 7)) / 7);
  return target.getUTCFullYear() + '-W' + String(week).padStart(2, '0');
}

/* ============================================================================
   PER-USER METRICS
   ============================================================================ */
function analyseUser(user, now) {
  const signup = toDate(user.createdAt);
  const surgery = toDate(user.profile && user.profile.surgeryDate);
  const activeDayKeys = getActiveDayKeys(user);
  const activeDates = Array.from(activeDayKeys).map(function (k) { return new Date(k + 'T00:00:00Z'); });

  // --- Returned at least once after signup day ---
  let returned = false;
  if (signup) {
    const signupKey = dayKey(signup);
    returned = Array.from(activeDayKeys).some(function (k) { return k > signupKey; });
  }

  // --- Week-N retention: active on any day in [signup + 7*(N-1), signup + 7*N) ---
  function activeInWeekWindow(n) {
    if (!signup) return false;
    const start = new Date(signup.getTime() + (n - 1) * 7 * MS_PER_DAY);
    const end = new Date(signup.getTime() + n * 7 * MS_PER_DAY);
    // Only meaningful if that window has actually elapsed.
    if (end > now) return null; // not enough time has passed to judge
    return activeDates.some(function (d) { return d >= startOfDay(start) && d < startOfDay(end); });
  }
  function startOfDay(d) { return new Date(d.toISOString().slice(0, 10) + 'T00:00:00Z'); }

  const week1 = activeInWeekWindow(1);
  const week2 = activeInWeekWindow(2);
  const week4 = activeInWeekWindow(4);

  // --- Weeks enrolled + weekly-active fraction ---
  let weeksEnrolled = 0;
  let activeWeeks = 0;
  let regularWeekly = false;
  if (signup) {
    const enrolledDays = Math.max(0, daysBetween(startOfDay(signup), now));
    weeksEnrolled = Math.floor(enrolledDays / 7) + 1; // at least the current week
    let denom = weeksEnrolled;
    if (CONFIG.REGULAR_IGNORE_CURRENT_WEEK && weeksEnrolled > 1) denom = weeksEnrolled - 1;

    const activeWeekSet = new Set();
    activeDayKeys.forEach(function (k) { activeWeekSet.add(isoWeekKey(k)); });
    // Count active weeks that fall within the enrolled span (all active weeks qualify).
    activeWeeks = activeWeekSet.size;

    const fraction = denom > 0 ? activeWeeks / denom : 0;
    regularWeekly = denom > 0 && fraction >= CONFIG.REGULAR_WEEKLY_MIN_FRACTION;
  }

  // --- Pre-op month activity ---
  let hasSurgery = !!surgery;
  let preOpActiveDays = 0;
  let preOpEligible = false; // surgery date exists AND the window has begun
  let preOpActive = false;
  if (surgery) {
    const windowStart = new Date(surgery.getTime() - CONFIG.PREOP_WINDOW_DAYS * MS_PER_DAY);
    // Eligible to be judged once we're at/after the window start (i.e. the pre-op
    // month has begun). Count active days that fall in [windowStart, surgery].
    if (now >= windowStart) {
      preOpEligible = true;
      preOpActiveDays = activeDates.filter(function (d) {
        return d >= startOfDay(windowStart) && d <= surgery;
      }).length;
      preOpActive = preOpActiveDays >= CONFIG.PREOP_MIN_ACTIVE_DAYS;
    }
  }

  return {
    email: user.email || '',
    signup: signup,
    surgery: surgery,
    hasSurgery: hasSurgery,
    totalActiveDays: activeDayKeys.size,
    returned: returned,
    week1: week1,
    week2: week2,
    week4: week4,
    weeksEnrolled: weeksEnrolled,
    activeWeeks: activeWeeks,
    regularWeekly: regularWeekly,
    preOpEligible: preOpEligible,
    preOpActiveDays: preOpActiveDays,
    preOpActive: preOpActive,
  };
}

/* ============================================================================
   AGGREGATION + OUTPUT
   ============================================================================ */
function pct(numerator, denominator) {
  if (!denominator) return '—';
  return Math.round((numerator / denominator) * 1000) / 10 + '%';
}
function line(label, num, denom) {
  return '  ' + label.padEnd(52) + pct(num, denom) + '  (' + num + '/' + denom + ')';
}

function csvEscape(v) {
  if (v === null || v === undefined) return '';
  const s = String(v);
  return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}

async function main() {
  const now = new Date();
  console.log('\n=== Joint Journey — Retention Report ===');
  console.log('Generated: ' + now.toISOString());

  const snapshot = await db.collection('users').get();
  const exclude = CONFIG.EXCLUDE_EMAILS.map(function (e) { return e.toLowerCase(); });

  const rows = [];
  let totalAccounts = 0;
  let excludedCount = 0;

  snapshot.forEach(function (doc) {
    const user = doc.data();
    totalAccounts++;
    const email = (user.email || '').toLowerCase();
    if (exclude.indexOf(email) !== -1) { excludedCount++; return; }
    if (CONFIG.ONBOARDED_ONLY && !user.onboarded) return;
    rows.push(analyseUser(user, now));
  });

  const N = rows.length;

  // --- Aggregate counts ---
  const returned = rows.filter(function (r) { return r.returned; }).length;
  const regular = rows.filter(function (r) { return r.regularWeekly; }).length;

  // Week-N retention: denominator excludes users where the window hasn't elapsed (null).
  function weekStats(key) {
    const eligible = rows.filter(function (r) { return r[key] !== null; });
    const active = eligible.filter(function (r) { return r[key] === true; }).length;
    return { active: active, eligible: eligible.length };
  }
  const w1 = weekStats('week1');
  const w2 = weekStats('week2');
  const w4 = weekStats('week4');

  // Pre-op: denominator = users eligible to be judged (surgery date + window begun).
  const preOpEligible = rows.filter(function (r) { return r.preOpEligible; });
  const preOpActive = preOpEligible.filter(function (r) { return r.preOpActive; }).length;
  const withSurgery = rows.filter(function (r) { return r.hasSurgery; }).length;

  /* ---- Console summary ---- */
  console.log('\n--- Signups ---');
  console.log('  Total accounts created:'.padEnd(54) + totalAccounts);
  if (excludedCount) console.log('  Excluded (test accounts):'.padEnd(54) + excludedCount);
  const signupLabel = '  Counted as signups' + (CONFIG.ONBOARDED_ONLY ? ' (onboarded only):' : ':');
  console.log(signupLabel.padEnd(54) + N);


  console.log('\n--- Return / weekly engagement ---');
  console.log(line('Returned at least once after signup:', returned, N));
  console.log(line('Regular weekly users (active ≥1 day in ≥' + Math.round(CONFIG.REGULAR_WEEKLY_MIN_FRACTION * 100) + '% of weeks):', regular, N));
  console.log(line('Week-1 retention:', w1.active, w1.eligible));
  console.log(line('Week-2 retention:', w2.active, w2.eligible));
  console.log(line('Week-4 retention:', w4.active, w4.eligible));

  console.log('\n--- Pre-op month (' + CONFIG.PREOP_WINDOW_DAYS + ' days before surgery) ---');
  console.log('  Users with a surgery date:'.padEnd(54) + withSurgery);
  console.log(line('Active in pre-op month (≥' + CONFIG.PREOP_MIN_ACTIVE_DAYS + ' days):', preOpActive, preOpEligible.length));

  /* ---- Plain-English headline ---- */
  console.log('\n--- In plain English ---');
  console.log('  Of ' + N + ' people who signed up, ' + pct(returned, N) + ' came back at least once,');
  console.log('  and ' + pct(regular, N) + ' were regular weekly users.');
  if (preOpEligible.length) {
    console.log('  In the month before surgery, ' + pct(preOpActive, preOpEligible.length) +
      ' were active users (' + preOpActive + '/' + preOpEligible.length + ').');
  } else {
    console.log('  (No users yet have a surgery date with an elapsed pre-op window.)');
  }

  /* ---- CSV ---- */
  const header = [
    'email', 'signup_date', 'surgery_date', 'weeks_enrolled', 'active_weeks',
    'total_active_days', 'returned', 'regular_weekly',
    'week1_retained', 'week2_retained', 'week4_retained',
    'preop_eligible', 'preop_active_days', 'preop_active',
  ];
  const lines = [header.join(',')];
  rows.forEach(function (r) {
    lines.push([
      csvEscape(r.email),
      r.signup ? dayKey(r.signup) : '',
      r.surgery ? dayKey(r.surgery) : '',
      r.weeksEnrolled,
      r.activeWeeks,
      r.totalActiveDays,
      r.returned ? 'yes' : 'no',
      r.regularWeekly ? 'yes' : 'no',
      r.week1 === null ? 'n/a' : (r.week1 ? 'yes' : 'no'),
      r.week2 === null ? 'n/a' : (r.week2 ? 'yes' : 'no'),
      r.week4 === null ? 'n/a' : (r.week4 ? 'yes' : 'no'),
      r.preOpEligible ? 'yes' : 'no',
      r.preOpActiveDays,
      r.preOpEligible ? (r.preOpActive ? 'yes' : 'no') : 'n/a',
    ].join(','));
  });
  fs.writeFileSync(CONFIG.CSV_PATH, lines.join('\n'));
  console.log('\n📄 Per-user CSV written to: ' + CONFIG.CSV_PATH);
  console.log('   (Contains emails — treat as confidential, it is gitignored.)\n');
}

main().then(function () { process.exit(0); }).catch(function (err) {
  console.error('\n❌ Error running retention report:', err);
  process.exit(1);
});
