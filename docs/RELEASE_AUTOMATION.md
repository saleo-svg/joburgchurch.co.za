# 2026-10-10 Release Pipeline — Documentation

## Overview

On 2026-10-10 we generated **80 high-quality, draft English blog posts**
for the Johannesburg Bible Study Church website. To avoid overwhelming
readers (and search engines) with a single-day dump, the posts are
**not** all published at once. They are released in **batches of 5,
every 3 days**, fully automated via GitHub Actions.

Total cadence: 80 ÷ 5 = 16 batches × 3 days = 48 days (≈ 7 weeks).
The pipeline is therefore **fully automatic** between 2026-10-13 and
2026-11-27 — the operator does not need to open Cursor again.

## Architecture

```
[80 .md files in src/content/posts/]
        ↓ (status: draft in frontmatter)
[80 entries in posts dict in src/pages/blog/[slug].astro]
        ↓ (content: '' for size — body loaded at build time)
[80 URLs in src/pages/sitemap.xml.ts with DRAFT-2026-10-10 lastmod]
        ↓
[src/lib/modules/blog.ts filters by status !== 'draft' for public lists]
        ↓
[src/pages/blog/[slug].astro redirects drafts to /blog]
        ↓
[src/pages/sitemap.xml.ts filters out DRAFT- entries]
        ↓
[Build → 416 pages (visible posts) + 80 redirect pages for drafts]
        ↓
[Cloudflare Pages deploys to https://joburgchurch.co.za]
        ↓
[GitHub Actions cron (every 3 days) calls scripts/release-next-batch.mjs]
        ↓
[5 posts flipped: frontmatter draft → published, date → today,
 sitemap DRAFT- stripped, queue batch marked released]
        ↓
[git commit + push → Cloudflare rebuilds → public release]
```

## Key Files

| Path | Purpose |
|---|---|
| `src/content/posts/*.md` | 80 new draft markdown files |
| `src/content/posts/_release-queue.json` | The 16-batch release order |
| `src/content/posts/_drafts-80.json` | Metadata manifest (release script reads this) |
| `src/pages/blog/[slug].astro` | Adds draft → /blog redirect + content fallback |
| `src/lib/modules/blog.ts` | Filters out drafts from public lists |
| `src/pages/sitemap.xml.ts` | Filters out DRAFT- entries from public sitemap |
| `src/content/config.ts` | Defines `status: 'draft' | 'scheduled' | 'published'` Zod schema |
| `scripts/reconstruct-80.py` | (Recovery) Rebuild 80 entries from .md frontmatter |
| `scripts/release-next-batch.mjs` | (Release) Flip 5 entries to published, commit-friendly |
| `.github/workflows/release-drafts.yml` | (Cron) Runs release script every 3 days |

## How the Release Action Works

1. **Schedule**: `cron: "0 6 */3 * *"` (every 3 days at 06:00 UTC = 08:00 SAST)
2. **Permission**: `contents: write` (so the Action can commit)
3. **Steps**:
   - Checkout
   - Install Node + deps
   - `node scripts/release-next-batch.mjs 1` (promote 1 batch = 5 posts)
   - `npm run build` (verify the build still succeeds)
   - `git add -A && git commit && git push` (the Action commits back)
4. **Manual trigger**: Workflow also supports `workflow_dispatch`
   so we can run more batches on demand (e.g. before a launch event)

## What `release-next-batch.mjs` Does

For each article in the next pending batch:

| File | What changes |
|---|---|
| `src/content/posts/<slug>.md` | frontmatter `status: draft` → `status: published` |
| `src/pages/blog/[slug].astro` | entry `status: 'draft'` → `status: 'published'`, `date: '2026-10-10'` → today's date |
| `src/pages/sitemap.xml.ts` | `lastmod: 'DRAFT-2026-10-10'` → `lastmod: '<today>'` (DRAFT- prefix stripped) |
| `src/content/posts/_release-queue.json` | batch `status: pending` → `status: released` |

After processing, the file is rebuilt. Cloudflare Pages picks up the
git push and redeploys.

## Release Schedule

| Batch | Date (SAST 08:00) | Articles |
|---|---|---|
| 1 | 2026-10-13 | anxiety, online-bible-study, budget, marriage, mother-of-adults |
| 2 | 2026-10-16 | father, teenagers, bereaved-grandparent, corporate, pension |
| 3 | 2026-10-19 | divorce, teen-pregnancy, chronic-illness, school-fees, load-shedding |
| 4 | 2026-10-22 | driving, single-mother, addiction, step-parenting, boomerang |
| 5 | 2026-10-25 | NPO, domestic-worker, foreign-christian, first-time-visitor, reading-plan |
| 6 | 2026-10-28 | exam-anxiety, pet-loss, widower, only-christian, neighbourhood-watch |
| 7 | 2026-10-31 | hospitality, church-conflict, burnout, gossip, doesnt-give |
| 8 | 2026-11-03 | adult-child, blended-family, doctor, loneliness, medical-crisis |
| 9 | 2026-11-06 | school-choice, household-help, traffic, neighbour, social-media |
| 10 | 2026-11-09 | family-expectations, time-management, faithful-wife, husband-leadership, n1 |
| 11 | 2026-11-12 | load-shedding-evening, newspaper, medicine, bible-translation, language |
| 12 | 2026-11-15 | new-neighbour, small-group, pet, gardening, volunteering |
| 13 | 2026-11-18 | law-firm, accident, police, entrepreneur, remarriage |
| 14 | 2026-11-21 | debt, artist, teacher, coffee-shop, mental-load |
| 15 | 2026-11-24 | cancelled-wedding, moved-here, STEM, pastor-quit, back-to-school |
| 16 | 2026-11-27 | economy, grandparent-discipling, farm, doubting, AI |

## Article Quality Bar

Every article is:
- **2500-3500 words** long (deep, pastoral, not superficial)
- **10-15 direct scripture citations** (in code-blocked blockquote form)
- **SA-localised** (Sandton, Randburg, Fourways, Soweto, N1, load-shedding, the rand, etc.)
- **Vivid SA scene** opener (an opening paragraph that grounds the reader in a real Johannesburg moment)
- **Sections** for clarity (`## Heading`)
- **Practical application** (steps, phone numbers, where to find help)
- **Closing prayer** (warm, conversational, not preachy)
- **Footer CTA** with Mr. Sim (+27 77 487 1295) and Ms. Dora (+27 67 442 4461)
- **12 tags** (a mix of subject, location, scripture-book, post-type)
- **Hero image** rotation across 6 SA-flavored images
- **No controversy** (no false-pastor exposes, no prosperity-gospel debates, no political hot-takes)

## How to Test the Release Locally

```bash
# Promote the next batch (5 posts)
node scripts/release-next-batch.mjs 1

# Promote 3 batches (15 posts) at once
node scripts/release-next-batch.mjs 3

# Build to verify
npm run build

# Check the dist/ — the promoted posts should now have real content
# (not the redirect placeholder)
```

## How to Disable the Auto-Release

If we want to pause the pipeline (e.g. for a holiday):

1. In GitHub, go to `.github/workflows/release-drafts.yml`
2. Comment out the `schedule:` block
3. Commit the change

The queue JSON still tracks the state, so we can resume later
by uncommenting.

## How to Manually Add a New Article (Post-Launch)

Once the 80 have been released, future articles can follow the
same pattern. New articles do NOT need to start as draft —
they can be published immediately, unless you want them queued
for a future batch.

## Known Edge Cases

- **Build OOM**: The first build of 80 drafts caused Node OOM because
  the posts dict inlined the full HTML. Fixed by inlining only
  metadata and reading the markdown body on demand.
- **Hymn slugs in getStaticPaths**: The hymn slug list (`jeosu-chamsong`
  etc.) is mixed with the blog list. The release script only touches
  blog slugs, so hymns are unaffected.
- **DRAFT- prefix collision**: Sitemap entries for drafts are written
  as `DRAFT-2026-10-10`. The release script strips the `DRAFT-` prefix
  and updates the date in one go. The filter in `sitemap.xml.ts`
  excludes any URL whose lastmod starts with `DRAFT-`.

## Contact

For questions about the release pipeline, contact Mr. Sim
(+27 77 487 1295) or Ms. Dora (+27 67 442 4461).
