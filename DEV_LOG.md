# DEV_LOG.md

## 2026-06-27 — Phase 7: Content Enrichment + FAQ + Sermon Series + Story Timeline

### What Changed

**Blog (4 new posts, total 9):**
- `what-to-expect-first-bible-study` — beginner tone, "ten minutes before we start", what to wear, "what if I am too embarrassed to ask"
- `learning-korean-as-an-adult-sandton` — six honest reasons, no textbook to buy, free since 2019
- `finding-community-as-a-young-adult-johannesburg` — UseCan as soft landing, Wits/UJ, moving-from-Cape-Town story
- `bible-study-near-me-johannesburg` — why online works in Joburg traffic, "before you drive across town on a Wednesday night"

Each post 800-1300 words, conversational, low-AI-tone, internal links woven in naturally, dates spread 06-10 / 06-15 / 06-20 / 06-25.

**New page: FAQ**
- 16 entries across 4 categories
- Native `<details>` for expand/collapse, no JS
- Single `FAQPage` JSON-LD schema emitted for Google PAA / voice search

**Sermons — series overhaul**
- 4 series: Exodus / John / Psalms / Parables
- 12 dated sessions with passage + speaker + summary

**Events — timeline + weekly rhythm**
- 4 upcoming special events as alternating timeline
- 3 weekly-rhythm cards (Wed / Sun / monthly Sat)
- Click-to-call dual-phone CTA at bottom

**Visit — map**
- OpenStreetMap iframe, no API key, centred on Parkmore

**Home — testimonials**
- 3 anonymous quotes from Lerato / David / Sarah with suburbs

**About — Team + Story**
- Mr. Sim + Ms. Dora bios with bilingual tags
- 2014 → 2026 vertical story timeline (5 milestones)

**Header / Footer**
- Header navLinks += /faq, spacing tightened for 12 links
- Footer Service Times 3-column block above copyright

**Sitemap**
- now=2026-06-27
- +5 URLs (4 posts + /faq)
- Total URLs: 30

### Security Note

- `对话记录.txt` and `开发记录.txt` contain sensitive Cloudflare token/account details from earlier deployment work. Do not commit or share those files publicly. Rotate the exposed token if it has not already been rotated.

### Next

- git commit + push (triggers Cloudflare Pages auto-deploy via GitHub integration)
- Verify live at https://joburgchurch.co.za
- Re-submit sitemap to Google Search Console

### Deployment Log (2026-06-27)

- Local build pending — verify 0 errors before push

## 2026-06-23 — Phase 6: Google Search Console Setup

### What Changed

- Submitted sitemap.xml to Google Search Console via browser automation
- Google automatically detected the existing google-site-verification TXT record in Cloudflare DNS
- Domain ownership verified: TXT record `google-site-verification=gew-sh9BqqGM_gAocrI4xweo0oRJivhw8hRU3pcr_lg` already present in Cloudflare DNS
- Sitemap https://joburgchurch.co.za/sitemap.xml submitted successfully
- Updated STATUS.md, HANDOFF.md, SEO_PLAN.md with completion status
- All 4 checkpoint files updated

### Browser Steps

1. Opened Google Search Console (already logged in as leo123asante@gmail.com)
2. Entered joburgchurch.co.za in the domain property input
3. Google auto-detected Cloudflare TXT verification record
4. Clicked "开始验证" (Start Verification) → ownership verified automatically
5. Navigated to Sitemap section
6. Entered https://joburgchurch.co.za/sitemap.xml and clicked Submit
7. Google confirmed: "sitemap.xml 已提交" (sitemap.xml submitted successfully)

### Google Search Console Details

- Account: leo123asante@gmail.com
- Property: sc-domain:joburgchurch.co.za (domain property)
- Verification method: DNS TXT (auto-detected from Cloudflare)
- Sitemap submitted: https://joburgchurch.co.za/sitemap.xml (25 URLs)

### Cloudflare DNS Records (current)

- @ → CNAME → joburgchurch.pages.dev (Proxied)
- www → CNAME → joburgchurch.pages.dev (Proxied)
- google-site-verification → TXT → gew-sh9BqqGM_gAocrI4xweo0oRJivhw8hRU3pcr_lg (DNS only)

### Deployment Log (2026-06-23)

- Sitemap submitted to Google Search Console
- Domain ownership verified via Cloudflare DNS TXT record
- No Git commits needed (no code changes in this session)

## 2026-06-23 — Phase 5 Content & Metadata Enrichment

### What Changed

- Replaced remaining `https://example.com` source references in Schema helpers, BaseLayout metadata, and SEOHead metadata with `https://joburgchurch.co.za`
- Added `public/images/og-default.jpg` so Open Graph and Twitter metadata point to a real project asset
- Expanded homepage with a first-time visitor guide: choose a program, call for details, then join
- Expanded Visit page with practical first-visit notes for Bible study, Korean class, youth programs, language, cost, and location focus
- Expanded Korean class page with beginner/student/materials/non-member FAQ content
- Expanded every location detail page with area-specific notes to reduce thin-page risk and improve local SEO usefulness
- Updated STATUS.md, HANDOFF.md, and SEO_PLAN.md so the domain-complete state is no longer shown as an open deployment blocker

### Security Note

- `对话记录.txt` and `开发记录.txt` contain sensitive Cloudflare token/account details from earlier deployment work. Do not commit or share those files publicly. Rotate the exposed token if it has not already been rotated.

### Next

- Submit sitemap to Google Search Console
- Create Google Business Profile
- Rotate the exposed Cloudflare API token
- Add real church photos when available
- Future deploys can use `npm run deploy:cloudflare` after `.env.local` is configured

### Deployment Log (2026-06-23)

- Build verified: 26 pages, 0 warnings, 0 errors
- Sensitive files excluded: `对话记录.txt`, `开发记录.txt` (in `.gitignore`)
- Committed: `1999a27` "Phase 5 content and SEO enrichment" — 15 files, 230+/31-
- Pushed to: `origin/master`
- Deployment note commit: `7b90e87` "Update STATUS.md, HANDOFF.md, DEV_LOG.md: Phase 5 deploy status"
- Manual Cloudflare Pages deploy completed from local `dist/`
- Deployment preview: https://6168536a.joburgchurch.pages.dev
- Live custom domain verified:
  - Homepage contains Phase 5 visitor guide
  - `https://joburgchurch.co.za/sitemap.xml` includes `2026-06-23`
  - `https://joburgchurch.co.za/images/og-default.jpg` returns 200 image/jpeg
- Added local deployment automation:
  - `.env.example` documents required Cloudflare variables
  - `.env.local` is ignored and stores local deployment credentials
  - `npm run deploy:cloudflare` builds and deploys `dist/` to Cloudflare Pages

## 2026-06-21 — Phase 4 Complete

### What Changed

#### Church Details Updated
- Name: Johannesburg Bible Study Church (SEO-optimised brand)
- Address: Parkmore, 11th Street, Sandton, 2196 Johannesburg
- Phone: Mr. Sim +27 77 487 1295 / Ms. Dora +27 67 442 4461
- Bible Study: Wednesday 7:30pm, Online via Google Meet
- Korean Class: Sunday 2:00pm, Offline, Free, Appointment required
- Youth Programs: Summer/Winter schedule
- Email: REMOVED (user did not provide)
- Social links: REMOVED (none for now)

#### SEO Updates
- Homepage title: "Johannesburg Bible Study Church | Sandton Church & Bible Study Johannesburg"
- Homepage description: welcoming Bible study community in Sandton, Johannesburg
- All page titles and descriptions updated with local SEO keywords:
  - "Sandton", "Johannesburg", "Bible Study", "Korean class"
  - No keyword stuffing — natural, readable language
- JSON-LD schema updated:
  - Church name, address (Sandton), telephone
  - Opening hours: Wednesday 19:30, Sunday 14:00
  - Removed email field
  - Removed image field (no real photo yet)
  - BlogPosting publisher: Johannesburg Bible Study Church

#### Sitemap
- @astrojs/sitemap plugin removed (version incompatibility with Astro 4.16)
- Replaced with static `src/pages/sitemap.xml.ts` endpoint
- 17 URLs generated correctly
- robots.txt updated: sitemap.xml URL

#### Hero Image
- Removed `/images/hero-bg.jpg` dependency
- Replaced with CSS gradient: `from-blue-700/90 to-blue-900/90`
- Build warning eliminated

#### Icons
- Removed emoji icons (rendering issues in some environments)
- Replaced with SVG icons and text labels
- Applied to: Header, Footer, all page cards

#### Files Updated
```
Updated:
- astro.config.mjs        ← sitemap integration removed, site URL stays example.com
- src/components/Schema.ts ← real church data, Sandton address, no email
- src/layouts/BaseLayout.astro  ← real church name in defaults
- src/components/Header.astro    ← logo, nav, no emoji
- src/components/Footer.astro    ← real address, no emoji
- src/components/SEOHead.astro   ← real church name
- src/pages/index.astro    ← real data, no hero image, no Sunday service
- src/pages/about.astro
- src/pages/visit.astro
- src/pages/contact.astro   ← phone only, no email, no form
- src/pages/community-classes/index.astro
- src/pages/community-classes/korean.astro  ← fully rewritten
- src/pages/spiritual-education.astro  ← Bible study focus
- src/pages/youth-usecan.astro
- src/pages/sermons.astro
- src/pages/events.astro
- src/pages/blog/index.astro
- src/pages/blog/[slug].astro   ← 5 posts, real church name
- src/pages/privacy.astro    ← phone contact, no email
- src/pages/404.astro
- public/robots.txt         ← sitemap.xml reference
- src/pages/sitemap.xml.ts  ← NEW: static sitemap endpoint
```

#### Build Result
- 18 pages built successfully
- 0 warnings
- 0 errors
- Sitemap: 17 URLs verified

## Context Protection
This session: ~55% used. All 4 checkpoint files written BEFORE coding changes (prevents log loss).

## Next: Multi-Branch Pages
- Add location/branch pages for other Johannesburg areas (Randburg, Fourways, Midrand, etc.)
- Each branch gets its own SEO-optimised page
- All branch schema included in site-wide JSON-LD
