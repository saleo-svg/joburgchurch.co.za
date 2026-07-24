/**
 * src/lib/index.ts
 *
 * Public re-exports for the lib layer.
 *
 * Per Anti-Design-Debt principle #4 (no new concepts), pages
 * import from `@/lib` and never reach into individual modules.
 * That way, a module split is invisible to consumers.
 */

export * from './core/content';
export * from './core/events';
export * from './core/never';

export * from './adapters/storage';
export * from './adapters/local';

export * from './modules/blog';
export * from './modules/hymns';
export * from './modules/settings';
export * from './modules/media';
export * from './modules/sermons';

export * from './env';
