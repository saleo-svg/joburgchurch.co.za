# Volunteer CMS Architecture

This is the public-facing reference for the volunteer / admin panel
on `https://joburgchurch.co.za/admin/`.

## What It Is

A no-code admin panel that lets church volunteers log in with a
GitHub account and:
- write and publish blog posts
- upload photos to the gallery
- add events to the calendar
- embed YouTube videos
- create sermon and Bible study entries
- submit hymn / song suggestions for review
- update service times and contact info

When a volunteer publishes, the change is committed to the
`master` branch and Cloudflare Pages rebuilds the site within
1–2 minutes.

## What It Is Not

- It is not a separate database. Every change is a git commit.
- It is not a custom CMS. It is Sveltia, an open-source static
  CMS, configured to talk to this repo's GitHub.
- It is not a runtime. The site remains a static Astro build;
  the admin panel is a separate `/admin/` SPA.

## File Map

| Path | Role |
|------|------|
| `public/admin/index.html` | Sveltia loader (one HTML file) |
| `public/admin/config.yml` | Collection registry; the single source of truth for what the admin can edit |
| `src/content/config.ts` | Astro-side Zod schema; mirrors `config.yml` |
| `src/content/**` | The actual content files (markdown) |
| `src/lib/adapters/storage.ts` | Provider-agnostic content API |
| `src/lib/modules/*.ts` | Domain services (blog, hymns, sermons, settings, media) |

## Setting It Up for the First Time

See `CMS_SETUP_GUIDE.md` for the step-by-step. High-level:

1. Create a GitHub OAuth App at https://github.com/settings/developers
2. Deploy the sveltia-cms-auth worker to Cloudflare Workers
3. Set the worker URL in `public/admin/config.yml`
4. Invite volunteers as GitHub collaborators with **Write** role

## What Lives Where

```
public/admin/
├── config.yml      ← Sveltia reads this; lists every collection
└── index.html      ← Loads Sveltia from a CDN

src/content/
├── config.ts       ← Astro reads this; same shape as config.yml
├── posts/          ← Blog + hymns (filtered by isHymn:true)
├── sermons/        ← Bible study notes & sermon series
├── events/         ← Calendar events
├── gallery/        ← Photos
├── videos/         ← YouTube video entries
├── settings/       ← Single general.md with church info
└── hymn-suggestions/ ← Volunteer-submitted song suggestions

src/lib/
├── core/           ← Pure types (no IO)
├── adapters/       ← Provider interface + local filesystem impl
├── modules/        ← Blog, hymns, settings, media, sermons
└── env.ts          ← One place that reads import.meta.env
```

## Why This Layout

Per the project's anti-design-debt constraints:

- **`core/` has no IO** — pure types, never imports adapters.
- **`adapters/` is the only layer that touches the filesystem
  or a network** — pages never call `readFile`.
- **`modules/` is the only layer pages import** — they call
  `listBlogPosts()`, never `getCollection('posts')`.
- **`env.ts` is the only file that reads `import.meta.env`** —
  a single point to change provider or feature flag.

This makes the following future changes safe:

- **Add multi-language** — touches `modules/blog.ts` and
  `core/content.ts`. Pages don't change.
- **Add a new collection** (e.g. "Newsletters") — register it
  in `config.ts` and `config.yml`, add a `modules/newsletters.ts`.
- **Swap to a different CMS** — replace `adapters/local.ts`
  with `adapters/<provider>.ts`. Modules don't change.
- **Add a preview / draft branch** — new `adapters/github.ts`,
  swap one line in `env.ts`.
