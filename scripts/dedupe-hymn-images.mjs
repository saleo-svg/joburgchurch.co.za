#!/usr/bin/env node
/**
 * dedupe-hymn-images.mjs
 *
 * Replaces duplicate image URLs in src/data/hymns.ts with a round-robin
 * assignment from a curated pool of 19 cross / Jesus / worship photos
 * from Unsplash (all hand-verified to return HTTP 200, free under the
 * Unsplash License).
 *
 * Run after editing the hymn array to normalize imagery:
 *   node scripts/dedupe-hymn-images.mjs
 */

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const ROOT       = resolve(__dirname, '..');

const HYMNS_TS = resolve(ROOT, 'src/data/hymns.ts');

const IMG_POOL = [
  '1450558415837-1f5e21a17709', // cross silhouette, orange sky
  '1594387295585-34ba732932c8', // cross silhouette, Rio de Janeiro sunset
  '1607947243050-93d773ede731', // cross silhouette, France dusk
  '1528825539566-2bcb5882445c', // cross silhouette, mountain golden hour
  '1617610882105-71c5d7447837', // cross silhouette, sunset
  '1571851636055-255e91e36c3f', // cross lit up in dark (neon)
  '1617099331324-5ff9fb59578c', // red cross neon, black background
  '1637480054684-7ffd1996fc9c', // statue of Jesus on cross, dark
  '1775400713633-e4b2b3577fb7', // hands raised in worship service
  '1769755410096-6c7a85d13f86', // hands raised worship, group
  '1762013728522-f97f83565373', // woman hands raised in prayer
  '1650658986628-1d91731f046e', // stained glass window, sunlight
  '1739878599996-fbed899de1b0', // sunlight through church windows (France)
  '1739834728302-a67c905da6fb', // gothic church window, sepia
  '1750688468246-4679eaea864b', // tall church window, purple light (Italy)
  '1480721145676-f5c40929d80c', // opened Bible, bokeh light
  '1536063766742-b514ee70707f', // Bible in window light
  '1766686609656-a8be9681047d', // candles in dark church (Munich)
  '1633706719314-bd15300113cc', // candles lit in front of altar
];

const imgUrl = (id) => `https://images.unsplash.com/photo-${id}?w=800&q=80`;

const source = await readFile(HYMNS_TS, 'utf8');
const startMarker = 'export const hymns: Hymn[] = [';
const startIdx = source.indexOf(startMarker);
if (startIdx < 0) throw new Error('Could not find `export const hymns: Hymn[] = [`');
const arrayStart = startIdx + startMarker.length - 1;

let depth = 0, inStr = null, escaped = false, end = -1;
for (let i = arrayStart; i < source.length; i++) {
  const c = source[i];
  if (escaped) { escaped = false; continue; }
  if (inStr) {
    if (c === '\\') { escaped = true; continue; }
    if (c === inStr) inStr = null;
    continue;
  }
  if (c === '"' || c === "'" || c === '`') { inStr = c; continue; }
  if (c === '/' && source[i + 1] === '/') { while (i < source.length && source[i] !== '\n') i++; continue; }
  if (c === '/' && source[i + 1] === '*') { i += 2; while (i < source.length - 1 && !(source[i] === '*' && source[i + 1] === '/')) i++; i++; continue; }
  if (c === '{' || c === '[') depth++;
  else if (c === '}' || c === ']') { depth--; if (depth === 0) { end = i; break; } }
}
if (end < 0) throw new Error('Could not find end of hymns array');

const arrayLiteral = source.slice(arrayStart, end + 1);
const hymns = (0, eval)(arrayLiteral);
console.log(`[dedupe-images] parsed ${hymns.length} hymns`);

function stableIndex(slug) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = ((h << 5) - h + slug.charCodeAt(i)) | 0;
  return Math.abs(h) % IMG_POOL.length;
}

let changed = 0;
const seen = new Map();
for (const h of hymns) {
  const idx = stableIndex(h.slug);
  const newUrl = imgUrl(IMG_POOL[idx]);
  if (h.image !== newUrl) {
    h.image = newUrl;
    changed++;
  }
  seen.set(idx, (seen.get(idx) || 0) + 1);
}
console.log(`[dedupe-images] updated ${changed} hymn(s) — using ${IMG_POOL.length} unique images`);

let newArrayLiteral = '[\n';
hymns.forEach((h, i) => {
  const json = JSON.stringify(h, null, 2);
  const indented = json.split('\n').map((l) => '    ' + l).join('\n');
  newArrayLiteral += indented;
  if (i < hymns.length - 1) newArrayLiteral += ',';
  newArrayLiteral += '\n';
});
newArrayLiteral += ']';

const newSource = source.slice(0, arrayStart) + newArrayLiteral + source.slice(end + 1);
await writeFile(HYMNS_TS, newSource, 'utf8');
console.log(`[dedupe-images] wrote src/data/hymns.ts`);