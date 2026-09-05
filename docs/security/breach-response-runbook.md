# Joint Journey - Data Breach Response Runbook

**Version:** 1.0 | **Date:** 15/08/2026 | **Owner:** Mr Benjamin Zucker (CSO / Data Controller)
**Organisation:** Elan Health Ltd (company number 17347255)

> This runbook defines how Elan Health Ltd responds to a suspected or confirmed
> personal data breach involving Joint Journey. It satisfies DTAC (section C),
> the DPIA (section 7), and UK GDPR Article 33/34 requirements.

---

## 1. What counts as a personal data breach

Any breach of security leading to the accidental or unlawful destruction, loss,
alteration, unauthorised disclosure of, or access to, personal data. Examples:

- Unauthorised access to Firestore user documents
- Accidental exposure of user data (e.g. misconfigured security rules)
- Loss of data (e.g. accidental deletion without backup)
- Credential compromise (Firebase console, GitHub, Netlify admin)
- Device theft/loss where admin credentials are cached
- Ransomware or malware affecting admin devices

---

## 2. Roles

| Role | Person | Contact |
|------|--------|---------|
| Incident Lead / Data Controller | Benjamin Zucker | hello@jointjourney.org |
| Clinical Safety Officer | Benjamin Zucker | (same) |
| Firebase/technical | Benjamin Zucker | (same) |

> As the organisation grows, separate these roles. For now the founder handles all.

---

## 3. Response steps

### Phase 1 - Contain (within 1 hour of discovery)

1. **Stop the breach** - revoke compromised credentials, disable affected accounts, tighten Firestore rules, take affected services offline if necessary.
2. **Preserve evidence** - screenshot logs, export audit trails, note the time and nature of discovery. Do not delete or modify evidence.
3. **Assess scope** - which users are affected? What data? How many records? Is health data involved?

### Phase 2 - Assess (within 24 hours)

4. **Risk assessment** - is there a risk to individuals' rights and freedoms?
   - What type of data? (health data = high impact)
   - How many people affected?
   - Is the data encrypted/pseudonymised?
   - Could the data be used to cause harm (identity theft, discrimination, distress)?
   - Has the breach been contained or is it ongoing?

5. **Decide on ICO notification** - if there is a risk to individuals (not just a theoretical risk), you MUST notify the ICO. For health data, the threshold is low - notify unless you can demonstrate the risk is unlikely.

6. **Decide on individual notification** - if there is a HIGH risk to individuals, you must also notify the affected users directly.

### Phase 3 - Notify (within 72 hours of becoming aware)

7. **ICO notification** (if required):
   - Report via: https://ico.org.uk/make-a-complaint/data-protection-complaints/data-protection-complaints/
   - Or call: 0303 123 1113
   - Include: nature of breach, categories and approximate number of data subjects, likely consequences, measures taken/proposed.
   - **Deadline: 72 hours** from when you became aware. If you don't have full details, provide what you have and supplement later.

8. **Individual notification** (if high risk):
   - Email affected users in clear, plain English.
   - Describe what happened, what data was involved, what you've done, what they should do (e.g. change passwords), and how to contact you.

9. **Trust notification** (if during a pilot):
   - Notify the pilot trust's Data Protection Officer and Information Governance lead immediately, regardless of ICO threshold. Follow any data processing agreement notification clauses.

### Phase 4 - Recover and learn (within 2 weeks)

10. **Root cause analysis** - what went wrong? How did the breach occur?
11. **Remediation** - fix the root cause. Update security controls, rules, processes.
12. **Update documentation** - update this runbook, the hazard log (H07), and the DPIA if the risk profile has changed.
13. **Record the incident** in the breach log (below), even if ICO notification was not required.

---

## 4. Breach log

Record ALL suspected or confirmed breaches here, regardless of severity.

| # | Date discovered | Description | Data involved | Users affected | ICO notified? | Individuals notified? | Outcome / actions |
|---|-----------------|-------------|---------------|----------------|---------------|----------------------|-------------------|
| - | (none to date)  | -           | -             | -              | -             | -                    | -                 |

---

## 5. Key contacts

| Contact | Details |
|---------|---------|
| ICO breach reporting | https://ico.org.uk | 0303 123 1113 |
| Firebase support | https://firebase.google.com/support |
| Netlify support | https://www.netlify.com/support/ |
| Police (if criminal) | 101 (non-emergency) or Action Fraud: 0300 123 2040 |

---

## 6. Testing

This runbook should be reviewed and tested (tabletop exercise) at least annually,
or after any actual breach. Record the date of each review below.

| Date | Reviewer | Notes |
|------|----------|-------|
| 15/08/2026 | B. Zucker | Initial version created. |
