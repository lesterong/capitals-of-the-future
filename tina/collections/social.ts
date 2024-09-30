import type { Collection } from "tinacms";
import { z } from "astro/zod";

const urlValidator = z.string().url();

const Social: Collection = {
  name: "social",
  label: "Social Links",
  format: "json",
  path: "src/content/social",
  fields: [
    {
      type: "string",
      name: "label",
      label: "Title of link",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      name: "url",
      label: "Link to social page",
      ui: {
        validate: (value, _) => {
          if (value && !urlValidator.safeParse(value).success) {
            return "Please enter a valid website, beginning with https://."
          }
        }
      }
    },
  ],
};

export default Social;
