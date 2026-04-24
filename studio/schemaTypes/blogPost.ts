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
      name: "scheduledPublishAt",
      title: "Scheduled Publish At (Optional)",
      type: "datetime",
      description:
        "If set to a future time, this post stays hidden on the website until that time.",
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
      name: "categoryRef",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Legacy Category (Optional)",
      type: "string",
      description: "Backward-compat fallback field for older posts.",
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
      name: "authorRef",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Legacy Author (Optional)",
      type: "object",
      description: "Backward-compat fallback for older posts.",
      fields: [
        defineField({ name: "name", title: "Name", type: "string" }),
        defineField({ name: "role", title: "Role", type: "string" }),
        defineField({ name: "bio", title: "Bio", type: "text", rows: 3 }),
        defineField({
          name: "initials",
          title: "Initials",
          type: "string",
          validation: (rule) => rule.min(1).max(3),
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
              validation: (rule) => rule.required().min(8).max(160),
            }),
            defineField({ name: "caption", title: "Caption (Optional)", type: "string" }),
          ],
        },
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
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          validation: (rule) => rule.max(70),
        }),
        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
          validation: (rule) => rule.max(170),
        }),
        defineField({
          name: "ogImage",
          title: "OG Image (Optional)",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "canonicalUrl",
          title: "Canonical URL (Optional)",
          type: "url",
        }),
        defineField({
          name: "noIndex",
          title: "No Index",
          type: "boolean",
          initialValue: false,
        }),
      ],
      options: { collapsible: true, collapsed: true },
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
