/**
 * src/content/config.ts
 *
 * Astro content collection registry.
 *
 * Per Anti-Design-Debt principle #5 (zero hardcoding), every
 * collection that admin can edit through Sveltia is registered
 * here with a Zod schema. The schema is the single source of
 * truth — both the Astro build and the admin UI must agree.
 *
 * Adding a collection: add it in three places:
 *   1. `defineCollection` block below
 *   2. `COLLECTION_BASE` in adapters/local.ts
 *   3. `collections` block in public/admin/config.yml
 */

import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.string().default('Mr. Sim'),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    heroImage: z.string().optional(),
    isHymn: z.boolean().optional(),
    language: z.string().optional(),
    key: z.string().optional(),
    chords: z.string().optional(),
    excerpt: z.string().optional(),
  }),
});

const sermons = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    series: z.string().default('Bible Study'),
    speaker: z.enum(['Mr. Sim', 'Ms. Dora', 'Guest']).default('Mr. Sim'),
    passage: z.string().optional(),
    youtube_id: z.string().optional(),
    duration: z.string().optional(),
    description: z.string(),
    body: z.string().optional(),
  }),
});

const events = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    end_date: z.coerce.date().optional(),
    time: z.string().optional(),
    location: z.string().default('Parkmore, Sandton'),
    address: z.string().optional(),
    category: z.enum(['Bible Study', 'Korean Class', 'Youth', 'Community', 'Special Event']).default('Community'),
    description: z.string(),
    registration_required: z.boolean().default(false),
    image: z.string().optional(),
    body: z.string().optional(),
  }),
});

const gallery = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    photo: z.string().default(''),
    category: z.enum(['Bible Study', 'Korean Class', 'Youth', 'Community', 'Worship', 'Other']).default('Community'),
    caption: z.string().default(''),
    alt: z.string().default(''),
    photographer: z.string().optional(),
  }),
});

const videos = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    youtube_id: z.string().default(''),
    category: z.enum(['Bible Study', 'Sermon', 'Korean Class', 'Youth', 'Teaching', 'Community', 'Testimony']).default('Bible Study'),
    speaker: z.string().optional(),
    passage: z.string().optional(),
    duration: z.string().optional(),
    description: z.string().default(''),
    featured: z.boolean().default(false),
  }),
});

const settings = defineCollection({
  type: 'content',
  schema: z.object({
    church_name: z.string().default('Johannesburg Bible Study Church'),
    tagline: z.string().default(''),
    bible_study_time: z.string().default('Wednesday 7:30pm'),
    korean_class_time: z.string().default('Sunday 2:00pm'),
    phone_sim: z.string().default('+27 77 487 1295'),
    phone_dora: z.string().default('+27 67 442 4461'),
    address: z.string().default('Parkmore, 11th Street, Sandton, 2196 Johannesburg'),
    welcome_message: z.string().default(''),
  }),
});

const hymnSuggestions = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    language: z.string(),
    region: z.string().optional(),
    artist: z.string().optional(),
    key: z.string().optional(),
    chords: z.string().optional(),
    youtube_search: z.string().optional(),
    youtube_id: z.string().optional(),
    lyrics: z.string().optional(),
    notes: z.string().optional(),
    submitted_by: z.string().default('Anonymous'),
    status: z.enum(['pending', 'approved', 'rejected']).default('pending'),
  }),
});

export const collections = {
  posts: blog, // 'posts' is the folder name; we expose it as the blog collection
  sermons,
  events,
  gallery,
  videos,
  settings,
  'hymn-suggestions': hymnSuggestions,
};
