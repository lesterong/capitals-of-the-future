import { defineConfig } from "tinacms";
import City from "./collections/city";
import News from "./collections/news";
import Event from "./collections/event";
import Research from "./collections/research";
import Team from "./collections/team";
import HomePage from "./collections/homepage";
import AboutPage from "./collections/aboutpage";
import Social from "./collections/social";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "cms";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN,
      stopwordLanguages: ['eng'],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "/src/assets",
      publicFolder: "",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [City, Team, Event, Research, News, HomePage, AboutPage, Social],
  },
});