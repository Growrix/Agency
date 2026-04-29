import { defineField, defineType } from "sanity";

export const caseStudyType = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Project Name",
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
      name: "industry",
      title: "Industry",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "servicePage",
      title: "Service Page (Optional)",
      type: "reference",
      to: [{ type: "servicePage" }],
    }),
    defineField({
      name: "serviceSlug",
      title: "Service Slug Fallback",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().min(20),
    }),
    defineField({
      name: "metric",
      title: "Primary Metric",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "accent",
      title: "Accent Gradient",
      type: "string",
      initialValue: "from-teal-500 to-emerald-500",
      validation: (rule) => rule.required(),
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
      name: "heroImage",
      title: "Hero Image (Optional)",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
      ],
    }),
    defineField({
      name: "heroImageAlt",
      title: "Hero Image Alt (Fallback)",
      type: "string",
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
    }),
    defineField({
      name: "team",
      title: "Team",
      type: "string",
    }),
    defineField({
      name: "challenge",
      title: "Challenge",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "strategy",
      title: "Strategy",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "build",
      title: "Build Highlights",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "value", title: "Value", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "hint", title: "Hint (Optional)", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "results",
      title: "Results",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "value", title: "Value", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "hint", title: "Hint (Optional)", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "gallery",
      title: "Gallery (Optional)",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "industry",
      media: "heroImage",
    },
  },
});
