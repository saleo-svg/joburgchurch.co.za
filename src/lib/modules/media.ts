/**
 * src/lib/modules/media.ts
 *
 * Media module service.
 *
 * Per Anti-Design-Debt principle #5 (zero hardcoding), the actual
 * upload destination is decided by the adapter, not by this module.
 * Today: local filesystem. Tomorrow: Cloudflare R2. No code changes.
 */

import type { MediaAdapter } from '../adapters/storage';

/**
 * Allowed mime types — extensible.
 * Per principle #3 (exhaustiveness), the parser is a discriminated
 * union covering every supported category.
 */
export type MediaCategory = 'image' | 'video' | 'audio' | 'document';

const MIME_MAP: Record<string, MediaCategory> = {
  'image/jpeg': 'image',
  'image/png': 'image',
  'image/webp': 'image',
  'image/gif': 'image',
  'image/svg+xml': 'image',
  'video/mp4': 'video',
  'video/webm': 'video',
  'audio/mpeg': 'audio',
  'audio/ogg': 'audio',
  'audio/wav': 'audio',
  'application/pdf': 'document',
  'application/msword': 'document',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'document',
};

export function detectCategory(mime: string): MediaCategory | null {
  return MIME_MAP[mime] ?? null;
}

export function isAllowedMime(mime: string): boolean {
  return mime in MIME_MAP;
}

/**
 * Uploads target public/images/uploads/<category>/<slug>-<timestamp>
 * Per principle #5 (zero hardcoding), the prefix is derived from
 * the category, not duplicated at every call site.
 */
export function uploadPath(category: MediaCategory, slug: string, ext: string): string {
  const ts = Date.now().toString(36);
  return `uploads/${category}/${slug}-${ts}.${ext}`;
}

/**
 * Pure path helpers — used by both admin UI and rendering.
 */
export function publicUrl(adapter: MediaAdapter, path: string): string {
  return adapter.publicUrl(path);
}
