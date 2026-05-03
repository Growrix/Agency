import { defineField, defineType } from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "principles", title: "Principles" },
    { name: "founder", title: "Founder" },
    { name: "process", title: "Process" },
    { name: "team", title: "Team" },
    { name: "beyond", title: "Beyond" },
    { name: "philosophy", title: "Philosophy" },
    { name: "cta", title: "Final CTA" },
  ],
  fields: [
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: true,
      description: "Turn off to hide CMS overrides and use fallback About page copy.",
    }),
    defineField({ name: "heroTitle", title: "Hero Title", type: "string", group: "hero" }),
    defineField({ name: "heroDescription", title: "Hero Description", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "heroQuote", title: "Hero Quote", type: "string", group: "hero" }),

    defineField({
      name: "principles",
      title: "Principles",
      type: "array",
      group: "principles",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3, validation: (rule) => rule.required() }),
          ],
        },
      ],
    }),

    defineField({ name: "founderEyebrow", title: "Founder Section Eyebrow", type: "string", group: "founder" }),
    defineField({ name: "founderTitle", title: "Founder Section Title", type: "string", group: "founder" }),
    defineField({ name: "founderDescription", title: "Founder Section Description", type: "text", rows: 3, group: "founder" }),
    defineField({
      name: "founderCards",
      title: "Founder Cards",
      type: "array",
      group: "founder",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3, validation: (rule) => rule.required() }),
          ],
        },
      ],
    }),

    defineField({ name: "processEyebrow", title: "Process Eyebrow", type: "string", group: "process" }),
    defineField({ name: "processTitle", title: "Process Title", type: "string", group: "process" }),

    defineField({ name: "teamEyebrow", title: "Team Eyebrow", type: "string", group: "team" }),
    defineField({ name: "teamTitle", title: "Team Title", type: "string", group: "team" }),
    defineField({ name: "teamDescription", title: "Team Description", type: "text", rows: 2, group: "team" }),
    defineField({
      name: "teamMembers",
      title: "Team Members",
      type: "array",
      group: "team",
      description: "Admins can add, reorder, and remove members shown in the About page team section.",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "role", title: "Role", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "strength", title: "Strength / Summary", type: "text", rows: 3, validation: (rule) => rule.required() }),
            defineField({
              name: "profileImage",
              title: "Profile Image (Optional)",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({ name: "alt", title: "Alt Text", type: "string" }),
              ],
            }),
          ],
        },
      ],
    }),

    defineField({ name: "beyondEyebrow", title: "Beyond Eyebrow", type: "string", group: "beyond" }),
    defineField({ name: "beyondTitle", title: "Beyond Title", type: "string", group: "beyond" }),
    defineField({ name: "beyondDescription", title: "Beyond Description", type: "text", rows: 3, group: "beyond" }),
    defineField({ name: "partnerBullets", title: "Partner Bullets", type: "array", of: [{ type: "string" }], group: "beyond" }),

    defineField({ name: "philosophyTitle", title: "Philosophy Title", type: "string", group: "philosophy" }),
    defineField({ name: "philosophy", title: "Philosophy Items", type: "array", of: [{ type: "string" }], group: "philosophy" }),

    defineField({ name: "ctaTitle", title: "Final CTA Title", type: "string", group: "cta" }),
    defineField({ name: "ctaPrimaryLabel", title: "Final CTA Primary Label", type: "string", group: "cta" }),
    defineField({ name: "ctaSecondaryLabel", title: "Final CTA Secondary Label", type: "string", group: "cta" }),
  ],
  preview: {
    prepare: () => ({
      title: "About Page",
      subtitle: "Team, founder, and narrative content",
    }),
  },
});
