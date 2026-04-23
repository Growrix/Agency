import { defineConfig } from "sanity";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "default",
  title: "Growrix OS CMS",
  projectId: "1tk4ulcx",
  dataset: "production",
  plugins: [visionTool()],
  schema: {
    types: schemaTypes,
  },
});
