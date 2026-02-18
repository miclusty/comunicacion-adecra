import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date(),
    image: z.string().optional(),
    type: z.enum(['post', 'course']).default('post'),
    pdf: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const events = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date(),
    endDate: z.date().optional(),
    image: z.string().optional(),
    location: z.string().optional(),
    pdf: z.string().optional(),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date().optional(),
    slug: z.string().optional(),
  }),
});

export const collections = { blog, events, pages };
