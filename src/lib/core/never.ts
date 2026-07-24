/**
 * src/lib/core/never.ts
 *
 * Exhaustiveness helper for discriminated unions.
 *
 * Per Anti-Design-Debt principle #3: type exhaustion via `never` checks
 * prevents future additions from silently breaking the build.
 *
 * Usage:
 *   switch (event.kind) {
 *     case 'blog.created': return handleBlogCreated(event);
 *     case 'blog.updated': return handleBlogUpdated(event);
 *     default: assertNever(event);  // <- compile error if a new kind is added
 *   }
 */
export function assertNever(x: never): never {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(x)}`,
  );
}

/**
 * Compile-time assertion that all members of a union are handled.
 * Use in switch defaults to force a TS error when the union grows.
 */
export type Exhaustive<T> = T extends never ? true : false;
