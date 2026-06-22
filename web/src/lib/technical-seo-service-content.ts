import type { Step } from "@/components/sections/ProcessSteps";
import type { Stat } from "@/components/sections/StatBlock";

export type SeoVisibilityFlow = {
  title: string;
  steps: readonly string[];
};

export type SeoChecklistCard = {
  title: string;
  items: readonly string[];
  variant: "negative" | "positive";
};

export type SeoDeliverableCategory = {
  title: string;
  items: readonly string[];
};

export const TECHNICAL_SEO_SERVICE_STATS: Stat[] = [
  { value: "3–10d", label: "Typical setup", hint: "From audit to verified launch readiness" },
  { value: "100%", label: "Verified tracking", hint: "Indexing, events, and schema tested before handoff" },
  { value: "GA4", label: "Analytics ready", hint: "Property configuration and goal tracking" },
  { value: "Schema", label: "Structured data", hint: "Organization, website, and page-level markup" },
];

export const TECHNICAL_SEO_SERVICE_HERO = {
  headline: "Get discovered, tracked, and optimized from day one.",
  description:
    "Ensure your website is properly indexed, measured, and understood by search engines from the moment it launches.",
  secondaryCta: "View what's included",
  secondaryHref: "#whats-included",
} as const;

export type SeoSetupCategory = {
  id: string;
  title: string;
  badge?: string;
  items: readonly string[];
};

export const TECHNICAL_SEO_SETUP_CATEGORIES_SECTION = {
  id: "setup-categories",
  eyebrow: "Setup categories",
  title: "Get discovered, tracked, and optimized from day one.",
  description:
    "Beyond development, we configure the essential systems that help your product get discovered, tracked, and optimized from the moment it launches.",
  categories: [
    {
      id: "seo-visibility",
      title: "SEO & Visibility Setup",
      badge: "One-Time Services",
      items: [
        "Google Search Console setup & Google Indexing",
        "Sitemap & robots.txt configuration",
        "On-page SEO fundamentals (meta tags, titles, descriptions)",
        "Technical SEO audits and fixes",
        "Page speed and performance optimization",
      ],
    },
    {
      id: "tracking-analytics",
      title: "Tracking & Analytics",
      items: [
        "Meta Pixel (Facebook Pixel) setup",
        "Google Analytics integration",
        "Conversion tracking and event configuration",
      ],
    },
    {
      id: "technical-seo",
      title: "Technical SEO",
      items: [
        "Structured data (schema markup)",
        "URL structure optimization",
        "Core Web Vitals improvements",
        "Indexing and crawlability fixes",
      ],
    },
  ] satisfies SeoSetupCategory[],
  footerNote:
    "These are mostly one-time configurations designed to set a strong foundation for growth. Ongoing SEO, automation, or scaling can be scoped separately when your roadmap requires it.",
} as const;

export const TECHNICAL_SEO_VISIBILITY_SECTION = {
  id: "search-foundation",
  eyebrow: "Search visibility foundation",
  title: "What technical SEO actually fixes.",
  description: "A properly configured website is easier to discover, measure, and improve over time.",
  flow: {
    title: "How Search Visibility Works",
    steps: [
      "Website",
      "Google Crawls",
      "Pages Indexed",
      "Structured Data",
      "Analytics Tracking",
      "Search Visibility",
    ],
  } satisfies SeoVisibilityFlow,
  withoutSetup: {
    title: "Without Proper Setup",
    variant: "negative" as const,
    items: [
      "Pages not indexed",
      "Missing analytics",
      "No schema markup",
      "Poor performance signals",
      "Limited search visibility",
    ],
  },
  withSetup: {
    title: "With Technical SEO Setup",
    variant: "positive" as const,
    items: [
      "Search Console connected",
      "Analytics verified",
      "Schema implemented",
      "Core Web Vitals improved",
      "Search-ready foundation",
    ],
  },
} as const;

export const TECHNICAL_SEO_FOUNDATIONS_SECTION = {
  eyebrow: "What we deliver",
  title: "The technical foundations every website needs.",
  description:
    "Everything required to help search engines understand, index, and measure your website correctly.",
  builds: [
    {
      title: "Search Visibility",
      description: "Ensure search engines can discover and index your content.",
    },
    {
      title: "Accurate Analytics",
      description: "Track visitors, conversions, and user behavior correctly.",
    },
    {
      title: "Structured Data",
      description: "Help search engines understand your content more effectively.",
    },
    {
      title: "Conversion Tracking",
      description: "Capture meaningful business events and goals.",
    },
    {
      title: "Performance Foundations",
      description: "Improve speed, usability, and technical health signals.",
    },
    {
      title: "Launch Readiness",
      description: "Deploy knowing critical SEO systems are properly configured.",
    },
  ],
} as const;

export const TECHNICAL_SEO_WHY_SECTION = {
  eyebrow: "Why technical SEO matters before growth marketing",
  title: "The foundation every marketing effort depends on.",
  description:
    "Technical SEO ensures your website can be discovered, measured, and improved before investing in growth activities.",
  cards: [
    {
      title: "Visibility Before Traffic",
      description:
        "There is little value driving traffic to a website search engines cannot properly understand.",
    },
    {
      title: "Measurement Before Decisions",
      description: "Good marketing decisions require accurate tracking and reliable data.",
    },
    {
      title: "Performance Before Scaling",
      description: "Fix technical issues before increasing marketing investment.",
    },
    {
      title: "Foundation Before Optimization",
      description: "Technical SEO creates the base layer every future marketing activity relies on.",
    },
  ],
} as const;

export const TECHNICAL_SEO_DELIVERABLES_SECTION = {
  id: "whats-included",
  eyebrow: "Deliverables",
  title: "What's included in a Technical SEO setup.",
  description: "A practical checklist covering visibility, measurement, performance, and launch readiness.",
  categories: [
    {
      title: "Search Console",
      items: ["Setup", "Verification", "Sitemap submission", "Index monitoring"],
    },
    {
      title: "Analytics",
      items: ["Google Analytics 4", "Property configuration", "Event tracking", "Goal tracking"],
    },
    {
      title: "Structured Data",
      items: [
        "Organization schema",
        "Website schema",
        "Local business schema",
        "Product schema (where relevant)",
      ],
    },
    {
      title: "Performance",
      items: [
        "Core Web Vitals review",
        "Technical recommendations",
        "Performance analysis",
        "Launch readiness review",
      ],
    },
  ] satisfies SeoDeliverableCategory[],
} as const;

export const TECHNICAL_SEO_PROCESS_SECTION = {
  eyebrow: "Our process",
  title: "How we prepare your website for search visibility.",
  description:
    "A structured implementation process designed to ensure technical readiness before launch or marketing investment.",
  steps: [
    {
      number: "01",
      title: "Technical Audit",
      description: "Review visibility, indexing, analytics, and performance foundations.",
    },
    {
      number: "02",
      title: "Configuration & Setup",
      description: "Implement analytics, Search Console, schema, and supporting technical elements.",
    },
    {
      number: "03",
      title: "Verification & Testing",
      description: "Validate tracking, indexing, events, structured data, and reporting.",
    },
    {
      number: "04",
      title: "Launch Monitoring",
      description: "Confirm everything is functioning correctly after deployment.",
    },
  ] satisfies Step[],
} as const;

export const TECHNICAL_SEO_ENGAGEMENT_SECTION = {
  eyebrow: "Engagement models",
  title: "Choose the technical SEO engagement that fits your project.",
  description:
    "Whether you need a foundational setup or a complete implementation alongside a launch, we'll recommend the most practical path forward.",
  trustNote:
    "Need something different? Scope varies by site size, platform, and existing technical debt. Discovery helps define the right setup path.",
  tiers: [
    {
      name: "SEO Essentials",
      price: "From $750",
      description: "A foundational setup for websites requiring search visibility and measurement readiness.",
      features: [
        "Search Console setup",
        "Sitemap + robots.txt",
        "GA4 property + stream",
        "Core meta tag review",
      ],
      cta: { label: "Book Essentials", href: "/book-appointment" },
    },
    {
      name: "Technical SEO Foundation",
      price: "From $1,500",
      description:
        "A complete technical SEO implementation covering analytics, indexing, schema, and performance readiness.",
      features: [
        "Everything in Essentials",
        "Schema for key templates",
        "Conversion event setup",
        "Core Web Vitals review",
        "Launch verification",
        "Documentation handoff",
      ],
      cta: { label: "Book Foundation", href: "/book-appointment" },
      featured: true,
      badge: "Most popular",
    },
    {
      name: "SEO Launch Bundle",
      price: "Custom Scope",
      description: "Technical SEO implementation delivered alongside website launches and larger digital projects.",
      features: [
        "Parallel with build team",
        "Event map aligned to product",
        "Post-launch monitoring",
        "Handoff workshop",
      ],
      cta: { label: "Discuss Bundle", href: "/book-appointment" },
    },
  ],
} as const;

export const TECHNICAL_SEO_SERVICE_FAQ = [
  {
    question: "Do I need technical SEO if my website is new?",
    answer:
      "Yes. New sites often launch without Search Console, analytics, or schema configured. Setting foundations early prevents invisible indexing gaps and unreliable measurement from day one.",
  },
  {
    question: "Do you work on existing websites?",
    answer:
      "Yes. We audit existing sites for indexing, tracking, schema, and performance issues—then implement fixes without requiring a full rebuild.",
  },
  {
    question: "Is this ongoing SEO?",
    answer:
      "No. This is a one-time technical foundation. Content strategy, link building, and ongoing SEO retainers are separate engagements if you need them later.",
  },
  {
    question: "What is included in Technical SEO?",
    answer:
      "Search Console setup, analytics configuration, structured data, conversion tracking, Core Web Vitals review, and launch verification—scoped to your site and engagement tier.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most engagements complete in 3–10 business days depending on site size, platform access, and existing technical debt.",
  },
  {
    question: "Will this improve rankings immediately?",
    answer:
      "Technical SEO removes barriers to discovery and measurement. Rankings depend on content, competition, and authority—but you cannot optimize what is not indexed or tracked correctly.",
  },
  {
    question: "Do you configure Google Analytics 4 and Search Console?",
    answer:
      "Yes. Both are core deliverables. We verify property ownership, data streams, sitemap submission, and that reporting reflects real user activity.",
  },
  {
    question: "Do you implement schema markup?",
    answer:
      "Yes. We implement organization, website, and page-level schema where relevant—including local business and product markup when applicable.",
  },
  {
    question: "Do you improve Core Web Vitals?",
    answer:
      "We audit LCP, INP, and CLS, identify technical causes, and implement or recommend fixes aligned with your platform and launch timeline.",
  },
  {
    question: "What happens after setup is complete?",
    answer:
      "You receive documentation for every configuration, verified tracking and indexing, and a clear handoff. Optional audits or expansion can be scoped separately.",
  },
] as const;

export const TECHNICAL_SEO_SERVICE_CTA = {
  title: "Let's prepare your website for search visibility.",
  description:
    "Book a discovery session and receive a practical plan covering indexing, analytics, structured data, and technical SEO foundations.",
  primaryLabel: "Book SEO Setup",
  primaryHref: "/book-appointment",
  secondaryLabel: "View What's Included",
  secondaryHref: "#whats-included",
} as const;
