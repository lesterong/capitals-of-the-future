import type { Collection } from "tinacms";

const City: Collection = {
  name: "city",
  label: "City",
  format: "json",
  path: "src/content/city",
  fields: [
    {
      type: "object",
      name: "cities",
      label: "Cities",
      description:
        "Drag to reorder the cities. The city at the top will display first.",
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
          required: true,
        },
        {
          label: "Description",
          name: "description",
          type: "string",
          ui: {
            component: "textarea",
          },
          required: true,
        },
        {
          label: "Main image",
          name: "mainImg",
          description: "This image will be displayed on the landing page.",
          type: "image",
          required: true,
        },
        {
          label: "Header image",
          name: "headerImg",
          description:
            "This image will be displayed at the header of each city's page.",
          type: "image",
          required: true,
        },
        {
          label: "About image",
          name: "infoImg",
          description: "This image will be displayed in the about page.",
          type: "image",
          required: true,
        },
        {
          label: "Latitude",
          name: "lat",
          description:
            "The latitude in degrees to mark on the map for this city.",
          type: "number",
          required: true,
        },
        {
          label: "Longitude",
          name: "long",
          description:
            "The longitude in degrees to mark on the map for this city.",
          type: "number",
          required: true,
        },
      ],
    },
  ],
};

export default City;