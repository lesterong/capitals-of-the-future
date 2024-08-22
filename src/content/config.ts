import { defineCollection, z } from "astro:content";

const citySchema = z.object({
  name: z.string(),
  description: z.string(),
});

const city = defineCollection({
  type: "data",
  schema: z.array(citySchema),
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
export type CityProps = z.infer<typeof citySchema>