import { defineField, defineType } from "sanity";

export const blogPostType = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().min(6),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
      description: "Primary blog image shown in list cards, featured section, and article hero.",
    }),
    defineField({
      name: "mainImageAlt",
      title: "Cover Image Alt Text",
      type: "string",
      validation: (rule) => rule.required().min(8).max(160),
      description: "Accessible alt text for the cover image.",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().min(20).max(240),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "readMinutes",
      title: "Read Minutes",
      type: "number",
      initialValue: 6,
      validation: (rule) => rule.required().min(1).max(60),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Field Notes", value: "Field Notes" },
          { title: "Engineering", value: "Engineering" },
          { title: "Design", value: "Design" },
          { title: "MCP", value: "MCP" },
          { title: "Automation", value: "Automation" },
          { title: "Studio", value: "Studio" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1).max(8),
    }),
    defineField({
      name: "accent",
      title: "Accent Gradient",
      type: "string",
      initialValue: "from-indigo-500 to-violet-600",
      validation: (rule) => rule.required(),
      description: "Tailwind gradient classes, e.g. from-teal-500 to-emerald-500",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "object",
      fields: [
        defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "role", title: "Role", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "bio", title: "Bio", type: "text", rows: 3, validation: (rule) => rule.required() }),
        defineField({
          name: "initials",
          title: "Initials",
          type: "string",
          validation: (rule) => rule.required().min(1).max(3),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "object",
          name: "codeBlock",
          title: "Code Block",
          fields: [
            { name: "language", title: "Language", type: "string", initialValue: "ts" },
            { name: "code", title: "Code", type: "text", rows: 8 },
          ],
          preview: {
            select: { language: "language" },
            prepare: ({ language }) => ({ title: `Code (${language || "text"})` }),
          },
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "comments",
      title: "Comments (Optional)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "id", title: "Comment ID", type: "string" }),
            defineField({ name: "author", title: "Author", type: "string" }),
            defineField({ name: "initials", title: "Initials", type: "string" }),
            defineField({ name: "postedAt", title: "Posted At", type: "date" }),
            defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "mainImage",
    },
  },
});
