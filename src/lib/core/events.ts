/**
 * src/lib/core/events.ts
 *
 * Append-only event log.
 *
 * Per Anti-Design-Debt principle #7 (Append-only): no event is ever
 * mutated; new state is derived by folding over the log.
 *
 * Per principle #6 (Immutability): all handlers return new objects.
 * Existing events are never updated.
 *
 * Per principle #3 (Type exhaustion): every discriminator is checked
 * exhaustively via `assertNever`.
 */

import type { ContentKind, ContentStatus } from './content';

/**
 * The event log persists to disk under .cms/events.log.
 * It is the source of truth for CMS activity audit.
 */
export type CmsEvent =
  | { readonly kind: 'content.created'; readonly id: string; readonly contentKind: ContentKind; readonly slug: string; readonly actor: string; readonly at: Date }
  | { readonly kind: 'content.updated'; readonly id: string; readonly contentKind: ContentKind; readonly slug: string; readonly actor: string; readonly at: Date }
  | { readonly kind: 'content.deleted'; readonly id: string; readonly contentKind: ContentKind; readonly slug: string; readonly actor: string; readonly at: Date }
  | { readonly kind: 'content.published'; readonly id: string; readonly contentKind: ContentKind; readonly slug: string; readonly actor: string; readonly at: Date }
  | { readonly kind: 'content.status_changed'; readonly id: string; readonly contentKind: ContentKind; readonly slug: string; readonly from: ContentStatus; readonly to: ContentStatus; readonly actor: string; readonly at: Date }
  | { readonly kind: 'media.uploaded'; readonly id: string; readonly path: string; readonly actor: string; readonly at: Date }
  | { readonly kind: 'media.deleted'; readonly id: string; readonly path: string; readonly actor: string; readonly at: Date }
  | { readonly kind: 'hymn.suggested'; readonly id: string; readonly slug: string; readonly submitter: string; readonly at: Date }
  | { readonly kind: 'hymn.approved'; readonly id: string; readonly slug: string; readonly title: string; readonly language: string; readonly actor: string; readonly at: Date }
  | { readonly kind: 'hymn.rejected'; readonly id: string; readonly slug: string; readonly actor: string; readonly at: Date }
  | { readonly kind: 'settings.changed'; readonly id: string; readonly fields: readonly string[]; readonly actor: string; readonly at: Date }
  | { readonly kind: 'session.login'; readonly id: string; readonly actor: string; readonly at: Date }
  | { readonly kind: 'session.logout'; readonly id: string; readonly actor: string; readonly at: Date };

export type CmsEventKind = CmsEvent['kind'];

/**
 * Pure reducer that folds events into a derived state.
 * Stateless — call repeatedly with the same input to get the same output.
 */
export interface DerivedState {
  readonly totalEvents: number;
  readonly byKind: Readonly<Record<string, number>>;
  readonly lastEventAt: Date | null;
  readonly pendingHymnSuggestions: number;
}

export function deriveState(events: readonly CmsEvent[]): DerivedState {
  let totalEvents = 0;
  const byKind: Record<string, number> = {};
  let lastEventAt: Date | null = null;
  let pendingHymnSuggestions = 0;

  for (const event of events) {
    totalEvents += 1;
    byKind[event.kind] = (byKind[event.kind] ?? 0) + 1;
    if (lastEventAt === null || event.at > lastEventAt) {
      lastEventAt = event.at;
    }
    if (event.kind === 'hymn.suggested') {
      pendingHymnSuggestions += 1;
    }
  }

  return {
    totalEvents,
    byKind,
    lastEventAt,
    pendingHymnSuggestions,
  };
}

/**
 * Type-safe label for each event kind — used by the admin UI.
 * Adding a new CmsEvent kind without adding a label here will fail
 * TypeScript (exhaustiveness check).
 */
export function describeEvent(event: CmsEvent): string {
  switch (event.kind) {
    case 'content.created':         return `Created ${event.contentKind} "${event.slug}"`;
    case 'content.updated':         return `Updated ${event.contentKind} "${event.slug}"`;
    case 'content.deleted':         return `Deleted ${event.contentKind} "${event.slug}"`;
    case 'content.published':       return `Published ${event.contentKind} "${event.slug}"`;
    case 'content.status_changed':  return `Status ${event.from} → ${event.to} on "${event.slug}"`;
    case 'media.uploaded':          return `Uploaded ${event.path}`;
    case 'media.deleted':           return `Deleted ${event.path}`;
    case 'hymn.suggested':          return `Hymn suggested by ${event.submitter}`;
    case 'hymn.approved':           return `Hymn "${event.title}" approved`;
    case 'hymn.rejected':           return `Hymn "${event.slug}" rejected`;
    case 'settings.changed':        return `Settings changed: ${event.fields.join(', ')}`;
    case 'session.login':           return `Login: ${event.actor}`;
    case 'session.logout':          return `Logout: ${event.actor}`;
  }
}
