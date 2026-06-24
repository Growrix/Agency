import { SERVICES, SERVICE_BY_SLUG } from "@/lib/content";
import type { PublicPortfolioRecord } from "@/server/domain/catalog";

export const PORTFOLIO_LANDING_HERO = {
  eyebrow: "Portfolio",
  title: "Real projects. Real business outcomes.",
  titleLead: "Real projects.",
  titleAccent: "Real business outcomes.",
  description:
    "A curated collection of websites, systems, and digital experiences designed to improve visibility, operations, and customer engagement.",
  primaryCta: "Browse Projects",
  primaryHref: "#portfolio-grid",
  secondaryCta: "Book Strategy Call",
  secondaryHref: "/book-appointment",
} as const;

export const PORTFOLIO_HERO_PANEL = {
  featuredEyebrow: "Featured work",
  browseEyebrow: "Browse by capability",
  outcomesEyebrow: "Outcomes we demonstrate",
  outcomes: [
    { label: "Visibility & trust" },
    { label: "Lead generation" },
    { label: "Operational systems" },
  ],
} as const;

/** Service slugs eligible for portfolio filters — MCP excluded. */
export const PORTFOLIO_FILTER_SERVICE_SLUGS = [
  "websites",
  "saas-applications",
  "mobile-apps",
  "automation",
  "technical-seo",
  "ai-business-systems",
] as const;

export type PortfolioFilter = { label: string; value: string };

export function buildPortfolioFilters(projects: PublicPortfolioRecord[]): PortfolioFilter[] {
  const eligibleProjects = projects.filter((project) => project.service !== "mcp-servers");
  const activeSlugs = new Set(eligibleProjects.map((project) => project.service));

  const serviceFilters = PORTFOLIO_FILTER_SERVICE_SLUGS.filter((slug) => activeSlugs.has(slug)).map((slug) => ({
    label: SERVICE_BY_SLUG[slug]?.name ?? SERVICES.find((service) => service.slug === slug)?.name ?? slug,
    value: slug,
  }));

  return [{ label: "All Work", value: "all" }, ...serviceFilters];
}

export function filterPortfolioProjects(projects: PublicPortfolioRecord[]): PublicPortfolioRecord[] {
  return projects.filter((project) => project.service !== "mcp-servers");
}

export const PORTFOLIO_CAPABILITIES_SECTION = {
  eyebrow: "Capabilities",
  title: "The capabilities behind the projects.",
  titleLead: "The capabilities",
  titleAccent: "behind the projects.",
  description:
    "Every project demonstrates a specific business capability designed to support growth, visibility, operations, or customer engagement.",
  items: [
    {
      title: "Lead Generation Websites",
      description: "Designed to convert visitors into qualified enquiries.",
    },
    {
      title: "Service Business Positioning",
      description: "Build trust, credibility, and market presence.",
    },
    {
      title: "Technical SEO Foundations",
      description: "Ensure websites are discoverable and measurable from launch.",
    },
    {
      title: "Conversion-Focused UX",
      description: "Guide users toward meaningful actions.",
    },
    {
      title: "Content Architecture",
      description: "Structure information to support growth and discoverability.",
    },
    {
      title: "Supporting Business Systems",
      description: "Integrate analytics, automation, and operational workflows.",
    },
  ],
} as const;

export const PORTFOLIO_DELIVERY_SECTION = {
  eyebrow: "Delivery approach",
  title: "How projects move from idea to launch.",
  description:
    "Every project follows a structured process designed to reduce risk, improve visibility, and create measurable outcomes.",
  steps: [
    {
      number: "01",
      title: "Discovery",
      description: "Understand business goals, users, and opportunities.",
    },
    {
      number: "02",
      title: "Strategy",
      description: "Define structure, priorities, and implementation approach.",
    },
    {
      number: "03",
      title: "Build",
      description: "Design, development, integrations, and testing.",
    },
    {
      number: "04",
      title: "Launch & Support",
      description: "Deployment, optimization, and ongoing improvement.",
    },
  ],
} as const;

export const PORTFOLIO_LANDING_FAQ = [
  {
    question: "Can you build something similar for my business?",
    answer:
      "Yes. Every project is adapted to your goals, audience, and operational requirements.",
  },
  {
    question: "Do you work with specific industries?",
    answer:
      "No. The principles behind visibility, trust, automation, and conversion apply across industries.",
  },
  {
    question: "Can projects be customized?",
    answer:
      "Absolutely. Existing frameworks, templates, and systems can be adapted to fit your requirements.",
  },
  {
    question: "Do you provide ongoing support?",
    answer: "Yes. Ongoing support, optimization, and growth engagements are available.",
  },
  {
    question: "How long does a project usually take?",
    answer: "Timelines depend on complexity, scope, and required integrations.",
  },
  {
    question: "Can existing websites or systems be improved?",
    answer:
      "Yes. Many engagements start with audits, improvements, or redesigns rather than complete rebuilds.",
  },
] as const;

export const PORTFOLIO_LANDING_CTA = {
  title: "Need something similar for your business?",
  titleLead: "Need something similar",
  titleAccent: "for your business?",
  description:
    "Use these projects as inspiration. We'll adapt the strategy, functionality, and delivery approach to your goals.",
  primaryCta: "Book Strategy Call",
  primaryHref: "/book-appointment",
  secondaryCta: "Discuss Your Project",
  secondaryHref: "/contact",
} as const;
