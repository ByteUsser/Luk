import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { sanityDataset, sanityProjectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/studioStructure";

const projectId = sanityProjectId || "placeholder";

export default defineConfig({
  name: "janiczek_foto",
  title: "Janiczek Foto",
  basePath: "/studio",
  projectId,
  dataset: sanityDataset,
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter((template) => template.schemaType !== "siteContent")
  },
  document: {
    actions: (previous, context) =>
      context.schemaType === "siteContent"
        ? previous.filter((action) => !["delete", "duplicate"].includes(action.action || ""))
        : previous
  }
});
