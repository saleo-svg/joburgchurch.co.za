import type { APIRoute } from 'astro';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const SITE_URL = 'https://joburgchurch.co.za';

export const GET: APIRoute = () => {
  // Google News sitemap — only the last 1000 articles, all
  // are <2 days old when freshly published.

  const items: Array<{ loc: string; title: string; date: string; keywords: string }> = [];

  try {
    const manifestPath = join(process.cwd(), 'src', 'content', 'posts', '_drafts-80.json');
    if (existsSync(manifestPath)) {
      const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
      for (const [slug, data] of Object.entries(manifest)) {
        const meta = data as { title: string; tags: string[]; date: string; status?: string };
        if (meta.status === 'published' || meta.status === undefined) {
          items.push({
            loc: `${SITE_URL}/blog/${slug}/`,
            title: meta.title,
            date: meta.date,
            keywords: meta.tags.join(', '),
          });
        }
      }
    }
  } catch {
    // ignore
  }

  // Sort by date desc and take the most recent 1000
  items.sort((a, b) => b.date.localeCompare(a.date));
  const top = items.slice(0, 1000);

  const urlEntries = top
    .map(
      (p) => `  <url>
    <loc>${p.loc}</loc>
    <news:news>
      <news:publication>
        <news:name>Johannesburg Bible Study Church</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${p.date}</news:publication_date>
      <news:title>${escapeXml(p.title)}</news:title>
      <news:keywords>${escapeXml(p.keywords)}</news:keywords>
    </news:news>
  </url>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urlEntries}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=1800',
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
