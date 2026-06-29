# Joint Journey — Firestore Security Rules Audit

**Version:** 1.0 · **Date:** [insert] · **Auditor:** [Mr Benjamin Zucker]
**Scope:** Access-control review of `firestore.rules` against the application's
actual data-access patterns. Supports the DPIA (§7), the DTAC data-security
section, and NHS IG / DSPT evidence.

> This is a code-level access-control review. It does **not** replace an
> independent penetration test, which is recommended before wider rollout.

---

## 1. Summary / conclusion
**Result: PASS (with hardening applied).**
The rules enforce strict per-user isolation: an authenticated user can only
read and write **their own** record, and no client can read other users' data.
The only other client-writable collection (`feedback`) is **create-only** and
has been hardened to prevent uid-spoofing and oversized writes. A default
**deny-all** rule covers everything else.

## 2. What the application actually does (verified in code)
Searching the client code (`js/`) for all Firestore access shows only **two**
collections are ever touched:

| Collection | Operation | Where (file) |
|---|---|---|
| `users/{uid}` | `get`, `set`, `set(merge)` keyed on the signed-in user's uid | `js/auth.js` |
| `feedback` | `add` (create only) | `js/feedback.js` |

No client code reads other users' documents, lists collections, or performs
admin operations. There are no privileged/admin roles in the data model.

## 3. Rule-by-rule findings

### 3.1 `match /users/{userId}`
```
allow read, write: if request.auth != null && request.auth.uid == userId;
```
- ✅ **Authentication required** (`request.auth != null`).
- ✅ **Ownership enforced** — `request.auth.uid == userId` means a user can only
  access the document whose ID equals their own uid. User A cannot read or
  write user B's record.
- ✅ Matches the client, which always reads/writes `users/{firebaseUid}`.
- ℹ️ **Note (accepted risk, low):** there is no field-level schema validation,
  so a user could write arbitrary fields **to their own** document. Because the
  blast radius is limited to their own record and there are no role/permission
  fields to escalate, this is acceptable for the pilot. Schema validation can be
  added later if the data model grows.

### 3.2 `match /feedback/{docId}` (hardened in this audit)
```
allow create: if request.auth != null
              && request.resource.data.uid == request.auth.uid
              && request.resource.data.message is string
              && request.resource.data.message.size() < 5000;
allow read, update, delete: if false;
```
- ✅ **Create-only**; no client can read, edit or delete feedback (reviewed in
  the Firebase console). This keeps other users' feedback private.
- ✅ **Anti-spoofing (added):** the `uid` field on the submitted document must
  equal the caller's uid, so a user cannot attribute feedback to someone else.
- ✅ **Size cap (added):** `message` must be a string under 5,000 characters,
  limiting abuse / oversized writes.
- ✅ Consistent with the client, which only writes to `feedback` when a
  `firebaseUid` is present and always sets `uid = firebaseUid`.

### 3.3 Default deny
```
match /{document=**} { allow read, write: if false; }
```
- ✅ Anything not explicitly allowed is denied. Good default-deny posture.

## 4. Residual risks & recommendations
| # | Item | Severity | Recommendation |
|---|---|---|---|
| 1 | No schema validation on `users/{uid}` | Low | Optional: add field validation if/when roles or shared data are introduced. |
| 2 | No server-side rate limiting on `feedback` create | Low | Optional: add App Check and/or a Cloud Function with rate limiting if spam appears. |
| 3 | Rules not yet covered by automated tests | Medium | Add Firebase Emulator rules unit tests to prevent regressions (see §6). |
| 4 | No independent penetration test | Medium | Commission a light pen-test before wider/Phase-2 rollout. |
| 5 | Enable **App Check** | Medium | Recommended to ensure only your app (not arbitrary scripts) can call the API. |

## 5. Deployment note (ACTION REQUIRED)
Editing `firestore.rules` in the repo does **not** change the live database.
The hardened rules above must be **deployed**:
- **Console:** Firebase Console → Build → Firestore Database → **Rules** → paste
  → **Publish**; or
- **CLI:** `firebase deploy --only firestore:rules`

After deploying, record the date here: **Rules deployed on 29 June 2026** (via
Firebase Console → Rules → Publish; confirmed by visual check that the live
`feedback` rule now includes the uid-match and message size-cap conditions).

## 6. Suggested regression tests (future)
Using the Firebase Emulator Suite, assert:
- User A can read/write `users/A` but **cannot** read/write `users/B`.
- Unauthenticated requests are denied everywhere.
- A signed-in user can `create` feedback with their own uid, but **cannot**
  create feedback with a different uid, and cannot read/update/delete feedback.

## 7. Data residency (related)
Firestore and Cloud Storage are both provisioned in **`europe-west2` (London)**.
See DPIA §7 for the residency statement and Google Cloud Data Processing Terms.
