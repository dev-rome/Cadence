import { defineField, defineType } from "sanity";

export const feature = defineType({
  name: "feature",
  title: "Feature",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "body",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "visual",
      type: "string",
      description: "Which illustration this card renders.",
      options: {
        list: [
          { title: "Routing", value: "routing" },
          { title: "Timeline", value: "timeline" },
          { title: "Status", value: "status" },
          { title: "Postmortem", value: "postmortem" },
          { title: "Integrations", value: "integrations" },
          { title: "Metrics", value: "metrics" },
        ],
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "span",
      title: "Grid span",
      type: "string",
      description:
        "Wide takes 4 columns, standard takes 2. Each row must total 6.",
      options: {
        list: [
          { title: "Wide (4 columns)", value: "wide" },
          { title: "Standard (2 columns)", value: "standard" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Lower numbers appear first.",
      validation: (rule) => rule.required().integer().min(0),
    }),
  ],
  preview: { select: { title: "title", subtitle: "visual" } },
});
