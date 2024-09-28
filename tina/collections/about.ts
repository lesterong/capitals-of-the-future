import type { Collection } from "tinacms";
import { z } from "astro/zod";

const emailValidator = z.string().email();
const urlValidator = z.string().url();

const About: Collection = {
  name: "about",
  label: "About",
  format: "json",
  path: "src/content/about",
  fields: [
    {
      type: "object",
      name: "team",
      label: "Team",
      description:
        "Drag to reorder the team members. The person at the top will display first.",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.name };
        },
      },
      fields: [
        {
          label: "Name",
          name: "name",
          type: "string",
        },
        {
          label: "Image",
          name: "img",
          type: "image",
        },
        {
          label: "Title",
          description: "For example, the current role.",
          name: "title",
          type: "string",
        },
        {
          label: "Description",
          name: "description",
          type: "string",
          ui: {
            component: "textarea",
          },
        },
        {
          type: "string",
          name: "email",
          label: "Email",
          ui: {
            validate: (value) => {
              if (value && !emailValidator.safeParse(value).success) {
                return "Please enter a valid email."
              }
            }
          }
        },
        {
          type: "string",
          name: "website",
          label: "Website",
          ui: {
            validate: (value) => {
              if (value && !urlValidator.safeParse(value).success) {
                return "Please enter a valid website, beginning with https://."
              }
            }
          }
        }
      ],
    },
  ],
};

export default About;