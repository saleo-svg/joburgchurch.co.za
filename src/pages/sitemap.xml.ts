import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const siteUrl = 'https://joburgchurch.co.za';
  const now = '2026-06-21';

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/about/', priority: '0.8', changefreq: 'monthly' },
    { url: '/visit/', priority: '0.9', changefreq: 'monthly' },
    { url: '/community-classes/', priority: '0.9', changefreq: 'weekly' },
    { url: '/community-classes/korean/', priority: '0.9', changefreq: 'weekly' },
    { url: '/spiritual-education/', priority: '0.8', changefreq: 'weekly' },
    { url: '/youth-usecan/', priority: '0.8', changefreq: 'monthly' },
    { url: '/sermons/', priority: '0.7', changefreq: 'weekly' },
    { url: '/events/', priority: '0.7', changefreq: 'weekly' },
    { url: '/blog/', priority: '0.8', changefreq: 'weekly' },
    { url: '/contact/', priority: '0.8', changefreq: 'monthly' },
  { url: '/privacy/', priority: '0.3', changefreq: 'yearly' },
  { url: '/locations/', priority: '0.8', changefreq: 'weekly' },
  { url: '/locations/sandton/', priority: '0.9', changefreq: 'weekly' },
  { url: '/locations/randburg/', priority: '0.7', changefreq: 'monthly' },
  { url: '/locations/fourways/', priority: '0.7', changefreq: 'monthly' },
  { url: '/locations/midrand/', priority: '0.7', changefreq: 'monthly' },
  { url: '/locations/alberton/', priority: '0.7', changefreq: 'monthly' },
  { url: '/locations/roodepoort/', priority: '0.7', changefreq: 'monthly' },
  { url: '/locations/soweto/', priority: '0.7', changefreq: 'monthly' },
];

  const blogPosts = [
    { url: '/blog/welcome-to-our-church/', lastmod: '2026-01-01' },
    { url: '/blog/free-korean-class-community/', lastmod: '2026-02-01' },
    { url: '/blog/why-community-learning-matters/', lastmod: '2026-03-01' },
    { url: '/blog/youth-growth-spiritual-education/', lastmod: '2026-04-01' },
    { url: '/blog/how-to-join-online-bible-study/', lastmod: '2026-05-01' },
  ];

  const allPages = [
    ...staticPages,
    ...blogPosts.map((p) => ({ ...p, priority: '0.7', changefreq: 'monthly' })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
    .map(
      (page) => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${page.lastmod ?? now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
