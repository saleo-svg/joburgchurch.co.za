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
    url: 'https://example.com',
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
      url: 'https://example.com',
    },
  };
}

/**
 * Returns a BlogPosting schema for a blog article.
 * @param {string} title
 * @param {string} description
 * @param {string} publishDate
 * @param {string} author
 * @returns {object}
 */
export function getBlogPostSchema(title, description, publishDate, author) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished: publishDate,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Johannesburg Bible Study Church',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
    },
  };
}
