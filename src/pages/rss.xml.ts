import type { APIRoute } from 'astro';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const SITE_URL = 'https://joburgchurch.co.za';
const SITE_TITLE = 'Johannesburg Bible Study Church';
const SITE_DESCRIPTION = 'A free online Bible study in Johannesburg, South Africa. Meeting every Wednesday 7:30pm via Google Meet. Biblically grounded, SA-localised, warm and pastoral.';

export const GET: APIRoute = () => {
  const items: Array<{ slug: string; title: string; description: string; date: string; tags: string[]; status: string }> = [];

  // Pull from manifest (only published)
  try {
    const manifestPath = join(process.cwd(), 'src', 'content', 'posts', '_drafts-80.json');
    if (existsSync(manifestPath)) {
      const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
      for (const [slug, data] of Object.entries(manifest)) {
        const meta = data as { title: string; excerpt: string; tags: string[]; date: string; status: string };
        if (meta.status === 'published') {
          items.push({ slug, ...meta });
        }
      }
    }
  } catch {
    // ignore
  }

  // Sort by date desc
  items.sort((a, b) => b.date.localeCompare(a.date));

  // Take most recent 50 for the feed
  const top = items.slice(0, 50);

  const buildDate = new Date().toUTCString();

  const itemXml = top
    .map((p) => {
      const url = `${SITE_URL}/blog/${p.slug}/`;
      const pubDate = new Date(p.date).toUTCString();
      const categories = p.tags.slice(0, 5).map((t) => `      <category>${escapeXml(t)}</category>`).join('\n');
      return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${p.description}]]></description>
${categories}
      <author>contact@joburgchurch.co.za (Mr. Sim)</author>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}/blog/</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-ZA</language>
    <copyright>${new Date().getFullYear()} Johannesburg Bible Study Church</copyright>
    <managingEditor>contact@joburgchurch.co.za (Mr. Sim)</managingEditor>
    <webMaster>contact@joburgchurch.co.za</webMaster>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/images/og-default.svg</url>
      <title>${escapeXml(SITE_TITLE)}</title>
      <link>${SITE_URL}/</link>
    </image>
${itemXml}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
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
