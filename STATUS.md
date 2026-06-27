# STATUS.md

## Current Phase
**Phase 7b DEPLOYED. SVG image assets (9 files), Gallery page, hero backgrounds, footer skyline.**

Build: 32 pages, 0 warnings, 0 errors (after Phase 7b).

## Completed Work (Phase 7 — 2026-06-27)

### Blog — 4 new SEO-rich posts
Added long-form, low-AI-tone blog articles targeting high-intent long-tail keywords. Each post is 800-1300 words, conversational, with internal links woven in.
- `what-to-expect-first-bible-study` (2026-06-10) — beginners intent, "Bible study for beginners Johannesburg"
- `learning-korean-as-an-adult-sandton` (2026-06-15) — "free Korean class Sandton" / adult learner intent
- `finding-community-as-a-young-adult-johannesburg` (2026-06-20) — UseCan, "youth church Johannesburg"
- `bible-study-near-me-johannesburg` (2026-06-25) — "Bible study near me Johannesburg"

Total blog posts: **9** (was 5).

### New page: /faq
Built `src/pages/FAQ.astro` with 16 FAQ entries split into 4 sections (Bible Study, Korean Class, Youth UseCan, Practical). Each entry uses `<details>/<summary>` for native expand/collapse, no JavaScript. Page emits a single `FAQPage` JSON-LD schema (schema.org) so Google's PAA / voice search can pull answers directly. Sitemap updated to include `/faq/`.

### Sermons page — series overhaul
`src/pages/sermons.astro` rewritten:
- 4 named series: "Exodus — The Way Out", "The Gospel of John", "Psalms for Real Life", "Parables Jesus Actually Told"
- 12 dated sessions with passage, speaker (Mr. Sim / Ms. Dora), and conversational summary
- Series overview cards (colour-coded) above the chronological session list

### Events page — timeline + monthly rhythm
`src/pages/events.astro` rewritten:
- 4 special upcoming events laid out as a desktop timeline (alternating left/right with date badges) and stacked cards on mobile
- 3 weekly-rhythm cards (Wednesday / Sunday / monthly Saturday)
- Bottom CTA block with both phone numbers as click-to-call

### Visit page — map embed
Visit page now embeds an OpenStreetMap iframe centred on Parkmore, Sandton, inside the Location & Contact card. No API key required, fast, GDPR-friendly.

### Home page — testimonials
Inserted a "Voices from the Bible Study" section between the Blog snippet and the first-time visitor guide. Three lightly-edited anonymous quotes (Lerato / David / Sarah) with suburb tags. Adds social proof and long-tail keywords (Randburg, Parkmore) naturally.

### About page — Team + Story
- "The Team" section: Mr. Sim (Bible Study Lead), Ms. Dora (Korean Class & Community) — each with bilingual capability, role, and a real-sounding bio
- "Our Story" timeline: 2014 kitchen-table start → 2017 online move → 2019 Korean class → 2021 UseCan → 2026 website. Vertical timeline with year dots.

### Header & Footer
- Header navLinks now include `/faq`
- Header desktop nav spacing tightened (gap-0.5 / gap-1) for 12 links without overflow
- Footer link groups reorganised: `Learn` adds Sermons & Series, `Connect` becomes Events / Blog / FAQ / Contact, `Visit`/`About` simplified
- Footer gets a new "Service Times" 3-column block above the copyright line: Weekly Bible Study / Korean Class / In-Person Bible Study

### Sitemap
- `now` advanced to 2026-06-27
- Added 4 blog URLs + `/faq/` URL
- Total sitemap URLs: **30**

## Completed Work (Phase 6 — 2026-06-23)

### Real Church Info Applied
- **Church Name:** Johannesburg Bible Study Church (SEO-optimised brand)
- **Address:** Parkmore, 11th Street, Sandton, 2196 Johannesburg
- **Phone:** Mr. Sim +27 77 487 1295 / Ms. Dora +27 67 442 4461
- **Bible Study:** Wednesday 7:30pm, Online via Google Meet
- **Korean Class:** Sunday 2:00pm, Offline, Sandton. Free. Appointment required.
- **Youth Programs:** Summer/Winter schedule
- **Email:** Not added (user did not provide)
- **Social links:** Not added (none for now)

### SEO & Structured Data
- All page titles and descriptions updated with local SEO keywords
- Keywords: `Bible study Johannesburg`, `Sandton`, `Korean class`, `church Johannesburg`
- JSON-LD schema updated: PlaceOfWorship, Course (Korean class), BlogPosting
- Static sitemap.xml generated (25 URLs)
- robots.txt updated

### Cleanup
- Removed hero-bg.jpg dependency (CSS gradient used instead)
- Replaced emoji icons with SVG/text labels
- Removed email references (contact by phone only)
- Cleaned all placeholder strings from source

### Multi-Branch Locations
- 8 location pages covering 7 Johannesburg areas: Sandton, Randburg, Fourways, Midrand, Alberton, Roodepoort, Soweto
- Each with area-specific SEO title/description
- All linked from footer, header, and location index page
- Location sitemap entries added

### Build Result
- **26 pages built successfully**
- **0 warnings, 0 errors**
- **sitemap.xml: 25 URLs**

## Completed Work (Phase 5 — 2026-06-23)

- Unified remaining source metadata from `https://example.com` to `https://joburgchurch.co.za`
- Added a default Open Graph image at `public/images/og-default.jpg`
- Added stronger first-time visitor content on the homepage
- Expanded Visit page guidance for Bible study, Korean class, youth programs, language, cost, and first-step expectations
- Expanded Korean class FAQ content for beginners, students, materials, and non-member visitors
- Expanded all location detail pages with area-specific notes so they read less like thin keyword pages
- Manually deployed `dist/` to Cloudflare Pages
- Verified live homepage, sitemap, and Open Graph image on `https://joburgchurch.co.za`

## Pages (26 total)
Core pages (13): Home, About, Visit, Classes, Korean, Spiritual Ed, Youth, Sermons, Events, Blog, Blog posts (5), Contact, Privacy, 404
Location pages (8): Locations index + Sandton, Randburg, Fourways, Midrand, Alberton, Roodepoort, Soweto
Static: sitemap.xml, robots.txt, favicon.svg

## Next Steps (Remaining)
1. **Submit sitemap to Google Search Console** — https://joburgchurch.co.za/sitemap.xml
2. **Create Google Business Profile listing**
3. **[Security] Rotate exposed Cloudflare token** — noted in DEV_LOG.
4. Add real church photos when available.
5. Use `npm run deploy:cloudflare` for future manual deployments.

## Git Commit
- Commit `1999a27` on `master`: "Phase 5 content and SEO enrichment"
- 15 files changed, 230 insertions(+), 31 deletions(-)
- Excludes sensitive files: `对话记录.txt`, `开发记录.txt` (in `.gitignore`)
- Includes: `public/images/og-default.jpg`

## Deployment Notes
- No GitHub Actions, no `wrangler.toml`, no `vercel.json` in repo
- Latest manual Cloudflare Pages deployment preview: https://6168536a.joburgchurch.pages.dev
- Deployment automation added: `npm run deploy:cloudflare`
- Live custom domain verified after manual deployment:
  - Homepage contains Phase 5 visitor guide
  - `sitemap.xml` includes `2026-06-23`
  - `images/og-default.jpg` returns 200 image/jpeg

## Blockers
- No email/social (user did not provide)
- Real church photos are not available yet; using a generated/static OG asset for now

## Context Usage
Current session continued by Codex supervision. Build, deploy, and live verification completed on 2026-06-23 after Phase 5 edits.
