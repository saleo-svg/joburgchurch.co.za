/**
 * src/lib/modules/hymns.ts
 *
 * Hymn module service.
 *
 * Hymn data lives in two places:
 *   1. Approved hymns: appear in blog posts marked isHymn: true
 *      (because Astro already builds hymn pages from the posts
 *      collection).
 *   2. Pending suggestions: live in src/content/hymn-suggestions/
 *      and are submitted via the CMS.
 *
 * Per Anti-Design-Debt principle #4 (no new concepts), the
 * HymnData and HymnSuggestionData types already live in
 * core/content.ts — we do not re-define them here.
 *
 * Per principle #9 (delete > compat), the prior src/data/hymns.ts
 * static list is being replaced by query-based modules. The old
 * data file is kept around for one more release as a fallback so
 * pages do not break.
 */

import type {
  HymnData,
  HymnSuggestionData,
  ResolvedContent,
  ContentResultSet,
} from '../core/content';
import { localStorageFactory } from '../adapters/local';
import { blogUrl } from './blog';
import { assertNever } from '../core/never';

/**
 * Approved hymn — same shape as BlogData but tagged isHymn.
 * Pulled from the blog collection, filtered by isHymn:true.
 */
export async function listHymns(
  opts: { language?: string; limit?: number } = {},
): Promise<ContentResultSet<ResolvedContent<HymnData>>> {
  const adapter = await localStorageFactory.create();
  const blog = await adapter.list<ResolvedContent<HymnData>>({
    kind: 'blog',
    order: 'newest',
    limit: opts.limit,
  });
  const hymns = blog.items.filter((p) => p.data.isHymn === true);
  const filtered = opts.language
    ? hymns.filter((p) => p.data.language === opts.language)
    : hymns;
  return { items: filtered, source: blog.source, count: filtered.length };
}

/**
 * Pending suggestions — admin views these before promotion.
 */
export async function listHymnSuggestions(
  opts: { status?: HymnSuggestionData['status'] } = {},
): Promise<ContentResultSet<ResolvedContent<HymnSuggestionData>>> {
  const adapter = await localStorageFactory.create();
  const all = await adapter.list<ResolvedContent<HymnSuggestionData>>({
    kind: 'hymnSuggestion',
    order: 'newest',
  });
  const filtered = opts.status
    ? all.items.filter((p) => p.data.status === opts.status)
    : all.items;
  return { items: filtered, source: all.source, count: filtered.length };
}

/**
 * Hymn language registry — the canonical list of supported
 * languages. Per principle #3 (exhaustiveness), adding a new
 * language touches exactly one place.
 */
export const SUPPORTED_LANGUAGES = [
  'English',
  'Zulu',
  'Xhosa',
  'Sotho',
  'Tswana',
  'Pedi',
  'Ndebele',
  'Afrikaans',
  'Swahili',
  'Dinka',
  'Shona',
  'Lingala',
  'Igbo',
  'Yoruba',
  'Amharic',
  'Korean',
  'Portuguese',
  'French',
  'Other',
] as const;

export type HymnLanguage = (typeof SUPPORTED_LANGUAGES)[number];

/**
 * Discriminated union — what action the admin takes on a suggestion.
 * Per principle #3 (exhaustiveness): every kind handled below.
 */
export type HymnReviewAction =
  | { kind: 'approve'; actor: string }
  | { kind: 'reject'; actor: string; reason: string }
  | { kind: 'request_changes'; actor: string; notes: string };

/**
 * Pure function — apply a review action to a suggestion.
 * Returns a new object; does not mutate the input.
 * Per principle #6 (immutability): every transformation returns fresh state.
 */
export function applyReview(
  suggestion: ResolvedContent<HymnSuggestionData>,
  action: HymnReviewAction,
): ResolvedContent<HymnSuggestionData> {
  switch (action.kind) {
    case 'approve':
      return {
        ...suggestion,
        data: {
          ...suggestion.data,
          status: 'approved',
        },
      };
    case 'reject':
      return {
        ...suggestion,
        data: {
          ...suggestion.data,
          status: 'rejected',
        },
      };
    case 'request_changes':
      // We don't change status; admin will see the notes in the UI.
      return suggestion;
    default:
      return assertNever(action);
  }
}

/**
 * URL helper — centralised.
 */
export function hymnUrl(slug: string): string {
  return blogUrl(slug); // hymns use the same /blog/ prefix
}

/**
 * Convert a suggestion to a hymn draft (admin only).
 * Returns a new HymnData — pure function.
 */
export function suggestionToHymnDraft(
  suggestion: ResolvedContent<HymnSuggestionData>,
): HymnData {
  return {
    title: suggestion.data.title,
    language: suggestion.data.language,
    key: suggestion.data.key,
    chords: suggestion.data.chords,
    youtubeId: suggestion.data.youtubeId,
    date: new Date(),
    tags: ['hymn', suggestion.data.language.toLowerCase(), 'suggestion'],
  };
}
