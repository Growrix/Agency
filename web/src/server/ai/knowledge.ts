import "server-only";

import { ADDITIONAL_SERVICES_CATEGORIES, FAQ_GENERAL, PROCESS_STEPS, SERVICES } from "@/lib/content";
import { WHATSAPP_HREF } from "@/lib/nav";
import { listPublicPortfolio, listPublicShopProducts } from "@/server/domain/catalog";

export type ConciergeSourceType =
  | "service"
  | "offering"
  | "pricing"
  | "faq"
  | "portfolio"
  | "product"
  | "process"
  | "additional_service"
  | "contact"
  | "policy";

export type KnowledgeDocument = {
  id: string;
  label: string;
  sourcePath: string;
  sourceType: ConciergeSourceType;
  content: string;
};

const PRICING_DOCUMENTS: KnowledgeDocument[] = [
  {
    id: "pricing-template-packs",
    label: "Template Packs pricing",
    sourcePath: "/pricing",
    sourceType: "pricing",
    content:
      "Template Packs start from $500 one-time. Basic templates: $500–$1k. Standard templates: $1k–$3k. Premium templates: $3k–$10k. All include setup and handoff docs. Browse the shop at /shop.",
  },
  {
    id: "pricing-ready-websites",
    label: "Ready Websites pricing",
    sourcePath: "/pricing",
    sourceType: "pricing",
    content:
      "Ready Websites start from $1k one-time. Basic: $1k–$2.5k. Standard: $2.5k–$5k. Premium: $5k–$15k. Optional install support is available. These are the most chosen offer. Browse at /shop.",
  },
  {
    id: "pricing-html-business-profiles",
    label: "HTML Business Profiles pricing",
    sourcePath: "/shop?category=html-business-profiles",
    sourceType: "pricing",
    content:
      "HTML Business Profiles are category-based digital templates with one-time pricing from $129, with showcase bundles and optional customization upgrades available. Browse previews at /html-business-profiles.",
  },
  {
    id: "pricing-custom-build",
    label: "Custom Build Scope pricing",
    sourcePath: "/pricing",
    sourceType: "pricing",
    content:
      "Custom Build Scope is discovery-based project pricing. It covers SaaS applications, mobile launch systems, and MCP or automation work scoped to your goals. A final quote is provided after discovery. Book a discovery call at /book-appointment.",
  },
  {
    id: "pricing-service-ranges",
    label: "Service pricing ranges",
    sourcePath: "/pricing",
    sourceType: "pricing",
    content:
      "Service pricing ranges: Website Templates $500–$10k (basic $500–$1k, standard $1k–$3k, premium $3k–$10k). HTML Business Profiles from $129 one-time by category with optional customization upgrades. Ready Websites $1k–$15k (basic $1k–$2.5k, standard $2.5k–$5k, premium $5k–$15k). SaaS Applications: custom scope priced after discovery. Mobile App Launch Systems: custom scope. MCP + Automation: secondary scope, priced when they support the core build.",
  },
  {
    id: "pricing-saas-tiers",
    label: "SaaS Applications engagement tiers",
    sourcePath: "/services/saas-applications",
    sourceType: "pricing",
    content:
      "SaaS Applications engagement options: MVP Sprint at $24k per project (8-week sprint with discovery, design system, auth, billing, primary flows, analytics, and launch). Product Partner at $14k per month (embedded lead + designer + engineer, continuous shipping, quarterly strategy, stack ownership). Rebuild Engagement at custom pricing (architecture review, migration plan, phased shipping, knowledge transfer).",
  },
  {
    id: "pricing-mcp-tiers",
    label: "MCP Servers engagement tiers",
    sourcePath: "/services/mcp-servers",
    sourceType: "pricing",
    content:
      "MCP Servers options: Starter MCP at $249 one-time (TypeScript codebase, auth, secrets, example tools, deployment guide). Custom Integration at $8.5k per project (discovery, auth model, tool design, tests, deployment, handoff). Platform Engagement at custom pricing (shared auth layer, tool registry, audit, governance, ongoing support).",
  },
  {
    id: "pricing-automation-tiers",
    label: "Automation engagement tiers",
    sourcePath: "/services/automation",
    sourceType: "pricing",
    content:
      "Automation engagement options: Audit Sprint at $3.5k per project (2-week audit with workflow mapping, cost model, prioritized roadmap, handoff). Implementation at $8k per project (discovery, build, integrations, observability, documentation). Optimization Retainer at $3.2k per month (monthly review, new workflows, failure monitoring, quarterly cost review).",
  },
  {
    id: "pricing-payment-terms",
    label: "Payment terms and support",
    sourcePath: "/pricing",
    sourceType: "pricing",
    content:
      "For qualifying international clients, Growrix does not require an advance payment on the first 100 projects (delivery-first option). Milestone-based or custom payment arrangements are available. Every delivered site includes 1 year of free support and maintenance covering bug fixes, security updates, and minor content updates. Payment plans are available for larger ready-website or custom engagements.",
  },
  {
    id: "pricing-cost-drivers",
    label: "What influences project cost",
    sourcePath: "/pricing",
    sourceType: "pricing",
    content:
      "Key cost drivers: project complexity (number of surfaces, roles, integrations, edge cases), integration count (each external system adds discovery and error-handling work), content readiness (prepared content ships faster), timeline pressure (compressed timelines require parallel workstreams), support expectations (post-launch retainers are separate), and migration effort (replacing existing systems adds data migration and team training).",
  },
];

const CONVERSION_DOCUMENTS: KnowledgeDocument[] = [
  {
    id: "contact-paths",
    label: "Contact and escalation paths",
    sourcePath: "/contact",
    sourceType: "contact",
    content:
      `Growrix supports four contact channels: (1) Inquiry form at /contact — best for website, HTML business profile, SaaS, mobile app, or ready-website briefs that need clear scoping. (2) WhatsApp at ${WHATSAPP_HREF} — best for fast questions about pricing, timelines, and product fit during business hours. (3) AI Growrix OS at /ai-concierge — best for instant answers about websites, HTML profiles, ready websites, SaaS work, and launch timing. (4) Book a call at /book-appointment — best for discovery, scoping, and decision-grade conversations around a real launch plan.`,
  },
  {
    id: "booking-path",
    label: "Booking expectations",
    sourcePath: "/book-appointment",
    sourceType: "contact",
    content:
      "Discovery calls are typically 30 minutes. They are used to clarify the business problem, timeline, scope, and next recommendation. A written plan is prepared within 48 hours after the call. Nothing is signed until the plan reads correctly.",
  },
  {
    id: "privacy-boundary",
    label: "AI privacy boundary",
    sourcePath: "/privacy-policy",
    sourceType: "policy",
    content:
      "The AI Growrix OS concierge answers only from approved internal knowledge about Growrix services, pricing, portfolio, and process. It does not use outside knowledge, does not make unsupported claims, and routes to a human when a verified answer is not available.",
  },
];

const OFFERING_DOCUMENTS: KnowledgeDocument[] = [
  {
    id: "offering-primary-focus",
    label: "Primary offer focus",
    sourcePath: "/",
    sourceType: "offering",
    content:
      "Growrix OS is an independent studio. Primary focus is premium websites, HTML business profiles, SaaS applications, website templates, and ready websites. MCP servers and automation are secondary services scoped when they support the core website, SaaS, or launch engagement. The studio has been operating for 2 years and has shipped 12 launches.",
  },
  {
    id: "offering-shop-structure",
    label: "Shop structure and categories",
    sourcePath: "/shop",
    sourceType: "offering",
    content:
      "The Growrix shop has three main categories: Website Templates (from $500 one-time — basic, standard, premium tiers), HTML Business Profiles (from $129 one-time, category-based templates), and Ready Websites (from $1k one-time — basic, standard, premium tiers). Templates are built with Next.js, React, and Tailwind CSS. Ready websites include TypeScript and optional headless CMS setups in Sanity or Strapi.",
  },
  {
    id: "offering-support-handoff",
    label: "Delivery ownership and support",
    sourcePath: "/faq",
    sourceType: "offering",
    content:
      "On project completion, full ownership of code, design files, and infrastructure transfers to the client. Every delivered site includes 1 year of free support and maintenance covering bug fixes, security updates, and minor content updates. Ongoing packages and growth add-ons are available after that.",
  },
  {
    id: "offering-studio-stats",
    label: "Studio stats and track record",
    sourcePath: "/about",
    sourceType: "offering",
    content:
      "Growrix OS studio stats: 12 launches shipped (websites, SaaS, ready websites), 2 years in motion as an independent studio, 5 core services (websites, HTML business profiles, SaaS, MCP, automation), 4 delivery phases (discovery to optimization). The studio focuses on premium websites, HTML business profile products, SaaS products, mobile app launch experiences, and ready websites.",
  },
  {
    id: "offering-stack",
    label: "Technology stack",
    sourcePath: "/about",
    sourceType: "offering",
    content:
      "Growrix OS uses: Next.js, React, TypeScript, Python, Django, PostgreSQL, Supabase, Stripe, OpenAI, Sanity CMS, Resend, and Vercel as core technologies. For SaaS: also AWS (S3, EC2, Lambda), Docker, CI/CD pipelines, MongoDB, Redis, SendGrid, and GraphQL. For MCP work: Cloudflare Workers, Fly, or custom cloud deployments.",
  },
  {
    id: "offering-no-advance-payment",
    label: "No advance payment option",
    sourcePath: "/pricing",
    sourceType: "offering",
    content:
      "International clients can qualify for delivery-first payment with no advance on the first 100 qualifying projects. This removes financial risk for clients who want to see the work before paying. Milestone-based and custom payment arrangements are also available.",
  },
];

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s]+/g, " ").replace(/\s+/g, " ").trim();
}

function tokenize(text: string) {
  return normalize(text)
    .split(" ")
    .filter((token) => token.length > 2);
}

async function buildDocuments(): Promise<KnowledgeDocument[]> {
  const serviceDocs = SERVICES.map((service) => ({
    id: `service-${service.slug}`,
    label: service.name,
    sourcePath: `/services/${service.slug}`,
    sourceType: "service" as const,
    content: `${service.name}. ${service.short} ${service.long} Typical engagement: ${service.typical}. Typical timeline: ${service.timeline}. Key pillars: ${service.pillars.join(", ")}.`,
  }));

  const faqDocs = FAQ_GENERAL.map((entry, index) => ({
    id: `faq-${index + 1}`,
    label: entry.question,
    sourcePath: "/faq",
    sourceType: "faq" as const,
    content: `${entry.question} ${entry.answer}`,
  }));

  const [portfolio, products] = await Promise.all([listPublicPortfolio(), listPublicShopProducts()]);

  const portfolioDocs = portfolio.map((project) => ({
    id: `portfolio-${project.slug}`,
    label: project.name,
    sourcePath: `/portfolio/${project.slug}`,
    sourceType: "portfolio" as const,
    content: `${project.name} is a ${project.industry} case study under ${project.service}. ${project.summary}${project.metric ? ` Reported outcome: ${project.metric}.` : ""}`,
  }));

  const processDocs = PROCESS_STEPS.map((step) => ({
    id: `process-${step.number}`,
    label: `${step.number} ${step.title}`,
    sourcePath: "/services",
    sourceType: "process" as const,
    content: `${step.title}. ${step.description} Typical timing: ${step.meta}.`,
  }));

  const productDocs = products.map((product) => ({
    id: `product-${product.slug}`,
    label: product.name,
    sourcePath: `/shop/${product.slug}`,
    sourceType: "product" as const,
    content: `${product.name} costs ${product.price} in category ${product.category}. ${product.teaser} ${product.summary} Audience: ${product.audience}. Includes: ${product.includes.join(", ")}. Stack: ${product.stack.join(", ")}.`,
  }));

  const additionalServiceDocs = ADDITIONAL_SERVICES_CATEGORIES.map((category) => ({
    id: `additional-service-${category.id}`,
    label: category.title,
    sourcePath: "/additional-services",
    sourceType: "additional_service" as const,
    content: `${category.title}. ${category.badge ? `${category.badge}. ` : ""}Includes: ${category.items.join(", ")}.`,
  }));

  return [
    ...serviceDocs,
    ...OFFERING_DOCUMENTS,
    ...faqDocs,
    ...portfolioDocs,
    ...processDocs,
    ...additionalServiceDocs,
    ...productDocs,
    ...PRICING_DOCUMENTS,
    ...CONVERSION_DOCUMENTS,
  ];
}

export async function searchKnowledge(query: string, limit = 6) {
  const knowledgeDocuments = await buildDocuments();
  const normalizedQuery = normalize(query);
  const tokens = tokenize(query);

  return knowledgeDocuments
    .map((document) => {
      const normalizedContent = normalize(`${document.label} ${document.content}`);
      let score = 0;

      if (normalizedQuery && normalizedContent.includes(normalizedQuery)) {
        score += 10;
      }

      for (const token of tokens) {
        if (normalizedContent.includes(token)) {
          score += 2;
        }
      }

      if (document.sourceType === "pricing" && tokens.some((token) => ["price", "pricing", "cost", "budget"].includes(token))) {
        score += 4;
      }

      if (
        document.sourceType === "additional_service" &&
        tokens.some((token) => ["seo", "analytics", "tracking", "pixel", "schema", "core", "vitals", "indexing"].includes(token))
      ) {
        score += 4;
      }

      if (
        document.sourceType === "offering" &&
        tokens.some((token) => ["template", "templates", "ready", "website", "websites", "live", "saas", "html", "profile", "profiles"].includes(token))
      ) {
        score += 3;
      }

      if (document.sourceType === "contact" && tokens.some((token) => ["contact", "call", "whatsapp", "book", "booking"].includes(token))) {
        score += 4;
      }

      return { document, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit)
    .map((entry) => entry.document);
}

export function formatKnowledgeForPrompt(documents: KnowledgeDocument[]) {
  return documents
    .map(
      (document, index) =>
        `${index + 1}. [${document.id}] ${document.label} (${document.sourceType}, ${document.sourcePath})\n${document.content}`
    )
    .join("\n\n");
}

export async function listKnowledgeDocuments() {
  return buildDocuments();
}