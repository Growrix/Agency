import "server-only";

import {
  buildStaticKnowledgeDocuments,
  PUBLIC_SERVICE_SLUGS,
  type ConciergeKnowledgeDocument,
  type ConciergeKnowledgeSourceType,
} from "@/lib/concierge-knowledge-sources";
import { ADDITIONAL_SERVICES_CATEGORIES, PROCESS_STEPS, SERVICES } from "@/lib/content";
import type { FaqQuestion } from "@/lib/faq-content";
import { FAQ_QUESTIONS } from "@/lib/faq-content";
import { WHATSAPP_HREF } from "@/lib/nav";
import { getProductHref } from "@/lib/shop";
import { listPublicPortfolio, listPublicShopProducts } from "@/server/domain/catalog";
import { listSanityFaqItems } from "@/server/sanity/marketing";

export type ConciergeSourceType = ConciergeKnowledgeSourceType;

export type KnowledgeDocument = ConciergeKnowledgeDocument;

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s]+/g, " ").replace(/\s+/g, " ").trim();
}

function tokenize(text: string) {
  return normalize(text)
    .split(" ")
    .filter((token) => token.length > 2);
}

function formatProductVariants(product: Awaited<ReturnType<typeof listPublicShopProducts>>[number]) {
  if (!product.variants?.length) {
    return `Base price: ${product.price}`;
  }

  return product.variants.map((variant) => `${variant.tier_name}: ${variant.price}`).join("; ");
}

async function resolveFaqQuestions(): Promise<FaqQuestion[]> {
  const cmsItems = await listSanityFaqItems().catch(() => []);
  if (cmsItems.length > 0) {
    return cmsItems.map(({ category, question, answer, featured }) => ({
      category,
      question,
      answer,
      featured,
    }));
  }

  return FAQ_QUESTIONS;
}

async function buildDocuments(): Promise<KnowledgeDocument[]> {
  const publicServices = SERVICES.filter((service) =>
    (PUBLIC_SERVICE_SLUGS as readonly string[]).includes(service.slug),
  );

  const serviceDocs = publicServices.map((service) => ({
    id: `service-${service.slug}`,
    label: service.name,
    sourcePath: `/services/${service.slug}`,
    sourceType: "service" as const,
    content: `${service.name}. ${service.short} ${service.long} Typical engagement: ${service.typical}. Typical timeline: ${service.timeline}. Key pillars: ${service.pillars.join(", ")}.`,
  }));

  const [portfolio, products, faqQuestions] = await Promise.all([
    listPublicPortfolio(),
    listPublicShopProducts(),
    resolveFaqQuestions(),
  ]);

  return composeKnowledgeDocuments({
    serviceDocs,
    portfolio,
    products,
    faqQuestions,
    whatsappHref: WHATSAPP_HREF,
  });
}

export function composeKnowledgeDocuments(input: {
  serviceDocs: KnowledgeDocument[];
  portfolio: Awaited<ReturnType<typeof listPublicPortfolio>>;
  products: Awaited<ReturnType<typeof listPublicShopProducts>>;
  faqQuestions: FaqQuestion[];
  whatsappHref: string;
}): KnowledgeDocument[] {
  const staticDocs = buildStaticKnowledgeDocuments(input.whatsappHref);
  const staticDocsWithoutLegacyFaqs = staticDocs.filter(
    (document) => !document.id.startsWith("faq-page-") && !document.id.startsWith("faq-quick-"),
  );

  const faqDocs = input.faqQuestions.map((entry, index) => ({
    id: `faq-page-${index + 1}`,
    label: entry.question,
    sourcePath: "/faq",
    sourceType: "faq" as const,
    content: `${entry.question} ${entry.answer}`,
  }));

  const portfolioDocs = input.portfolio.map((project) => ({
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

  const productDocs = input.products.map((product) => ({
    id: `product-${product.slug}`,
    label: product.name,
    sourcePath: getProductHref(product),
    sourceType: "product" as const,
    content: `${product.name} in category ${product.category}. Pricing tiers: ${formatProductVariants(product)}. ${product.teaser} ${product.summary} Audience: ${product.audience}. Includes: ${product.includes.join(", ")}. Stack: ${product.stack.join(", ")}.`,
  }));

  const additionalServiceDocs = ADDITIONAL_SERVICES_CATEGORIES.map((category) => ({
    id: `additional-service-${category.id}`,
    label: category.title,
    sourcePath: "/services/technical-seo",
    sourceType: "additional_service" as const,
    content: `${category.title}. ${category.badge ? `${category.badge}. ` : ""}Includes: ${category.items.join(", ")}.`,
  }));

  return [
    ...input.serviceDocs,
    ...staticDocsWithoutLegacyFaqs,
    ...faqDocs,
    ...portfolioDocs,
    ...processDocs,
    ...additionalServiceDocs,
    ...productDocs,
  ];
}

const SERVICE_QUERY_TOKENS: Record<string, string[]> = {
  "ai-business-systems": ["ai", "assistant", "assistants", "knowledge", "llm", "gpt"],
  "mobile-apps": ["mobile", "app", "apps", "ios", "android", "react", "native"],
  "technical-seo": ["seo", "search", "analytics", "indexing", "schema", "vitals", "google"],
};

function scoreDocument(input: {
  document: KnowledgeDocument;
  normalizedQuery: string;
  tokens: string[];
}) {
  const { document, normalizedQuery, tokens } = input;
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
    (document.sourceType === "offering" || document.sourceType === "marketplace") &&
    tokens.some((token) =>
      ["template", "templates", "digital", "product", "products", "website", "websites", "live", "preview", "html", "profile", "profiles", "marketplace", "shop"].includes(token),
    )
  ) {
    score += 3;
  }

  if (
    (document.sourceType === "buyer_path" || document.sourceType === "offering") &&
    tokens.some((token) => ["path", "diy", "setup", "guided", "custom", "launch", "buy"].includes(token))
  ) {
    score += 3;
  }

  if (document.sourceType === "contact" && tokens.some((token) => ["contact", "call", "whatsapp", "book", "booking"].includes(token))) {
    score += 4;
  }

  for (const [slug, keywords] of Object.entries(SERVICE_QUERY_TOKENS)) {
    if (document.id.includes(slug) && tokens.some((token) => keywords.includes(token))) {
      score += 4;
    }
  }

  if (document.id === "service-mcp-servers-secondary" && !tokens.some((token) => ["mcp", "agent", "agents", "tool", "tools"].includes(token))) {
    score -= 6;
  }

  return score;
}

export function searchKnowledgeDocuments(query: string, knowledgeDocuments: KnowledgeDocument[], limit = 8) {
  const normalizedQuery = normalize(query);
  const tokens = tokenize(query);

  return knowledgeDocuments
    .map((document) => ({
      document,
      score: scoreDocument({ document, normalizedQuery, tokens }),
    }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit)
    .map((entry) => entry.document);
}

export async function searchKnowledge(query: string, limit = 8) {
  const knowledgeDocuments = await buildDocuments();
  return searchKnowledgeDocuments(query, knowledgeDocuments, limit);
}

export function formatKnowledgeForPrompt(documents: KnowledgeDocument[]) {
  return documents
    .map(
      (document, index) =>
        `${index + 1}. [${document.id}] ${document.label} (${document.sourceType}, ${document.sourcePath})\n${document.content}`,
    )
    .join("\n\n");
}

export async function listKnowledgeDocuments() {
  return buildDocuments();
}
