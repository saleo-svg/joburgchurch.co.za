/**
 * src/lib/modules/blog.ts
 *
 * Blog module service.
 *
 * Per Anti-Design-Debt principle #2 (interface before implementation),
 * this module depends only on the StorageAdapter contract — no
 * direct `getCollection('posts')` calls in page code.
 *
 * Per principle #4 (no new concepts), blog data is shaped by the
 * BlogData interface from core/content.ts — never re-defined here.
 *
 * Build-time vs runtime:
 *  - Pages call `listBlogPosts()` from `.astro` files. Inside an
 *    Astro build, `astro:content` is available. We use it via
 *    the `astro-collection-reader` adapter so the module reads
 *    the same content the rest of the site reads.
 *  - For non-Astro contexts (admin scripts, ISR, future SSR), the
 *    `localStorageAdapter` is the fallback. Both adapters return
 *    the same ResolvedContent<T> shape.
 */

import type {
  BlogData,
  ContentResultSet,
  ResolvedContent,
} from '../core/content';
import { localStorageFactory } from '../adapters/local';
import type { StorageAdapter } from '../adapters/storage';
import { assertNever } from '../core/never';

/**
 * Inferred band — a blog post's category derived from tags.
 * Helps the UI render without each page re-implementing the logic.
 */
export type BlogBand = 'devotional' | 'sa-local' | 'beginner' | 'pastoral' | 'hymn';

export function bandOf(post: ResolvedContent<BlogData>): BlogBand {
  const tags = post.data.tags;
  if (post.data.isHymn) return 'hymn';
  if (tags.includes('hymn')) return 'hymn';
  if (tags.some((t) => t.includes('grief') || t.includes('funeral'))) return 'pastoral';
  if (tags.some((t) => t.includes('beginner') || t.includes('first'))) return 'beginner';
  if (tags.some((t) => t.includes('Sandton') || t.includes('Johannesburg') || t.includes('South Africa'))) return 'sa-local';
  return 'devotional';
}

/**
 * Try to use Astro's `astro:content` first (the supported, build-time
 * reading path). Falls back to the local adapter for non-Astro
 * contexts (admin scripts, etc).
 *
 * This is the single place that decides which provider to use.
 * Per principle #5 (zero hardcoding): swapping providers is one
 * line here.
 */
async function readAstroCollection(): Promise<ContentResultSet<ResolvedContent<BlogData>> | null> {
  try {
    // Dynamic import — `astro:content` only resolves inside an Astro
    // build. Outside (e.g. plain Node scripts) it throws.
    const astro = await import('astro:content');
    const raw = await astro.getCollection('posts');
    // 2026-10-10: filter out drafts from public listings.
    // Drafts live in src/content/posts/ but stay invisible to:
    //   - blog index page
    //   - sitemap.xml.ts (handled separately)
    //   - any blog tag/band query
    // Drafts are only released when the GitHub Action flips
    // frontmatter status: draft -> published.
    const items: ResolvedContent<BlogData>[] = raw
      .filter((entry) => (entry.data.status ?? 'published') !== 'draft')
      .map((entry) => ({
      kind: 'blog',
      slug: entry.slug,
      title: entry.data.title,
      date: new Date(entry.data.date),
      status: 'published',
      data: {
        title: entry.data.title,
        description: entry.data.description,
        date: new Date(entry.data.date),
        author: entry.data.author ?? 'Mr. Sim',
        tags: entry.data.tags ?? [],
        image: entry.data.image,
        heroImage: entry.data.heroImage,
        isHymn: entry.data.isHymn,
        language: entry.data.language,
        key: entry.data.key,
        chords: entry.data.chords,
        excerpt: entry.data.excerpt,
      },
      url: `/blog/${entry.slug}/`,
      source: 'cms',
    }));
    return { items, source: 'cms', count: items.length };
  } catch {
    return null;
  }
}

async function readFallbackCollection(): Promise<ContentResultSet<ResolvedContent<BlogData>>> {
  const adapter = await localStorageFactory.create();
  return adapter.list<ResolvedContent<BlogData>>({ kind: 'blog', order: 'newest' });
}

/**
 * Public API — every page calls this; never the adapter directly.
 * Per principle #5 (zero hardcoding): changing the provider does
 * not require changing any page.
 */
export async function listBlogPosts(
  opts: { limit?: number; tag?: string; band?: BlogBand } = {},
): Promise<ContentResultSet<ResolvedContent<BlogData>>> {
  let result =
    (await readAstroCollection()) ??
    (await readFallbackCollection());
  if (result.items.length > 0) {
    result = {
      items: result.items.slice().sort(
        (a, b) => b.date.getTime() - a.date.getTime(),
      ),
      source: result.source,
      count: result.items.length,
    };
  }
  if (opts.tag) {
    const filtered = result.items.filter((p) => p.data.tags.includes(opts.tag!));
    result = { items: filtered, source: result.source, count: filtered.length };
  }
  if (opts.band) {
    const filtered = result.items.filter((p) => bandOf(p) === opts.band);
    result = { items: filtered, source: result.source, count: filtered.length };
  }
  if (opts.limit && result.items.length > opts.limit) {
    result = {
      items: result.items.slice(0, opts.limit),
      source: result.source,
      count: result.items.length,
    };
  }
  return result;
}

export async function getBlogPost(
  slug: string,
): Promise<ResolvedContent<BlogData> | null> {
  const all = await listBlogPosts();
  return all.items.find((p) => p.slug === slug) ?? null;
}

/**
 * Slug → URL helper for the blog module.
 * Centralised so url changes do not ripple through pages.
 */
export function blogUrl(slug: string): string {
  return `/blog/${slug}/`;
}

/**
 * Tag belongs to blog if any of the SA-locality tags are present.
 * Used by the index page to compute a "South African" badge.
 */
export function isSALocal(post: ResolvedContent<BlogData>): boolean {
  return bandOf(post) === 'sa-local';
}

/**
 * ShapeRow — a discriminated union for tag-filtered views.
 * Per principle #3 (exhaustiveness): exhaustively handled.
 */
export type ShapeRow =
  | { kind: 'tag'; tag: string; count: number }
  | { kind: 'language'; language: string; count: number }
  | { kind: 'band'; band: BlogBand; count: number };

export function summariseBlog(
  posts: readonly ResolvedContent<BlogData>[],
): readonly ShapeRow[] {
  const tagCounts = new Map<string, number>();
  const langCounts = new Map<string, number>();
  const bandCounts = new Map<BlogBand, number>();

  for (const post of posts) {
    for (const t of post.data.tags) {
      tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1);
    }
    if (post.data.language) {
      langCounts.set(post.data.language, (langCounts.get(post.data.language) ?? 0) + 1);
    }
    const b = bandOf(post);
    bandCounts.set(b, (bandCounts.get(b) ?? 0) + 1);
  }

  const rows: ShapeRow[] = [];
  for (const [tag, count] of tagCounts) rows.push({ kind: 'tag', tag, count });
  for (const [language, count] of langCounts) rows.push({ kind: 'language', language, count });
  for (const [band, count] of bandCounts) rows.push({ kind: 'band', band, count });

  return rows;
}

/**
 * Exhaustive type guard — kept around to give downstream a single
 * place to assert shape.
 */
export function labelShapeRow(row: ShapeRow): string {
  switch (row.kind) {
    case 'tag': return `Tag: ${row.tag} (${row.count})`;
    case 'language': return `Language: ${row.language} (${row.count})`;
    case 'band': return `Band: ${row.band} (${row.count})`;
    default: return assertNever(row);
  }
}

// Kept for future use; not currently referenced.
export type { StorageAdapter };
