import "server-only";

import { FAQ_GENERAL, PROCESS_STEPS, SERVICES } from "@/lib/content";
import { WHATSAPP_HREF } from "@/lib/nav";
import { listPublicPortfolio, listPublicShopProducts } from "@/server/domain/catalog";

export type ConciergeSourceType =
  | "service"
  | "pricing"
  | "faq"
  | "portfolio"
  | "product"
  | "process"
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
    id: "pricing-launch-sprint",
    label: "Launch Sprint pricing",
    sourcePath: "/pricing",
    sourceType: "pricing",
    content:
      "Launch Sprint pricing starts at $9.5k per project for a focused 4-6 week sprint to ship a website, MCP server, or automation system. It includes discovery, design, build, a launch playbook, and 30 days of post-launch support.",
  },
  {
    id: "pricing-product-partner",
    label: "Product Partner pricing",
    sourcePath: "/pricing",
    sourceType: "pricing",
    content:
      "Product Partner pricing starts at $14k per month. It is an embedded studio model for SaaS, websites, and integrations with a dedicated lead, designer, engineer, continuous shipping, quarterly strategy, and stack ownership.",
  },
  {
    id: "pricing-productized",
    label: "Productized offers pricing",
    sourcePath: "/pricing",
    sourceType: "pricing",
    content:
      "Productized offers start from $99 one-time and cover templates, MCP starters, and automation kits with license, updates, setup docs, and optional install help.",
  },
  {
    id: "pricing-service-ranges",
    label: "Service pricing ranges",
    sourcePath: "/pricing",
    sourceType: "pricing",
    content:
      "Typical custom ranges are: SaaS Applications $24k-$180k+, Websites $9.5k-$60k, MCP Servers $249-$45k, Automation $3.5k-$24k. Final pricing is confirmed after a discovery call and written scope.",
  },
  {
    id: "pricing-payment-terms",
    label: "Payment terms",
    sourcePath: "/pricing",
    sourceType: "pricing",
    content:
      "Most engagements use a 30% kickoff deposit with milestone-based payments. Product Partner retainers are monthly. Shop bundles over $1k can be split into 3-month installments via Stripe.",
  },
];

const CONVERSION_DOCUMENTS: KnowledgeDocument[] = [
  {
    id: "contact-paths",
    label: "Contact and escalation paths",
    sourcePath: "/contact",
    sourceType: "contact",
    content:
      `Growrix supports several next steps depending on urgency: use AI Growrix OS for quick pre-sales questions, open WhatsApp at ${WHATSAPP_HREF} for direct messaging, use the contact form for a brief, or book an appointment for a scoped conversation.`,
  },
  {
    id: "booking-path",
    label: "Booking expectations",
    sourcePath: "/book-appointment",
    sourceType: "contact",
    content:
      "Discovery calls are typically 30 minutes. They are used to clarify the business problem, timeline, scope, and next recommendation before a written plan is prepared.",
  },
  {
    id: "privacy-boundary",
    label: "AI privacy boundary",
    sourcePath: "/privacy-policy",
    sourceType: "policy",
    content:
      "The concierge should keep conversations inside Growrix tooling, avoid unsupported claims, and route to a human when a verified answer is not available. Public-model training claims should not be made beyond what is shown in the site experience.",
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
    content: `${project.name} is a ${project.industry} case study under ${project.service}. ${project.summary} Reported outcome: ${project.metric}.`,
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

  return [
    ...serviceDocs,
    ...faqDocs,
    ...portfolioDocs,
    ...processDocs,
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