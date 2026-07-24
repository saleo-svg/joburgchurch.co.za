/**
 * src/lib/adapters/local.ts
 *
 * Local filesystem adapter.
 *
 * Per Anti-Design-Debt principle #2 (interface before implementation),
 * this implements the StorageAdapter contract from storage.ts.
 *
 * Per principle #8 (dependency direction): adapters → core, never
 * the reverse. This file imports from core, not the other way.
 */

import { readdir, readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { parse as parseYaml } from 'yaml';

// (yaml is already a transitive dependency of Astro.)

import type {
  ResolvedContent,
  ContentKind,
  ContentQuery,
  ContentResultSet,
  BlogData,
  SermonData,
  EventData,
  GalleryData,
  VideoData,
  HymnData,
  HymnSuggestionData,
  SettingData,
} from '../core/content';
import type {
  StorageAdapter,
  StorageAdapterFactory,
} from './storage';
import { sortByDate } from './storage';

/**
 * Collection → folder mapping.
 * Centralised here so a single change moves a collection.
 */
const COLLECTION_BASE: Readonly<Record<ContentKind, string>> = {
  blog: 'src/content/posts',
  sermon: 'src/content/sermons',
  event: 'src/content/events',
  gallery: 'src/content/gallery',
  video: 'src/content/videos',
  hymn: 'src/content/posts', // hymns are filtered out of blog by kind
  hymnSuggestion: 'src/content/hymn-suggestions',
  setting: 'src/content/settings',
};

/**
 * Read markdown files off disk and parse frontmatter.
 * Cheap, no Astro runtime — usable from build scripts.
 */
async function readMarkdownFiles(dir: string): Promise<
  readonly { slug: string; data: Record<string, unknown>; body: string }[]
> {
  const root = resolve(process.cwd(), dir);
  let entries: string[] = [];
  try {
    entries = await readdir(root);
  } catch {
    return [];
  }
  const md = entries.filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
  const files: { slug: string; data: Record<string, unknown>; body: string }[] = [];
  for (const name of md) {
    const raw = await readFile(join(root, name), 'utf8');
    const parsed = parseFrontmatter(raw);
    if (parsed) {
      files.push({ slug: name.replace(/\.(md|mdx)$/, ''), data: parsed.data, body: parsed.body });
    }
  }
  return files;
}

/**
 * Minimal YAML frontmatter parser.
 * Avoids the `gray-matter` dependency for build-time use.
 */
function parseFrontmatter(
  raw: string,
): { data: Record<string, unknown>; body: string } | null {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return null;
  const fm = match[1] ?? '';
  const body = match[2] ?? '';
  try {
    const data = parseYaml(fm) as Record<string, unknown>;
    return { data, body };
  } catch {
    return null;
  }
}

/**
 * Coerce a raw frontmatter object into a typed Data shape.
 * Centralised here so a single change converts a YAML field once.
 */
function coerceData<T>(kind: ContentKind, raw: Record<string, unknown>): T {
  const date = raw.date instanceof Date ? raw.date : new Date(String(raw.date ?? new Date().toISOString()));
  switch (kind) {
    case 'blog':
      return ({
        title: String(raw.title ?? ''),
        description: String(raw.description ?? ''),
        date,
        author: String(raw.author ?? 'Mr. Sim'),
        tags: Array.isArray(raw.tags) ? raw.tags.map(String) : [],
        image: raw.image ? String(raw.image) : undefined,
        heroImage: raw.heroImage ? String(raw.heroImage) : undefined,
        isHymn: raw.isHymn === true,
        language: raw.language ? String(raw.language) : undefined,
        key: raw.key ? String(raw.key) : undefined,
        chords: raw.chords ? String(raw.chords) : undefined,
        excerpt: raw.excerpt ? String(raw.excerpt) : undefined,
      } as unknown) as T;
    case 'sermon':
      return ({
        title: String(raw.title ?? ''),
        date,
        series: String(raw.series ?? 'Bible Study'),
        speaker: (raw.speaker ?? 'Mr. Sim') as SermonData['speaker'],
        passage: raw.passage ? String(raw.passage) : undefined,
        youtubeId: raw.youtube_id ? String(raw.youtube_id) : undefined,
        duration: raw.duration ? String(raw.duration) : undefined,
        description: String(raw.description ?? ''),
        body: raw.body ? String(raw.body) : undefined,
      } as unknown) as T;
    case 'event':
      return ({
        title: String(raw.title ?? ''),
        date,
        endDate: raw.end_date ? new Date(String(raw.end_date)) : undefined,
        time: raw.time ? String(raw.time) : undefined,
        location: String(raw.location ?? 'Parkmore, Sandton'),
        address: raw.address ? String(raw.address) : undefined,
        category: (raw.category ?? 'Community') as EventData['category'],
        description: String(raw.description ?? ''),
        registrationRequired: raw.registration_required === true,
        image: raw.image ? String(raw.image) : undefined,
        body: raw.body ? String(raw.body) : undefined,
      } as unknown) as T;
    case 'gallery':
      return ({
        title: String(raw.title ?? ''),
        date,
        photo: String(raw.photo ?? ''),
        category: (raw.category ?? 'Community') as GalleryData['category'],
        caption: raw.caption ? String(raw.caption) : undefined,
        alt: String(raw.alt ?? raw.title ?? ''),
        photographer: raw.photographer ? String(raw.photographer) : undefined,
      } as unknown) as T;
    case 'video':
      return ({
        title: String(raw.title ?? ''),
        date,
        youtubeId: String(raw.youtube_id ?? ''),
        category: (raw.category ?? 'Bible Study') as VideoData['category'],
        speaker: raw.speaker ? String(raw.speaker) : undefined,
        passage: raw.passage ? String(raw.passage) : undefined,
        duration: raw.duration ? String(raw.duration) : undefined,
        description: String(raw.description ?? ''),
        featured: raw.featured === true,
      } as unknown) as T;
    case 'hymn':
      return ({
        title: String(raw.title ?? ''),
        language: String(raw.language ?? 'English'),
        key: raw.key ? String(raw.key) : undefined,
        chords: raw.chords ? String(raw.chords) : undefined,
        youtubeId: raw.youtube_id ? String(raw.youtube_id) : undefined,
        date,
        tags: Array.isArray(raw.tags) ? raw.tags.map(String) : [],
      } as unknown) as T;
    case 'hymnSuggestion':
      return ({
        title: String(raw.title ?? ''),
        language: String(raw.language ?? 'English'),
        region: raw.region ? String(raw.region) : undefined,
        artist: raw.artist ? String(raw.artist) : undefined,
        key: raw.key ? String(raw.key) : undefined,
        chords: raw.chords ? String(raw.chords) : undefined,
        youtubeId: raw.youtube_id ? String(raw.youtube_id) : undefined,
        youtubeSearch: raw.youtube_search ? String(raw.youtube_search) : undefined,
        lyrics: raw.lyrics ? String(raw.lyrics) : undefined,
        notes: raw.notes ? String(raw.notes) : undefined,
        submittedBy: String(raw.submitted_by ?? 'Anonymous'),
        date,
        status: (raw.status ?? 'pending') as HymnSuggestionData['status'],
      } as unknown) as T;
    case 'setting':
      return ({
        churchName: String(raw.church_name ?? 'Johannesburg Bible Study Church'),
        tagline: String(raw.tagline ?? ''),
        bibleStudyTime: String(raw.bible_study_time ?? ''),
        koreanClassTime: String(raw.korean_class_time ?? ''),
        phoneSim: String(raw.phone_sim ?? ''),
        phoneDora: String(raw.phone_dora ?? ''),
        address: String(raw.address ?? ''),
        welcomeMessage: String(raw.welcome_message ?? ''),
      } as unknown) as T;
  }
}

/**
 * LocalStorageAdapter — reads from disk, writes to disk.
 * Used by build scripts and CI checks.
 */
class LocalStorageAdapter implements StorageAdapter {
  readonly provider = 'local' as const;
  readonly capabilities = {
    writable: true,
    reactive: false,
    multiLanguage: false,
  } as const;

  async list<T>(query: ContentQuery): Promise<ContentResultSet<T>> {
    const folder = COLLECTION_BASE[query.kind];
    const files = await readMarkdownFiles(folder);
    const items: ResolvedContent<T>[] = files.map((f) => {
      const coerced = coerceData<T>(query.kind, f.data);
      return {
        kind: query.kind,
        slug: f.slug,
        title: String(f.data.title ?? f.slug),
        date: (coerced as { date?: Date }).date ?? new Date(),
        status: 'published',
        data: coerced,
        url: buildUrl(query.kind, f.slug),
        source: 'cms',
      };
    });
    const sorted = sortByDate(items, query.order === 'oldest' ? 'oldest' : 'newest');
    const sliced = query.limit ? sorted.slice(0, query.limit) : sorted;
    return { items: sliced, source: 'cms', count: sliced.length };
  }

  async get<T>(kind: ContentKind, slug: string): Promise<ResolvedContent<T> | null> {
    const all = await this.list<T>({ kind });
    return all.items.find((i) => i.slug === slug) ?? null;
  }

  // Write-side: documented but not wired in production.
  // The admin panel uses the GitHub adapter instead.
  async create<T>(kind: ContentKind, slug: string, data: T): Promise<ResolvedContent<T>> {
    throw new Error('LocalStorageAdapter.create is not wired. Use GitHub adapter.');
  }
  async update<T>(kind: ContentKind, slug: string, data: Partial<T>): Promise<ResolvedContent<T>> {
    throw new Error('LocalStorageAdapter.update is not wired. Use GitHub adapter.');
  }
  async delete(kind: ContentKind, slug: string): Promise<void> {
    throw new Error('LocalStorageAdapter.delete is not wired. Use GitHub adapter.');
  }
}

function buildUrl(kind: ContentKind, slug: string): string {
  switch (kind) {
    case 'blog': return `/blog/${slug}/`;
    case 'sermon': return `/sermons/#${slug}`;
    case 'event': return `/events/#${slug}`;
    case 'gallery': return `/gallery/#${slug}`;
    case 'video': return `/videos/#${slug}`;
    case 'hymn': return `/hymns/${slug}/`;
    case 'hymnSuggestion': return `/admin/#hymn-suggestions`;
    case 'setting': return '/';
  }
}

export const localStorageFactory: StorageAdapterFactory = {
  async create() {
    return new LocalStorageAdapter();
  },
};
