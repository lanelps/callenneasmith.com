import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { visionTool } from "@sanity/vision";
import { dashboardTool } from "@sanity/dashboard";
import { netlifyWidget } from "sanity-plugin-dashboard-widget-netlify";
import { colorInput } from "@sanity/color-input";

import { schemaTypes } from "./schemas";
import deskStructure from "./deskStructure";

export default defineConfig({
  name: "callenneasmith",
  title: "Callen Neasmith",

  projectId: "4kxh2xwe",
  dataset: "production",

  plugins: [
    structureTool({ structure: deskStructure }),
    ...(process.env.NODE_ENV === "development" ? [visionTool()] : []),
    dashboardTool({
      widgets: [
        netlifyWidget({
          title: "Netlify Deploy",
          sites: [
            {
              title: `Website`,
              apiId: process.env.SANITY_STUDIO_NETLIFY_SITE_ID!,
              buildHookId: process.env.SANITY_STUDIO_NETLIFY_BUILD_HOOK_ID!,
              name: `callenneasmith`,
              url: `https://www.callenneasmith.com`
            }
          ]
        })
      ]
    }),
    colorInput()
  ],

  schema: {
    types: schemaTypes
  }
});
