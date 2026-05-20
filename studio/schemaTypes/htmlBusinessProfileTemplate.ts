import { defineField, defineType } from "sanity";

const CATEGORY_OPTIONS = [
  { title: "Creative Business", value: "creative-business" },
  { title: "Local Service Business", value: "local-service-business" },
  { title: "Corporate Business", value: "corporate-business" },
] as const;

export const htmlBusinessProfileTemplateType = defineType({
  name: "htmlBusinessProfileTemplate",
  title: "HTML Business Profile Template",
  type: "document",
  groups: [
    { name: "basics", title: "Basics" },
    { name: "classification", title: "Classification" },
    { name: "commerce", title: "Commerce" },
    { name: "preview", title: "Preview" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Template Name",
      type: "string",
      group: "basics",
      validation: (rule) => rule.required().min(3),
    }),
    defineField({
      name: "slug",
      title: "Template Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      group: "basics",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "profileNumber",
      title: "Profile Number",
      type: "number",
      group: "basics",
      description: "Used for ordering and naming consistency (e.g. 1, 2, 3...).",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 4,
      group: "basics",
      validation: (rule) => rule.required().min(12),
    }),
    defineField({
      name: "category",
      title: "Category Label",
      type: "string",
      group: "classification",
      options: {
        list: [
          { title: "Creative Business", value: "Creative Business" },
          { title: "Local Service Business", value: "Local Service Business" },
          { title: "Corporate Business", value: "Corporate Business" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "categorySlug",
      title: "Category Slug",
      type: "string",
      group: "classification",
      options: { list: CATEGORY_OPTIONS.map((option) => ({ title: option.title, value: option.value })) },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: true,
      group: "commerce",
    }),
    defineField({
      name: "price",
      title: "Display Price",
      type: "string",
      initialValue: "$129",
      group: "commerce",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "orderRank",
      title: "Order Rank",
      type: "number",
      initialValue: 100,
      description: "Lower numbers appear earlier in category listings.",
      group: "commerce",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "templateFile",
      title: "HTML Template File",
      type: "file",
      options: {
        accept: ".html,text/html",
      },
      group: "preview",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "previewImage",
      title: "Preview Image (Optional)",
      type: "image",
      options: { hotspot: true },
      group: "preview",
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({
      name: "previewImageAlt",
      title: "Preview Image Alt Fallback",
      type: "string",
      group: "preview",
    }),
    defineField({
      name: "livePreviewUrl",
      title: "Live Preview URL (Optional)",
      type: "url",
      group: "preview",
    }),
    defineField({
      name: "embeddedPreviewUrl",
      title: "Embeddable Preview URL (Optional)",
      type: "url",
      group: "preview",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "previewImage",
    },
    prepare(selection) {
      const subtitle = selection.subtitle ? `${selection.subtitle} template` : "Template";
      return {
        title: selection.title,
        subtitle,
        media: selection.media,
      };
    },
  },
});
