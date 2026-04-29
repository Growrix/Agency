import { defineField, defineType } from "sanity";

export const shopItemType = defineType({
  name: "shopItem",
  title: "Shop Item",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required().min(3),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category Reference (Optional)",
      type: "reference",
      to: [{ type: "shopCategory" }],
    }),
    defineField({
      name: "categoryLabel",
      title: "Category Label Fallback",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "categorySlug",
      title: "Category Slug",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "typeSlug",
      title: "Type Slug",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "industry",
      title: "Industry",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "industrySlug",
      title: "Industry Slug",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tag",
      title: "Tag (Optional)",
      type: "string",
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "featuredRank",
      title: "Featured Rank",
      type: "number",
      initialValue: 999,
    }),
    defineField({
      name: "rating",
      title: "Rating (Optional)",
      type: "number",
      validation: (rule) => rule.min(0).max(5),
    }),
    defineField({
      name: "reviewCount",
      title: "Review Count (Optional)",
      type: "string",
    }),
    defineField({
      name: "salesCount",
      title: "Sales Count (Optional)",
      type: "string",
    }),
    defineField({
      name: "teaser",
      title: "Teaser",
      type: "string",
      validation: (rule) => rule.required().min(6),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().min(20),
    }),
    defineField({
      name: "audience",
      title: "Audience",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "previewVariant",
      title: "Preview Variant",
      type: "string",
      options: {
        list: [
          { title: "Marketing", value: "marketing" },
          { title: "MCP", value: "mcp" },
          { title: "Dashboard", value: "dashboard" },
          { title: "Automation", value: "automation" },
          { title: "Mobile", value: "mobile" },
          { title: "Booking", value: "booking" },
        ],
      },
      initialValue: "marketing",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "includes",
      title: "Includes",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "stack",
      title: "Stack",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "value", title: "Value", type: "string", validation: (rule) => rule.required() }),
          ],
        },
      ],
    }),
    defineField({
      name: "mainImage",
      title: "Main Image (Optional)",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
      ],
    }),
    defineField({
      name: "mainImageAlt",
      title: "Main Image Alt (Fallback)",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "price",
      media: "mainImage",
    },
  },
});
