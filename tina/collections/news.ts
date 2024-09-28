import type { Collection } from "tinacms";
import cities from "../../src/content/city/cities.json";
import { z } from "astro/zod";

const urlValidator = z.string().url();

const News: Collection = {
  name: "news",
  label: "News",
  format: "md",
  path: "src/content/news",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      name: "description",
      label: "Description",
      ui: {
        component: 'textarea'
      }
    },
    {
      type: "string",
      name: "link",
      label: "Link",
      ui: {
        validate: (value, _) => {
          if (value && !urlValidator.safeParse(value).success) {
            return "Please enter a valid website, beginning with https://."
          }
        }
      }
    },
    {
      type: "datetime",
      name: "newsDate",
      label: "Publication date",
    },
    {
      type: "image",
      name: "heroImg",
      label: "The main image to display at the top of the article.",
    },
    {
      type: "string",
      name: "cities",
      label: "Cities",
      list: true,
      options: cities.cities.map((city) => city.name),
    },
    {
      type: "rich-text",
      label: "Body",
      name: "body",
      isBody: true,
    },
  ],
};

export default News;
