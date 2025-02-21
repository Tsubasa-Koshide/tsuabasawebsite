// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    slug: z.string(),
  }),
});

export const collections = { projects };
