import type { Collection } from "tinacms";

const AboutPage: Collection = {
  name: "aboutpage",
  label: "About Page",
  format: "json",
  path: "src/content/aboutpage",
  fields: [
    {
      type: "string",
      name: "heroTitle",
      label: "Hero title",
      description: "The text in the first section on the about page.",
    },
    {
      type: "string",
      name: "heroDescription",
      label: "Hero description",
      description: "The text is under the hero title.",
      ui: {
        component: 'textarea'
      }
    }
  ],
};

export default AboutPage;
