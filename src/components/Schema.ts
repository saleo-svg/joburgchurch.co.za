/**
 * JSON-LD Schema helpers for structured data
 */

/**
 * Returns a PlaceOfWorship schema for the church.
 * @param {object} overrides - Partial overrides for the schema fields.
 * @returns {object} Church JSON-LD schema object
 */
export function getChurchSchema(overrides = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'PlaceOfWorship',
    name: 'Johannesburg Bible Study Church',
    description: 'A welcoming Bible study and Christian community in Sandton, Johannesburg. Wednesday online Bible study, Sunday Korean class, spiritual education, and youth programs.',
    url: 'https://joburgchurch.co.za',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Parkmore, 11th Street',
      addressLocality: 'Sandton',
      addressRegion: 'Gauteng',
      postalCode: '2196',
      addressCountry: 'ZA',
    },
    telephone: '+27 77 487 1295',
    sameAs: [],
    ...overrides,
  };
}

/**
 * Returns a Course schema for a community class.
 * @param {string} title
 * @param {string} description
 * @param {string} provider
 * @returns {object}
 */
export function getCourseSchema(title, description, provider) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: title,
    description,
    provider: {
      '@type': 'Organization',
      name: provider,
    },
  };
}

/**
 * Returns an Event schema for a community event.
 * @param {string} title
 * @param {string} description
 * @param {string} startDate
 * @param {string} location
 * @returns {object}
 */
export function getEventSchema(title, description, startDate, location) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: title,
    description,
    startDate,
    location: {
      '@type': 'Place',
      name: location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sandton',
        addressRegion: 'Gauteng',
        postalCode: '2196',
        addressCountry: 'ZA',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'Johannesburg Bible Study Church',
      url: 'https://joburgchurch.co.za',
    },
  };
}

/**
 * Returns an FAQPage schema for FAQ pages.
 * @param {Array<{question: string, answer: string}>} faqs
 * @returns {object}
 */
export function getFaqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Returns a BlogPosting schema for a blog article.
 *
 * The schema is intentionally rich for GEO (Generative Engine
 * Optimisation) — AI engines (ChatGPT, Perplexity, Gemini, Claude)
 * read JSON-LD first, then the body, when ranking citations.
 *
 * @param {string} title
 * @param {string} description
 * @param {string} publishDate
 * @param {string} author
 * @param {string} [slug] - The article slug, used to build the canonical URL.
 * @param {string[]} [tags] - Article tags.
 * @param {string} [heroImage] - URL of the hero image.
 * @returns {object}
 */
export function getBlogPostSchema(
  title: string,
  description: string,
  publishDate: string,
  author: string,
  slug?: string,
  tags?: string[],
  heroImage?: string
) {
  const siteUrl = 'https://joburgchurch.co.za';
  const url = slug ? `${siteUrl}/blog/${slug}/` : siteUrl;
  const authorId = author === 'Ms. Dora' ? `${siteUrl}/#author-ms-dora` : `${siteUrl}/#author-mr-sim`;
  const image = heroImage
    ? (heroImage.startsWith('http') ? heroImage : `${siteUrl}${heroImage}`)
    : `${siteUrl}/images/og-default.svg`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: title,
    description,
    datePublished: publishDate,
    dateModified: publishDate,
    inLanguage: 'en-ZA',
    keywords: (tags || []).join(', '),
    articleSection: 'Christian Living',
    wordCount: 3000,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
    image: {
      '@type': 'ImageObject',
      url: image,
      width: 1200,
      height: 630,
    },
    author: {
      '@type': 'Person',
      '@id': authorId,
      name: author,
      worksFor: { '@id': `${siteUrl}/#organization` },
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Johannesburg Bible Study Church',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/og-default.svg`,
      },
    },
    isPartOf: {
      '@type': 'Blog',
      '@id': `${siteUrl}/blog/#blog`,
      name: 'Johannesburg Bible Study Church Blog',
      url: `${siteUrl}/blog/`,
    },
    about: [
      { '@type': 'Thing', name: 'Christianity' },
      { '@type': 'Thing', name: 'Bible study' },
      { '@type': 'Place', name: 'Johannesburg' },
      { '@type': 'Place', name: 'South Africa' },
    ],
    // Citation to the Bible (the article's primary source). AI engines
    // pick up on `citation` and `isBasedOn` to understand that the
    // article is grounded in a primary text.
    citation: [
      { '@type': 'Book', name: 'The Holy Bible (ESV / NIV)' },
    ],
    isBasedOn: {
      '@type': 'Book',
      name: 'The Holy Bible',
      bookFormat: 'https://schema.org/EBook',
      inLanguage: 'en',
    },
    contentLocation: {
      '@type': 'Place',
      name: 'Johannesburg, South Africa',
      address: { '@type': 'PostalAddress', addressLocality: 'Sandton', addressCountry: 'ZA' },
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', 'blockquote'],
    },
  };
}
