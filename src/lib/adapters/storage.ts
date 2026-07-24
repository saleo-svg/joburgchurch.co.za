/**
 * src/lib/adapters/storage.ts
 *
 * Storage adapter contract.
 *
 * Per Anti-Design-Debt principle #2 (interface before implementation)
 * and principle #5 (zero hardcoding), every module that needs to
 * read or write content goes through this interface. Swapping the
 * provider (GitHub → GitLab → local → headless CMS) requires zero
 * changes to business code.
 */

import type {
  AnyContent,
  ContentKind,
  ContentQuery,
  ContentResultSet,
  ResolvedContent,
} from '../core/content';

/**
 * Read-only listing API.
 * Never returns raw provider objects — always ResolvedContent.
 */
export interface ContentReader {
  list<T>(query: ContentQuery): Promise<ContentResultSet<T>>;
  get<T>(kind: ContentKind, slug: string): Promise<ResolvedContent<T> | null>;
}

/**
 * Read-write API used by admin actions.
 * Every write returns a new state — never mutates.
 */
export interface ContentWriter {
  create<T>(kind: ContentKind, slug: string, data: T): Promise<ResolvedContent<T>>;
  update<T>(kind: ContentKind, slug: string, data: Partial<T>): Promise<ResolvedContent<T>>;
  delete(kind: ContentKind, slug: string): Promise<void>;
}

/**
 * Media adapter is separate so a future swap to S3 / R2
 * does not require changes to content adapters.
 */
export interface MediaAdapter {
  upload(path: string, file: ArrayBuffer, mime: string): Promise<void>;
  list(prefix: string): Promise<readonly string[]>;
  delete(path: string): Promise<void>;
  publicUrl(path: string): string;
}

/**
 * Analytics/audit log — append-only.
 * Per principle #7 (Append-only), appendEvent does not expose
 * an update path.
 */
export interface EventLog {
  append(event: Readonly<unknown>): Promise<void>;
  readAll(): Promise<readonly unknown[]>;
}

export interface StorageAdapter extends ContentReader, ContentWriter {
  readonly provider: 'github-pages' | 'local' | 'git';
  /**
   * Adaptive capability check — modules ask before calling.
   * Per principle #5 (zero hardcoding): modules behave correctly
   * even when a provider is partially capable.
   */
  capabilities: Readonly<{
    writable: boolean;
    reactive: boolean;
    multiLanguage: boolean;
  }>;
}

/**
 * The factory signature — never `new GithubAdapter()` directly.
 * Modules depend on the factory; the binding is in env.ts.
 */
export interface StorageAdapterFactory {
  create(): Promise<StorageAdapter>;
}

/**
 * `pickBySource` — utility to prefer CMS content over fallback.
 * Per principle #5 (zero hardcoding): the algorithm lives here,
 * not duplicated in every page.
 */
export function pickBySource<T>(
  cms: readonly T[],
  fallback: readonly T[],
): ContentResultSet<T> {
  if (cms.length > 0) {
    return { items: cms, source: 'cms', count: cms.length };
  }
  if (fallback.length > 0) {
    return { items: fallback, source: 'fallback', count: fallback.length };
  }
  return { items: [], source: 'cms', count: 0 };
}

/**
 * Soft ordering — newest-first by default.
 */
export function sortByDate<T extends { date: Date }>(
  items: readonly T[],
  order: 'newest' | 'oldest' = 'newest',
): T[] {
  const sorted = [...items].sort((a, b) => {
    return order === 'newest'
      ? b.date.getTime() - a.date.getTime()
      : a.date.getTime() - b.date.getTime();
  });
  return sorted;
}
