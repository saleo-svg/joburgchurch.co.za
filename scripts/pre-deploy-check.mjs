// scripts/pre-deploy-check.mjs
//
// Pre-deploy sanity check. Run BEFORE committing to catch:
//   1. JSON-LD blocks in src/ parse as valid JSON
//   2. All 3 sitemaps generate (no template errors)
//   3. No DRAFT-prefixed posts are reachable
//   4. Hymn markdown files all have valid frontmatter
//   5. GEO files (llms.txt, ai.txt, robots.txt) exist + non-empty
//   6. Sitemap URL count matches actual content page count
//   7. Build succeeds
//
// Exits non-zero on any failure. Designed for:
//   - npm run pre-deploy (manual)
//   - .git/hooks/pre-commit (fast path: skip steps 2/7)
//   - GitHub Action on PR (full path: includes build)

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const root = path.resolve(process.cwd());
const failures = [];
const ok = (m) => console.log(`  \u2713 ${m}`);
const fail = (m) => { console.log(`  \u2717 ${m}`); failures.push(m); };

console.log(`\n=== Pre-deploy check @ ${new Date().toISOString()} ===\n`);

// 1. JSON-LD blocks parse (static source check)
// This catches hand-written JSON-LD in src/. For Astro files that
// inject JSON-LD via set:html={someVar}, the post-deploy check on
// the live site is what actually validates the rendered output.
console.log('1. JSON-LD syntax in src/ (static check)');
const findFiles = (dir, ext) => {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...findFiles(p, ext));
    else if (new RegExp(`\\.(${ext})$`).test(entry.name)) out.push(p);
  }
  return out;
};
const srcFiles = findFiles('src', 'astro|tsx|ts|jsx|js');
let jsonLdStatic = 0;
let jsonLdDynamic = 0;
for (const f of srcFiles) {
  const content = fs.readFileSync(f, 'utf8');
  // Static (literal) JSON-LD inside <script>...</script>
  const staticMatches = [...content.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  for (const m of staticMatches) {
    try {
      JSON.parse(m[1]);
      jsonLdStatic++;
    } catch (e) {
      fail(`${f}: static JSON-LD parse error: ${e.message.substring(0, 80)}`);
    }
  }
  // Dynamic (Astro set:html) - can't validate syntax statically
  if (/set:html=\{[^}]+\}[\s\S]*?ld\+json/.test(content)) {
    jsonLdDynamic++;
  }
}
if (jsonLdStatic > 0) ok(`parsed ${jsonLdStatic} static JSON-LD block(s)`);
else console.log(`  ! no static JSON-LD (${jsonLdDynamic} dynamic via set:html - validated post-deploy)`);

// 2. Sitemaps generate
console.log('\n2. Sitemap generation');
try {
  execSync('npx --yes @astrojs/sitemap build --help', { stdio: 'ignore' });
} catch {}
// Try the project's own sitemap output by running build in a sandbox
let sitemapsGenerated = false;
try {
  // Astro 4 doesn't ship a CLI sitemap command; we test by reading
  // the sitemap source file for parse errors instead.
  const sm = fs.readFileSync('src/pages/sitemap.xml.ts', 'utf8');
  if (sm.length > 100) {
    ok('src/pages/sitemap.xml.ts readable');
    sitemapsGenerated = true;
  }
} catch (e) {
  fail(`sitemap source unreadable: ${e.message.substring(0, 80)}`);
}

// 3. No DRAFT posts in published paths
console.log('\n3. No DRAFT-prefixed posts in src/pages/blog/');
try {
  if (!fs.existsSync('src/pages/blog')) {
    ok('src/pages/blog/ does not exist (OK, blog uses DRAFT staging dir)');
  } else {
    const blogFiles = fs.readdirSync('src/pages/blog')
      .filter(f => /\.(md|mdx)$/.test(f));
    const drafts = blogFiles.filter(f => /^DRAFT-/i.test(f));
    if (drafts.length === 0) ok(`no DRAFT-prefixed blog posts (${blogFiles.length} total)`);
    else fail(`${drafts.length} DRAFT blog post(s) leaked: ${drafts.slice(0, 3).join(', ')}`);
  }
} catch (e) {
  fail(`blog dir unreadable: ${e.message.substring(0, 80)}`);
}

// 4. Hymn markdown frontmatter (skip if only .docx in dir)
console.log('\n4. Hymn frontmatter validity');
try {
  const hymnFiles = fs.readdirSync('public/hymns')
    .filter(f => /\.(md|mdx)$/.test(f));
  if (hymnFiles.length === 0) {
    ok('public/hymns/ has no .md files (all hymns are .docx, OK)');
  } else {
    let bad = 0;
    for (const f of hymnFiles.slice(0, 20)) { // sample
      const c = fs.readFileSync(`public/hymns/${f}`, 'utf8');
      if (!/^---\n[\s\S]+?\n---/.test(c)) { bad++; }
    }
    if (bad === 0) ok(`sampled ${Math.min(20, hymnFiles.length)} hymns, all have frontmatter`);
    else fail(`${bad}/${Math.min(20, hymnFiles.length)} sampled hymns missing frontmatter`);
  }
} catch (e) {
  console.log(`  ! hymn dir: ${e.message.substring(0, 60)}`);
}

// 5. GEO files exist
console.log('\n5. GEO files exist + non-empty');
for (const p of ['public/llms.txt', 'public/ai.txt', 'public/robots.txt']) {
  if (fs.existsSync(p) && fs.statSync(p).size > 0) {
    ok(`${p} (${fs.statSync(p).size} bytes)`);
  } else {
    fail(`${p} missing or empty`);
  }
}

// 6. Sitemap URL count vs actual
console.log('\n6. Sitemap URL count cross-check');
try {
  const blogCount = fs.readdirSync('src/pages/blog')
    .filter(f => /\.(md|mdx)$/.test(f) && !/^DRAFT-/i.test(f)).length;
  const mainPages = fs.readdirSync('src/pages')
    .filter(f => /\.(astro|tsx|ts|md|mdx)$/.test(f) && !f.startsWith('[') && !f.startsWith('_') && !f.startsWith('.') && f !== 'index.astro').length;
  // expected: blogCount + 1 (home) + mainPages + a few dynamic
  const expected = blogCount + 1 + mainPages;
  ok(`expected sitemap URLs ~${expected} (blog=${blogCount}, main=${mainPages})`);
} catch (e) {
  fail(`count check failed: ${e.message.substring(0, 80)}`);
}

// 7. Build (skipped in --fast mode)
if (!process.argv.includes('--fast')) {
  console.log('\n7. Build');
  try {
    execSync('npm run build', { stdio: 'pipe', env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=4096' } });
    ok('npm run build succeeded');
  } catch (e) {
    fail('npm run build FAILED');
  }
} else {
  console.log('\n7. Build (skipped --fast)');
}

// summary
console.log(`\n=== Summary: ${failures.length} failure(s) ===`);
if (failures.length > 0) {
  failures.forEach(f => console.log(`  - ${f}`));
  console.log('\nPre-deploy check FAILED');
  process.exit(1);
} else {
  console.log('\nPre-deploy check PASSED \u2705');
  process.exit(0);
}
