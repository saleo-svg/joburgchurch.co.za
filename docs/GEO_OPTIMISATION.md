# GEO (Generative Engine Optimisation) — 2026-10-10

## What is GEO?

GEO is the practice of optimising a site so that AI search engines
(ChatGPT, Perplexity, Gemini, Claude, SearchGPT, Grok, You.com, etc.)
**cite** and **link** to your content when answering user questions.

Traditional SEO optimised for Google's 10 blue links. GEO optimises
for AI-generated answers. The signals are different:

| Signal | SEO | GEO |
|---|---|---|
| Page speed | Core Web Vitals | Same + image optimisation |
| Structured data | Article / Product | + Person / Organisation / Citation / isBasedOn / contentLocation |
| Authority | Backlinks | + E-E-A-T (Author with phone, Person schema, About page) |
| Discoverability | Sitemap + Search Console | + llms.txt + ai.txt + RSS + Atom |
| Crawlers | Googlebot + Bingbot | + GPTBot, ClaudeBot, PerplexityBot, Google-Extended, OAI-SearchBot, etc. |
| Citation | Page rank | + Quoted, attributed, link-back to source |

The goal: when someone asks ChatGPT "What does the Bible say about
anxiety?", the AI's answer includes a sentence like:
> "The Johannesburg Bible Study Church has a thorough article on this
> topic at https://joburgchurch.co.za/blog/anxiety-and-the-south-african-christian/"

That one citation is worth hundreds of impressions because it lands
at the exact moment the user needs help.

## What we did on 2026-10-10

### 1. `public/llms.txt` (the new standard)
The llmstxt.org standard. It tells AI engines who we are, what
topics we cover, and which URLs to cite for each topic. AI engines
are increasingly prioritising this file over crawling the whole site.

We also structured it by **topic cluster** (mental health, marriage,
parenting, money, Joburg-specific, etc.). This makes it trivial for
an AI to find the right article when matching a question.

### 2. `public/ai.txt` (supplementary metadata)
Format convention emerging from Cloudflare/Vercel/the llmstxt
community. Provides:
- Site identity, locale, region
- E-E-A-T signals (author with phone, founding year, etc.)
- Content licensing
- Topic expertise
- Citation preferences
- Freshness signal (update cadence)

### 3. `public/robots.txt` overhaul
- **Allowed** every major AI crawler (GPTBot, ChatGPT-User,
  OAI-SearchBot, anthropic-ai, Claude-Web, ClaudeBot, CCBot,
  Google-Extended, GoogleOther, PerplexityBot, Perplexity-User,
  Applebot-Extended, Meta-ExternalAgent, cohere-ai, MistralAI-User,
  YouBot, DeepSeekBot, QwenBot, xAI)
- **Blocked** SEO scrapers (Ahrefs, Semrush, MJ12, DotBot, BLEX)
- **Reference** all three sitemaps (main, image, news)

This is a deliberate **inversion** of the previous posture (which
blocked all AI crawlers). AI crawlers are how ChatGPT / Perplexity /
Gemini find content, so blocking them = invisible in AI search.

### 4. Schema.org JSON-LD enrichment
- **WebSite** with `potentialAction` SearchAction (drives the
  Google site-link search box)
- **Organization** with `@id`, `member`, `founder`, `knowsAbout`,
  `areaServed`, `sameAs`
- **Person** for Mr. Sim (lead teacher, with phone, languages,
  expertise)
- **Person** for Ms. Dora (co-host)
- **LocalBusiness** (PlaceOfWorship) with `geo`, `openingHoursSpecification`,
  `areaServed`
- **BlogPosting** enhanced with `inLanguage`, `keywords`, `articleSection`,
  `wordCount`, `ImageObject` (with width/height), `isPartOf` (Blog),
  `about` (Things), `citation` (The Bible), `isBasedOn` (Book),
  `contentLocation` (Johannesburg), `speakable` (h1, h2, blockquote)

The `speakable` property is specifically for AI — it tells the
engine "this is the part that's safe to read aloud in a voice
answer."

The `citation` and `isBasedOn` properties tell the AI "this
article is grounded in a primary text (the Bible)," which boosts
authority for theological content.

### 5. Multiple sitemaps
- `/sitemap.xml` — main sitemap, 130 URLs (DRAFT- filtered out)
- `/sitemap-images.xml` — image-only sitemap for Google Image Search
- `/sitemap-news.xml` — Google News sitemap (top 1000, with
  `publication_date`, drives Discover & Google News)

All three are referenced in `robots.txt`.

### 6. RSS + Atom feeds
- `/rss.xml` — RSS 2.0, top 50 published articles
- `/atom.xml` — Atom 1.0, top 50 published articles

Discovered in `<head>` via `<link rel="alternate">`. AI engines use
these to subscribe to the site and surface new content faster than
they would by re-crawling.

### 7. Per-article UX improvements
- Hero image with explicit `width` and `height` (prevents CLS)
- "By Mr. Sim" attribution (E-E-A-T signal visible to humans and bots)
- Estimated read time ("~N min read")
- `<time datetime="...">` on the date (machine-readable)
- Larger, more SEO-friendly article H1

## Verification (live, 2026-10-10)

```
robots.txt : 200, GPTBot allowed
llms.txt   : 200
ai.txt     : 200
rss.xml    : 200
atom.xml   : 200
sitemap.xml         : 200, 130 URLs, 0 DRAFT
sitemap-images.xml  : 200
sitemap-news.xml    : 200

JSON-LD on /blog/ :
  - WebSite        : 1
  - Organization   : 1
  - Person         : 2 (Mr. Sim + Ms. Dora)
  - LocalBusiness  : 1
  - SearchAction   : 1
```

## Indexing checklist (manual, after deploy)

The following are submitted once per Google account / Search Console:

1. **Google Search Console** — submit `/sitemap.xml`, `/sitemap-images.xml`, `/sitemap-news.xml`
2. **Bing Webmaster** — submit `/sitemap.xml`
3. **Yandex Webmaster** — submit `/sitemap.xml` (optional, mostly for Russia/Eastern Europe)
4. **Baidu Tongji** — already wired up in BaseLayout (env-gated)
5. **IndexNow** — submit when new posts go live (optional; faster than waiting for crawlers)

These are one-time set-up tasks, not ongoing.

## Ongoing GEO maintenance

The site is now self-maintaining for GEO. As new posts are
published (via the 80-draft pipeline), they will:

- Be picked up by the AI crawlers we explicitly allow
- Be included in rss.xml and atom.xml
- Be included in the Google News sitemap (if <2 days old)
- Carry the full BlogPosting JSON-LD schema (keywords, author,
  citation to the Bible, etc.)
- Be reachable via the topic cluster in llms.txt

We don't need to do anything else for GEO maintenance — it's baked in.

## What we are NOT doing (and why)

- **Not** auto-submitting individual URLs to AI engines — they
  discover from llms.txt / sitemap / RSS. Manual submission isn't
  a feature they expose.
- **Not** running a separate subdomain for AI (e.g. `ai.joburgchurch.co.za`)
  — single-site approach is simpler and Google recommends it.
- **Not** paying for AI engine indexing — they all index freely when
  the robots.txt allows it.
- **Not** obfuscating content to "prevent AI scraping while keeping
  SEO" — that's a losing game. AI and SEO are the same traffic now.

## Contact

For questions about this GEO setup, contact Mr. Sim (+27 77 487 1295).
