/**
 * src/lib/modules/sermons.ts
 *
 * Sermon module service.
 *
 * Per Anti-Design-Debt principle #4 (no new concepts), SermonData
 * is defined in core/content.ts — this module merely provides
 * filtering and shaping helpers on top of it.
 */

import type {
  SermonData,
  ResolvedContent,
  ContentResultSet,
} from '../core/content';
import { localStorageFactory } from '../adapters/local';
import { sortByDate } from '../adapters/storage';
import { assertNever } from '../core/never';

export async function listSermons(
  opts: { series?: string; limit?: number } = {},
): Promise<ContentResultSet<ResolvedContent<SermonData>>> {
  const adapter = await localStorageFactory.create();
  const all = await adapter.list<ResolvedContent<SermonData>>({
    kind: 'sermon',
    order: 'newest',
    limit: opts.limit,
  });
  if (opts.series) {
    const filtered = all.items.filter((s) => s.data.series === opts.series);
    return { items: filtered, source: all.source, count: filtered.length };
  }
  return all;
}

/**
 * Discriminated union — what kind of sermon this is.
 * Per principle #3 (exhaustiveness): every kind is handled.
 */
export type SermonKind =
  | { kind: 'sunday'; series: string }
  | { kind: 'bible-study'; series: string }
  | { kind: 'special'; series: string };

export function classifySermon(sermon: ResolvedContent<SermonData>): SermonKind {
  // Default classification — admin can override via tags later.
  if (sermon.data.series.toLowerCase().includes('sunday')) {
    return { kind: 'sunday', series: sermon.data.series };
  }
  if (sermon.data.series.toLowerCase().includes('psalm') || sermon.data.series.toLowerCase().includes('study')) {
    return { kind: 'bible-study', series: sermon.data.series };
  }
  return { kind: 'special', series: sermon.data.series };
}

export function describeSermonKind(k: SermonKind): string {
  switch (k.kind) {
    case 'sunday': return `Sunday sermon — ${k.series}`;
    case 'bible-study': return `Bible study — ${k.series}`;
    case 'special': return `Special — ${k.series}`;
    default: return assertNever(k);
  }
}

/**
 * Group sermons by series — pure, returns a new map.
 */
export function groupBySeries(
  sermons: readonly ResolvedContent<SermonData>[],
): ReadonlyMap<string, readonly ResolvedContent<SermonData>[]> {
  const map = new Map<string, ResolvedContent<SermonData>[]>();
  for (const s of sermons) {
    const list = map.get(s.data.series) ?? [];
    list.push(s);
    map.set(s.data.series, list);
  }
  // Sort each group by date without mutating the originals.
  for (const [k, v] of map) {
    map.set(k, sortByDate(v, 'oldest'));
  }
  return map;
}
