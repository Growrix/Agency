import { defineField, defineType } from "sanity";

export const servicePageType = defineType({
  name: "servicePage",
  title: "Service Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().min(3),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "short",
      title: "Short Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().min(10),
    }),
    defineField({
      name: "long",
      title: "Long Description",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required().min(20),
    }),
    defineField({
      name: "typical",
      title: "Typical Scope (Optional)",
      type: "string",
    }),
    defineField({
      name: "timeline",
      title: "Delivery Timeline",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pillars",
      title: "Pillars",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "orderRank",
      title: "Order Rank",
      type: "number",
      initialValue: 999,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
});
