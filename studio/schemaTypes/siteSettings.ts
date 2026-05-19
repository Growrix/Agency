import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
      initialValue: "Growrix OS Settings",
    }),
    defineField({
      name: "defaultSeoTitle",
      title: "Default SEO Title (Optional)",
      type: "string",
    }),
    defineField({
      name: "defaultSeoDescription",
      title: "Default SEO Description (Optional)",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "defaultSeoTitle",
    },
  },
});
