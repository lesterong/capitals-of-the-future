import { defineCollection, z, type InferEntrySchema } from "astro:content";

const city = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.array(
      z.object({
        name: z.string(),
        description: z.string(),
        mainImg: image(),
        headerImg: image().optional(),
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
      organisers: z.array(z.string()),
      cities: z.array(z.string()).refine((val) => val.length > 0, {
        message: "At least one city must be selected for an event.",
      }),
      heroImg: image().optional(),
    }),
});

const news = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      newsDate: z.coerce.date(),
      cities: z.array(z.string()).refine((val) => val.length > 0, {
        message: "At least one city must be selected for a news article.",
      }),
      heroImg: image().optional(),
    }),
});

const research = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      abstract: z.string(),
      authors: z.string(),
      publication: z.string(),
      pubDate: z.coerce.date(),
      cities: z.array(z.string()).refine((val) => val.length > 0, {
        message: "At least one city must be selected for a research paper.",
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

export const collections = { blog, city, event, news, research };
