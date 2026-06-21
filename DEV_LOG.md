# DEV_LOG.md

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
