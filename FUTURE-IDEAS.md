# Joint Journey - Future Ideas & Roadmap

A living document capturing ideas, features, and improvements to implement when the time is right. Updated during the build phase.

---

## 🔴 Priority 1 - Launch Requirements
*Things we need before going live to real users*

- [ ] **Deploy to Netlify** with custom domain (jointjourney.org)
- [ ] **Firebase migration** - real user accounts, persistent data, cloud storage
- [ ] **Google Analytics** - track visitors, page views, user journeys
- [ ] **Stripe integration** - £4.99/month subscription
  - Auto-cancel subscription when user confirms surgery in post-op check-in
  - Clear messaging: "We cancel your subscription for you after surgery"
  - Free pilot period first, then paywall everything

---

## 🟡 Priority 2 - Post-Launch Features
*Things to build in the first few months after launch*

### Payments & Subscriptions
- [ ] Stripe Checkout integration (£4.99/month)
- [ ] Subscription status check on login (paywall gate)
- [ ] Auto-cancellation logic triggered by post-op check-in "Yes, I had my surgery"
- [ ] Cancellation confirmation message with Oxford Score follow-up reminder
- [ ] Free trial period? (e.g. 7 days free, then £4.99/month) - TBD
- [ ] Promo codes for surgeons to give patients (e.g. first month free)

### Email Automation
- [ ] Welcome email after signup
- [ ] Weekly nudge emails ("You haven't logged in this week - here's your exercise reminder")
- [ ] Post-op check-in email (sent when surgery date passes)
- [ ] 6-month post-op Oxford Score email with unique link to standalone questionnaire
- [ ] Email service: SendGrid, Mailchimp, or Firebase Extensions

### Surgeon Referral Page
- [ ] Dedicated page aimed at orthopaedic surgeons
- [ ] Explains the evidence for prehabilitation
- [ ] Shows aggregate Oxford Score outcome data (once we have it)
- [ ] "Recommend to your patients" CTA with printable cards/QR codes
- [ ] Surgeon registration - track which surgeons are referring patients
- [ ] B2B pricing option (bulk patient access for clinics)

### Oxford Score Follow-Up
- [ ] Standalone post-op Oxford Score page (followup.html) - no login required
- [ ] Unique token-based links sent via email at 6 months post-op
- [ ] Pre vs post comparison displayed to user
- [ ] Aggregate anonymised outcome data for surgeon page

---

## 🟢 Priority 3 - Growth & Enhancement
*Ideas for once the product is established*

### Content Improvements
- [ ] Exercise videos - commission or record proper demonstration videos
- [ ] More exercises - expand the library beyond the current 12-week programme
- [ ] Post-op exercise programme (early recovery exercises for after surgery)
- [ ] Shoulder replacement module (expand beyond hip and knee)
- [ ] More recipes - user-submitted recipes?
- [ ] Seasonal recipe collections
- [ ] Audio versions of mindset modules (listen while walking)
- [ ] Printable exercise sheets (PDF download)

### User Experience
- [ ] Push notifications (PWA) - exercise reminders, mood check-in prompts
- [ ] Dark mode
- [ ] Larger text option (accessibility for older users)
- [ ] Progress photos (optional - e.g. range of movement over time)
- [ ] Social/community features - forum or peer support (careful with moderation)
- [ ] Family/carer access - share progress with a family member
- [ ] Multi-language support (start with Welsh?)

### Data & Analytics
- [ ] Admin dashboard - user counts, engagement metrics, Oxford Score averages
- [ ] Aggregate outcome reporting for NHS/commissioners
- [ ] A/B testing on landing page
- [ ] Cohort analysis (do users who start earlier get better outcomes?)
- [ ] NPS (Net Promoter Score) survey

### Business & Marketing
- [ ] SEO optimisation for "prehabilitation hip replacement", "exercises before knee surgery" etc.
- [ ] Blog/content marketing - articles on prehab, recovery stories, evidence summaries
- [ ] Social media presence (Instagram? Facebook groups for joint replacement patients)
- [ ] Partner with patient charities (Versus Arthritis, etc.)
- [ ] Conference presentations (BOA, BOTA, regional meetings)
- [ ] Case study / white paper with Oxford Score outcome data
- [ ] NHS commissioning pitch deck with outcome data
- [ ] Private hospital partnerships (Nuffield, Spire, Circle)
- [ ] Physiotherapy practice partnerships
- [ ] Insurance company partnerships (BUPA, AXA - prehab reduces costs)

### Technical
- [ ] Native mobile app (React Native or Flutter) - longer term
- [ ] Offline mode (PWA service worker for exercises)
- [ ] GDPR data export (user can download all their data)
- [ ] Account deletion flow
- [ ] Two-factor authentication
- [ ] Automated backups

---

## 💡 Idea Parking Lot
*Random ideas that might be good, might not - captured here so they're not lost*

- Wearable integration (step count from Apple Health / Google Fit)
- Gamification (badges, achievements, leaderboards?)
- Virtual physio consultations (video call with a real physio - premium add-on)
- GP referral integration (GP can "prescribe" Joint Journey)
- Waiting list position tracker (if NHS APIs ever allow this)
- Recovery diary / journal feature
- "Surgery buddy" - connect with someone having the same surgery around the same time
- Surgeon reviews / ratings (controversial but interesting)
- Integration with hospital pre-assessment clinics
- Corporate wellness programme (for employers whose staff are awaiting surgery)
- Academic research collaboration - RCT comparing Joint Journey users vs standard care

---

## 📝 Business Model Notes

### Pricing Decision
- **£4.99/month** - full paywall, no free tier (after pilot phase)
- Auto-cancels when user confirms surgery completion in post-op check-in
- Average subscription duration: ~6-12 months (waiting list time)
- Average revenue per user: £30-60
- Target: 2,500 users/year = ~£100k revenue

### Revenue Target
- Year 1: £0 (free pilot, build user base and outcome data)
- Year 2: £100,000
- Costs: ~£1-2k/year (hosting, email, domain)
- Margins: 95%+

### Key Metrics to Track
- Signups per week
- Active users (logged in within 7 days)
- Exercise completion rate
- Oxford Score completion rate (pre-op)
- Subscription conversion rate
- Churn rate
- Average subscription length
- Oxford Score improvement (pre vs post)
- Surgeon referral count

---

*Last updated: 22 June 2026*
