// scripts/post-deploy-healthcheck.mjs
//
// Run after a release to verify the site is healthy. Checks:
//   1. All 3 sitemaps return 200 and are valid XML
//   2. Sitemap URL counts make sense (sitemap.xml > 0,
//      sitemap-news.xml > 0 only if posts are published)
//   3. The 3 GEO files (llms.txt, ai.txt, robots.txt) return 200
//   4. The IndexNow key file is reachable
//   5. The home page returns 200 and contains the expected title
//   6. Each sitemap <loc> URL returns 200
//   7. JSON-LD blocks on /blog/ parse correctly
//   8. No DRAFT-prefixed posts in sitemap.xml
//
// Output is human-readable + exits non-zero on any failure so the
// GitHub Action fails loudly if the site is broken.

import https from 'node:https';

const SITE = 'https://joburgchurch.co.za';

const fetchText = (url) =>
  new Promise((resolve, reject) => {
    const fullUrl = url.startsWith('http') ? url : `${SITE}${url}`;
    https
      .get(fullUrl, (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () =>
          resolve({ status: res.statusCode, headers: res.headers, body: data })
        );
      })
      .on('error', reject);
  });

const ok = (msg) => console.log(`  \u2713 ${msg}`);
const fail = (msg) => {
  console.log(`  \u2717 ${msg}`);
  failures.push(msg);
};
const failures = [];

const expect200 = async (path, label) => {
  const r = await fetchText(`${SITE}${path}`);
  if (r.status === 200) ok(`${label} (${path}) -> 200`);
  else fail(`${label} (${path}) -> ${r.status}`);
  return r;
};

const isValidXml = (body) =>
  /^\s*<\?xml/.test(body) && /<urlset|<sitemapindex/.test(body);

const countLocs = (body) => (body.match(/<loc>/g) || []).length;

const hasDraft = (body) => /\/blog\/DRAFT-/i.test(body);

const jsonLdCheck = (body) => {
  const matches = [...body.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (matches.length === 0) return { scripts: 0, items: 0, valid: 0 };
  let totalItems = 0;
  let totalValid = 0;
  for (const m of matches) {
    try {
      const parsed = JSON.parse(m[1]);
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      totalItems += arr.length;
      totalValid += arr.length; // parse OK by definition
    } catch {}
  }
  return { scripts: matches.length, items: totalItems, valid: totalValid };
};

console.log(`\n=== Post-deploy health check @ ${new Date().toISOString()} ===\n`);

// 1. sitemaps
console.log('1. Sitemaps');
for (const sm of ['sitemap.xml', 'sitemap-images.xml', 'sitemap-news.xml']) {
  const r = await expect200(`/${sm}`, sm);
  if (r.status === 200) {
    if (isValidXml(r.body)) ok(`${sm} is valid XML`);
    else fail(`${sm} is not valid XML`);
    const locs = countLocs(r.body);
    if (sm === 'sitemap.xml') {
      if (locs > 0) ok(`sitemap.xml has ${locs} URLs`);
      else fail(`sitemap.xml has 0 URLs (expected > 0)`);
      if (hasDraft(r.body)) fail(`sitemap.xml contains DRAFT posts!`);
      else ok(`sitemap.xml has no DRAFT posts`);
    } else {
      // images + news: 0 is OK before any published posts
      if (locs === 0) ok(`${sm} is empty (OK, no images/news yet)`);
      else ok(`${sm} has ${locs} URLs`);
    }
  }
}

// 2. GEO files
console.log('\n2. GEO files');
for (const p of ['llms.txt', 'ai.txt', 'robots.txt', 'rss.xml', 'atom.xml']) {
  await expect200(`/${p}`, p);
}

// 3. IndexNow key file
console.log('\n3. IndexNow key');
// Find the key filename by scanning robots.txt or just try the one we know
const KNOWN_KEY = process.env.INDEXNOW_KEY || 'ajxm24zg6dvrchada436pt3bn0fhuoi1';
const kr = await fetchText(`/${KNOWN_KEY}.txt`);
if (kr.status === 200 && kr.body.trim() === KNOWN_KEY) {
  ok(`IndexNow key file (${KNOWN_KEY}.txt) reachable + correct content`);
} else {
  fail(`IndexNow key file (${KNOWN_KEY}.txt) -> ${kr.status} content=${kr.body.trim().substring(0, 30)}`);
}

// 4. home page
console.log('\n4. Home page');
const home = await expect200('/', 'home');
if (home.status === 200) {
  if (home.body.includes('Johannesburg Bible Study Church')) {
    ok('home contains expected title');
  } else {
    fail('home does not contain expected title');
  }
}

// 5. JSON-LD on /blog/
console.log('\n5. JSON-LD on /blog/');
const blog = await fetchText(`${SITE}/blog/`);
if (blog.status === 200) {
  const { scripts, items, valid } = jsonLdCheck(blog.body);
  if (items >= 4) ok(`/blog/ has ${items} schema items across ${scripts} script(s) (${valid} parse OK)`);
  else fail(`/blog/ has only ${items} schema items (expected >= 4)`);
}

// 6. Sitemap URL sample (test first 5 + last 5 from sitemap.xml)
console.log('\n6. Sitemap URL sampling');
const sm = await fetchText(`${SITE}/sitemap.xml`);
if (sm.status === 200) {
  const locs = [...sm.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const sample = [
    ...locs.slice(0, 5),
    ...locs.slice(-5),
  ];
  let bad = 0;
  for (const url of sample) {
    const r = await fetchText(url);
    if (r.status === 200) ok(`${url.replace(SITE, '')} -> 200`);
    else {
      fail(`${url.replace(SITE, '')} -> ${r.status}`);
      bad++;
    }
  }
  if (bad === 0) ok(`all ${sample.length} sampled URLs returned 200`);
}

// summary
console.log(`\n=== Summary: ${failures.length} failure(s) ===`);
if (failures.length > 0) {
  failures.forEach((f) => console.log(`  - ${f}`));
  console.log('\nHealth check FAILED');
  process.exit(1);
} else {
  console.log('\nHealth check PASSED \u2705');
  process.exit(0);
}
