# SEO_PLAN.md

## Primary SEO Strategy
Target long-tail, local keywords — NOT broad `church`. Focus on Bible study community, local intent, and useful content.

## Keyword Targets

### Homepage
- **Primary:** `Bible study Johannesburg`, `Bible study Sandton`
- **Secondary:** `church Sandton`, `church Johannesburg`, `Christian community Johannesburg`

### Korean Class Page
- **Primary:** `free Korean class Johannesburg`, `free Korean class Sandton`
- **Secondary:** `Korean class near me`, `learn Korean Johannesburg`

### Spiritual Education / Bible Study
- **Primary:** `Bible study Johannesburg`, `Bible study Sandton`
- **Secondary:** `online Bible study Johannesburg`, `Christian Bible study`, `Wednesday Bible study`

### Youth / UseCan
- **Primary:** `youth church Johannesburg`, `youth church Sandton`
- **Secondary:** `Christian youth Sandton`, `youth programs Johannesburg`

### Visit Us
- **Primary:** `church near me Johannesburg`, `church near me Sandton`
- **Secondary:** `Bible study near me`, `church Sandton`

## Page-Level SEO Targets

| Page | Primary Keyword | Secondary Keywords | Target Search Intent |
|------|---------------|-------------------|----------------------|
| `/` | Bible study Johannesburg | church Sandton, Christian community Johannesburg | Informational / Local |
| `/about` | Christian community Sandton | church beliefs Johannesburg | Informational |
| `/visit` | church near me Sandton | Bible study near me | Navigational / Local |
| `/community-classes` | free Korean class Johannesburg | community classes Sandton | Informational / Local |
| `/community-classes/korean` | free Korean class Sandton | Korean class Johannesburg | Informational / Local |
| `/spiritual-education` | Bible study Johannesburg | online Bible study Sandton | Informational |
| `/youth-usecan` | youth church Johannesburg | youth programs Sandton | Informational |
| `/sermons` | Bible study sermons Johannesburg | Christian teaching Sandton | Informational |
| `/events` | church events Sandton | community events Johannesburg | Informational / Local |
| `/blog` | Bible study blog Johannesburg | Christian blog Sandton | Informational |
| `/contact` | contact church Sandton | phone church Johannesburg | Navigational / Local |
| `/privacy` | (utility) | — | — |

## Location Pages (Multi-Branch)
Each branch/location in greater Johannesburg:
- `/locations/sandton` — Primary location (current site focus)
- `/locations/randburg` — Bible study in Randburg
- `/locations/fourways` — Bible study in Fourways
- `/locations/midrand` — Bible study in Midrand
- `/locations/alberton` — Bible study in Alberton
- `/locations/roodepoort` — Bible study in Roodepoort
- `/locations/soweto` — Bible study in Soweto

Each location page targets:
- "Bible study [area name]"
- "church [area name]"
- "Christian community [area name]"

## JSON-LD Structured Data

### Church Schema (on Home & Visit pages)
- `@type: PlaceOfWorship`
- `name: Johannesburg Bible Study Church`
- `address`: Parkmore, 11th Street, Sandton, 2196, ZA
- `telephone: +27 77 487 1295`
- `openingHoursSpecification`:
  - Wednesday 19:30 (online)
  - Sunday 14:00 (offline Korean class)

### Course Schema (on Korean Class page)
- `@type: Course`
- `name: Free Korean Class in Sandton, Johannesburg`
- `provider: Johannesburg Bible Study Church`

### BlogPosting Schema (on each blog post)
- `publisher: Johannesburg Bible Study Church`

### LocalBusiness/Landing Page Schema (per location)
- Each location page gets its own local landing page with area-specific schema

## Local SEO Signals
- Consistent NAP: `Johannesburg Bible Study Church`, `Parkmore, 11th Street, Sandton, 2196`, `+27 77 487 1295`
- `og:locale: en_ZA` on all pages
- Area names naturally embedded in page content and titles
- Internal links between location pages and main site

## Internal Linking Plan
- Home → links to all locations and main sections
- Location pages → Korean class, Bible study, youth
- Blog posts → relevant location and class pages

## Content That Can Rank (Future Blog Posts)
- "How to join our Wednesday online Bible study in Johannesburg"
- "Free Korean class for the Sandton and Johannesburg community"
- "Bible study for beginners in Johannesburg"
- "Why community learning matters in South Africa"
- "Youth programs that help students grow in faith and character"
- "Bible study near me — online options in Johannesburg"
- "How to find a Bible study group in Sandton"

## AdSense Readiness
- About page ✓
- Contact page ✓
- Privacy Policy page ✓
- 5 blog posts with original content ✓
- Mobile-friendly ✓
- No thin pages ✓
- Ads to be placed only on blog/resource pages if ever used

## To-Do (Before Launch)
- [x] Replace `https://example.com` with real domain in `astro.config.mjs`, `sitemap.xml.ts`, Schema helpers, and metadata components
- [ ] Submit sitemap.xml to Google Search Console
- [ ] Create Google Business Profile for church
- [ ] Add Google Maps embed on Visit page (Parkmore, 11th Street, Sandton)
- [x] Add default Open Graph image asset
- [ ] Add real church photo/image assets when available
- [ ] Add email/social if/when available

## AI Update Prompt
```
Create a new SEO-friendly blog post for Johannesburg Bible Study Church.

Topic: [paste topic]
Audience: People searching for Bible study, church, or Christian community in Johannesburg or Sandton, South Africa.

Requirements:
- warm, sincere, non-commercial church tone
- naturally include local SEO: "Bible study", "Sandton", "Johannesburg", "Christian community"
- no keyword stuffing
- 800 to 1200 words unless specified
- include title, description, date, tags
- suggest internal links to relevant site pages
- save in src/pages/blog/[slug].astro
- update sitemap.xml.ts to add the new blog URL
- update DEV_LOG.md and STATUS.md
```
