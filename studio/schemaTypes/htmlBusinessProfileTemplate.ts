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
    { name: "content", title: "Content" },
    { name: "variants", title: "Variants & Offers" },
    { name: "relations", title: "FAQ & Relations" },
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
      group: "content",
      validation: (rule) => rule.required().min(12),
    }),
    defineField({
      name: "teaser",
      title: "Teaser",
      type: "string",
      group: "content",
      validation: (rule) => rule.min(6),
    }),
    defineField({
      name: "audience",
      title: "Audience",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "features",
      title: "Feature Descriptions",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "variants",
      title: "Product Variants (Standard / Premium / Done-For-You)",
      type: "array",
      description: "Optional package tiers for this template.",
      group: "variants",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "slug", title: "Variant Slug", type: "string", validation: (rule) => rule.required() }),
            defineField({
              name: "tierName",
              title: "Tier Name",
              type: "string",
              options: {
                list: [
                  { title: "Standard", value: "Standard" },
                  { title: "Premium", value: "Premium" },
                  { title: "Done-For-You", value: "Done-For-You" },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "title", title: "Package Title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "price", title: "Package Price", type: "string", validation: (rule) => rule.required() }),
            defineField({
              name: "fulfillmentType",
              title: "Fulfillment Type",
              type: "string",
              options: {
                list: [
                  { title: "Digital Download", value: "digital_download" },
                  { title: "Hybrid Support", value: "hybrid_support" },
                  { title: "Done For You Service", value: "done_for_you_service" },
                ],
              },
              initialValue: "digital_download",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "includes",
              title: "Includes",
              type: "array",
              of: [{ type: "string" }],
              validation: (rule) => rule.required().min(1),
            }),
            defineField({ name: "comparisonPoints", title: "Comparison Points (Optional)", type: "array", of: [{ type: "string" }] }),
            defineField({ name: "recommended", title: "Recommended Tier", type: "boolean", initialValue: false }),
          ],
        },
      ],
    }),
    defineField({
      name: "customizationUpsells",
      title: "Customization Upsells",
      type: "array",
      group: "variants",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3, validation: (rule) => rule.required().min(12) }),
            defineField({ name: "ctaLabel", title: "CTA Label", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "ctaHref", title: "CTA URL", type: "string", validation: (rule) => rule.required() }),
          ],
        },
      ],
    }),
    defineField({
      name: "faqs",
      title: "Product FAQ",
      type: "array",
      group: "relations",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", title: "Question", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "answer", title: "Answer", type: "text", rows: 3, validation: (rule) => rule.required() }),
          ],
        },
      ],
    }),
    defineField({
      name: "relatedProductSlugs",
      title: "Related Product Slugs",
      type: "array",
      group: "relations",
      of: [{ type: "string" }],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "relatedServiceSlugs",
      title: "Related Service Slugs",
      type: "array",
      group: "relations",
      of: [{ type: "string" }],
      validation: (rule) => rule.max(6),
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
