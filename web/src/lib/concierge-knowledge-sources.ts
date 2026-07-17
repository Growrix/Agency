import { ABOUT_FOUNDER_SECTION, ABOUT_HERO } from "@/lib/about-landing-content";
import { AI_ENGAGEMENT_SECTION, AI_BUSINESS_SYSTEMS_SERVICE_FAQ } from "@/lib/ai-business-systems-service-content";
import { AUTOMATION_ENGAGEMENT_SECTION, AUTOMATION_SERVICE_FAQ } from "@/lib/automation-service-content";
import { HOME_STACK_MARQUEE } from "@/lib/content";
import type { FaqQuestion } from "@/lib/faq-content";
import { FAQ_QUESTIONS, FAQ_QUICK } from "@/lib/faq-content";
import { HOME_THREE_PATH_CARDS } from "@/lib/home-conversion-content";
import {
  INVESTMENT_CLIENT_JOURNEYS,
  INVESTMENT_DELIVERY_COMPARISON,
  INVESTMENT_GUIDE_FAQ,
  INVESTMENT_PROJECT_SCOPING,
  INVESTMENT_SERVICE_RANGES,
  INVESTMENT_STARTING_POINTS,
} from "@/lib/investment-guide-content";
import { MOBILE_ENGAGEMENT_SECTION, MOBILE_APPS_SERVICE_FAQ } from "@/lib/mobile-apps-service-content";
import { THREE_PATH_ROWS } from "@/lib/product-led-content";
import { WEBSITE_TEMPLATE_PREVIEW } from "@/lib/preview-terminology";
import { SAAS_ENGAGEMENT_SECTION, SAAS_SERVICE_FAQ } from "@/lib/saas-applications-service-content";
import { SERVICES_LANDING_HIGHLIGHT_SLUGS } from "@/lib/services-landing-content";
import { TECHNICAL_SEO_ENGAGEMENT_SECTION, TECHNICAL_SEO_SERVICE_FAQ } from "@/lib/technical-seo-service-content";
import { WEBSITES_SERVICE_FAQ } from "@/lib/websites-service-content";

export type ConciergeKnowledgeSourceType =
  | "service"
  | "offering"
  | "pricing"
  | "faq"
  | "portfolio"
  | "product"
  | "process"
  | "additional_service"
  | "contact"
  | "policy"
  | "buyer_path"
  | "marketplace";

export type ConciergeKnowledgeDocument = {
  id: string;
  label: string;
  sourcePath: string;
  sourceType: ConciergeKnowledgeSourceType;
  content: string;
};

export const PUBLIC_SERVICE_SLUGS = SERVICES_LANDING_HIGHLIGHT_SLUGS;

type EngagementTier = {
  name: string;
  price: string;
  description: string;
  timeline?: string;
};

type EngagementSection = {
  tiers: readonly EngagementTier[];
};

type ServiceEngagementConfig = {
  slug: string;
  label: string;
  sourcePath: string;
  section?: EngagementSection;
  faqs: readonly { question: string; answer: string }[];
  rangeNote?: string;
};

const SERVICE_ENGAGEMENT_CONFIG: ServiceEngagementConfig[] = [
  {
    slug: "websites",
    label: "Websites",
    sourcePath: "/services/websites",
    faqs: WEBSITES_SERVICE_FAQ,
    rangeNote: "Typical website investment range: $500 – $15,000+ depending on scope and delivery path.",
  },
  {
    slug: "saas-applications",
    label: "SaaS Applications",
    sourcePath: "/services/saas-applications",
    section: SAAS_ENGAGEMENT_SECTION,
    faqs: SAAS_SERVICE_FAQ,
  },
  {
    slug: "mobile-apps",
    label: "Mobile Apps",
    sourcePath: "/services/mobile-apps",
    section: MOBILE_ENGAGEMENT_SECTION,
    faqs: MOBILE_APPS_SERVICE_FAQ,
  },
  {
    slug: "automation",
    label: "Automation",
    sourcePath: "/services/automation",
    section: AUTOMATION_ENGAGEMENT_SECTION,
    faqs: AUTOMATION_SERVICE_FAQ,
  },
  {
    slug: "technical-seo",
    label: "Technical SEO",
    sourcePath: "/services/technical-seo",
    section: TECHNICAL_SEO_ENGAGEMENT_SECTION,
    faqs: TECHNICAL_SEO_SERVICE_FAQ,
  },
  {
    slug: "ai-business-systems",
    label: "AI Business Systems",
    sourcePath: "/services/ai-business-systems",
    section: AI_ENGAGEMENT_SECTION,
    faqs: AI_BUSINESS_SYSTEMS_SERVICE_FAQ,
  },
];

function formatEngagementTiers(section: EngagementSection) {
  return section.tiers
    .map((tier) => {
      const timeline = tier.timeline ? ` Timeline: ${tier.timeline}.` : "";
      return `${tier.name} at ${tier.price} — ${tier.description}${timeline}`;
    })
    .join(" ");
}

function formatFaqs(faqs: readonly { question: string; answer: string }[], limit = 3) {
  return faqs
    .slice(0, limit)
    .map((entry) => `${entry.question} ${entry.answer}`)
    .join(" ");
}

export function buildInvestmentGuideDocuments(): ConciergeKnowledgeDocument[] {
  const startingPaths = INVESTMENT_STARTING_POINTS.cards
    .map((card) => `${card.title}: ${card.investment}. ${card.description} Best for: ${card.bestFor.join(", ")}.`)
    .join(" ");

  const serviceRanges = INVESTMENT_SERVICE_RANGES.services
    .map((service) => `${service.title}: ${service.investment}. ${service.description}`)
    .join(" ");

  const deliveryComparison = INVESTMENT_DELIVERY_COMPARISON.paths
    .map((path) => `${path.title}: ${path.highlights.join(", ")}.`)
    .join(" ");

  const scopingFactors = INVESTMENT_PROJECT_SCOPING.factors
    .map((factor) => `${factor.question}: ${factor.answer}`)
    .join(" ");

  const clientJourneys = INVESTMENT_CLIENT_JOURNEYS.journeys
    .map((journey) => `${journey.persona}: ${journey.steps.join(" → ")}.`)
    .join(" ");

  const investmentFaq = INVESTMENT_GUIDE_FAQ.map((entry) => `${entry.question} ${entry.answer}`).join(" ");

  return [
    {
      id: "pricing-starting-paths",
      label: "Investment starting paths",
      sourcePath: "/pricing",
      sourceType: "pricing",
      content: `Three starting paths: ${startingPaths} Browse details at /pricing and /digital-products.`,
    },
    {
      id: "pricing-service-ranges",
      label: "Service investment ranges",
      sourcePath: "/pricing",
      sourceType: "pricing",
      content: `${INVESTMENT_SERVICE_RANGES.description} ${serviceRanges}`,
    },
    {
      id: "pricing-delivery-comparison",
      label: "Delivery path comparison",
      sourcePath: "/pricing",
      sourceType: "pricing",
      content: deliveryComparison,
    },
    {
      id: "pricing-cost-drivers",
      label: "What influences project investment",
      sourcePath: "/pricing",
      sourceType: "pricing",
      content: scopingFactors,
    },
    {
      id: "pricing-investment-faq",
      label: "Investment guide FAQ",
      sourcePath: "/pricing",
      sourceType: "faq",
      content: investmentFaq,
    },
    {
      id: "offering-client-journeys",
      label: "Typical client journeys",
      sourcePath: "/pricing",
      sourceType: "buyer_path",
      content: clientJourneys,
    },
  ];
}

export function buildMarketplaceDocuments(): ConciergeKnowledgeDocument[] {
  return [
    {
      id: "pricing-html-business-profiles",
      label: "HTML Business Profiles pricing",
      sourcePath: "/digital-products/category/html-business-profiles",
      sourceType: "pricing",
      content:
        "HTML Business Profiles are category-based digital templates with three purchase tiers: Standard (also called Template Only) at $19, Premium (also called Branded Setup) at $49, and Done-For-You (also called Business Launch) at $299-$799 depending on scope. Browse at /digital-products/category/html-business-profiles.",
    },
    {
      id: "pricing-website-templates-live-preview",
      label: "Website Templates pricing",
      sourcePath: "/digital-products/category/website-templates-html-preview",
      sourceType: "pricing",
      content:
        "Website Templates use three tiers: Standard at $149 (self-serve template download), Premium at $499 (done-for-you setup with branding, content, and core integrations), and Done-For-You at custom pricing for full implementation. Each product includes desktop and mobile website preview. Browse at /digital-products/category/website-templates-html-preview.",
    },
    {
      id: "offering-marketplace-structure",
      label: "Digital products marketplace structure",
      sourcePath: "/digital-products",
      sourceType: "marketplace",
      content:
        `GrowrixOS digital marketplace at /digital-products has two primary catalog lines: HTML Business Profiles and ${WEBSITE_TEMPLATE_PREVIEW.categoryPageTitle}. Every product uses Standard, Premium, and Done-For-You tiers. Additional nav paths include Bundles at /digital-products/bundles and Free Starters at /digital-products/free. Digital products overall start from $15-$399 for self-serve purchases.`,
    },
    {
      id: "pricing-payment-terms",
      label: "Payment terms and support",
      sourcePath: "/pricing",
      sourceType: "pricing",
      content:
        "For qualifying international clients, GrowrixOS offers delivery-first payment with no advance on the first 100 qualifying projects. Milestone-based or custom payment arrangements are available. Every delivered site includes 1 year of free support and maintenance covering bug fixes, security updates, and minor content updates. Payment plans are available for larger custom engagements.",
    },
  ];
}

export function buildBuyerPathDocuments(): ConciergeKnowledgeDocument[] {
  const homePaths = HOME_THREE_PATH_CARDS.map(
    (card) =>
      `${card.title}: ${card.description} Includes ${card.bullets.join(", ")}. Next step: ${card.cta.label} at ${card.cta.href}.`,
  ).join(" ");

  const funnelPaths = THREE_PATH_ROWS.map(
    (row) => `${row.visitor} wanting ${row.want}: ${row.funnel}. CTA: ${row.cta.label} at ${row.cta.href}.`,
  ).join(" ");

  return [
    {
      id: "offering-buyer-paths",
      label: "Three buyer paths",
      sourcePath: "/",
      sourceType: "buyer_path",
      content: homePaths,
    },
    {
      id: "offering-conversion-funnels",
      label: "Visitor conversion funnels",
      sourcePath: "/digital-products",
      sourceType: "buyer_path",
      content: funnelPaths,
    },
  ];
}

export function buildStudioDocuments(): ConciergeKnowledgeDocument[] {
  const stack = HOME_STACK_MARQUEE.join(", ");
  const founderTimeline = ABOUT_FOUNDER_SECTION.timeline
    .map((entry) => `${entry.title} ${entry.description}`)
    .join(" ");

  return [
    {
      id: "offering-positioning",
      label: "GrowrixOS positioning",
      sourcePath: "/",
      sourceType: "offering",
      content: `${ABOUT_HERO.title} ${ABOUT_HERO.description} GrowrixOS is a founder-led product studio combining a digital product marketplace with six core services: websites, SaaS applications, mobile apps, automation, technical SEO, and AI business systems.`,
    },
    {
      id: "offering-founder-studio",
      label: "Founder and studio background",
      sourcePath: "/about",
      sourceType: "offering",
      content: `${ABOUT_FOUNDER_SECTION.founder.name} is the ${ABOUT_FOUNDER_SECTION.founder.role}. ${ABOUT_FOUNDER_SECTION.founder.intro} ${founderTimeline}`,
    },
    {
      id: "offering-stack",
      label: "Technology stack",
      sourcePath: "/about",
      sourceType: "offering",
      content: `GrowrixOS core stack: ${stack}. For SaaS products we also use AWS, Docker, CI/CD, MongoDB, Redis, and GraphQL when the roadmap requires them.`,
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
      id: "offering-no-advance-payment",
      label: "No advance payment option",
      sourcePath: "/pricing",
      sourceType: "offering",
      content:
        "International clients can qualify for delivery-first payment with no advance on the first 100 qualifying projects. Milestone-based and custom payment arrangements are also available.",
    },
  ];
}

export function buildServiceDetailDocuments(): ConciergeKnowledgeDocument[] {
  return SERVICE_ENGAGEMENT_CONFIG.flatMap((config) => {
    const docs: ConciergeKnowledgeDocument[] = [];
    const tierContent = config.section
      ? formatEngagementTiers(config.section)
      : config.rangeNote ?? "";

    if (tierContent) {
      docs.push({
        id: `pricing-${config.slug}-engagement`,
        label: `${config.label} engagement pricing`,
        sourcePath: config.sourcePath,
        sourceType: "pricing",
        content: `${config.label} engagement options: ${tierContent}`,
      });
    }

    docs.push({
      id: `service-detail-${config.slug}-faq`,
      label: `${config.label} common questions`,
      sourcePath: config.sourcePath,
      sourceType: "faq",
      content: formatFaqs(config.faqs, 4),
    });

    return docs;
  });
}

export function buildFaqDocuments(questions: FaqQuestion[] = FAQ_QUESTIONS): ConciergeKnowledgeDocument[] {
  const pageFaqs = questions.map((entry, index) => ({
    id: `faq-page-${index + 1}`,
    label: entry.question,
    sourcePath: "/faq",
    sourceType: "faq" as const,
    content: `${entry.question} ${entry.answer}`,
  }));

  const quickFaqs = FAQ_QUICK.map((entry, index) => ({
    id: `faq-quick-${index + 1}`,
    label: entry.question,
    sourcePath: "/faq",
    sourceType: "faq" as const,
    content: `${entry.question} ${entry.answer}`,
  }));

  return [...pageFaqs, ...quickFaqs];
}

export function buildConversionDocuments(whatsappHref: string): ConciergeKnowledgeDocument[] {
  return [
    {
      id: "contact-paths",
      label: "Contact and escalation paths",
      sourcePath: "/contact",
      sourceType: "contact",
      content: `GrowrixOS supports four contact channels: (1) Inquiry form at /contact — best for website, SaaS, mobile app, automation, or custom build briefs that need clear scoping. (2) WhatsApp at ${whatsappHref} — best for fast questions about pricing, timelines, and product fit during business hours. (3) AI Growrix OS at /ai-concierge — best for instant answers about services, digital products, pricing, and launch timing. (4) Book a call at /book-appointment — best for discovery, scoping, and decision-grade conversations around a real launch plan.`,
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
        "The AI Growrix OS concierge answers only from approved internal knowledge about GrowrixOS services, pricing, portfolio, and process. It does not use outside knowledge, does not make unsupported claims, and routes to a human when a verified answer is not available.",
    },
  ];
}

export function buildStaticKnowledgeDocuments(whatsappHref: string): ConciergeKnowledgeDocument[] {
  return [
    ...buildInvestmentGuideDocuments(),
    ...buildMarketplaceDocuments(),
    ...buildBuyerPathDocuments(),
    ...buildStudioDocuments(),
    ...buildServiceDetailDocuments(),
    ...buildFaqDocuments(),
    ...buildConversionDocuments(whatsappHref),
  ];
}
