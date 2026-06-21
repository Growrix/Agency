export const HERO_TRUST_PILLS = [
  "100+ Ready-Made Templates",
  "Custom Development Available",
  "AI-Powered Business Systems",
  "Built for Startups & Agencies",
] as const;

export const HOME_SERVICES_COPY = {
  eyebrow: "Services",
  title: "Launch faster. Scale smarter.",
  description:
    "Choose the templates you need—or let our experts customize, deploy, and grow them alongside your business.",
} as const;

export const HOME_SERVICE_OUTCOME_DESCRIPTIONS: Record<string, string> = {
  websites: "Launch production-ready digital experiences without months of development.",
  "saas-applications": "Ship revenue-ready SaaS products with auth, billing, and growth systems built in.",
  "mobile-apps": "Turn mobile ideas into credible launch experiences that convert downloads into users.",
  automation: "Eliminate repetitive tasks and free up your team to focus on growth.",
  "technical-seo": "Get discovered faster with search, analytics, and performance tuned from day one.",
  "template-customization": "Go live in days with expert setup—branding, deploy, and integrations handled for you.",
};

export const HOME_TEMPLATES_MARKETPLACE_COPY = {
  eyebrow: "Templates marketplace",
  title: "Launch weeks faster using proven systems.",
  description:
    "Browse category-based business profiles and website templates you can preview, purchase, and launch without starting from scratch.",
} as const;

export const HOME_PREVIEW_COPY = {
  title: "See every experience before you launch.",
  description:
    "Preview desktop and mobile versions side-by-side to ensure your website, portal, or application looks and performs exactly as intended.",
} as const;

export const HOME_DIGITAL_PRODUCTS_CONVERSION_COPY = {
  eyebrow: "Digital products",
  title: "Launch proven digital products in days, not months.",
  description:
    "Ready-made business systems, client portals, directories, dashboards, and niche applications designed to accelerate growth.",
  ctaLabel: "Open full catalog",
} as const;

export const HOME_READY_MADE_SOLUTIONS_COPY = {
  eyebrow: "Ready-made solutions",
  title: "Explore Ready-Made Solutions",
  description:
    "Browse professionally built systems designed to help businesses launch faster, operate smarter, and scale with confidence.",
} as const;

export type ReadyMadeSolutionTab = {
  id: string;
  label: string;
  solutions: Array<{
    title: string;
    description: string;
    href: string;
    imageAlt: string;
    accent: string;
  }>;
};

export const READY_MADE_SOLUTION_TABS: ReadyMadeSolutionTab[] = [
  {
    id: "templates",
    label: "Templates",
    solutions: [
      {
        title: "Website Templates",
        description: "Launch polished marketing sites with live preview before you buy.",
        href: "/digital-products/category/website-templates-html-preview",
        imageAlt: "Website template preview",
        accent: "from-primary/20 to-secondary/10",
      },
      {
        title: "HTML Business Profiles",
        description: "Share a premium mobile-first profile that drives visitors to your main site.",
        href: "/digital-products/category/html-business-profiles",
        imageAlt: "HTML business profile template",
        accent: "from-secondary/20 to-primary/10",
      },
      {
        title: "Starter Bundles",
        description: "Get curated packs built for agencies and founders who need speed.",
        href: "/digital-products/bundles",
        imageAlt: "Digital product bundles",
        accent: "from-primary/15 to-inset",
      },
    ],
  },
  {
    id: "business-systems",
    label: "Business Systems",
    solutions: [
      {
        title: "Operations Dashboard",
        description: "Track leads, tasks, and delivery in one place from day one.",
        href: "/digital-products",
        imageAlt: "Business operations dashboard",
        accent: "from-primary/20 to-inset",
      },
      {
        title: "Growth Toolkit",
        description: "Combine templates, SEO setup, and automation to scale faster.",
        href: "/services/technical-seo",
        imageAlt: "Growth toolkit system",
        accent: "from-secondary/15 to-primary/10",
      },
      {
        title: "Launch Accelerator",
        description: "Move from idea to live product with guided setup and QA.",
        href: "/services/template-customization",
        imageAlt: "Launch accelerator package",
        accent: "from-primary/15 to-secondary/10",
      },
    ],
  },
  {
    id: "client-portals",
    label: "Client Portals",
    solutions: [
      {
        title: "Client Portal",
        description: "Manage clients, files, approvals, and communication from one place.",
        href: "/digital-products",
        imageAlt: "Client portal interface",
        accent: "from-secondary/20 to-primary/10",
      },
      {
        title: "Agency Workspace",
        description: "Deliver projects, share assets, and keep clients aligned without chaos.",
        href: "/services/websites",
        imageAlt: "Agency client workspace",
        accent: "from-primary/20 to-inset",
      },
      {
        title: "Service Delivery Hub",
        description: "Standardize onboarding, updates, and handoffs for recurring clients.",
        href: "/services/automation",
        imageAlt: "Service delivery hub",
        accent: "from-primary/15 to-secondary/10",
      },
    ],
  },
  {
    id: "industry-solutions",
    label: "Industry Solutions",
    solutions: [
      {
        title: "Local Business Launch",
        description: "Convert local traffic with mobile-ready sites and booking flows.",
        href: "/services/websites",
        imageAlt: "Local business website system",
        accent: "from-primary/20 to-secondary/10",
      },
      {
        title: "SaaS Founder Stack",
        description: "Launch MVPs with billing, auth, and product surfaces ready to sell.",
        href: "/services/saas-applications",
        imageAlt: "SaaS founder launch stack",
        accent: "from-secondary/20 to-primary/10",
      },
      {
        title: "Mobile App Launch",
        description: "Pair app store credibility with high-converting launch experiences.",
        href: "/services/mobile-apps",
        imageAlt: "Mobile app launch system",
        accent: "from-primary/15 to-inset",
      },
    ],
  },
];

export const HOME_THREE_PATH_COPY = {
  eyebrow: "Choose your path",
  title: "Choose the way you want to build.",
  description:
    "Whether you want to launch yourself, work alongside experts, or hand everything off, GrowrixOS adapts to your workflow.",
} as const;

export const HOME_THREE_PATH_CARDS = [
  {
    title: "Buy & Launch",
    description: "Perfect for founders and teams who want a fast start.",
    bullets: ["Instant access", "Ready-made templates", "Self implementation"],
    cta: { label: "Explore Templates", href: "/digital-products/category/website-templates-html-preview" },
  },
  {
    title: "Guided Setup",
    description: "Work with experts to launch faster and avoid costly mistakes.",
    bullets: ["Setup support", "Integrations", "Optimization guidance"],
    cta: { label: "Book Consultation", href: "/book-appointment" },
    featured: true,
  },
  {
    title: "Custom Build",
    description: "A complete solution tailored to your business goals.",
    bullets: ["Custom development", "Full implementation", "Ongoing support"],
    cta: { label: "Start Project", href: "/contact?intent=custom_build" },
  },
] as const;

export const HOME_CASE_STUDIES_COPY = {
  eyebrow: "Case studies",
  title: "Proof from launches that moved the needle.",
  description:
    "Real outcomes from product buyers and service clients—launch-ready quality, clear communication, and measurable growth.",
} as const;

export const HOME_OPERATING_SYSTEM_COPY = {
  eyebrow: "Operating system",
  title: "An operating system you can plan launches around.",
  description:
    "Every engagement runs through a clear phase model with explicit outputs, so you always know what ships next.",
} as const;

export const HOME_AI_COPY = {
  eyebrow: "AI Growrix OS",
  title: "Make better decisions and move faster with AI-powered assistance.",
  description:
    "Ask about scope, pricing, product fit, or timelines before you book—then route into the right product or service path.",
} as const;
