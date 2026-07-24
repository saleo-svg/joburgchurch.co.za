/**
 * src/lib/env.ts
 *
 * Environment configuration.
 *
 * Per Anti-Design-Debt principle #5 (zero hardcoding), switching
 * storage provider / API endpoint / feature flag is a one-line
 * change in env.ts, not in business code.
 *
 * Per principle #8 (dependency direction), env.ts is the only
 * file that reads `import.meta.env`. Modules receive neutral
 * values via this file.
 */

export type StorageProvider = 'local' | 'github-pages' | 'git';

export interface EnvConfig {
  readonly site: {
    readonly url: string;
    readonly name: string;
  };
  readonly storage: {
    readonly provider: StorageProvider;
    readonly repo?: string;
    readonly branch?: string;
  };
  readonly cms: {
    readonly authWorkerUrl?: string;
    readonly mediaFolder: string;
    readonly publicFolder: string;
  };
  readonly features: {
    readonly hymns: boolean;
    readonly suggestions: boolean;
    readonly multiLanguage: boolean;
    readonly eventsRsvp: boolean;
  };
}

const FALLBACK: EnvConfig = {
  site: {
    url: 'https://joburgchurch.co.za',
    name: 'Johannesburg Bible Study Church',
  },
  storage: {
    provider: 'local',
    repo: 'saleo-svg/joburgchurch.co.za',
    branch: 'master',
  },
  cms: {
    authWorkerUrl: undefined,
    mediaFolder: 'public/images/uploads',
    publicFolder: '/images/uploads',
  },
  features: {
    hymns: true,
    suggestions: true,
    multiLanguage: true,
    eventsRsvp: false,
  },
};

/**
 * Read env values — safe to call without import.meta.env populated.
 */
export function loadEnv(): EnvConfig {
  // Vite/Astro populate import.meta.env at build time.
  // Wrapped in try/catch to support running from plain Node scripts.
  let meta: { env?: Record<string, string | undefined> } = {};
  try {
    meta = import.meta as { env?: Record<string, string | undefined> };
  } catch {
    meta = {};
  }
  const env = meta.env ?? {};

  return {
    site: {
      url: env.PUBLIC_SITE_URL ?? FALLBACK.site.url,
      name: env.PUBLIC_SITE_NAME ?? FALLBACK.site.name,
    },
    storage: {
      provider: (env.STORAGE_PROVIDER as StorageProvider) ?? FALLBACK.storage.provider,
      repo: env.STORAGE_REPO ?? FALLBACK.storage.repo,
      branch: env.STORAGE_BRANCH ?? FALLBACK.storage.branch,
    },
    cms: {
      authWorkerUrl: env.PUBLIC_CMS_AUTH_WORKER_URL ?? FALLBACK.cms.authWorkerUrl,
      mediaFolder: env.PUBLIC_MEDIA_FOLDER ?? FALLBACK.cms.mediaFolder,
      publicFolder: env.PUBLIC_PUBLIC_FOLDER ?? FALLBACK.cms.publicFolder,
    },
    features: {
      hymns: env.PUBLIC_FEATURE_HYMNS !== 'false',
      suggestions: env.PUBLIC_FEATURE_SUGGESTIONS !== 'false',
      multiLanguage: env.PUBLIC_FEATURE_MULTI_LANG !== 'false',
      eventsRsvp: env.PUBLIC_FEATURE_EVENTS_RSVP === 'true',
    },
  };
}

/**
 * Cached singleton loaded once per process.
 */
let cached: EnvConfig | null = null;
export function env(): EnvConfig {
  if (!cached) cached = loadEnv();
  return cached;
}
