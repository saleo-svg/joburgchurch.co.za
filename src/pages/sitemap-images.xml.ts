import type { APIRoute } from 'astro';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const SITE_URL = 'https://joburgchurch.co.za';

export const GET: APIRoute = () => {
  // 80 blog posts each have a hero image + the site has a default OG image.
  // Image sitemap is the single biggest driver of Google Image Search traffic.

  const publishedImages: Array<{ loc: string; title: string; image: string }> = [];

  // Pull from manifest (any status: 'published' in the manifest)
  try {
    const manifestPath = join(process.cwd(), 'src', 'content', 'posts', '_drafts-80.json');
    if (existsSync(manifestPath)) {
      const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
      for (const [slug, data] of Object.entries(manifest)) {
        const meta = data as { title: string; heroImage: string; status?: string };
        if (meta.status === 'published' || meta.status === undefined) {
          publishedImages.push({
            loc: `${SITE_URL}/blog/${slug}/`,
            title: meta.title,
            image: meta.heroImage.startsWith('http') ? meta.heroImage : `${SITE_URL}${meta.heroImage}`,
          });
        }
      }
    }
  } catch {
    // ignore — fall through to static list below
  }

  // Add hand-picked blog posts (legacy, guaranteed published)
  const legacyImages = [
    { slug: 'welcome-to-our-church', title: 'Welcome to the Johannesburg Bible Study Church', image: '/images/og-default.svg' },
    { slug: 'korean-class-community', title: 'Korean Class Community', image: '/images/og-default.svg' },
    { slug: 'how-to-join-online-bible-study', title: 'How to Join the Online Bible Study', image: '/images/og-default.svg' },
  ];
  for (const p of legacyImages) {
    publishedImages.push({
      loc: `${SITE_URL}/blog/${p.slug}/`,
      title: p.title,
      image: `${SITE_URL}${p.image}`,
    });
  }

  // Hymn thumbnail images (hymns in /hymns/<slug>.docx + matched image)
  // We can skip per-hymn images for now to keep the sitemap small; Google
  // crawls these naturally when the page HTML references them.

  const today = new Date().toISOString().slice(0, 10);

  const urlEntries = publishedImages
    .map(
      (p) => `  <url>
    <loc>${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <image:image>
      <image:loc>${p.image}</image:loc>
      <image:title>${escapeXml(p.title)}</image:title>
    </image:image>
  </url>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlEntries}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
