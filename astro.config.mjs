import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  redirects: {
    '/events/1': '/events'
  },
  site: "https://example.com",
  integrations: [mdx(), sitemap(), tailwind(), react()]
});