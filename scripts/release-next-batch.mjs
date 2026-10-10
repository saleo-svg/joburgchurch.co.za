// scripts/release-next-batch.mjs
// Reads src/content/posts/_release-queue.json
// For the next "pending" batch:
//   1. Updates src/pages/blog/[slug].astro: flips `status: 'draft'` to
//      `status: 'published'` and updates the date to today.
//   2. Updates src/content/posts/<slug>.md frontmatter: status draft -> published.
//   3. Updates src/pages/sitemap.xml.ts: strips "DRAFT-" from lastmod.
//   4. Marks the batch as "released" in the queue JSON.
//   5. Commits back (the calling workflow handles the actual commit/push).
//
// Usage: node scripts/release-next-batch.mjs [batches]

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(process.cwd());
const QUEUE = path.join(ROOT, 'src/content/posts/_release-queue.json');
const SLUG_ASTRO = path.join(ROOT, 'src/pages/blog/[slug].astro');
const SITEMAP = path.join(ROOT, 'src/pages/sitemap.xml.ts');
const POSTS_DIR = path.join(ROOT, 'src/content/posts');

const today = new Date().toISOString().slice(0, 10);
const numBatches = parseInt(process.argv[2] || '1', 10);

function log(...args) { console.log('[release]', ...args); }

const queue = JSON.parse(fs.readFileSync(QUEUE, 'utf8'));
let astro = fs.readFileSync(SLUG_ASTRO, 'utf8');
let sitemap = fs.readFileSync(SITEMAP, 'utf8');

let released = 0;
for (const batch of queue) {
  if (released >= numBatches) break;
  if (batch.status !== 'pending') continue;

  log(`Releasing batch ${batch.batch} (${batch.articles.length} articles)`);

  for (const slug of batch.articles) {
    // 1. Update [slug].astro entry
    // Match the entry for this slug, flip status draft -> published and update date.
    // The entry looks like:
    //   'foo': {
    //     title: '...',
    //     date: '2026-10-10',
    //     ...
    //     status: 'draft',
    //     ...
    //   },
    // We need to flip the 'draft' -> 'published' AND change the date
    // to today. The entry can be hundreds of lines, so we use
    // bounded backtracking.
    const entryRegex = new RegExp(
      `('${slug.replace(/-/g, '-')}':\\s*\\{[\\s\\S]*?status:\\s*)'draft'([\\s\\S]*?date:\\s*)'2026-10-10'`,
      'm'
    );
    if (entryRegex.test(astro)) {
      astro = astro.replace(entryRegex, `$1'published'$2'${today}'`);
      log(`  astro: ${slug} -> published`);
    } else {
      log(`  astro: ${slug} not found or already published (skipping)`);
    }

    // 2. Update .md frontmatter status
    const mdPath = path.join(POSTS_DIR, `${slug}.md`);
    if (fs.existsSync(mdPath)) {
      let md = fs.readFileSync(mdPath, 'utf8');
      // Match optional indentation in YAML frontmatter.
      const mdRegex = /^(---[\s\S]*?\n)\s*status:\s*draft\s*$/m;
      if (mdRegex.test(md)) {
        md = md.replace(mdRegex, `$1status: published`);
        fs.writeFileSync(mdPath, md, 'utf8');
        log(`  md: ${slug}.md -> published`);
      } else {
        log(`  md: ${slug}.md status not draft (skipping)`);
      }
    } else {
      log(`  md: ${slug}.md missing (skipping)`);
    }

    // 3. Update sitemap.xml.ts
    const smRegex = new RegExp(
      `(url: '/blog/${slug}/',\\s*lastmod:\\s*')DRAFT-2026-10-10(')`,
      'm'
    );
    if (smRegex.test(sitemap)) {
      sitemap = sitemap.replace(smRegex, `$1${today}$2`);
      log(`  sitemap: ${slug} -> ${today}`);
    } else {
      log(`  sitemap: ${slug} DRAFT- prefix not found (skipping)`);
    }
  }

  batch.status = 'released';
  batch.released_at = new Date().toISOString();
  released++;
}

if (released === 0) {
  log('No pending batches — nothing to release.');
  process.exit(0);
}

fs.writeFileSync(SLUG_ASTRO, astro, 'utf8');
fs.writeFileSync(SITEMAP, sitemap, 'utf8');
fs.writeFileSync(QUEUE, JSON.stringify(queue, null, 2) + '\n', 'utf8');

log(`Done — released ${released} batch(es) for ${today}.`);
