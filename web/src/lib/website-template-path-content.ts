export const WEBSITE_TEMPLATE_CHOOSE_PATH_COPY = {
  title: "Choose Your Path",
  description:
    "Start with the template, let us customize it for your business, or partner with us for a fully tailored website experience.",
  guideTitle: "Quick Buyer Guide",
  paths: [
    {
      id: "standard",
      step: "01",
      title: "Template Only",
      description:
        "You already have the skills or team to customize, deploy, and manage the website yourself.",
      icon: "code-bracket" as const,
    },
    {
      id: "premium",
      step: "02",
      title: "Done-For-You Setup",
      description:
        "You want the website customized, branded, integrated, and deployed without hiring a developer or building from scratch.",
      icon: "sparkles" as const,
      featured: true,
      badge: "Most popular",
    },
    {
      id: "done-for-you",
      step: "03",
      title: "Business Launch",
      description:
        "You need a fully tailored website strategy, custom structure, unlimited pages, ongoing support, and a long-term digital partner.",
      icon: "rocket" as const,
    },
  ],
} as const;
