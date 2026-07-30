import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const siteUrl = 'https://joburgchurch.co.za';
  const now = '2026-07-30';

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/about/', priority: '0.8', changefreq: 'monthly' },
    { url: '/visit/', priority: '0.9', changefreq: 'monthly' },
    { url: '/community-classes/', priority: '0.9', changefreq: 'weekly' },
    { url: '/community-classes/korean/', priority: '0.9', changefreq: 'weekly' },
    { url: '/spiritual-education/', priority: '0.9', changefreq: 'weekly' },
    { url: '/youth-usecan/', priority: '0.8', changefreq: 'monthly' },
    { url: '/sermons/', priority: '0.7', changefreq: 'weekly' },
    { url: '/videos/', priority: '0.9', changefreq: 'weekly' },
    { url: '/events/', priority: '0.7', changefreq: 'weekly' },
    { url: '/gallery/', priority: '0.6', changefreq: 'monthly' },
    { url: '/blog/', priority: '0.9', changefreq: 'weekly' },
    { url: '/faq/', priority: '0.8', changefreq: 'monthly' },
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
    { url: '/churches-in-johannesburg/', priority: '0.8', changefreq: 'monthly' },
  ];

  // Phase 10 SEO landing pages — added 2026-07-03
  const seoLandingPages = [
    { url: '/free-bible-study-sandton/', lastmod: '2026-07-03' },
    { url: '/online-bible-study-johannesburg/', lastmod: '2026-07-03' },
    { url: '/korean-language-class-for-beginners-johannesburg/', lastmod: '2026-07-03' },
    { url: '/what-to-wear-to-church-johannesburg/', lastmod: '2026-07-03' },
    { url: '/first-time-church-visitor-johannesburg/', lastmod: '2026-07-03' },
    { url: '/church-service-times-sandton/', lastmod: '2026-07-03' },
    { url: '/free-korean-class-johannesburg/', lastmod: '2026-07-03' },
    { url: '/youth-bible-study-johannesburg/', lastmod: '2026-07-03' },
    { url: '/churches-in-sandton/', lastmod: '2026-07-03' },
    { url: '/bible-study-for-depression-johannesburg/', lastmod: '2026-07-03' },
    { url: '/marriage-counselling-johannesburg/', lastmod: '2026-07-03' },
    { url: '/parenting-biblical-advice-johannesburg/', lastmod: '2026-07-03' },
    { url: '/youth-ministry-johannesburg-usecan/', lastmod: '2026-07-03' },
    { url: '/bible-study-randburg/', lastmod: '2026-07-03' },
    { url: '/bible-study-fourways/', lastmod: '2026-07-03' },
    { url: '/bible-study-midrand/', lastmod: '2026-07-03' },
    { url: '/bible-study-alberton/', lastmod: '2026-07-03' },
    { url: '/bible-study-roodepoort/', lastmod: '2026-07-03' },
    { url: '/bible-study-soweto/', lastmod: '2026-07-03' },
  ];

  const blogPosts = [
    { url: '/blog/welcome-to-our-church/', lastmod: '2026-01-01' },
    { url: '/blog/free-korean-class-community/', lastmod: '2026-02-01' },
    { url: '/blog/why-community-learning-matters/', lastmod: '2026-03-01' },
    { url: '/blog/youth-growth-spiritual-education/', lastmod: '2026-04-01' },
    { url: '/blog/how-to-join-online-bible-study/', lastmod: '2026-05-01' },
    { url: '/blog/what-to-expect-first-bible-study/', lastmod: '2026-06-10' },
    { url: '/blog/learning-korean-as-an-adult-sandton/', lastmod: '2026-06-15' },
    { url: '/blog/finding-community-as-a-young-adult-johannesburg/', lastmod: '2026-06-20' },
    { url: '/blog/bible-study-near-me-johannesburg/', lastmod: '2026-06-25' },
    { url: '/blog/when-the-bible-feels-irrelevant/', lastmod: '2026-07-05' },
    { url: '/blog/what-sandton-gets-wrong-about-christianity/', lastmod: '2026-07-08' },
    { url: '/blog/the-gospel-according-to-load-shedding/', lastmod: '2026-07-10' },
    { url: '/blog/why-online-bible-study-johannesburg/', lastmod: '2026-07-18' },
    { url: '/blog/free-korean-class-sandton-johannesburg/', lastmod: '2026-07-18' },
    { url: '/blog/first-time-bible-study-what-to-expect/', lastmod: '2026-07-18' },
    { url: '/blog/find-right-church-johannesburg/', lastmod: '2026-07-18' },
    { url: '/blog/church-near-me-sandton/', lastmod: '2026-07-18' },
    { url: '/blog/online-church-johannesburg/', lastmod: '2026-07-18' },
    { url: '/blog/christian-community-johannesburg/', lastmod: '2026-07-18' },
    { url: '/blog/ubuntu-and-christianity-south-africa/', lastmod: '2026-07-21' },
    { url: '/blog/load-shedding-bible-study-guide-south-africa/', lastmod: '2026-07-21' },
    { url: '/blog/township-bible-study-soweto-alexandra/', lastmod: '2026-07-21' },
    { url: '/blog/heritage-day-christian-reflection/', lastmod: '2026-07-21' },
    { url: '/blog/multilingual-worship-johannesburg/', lastmod: '2026-07-21' },
    { url: '/blog/jozi-young-professionals-bible-study/', lastmod: '2026-07-21' },
    { url: '/blog/joburg-rainy-season-quiet-time/', lastmod: '2026-07-23' },
    { url: '/blog/reading-bible-second-language-johannesburg/', lastmod: '2026-07-23' },
    { url: '/blog/commuter-prayer-johannesburg-guide/', lastmod: '2026-07-23' },
    { url: '/blog/winter-funerals-south-africa-grief/', lastmod: '2026-07-23' },
    { url: '/blog/mid-year-reset-july-spiritual-check-in/', lastmod: '2026-07-23' },
    { url: '/blog/waiting-on-god-johannesburg-delays/', lastmod: '2026-07-25' },
    { url: '/blog/caring-aging-parents-south-africa/', lastmod: '2026-07-25' },
    { url: '/blog/moving-to-johannesburg-newcomers/', lastmod: '2026-07-25' },
    { url: '/blog/single-adults-faith-johannesburg/', lastmod: '2026-07-25' },
    { url: '/blog/money-stewardship-south-african-christians/', lastmod: '2026-07-25' },
    { url: '/blog/hospital-visit-south-africa-christian/', lastmod: '2026-07-30' },
    { url: '/blog/raising-children-faith-multilingual-south-africa/', lastmod: '2026-07-30' },
    { url: '/blog/forgiveness-south-africa-historical-weight/', lastmod: '2026-07-30' },
    { url: '/blog/discerning-false-teachers-south-africa/', lastmod: '2026-07-30' },
    { url: '/blog/intergenerational-discipleship-south-africa/', lastmod: '2026-07-30' },
  ];

  const allPages = [
    ...staticPages,
    ...seoLandingPages.map((p) => ({ ...p, priority: '0.8', changefreq: 'monthly' })),
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
