# Joint Journey - Records of Processing Activities (ROPA)

**Data Controller:** Elan Health Ltd (company number 17347255)
**Contact:** hello@jointjourney.org
**Date:** 15/08/2026 | **Version:** 1.0

> Required under UK GDPR Article 30. This records all processing activities
> carried out by Elan Health Ltd in connection with Joint Journey.

---

## Processing activity 1: Delivering the prehabilitation programme

| Field | Detail |
|-------|--------|
| **Purpose** | Provide a personalised exercise, nutrition, education and wellbeing programme to adults awaiting hip/knee replacement |
| **Categories of data subjects** | Adults (18+) on the waiting list for elective hip or knee replacement |
| **Categories of personal data** | Name, email, password (hashed by Firebase Auth); joint(s) affected; surgery date; height, weight, BMI; Oxford Hip/Knee Score responses; exercise completion records (dates and exercise IDs); mood logs; weight logs; mindset module progress; programme level; safety screening responses |
| **Special category data?** | Yes - health data (Art. 9) |
| **Lawful basis (Art. 6)** | Consent (Art. 6(1)(a)) |
| **Special category condition (Art. 9)** | Explicit consent (Art. 9(2)(a)) |
| **Recipients** | No data shared with third parties. Sub-processors: Google Firebase (authentication + database), Netlify (static hosting). See sub-processor register. |
| **International transfers** | Firestore database and Cloud Storage: europe-west2 (London, UK) - no international transfer. Firebase Authentication: Google global infrastructure under Google Cloud Data Processing Terms (incorporating SCCs/UK addendum). Netlify: EU/US - static files only, no personal data stored. |
| **Retention period** | Active account data: retained while account is active. Inactive accounts: deleted/anonymised after 24 months of inactivity. |
| **Technical and organisational measures** | Firebase Auth (hashed passwords, MFA on admin); Firestore security rules (per-user isolation, audited); HTTPS encryption in transit; encryption at rest (Firebase default); least-privilege admin access. See DPIA section 7 and Firestore rules audit. |

---

## Processing activity 2: Post-operative outcome evaluation

| Field | Detail |
|-------|--------|
| **Purpose** | Evaluate the effectiveness of the prehabilitation programme by collecting post-operative outcomes |
| **Categories of data subjects** | Same as above (users who have had their surgery) |
| **Categories of personal data** | Whether operation took place and approximate date; length of hospital stay (self-reported); patient satisfaction survey responses; Oxford Score repeated at ~6 months post-op; any self-reported complications |
| **Special category data?** | Yes - health data |
| **Lawful basis (Art. 6)** | Consent (Art. 6(1)(a)) |
| **Special category condition (Art. 9)** | Explicit consent (Art. 9(2)(a)) |
| **Recipients** | Pseudonymised aggregate data may be used in service evaluation reports shared with pilot trusts. No individual-level data shared. |
| **International transfers** | As above |
| **Retention period** | Evaluation data retained for 5 years in pseudonymised form, then deleted or aggregated. |
| **Technical and organisational measures** | As above. Pseudonymisation applied before any analysis or reporting. |

---

## Processing activity 3: User feedback

| Field | Detail |
|-------|--------|
| **Purpose** | Collect user feedback to improve the product |
| **Categories of data subjects** | Signed-in users who submit feedback |
| **Categories of personal data** | Firebase UID (linked to account); free-text feedback message (max 5,000 characters); submission timestamp |
| **Special category data?** | Potentially (user may mention health in feedback) |
| **Lawful basis (Art. 6)** | Legitimate interests (Art. 6(1)(f)) - improving a health service |
| **Special category condition (Art. 9)** | Explicit consent (feedback is voluntarily submitted) |
| **Recipients** | Reviewed by the founder/developer only via the Firebase console. Not shared externally. |
| **International transfers** | As above (Firestore europe-west2) |
| **Retention period** | Retained for the lifetime of the product, reviewed periodically. |
| **Technical and organisational measures** | Create-only Firestore collection; no client-side read access; UID anti-spoofing enforced in security rules; message size-capped. |

---

## Processing activity 4: Account authentication

| Field | Detail |
|-------|--------|
| **Purpose** | Authenticate users and manage secure access |
| **Categories of data subjects** | All registered users |
| **Categories of personal data** | Email address, hashed password (managed entirely by Firebase Auth - Elan Health never accesses raw passwords) |
| **Special category data?** | No |
| **Lawful basis (Art. 6)** | Contract / consent (necessary to provide the service) |
| **Recipients** | Google Firebase (processor) |
| **International transfers** | Firebase Auth operates on Google global infrastructure under DPA/SCCs |
| **Retention period** | Retained while account is active. Deleted with account. |
| **Technical and organisational measures** | Firebase Auth handles password hashing, rate limiting, brute-force protection. MFA available. |
