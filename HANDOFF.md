# HANDOFF.md

## Project: Johannesburg Bible Study Church Website

## Status
**Phase 5 LOCAL VERIFIED. Live domain active; enriched source is ready for deployment.**

Build: 26 pages, 0 warnings, 0 errors. Verified on 2026-06-23 after Phase 5 edits.

## Church Info (REAL — DO NOT REPLACE)
- **Brand:** Johannesburg Bible Study Church
- **Address:** Parkmore, 11th Street, Sandton, 2196 Johannesburg
- **Phone:** Mr. Sim +27 77 487 1295 / Ms. Dora +27 67 442 4461
- **Bible Study:** Wednesday 7:30pm, Online, Google Meet
- **Korean Class:** Sunday 2:00pm, Offline (Sandton), Free, Appointment required
- **Youth:** Summer/Winter schedule

## Current Deployment Facts
- Live domain: https://joburgchurch.co.za
- Source domain references have been updated to `https://joburgchurch.co.za`
- Default OG image exists at `public/images/og-default.jpg`
- No email or social links should be added unless the user provides them
- Real church photos are still missing; use real photos later if the user provides safe images

## Files Structure
```
C:\Users\Laptop\Desktop\Church-Site\
├── astro.config.mjs          ← site URL set to joburgchurch.co.za
├── package.json
├── tailwind.config.mjs
├── tsconfig.json
├── STATUS.md
├── DEV_LOG.md
├── HANDOFF.md
├── SEO_PLAN.md
├── public/
│   ├── robots.txt           ← update sitemap URL
│   └── favicon.svg
├── dist/                     ← deploy this folder
└── src/
    ├── env.d.ts
    ├── styles/global.css
    ├── components/
    │   ├── Header.astro      ← logo, nav with Locations
    │   ├── Footer.astro      ← 6-col, Locations links, real address
    │   ├── SEOHead.astro
    │   └── Schema.ts         ← real church data
    ├── layouts/
    │   └── BaseLayout.astro
    └── pages/
        ├── 404.astro
        ├── about.astro
        ├── contact.astro     ← phone only, no email
        ├── events.astro
        ├── index.astro       ← real data, no hero image
        ├── privacy.astro
        ├── sermons.astro
        ├── spiritual-education.astro
        ├── visit.astro
        ├── youth-usecan.astro
        ├── sitemap.xml.ts     ← siteUrl set to joburgchurch.co.za
        ├── blog/
        │   ├── index.astro
        │   └── [slug].astro   ← 5 posts
        ├── community-classes/
        │   ├── index.astro
        │   └── korean.astro  ← SEO-optimised
        └── locations/
            ├── index.astro    ← 7 location cards
            └── [slug].astro   ← Sandton, Randburg, Fourways, Midrand, Alberton, Roodepoort, Soweto
```

## Build Commands
```powershell
# Build
Set-Location "C:\Users\Laptop\Desktop\Church-Site"
npx astro build

# Preview
npx astro preview
```

## Next Steps (In Order)
1. Run `npx astro build`
2. Push updated source to GitHub
3. Deploy/update Cloudflare Pages and/or Vercel
4. Verify live pages after deployment:
   - https://joburgchurch.co.za/
   - https://joburgchurch.co.za/visit/
   - https://joburgchurch.co.za/community-classes/korean/
   - https://joburgchurch.co.za/locations/randburg/
   - https://joburgchurch.co.za/sitemap.xml
   - https://joburgchurch.co.za/images/og-default.jpg
5. Submit sitemap to Google Search Console
6. Create Google Business Profile for church
7. Rotate the exposed Cloudflare API token if it has not already been rotated

## AI Update Prompt (For Adding New Blog Posts)
```
Create a new SEO-friendly blog post for Johannesburg Bible Study Church.

Topic: [paste topic]
Audience: People searching for Bible study, church, or Christian community in Johannesburg or Sandton, South Africa.

Requirements:
- warm, sincere, non-commercial church tone
- naturally include local SEO: "Bible study", "Sandton", "Johannesburg", "Christian community"
- no keyword stuffing
- 800 to 1200 words
- include title, description, date, tags
- suggest internal links to relevant site pages
- save in src/pages/blog/[slug].astro
- update sitemap.xml.ts to add the new blog URL
- update DEV_LOG.md and STATUS.md
```

## Context Protection
- If context reaches 80%: compress state into HANDOFF.md
- If context reaches 88%: stop immediately after saving HANDOFF.md
- All 4 checkpoint files are current and accurate
