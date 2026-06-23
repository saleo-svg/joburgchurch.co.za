# STATUS.md

## Current Phase
**Phase 5 COMMITTED + PUSHED. GitHub master updated. Manual deployment trigger needed from Cloudflare Pages / Vercel dashboard — no in-repo CI/CD detected. Live site content partially verified; og-default.jpg not yet live (404).**

## Completed Work (Phase 4)

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

## Pages (26 total)
Core pages (13): Home, About, Visit, Classes, Korean, Spiritual Ed, Youth, Sermons, Events, Blog, Blog posts (5), Contact, Privacy, 404
Location pages (8): Locations index + Sandton, Randburg, Fourways, Midrand, Alberton, Roodepoort, Soweto
Static: sitemap.xml, robots.txt, favicon.svg

## Next Steps (Remaining)
1. **[Manual] Deploy from Cloudflare Pages or Vercel dashboard** — GitHub push does not auto-trigger deploy. Log in to the hosting dashboard and trigger a new deployment.
2. **[After deploy] Verify live pages** — homepage, /visit/, /community-classes/korean/, /locations/randburg/, /sitemap.xml ( intermittently 500), /images/og-default.jpg (currently 404).
3. **Submit sitemap to Google Search Console** — https://joburgchurch.co.za/sitemap.xml
4. **Create Google Business Profile listing**
5. **[Security] Rotate exposed Cloudflare token** — noted in DEV_LOG.

## Git Commit
- Commit `1999a27` on `master`: "Phase 5 content and SEO enrichment"
- 15 files changed, 230 insertions(+), 31 deletions(-)
- Excludes sensitive files: `对话记录.txt`, `开发记录.txt` (in `.gitignore`)
- Includes: `public/images/og-default.jpg`

## Deployment Notes
- No GitHub Actions, no `wrangler.toml`, no `vercel.json` in repo
- Deployment must be triggered manually from hosting dashboard
- `sitemap.xml` intermittently returns 500 on live host (transient or Pages routing issue)

## Blockers
- No email/social (user did not provide)
- Real church photos are not available yet; using a generated/static OG asset for now

## Context Usage
Current session continued by Codex supervision. Build verified on 2026-06-23 after Phase 5 edits.
