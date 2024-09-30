import type { Collection } from "tinacms";
import cities from "../../src/content/city/cities.json";
import { z } from "astro/zod";

const urlValidator = z.string().url();

const Event: Collection = {
  name: "research",
  label: "Research",
  format: "md",
  path: "src/content/research",
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
      name: "authors",
      label: "Authors",
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
      type: "string",
      name: "institution",
      label: "Institution",
      description: "The institution the authors are from.",
      options: ["Capitals of the Future", "Asia Research Institute", "Others"]
    },
    {
      type: "string",
      name: "publication",
      label: "Publication"
    },
    {
      type: "datetime",
      name: "pubDate",
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
      label: "Abstract",
      name: "body",
      isBody: true,
    },
  ],
};

export default Event;
