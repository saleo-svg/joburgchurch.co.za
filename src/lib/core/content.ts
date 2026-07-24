/**
 * src/lib/core/content.ts
 *
 * Core content types. Every module reads from these, never from raw
 * collection entries.
 *
 * Per Anti-Design-Debt principle #4 (reuse existing types) and #6
 * (immutable events), every ResolvedContent is a value object that
 * cannot be mutated after construction.
 *
 * Per principle #5 (zero hardcoding), no module imports provider
 * specifics (GitHub, Sveltia, Astro) — only these neutral types.
 */

export type ContentKind =
  | 'blog'
  | 'sermon'
  | 'event'
  | 'gallery'
  | 'video'
  | 'hymn'
  | 'hymnSuggestion'
  | 'setting';

export type ContentStatus = 'draft' | 'published' | 'archived';

/**
 * Base shape every content item exposes.
 * Modules depend on this — never on the Astro collection entry shape.
 */
export interface ResolvedContent<T = unknown> {
  readonly kind: ContentKind;
  readonly slug: string;
  readonly title: string;
  readonly date: Date;
  readonly status: ContentStatus;
  readonly data: Readonly<T>;
  readonly url: string;
  readonly source: 'cms' | 'fallback';
}

/**
 * Discriminated union of all content kinds.
 * Each kind carries its own `data` shape.
 * New kinds must be added here AND to the `assertNever` exhaustive
 * checks in every place they're consumed.
 */
export type AnyContent =
  | (ResolvedContent<BlogData> & { kind: 'blog' })
  | (ResolvedContent<SermonData> & { kind: 'sermon' })
  | (ResolvedContent<EventData> & { kind: 'event' })
  | (ResolvedContent<GalleryData> & { kind: 'gallery' })
  | (ResolvedContent<VideoData> & { kind: 'video' })
  | (ResolvedContent<HymnData> & { kind: 'hymn' })
  | (ResolvedContent<HymnSuggestionData> & { kind: 'hymnSuggestion' })
  | (ResolvedContent<SettingData> & { kind: 'setting' });

// ─────────────────────────────────────────────────────────
// Data shapes — one type per collection. Add new fields here
// only; never extend the inline Astro `getCollection` return.
// ─────────────────────────────────────────────────────────

export interface BlogData {
  readonly title: string;
  readonly description: string;
  readonly date: Date;
  readonly author: string;
  readonly tags: readonly string[];
  readonly image?: string;
  readonly heroImage?: string;
  readonly isHymn?: boolean;
  readonly language?: string;
  readonly key?: string;
  readonly chords?: string;
  readonly excerpt?: string;
}

export interface SermonData {
  readonly title: string;
  readonly date: Date;
  readonly series: string;
  readonly speaker: 'Mr. Sim' | 'Ms. Dora' | 'Guest';
  readonly passage?: string;
  readonly youtubeId?: string;
  readonly duration?: string;
  readonly description: string;
  readonly body?: string;
}

export interface EventData {
  readonly title: string;
  readonly date: Date;
  readonly endDate?: Date;
  readonly time?: string;
  readonly location: string;
  readonly address?: string;
  readonly category: 'Bible Study' | 'Korean Class' | 'Youth' | 'Community' | 'Special Event';
  readonly description: string;
  readonly registrationRequired: boolean;
  readonly image?: string;
  readonly body?: string;
}

export interface GalleryData {
  readonly title: string;
  readonly date: Date;
  readonly photo: string;
  readonly category: 'Bible Study' | 'Korean Class' | 'Youth' | 'Community' | 'Worship' | 'Other';
  readonly caption?: string;
  readonly alt: string;
  readonly photographer?: string;
}

export interface VideoData {
  readonly title: string;
  readonly date: Date;
  readonly youtubeId: string;
  readonly category: 'Bible Study' | 'Sermon' | 'Korean Class' | 'Youth' | 'Teaching' | 'Community' | 'Testimony';
  readonly speaker?: string;
  readonly passage?: string;
  readonly duration?: string;
  readonly description: string;
  readonly featured: boolean;
}

export interface HymnData {
  readonly title: string;
  readonly language: string;
  readonly key?: string;
  readonly chords?: string;
  readonly youtubeId?: string;
  readonly date: Date;
  readonly tags: readonly string[];
}

export interface HymnSuggestionData {
  readonly title: string;
  readonly language: string;
  readonly region?: string;
  readonly artist?: string;
  readonly key?: string;
  readonly chords?: string;
  readonly youtubeId?: string;
  readonly youtubeSearch?: string;
  readonly lyrics?: string;
  readonly notes?: string;
  readonly submittedBy: string;
  readonly date: Date;
  readonly status: 'pending' | 'approved' | 'rejected';
}

export interface SettingData {
  readonly churchName: string;
  readonly tagline: string;
  readonly bibleStudyTime: string;
  readonly koreanClassTime: string;
  readonly phoneSim: string;
  readonly phoneDora: string;
  readonly address: string;
  readonly welcomeMessage: string;
}

/**
 * Query parameters for listing content.
 * Modules accept this; they never call getCollection() directly.
 */
export interface ContentQuery {
  readonly kind: ContentKind;
  readonly status?: ContentStatus;
  readonly tag?: string;
  readonly language?: string;
  readonly limit?: number;
  readonly order?: 'newest' | 'oldest' | 'manual';
  readonly includeFallback?: boolean;
}

/**
 * Result envelope returned by modules.
 * Carries the collection's `source` so pages can show a banner
 * when only fallback data is being rendered.
 */
export interface ContentResultSet<T> {
  readonly items: readonly T[];
  readonly source: 'cms' | 'fallback' | 'mixed';
  readonly count: number;
}
