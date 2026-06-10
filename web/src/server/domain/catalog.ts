import "server-only";

import { SERVICES } from "@/lib/content";
import {
  HTML_BUSINESS_PROFILE_TEMPLATES,
  HTML_BUSINESS_PROFILE_SHOP_CATEGORY,
  getHtmlBusinessProfilePreviewUrl,
} from "@/lib/html-business-profiles";
import { getProductTypeDefinition, PRODUCT_PARENT_CATEGORY_LABELS } from "@/lib/product-taxonomy";
import { isReservedProductRouteSlug } from "@/lib/shop";
import type {
  ManagedPortfolioRecord,
  ManagedProductRecord,
  ManagedServiceRecord,
} from "@/server/data/schema";
import { readDatabase, writeDatabase } from "@/server/data/store";
import {
  getSanityServicePageBySlug,
  listSanityCaseStudies,
  listSanityHtmlBusinessProfileTemplates,
  listSanityServicePages,
  listSanityShopItems,
} from "@/server/sanity/catalog";
import {
  deleteSanityCaseStudy,
  deleteSanityHtmlBusinessProfileTemplate,
  deleteSanityServicePage,
  deleteSanityShopItem,
  upsertSanityCaseStudy,
  upsertSanityHtmlBusinessProfileTemplate,
  upsertSanityServicePage,
  upsertSanityShopItem,
} from "@/server/sanity/management";

export type PublicServiceRecord = ManagedServiceRecord;

export type PublicPortfolioRecord = Omit<ManagedPortfolioRecord, "detail">;

export type PublicPortfolioDetailRecord = ManagedPortfolioRecord;

export type PublicShopCategoryRecord = {
  slug: string;
  name: string;
  product_count: number;
};

export type PublicShopProductRecord = ManagedProductRecord & { price_cents: number };

/**
 * Hybrid publishing contract (intentional):
 * 1) CMS content is always included when published.
 * 2) Local fallback products are included only from explicitly curated seed sets.
 * 3) Placeholder/legacy mock records are filtered before public exposure.
 * 4) Canonical product detail paths stay flat at /products/[slug].
 *    Reserved slug segments are blocked to avoid route collisions.
 */
const FALLBACK_CATALOG_POLICY = {
  includeHtmlBusinessProfiles: true,
  includeAnchorProducts: true,
  includeHtmlEmailPacks: true,
} as const;

const LEGACY_MOCK_PORTFOLIO_SLUGS = new Set([
  "lumora-studio",
  "tideline-health",
  "helix-research-portal",
  "glasswing-onboarding",
  "northcrest-mcp",
  "beacon-route-engine",
]);

const LEGACY_MOCK_PRODUCT_SLUGS = new Set([
  "atelier-marketing-theme",
  "operator-dashboard-kit",
  "mobile-app-landing-pack",
  "booking-stripe-bundle",
  "new-product",
]);

const LEGACY_MOCK_PORTFOLIO_PLACEHOLDER_SLUGS = new Set(["new-project"]);
const PRODUCT_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isLikelyPlaceholderUrl(value: string | undefined) {
  if (!value) {
    return false;
  }

  return /demo\.example\.com|project\.example\.com/i.test(value);
}

function isPlaceholderProduct(product: ManagedProductRecord) {
  if (LEGACY_MOCK_PRODUCT_SLUGS.has(product.slug)) {
    return true;
  }

  if (isLikelyPlaceholderUrl(product.livePreviewUrl) || isLikelyPlaceholderUrl(product.embeddedPreviewUrl)) {
    return true;
  }

  return (
    product.name.trim().toLowerCase() === "new product" &&
    product.summary.trim().toLowerCase() === "product summary"
  );
}

function isPlaceholderPortfolioProject(project: ManagedPortfolioRecord) {
  if (LEGACY_MOCK_PORTFOLIO_PLACEHOLDER_SLUGS.has(project.slug)) {
    return true;
  }

  if (isLikelyPlaceholderUrl(project.livePreviewUrl) || isLikelyPlaceholderUrl(project.embeddedPreviewUrl)) {
    return true;
  }

  return project.name.trim().toLowerCase() === "new project";
}

function parseUsdPriceToCents(price: string) {
  const normalized = price.replace(/[^\d.]/g, "");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? Math.round(parsed * 100) : 0;
}

function toHtmlProductSlug(slug: string) {
  return slug.startsWith("html-business-profile-") ? slug : `html-business-profile-${slug}`;
}

function toSanityHtmlTemplateSlug(slug: string) {
  return slug.replace(/^html-business-profile-/, "");
}

function normalizeProductSlug(slug: string) {
  return slug.trim().toLowerCase();
}

function toPublicProductSlug(product: Pick<ManagedProductRecord, "slug" | "categorySlug">) {
  return product.categorySlug === HTML_BUSINESS_PROFILE_SHOP_CATEGORY.slug
    ? toHtmlProductSlug(product.slug)
    : product.slug;
}

function withParentTaxonomy(product: ManagedProductRecord): ManagedProductRecord {
  const typeDefinition = getProductTypeDefinition(product.typeSlug);
  if (!typeDefinition) {
    return product;
  }

  return {
    ...product,
    parentCategorySlug: typeDefinition.parentCategorySlug,
    parentCategoryLabel: PRODUCT_PARENT_CATEGORY_LABELS[typeDefinition.parentCategorySlug],
  };
}

function getDefaultHtmlBusinessProfileProducts(): ManagedProductRecord[] {
  return HTML_BUSINESS_PROFILE_TEMPLATES.map<ManagedProductRecord>((template) => {
    const previewUrl = getHtmlBusinessProfilePreviewUrl(template.slug);

    return {
      slug: template.slug,
      name: template.title,
      price: "$19",
      livePreviewUrl: previewUrl,
      embeddedPreviewUrl: previewUrl,
      parentCategoryLabel: PRODUCT_PARENT_CATEGORY_LABELS["business-professional"],
      parentCategorySlug: "business-professional",
      category: HTML_BUSINESS_PROFILE_SHOP_CATEGORY.label,
      categorySlug: HTML_BUSINESS_PROFILE_SHOP_CATEGORY.slug,
      type: template.categoryLabel,
      typeSlug: template.categorySlug,
      industry: template.categoryLabel,
      industrySlug: template.categorySlug,
      tag: template.tag,
      published: true,
      teaser: template.teaser,
      summary: template.summary,
      audience: template.audience,
      features: [
        "Responsive one-page profile structure",
        "Fast launch-ready content sections",
        "Clean conversion-focused CTA flow",
      ],
      previewVariant: "marketing",
      includes: ["HTML template files", "Launch-ready sections"],
      inScope: ["Template files", "Responsive layout", "Basic launch structure"],
      outOfScope: ["Custom branding implementation", "Deployment and integrations"],
      enhancementPlan: ["Add brand assets", "Enable analytics and form integration", "Scale to multi-page setup"],
      stack: ["HTML5", "CSS3", "JavaScript"],
      variants: [
        {
          slug: "standard",
          tier_name: "Standard",
          title: `${template.title} Standard`,
          price: "$19",
          fulfillment_type: "digital_download",
          includes: ["1-page HTML template", "Responsive baseline", "Basic docs"],
          comparison_points: ["Single template", "Basic docs"],
          recommended: true,
        },
        {
          slug: "premium",
          tier_name: "Premium",
          title: `${template.title} Premium`,
          price: "$49",
          fulfillment_type: "hybrid_support",
          includes: ["3-5 sections", "Color variants", "Contact form UI", "SEO meta setup"],
          comparison_points: ["Extended sections", "Color variants", "SEO meta setup"],
        },
        {
          slug: "done-for-you",
          tier_name: "Done-For-You",
          title: `${template.title} Done-For-You`,
          price: "$299-$799",
          fulfillment_type: "done_for_you_service",
          includes: ["Custom branding", "Deployment", "Contact form integration"],
          comparison_points: ["Custom branding", "Deployment support", "Integration setup"],
        },
      ],
      highlights: template.profileNumber === null
        ? [{ label: "Collection", value: "Showcase" }]
        : [{ label: "Profile", value: `#${template.profileNumber}` }],
      image: null,
      gallery: [],
    };
  }).map(withParentTaxonomy);
}

function getDefaultAnchorProducts(): ManagedProductRecord[] {
  return ([
    {
      slug: "saas-launchpad-nextjs",
      name: "SaaS Launchpad Next.js Starter",
      price: "$99",
      category: "SaaS Templates",
      categorySlug: "saas-templates",
      type: "Next.js Starter",
      typeSlug: "nextjs-starter",
      industry: "SaaS",
      industrySlug: "saas",
      tag: "Popular",
      published: true,
      teaser: "Ship a SaaS-ready marketing + app shell without rebuilding auth and billing scaffolds.",
      summary:
        "A production-oriented Next.js starter for SaaS founders who need a credible launch baseline with upgrade paths.",
      audience: "Early-stage SaaS founders and product teams",
      previewVariant: "dashboard",
      includes: ["Starter codebase", "Auth-ready structure", "Pricing and checkout UI", "Launch docs"],
      inScope: ["Core app shell", "Starter authentication flows", "Base pricing + plan UI"],
      outOfScope: ["Custom product features", "Complex migrations", "Enterprise SSO"],
      enhancementPlan: ["Add subscriptions", "Expand role permissions", "Enable analytics events"],
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe-ready UI"],
      highlights: [
        { label: "Pages", value: "16+" },
        { label: "Tier", value: "Starter" },
        { label: "Delivery", value: "Instant" },
      ],
      image: null,
      gallery: [],
      features: [
        "Marketing hero and conversion sections",
        "Pricing and plan comparison blocks",
        "Dashboard shell and account routes",
        "Launch checklist and environment guide",
      ],
      variants: [
        {
          slug: "standard",
          tier_name: "Standard",
          title: "SaaS Launchpad Standard",
          price: "$99",
          fulfillment_type: "digital_download",
          includes: ["Starter codebase", "Base docs", "Single-brand setup guidance"],
          comparison_points: ["Core starter", "Docs", "Single-brand usage"],
          recommended: true,
        },
        {
          slug: "premium",
          tier_name: "Premium",
          title: "SaaS Launchpad Premium",
          price: "$249",
          fulfillment_type: "hybrid_support",
          includes: ["Everything in Standard", "Extra sections", "Priority support", "Update pack"],
          comparison_points: ["Priority support", "Additional sections", "Update pack"],
        },
        {
          slug: "done-for-you",
          tier_name: "Done-For-You",
          title: "SaaS Launchpad Done-For-You",
          price: "$3000",
          fulfillment_type: "done_for_you_service",
          includes: ["Everything in Premium", "Brand setup", "Deployment", "Launch QA"],
          comparison_points: ["Brand setup", "Deployment", "Launch QA"],
        },
      ],
      faqs: [
        {
          question: "Can I use this for a production SaaS launch?",
          answer: "Yes. It is built as a launch foundation and designed to be extended with your product logic.",
        },
      ],
      related_service_slugs: ["template-customization", "saas-applications"],
    },
    {
      slug: "ai-chatbot-qualification-starter",
      name: "AI Chatbot Qualification Starter",
      price: "$49",
      category: "AI & Automation",
      categorySlug: "ai-automation",
      type: "Workflow Template",
      typeSlug: "workflow-template",
      industry: "Service Business",
      industrySlug: "service-business",
      tag: "New",
      published: true,
      teaser: "Lead-qualification chatbot flow for websites and landing pages.",
      summary: "Template prompts, qualification logic, and handoff patterns for WhatsApp or booking pipelines.",
      audience: "Teams adding conversational qualification to product and service funnels",
      previewVariant: "dashboard",
      includes: ["Prompt pack", "Qualification flow map", "Escalation script templates"],
      inScope: ["Conversation structure", "Lead question sets", "Escalation copy"],
      outOfScope: ["Custom LLM hosting", "Enterprise governance setup"],
      enhancementPlan: ["CRM sync", "Advanced scoring", "Multilingual variants"],
      stack: ["Prompt templates", "Workflow logic", "API handoff patterns"],
      highlights: [
        { label: "Flow", value: "Qualification-first" },
        { label: "Handoff", value: "WhatsApp + Booking" },
      ],
      image: null,
      gallery: [],
      variants: [
        {
          slug: "standard",
          tier_name: "Standard",
          title: "Qualification Starter Standard",
          price: "$49",
          fulfillment_type: "digital_download",
          includes: ["Prompt pack", "Flow docs", "Basic handoff templates"],
          comparison_points: ["Prompt pack", "Flow docs"],
          recommended: true,
        },
        {
          slug: "premium",
          tier_name: "Premium",
          title: "Qualification Starter Premium",
          price: "$149",
          fulfillment_type: "hybrid_support",
          includes: ["Everything in Standard", "Expanded scenarios", "Support guidance"],
          comparison_points: ["Expanded scenarios", "Support guidance"],
        },
        {
          slug: "done-for-you",
          tier_name: "Done-For-You",
          title: "Qualification Starter Done-For-You",
          price: "$799",
          fulfillment_type: "done_for_you_service",
          includes: ["Everything in Premium", "Implementation setup", "Integration QA"],
          comparison_points: ["Implementation setup", "Integration QA"],
        },
      ],
      related_service_slugs: ["automation", "template-customization"],
    },
    {
      slug: "mcp-server-kickstart-kit",
      name: "MCP Server Kickstart Kit",
      price: "$49",
      category: "MCP Servers",
      categorySlug: "mcp-servers",
      type: "Starter Kit",
      typeSlug: "starter-kit",
      industry: "Developer Tools",
      industrySlug: "developer-tools",
      tag: "Developer",
      published: true,
      teaser: "Starter toolkit for shipping a secure, documented MCP server quickly.",
      summary: "A practical MCP starter with tool schema examples, auth notes, and deployment guidance.",
      audience: "Developers building agent-ready integrations",
      previewVariant: "mcp",
      includes: ["Starter structure", "Tool schema examples", "Auth/config examples", "Deploy notes"],
      inScope: ["Starter architecture", "Tool descriptors", "Config baseline"],
      outOfScope: ["Custom enterprise integration", "Dedicated ops onboarding"],
      enhancementPlan: ["Role-based access", "Audit dashboards", "Multi-tool orchestration"],
      stack: ["Node.js", "TypeScript", "JSON schema"],
      highlights: [
        { label: "Tools", value: "Schema-ready" },
        { label: "Auth", value: "Starter pattern" },
      ],
      image: null,
      gallery: [],
      variants: [
        {
          slug: "standard",
          tier_name: "Standard",
          title: "MCP Kickstart Standard",
          price: "$49",
          fulfillment_type: "digital_download",
          includes: ["Starter template", "Config baseline", "Setup notes"],
          comparison_points: ["Starter template", "Setup notes"],
          recommended: true,
        },
        {
          slug: "premium",
          tier_name: "Premium",
          title: "MCP Kickstart Premium",
          price: "$149",
          fulfillment_type: "hybrid_support",
          includes: ["Everything in Standard", "Extended examples", "Priority support"],
          comparison_points: ["Extended examples", "Priority support"],
        },
        {
          slug: "done-for-you",
          tier_name: "Done-For-You",
          title: "MCP Kickstart Done-For-You",
          price: "$1500",
          fulfillment_type: "done_for_you_service",
          includes: ["Everything in Premium", "Custom setup", "Validation and handoff"],
          comparison_points: ["Custom setup", "Validation and handoff"],
        },
      ],
      related_service_slugs: ["mcp-servers"],
    },
    {
      slug: "technical-seo-growth-kit",
      name: "Technical SEO Growth Kit",
      price: "$19",
      category: "SEO Toolkits",
      categorySlug: "seo-toolkits",
      type: "Audit Kit",
      typeSlug: "audit-kit",
      industry: "SaaS",
      industrySlug: "saas",
      tag: "SEO",
      published: true,
      teaser: "Checklist and schema starter kit for technical SEO foundations.",
      summary: "Use this kit to run audits, patch metadata gaps, and implement schema basics for growth pages.",
      audience: "Founders and marketers launching technical SEO baselines",
      previewVariant: "automation",
      includes: ["Audit checklist", "Schema snippets", "Remediation worksheet"],
      inScope: ["Checklist workflow", "Schema examples", "Execution worksheet"],
      outOfScope: ["Full implementation by team", "Custom analytics architecture"],
      enhancementPlan: ["Route-level SEO QA", "Structured data coverage expansion"],
      stack: ["SEO docs", "Schema.org snippets", "Implementation checklist"],
      highlights: [{ label: "Entry", value: "$19" }, { label: "Use", value: "Immediate" }],
      image: null,
      gallery: [],
      variants: [
        {
          slug: "standard",
          tier_name: "Standard",
          title: "SEO Kit Standard",
          price: "$19",
          fulfillment_type: "digital_download",
          includes: ["Checklist", "Worksheet", "Schema examples"],
          comparison_points: ["Checklist", "Schema examples"],
          recommended: true,
        },
        {
          slug: "premium",
          tier_name: "Premium",
          title: "SEO Kit Premium",
          price: "$79",
          fulfillment_type: "hybrid_support",
          includes: ["Everything in Standard", "Extended components", "Implementation notes"],
          comparison_points: ["Extended components", "Implementation notes"],
        },
        {
          slug: "done-for-you",
          tier_name: "Done-For-You",
          title: "SEO Kit Done-For-You",
          price: "$999",
          fulfillment_type: "done_for_you_service",
          includes: ["Everything in Premium", "Audit review", "Implementation support"],
          comparison_points: ["Audit review", "Implementation support"],
        },
      ],
      related_service_slugs: ["websites"],
    },
    {
      slug: "business-launch-bundle",
      name: "Business Launch Bundle",
      price: "$149",
      category: "Bundles",
      categorySlug: "bundles",
      type: "Bundle Pack",
      typeSlug: "bundle-pack",
      industry: "Local Business",
      industrySlug: "local-business",
      tag: "Bundle",
      published: true,
      teaser: "Combined template, email pack, and setup docs for fast business launches.",
      summary: "A curated pack for business owners who want a ready stack and optional Done-For-You rollout.",
      audience: "Local businesses and operators launching new offers",
      previewVariant: "marketing",
      includes: ["Landing template", "Email templates", "Launch checklist", "Offer copy prompts"],
      inScope: ["Bundle assets", "Documentation", "Setup guidance"],
      outOfScope: ["Custom feature engineering", "Advanced automation setup"],
      enhancementPlan: ["Upgrade to customization service", "Add analytics + SEO support"],
      stack: ["Next.js templates", "HTML email assets", "Operator docs"],
      highlights: [{ label: "Bundle", value: "4 assets" }, { label: "Savings", value: "Pack pricing" }],
      image: null,
      gallery: [],
      variants: [
        {
          slug: "standard",
          tier_name: "Standard",
          title: "Launch Bundle Standard",
          price: "$149",
          fulfillment_type: "digital_download",
          includes: ["Bundle files", "Docs", "Self-serve launch guide"],
          comparison_points: ["Bundle files", "Self-serve guide"],
          recommended: true,
        },
        {
          slug: "premium",
          tier_name: "Premium",
          title: "Launch Bundle Premium",
          price: "$299",
          fulfillment_type: "hybrid_support",
          includes: ["Everything in Standard", "Priority support", "Extended variants"],
          comparison_points: ["Priority support", "Extended variants"],
        },
        {
          slug: "done-for-you",
          tier_name: "Done-For-You",
          title: "Launch Bundle Done-For-You",
          price: "$1200",
          fulfillment_type: "done_for_you_service",
          includes: ["Everything in Premium", "Setup by Growrix", "Launch QA"],
          comparison_points: ["Setup by Growrix", "Launch QA"],
        },
      ],
      related_service_slugs: ["template-customization", "websites"],
    },
    {
      slug: "free-conversion-landing-starter",
      name: "Free Conversion Landing Starter",
      price: "Free",
      category: "Free Products",
      categorySlug: "free-products",
      type: "Free Starter",
      typeSlug: "free-starter",
      industry: "General",
      industrySlug: "general",
      tag: "Free",
      published: true,
      teaser: "Grab a free starter landing template to test your offer fast.",
      summary: "A zero-cost starter for founders and teams who want to validate messaging before buying a premium pack.",
      audience: "Early-stage teams validating offers quickly",
      previewVariant: "marketing",
      includes: ["Starter landing page", "Basic CTA section", "Quick setup notes"],
      inScope: ["Free template starter", "Basic docs"],
      outOfScope: ["Advanced variants", "Support SLAs", "Custom setup"],
      enhancementPlan: ["Upgrade to premium pack", "Request customization support"],
      stack: ["HTML", "Tailwind utility styles"],
      highlights: [{ label: "Price", value: "Free" }, { label: "Use", value: "Lead magnet" }],
      image: null,
      gallery: [],
      variants: [
        {
          slug: "standard",
          tier_name: "Standard",
          title: "Free Starter",
          price: "Free",
          fulfillment_type: "digital_download",
          includes: ["Starter files", "Basic setup notes"],
          comparison_points: ["Starter files", "Basic setup notes"],
          recommended: true,
        },
        {
          slug: "premium",
          tier_name: "Premium",
          title: "Starter Premium Upgrade",
          price: "$39",
          fulfillment_type: "hybrid_support",
          includes: ["Expanded sections", "Priority support", "Extra variants"],
          comparison_points: ["Expanded sections", "Extra variants"],
        },
        {
          slug: "done-for-you",
          tier_name: "Done-For-You",
          title: "Starter Done-For-You",
          price: "$499",
          fulfillment_type: "done_for_you_service",
          includes: ["Customization setup", "Deploy + form integration", "Launch QA"],
          comparison_points: ["Deploy + integration", "Launch QA"],
        },
      ],
      related_service_slugs: ["template-customization"],
    },
  ] satisfies ManagedProductRecord[]).map(withParentTaxonomy);
}

function getDefaultHtmlEmailTemplateProducts(): ManagedProductRecord[] {
  return ([
    {
      slug: "email-pack-saas-lifecycle",
      name: "SaaS Lifecycle Email Pack",
      price: "$15",
      category: "HTML Templates",
      categorySlug: "html-templates",
      type: "Email Templates",
      typeSlug: "email-templates",
      industry: "SaaS",
      industrySlug: "saas",
      tag: "Email Pack",
      published: true,
      teaser: "Curated responsive HTML emails for onboarding, product updates, and renewals.",
      summary: "A conversion-focused SaaS lifecycle pack for teams who need polished transactional and marketing emails.",
      audience: "SaaS founders and operators shipping customer lifecycle email flows",
      previewVariant: "marketing",
      includes: ["Starter HTML email template", "Responsive layout baseline", "Usage notes"],
      inScope: ["HTML email files", "Responsive compatibility baseline", "Editable copy sections"],
      outOfScope: ["ESP automation setup", "Custom event wiring", "Brand strategy work"],
      enhancementPlan: ["Add lifecycle variants", "Map to product events", "Expand campaign automation"],
      stack: ["HTML", "Inline CSS", "Resend/Mailchimp compatible markup"],
      highlights: [
        { label: "Template family", value: "SaaS lifecycle" },
        { label: "Base delivery", value: "Digital download" },
      ],
      image: null,
      gallery: [],
      variants: [
        {
          slug: "standard",
          tier_name: "Standard",
          title: "SaaS Email Pack Standard",
          price: "$15",
          fulfillment_type: "digital_download",
          includes: ["1 responsive template", "Editable copy blocks", "Basic usage docs"],
          comparison_points: ["Single template", "Starter docs"],
          recommended: true,
        },
        {
          slug: "premium",
          tier_name: "Premium",
          title: "SaaS Email Pack Premium",
          price: "$39",
          fulfillment_type: "hybrid_support",
          includes: ["5-template pack", "Welcome/promo/invoice/newsletter/follow-up", "Priority support"],
          comparison_points: ["5-template pack", "Priority support"],
        },
        {
          slug: "done-for-you",
          tier_name: "Done-For-You",
          title: "SaaS Email Pack Done-For-You",
          price: "$199-$499",
          fulfillment_type: "done_for_you_service",
          includes: ["Brand customization", "ESP setup support", "Cross-client testing guidance"],
          comparison_points: ["Brand customization", "ESP setup support"],
        },
      ],
      related_service_slugs: ["template-customization", "automation"],
    },
    {
      slug: "email-pack-ecommerce-revenue",
      name: "Ecommerce Revenue Email Pack",
      price: "$15",
      category: "HTML Templates",
      categorySlug: "html-templates",
      type: "Email Templates",
      typeSlug: "email-templates",
      industry: "Ecommerce",
      industrySlug: "ecommerce",
      tag: "Email Pack",
      published: true,
      teaser: "Revenue-focused email templates for promotions, order updates, and win-back campaigns.",
      summary: "A curated ecommerce HTML email collection designed for conversion, retention, and post-purchase flows.",
      audience: "Store operators and agencies running ecommerce lifecycle campaigns",
      previewVariant: "marketing",
      includes: ["Starter HTML email template", "Responsive markup", "Editable offer blocks"],
      inScope: ["Template files", "Responsive structure", "Basic compatibility guidance"],
      outOfScope: ["Store integration implementation", "Automation orchestration", "Copywriting retainer"],
      enhancementPlan: ["Seasonal variants", "Cart recovery packs", "Post-purchase automations"],
      stack: ["HTML", "Inline CSS", "ESP-compatible components"],
      highlights: [
        { label: "Template family", value: "Ecommerce lifecycle" },
        { label: "Pack options", value: "Standard/Premium/Done-For-You" },
      ],
      image: null,
      gallery: [],
      variants: [
        {
          slug: "standard",
          tier_name: "Standard",
          title: "Ecommerce Email Pack Standard",
          price: "$15",
          fulfillment_type: "digital_download",
          includes: ["1 responsive template", "Basic docs", "Editable sections"],
          comparison_points: ["Single template", "Basic docs"],
          recommended: true,
        },
        {
          slug: "premium",
          tier_name: "Premium",
          title: "Ecommerce Email Pack Premium",
          price: "$39",
          fulfillment_type: "hybrid_support",
          includes: ["5-template pack", "Promo/order/newsletter/follow-up variants", "Priority support"],
          comparison_points: ["5-template pack", "Priority support"],
        },
        {
          slug: "done-for-you",
          tier_name: "Done-For-You",
          title: "Ecommerce Email Pack Done-For-You",
          price: "$199-$499",
          fulfillment_type: "done_for_you_service",
          includes: ["Brand customization", "ESP implementation guidance", "Testing support"],
          comparison_points: ["Brand customization", "Testing support"],
        },
      ],
      related_service_slugs: ["template-customization", "automation"],
    },
    {
      slug: "email-pack-business-operations",
      name: "Business Operations Email Pack",
      price: "$15",
      category: "HTML Templates",
      categorySlug: "html-templates",
      type: "Email Templates",
      typeSlug: "email-templates",
      industry: "Service Business",
      industrySlug: "service-business",
      tag: "Email Pack",
      published: true,
      teaser: "Operational email templates for onboarding, invoices, reminders, and client follow-up.",
      summary: "A practical HTML email pack for service teams running client communication at scale.",
      audience: "Service businesses and delivery teams standardizing client communication",
      previewVariant: "marketing",
      includes: ["Starter HTML email template", "Responsive baseline", "Operational usage notes"],
      inScope: ["Email HTML files", "Editable blocks", "Basic guidance"],
      outOfScope: ["CRM integration", "Workflow automation setup", "Dedicated copywriting"],
      enhancementPlan: ["Client segment variants", "Reminder automation", "Escalation templates"],
      stack: ["HTML", "Inline CSS", "ESP-compatible markup"],
      highlights: [
        { label: "Template family", value: "Operations + follow-up" },
        { label: "Entry price", value: "$15" },
      ],
      image: null,
      gallery: [],
      variants: [
        {
          slug: "standard",
          tier_name: "Standard",
          title: "Business Ops Email Pack Standard",
          price: "$15",
          fulfillment_type: "digital_download",
          includes: ["1 responsive template", "Basic documentation", "Editable copy placeholders"],
          comparison_points: ["Single template", "Basic documentation"],
          recommended: true,
        },
        {
          slug: "premium",
          tier_name: "Premium",
          title: "Business Ops Email Pack Premium",
          price: "$39",
          fulfillment_type: "hybrid_support",
          includes: ["5-template pack", "Invoice/reminder/newsletter/follow-up variants", "Priority support"],
          comparison_points: ["5-template pack", "Priority support"],
        },
        {
          slug: "done-for-you",
          tier_name: "Done-For-You",
          title: "Business Ops Email Pack Done-For-You",
          price: "$199-$499",
          fulfillment_type: "done_for_you_service",
          includes: ["Brand customization", "ESP setup support", "Cross-client testing support"],
          comparison_points: ["Brand customization", "ESP setup support"],
        },
      ],
      related_service_slugs: ["template-customization", "automation"],
    },
  ] satisfies ManagedProductRecord[]).map(withParentTaxonomy);
}

function getFallbackSeedProducts() {
  const products: ManagedProductRecord[] = [];

  if (FALLBACK_CATALOG_POLICY.includeAnchorProducts) {
    products.push(...getDefaultAnchorProducts());
  }

  if (FALLBACK_CATALOG_POLICY.includeHtmlEmailPacks) {
    products.push(...getDefaultHtmlEmailTemplateProducts());
  }

  return products;
}

function mergeCatalogProducts(...productGroups: ManagedProductRecord[][]) {
  const merged = new Map<string, ManagedProductRecord>();

  for (const products of productGroups) {
    for (const product of products) {
      const normalizedSlug = product.categorySlug === HTML_BUSINESS_PROFILE_SHOP_CATEGORY.slug
        ? toHtmlProductSlug(product.slug)
        : product.slug;
      const normalized = { ...product, slug: normalizedSlug };
      merged.set(normalized.slug, normalized);
    }
  }

  return Array.from(merged.values());
}

async function listAllPublicProducts() {
  const database = await ensureCatalogSeeded();
  const cmsProducts = await listSanityShopItems().catch(() => []);
  const cmsHtmlTemplates = await listSanityHtmlBusinessProfileTemplates().catch(() => []);
  const localHtmlTemplates = FALLBACK_CATALOG_POLICY.includeHtmlBusinessProfiles
    ? getDefaultHtmlBusinessProfileProducts()
    : [];
  const managedProducts = database.products.filter((product) => !isPlaceholderProduct(product));

  return mergeCatalogProducts(localHtmlTemplates, managedProducts, cmsProducts, cmsHtmlTemplates)
    .filter((product) => !isPlaceholderProduct(product));
}

function getDefaultServices(): ManagedServiceRecord[] {
  return SERVICES.map((service) => ({
    id: service.slug,
    slug: service.slug,
    title: service.name,
    description: service.long,
    short_description: service.short,
    service_type: service.slug,
    pricing_model: "contact",
    delivery_timeline: service.timeline,
    pillars: [...service.pillars],
  }));
}

function getEffectiveServices(databaseServices: ManagedServiceRecord[]) {
  return mergeServices(getDefaultServices(), databaseServices);
}

function stripLegacyMockCatalog(database: Awaited<ReturnType<typeof readDatabase>>) {
  return {
    ...database,
    portfolio_projects: database.portfolio_projects.filter((project) => !LEGACY_MOCK_PORTFOLIO_SLUGS.has(project.slug)),
    products: database.products.filter((product) => !LEGACY_MOCK_PRODUCT_SLUGS.has(product.slug)),
  };
}

function mergeServices(fallback: ManagedServiceRecord[], cms: ManagedServiceRecord[]) {
  if (cms.length === 0) {
    return fallback;
  }

  const merged = new Map(fallback.map((service) => [service.slug, service]));

  for (const service of cms) {
    const previous = merged.get(service.slug);
    merged.set(service.slug, {
      ...(previous ?? service),
      ...service,
      pillars: service.pillars.length > 0 ? service.pillars : previous?.pillars ?? [],
    });
  }

  return Array.from(merged.values());
}

async function ensureCatalogSeeded() {
  const database = stripLegacyMockCatalog(await readDatabase());
  if (database.services.length && database.products.length) {
    return database;
  }

  const seeded = {
    ...database,
    services: database.services.length > 0 ? database.services : getDefaultServices(),
    products: database.products.length > 0 ? database.products : getFallbackSeedProducts(),
  };

  await writeDatabase(() => seeded);
  return seeded;
}

export async function listPublicServices(): Promise<PublicServiceRecord[]> {
  const database = await ensureCatalogSeeded();
  const fallbackServices = getEffectiveServices(database.services);
  const cmsServices = await listSanityServicePages().catch(() => []);
  return mergeServices(fallbackServices, cmsServices);
}

export async function getPublicService(serviceId: string): Promise<PublicServiceRecord | null> {
  const database = await ensureCatalogSeeded();
  const fallbackServices = getEffectiveServices(database.services);
  const fallback = fallbackServices.find((service) => service.slug === serviceId || service.id === serviceId) ?? null;
  const cms = await getSanityServicePageBySlug(serviceId).catch(() => null);

  if (!cms) {
    return fallback;
  }

  return {
    ...(fallback ?? cms),
    ...cms,
    pillars: cms.pillars.length > 0 ? cms.pillars : fallback?.pillars ?? [],
  };
}

export async function listPublicPortfolio(): Promise<PublicPortfolioRecord[]> {
  const database = await ensureCatalogSeeded();
  const cmsProjects = await listSanityCaseStudies().catch(() => []);
  const publicProjects = cmsProjects.length > 0 ? cmsProjects : database.portfolio_projects;

  return publicProjects
    .filter((project) => !isPlaceholderPortfolioProject(project))
    .map((project) => ({
    slug: project.slug,
    name: project.name,
    livePreviewUrl: project.livePreviewUrl,
    embeddedPreviewUrl: project.embeddedPreviewUrl,
    industry: project.industry,
    service: project.service,
    summary: project.summary,
    metric: project.metric,
    accent: project.accent,
    hero_image: project.hero_image,
  }));
}

export async function getPublicPortfolioProject(slug: string): Promise<PublicPortfolioDetailRecord | null> {
  const database = await ensureCatalogSeeded();
  const cmsProjects = await listSanityCaseStudies().catch(() => []);

  if (cmsProjects.length > 0) {
    const cmsProject = cmsProjects.find((project) => project.slug === slug) ?? null;
    return cmsProject && !isPlaceholderPortfolioProject(cmsProject) ? cmsProject : null;
  }

  const fallback = database.portfolio_projects.find((project) => project.slug === slug) ?? null;
  return fallback && !isPlaceholderPortfolioProject(fallback) ? fallback : null;
}

export async function listPublicShopCategories(): Promise<PublicShopCategoryRecord[]> {
  const products = await listAllPublicProducts();

  const categoryMap = new Map<string, string>();

  for (const product of products) {
    if (product.published === false) {
      continue;
    }

    categoryMap.set(product.categorySlug, product.category);
  }

  return Array.from(categoryMap.entries()).map(([slug, name]) => ({
    slug,
    name,
    product_count: products.filter((product) => product.published !== false && product.categorySlug === slug).length,
  }));
}

export async function listPublicShopProducts(filters?: {
  category?: string;
  type?: string;
  industry?: string;
  search?: string;
}) {
  const products = await listAllPublicProducts();
  const q = filters?.search?.trim().toLowerCase();

  return products.filter((product) => {
    if (product.published === false) {
      return false;
    }

    if (filters?.category && product.categorySlug !== filters.category) {
      return false;
    }

    if (filters?.type && product.typeSlug !== filters.type) {
      return false;
    }

    if (filters?.industry && product.industrySlug !== filters.industry) {
      return false;
    }

    if (
      q &&
      !`${product.name} ${product.category} ${product.type} ${product.industry} ${product.summary}`
        .toLowerCase()
        .includes(q)
    ) {
      return false;
    }

    return true;
  }).map((product) => ({
    ...product,
    price_cents: parseUsdPriceToCents(product.price),
  }));
}

export async function getPublicShopProduct(slug: string): Promise<PublicShopProductRecord | null> {
  const products = await listAllPublicProducts();
  const alternateHtmlSlug = toHtmlProductSlug(slug);
  const product = products.find(
    (item) => (item.slug === slug || item.slug === alternateHtmlSlug) && item.published !== false,
  ) ?? null;

  if (!product || isPlaceholderProduct(product)) {
    return null;
  }

  return {
    ...product,
    image: product.image ?? null,
    price_cents: parseUsdPriceToCents(product.price),
  };
}

export async function listManagedServices() {
  const cmsServices = await listSanityServicePages({ preview: true }).catch(() => []);
  if (cmsServices.length > 0) {
    return cmsServices;
  }

  const database = await ensureCatalogSeeded();
  return database.services;
}

export async function upsertManagedService(input: ManagedServiceRecord) {
  const nextRecord = {
    ...input,
    pillars: input.pillars.filter(Boolean),
  };

  await ensureCatalogSeeded();
  await writeDatabase((database) => ({
    ...database,
    services: [nextRecord, ...database.services.filter((service) => service.id !== input.id && service.slug !== input.slug)],
  }));

  await upsertSanityServicePage(nextRecord).catch(() => false);

  return nextRecord;
}

export async function deleteManagedService(serviceId: string) {
  await ensureCatalogSeeded();
  await writeDatabase((database) => ({
    ...database,
    services: database.services.filter((service) => service.id !== serviceId && service.slug !== serviceId),
  }));

  await deleteSanityServicePage(serviceId).catch(() => false);
}

export async function listManagedProducts() {
  const [cmsProducts, cmsHtmlTemplates] = await Promise.all([
    listSanityShopItems({ preview: true }).catch(() => []),
    listSanityHtmlBusinessProfileTemplates({ preview: true }).catch(() => []),
  ]);
  if (cmsProducts.length > 0 || cmsHtmlTemplates.length > 0) {
    return mergeCatalogProducts(cmsProducts, cmsHtmlTemplates);
  }

  const database = await ensureCatalogSeeded();
  return database.products;
}

export async function upsertManagedProduct(input: ManagedProductRecord) {
  const normalizedSlug = normalizeProductSlug(input.slug);
  const isHtmlBusinessProfile = input.categorySlug === HTML_BUSINESS_PROFILE_SHOP_CATEGORY.slug;
  const normalizedStorageSlug = isHtmlBusinessProfile ? toHtmlProductSlug(normalizedSlug) : normalizedSlug;

  if (!PRODUCT_SLUG_PATTERN.test(normalizedSlug)) {
    throw new Error("INVALID_PRODUCT_SLUG_FORMAT: Product slug must be lowercase kebab-case.");
  }

  if (isReservedProductRouteSlug(normalizedSlug)) {
    throw new Error("RESERVED_PRODUCT_SLUG: Product slug conflicts with a reserved /products route segment.");
  }

  const existingProducts = await listManagedProducts();
  const nextPublicSlug = isHtmlBusinessProfile ? toHtmlProductSlug(normalizedSlug) : normalizedSlug;
  const duplicatePublicSlug = existingProducts.find((product) => {
    const existingPublicSlug = toPublicProductSlug({
      slug: normalizeProductSlug(product.slug),
      categorySlug: product.categorySlug,
    });

    const isSameStoredSlug = normalizeProductSlug(product.slug) === normalizedStorageSlug;
    const isSameCategory = product.categorySlug === input.categorySlug;

    return existingPublicSlug === nextPublicSlug && !(isSameStoredSlug && isSameCategory);
  });

  if (duplicatePublicSlug) {
    throw new Error(`DUPLICATE_PRODUCT_SLUG: Another product already resolves to /products/${nextPublicSlug}.`);
  }

  const nextRecord = {
    ...input,
    slug: normalizedStorageSlug,
    variants: input.variants
      ?.map((variant) => ({
        ...variant,
        slug: variant.slug.trim(),
        title: variant.title.trim(),
        price: variant.price.trim(),
        includes: variant.includes.filter(Boolean),
        comparison_points: variant.comparison_points?.filter(Boolean),
      }))
      .filter((variant) => variant.slug && variant.title && variant.price && variant.includes.length > 0),
    faqs: input.faqs
      ?.map((faq) => ({
        question: faq.question.trim(),
        answer: faq.answer.trim(),
      }))
      .filter((faq) => faq.question && faq.answer),
    related_product_slugs: input.related_product_slugs?.filter(Boolean),
    related_service_slugs: input.related_service_slugs?.filter(Boolean),
    customization_upsells: input.customization_upsells
      ?.map((upsell) => ({
        title: upsell.title.trim(),
        description: upsell.description.trim(),
        cta_label: upsell.cta_label.trim(),
        cta_href: upsell.cta_href.trim(),
      }))
      .filter((upsell) => upsell.title && upsell.description && upsell.cta_label && upsell.cta_href),
    includes: input.includes.filter(Boolean),
    stack: input.stack.filter(Boolean),
    highlights: input.highlights.filter((item) => item.label && item.value),
  };

  await ensureCatalogSeeded();
  await writeDatabase((database) => ({
    ...database,
    products: [
      nextRecord,
      ...database.products.filter((product) => normalizeProductSlug(product.slug) !== normalizedStorageSlug),
    ],
  }));

  if (nextRecord.categorySlug === HTML_BUSINESS_PROFILE_SHOP_CATEGORY.slug) {
    await upsertSanityHtmlBusinessProfileTemplate(nextRecord).catch(() => false);
  } else {
    await upsertSanityShopItem(nextRecord).catch(() => false);
  }

  return nextRecord;
}

export async function deleteManagedProduct(productSlug: string) {
  await ensureCatalogSeeded();
  await writeDatabase((database) => ({
    ...database,
    products: database.products.filter((product) => product.slug !== productSlug),
  }));

  const htmlSlugCandidates = Array.from(new Set([productSlug, toSanityHtmlTemplateSlug(productSlug)]));
  await Promise.all([
    deleteSanityShopItem(productSlug).catch(() => false),
    ...htmlSlugCandidates.map((slug) => deleteSanityHtmlBusinessProfileTemplate(slug).catch(() => false)),
  ]);
}

export async function listManagedPortfolioProjects() {
  const cmsProjects = await listSanityCaseStudies({ preview: true }).catch(() => []);
  if (cmsProjects.length > 0) {
    return cmsProjects;
  }

  const database = await ensureCatalogSeeded();
  return database.portfolio_projects;
}

export async function upsertManagedPortfolioProject(input: ManagedPortfolioRecord) {
  const nextRecord = {
    ...input,
    hero_image: input.hero_image ?? null,
    detail: input.detail ?? null,
  };

  await ensureCatalogSeeded();
  await writeDatabase((database) => ({
    ...database,
    portfolio_projects: [nextRecord, ...database.portfolio_projects.filter((project) => project.slug !== input.slug)],
  }));

  await upsertSanityCaseStudy(nextRecord).catch(() => false);

  return nextRecord;
}

export async function deleteManagedPortfolioProject(projectSlug: string) {
  await ensureCatalogSeeded();
  await writeDatabase((database) => ({
    ...database,
    portfolio_projects: database.portfolio_projects.filter((project) => project.slug !== projectSlug),
  }));

  await deleteSanityCaseStudy(projectSlug).catch(() => false);
}