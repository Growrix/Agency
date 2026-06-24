export const SERVICES_LANDING_HERO = {
  eyebrow: "GrowrixOS services",
  title: "Choose the right path to launch, grow, or optimize your business.",
  headlineLead: "Choose the right path to",
  headlineAccent: "launch, grow, or optimize.",
  description:
    "Whether you need a website, SaaS platform, mobile app, automation system, technical SEO foundation, or AI implementation, we'll help you choose the right solution for your goals.",
  primaryCta: "Book Strategy Call",
  primaryHref: "/book-appointment",
  secondaryCta: "Compare Services",
  secondaryHref: "#compare",
} as const;

/** Primary services shown on the landing grid, in display order. */
export const SERVICES_LANDING_HIGHLIGHT_SLUGS = [
  "websites",
  "saas-applications",
  "mobile-apps",
  "automation",
  "technical-seo",
  "ai-business-systems",
] as const;

export const SERVICES_LANDING_INTRO = {
  eyebrow: "Services",
  title: "Choose the capability that matches your goal.",
  titleLead: "Choose the capability",
  titleAccent: "that matches your goal.",
  description:
    "Each service supports a different stage of digital growth—from launching your first website to implementing AI-powered business systems.",
} as const;

export type ServiceEcosystemLink = {
  toSlug: string;
  label: string;
  /** Screen-reader context only — not shown in the compact hero visual. */
  hint?: string;
};

export const SERVICES_HERO_ECOSYSTEM = {
  hub: {
    label: "Website",
    href: "/services/websites",
  },
} as const;

export const SERVICES_HERO_ECOSYSTEM_LINKS: ServiceEcosystemLink[] = [
  {
    toSlug: "technical-seo",
    label: "Technical SEO",
    hint: "Visible, measurable, and search-ready from day one",
  },
  {
    toSlug: "automation",
    label: "Automation",
    hint: "Remove repetitive work across sales, ops, and support",
  },
  {
    toSlug: "ai-business-systems",
    label: "AI Business Systems",
    hint: "Assistants, knowledge systems, and practical AI workflows",
  },
  {
    toSlug: "mobile-apps",
    label: "Mobile App",
    hint: "Companion apps and store-ready mobile experiences",
  },
  {
    toSlug: "saas-applications",
    label: "SaaS Platform",
    hint: "Product platforms with auth, billing, and dashboards",
  },
];

export const SERVICES_ECOSYSTEM_SECTION = {
  eyebrow: "Service ecosystem",
  title: "Most projects combine multiple services.",
  titleLead: "Most projects combine",
  titleAccent: "multiple services.",
  description:
    "The best results often come from combining complementary services rather than treating each initiative separately.",
  combinations: [
    {
      title: "Website + Technical SEO",
      description: "Launch visible, measurable, and search-ready from day one.",
    },
    {
      title: "Website + Automation",
      description: "Reduce manual work and streamline operations.",
    },
    {
      title: "SaaS + Mobile App",
      description: "Extend products across platforms and user experiences.",
    },
    {
      title: "Automation + AI Business Systems",
      description: "Create intelligent workflows that save time and improve consistency.",
    },
    {
      title: "Website + AI Business Systems",
      description: "Improve customer support, content workflows, and internal productivity.",
    },
    {
      title: "Full Product Ecosystem",
      description: "Websites, SaaS, automation, AI, and supporting systems working together.",
    },
  ],
} as const;

export const SERVICES_DELIVERY_FRAMEWORK = {
  eyebrow: "Delivery framework",
  title: "A consistent delivery framework across every service.",
  description:
    "Every project follows a structured process designed to reduce risk, improve visibility, and deliver measurable outcomes.",
} as const;

export const SERVICES_SUPPORTING_SYSTEMS = {
  eyebrow: "Stack and integrations",
  title: "The surrounding systems matter as much as the page or app itself.",
  areas: [
    {
      title: "Digital Experience Systems",
      detail:
        "Next.js, design systems, responsive UI, motion, accessibility, and high-conversion page architecture.",
    },
    {
      title: "Product Platforms",
      detail:
        "Typed APIs, auth, billing, dashboards, CMS, databases, and the product infrastructure behind real launches.",
    },
    {
      title: "Operational Intelligence",
      detail:
        "AI assistants, knowledge systems, retrieval workflows, approvals, and traceable automations when operations need leverage.",
    },
    {
      title: "Revenue & Conversion Systems",
      detail:
        "Stripe, booking, analytics, SEO foundations, experimentation, CRM, and lifecycle integration.",
    },
  ],
} as const;

export const SERVICE_PORTFOLIO_TAG_LABELS: Record<string, string> = {
  websites: "Website",
  "saas-applications": "SaaS",
  "mobile-apps": "Mobile",
  automation: "Automation",
  "technical-seo": "Technical SEO",
  "ai-business-systems": "AI Business Systems",
  "html-business-profiles": "Business Profile",
};

export const SERVICES_LANDING_FAQ = [
  {
    question: "Which service is right for my business?",
    answer:
      "It depends on your primary goal: launch a credible web presence (Websites), ship a product (SaaS or Mobile), remove manual work (Automation), establish search and measurement foundations (Technical SEO), or implement AI where it creates value (AI Business Systems). A strategy call helps map the right starting point.",
  },
  {
    question: "What's the difference between a website and a SaaS application?",
    answer:
      "A website focuses on marketing, conversion, and content surfaces. A SaaS application is a product with accounts, data, billing, and ongoing feature delivery. Many founders start with a website and evolve into SaaS when the product roadmap requires it.",
  },
  {
    question: "Can I combine multiple services?",
    answer:
      "Yes. Most engagements combine complementary services—such as Website + Technical SEO, Website + Automation, or SaaS + Mobile App—for faster launches and stronger operational foundations.",
  },
  {
    question: "Do projects usually start with a website?",
    answer:
      "Often, but not always. Founders building a product may start with SaaS or Mobile. Service businesses frequently start with Websites plus Technical SEO. We recommend the path that matches your immediate bottleneck and growth stage.",
  },
  {
    question: "Can automation be added later?",
    answer:
      "Yes. Automation and AI systems are commonly phased in after core product or website launch, once workflows, data sources, and team processes are clear enough to automate reliably.",
  },
  {
    question: "Where do AI Business Systems fit?",
    answer:
      "AI Business Systems fit where language, classification, knowledge retrieval, or content workflows create measurable leverage—support, sales assistance, internal knowledge, reporting, and operational assistants embedded in existing tools.",
  },
  {
    question: "How do projects usually begin?",
    answer:
      "With a strategy or discovery session to clarify goals, constraints, and the right service mix. You receive a practical recommendation—not a generic pitch—before any build commitment.",
  },
  {
    question: "Do I need Technical SEO if I'm launching a new website?",
    answer:
      "Usually yes. New sites often launch without Search Console, analytics, schema, or verified tracking configured. Technical SEO establishes the foundation so you can measure and improve from day one.",
  },
  {
    question: "Can GrowrixOS support long-term growth?",
    answer:
      "Yes. Engagements can scale from one-time foundations to ongoing product partnership, automation optimization, and AI operations support as your business grows.",
  },
  {
    question: "What happens after launch?",
    answer:
      "You receive documentation, verified handoff, and optional support paths—CRO and CMS iteration for websites, roadmap releases for SaaS, monitoring for automation, or expansion scopes for AI systems.",
  },
] as const;

export const SERVICES_LANDING_CTA = {
  title: "Not sure which service fits your project?",
  description:
    "Book a strategy session and we'll help identify the right combination of services, timelines, and delivery approach based on your goals.",
  primaryLabel: "Book Strategy Call",
  primaryHref: "/book-appointment",
  secondaryLabel: "View Service Comparison",
  secondaryHref: "#compare",
} as const;
