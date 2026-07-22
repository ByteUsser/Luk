import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Janiczek Foto")
    .items([
      S.listItem()
        .title("Materiały strony")
        .child(S.document().schemaType("siteContent").documentId("siteContent").title("Materiały strony"))
    ]);
