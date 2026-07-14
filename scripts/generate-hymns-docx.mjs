#!/usr/bin/env node
/**
 * generate-hymns-docx.mjs
 *
 * Reads the shared hymn data (src/data/hymns.ts) and writes
 * one .docx file per hymn into public/hymns/<slug>.docx.
 *
 * The docx is the same "Download" file referenced from
 * /hymns/<slug>/ pages and the hymn index.
 *
 * Run:  node scripts/generate-hymns-docx.mjs
 *
 * Why read from a .ts file?
 *   The hymn array is a TypeScript const we already share with the
 *   site. Duplicating it as JSON would drift out of sync. We strip
 *   the `export` keyword + type annotations and eval the remainder.
 *   This works because the hymn array is plain JavaScript data with
 *   no TypeScript-only syntax in its values.
 */

import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const ROOT       = resolve(__dirname, '..');

/* ------------------------------------------------------------------ *
 * 1. Parse the hymn array out of src/data/hymns.ts
 * ------------------------------------------------------------------ */
const HYMNS_TS = resolve(ROOT, 'src/data/hymns.ts');
const source = await readFile(HYMNS_TS, 'utf8');

const startMarker = 'export const hymns: Hymn[] = [';
const startIdx = source.indexOf(startMarker);
if (startIdx < 0) throw new Error('Could not find `export const hymns: Hymn[] = [` in src/data/hymns.ts');
const arrayStart = startIdx + startMarker.length - 1; // position of `[`

// Walk the array, respecting nested { } and [ ] and strings, until the matching `]`
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
  if (c === '/' && source[i + 1] === '/') {
    while (i < source.length && source[i] !== '\n') i++;
    continue;
  }
  if (c === '/' && source[i + 1] === '*') {
    i += 2;
    while (i < source.length - 1 && !(source[i] === '*' && source[i + 1] === '/')) i++;
    i++;
    continue;
  }
  if (c === '{' || c === '[') depth++;
  else if (c === '}' || c === ']') {
    depth--;
    if (depth === 0) { end = i; break; }
  }
}
if (end < 0) throw new Error('Could not find end of hymns array');

const arrayLiteral = source.slice(arrayStart, end + 1);
const hymns = (0, eval)(arrayLiteral);
console.log(`[hymns-docx] parsed ${hymns.length} hymn(s) from src/data/hymns.ts`);

/* ------------------------------------------------------------------ *
 * 2. Build a .docx for each hymn
 * ------------------------------------------------------------------ */
const outDir = resolve(ROOT, 'public/hymns');
await mkdir(outDir, { recursive: true });

function buildDoc(h) {
  const lines = [];

  // Title
  lines.push(new Paragraph({
    text: h.title,
    heading: HeadingLevel.TITLE,
    alignment: AlignmentType.CENTER,
  }));

  if (h.alternateTitle) {
    lines.push(new Paragraph({
      children: [new TextRun({ text: h.alternateTitle, italics: true, color: '666666' })],
      alignment: AlignmentType.CENTER,
    }));
  }

  lines.push(new Paragraph({
    children: [
      new TextRun({ text: 'Language: ', bold: true }),
      new TextRun(h.languageName || h.language || ''),
      new TextRun({ text: '    Key: ', bold: true }),
      new TextRun(h.key || ''),
      new TextRun({ text: '    Chords: ', bold: true }),
      new TextRun(h.chords || ''),
    ],
  }));

  if (h.region) {
    lines.push(new Paragraph({
      children: [
        new TextRun({ text: 'Region: ', bold: true }),
        new TextRun(h.region),
      ],
    }));
  }

  if (h.popularity) {
    lines.push(new Paragraph({
      children: [
        new TextRun({ text: 'Popularity: ', bold: true }),
        new TextRun(h.popularity),
      ],
    }));
  }

  if (h.artist || h.releasedYear) {
    const parts = [];
    if (h.artist) parts.push(new TextRun({ text: 'Artist: ', bold: true }), new TextRun(h.artist));
    if (h.releasedYear) {
      if (parts.length) parts.push(new TextRun({ text: '    ' }));
      parts.push(new TextRun({ text: 'Year: ', bold: true }), new TextRun(String(h.releasedYear)));
    }
    lines.push(new Paragraph({ children: parts }));
  }

  lines.push(new Paragraph(''));

  // Lyrics body — split on blank lines into verse / chorus blocks
  if (h.lyrics && h.lyrics.trim().length > 0) {
    lines.push(new Paragraph({
      children: [new TextRun({ text: 'LYRICS', bold: true, size: 28 })],
    }));
    lines.push(new Paragraph(''));

    const blocks = h.lyrics.split(/\n\s*\n/);
    for (const block of blocks) {
      const trimmed = block.trim();
      if (!trimmed) continue;
      const isChorus = /^\[?(chorus|chorus:|bridge|tag|outro|pre[- ]?chorus|interlude)/i.test(trimmed);
      const label = isChorus ? trimmed.split('\n')[0].replace(/[[\]]/g, '').trim() : null;
      const body  = isChorus ? trimmed.split('\n').slice(1).join('\n').trim() : trimmed;

      if (label) {
        lines.push(new Paragraph({
          children: [new TextRun({ text: label.toUpperCase(), bold: true, color: '8B4513' })],
        }));
      }
      for (const line of body.split('\n')) {
        lines.push(new Paragraph({ text: line, spacing: { after: 80 } }));
      }
      lines.push(new Paragraph(''));
    }
  } else {
    lines.push(new Paragraph({
      children: [new TextRun({ text: 'Lyrics coming soon. Check the online version for the full song.', italics: true, color: '888888' })],
    }));
  }

  // Footer
  lines.push(new Paragraph(''));
  lines.push(new Paragraph(''));
  lines.push(new Paragraph({
    children: [new TextRun({ text: '— Johannesburg Bible Study Church | joburgchurch.co.za/hymns', italics: true, size: 18, color: '888888' })],
    alignment: AlignmentType.CENTER,
  }));

  return new Document({
    creator: 'Johannesburg Bible Study Church',
    title: `${h.title} (${h.languageName || h.language || ''})`,
    description: h.excerpt || '',
    sections: [{ children: lines }],
  });
}

let written = 0;
let skipped = 0;
for (const h of hymns) {
  const doc = buildDoc(h);
  const buf = await Packer.toBuffer(doc);
  const outPath = join(outDir, `${h.slug}.docx`);

  // Windows holds a brief lock on files after writeFile, which makes
  // the second-pass overwrite fail with EBUSY. We retry a few times
  // before giving up.
  let attempts = 0;
  const maxAttempts = 5;
  while (attempts < maxAttempts) {
    try {
      await writeFile(outPath, buf);
      written++;
      break;
      } catch (err) {
      if (err && err.code === 'EBUSY' && attempts < maxAttempts - 1) {
        attempts++;
        await new Promise((r) => setTimeout(r, 80 * attempts));
        continue;
      }
      throw err;
    }
  }
  if (attempts >= maxAttempts) skipped++;
}

console.log(`[hymns-docx] wrote ${written} .docx file(s) to public/hymns/ (skipped ${skipped})`);
