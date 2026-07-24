# Architecture Decisions

> This document records **why** the architecture is the way it is.
> Every non-obvious decision is logged so we don't re-litigate it
> in a future PR.

## Anti-Design-Debt Hard Constraints

These are the **10 hard constraints** applied to every new module:

1. **20-step debt assessment** — every new module lists 5 future
   extension paths before writing code; the design must not lock
   into any of them.
2. **Interface first, implementation second** — every storage /
   adapter / module has a `*.ts` contract file. Implementation
   comes after.
3. **Type exhaustion** — `discriminated union + never` checks
   prevent silent omission.
4. **No new concepts** — reuse `ResolvedContent`, `OutboundRequest`,
   `Campaign`, and other core types. Never re-define.
5. **Zero hardcoding** — provider switching requires zero changes
   in business code.
6. **Immutable events** — handlers always return new objects;
   no mutation.
7. **Append-only logs** — no `UPDATE` paths.
8. **Strict dependency direction** — `core ← adapters ← modules ← apps`.
9. **Delete > compat** — old APIs are deprecated for a release, then cut.
10. **"Why not" for every PR** — rejected solutions are recorded
    here so they are not re-argued.

---

## Decisions

### 1. Why we kept CMS as Sveltia + GitHub

**Considered:**
- ✅ Sveltia CMS (current): zero infra, free, GitHub-native
- ❌ Decap CMS (Netlify): worse UX than Sveltia, no longer maintained
- ❌ TinaCMS: requires its own backend, paid for hosted
- ❌ Custom auth + DB: too much surface area for the project size
- ❌ WordPress / Sanity / Contentful: paid or heavy

**Picked:** Sveltia. **Why:** zero infra cost, volunteers use a
GitHub account they already have, automatic git history for every
change, and Cloudflare Pages auto-deploys on push.

**Why not** custom CMS: it would need a backend (auth, DB, image
storage, audit log). Sveltia replaces all of that with a static
JS file and a Cloudflare Worker.

### 2. Why we introduced a `lib/` layer (vs. inlining into `.astro`)

**Considered:**
- ❌ All logic in `.astro` frontmatter
- ❌ Logic in standalone `src/utils/`
- ✅ Layered `lib/{core,adapters,modules}/` (chosen)

**Why:** the original page files mixed three responsibilities:
rendering, data shaping, and content collection reads. That made
adding a feature (e.g. multi-language blog) a five-file change.

The new layering:
- **core/** — pure types and discriminated unions. No IO.
- **adapters/** — read from a content source. Swap provider here.
- **modules/** — domain logic. Imports from core + adapters only.
- **pages/** — render only. Imports modules, never the adapter.

**Why not** inlining: same code is now reusable for an admin
dashboard script, a CLI, or a future ISR / API endpoint.

### 3. Why `ResolvedContent` is the universal shape

**Considered:**
- ❌ Each page calls `getCollection('posts')` and uses Astro's
  inferred shape directly
- ❌ Each module returns its own shape
- ✅ `ResolvedContent<T>` everywhere

**Why:** the same data (a blog post) is consumed by:
- the blog index page
- the blog detail page
- the homepage "latest" widget
- the sitemap generator
- the RSS feed (future)
- the search index (future)

If each consumer has its own shape, every change to a schema field
breaks N consumers. With `ResolvedContent<T>`, the contract is
typed once in `core/content.ts` and propagated.

**Why not** keep the existing pattern: it grew to seven ad-hoc
shapes across five files. TypeScript could not help us when a
field was renamed.

### 4. Why we use Zod at the content collection boundary

**Considered:**
- ❌ No schema, rely on Astro defaults (current state pre-refactor)
- ❌ Hand-rolled TypeScript types only
- ✅ Zod schema in `src/content/config.ts` (chosen)

**Why:** before this refactor, a missing field in a markdown file
silently produced `undefined` at the page level. Zod catches
the omission at build time. Every `.md` file becomes a typed
contract.

**Why not** a linter-only approach: linting happens in CI; build
failures happen before that and are localised to the schema.

### 5. Why we treat hymn suggestions as a separate collection

**Considered:**
- ❌ One collection "hymns" with a `status: pending|approved`
  field
- ❌ Two collections: `hymns` (curated) and `hymn-suggestions`
  (raw submissions)
- ❌ Submit via form → admin manually copies (current ad-hoc state)

**Picked:** two collections. **Why:** the curated and submission
data have different shapes. A suggestion can have empty lyrics
and a free-form `notes` field; a curated hymn is final and
canonical. Merging them would force a nullable shape on every
read.

**Why not** one collection: every read would have to filter
`status === 'approved'`, and admins would lose the ability to
audit pending submissions separately.

### 6. Why settings is a single `general.md` file for now

**Considered:**
- ❌ Multiple files (one per location)
- ❌ JSON file (`settings.json`) — easier to machine-read
- ✅ Single markdown file with frontmatter (chosen for now)

**Why:** the church has one set of contact details and one set of
service times. Multi-location is a future concern.

**Future path (not yet implemented):** when the church opens a
second physical location, `settings` becomes a collection of
`location.md` files, each carrying its own phones and times.
The `getSettings()` module signature does not change.

**Why not** JSON now: the admin UI is markdown-based, and JSON
gives no advantage until we have multiple locations.

### 7. Why we use a local file adapter for build-time reads

**Considered:**
- ❌ GitHub REST API at build time (slow, rate-limited)
- ❌ Git Data API via Cloudflare Worker (adds a dependency)
- ✅ Direct filesystem reads at build time (chosen)

**Why:** Astro builds the site from `src/content/*` at build
time. The local adapter is the same path Astro uses internally;
reading it directly removes a layer of indirection.

**Why not** the API: the build is already gated by the GitHub
push that produced the working tree. Reading the same tree is
the most direct source.

**Why we kept the adapter abstraction anyway:** the same
`StorageAdapter` interface is what a future **incremental /
preview deployment** system would implement to read from a
draft branch without re-cloning the repo.

### 8. Why we did not switch to a CMS that does not require GitHub

**Considered:** Airtable / Notion / Sanity / Strapi as the
content source.

**Picked:** stay with Sveltia + GitHub.

**Why not** Airtable: every change would have to be polled or
pushed. Two sources of truth (Airtable + git) is a recipe for drift.

**Why not** Notion / Sanity: paid plans, vendor lock-in, and
slower page loads for a static site.

### 9. Why the `core/never.ts` assertNever helper exists

**Considered:**
- ❌ Trust the type system alone
- ❌ Throw raw `Error('unhandled')` at every call site
- ✅ One helper in core, exhaustive switch defaults

**Why:** the helper is the single point that *fails loudly* when
a discriminated union grows. Without it, adding a new event
kind silently falls through the default branch and returns
`undefined`, which then breaks at the rendering layer with
a far less helpful stack trace.

### 10. Why we kept the per-page `getCollection` calls for now

**Considered:**
- ❌ Replace every `getCollection` call with a module function
  in one PR
- ✅ Replace incrementally per page, validate each step

**Why:** the goal is zero regression on a live site. A 268-page
rewrite risks breaking URLs, layouts, and SEO. The new lib layer
sits beside the old code; pages opt in one at a time.

**Migration plan (tracked, not yet executed):**
- [x] Step 1: lib layer created
- [x] Step 2: content config schema in place
- [ ] Step 3: blog index → `listBlogPosts()`
- [ ] Step 4: blog detail → `getBlogPost()`
- [ ] Step 5: events page → `listEvents()` (module TBD)
- [ ] Step 6: sermons page → `listSermons()`
- [ ] Step 7: gallery page → `listGallery()` (module TBD)
- [ ] Step 8: settings-driven Header/Footer/Schema
- [ ] Step 9: hymn-suggestions review UI

---

## Future 5-Step Expansion Paths (Tracked, Not Done)

| Module | Path A | Path B | Path C | Path D | Path E |
|--------|--------|--------|--------|--------|--------|
| Blog   | Multi-language | Comments | Draft workflow | RSS feed | Related posts |
| Sermons | Series taxonomy | YouTube sync | Podcast RSS | Notes/body split | Sunday vs study |
| Events  | RSVP | Recurrence | iCal export | Multi-lang | Calendar widget |
| Gallery | Video gallery | Albums | Tags | Lightbox | EXIF retention |
| Videos | Vimeo + local | Subtitles | Chapters | Live | Auto-transcript |
| Hymns  | Approval flow | Auto .docx | YouTube search | Spotify | Sync with `hymns.ts` |
| Settings | Multi-location | Themes | Push notif | Privacy versioning | Per-page overrides |

Adding any of these must touch only the module that owns the
concept. If the change has to ripple through pages, the layering
is wrong and the decision is rejected.
