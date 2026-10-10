import type { APIRoute } from 'astro';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const SITE_URL = 'https://joburgchurch.co.za';
const SITE_TITLE = 'Johannesburg Bible Study Church';
const SITE_DESCRIPTION = 'A free online Bible study in Johannesburg, South Africa. Meeting every Wednesday 7:30pm via Google Meet. Biblically grounded, SA-localised, warm and pastoral.';

export const GET: APIRoute = () => {
  const items: Array<{ slug: string; title: string; description: string; date: string; tags: string[]; status: string }> = [];

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

  items.sort((a, b) => b.date.localeCompare(a.date));
  const top = items.slice(0, 50);

  const updated = new Date().toISOString();

  const entryXml = top
    .map((p) => {
      const url = `${SITE_URL}/blog/${p.slug}/`;
      const categories = p.tags.slice(0, 5).map((t) => `    <category term="${escapeXml(t)}" />`).join('\n');
      return `  <entry>
    <id>${url}</id>
    <title>${escapeXml(p.title)}</title>
    <link href="${url}" />
    <updated>${p.date}</updated>
    <published>${p.date}</published>
    <author>
      <name>Mr. Sim</name>
      <email>contact@joburgchurch.co.za</email>
    </author>
    <summary>${escapeXml(p.description)}</summary>
${categories}
  </entry>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(SITE_TITLE)}</title>
  <subtitle>${escapeXml(SITE_DESCRIPTION)}</subtitle>
  <link href="${SITE_URL}/atom.xml" rel="self" />
  <link href="${SITE_URL}/blog/" />
  <id>${SITE_URL}/</id>
  <updated>${updated}</updated>
  <icon>${SITE_URL}/favicon.svg</icon>
  <logo>${SITE_URL}/images/og-default.svg</logo>
  <rights>${new Date().getFullYear()} Johannesburg Bible Study Church</rights>
  <author>
    <name>Mr. Sim</name>
    <email>contact@joburgchurch.co.za</email>
  </author>
${entryXml}
</feed>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
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
