# Joint Journey - Sub-Processor Register

**Data Controller:** Elan Health Ltd (company number 17347255)
**Date:** 15/08/2026 | **Version:** 1.0

> Lists all third-party processors and sub-processors used by Joint Journey.
> Required for DTAC (section B), DPIA, and UK GDPR Article 28 compliance.

---

| # | Sub-processor | Service provided | Personal data processed | Data location | DPA/contract | Notes |
|---|---------------|-----------------|------------------------|---------------|-------------|-------|
| 1 | **Google Cloud / Firebase** (Google Ireland Ltd) | Authentication (Firebase Auth); database (Cloud Firestore); file storage (Cloud Storage) | Email, hashed password, all user profile and progress data (including health data) | **Firestore + Storage: europe-west2 (London, UK)**. Auth: Google global infrastructure. | Google Cloud Data Processing Terms (incorporating SCCs and UK International Data Transfer Addendum) | Core infrastructure. Data residency confirmed for database and storage. Auth data subject to Google global DPA with appropriate safeguards. |
| 2 | **Netlify** (Netlify Inc, USA) | Static website hosting (HTML, CSS, JS files) | **None** - Netlify serves static files only. No personal data is stored on or processed by Netlify. User data goes directly from the browser to Firebase. | USA / global CDN | Netlify DPA available on request | Static hosting only. Access logs may contain IP addresses (standard web server behaviour) but no application-level personal data. |

---

## Removed processors

| Processor | Previously used for | Removed | Reason |
|-----------|-------------------|---------|--------|
| **Google Analytics** (Google LLC) | Anonymous website usage analytics | August 2026 | Unnecessary - engagement data already captured in Firestore. Removed to eliminate US data transfer of browsing behaviour that could reveal health information, and to simplify trust IG conversations. |

---

## Notes

- **No advertising or marketing processors** are used.
- **No data is sold** to any third party.
- **Video content** is linked to (YouTube/Vimeo) but no personal data is sent to these platforms beyond standard browser requests when a user clicks a video link.
- This register will be updated whenever a sub-processor is added or removed. Users will be notified of material changes via the privacy policy.
