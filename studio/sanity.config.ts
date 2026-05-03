import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

const DESK_GROUPED_TYPES = new Set([
  "aboutPage",
  "author",
  "category",
  "blogPost",
  "portfolioCategory",
  "caseStudy",
  "shopCategory",
  "shopItem",
]);

function buildDeskStructure(S: Parameters<NonNullable<Parameters<typeof structureTool>[0]>["structure"]>[0]) {
  return S.list()
    .title("Content")
    .items([
      S.listItem().title("About Page").child(S.documentTypeList("aboutPage").title("About Page")),
      S.divider(),
      S.listItem()
        .title("Blog")
        .child(
          S.list()
            .title("Blog")
            .items([
              S.documentTypeListItem("author").title("Author"),
              S.documentTypeListItem("category").title("Category"),
              S.documentTypeListItem("blogPost").title("Blog Post"),
            ]),
        ),
      S.listItem()
        .title("Portfolio")
        .child(
          S.list()
            .title("Portfolio")
            .items([
              S.documentTypeListItem("portfolioCategory").title("Category"),
              S.documentTypeListItem("caseStudy").title("Case Study"),
            ]),
        ),
      S.listItem()
        .title("Shop")
        .child(
          S.list()
            .title("Shop")
            .items([
              S.documentTypeListItem("shopCategory").title("Shop Category"),
              S.documentTypeListItem("shopItem").title("Shop Item"),
            ]),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return !id || !DESK_GROUPED_TYPES.has(id);
      }),
    ]);
}

export default defineConfig({
  name: "default",
  title: "Growrix OS CMS",
  projectId: "1tk4ulcx",
  dataset: "production",
  plugins: [structureTool({ structure: buildDeskStructure }), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
