import { defineField, defineType } from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "About Team Section",
  type: "document",
  fields: [
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: true,
      description: "Turn off to use fallback frontend team copy.",
    }),
    defineField({
      name: "teamEyebrow",
      title: "Team Eyebrow",
      type: "string",
      description: "Small section label above the heading.",
    }),
    defineField({
      name: "teamTitle",
      title: "Team Title",
      type: "string",
      description: "Main heading for the team section.",
    }),
    defineField({
      name: "teamDescription",
      title: "Team Description",
      type: "text",
      rows: 2,
      description: "Short supporting description under the team heading.",
    }),
    defineField({
      name: "teamMembers",
      title: "Team Members",
      type: "array",
      description: "Add, edit, reorder, or remove team members shown in the About page team grid.",
      validation: (rule) => rule.min(1),
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "role",
              title: "Role",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "strength",
              title: "Strength / Summary",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "profileImage",
              title: "Team Member Photo",
              type: "image",
              options: { hotspot: true },
              description: "Upload profile photo for this team member.",
              fields: [
                defineField({ name: "alt", title: "Photo Alt Text", type: "string" }),
              ],
            }),
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "role",
              media: "profileImage",
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({
      title: "About Team Section",
      subtitle: "Manage team members shown on /about",
    }),
  },
});
