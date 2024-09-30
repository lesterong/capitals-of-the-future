import { defineCollection, z } from "astro:content";

const city = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      cities: z.array(
        z.object({
          name: z.string(),
          description: z.string(),
          mainImg: image(),
          headerImg: image().optional(),
          infoImg: image(),
          lat: z.number(),
          long: z.number(),
        }),
      ),
    })
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
      description: z.string().optional(),
      link: z.string().url(),
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
      link: z.string().url(),
      authors: z.string(),
      institution: z.string(),
      publication: z.string(),
      pubDate: z.coerce.date(),
      cities: z.array(z.string()).refine((val) => val.length > 0, {
        message: "At least one city must be selected for a research paper.",
      }),
      heroImg: image().optional(),
    }),
});

const team = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      team: z.array(
        z.object({
          name: z.string(),
          title: z.string(),
          description: z.string(),
          email: z.string().email().optional(),
          website: z.string().url().optional(),
          img: image(),
        }),
      ),
    })
});

const homepage = defineCollection({
  type: 'data',
  schema: z.object({
    heroTitle: z.string().optional(),
    heroDescription: z.string().optional(),
    joinLines: z.boolean().optional(),
    aboutTitle: z.string().optional(),
    aboutDescription: z.string().optional(),
    cityTitle: z.string().optional()
  })
})

const aboutpage = defineCollection({
  type: 'data',
  schema: z.object({
    heroTitle: z.string().optional(),
    heroDescription: z.string().optional(),
  })
})

const social = defineCollection({
  type: 'data',
  schema: z.object({
    label: z.string().optional(),
    url: z.string().url().optional()
  })
})

export const collections = { city, event, news, team, research, homepage, aboutpage, social };
