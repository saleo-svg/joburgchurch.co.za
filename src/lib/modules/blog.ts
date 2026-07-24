/**
 * src/lib/modules/blog.ts
 *
 * Blog module service.
 *
 * Per Anti-Design-Debt principle #2 (interface before implementation),
 * this module depends only on the StorageAdapter contract — no
 * direct `getCollection('posts')` calls.
 *
 * Per principle #4 (no new concepts), blog data is shaped by the
 * BlogData interface from core/content.ts — never re-defined here.
 */

import type {
  BlogData,
  ContentQuery,
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
 * Public API — every page calls this; never the adapter directly.
 * Per principle #5 (zero hardcoding): changing the provider does
 * not require changing any page.
 */
export async function listBlogPosts(
  opts: { limit?: number; tag?: string; band?: BlogBand } = {},
): Promise<ContentResultSet<ResolvedContent<BlogData>>> {
  const adapter = await getAdapter();
  const query: ContentQuery = {
    kind: 'blog',
    order: 'newest',
    limit: opts.limit,
    tag: opts.tag,
  };
  const result = await adapter.list<ResolvedContent<BlogData>>(query);
  if (opts.band) {
    const filtered = result.items.filter((p) => bandOf(p) === opts.band);
    return { items: filtered, source: result.source, count: filtered.length };
  }
  return result;
}

export async function getBlogPost(
  slug: string,
): Promise<ResolvedContent<BlogData> | null> {
  const adapter = await getAdapter();
  return adapter.get<BlogData>('blog', slug);
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

// ─────────────────────────────────────────────────────────
// Adapter binding — point of provider selection.
// Per principle #5 (zero hardcoding), the only place a concrete
// adapter is referenced. Swapping to GitHub-backed adapter is a
// one-line change here.
// ─────────────────────────────────────────────────────────
async function getAdapter(): Promise<StorageAdapter> {
  // Future: read STORAGE_PROVIDER from env.ts and dispatch.
  return localStorageFactory.create();
}
