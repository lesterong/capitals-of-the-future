import type { Collection } from "tinacms";

const HomePage: Collection = {
  name: "homepage",
  label: "Home Page",
  format: "json",
  path: "src/content/homepage",
  fields: [
    {
      type: "string",
      name: "heroTitle",
      label: "Hero title",
      description: "The text that is displayed over the map on the home page.",
    },
    {
      type: "string",
      name: "heroDescription",
      label: "Hero description",
      description: "The text that is under the hero title.",
    },
    {
      type: 'boolean',
      name: 'joinLines',
      label: 'Join lines',
      description: 'Enable or disable the lines between cities on the map.'
    },
    {
      type: "string",
      name: "aboutTitle",
      label: "About title",
      description: "The title for the first section, under the map.",
    },
    {
      type: "string",
      name: "aboutDescription",
      label: "About description",
      description: "The description under the About title.",
      ui: {
        component: 'textarea'
      }
    },
  ],
};

export default HomePage;
