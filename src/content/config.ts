import { defineCollection, z } from "astro:content";

const city = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.array(
      z.object({
        name: z.string(),
        description: z.string(),
        mainImg: image(),
      }),
    ),
});

const event = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      eventDate: z.coerce.date(),
      cities: z.array(z.string()).refine((val) => val.length > 0, {
        message: "At least one city must be selected for an event.",
      }),
      heroImg: image().optional(),
    }),
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

export const collections = { blog, city, event };
