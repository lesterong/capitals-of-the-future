import type { Collection } from "tinacms";
import cities from "../../src/content/city/cities.json";

const Event: Collection = {
  name: "event",
  label: "Events",
  format: "md",
  path: "src/content/event",
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
      type: "datetime",
      name: "eventDate",
      label: "Event date",
    },
    {
      type: "string",
      name: "organisers",
      label: "Orangisers",
      list: true,
      options: ["Asia Research Institute", "Others"]
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

export default Event;
