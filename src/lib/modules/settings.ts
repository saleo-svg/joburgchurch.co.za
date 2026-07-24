/**
 * src/lib/modules/settings.ts
 *
 * Settings module service.
 *
 * Per Anti-Design-Debt principle #8 (dependency direction),
 * `Header` / `Footer` / `Schema.ts` and event pages should consume
 * this module and not import raw settings markdown directly.
 *
 * Per principle #9 (delete > compat), this module replaces the
 * scattered hardcoded references in Schema.ts, Header.astro,
 * Footer.astro, visit.astro, and contact.astro.
 */

import type { SettingData } from '../core/content';
import { localStorageFactory } from '../adapters/local';

let cached: SettingData | null = null;
let cachedAt: Date | null = null;
const CACHE_TTL_MS = 60_000; // 1 min

/**
 * Read settings from the only settings file.
 * Per principle #5 (zero hardcoding), the path is resolved by
 * the adapter, not hardcoded here.
 */
export async function getSettings(): Promise<SettingData> {
  const now = new Date();
  if (cached && cachedAt && now.getTime() - cachedAt.getTime() < CACHE_TTL_MS) {
    return cached;
  }
  const adapter = await localStorageFactory.create();
  const entry = await adapter.get<SettingData>('setting', 'general');
  if (!entry) {
    // Default fallback — never throw, so dev environments don't break.
    cached = {
      churchName: 'Johannesburg Bible Study Church',
      tagline: 'A Bible study and welcoming Christian community in Sandton, Johannesburg',
      bibleStudyTime: 'Wednesday 7:30pm (Online via Google Meet)',
      koreanClassTime: 'Sunday 2:00pm (Parkmore, Sandton)',
      phoneSim: '+27 77 487 1295',
      phoneDora: '+27 67 442 4461',
      address: 'Parkmore, 11th Street, Sandton, 2196, Johannesburg',
      welcomeMessage: 'Join us for free Bible study and Korean class. Everyone is welcome.',
    };
  } else {
    cached = entry.data;
  }
  cachedAt = now;
  return cached;
}

/**
 * Phone numbers — typed pairs so the call site can pick.
 */
export function getPhones(s: SettingData): { sim: string; dora: string } {
  return { sim: s.phoneSim, dora: s.phoneDora };
}

/**
 * Service times — emit a structured object so pages do not
 * parse strings.
 */
export function getServiceTimes(s: SettingData): {
  bibleStudy: { label: string; weekday: 'Wednesday' | 'other' };
  koreanClass: { label: string; weekday: 'Sunday' | 'other' };
} {
  return {
    bibleStudy: { label: s.bibleStudyTime, weekday: 'Wednesday' },
    koreanClass: { label: s.koreanClassTime, weekday: 'Sunday' },
  };
}

/**
 * Refresh cache — call after admin edits settings.
 */
export function invalidateSettingsCache(): void {
  cached = null;
  cachedAt = null;
}
