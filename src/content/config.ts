import { defineCollection, z } from "astro:content";

const city = defineCollection({
  type: "data",
  schema: ({ image }) => z.array(z.object({
    name: z.string(),
    description: z.string(),
    mainImg: image(),
  })),
});

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

export const collections = { blog, city };
