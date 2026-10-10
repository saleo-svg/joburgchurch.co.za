// scripts/indexnow-submit.mjs
//
// Submit the most recent published blog posts + sitemaps to IndexNow.
// IndexNow pings Bing, Yandex, and other participating engines so the
// pages get crawled within minutes instead of days.
//
// Usage:
//   node scripts/indexnow-submit.mjs                       # submit home + sitemaps
//   node scripts/indexnow-submit.mjs --all                 # submit every published post
//   node scripts/indexnow-submit.mjs --url <url>           # submit a single URL
//
// The key file is public/<key>.txt — it must be served at the root.
// The key value is also stored in .indexnow-key.txt (gitignored).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const SITE_URL = 'https://joburgchurch.co.za';

// Read the key
const keyPath = path.join(ROOT, '.indexnow-key.txt');
if (!fs.existsSync(keyPath)) {
  console.error('[indexnow] missing .indexnow-key.txt — run the setup first');
  process.exit(1);
}
const KEY = fs.readFileSync(keyPath, 'utf8').trim();
console.log(`[indexnow] using key: ${KEY}`);

const args = process.argv.slice(2);
let submitAll = args.includes('--all');
let singleUrl = null;
const urlIdx = args.indexOf('--url');
if (urlIdx > -1 && args[urlIdx + 1]) singleUrl = args[urlIdx + 1];

// Build URL list
let urls = [];

if (singleUrl) {
  urls.push(singleUrl);
} else if (submitAll) {
  // Submit every published post
  const manifestPath = path.join(ROOT, 'src', 'content', 'posts', '_drafts-80.json');
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    for (const [slug, data] of Object.entries(manifest)) {
      if (data.status === 'published') {
        urls.push(`${SITE_URL}/blog/${slug}/`);
      }
    }
  }
  // Plus the 3 sitemaps and home/about/blog index
  urls.push(
    `${SITE_URL}/`,
    `${SITE_URL}/blog/`,
    `${SITE_URL}/about/`,
    `${SITE_URL}/sitemap.xml`,
    `${SITE_URL}/sitemap-images.xml`,
    `${SITE_URL}/sitemap-news.xml`,
    `${SITE_URL}/rss.xml`,
    `${SITE_URL}/atom.xml`,
    `${SITE_URL}/llms.txt`,
    `${SITE_URL}/ai.txt`,
  );
} else {
  // Default: just submit the home + sitemaps (cheapest, safe to call often)
  urls.push(
    `${SITE_URL}/`,
    `${SITE_URL}/sitemap.xml`,
    `${SITE_URL}/sitemap-news.xml`,
  );
}

// IndexNow API: POST a JSON body to https://api.indexnow.org/IndexNow
// Body shape: { host, key, keyLocation, urlList }
const payload = {
  host: 'joburgchurch.co.za',
  key: KEY,
  keyLocation: `${SITE_URL}/${KEY}.txt`,
  urlList: urls,
};

console.log(`[indexnow] submitting ${urls.length} URL(s):`);
urls.forEach((u) => console.log(`  - ${u}`));

try {
  const res = await fetch('https://api.indexnow.org/IndexNow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
  console.log(`[indexnow] HTTP ${res.status} ${res.statusText}`);
  if (res.status === 200) {
    console.log('[indexnow] OK — URLs accepted. Bing will crawl within minutes.');
  } else if (res.status === 202) {
    console.log('[indexnow] OK — URLs received, will be processed.');
  } else if (res.status === 400) {
    console.error('[indexnow] Bad request — check key file URL and key value.');
  } else if (res.status === 403) {
    console.error('[indexnow] Key not verified — make sure the key file is reachable.');
  } else if (res.status === 422) {
    console.error('[indexnow] Payload invalid — check urlList format.');
  } else if (res.status === 429) {
    console.error('[indexnow] Too many requests — wait a few minutes.');
  }
  // Try to read response body
  try {
    const body = await res.text();
    if (body) console.log(`[indexnow] response: ${body.substring(0, 200)}`);
  } catch {}
} catch (err) {
  console.error(`[indexnow] network error: ${err.message}`);
}
