import type { Metadata } from "next";
import { JsonLd, type JsonLdData } from "@/components/seo/JsonLd";
import { buildPageMetadata, NOINDEX_ROBOTS } from "@/lib/seo-metadata";
import { buildFaqPageSchema, buildServiceSchema, buildBreadcrumbListSchema } from "@/lib/seo-structured-data";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BoltIcon,
  CheckIcon,
  CodeBracketSquareIcon,
  DevicePhoneMobileIcon,
  DocumentTextIcon,
  MagnifyingGlassCircleIcon,
  SparklesIcon,
  WindowIcon,
} from "@heroicons/react/24/outline";
import { MarketingHeroTitle } from "@/components/marketing/MarketingHeroTitle";
import { MarketingSplitHero } from "@/components/marketing/MarketingSplitHero";
import { Container, Section } from "@/components/primitives/Container";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Badge } from "@/components/primitives/Badge";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { WebsiteLaunchProcessTimeline } from "@/components/sections/WebsiteLaunchProcessTimeline";
import { AutomationWorkflowShowcase } from "@/components/sections/AutomationWorkflowShowcase";
import { SeoVisibilityFoundation } from "@/components/sections/SeoVisibilityFoundation";
import { SeoDeliverablesChecklist } from "@/components/sections/SeoDeliverablesChecklist";
import { TechnicalSeoSetupCategories } from "@/components/sections/TechnicalSeoSetupCategories";
import { PricingTier, type Tier } from "@/components/sections/PricingTier";
import { Accordion } from "@/components/sections/Accordion";
import { CTABand } from "@/components/sections/CTABand";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { StatBlock } from "@/components/sections/StatBlock";
import { PortfolioCard } from "@/components/sections/PortfolioCard";
import { HomeHtmlPreviewSection } from "@/components/marketing/HomeHtmlPreviewSection";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { ProcessStepsMobile } from "@/components/marketing/ProcessStepsMobile";
import { ProductLedFinalCTAMobile } from "@/components/marketing/ProductLedFinalCTAMobile";
import { MobileFeatureGrid } from "@/components/marketing/mobile/MobileFeatureGrid";
import { MobilePrincipleList } from "@/components/marketing/mobile/MobilePrincipleList";
import { SaasProductTypesMobile } from "@/components/marketing/services/SaasProductTypesMobile";
import { SaasStackSectionMobile } from "@/components/marketing/services/SaasStackSectionMobile";
import { EngagementTiersMobile } from "@/components/marketing/services/EngagementTiersMobile";
import { OutcomeCardsMobile } from "@/components/marketing/services/OutcomeCardsMobile";
import { PrincipleCardsMobile } from "@/components/marketing/services/PrincipleCardsMobile";
import { WebsitesOutcomesDesktop } from "@/components/marketing/services/WebsitesOutcomesDesktop";
import { WebsitesPrinciplesDesktop } from "@/components/marketing/services/WebsitesPrinciplesDesktop";
import { AiSolutionsMobile } from "@/components/marketing/services/AiSolutionsMobile";
import { AutomationTypesMobile } from "@/components/marketing/services/AutomationTypesMobile";
import { AutomationWorkflowShowcaseMobile } from "@/components/marketing/services/AutomationWorkflowShowcaseMobile";
import { MobileAppsProductTypesMobile } from "@/components/marketing/services/MobileAppsProductTypesMobile";
import { SeoDeliverablesChecklistMobile } from "@/components/marketing/services/SeoDeliverablesChecklistMobile";
import { SeoVisibilityFoundationMobile } from "@/components/marketing/services/SeoVisibilityFoundationMobile";
import { ServiceDetailHeroMobile } from "@/components/marketing/services/ServiceDetailHeroMobile";
import { TechnicalSeoSetupCategoriesMobile } from "@/components/marketing/services/TechnicalSeoSetupCategoriesMobile";
import { ServiceFaqMobile } from "@/components/marketing/services/ServiceFaqMobile";
import { ServiceFeaturedProofMobile } from "@/components/marketing/services/ServiceFeaturedProofMobile";
import { FeaturedProducts } from "@/components/marketing/FeaturedProducts";
import { HOME_STATS, PROCESS_STEPS, SERVICES } from "@/lib/content";
import { HOME_PREVIEW_COPY } from "@/lib/home-conversion-content";
import { WEBSITE_TEMPLATE_PREVIEW } from "@/lib/preview-terminology";
import { pickPreviewProducts } from "@/lib/ready-made-solutions";
import { getProductHref } from "@/lib/shop";
import {
  buildWebsiteTemplateHtmlPreviewSlides,
  getWebsiteTemplateHtmlPreviewUrl,
  listWebsiteTemplateHtmlPreviews,
  WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG,
} from "@/lib/website-templates-html-preview";
import { isHiddenServiceSlug } from "@/lib/feature-flags";
import { SHOW_GOOGLE_REVIEWS } from "@/lib/feature-flags";
import { WHATSAPP_HREF } from "@/lib/nav";
import { marketingSection } from "@/lib/marketing-composition";
import { HERO_VIEWPORT_CONTAINER_CLASS } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { getPublicService, listPublicPortfolio, listPublicShopProducts } from "@/server/domain/catalog";
import { getSanityServiceDetailContent } from "@/server/sanity/marketing";
import {
  WEBSITES_ENGAGEMENT_SECTION,
  WEBSITES_FEATURED_TEMPLATES_COPY,
  WEBSITES_LAUNCH_PROCESS_SECTION,
  WEBSITES_OUTCOMES_SECTION,
  WEBSITES_PROOF_SECTION,
  WEBSITES_SERVICE_CTA,
  WEBSITES_SERVICE_FAQ,
  WEBSITES_SERVICE_FAQ_SECTION,
  WEBSITES_SERVICE_HERO,
  WEBSITES_SERVICE_STATS,
  WEBSITES_WHY_CHOOSE_SECTION,
} from "@/lib/websites-service-content";
import {
  SAAS_ENGAGEMENT_SECTION,
  SAAS_LAUNCH_PROCESS_SECTION,
  SAAS_PRODUCT_TYPES_SECTION,
  SAAS_SERVICE_CTA,
  SAAS_SERVICE_FAQ,
  SAAS_SERVICE_FAQ_SECTION,
  SAAS_SERVICE_HERO,
  SAAS_SERVICE_STATS,
  SAAS_STACK_GROUPS,
  SAAS_STACK_SECTION,
  SAAS_SYSTEMS_SECTION,
  SAAS_WHY_FOUNDERS_SECTION,
} from "@/lib/saas-applications-service-content";
import {
  MOBILE_APPS_SERVICE_CTA,
  MOBILE_APPS_SERVICE_FAQ,
  MOBILE_APPS_SERVICE_FAQ_SECTION,
  MOBILE_APPS_SERVICE_HERO,
  MOBILE_APPS_SERVICE_STATS,
  MOBILE_ENGAGEMENT_SECTION,
  MOBILE_LAUNCH_PROCESS_SECTION,
  MOBILE_PRODUCT_TYPES_SECTION,
  MOBILE_SYSTEMS_SECTION,
  MOBILE_WHY_BUILD_SECTION,
} from "@/lib/mobile-apps-service-content";
import {
  AUTOMATION_ENGAGEMENT_SECTION,
  AUTOMATION_OUTCOMES_SECTION,
  AUTOMATION_PROCESS_SECTION,
  AUTOMATION_SERVICE_CTA,
  AUTOMATION_SERVICE_FAQ,
  AUTOMATION_SERVICE_FAQ_SECTION,
  AUTOMATION_SERVICE_HERO,
  AUTOMATION_SERVICE_STATS,
  AUTOMATION_TYPES_SECTION,
  AUTOMATION_WHY_BUILD_SECTION,
  AUTOMATION_WORKFLOW_SHOWCASE_SECTION,
} from "@/lib/automation-service-content";
import {
  TECHNICAL_SEO_DELIVERABLES_SECTION,
  TECHNICAL_SEO_ENGAGEMENT_SECTION,
  TECHNICAL_SEO_FOUNDATIONS_SECTION,
  TECHNICAL_SEO_PROCESS_SECTION,
  TECHNICAL_SEO_SERVICE_CTA,
  TECHNICAL_SEO_SERVICE_FAQ,
  TECHNICAL_SEO_SERVICE_FAQ_SECTION,
  TECHNICAL_SEO_SERVICE_HERO,
  TECHNICAL_SEO_SERVICE_STATS,
  TECHNICAL_SEO_SETUP_CATEGORIES_SECTION,
  TECHNICAL_SEO_VISIBILITY_SECTION,
  TECHNICAL_SEO_WHY_SECTION,
} from "@/lib/technical-seo-service-content";
import {
  AI_BUSINESS_SYSTEMS_PROCESS_SECTION,
  AI_BUSINESS_SYSTEMS_SERVICE_CTA,
  AI_BUSINESS_SYSTEMS_SERVICE_FAQ,
  AI_BUSINESS_SYSTEMS_SERVICE_FAQ_SECTION,
  AI_BUSINESS_SYSTEMS_SERVICE_HERO,
  AI_BUSINESS_SYSTEMS_SERVICE_STATS,
  AI_ENGAGEMENT_SECTION,
  AI_SOLUTIONS_SECTION,
  AI_VALUE_SECTION,
  AI_WHY_BUILD_SECTION,
} from "@/lib/ai-business-systems-service-content";

const ICONS = {
  "saas-applications": CodeBracketSquareIcon,
  websites: WindowIcon,
  "mobile-apps": DevicePhoneMobileIcon,
  "html-business-profiles": DocumentTextIcon,
  "ai-business-systems": SparklesIcon,
  automation: BoltIcon,
  "technical-seo": MagnifyingGlassCircleIcon,
} as const;

type SlugKey = keyof typeof ICONS;
const PRICE_MUTED_SERVICE_SLUGS = new Set<SlugKey>([]);

const COPY: Record<
  SlugKey,
  {
    eyebrow: string;
    headline: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    secondaryHref: string;
    builds: { title: string; description: string }[];
    differentiators: { title: string; description: string }[];
    tiers: Tier[];
    faq: { question: string; answer: string }[];
    stats: { value: string; label: string; hint?: string }[];
  }
> = {
  "saas-applications": {
    eyebrow: "SaaS Applications",
    headline: SAAS_SERVICE_HERO.headline,
    description: SAAS_SERVICE_HERO.description,
    primaryCta: "Start a SaaS Build",
    secondaryCta: SAAS_SERVICE_HERO.secondaryCta,
    secondaryHref: SAAS_SERVICE_HERO.secondaryHref,
    builds: SAAS_SYSTEMS_SECTION.builds.map((item) => ({ ...item })),
    differentiators: SAAS_WHY_FOUNDERS_SECTION.cards.map((item) => ({ ...item })),
    tiers: SAAS_ENGAGEMENT_SECTION.tiers.map((tier) => ({
      ...tier,
      features: [...tier.features],
    })),
    faq: SAAS_SERVICE_FAQ.map((item) => ({ ...item })),
    stats: SAAS_SERVICE_STATS.map((item) => ({ ...item })),
  },
  websites: {
    eyebrow: "Websites",
    headline: WEBSITES_SERVICE_HERO.headline,
    description: WEBSITES_SERVICE_HERO.description,
    primaryCta: "Plan My Website",
    secondaryCta: WEBSITES_SERVICE_HERO.secondaryCta,
    secondaryHref: WEBSITES_SERVICE_HERO.secondaryHref,
    builds: WEBSITES_OUTCOMES_SECTION.builds.map((item) => ({ ...item })),
    differentiators: WEBSITES_WHY_CHOOSE_SECTION.cards.map((item) => ({ ...item })),
    tiers: [
      { name: "Template Packs", iconKey: "template-packs", price: "From $500", cadence: "one-time", description: "Launch-ready website templates customized for your brand, offer, and conversion flow.", features: ["Basic: $500 - $1k", "Standard: $1k - $3k", "Premium: $3k - $10k", "Setup and handoff docs"], cta: { label: "Browse templates", href: "/digital-products" } },
      { name: "Ready Websites", iconKey: "ready-websites", price: "From $1k", cadence: "one-time", description: "Complete ready-to-deploy websites for teams that need speed without custom-build timelines.", features: ["Basic: $1k - $2.5k", "Standard: $2.5k - $5k", "Premium: $5k - $15k", "Optional install support"], cta: { label: "View ready websites", href: "/digital-products" }, featured: true, badge: "Most chosen" },
      { name: "Custom Build Scope", iconKey: "custom-build-scope", price: "Discovery-based", cadence: "project pricing", description: "For SaaS applications, mobile launch systems, and automation work scoped to your goals.", features: ["SaaS applications: custom scope", "Mobile launch systems: custom scope", "Automation: secondary scope", "Final quote after discovery"], cta: { label: "Book discovery call", href: "/book-appointment" } },
    ],
    faq: WEBSITES_SERVICE_FAQ.map((item) => ({ ...item })),
    stats: WEBSITES_SERVICE_STATS.map((item) => ({ ...item })),
  },
  "mobile-apps": {
    eyebrow: "Mobile Apps",
    headline: MOBILE_APPS_SERVICE_HERO.headline,
    description: MOBILE_APPS_SERVICE_HERO.description,
    primaryCta: "Plan Mobile Launch",
    secondaryCta: MOBILE_APPS_SERVICE_HERO.secondaryCta,
    secondaryHref: MOBILE_APPS_SERVICE_HERO.secondaryHref,
    builds: MOBILE_SYSTEMS_SECTION.builds.map((item) => ({ ...item })),
    differentiators: MOBILE_WHY_BUILD_SECTION.cards.map((item) => ({ ...item })),
    tiers: MOBILE_ENGAGEMENT_SECTION.tiers.map((tier) => ({
      ...tier,
      features: [...tier.features],
    })),
    faq: MOBILE_APPS_SERVICE_FAQ.map((item) => ({ ...item })),
    stats: MOBILE_APPS_SERVICE_STATS.map((item) => ({ ...item })),
  },
  "html-business-profiles": {
    eyebrow: "HTML Business Profiles",
    headline: "Category-based HTML business profiles you can preview and buy fast.",
    description:
      "A dedicated digital-product service for businesses that need profile-style websites quickly. Browse category-based templates, preview each build, and purchase directly from the shop.",
    primaryCta: "Browse profile templates",
    secondaryCta: "Open profile preview hub",
    secondaryHref: "/html-business-profiles",
    builds: [
      { title: "Creative and marketing profiles", description: "Agency, studio, creator, and design-first business profile templates." },
      { title: "Local service profiles", description: "Templates for plumbing, cleaning, moving, security, and field-service businesses." },
      { title: "Corporate profile templates", description: "Enterprise-style profile templates for consulting and corporate services." },
      { title: "Showcase bundles", description: "Volume packs for teams comparing multiple business profile layouts before purchase." },
      { title: "Purchase-ready listing flow", description: "Every profile is wired to shop detail and checkout states." },
      { title: "Customization handoff", description: "Launch-ready structure with optional customization scopes." },
    ],
    differentiators: [
      { title: "Category clarity", description: "Templates are grouped by business category so selection stays focused and fast." },
      { title: "Truthful preview path", description: "Every listed profile has a real preview route before checkout." },
      { title: "Commerce-connected", description: "Templates are mapped into the live shop flow so buyers can purchase without side-channel handoffs." },
      { title: "CMS-extensible", description: "Sanity schema support allows operators to upload additional HTML profile templates over time." },
    ],
    tiers: [
      {
        name: "Single Profile",
        price: "$129-$199",
        cadence: "one-time",
        description: "Pick one profile template based on category and launch quickly with minimal setup.",
        features: ["Single profile template", "Category-aligned structure", "Launch-ready section flow", "Digital delivery"],
        cta: { label: "Shop single templates", href: "/digital-products/category/html-business-profiles" },
      },
      {
        name: "Showcase Bundle",
        price: "$399",
        cadence: "one-time",
        description: "Get a multi-template showcase bundle to compare and choose before full rollout.",
        features: ["Multiple profile templates", "Cross-category examples", "Faster internal selection", "Digital delivery"],
        cta: { label: "View bundles", href: "/html-business-profiles" },
        featured: true,
        badge: "Most chosen",
      },
      {
        name: "Customization Upgrade",
        price: "Custom",
        description: "Need deeper branding, page additions, or integration hooks? We scope this after selection.",
        features: ["Brand and content adaptation", "Additional pages", "Integration planning", "Launch support"],
        cta: { label: "Request customization", href: "/book-appointment" },
      },
    ],
    faq: [
      { question: "Can I preview templates before buying?", answer: "Yes. Use the HTML Business Profiles preview hub to open category-based previews before purchasing." },
      { question: "Are these connected to checkout?", answer: "Yes. Each profile template is represented as a shop product with a direct checkout path." },
      { question: "Can your team customize a purchased profile?", answer: "Yes. After purchase, we can scope branding, content adaptation, and advanced upgrades." },
    ],
    stats: [
      { value: "50+", label: "Built profiles" },
      { value: "3", label: "Core categories" },
      { value: "1-7d", label: "Typical launch window" },
      { value: "100%", label: "Shop purchase coverage" },
    ],
  },
  "ai-business-systems": {
    eyebrow: "AI Business Systems",
    headline: AI_BUSINESS_SYSTEMS_SERVICE_HERO.headline,
    description: AI_BUSINESS_SYSTEMS_SERVICE_HERO.description,
    primaryCta: "Book AI Discovery",
    secondaryCta: AI_BUSINESS_SYSTEMS_SERVICE_HERO.secondaryCta,
    secondaryHref: AI_BUSINESS_SYSTEMS_SERVICE_HERO.secondaryHref,
    builds: AI_VALUE_SECTION.builds.map((item) => ({ ...item })),
    differentiators: AI_WHY_BUILD_SECTION.cards.map((item) => ({ ...item })),
    tiers: AI_ENGAGEMENT_SECTION.tiers.map((tier) => ({
      ...tier,
      features: [...tier.features],
    })),
    faq: AI_BUSINESS_SYSTEMS_SERVICE_FAQ.map((item) => ({ ...item })),
    stats: AI_BUSINESS_SYSTEMS_SERVICE_STATS.map((item) => ({ ...item })),
  },
  automation: {
    eyebrow: "Automation",
    headline: AUTOMATION_SERVICE_HERO.headline,
    description: AUTOMATION_SERVICE_HERO.description,
    primaryCta: "Audit My Workflow",
    secondaryCta: AUTOMATION_SERVICE_HERO.secondaryCta,
    secondaryHref: AUTOMATION_SERVICE_HERO.secondaryHref,
    builds: AUTOMATION_OUTCOMES_SECTION.builds.map((item) => ({ ...item })),
    differentiators: AUTOMATION_WHY_BUILD_SECTION.cards.map((item) => ({ ...item })),
    tiers: AUTOMATION_ENGAGEMENT_SECTION.tiers.map((tier) => ({
      ...tier,
      features: [...tier.features],
    })),
    faq: AUTOMATION_SERVICE_FAQ.map((item) => ({ ...item })),
    stats: AUTOMATION_SERVICE_STATS.map((item) => ({ ...item })),
  },
  "technical-seo": {
    eyebrow: "Technical SEO",
    headline: TECHNICAL_SEO_SERVICE_HERO.headline,
    description: TECHNICAL_SEO_SERVICE_HERO.description,
    primaryCta: "Book SEO Setup",
    secondaryCta: TECHNICAL_SEO_SERVICE_HERO.secondaryCta,
    secondaryHref: TECHNICAL_SEO_SERVICE_HERO.secondaryHref,
    builds: TECHNICAL_SEO_FOUNDATIONS_SECTION.builds.map((item) => ({ ...item })),
    differentiators: TECHNICAL_SEO_WHY_SECTION.cards.map((item) => ({ ...item })),
    tiers: TECHNICAL_SEO_ENGAGEMENT_SECTION.tiers.map((tier) => ({
      ...tier,
      features: [...tier.features],
    })),
    faq: TECHNICAL_SEO_SERVICE_FAQ.map((item) => ({ ...item })),
    stats: [],
  },
};

export function generateStaticParams() {
  return SERVICES.filter((service) => !isHiddenServiceSlug(service.slug)).map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await getPublicService(slug);
  if (!service) return { title: "Service not found", robots: NOINDEX_ROBOTS };
  return buildPageMetadata({
    title: `${service.title} Development`,
    description: service.description,
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (isHiddenServiceSlug(slug)) {
    notFound();
  }
  if (slug === "html-business-profiles") {
    redirect("/digital-products/category/html-business-profiles");
  }
  if (slug === "template-customization") {
    redirect("/services/ai-business-systems");
  }
  const service = await getPublicService(slug);
  const fallbackCopy = COPY[slug as SlugKey];
  if (!service || !fallbackCopy) notFound();

  const cmsCopy = await getSanityServiceDetailContent(slug).catch(() => null);
  const shouldMuteTierPrices = PRICE_MUTED_SERVICE_SLUGS.has(slug as SlugKey);
  const copy = {
    ...fallbackCopy,
    eyebrow: cmsCopy?.heroEyebrow ?? fallbackCopy.eyebrow,
    headline: cmsCopy?.heroHeadline ?? fallbackCopy.headline,
    description: cmsCopy?.heroDescription ?? fallbackCopy.description,
    primaryCta: cmsCopy?.primaryCtaLabel ?? fallbackCopy.primaryCta,
    secondaryCta: cmsCopy?.secondaryCtaLabel ?? fallbackCopy.secondaryCta,
    secondaryHref: cmsCopy?.secondaryCtaHref ?? fallbackCopy.secondaryHref,
    builds: cmsCopy?.builds ?? fallbackCopy.builds,
    differentiators: cmsCopy?.differentiators ?? fallbackCopy.differentiators,
    tiers: (cmsCopy?.tiers ?? fallbackCopy.tiers).map((tier) =>
      shouldMuteTierPrices ? { ...tier, mutePrice: true } : tier
    ),
    faq: cmsCopy?.faq ?? fallbackCopy.faq,
    stats: cmsCopy?.stats ?? fallbackCopy.stats,
  };

  const Icon = ICONS[slug as SlugKey];
  const isWebsitesService = slug === "websites";
  const isSaasService = slug === "saas-applications";
  const isMobileAppsService = slug === "mobile-apps";
  const isAutomationService = slug === "automation";
  const isTechnicalSeoService = slug === "technical-seo";
  const isAiBusinessSystemsService = slug === "ai-business-systems";
  const isConversionServicePage =
    isWebsitesService ||
    isSaasService ||
    isMobileAppsService ||
    isAutomationService ||
    isTechnicalSeoService ||
    isAiBusinessSystemsService;
  const [related, publicProducts] = await Promise.all([
    listPublicPortfolio().then((items) => items.filter((p) => p.service === slug).slice(0, 3)),
    isWebsitesService ? listPublicShopProducts() : Promise.resolve([]),
  ]);

  const htmlPreviewCatalogProducts = isWebsitesService
    ? publicProducts.filter((product) => product.categorySlug === WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG)
    : [];
  const featuredHtmlWebsiteTemplates = isWebsitesService
    ? pickPreviewProducts(publicProducts, WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG, 3, "start")
    : [];
  const htmlPreviewSlides = isWebsitesService ? buildWebsiteTemplateHtmlPreviewSlides(htmlPreviewCatalogProducts) : [];
  const htmlPreviewPrimaryTemplate = htmlPreviewCatalogProducts[0];
  const htmlPreviewFallbackSlide = isWebsitesService
    ? {
        name: htmlPreviewPrimaryTemplate?.name ?? "Website Template",
        type: htmlPreviewPrimaryTemplate?.type ?? WEBSITE_TEMPLATE_PREVIEW.previewBadge,
        price: htmlPreviewPrimaryTemplate?.price ?? "$149",
        href: htmlPreviewPrimaryTemplate
          ? getProductHref(htmlPreviewPrimaryTemplate)
          : "/digital-products/category/website-templates-html-preview",
        previewUrl: listWebsiteTemplateHtmlPreviews()[0]
          ? getWebsiteTemplateHtmlPreviewUrl(listWebsiteTemplateHtmlPreviews()[0].slug)
          : undefined,
      }
    : undefined;

  const serviceSectionPage = isWebsitesService
    ? "service-detail-websites"
    : isSaasService
      ? "service-detail-saas-applications"
      : isMobileAppsService
        ? "service-detail-mobile-apps"
        : isAutomationService
          ? "service-detail-automation"
          : isTechnicalSeoService
            ? "service-detail-technical-seo"
            : isAiBusinessSystemsService
              ? "service-detail-ai-business-systems"
              : "service-detail";

  const heroServiceStats = isWebsitesService
    ? WEBSITES_SERVICE_STATS
    : isSaasService
      ? SAAS_SERVICE_STATS
      : isMobileAppsService
        ? MOBILE_APPS_SERVICE_STATS
        : isAutomationService
          ? AUTOMATION_SERVICE_STATS
          : isTechnicalSeoService
            ? TECHNICAL_SEO_SERVICE_STATS
            : isAiBusinessSystemsService
              ? AI_BUSINESS_SYSTEMS_SERVICE_STATS
              : null;

  const serviceHeroHeadlineLead = isWebsitesService
    ? WEBSITES_SERVICE_HERO.headlineLead
    : isSaasService
      ? SAAS_SERVICE_HERO.headlineLead
      : isMobileAppsService
        ? MOBILE_APPS_SERVICE_HERO.headlineLead
        : isAutomationService
          ? AUTOMATION_SERVICE_HERO.headlineLead
          : isTechnicalSeoService
            ? TECHNICAL_SEO_SERVICE_HERO.headlineLead
            : AI_BUSINESS_SYSTEMS_SERVICE_HERO.headlineLead;

  const serviceHeroHeadlineAccent = isWebsitesService
    ? WEBSITES_SERVICE_HERO.headlineAccent
    : isSaasService
      ? SAAS_SERVICE_HERO.headlineAccent
      : isMobileAppsService
        ? MOBILE_APPS_SERVICE_HERO.headlineAccent
        : isAutomationService
          ? AUTOMATION_SERVICE_HERO.headlineAccent
          : isTechnicalSeoService
            ? TECHNICAL_SEO_SERVICE_HERO.headlineAccent
            : AI_BUSINESS_SYSTEMS_SERVICE_HERO.headlineAccent;

  const serviceDetailDesktopHero = (
    <MarketingSplitHero
      prefix={
        <Link href="/services" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-primary">
          ← All services
        </Link>
      }
      copy={
        <>
          <div className="signal-rise" style={{ animationDelay: "0ms" }}>
            <Badge tone="primary" dot>
              {copy.eyebrow}
            </Badge>
          </div>
          <MarketingHeroTitle
            className="signal-rise mt-5"
            titleLead={serviceHeroHeadlineLead}
            titleAccent={serviceHeroHeadlineAccent}
          />
          <p className="mt-6 text-lg text-text-muted leading-7 signal-rise" style={{ animationDelay: "140ms" }}>
            {copy.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 signal-rise" style={{ animationDelay: "210ms" }}>
            <LinkButton href="/book-appointment" size="lg">
              {copy.primaryCta} <ArrowRightIcon className="size-4" />
            </LinkButton>
            <LinkButton href={copy.secondaryHref} variant="outline" size="lg">
              {copy.secondaryCta}
            </LinkButton>
          </div>
        </>
      }
      panel={
        <div className="signal-rise relative min-w-0 w-full lg:max-w-md lg:ml-auto" style={{ animationDelay: "280ms" }}>
          <Card className="overflow-hidden">
            <div className="mb-5 flex items-center justify-between">
              <div className="inline-flex size-12 items-center justify-center rounded-sm bg-primary/10 text-primary">
                <Icon className="size-6" />
              </div>
              <Badge tone="secondary">{service.delivery_timeline}</Badge>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Engagement style</p>
            <p className="mt-1 font-display text-2xl tracking-tight">{service.short_description}</p>
            <ul className="mt-6 space-y-2.5">
              {service.pillars.map((pillar) => (
                <li key={pillar} className="flex items-center gap-2 text-sm">
                  <CheckIcon className="size-4 text-primary" /> {pillar}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      }
      footer={
        heroServiceStats ? (
          <div className="signal-rise" style={{ animationDelay: "350ms" }}>
            <StatBlock stats={heroServiceStats} containerWidth="shell" />
          </div>
        ) : null
      }
    />
  );

  const engagementModelsSection = (
    <Section
      id="pricing"
      {...marketingSection(
        serviceSectionPage,
        isWebsitesService ||
        isSaasService ||
        isMobileAppsService ||
        isAutomationService ||
        isTechnicalSeoService ||
        isAiBusinessSystemsService
          ? "engagement"
          : "overview",
      )}
    >
      <Container>
        {isWebsitesService ? (
          <MarketingViewportGate
            mobile={
              <EngagementTiersMobile
                eyebrow={WEBSITES_ENGAGEMENT_SECTION.eyebrow}
                title={WEBSITES_ENGAGEMENT_SECTION.title}
                titleLead={WEBSITES_ENGAGEMENT_SECTION.titleLead}
                titleAccent={WEBSITES_ENGAGEMENT_SECTION.titleAccent}
                tiers={copy.tiers}
              />
            }
            desktop={
              <>
                <SectionHeading
                  eyebrow={WEBSITES_ENGAGEMENT_SECTION.eyebrow}
                  title={WEBSITES_ENGAGEMENT_SECTION.title}
                  titleLead={WEBSITES_ENGAGEMENT_SECTION.titleLead}
                  titleAccent={WEBSITES_ENGAGEMENT_SECTION.titleAccent}
                  align="center"
                />
                <RevealGroup className="mt-12 grid auto-rows-fr gap-5 lg:grid-cols-3" stagger={0.08}>
                  {copy.tiers.map((t) => (
                    <RevealItem key={t.name} className="h-full">
                      <PricingTier tier={t} className="h-full" />
                    </RevealItem>
                  ))}
                </RevealGroup>
              </>
            }
          />
        ) : isSaasService ? (
          <MarketingViewportGate
            mobile={
              <EngagementTiersMobile
                eyebrow={SAAS_ENGAGEMENT_SECTION.eyebrow}
                title={SAAS_ENGAGEMENT_SECTION.title}
                titleLead={SAAS_ENGAGEMENT_SECTION.titleLead}
                titleAccent={SAAS_ENGAGEMENT_SECTION.titleAccent}
                tiers={copy.tiers}
              />
            }
            desktop={
              <>
                <SectionHeading
                  eyebrow={SAAS_ENGAGEMENT_SECTION.eyebrow}
                  title={SAAS_ENGAGEMENT_SECTION.title}
                  titleLead={SAAS_ENGAGEMENT_SECTION.titleLead}
                  titleAccent={SAAS_ENGAGEMENT_SECTION.titleAccent}
                  description={SAAS_ENGAGEMENT_SECTION.description}
                  align="center"
                />
                <RevealGroup className="mt-12 grid auto-rows-fr gap-5 lg:grid-cols-3" stagger={0.08}>
                  {copy.tiers.map((t) => (
                    <RevealItem key={t.name} className="h-full">
                      <PricingTier tier={t} className="h-full" />
                    </RevealItem>
                  ))}
                </RevealGroup>
              </>
            }
          />
        ) : isMobileAppsService ? (
          <MarketingViewportGate
            mobile={
              <EngagementTiersMobile
                eyebrow={MOBILE_ENGAGEMENT_SECTION.eyebrow}
                title={MOBILE_ENGAGEMENT_SECTION.title}
                titleLead={MOBILE_ENGAGEMENT_SECTION.titleLead}
                titleAccent={MOBILE_ENGAGEMENT_SECTION.titleAccent}
                tiers={copy.tiers}
              />
            }
            desktop={
              <>
                <SectionHeading
                  eyebrow={MOBILE_ENGAGEMENT_SECTION.eyebrow}
                  title={MOBILE_ENGAGEMENT_SECTION.title}
                  titleLead={MOBILE_ENGAGEMENT_SECTION.titleLead}
                  titleAccent={MOBILE_ENGAGEMENT_SECTION.titleAccent}
                  description={MOBILE_ENGAGEMENT_SECTION.description}
                  align="center"
                />
                <RevealGroup className="mt-12 grid auto-rows-fr gap-5 lg:grid-cols-3" stagger={0.08}>
                  {copy.tiers.map((t) => (
                    <RevealItem key={t.name} className="h-full">
                      <PricingTier tier={t} className="h-full" />
                    </RevealItem>
                  ))}
                </RevealGroup>
              </>
            }
          />
        ) : isAutomationService ? (
          <MarketingViewportGate
            mobile={
              <EngagementTiersMobile
                eyebrow={AUTOMATION_ENGAGEMENT_SECTION.eyebrow}
                title={AUTOMATION_ENGAGEMENT_SECTION.title}
                titleLead={AUTOMATION_ENGAGEMENT_SECTION.titleLead}
                titleAccent={AUTOMATION_ENGAGEMENT_SECTION.titleAccent}
                tiers={copy.tiers}
              />
            }
            desktop={
              <>
                <SectionHeading
                  eyebrow={AUTOMATION_ENGAGEMENT_SECTION.eyebrow}
                  title={AUTOMATION_ENGAGEMENT_SECTION.title}
                  titleLead={AUTOMATION_ENGAGEMENT_SECTION.titleLead}
                  titleAccent={AUTOMATION_ENGAGEMENT_SECTION.titleAccent}
                  description={AUTOMATION_ENGAGEMENT_SECTION.description}
                  align="center"
                />
                <RevealGroup className="mt-12 grid auto-rows-fr gap-5 lg:grid-cols-3" stagger={0.08}>
                  {copy.tiers.map((t) => (
                    <RevealItem key={t.name} className="h-full">
                      <PricingTier tier={t} className="h-full" />
                    </RevealItem>
                  ))}
                </RevealGroup>
              </>
            }
          />
        ) : isTechnicalSeoService ? (
          <MarketingViewportGate
            mobile={
              <EngagementTiersMobile
                eyebrow={TECHNICAL_SEO_ENGAGEMENT_SECTION.eyebrow}
                title={TECHNICAL_SEO_ENGAGEMENT_SECTION.title}
                titleLead={TECHNICAL_SEO_ENGAGEMENT_SECTION.titleLead}
                titleAccent={TECHNICAL_SEO_ENGAGEMENT_SECTION.titleAccent}
                tiers={copy.tiers}
              />
            }
            desktop={
              <>
                <SectionHeading
                  eyebrow={TECHNICAL_SEO_ENGAGEMENT_SECTION.eyebrow}
                  title={TECHNICAL_SEO_ENGAGEMENT_SECTION.title}
                  titleLead={TECHNICAL_SEO_ENGAGEMENT_SECTION.titleLead}
                  titleAccent={TECHNICAL_SEO_ENGAGEMENT_SECTION.titleAccent}
                  description={TECHNICAL_SEO_ENGAGEMENT_SECTION.description}
                  align="center"
                />
                <RevealGroup className="mt-12 grid auto-rows-fr gap-5 lg:grid-cols-3" stagger={0.08}>
                  {copy.tiers.map((t) => (
                    <RevealItem key={t.name} className="h-full">
                      <PricingTier tier={t} className="h-full" />
                    </RevealItem>
                  ))}
                </RevealGroup>
              </>
            }
          />
        ) : isAiBusinessSystemsService ? (
          <MarketingViewportGate
            mobile={
              <EngagementTiersMobile
                eyebrow={AI_ENGAGEMENT_SECTION.eyebrow}
                title={AI_ENGAGEMENT_SECTION.title}
                titleLead={AI_ENGAGEMENT_SECTION.titleLead}
                titleAccent={AI_ENGAGEMENT_SECTION.titleAccent}
                tiers={copy.tiers}
              />
            }
            desktop={
              <>
                <SectionHeading
                  eyebrow={AI_ENGAGEMENT_SECTION.eyebrow}
                  title={AI_ENGAGEMENT_SECTION.title}
                  titleLead={AI_ENGAGEMENT_SECTION.titleLead}
                  titleAccent={AI_ENGAGEMENT_SECTION.titleAccent}
                  description={AI_ENGAGEMENT_SECTION.description}
                  align="center"
                />
                <RevealGroup className="mt-12 grid auto-rows-fr gap-5 lg:grid-cols-3" stagger={0.08}>
                  {copy.tiers.map((t) => (
                    <RevealItem key={t.name} className="h-full">
                      <PricingTier tier={t} className="h-full" />
                    </RevealItem>
                  ))}
                </RevealGroup>
              </>
            }
          />
        ) : (
          <>
        <SectionHeading
          eyebrow={
            isSaasService
              ? SAAS_ENGAGEMENT_SECTION.eyebrow
              : isMobileAppsService
                ? MOBILE_ENGAGEMENT_SECTION.eyebrow
                : isAutomationService
                  ? AUTOMATION_ENGAGEMENT_SECTION.eyebrow
                  : isTechnicalSeoService
                    ? TECHNICAL_SEO_ENGAGEMENT_SECTION.eyebrow
                    : isAiBusinessSystemsService
                      ? AI_ENGAGEMENT_SECTION.eyebrow
                      : "Engagement models"
          }
          title={
            isSaasService
              ? SAAS_ENGAGEMENT_SECTION.title
              : isMobileAppsService
                ? MOBILE_ENGAGEMENT_SECTION.title
                : isAutomationService
                  ? AUTOMATION_ENGAGEMENT_SECTION.title
                  : isTechnicalSeoService
                    ? TECHNICAL_SEO_ENGAGEMENT_SECTION.title
                    : isAiBusinessSystemsService
                      ? AI_ENGAGEMENT_SECTION.title
                      : "Pick the surface area that matches the work."
          }
          description={
            isSaasService
              ? SAAS_ENGAGEMENT_SECTION.description
              : isMobileAppsService
                ? MOBILE_ENGAGEMENT_SECTION.description
                : isAutomationService
                  ? AUTOMATION_ENGAGEMENT_SECTION.description
                  : isTechnicalSeoService
                    ? TECHNICAL_SEO_ENGAGEMENT_SECTION.description
                    : isAiBusinessSystemsService
                      ? AI_ENGAGEMENT_SECTION.description
                      : undefined
          }
          align="center"
        />
        <RevealGroup className="mt-12 grid auto-rows-fr gap-5 lg:grid-cols-3" stagger={0.08}>
          {copy.tiers.map((t) => (
            <RevealItem key={t.name} className="h-full">
              <PricingTier tier={t} className="h-full" />
            </RevealItem>
          ))}
        </RevealGroup>
          </>
        )}
        {isSaasService ? (
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-6 text-text-muted">
            {SAAS_ENGAGEMENT_SECTION.trustNote}
          </p>
        ) : null}
        {isMobileAppsService ? (
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-6 text-text-muted">
            {MOBILE_ENGAGEMENT_SECTION.trustNote}
          </p>
        ) : null}
        {isAutomationService ? (
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-6 text-text-muted">
            {AUTOMATION_ENGAGEMENT_SECTION.trustNote}
          </p>
        ) : null}
        {isTechnicalSeoService ? (
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-6 text-text-muted">
            {TECHNICAL_SEO_ENGAGEMENT_SECTION.trustNote}
          </p>
        ) : null}
        {isAiBusinessSystemsService ? (
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-6 text-text-muted">
            {AI_ENGAGEMENT_SECTION.trustNote}
          </p>
        ) : null}
      </Container>
    </Section>
  );

  const serviceStructuredData: JsonLdData[] = [
    buildServiceSchema({
      name: service.title,
      description: service.description,
      path: `/services/${slug}`,
    }),
    buildBreadcrumbListSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: service.title, path: `/services/${slug}` },
    ]),
    ...(buildFaqPageSchema(copy.faq) ? [buildFaqPageSchema(copy.faq)!] : []),
  ];

  return (
    <>
      <JsonLd data={serviceStructuredData} />
      <Section {...marketingSection("service-detail", "hero")} layout="viewport" className="hero-section relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" aria-hidden />
        <Container className={HERO_VIEWPORT_CONTAINER_CLASS}>
          {(isConversionServicePage && heroServiceStats) ? (
            <MarketingViewportGate
              mobile={
                <ServiceDetailHeroMobile
                  eyebrow={copy.eyebrow}
                  headlineLead={
                    isWebsitesService
                      ? WEBSITES_SERVICE_HERO.headlineLead
                      : isSaasService
                        ? SAAS_SERVICE_HERO.headlineLead
                        : isMobileAppsService
                          ? MOBILE_APPS_SERVICE_HERO.headlineLead
                          : isAutomationService
                            ? AUTOMATION_SERVICE_HERO.headlineLead
                            : isTechnicalSeoService
                              ? TECHNICAL_SEO_SERVICE_HERO.headlineLead
                              : AI_BUSINESS_SYSTEMS_SERVICE_HERO.headlineLead
                  }
                  headlineAccent={
                    isWebsitesService
                      ? WEBSITES_SERVICE_HERO.headlineAccent
                      : isSaasService
                        ? SAAS_SERVICE_HERO.headlineAccent
                        : isMobileAppsService
                          ? MOBILE_APPS_SERVICE_HERO.headlineAccent
                          : isAutomationService
                            ? AUTOMATION_SERVICE_HERO.headlineAccent
                            : isTechnicalSeoService
                              ? TECHNICAL_SEO_SERVICE_HERO.headlineAccent
                              : AI_BUSINESS_SYSTEMS_SERVICE_HERO.headlineAccent
                  }
                  description={copy.description}
                  primaryCta={copy.primaryCta}
                  secondaryCta={copy.secondaryCta}
                  secondaryHref={copy.secondaryHref}
                  deliveryTimeline={service.delivery_timeline}
                  engagementSummary={service.short_description}
                  pillars={service.pillars}
                  stats={heroServiceStats}
                  icon={Icon}
                />
              }
              desktop={serviceDetailDesktopHero}
            />
          ) : (
            serviceDetailDesktopHero
          )}
        </Container>
      </Section>

      {isAiBusinessSystemsService ? (
        <Section
          id={AI_SOLUTIONS_SECTION.id}
          {...marketingSection("service-detail-ai-business-systems", "ai-solutions")}
        >
          <Container>
            <MarketingViewportGate
              mobile={<AiSolutionsMobile />}
              desktop={
                <>
                  <SectionHeading
                    eyebrow={AI_SOLUTIONS_SECTION.eyebrow}
                    title={AI_SOLUTIONS_SECTION.title}
                    titleLead={AI_SOLUTIONS_SECTION.titleLead}
                    titleAccent={AI_SOLUTIONS_SECTION.titleAccent}
                    description={AI_SOLUTIONS_SECTION.description}
                  />
                  <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
                    {AI_SOLUTIONS_SECTION.items.map((item) => (
                      <RevealItem key={item.title} className="h-full">
                        <Card hoverable className="h-full">
                          <h3 className="font-display text-lg tracking-tight">{item.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-text-muted">{item.description}</p>
                        </Card>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </>
              }
            />
          </Container>
        </Section>
      ) : null}

      {isAutomationService ? (
        <>
          <Section
            id={AUTOMATION_WORKFLOW_SHOWCASE_SECTION.id}
            {...marketingSection("service-detail-automation", "workflow-showcase")}
            className="overflow-x-hidden"
          >
            <Container className="min-w-0">
              <MarketingViewportGate
                mobile={<AutomationWorkflowShowcaseMobile />}
                desktop={
                  <>
                    <SectionHeading
                      eyebrow={AUTOMATION_WORKFLOW_SHOWCASE_SECTION.eyebrow}
                      title={AUTOMATION_WORKFLOW_SHOWCASE_SECTION.title}
                      titleLead={AUTOMATION_WORKFLOW_SHOWCASE_SECTION.titleLead}
                      titleAccent={AUTOMATION_WORKFLOW_SHOWCASE_SECTION.titleAccent}
                      description={AUTOMATION_WORKFLOW_SHOWCASE_SECTION.description}
                    />
                    <AutomationWorkflowShowcase
                      workflows={[...AUTOMATION_WORKFLOW_SHOWCASE_SECTION.workflows]}
                    />
                  </>
                }
              />
            </Container>
          </Section>

          <Section {...marketingSection("service-detail-automation", "automation-types")}>
            <Container>
              <MarketingViewportGate
                mobile={<AutomationTypesMobile />}
                desktop={
                  <>
                    <SectionHeading
                      eyebrow={AUTOMATION_TYPES_SECTION.eyebrow}
                      title={AUTOMATION_TYPES_SECTION.title}
                      titleLead={AUTOMATION_TYPES_SECTION.titleLead}
                      titleAccent={AUTOMATION_TYPES_SECTION.titleAccent}
                      description={AUTOMATION_TYPES_SECTION.description}
                    />
                    <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
                      {AUTOMATION_TYPES_SECTION.items.map((item) => (
                        <RevealItem key={item.title} className="h-full">
                          <Card hoverable className="h-full">
                            <h3 className="font-display text-lg tracking-tight">{item.title}</h3>
                            <p className="mt-2 text-sm leading-6 text-text-muted">{item.description}</p>
                          </Card>
                        </RevealItem>
                      ))}
                    </RevealGroup>
                  </>
                }
              />
            </Container>
          </Section>
        </>
      ) : null}

      {isTechnicalSeoService ? (
        <Section
          id={TECHNICAL_SEO_VISIBILITY_SECTION.id}
          {...marketingSection("service-detail-technical-seo", "search-foundation")}
          className="overflow-x-hidden"
        >
          <Container className="min-w-0">
            <MarketingViewportGate
              mobile={<SeoVisibilityFoundationMobile />}
              desktop={
                <>
                  <SectionHeading
                    eyebrow={TECHNICAL_SEO_VISIBILITY_SECTION.eyebrow}
                    title={TECHNICAL_SEO_VISIBILITY_SECTION.title}
                    titleLead={TECHNICAL_SEO_VISIBILITY_SECTION.titleLead}
                    titleAccent={TECHNICAL_SEO_VISIBILITY_SECTION.titleAccent}
                    description={TECHNICAL_SEO_VISIBILITY_SECTION.description}
                  />
                  <SeoVisibilityFoundation
                    flow={TECHNICAL_SEO_VISIBILITY_SECTION.flow}
                    withoutSetup={TECHNICAL_SEO_VISIBILITY_SECTION.withoutSetup}
                    withSetup={TECHNICAL_SEO_VISIBILITY_SECTION.withSetup}
                  />
                </>
              }
            />
          </Container>
        </Section>
      ) : null}

      {isTechnicalSeoService ? (
        <Section
          id={TECHNICAL_SEO_SETUP_CATEGORIES_SECTION.id}
          {...marketingSection("service-detail-technical-seo", "setup-categories")}
        >
          <Container>
            <MarketingViewportGate
              mobile={<TechnicalSeoSetupCategoriesMobile />}
              desktop={
                <>
                  <SectionHeading
                    eyebrow={TECHNICAL_SEO_SETUP_CATEGORIES_SECTION.eyebrow}
                    title={TECHNICAL_SEO_SETUP_CATEGORIES_SECTION.title}
                    titleLead={TECHNICAL_SEO_SETUP_CATEGORIES_SECTION.titleLead}
                    titleAccent={TECHNICAL_SEO_SETUP_CATEGORIES_SECTION.titleAccent}
                    description={TECHNICAL_SEO_SETUP_CATEGORIES_SECTION.description}
                  />
                  <TechnicalSeoSetupCategories
                    categories={[...TECHNICAL_SEO_SETUP_CATEGORIES_SECTION.categories]}
                    footerNote={TECHNICAL_SEO_SETUP_CATEGORIES_SECTION.footerNote}
                  />
                </>
              }
            />
          </Container>
        </Section>
      ) : null}

      {isWebsitesService ? (
        <>
          <FeaturedProducts
            products={featuredHtmlWebsiteTemplates}
            variant="html-preview"
            maxProducts={3}
            sectionShell={marketingSection("service-detail-websites", "featured-templates")}
            eyebrow={WEBSITES_FEATURED_TEMPLATES_COPY.eyebrow}
            title={WEBSITES_FEATURED_TEMPLATES_COPY.title}
            titleLead={WEBSITES_FEATURED_TEMPLATES_COPY.titleLead}
            titleAccent={WEBSITES_FEATURED_TEMPLATES_COPY.titleAccent}
            description={WEBSITES_FEATURED_TEMPLATES_COPY.description}
            ctaHref="/digital-products/category/website-templates-html-preview#profiles"
            ctaLabel={WEBSITE_TEMPLATE_PREVIEW.browseTemplatePreviewsCta}
          />

          <HomeHtmlPreviewSection
            slides={htmlPreviewSlides}
            emptyFallbackSlide={htmlPreviewFallbackSlide}
            sectionShell={marketingSection("service-detail-websites", "preview")}
            title={HOME_PREVIEW_COPY.title}
            description={HOME_PREVIEW_COPY.description}
          />

          {engagementModelsSection}
        </>
      ) : null}

      {!isConversionServicePage && (
        <Section size="compact">
          <StatBlock stats={HOME_STATS} />
        </Section>
      )}

      {isMobileAppsService ? (
        <Section {...marketingSection("service-detail-mobile-apps", "product-types")}>
          <Container>
            <MarketingViewportGate
              mobile={<MobileAppsProductTypesMobile />}
              desktop={
                <>
                  <SectionHeading
                    eyebrow={MOBILE_PRODUCT_TYPES_SECTION.eyebrow}
                    title={MOBILE_PRODUCT_TYPES_SECTION.title}
                    titleLead={MOBILE_PRODUCT_TYPES_SECTION.titleLead}
                    titleAccent={MOBILE_PRODUCT_TYPES_SECTION.titleAccent}
                    description={MOBILE_PRODUCT_TYPES_SECTION.description}
                  />
                  <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
                    {MOBILE_PRODUCT_TYPES_SECTION.items.map((item) => (
                      <RevealItem key={item.title} className="h-full">
                        <Card hoverable className="h-full">
                          <h3 className="font-display text-lg tracking-tight">{item.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-text-muted">{item.description}</p>
                        </Card>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </>
              }
            />
          </Container>
        </Section>
      ) : null}

      {isSaasService ? (
        <Section {...marketingSection("service-detail-saas-applications", "product-types")}>
          <Container>
            <MarketingViewportGate
              mobile={<SaasProductTypesMobile />}
              desktop={
                <>
                  <SectionHeading
                    eyebrow={SAAS_PRODUCT_TYPES_SECTION.eyebrow}
                    title={SAAS_PRODUCT_TYPES_SECTION.title}
                    titleLead={SAAS_PRODUCT_TYPES_SECTION.titleLead}
                    titleAccent={SAAS_PRODUCT_TYPES_SECTION.titleAccent}
                    description={SAAS_PRODUCT_TYPES_SECTION.description}
                  />
                  <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
                    {SAAS_PRODUCT_TYPES_SECTION.items.map((item) => (
                      <RevealItem key={item.title} className="h-full">
                        <Card hoverable className="h-full">
                          <h3 className="font-display text-lg tracking-tight">{item.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-text-muted">{item.description}</p>
                        </Card>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </>
              }
            />
          </Container>
        </Section>
      ) : null}

      {isSaasService ? (
        <Section {...marketingSection("service-detail-saas-applications", "stack")}>
          <Container>
            <MarketingViewportGate
              mobile={<SaasStackSectionMobile />}
              desktop={
                <>
                  <SectionHeading
                    eyebrow={SAAS_STACK_SECTION.eyebrow}
                    title={SAAS_STACK_SECTION.title}
                    titleLead={SAAS_STACK_SECTION.titleLead}
                    titleAccent={SAAS_STACK_SECTION.titleAccent}
                    description={SAAS_STACK_SECTION.description}
                  />
                  <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
                    {SAAS_STACK_SECTION.benefits.map((benefit) => (
                      <RevealItem key={benefit.title} className="h-full">
                        <Card hoverable className="h-full">
                          <h3 className="font-display text-lg tracking-tight">{benefit.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-text-muted">{benefit.description}</p>
                        </Card>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                  <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
                    {SAAS_STACK_GROUPS.map((group) => (
                      <RevealItem key={group.category} className="h-full">
                        <Card hoverable className="h-full">
                          <p className="font-mono text-[11px] uppercase tracking-wider text-primary">{group.category}</p>
                          <ul className="mt-3 space-y-1.5">
                            {group.items.map((item) => (
                              <li key={item} className="flex items-center gap-2 text-sm text-text-muted">
                                <CheckIcon className="size-3.5 shrink-0 text-primary" aria-hidden />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </Card>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                  <p className="mt-8 text-center text-sm text-text-muted max-w-2xl mx-auto">
                    {SAAS_STACK_SECTION.footerNote}
                  </p>
                </>
              }
            />
          </Container>
        </Section>
      ) : null}

      <Section {...marketingSection(serviceSectionPage, "overview")}>
        <Container>
          {isWebsitesService ? (
            <MarketingViewportGate
              mobile={
                <OutcomeCardsMobile
                  eyebrow={WEBSITES_OUTCOMES_SECTION.eyebrow}
                  title={WEBSITES_OUTCOMES_SECTION.title}
                  titleLead={WEBSITES_OUTCOMES_SECTION.titleLead}
                  titleAccent={WEBSITES_OUTCOMES_SECTION.titleAccent}
                  description={WEBSITES_OUTCOMES_SECTION.description}
                  cards={WEBSITES_OUTCOMES_SECTION.builds}
                />
              }
              desktop={
                <WebsitesOutcomesDesktop
                  eyebrow={WEBSITES_OUTCOMES_SECTION.eyebrow}
                  title={WEBSITES_OUTCOMES_SECTION.title}
                  titleLead={WEBSITES_OUTCOMES_SECTION.titleLead}
                  titleAccent={WEBSITES_OUTCOMES_SECTION.titleAccent}
                  description={WEBSITES_OUTCOMES_SECTION.description}
                  items={WEBSITES_OUTCOMES_SECTION.builds}
                />
              }
            />
          ) : isSaasService ? (
            <MarketingViewportGate
              mobile={
                <MobileFeatureGrid
                  eyebrow={SAAS_SYSTEMS_SECTION.eyebrow}
                  title={SAAS_SYSTEMS_SECTION.title}
                  titleLead={SAAS_SYSTEMS_SECTION.titleLead}
                  titleAccent={SAAS_SYSTEMS_SECTION.titleAccent}
                  description={SAAS_SYSTEMS_SECTION.description}
                  items={SAAS_SYSTEMS_SECTION.builds}
                />
              }
              desktop={
                <>
                  <SectionHeading
                    eyebrow={SAAS_SYSTEMS_SECTION.eyebrow}
                    title={SAAS_SYSTEMS_SECTION.title}
                    titleLead={SAAS_SYSTEMS_SECTION.titleLead}
                    titleAccent={SAAS_SYSTEMS_SECTION.titleAccent}
                    description={SAAS_SYSTEMS_SECTION.description}
                  />
                  <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
                    {copy.builds.map((b) => (
                      <RevealItem key={b.title} className="h-full">
                        <Card hoverable className="h-full">
                          <h3 className="font-display text-lg tracking-tight">{b.title}</h3>
                          <p className="mt-2 text-sm text-text-muted leading-6">{b.description}</p>
                        </Card>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </>
              }
            />
          ) : isMobileAppsService ? (
            <MarketingViewportGate
              mobile={
                <MobileFeatureGrid
                  eyebrow={MOBILE_SYSTEMS_SECTION.eyebrow}
                  title={MOBILE_SYSTEMS_SECTION.title}
                  titleLead={MOBILE_SYSTEMS_SECTION.titleLead}
                  titleAccent={MOBILE_SYSTEMS_SECTION.titleAccent}
                  description={MOBILE_SYSTEMS_SECTION.description}
                  items={MOBILE_SYSTEMS_SECTION.builds}
                />
              }
              desktop={
                <>
                  <SectionHeading
                    eyebrow={MOBILE_SYSTEMS_SECTION.eyebrow}
                    title={MOBILE_SYSTEMS_SECTION.title}
                    titleLead={MOBILE_SYSTEMS_SECTION.titleLead}
                    titleAccent={MOBILE_SYSTEMS_SECTION.titleAccent}
                    description={MOBILE_SYSTEMS_SECTION.description}
                  />
                  <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
                    {copy.builds.map((b) => (
                      <RevealItem key={b.title} className="h-full">
                        <Card hoverable className="h-full">
                          <h3 className="font-display text-lg tracking-tight">{b.title}</h3>
                          <p className="mt-2 text-sm text-text-muted leading-6">{b.description}</p>
                        </Card>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </>
              }
            />
          ) : isAutomationService ? (
            <MarketingViewportGate
              mobile={
                <MobileFeatureGrid
                  eyebrow={AUTOMATION_OUTCOMES_SECTION.eyebrow}
                  title={AUTOMATION_OUTCOMES_SECTION.title}
                  titleLead={AUTOMATION_OUTCOMES_SECTION.titleLead}
                  titleAccent={AUTOMATION_OUTCOMES_SECTION.titleAccent}
                  description={AUTOMATION_OUTCOMES_SECTION.description}
                  items={AUTOMATION_OUTCOMES_SECTION.builds}
                />
              }
              desktop={
                <>
                  <SectionHeading
                    eyebrow={AUTOMATION_OUTCOMES_SECTION.eyebrow}
                    title={AUTOMATION_OUTCOMES_SECTION.title}
                    titleLead={AUTOMATION_OUTCOMES_SECTION.titleLead}
                    titleAccent={AUTOMATION_OUTCOMES_SECTION.titleAccent}
                    description={AUTOMATION_OUTCOMES_SECTION.description}
                  />
                  <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
                    {copy.builds.map((b) => (
                      <RevealItem key={b.title} className="h-full">
                        <Card hoverable className="h-full">
                          <h3 className="font-display text-lg tracking-tight">{b.title}</h3>
                          <p className="mt-2 text-sm text-text-muted leading-6">{b.description}</p>
                        </Card>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </>
              }
            />
          ) : isTechnicalSeoService ? (
            <MarketingViewportGate
              mobile={
                <MobileFeatureGrid
                  eyebrow={TECHNICAL_SEO_FOUNDATIONS_SECTION.eyebrow}
                  title={TECHNICAL_SEO_FOUNDATIONS_SECTION.title}
                  titleLead={TECHNICAL_SEO_FOUNDATIONS_SECTION.titleLead}
                  titleAccent={TECHNICAL_SEO_FOUNDATIONS_SECTION.titleAccent}
                  description={TECHNICAL_SEO_FOUNDATIONS_SECTION.description}
                  items={TECHNICAL_SEO_FOUNDATIONS_SECTION.builds}
                />
              }
              desktop={
                <>
                  <SectionHeading
                    eyebrow={TECHNICAL_SEO_FOUNDATIONS_SECTION.eyebrow}
                    title={TECHNICAL_SEO_FOUNDATIONS_SECTION.title}
                    titleLead={TECHNICAL_SEO_FOUNDATIONS_SECTION.titleLead}
                    titleAccent={TECHNICAL_SEO_FOUNDATIONS_SECTION.titleAccent}
                    description={TECHNICAL_SEO_FOUNDATIONS_SECTION.description}
                  />
                  <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
                    {copy.builds.map((b) => (
                      <RevealItem key={b.title} className="h-full">
                        <Card hoverable className="h-full">
                          <h3 className="font-display text-lg tracking-tight">{b.title}</h3>
                          <p className="mt-2 text-sm text-text-muted leading-6">{b.description}</p>
                        </Card>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </>
              }
            />
          ) : isAiBusinessSystemsService ? (
            <MarketingViewportGate
              mobile={
                <MobileFeatureGrid
                  eyebrow={AI_VALUE_SECTION.eyebrow}
                  title={AI_VALUE_SECTION.title}
                  titleLead={AI_VALUE_SECTION.titleLead}
                  titleAccent={AI_VALUE_SECTION.titleAccent}
                  description={AI_VALUE_SECTION.description}
                  items={AI_VALUE_SECTION.builds}
                />
              }
              desktop={
                <>
                  <SectionHeading
                    eyebrow={AI_VALUE_SECTION.eyebrow}
                    title={AI_VALUE_SECTION.title}
                    titleLead={AI_VALUE_SECTION.titleLead}
                    titleAccent={AI_VALUE_SECTION.titleAccent}
                    description={AI_VALUE_SECTION.description}
                  />
                  <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
                    {copy.builds.map((b) => (
                      <RevealItem key={b.title} className="h-full">
                        <Card hoverable className="h-full">
                          <h3 className="font-display text-lg tracking-tight">{b.title}</h3>
                          <p className="mt-2 text-sm text-text-muted leading-6">{b.description}</p>
                        </Card>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </>
              }
            />
          ) : (
            <>
          <SectionHeading
            eyebrow={
              isSaasService
                ? SAAS_SYSTEMS_SECTION.eyebrow
                : isMobileAppsService
                  ? MOBILE_SYSTEMS_SECTION.eyebrow
                  : isAutomationService
                    ? AUTOMATION_OUTCOMES_SECTION.eyebrow
                    : isTechnicalSeoService
                      ? TECHNICAL_SEO_FOUNDATIONS_SECTION.eyebrow
                      : isAiBusinessSystemsService
                        ? AI_VALUE_SECTION.eyebrow
                        : "What gets built"
            }
            title={
              isSaasService
                ? SAAS_SYSTEMS_SECTION.title
                : isMobileAppsService
                  ? MOBILE_SYSTEMS_SECTION.title
                  : isAutomationService
                    ? AUTOMATION_OUTCOMES_SECTION.title
                    : isTechnicalSeoService
                      ? TECHNICAL_SEO_FOUNDATIONS_SECTION.title
                      : isAiBusinessSystemsService
                        ? AI_VALUE_SECTION.title
                        : "The actual surfaces and systems we ship."
            }
            description={
              isSaasService
                ? SAAS_SYSTEMS_SECTION.description
                : isMobileAppsService
                  ? MOBILE_SYSTEMS_SECTION.description
                  : isAutomationService
                    ? AUTOMATION_OUTCOMES_SECTION.description
                    : isTechnicalSeoService
                      ? TECHNICAL_SEO_FOUNDATIONS_SECTION.description
                      : isAiBusinessSystemsService
                        ? AI_VALUE_SECTION.description
                        : undefined
            }
          />
          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {copy.builds.map((b) => (
              <RevealItem key={b.title} className="h-full">
                <Card hoverable className="h-full">
                  <h3 className="font-display text-lg tracking-tight">{b.title}</h3>
                  <p className="mt-2 text-sm text-text-muted leading-6">{b.description}</p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
            </>
          )}
        </Container>
      </Section>

      <Section {...marketingSection(serviceSectionPage, "deliverables")}>
        <Container>
          {isWebsitesService ? (
            <MarketingViewportGate
              mobile={
                <PrincipleCardsMobile
                  eyebrow={WEBSITES_WHY_CHOOSE_SECTION.eyebrow}
                  title={WEBSITES_WHY_CHOOSE_SECTION.title}
                  titleLead={WEBSITES_WHY_CHOOSE_SECTION.titleLead}
                  titleAccent={WEBSITES_WHY_CHOOSE_SECTION.titleAccent}
                  description={WEBSITES_WHY_CHOOSE_SECTION.description}
                  cards={WEBSITES_WHY_CHOOSE_SECTION.cards}
                />
              }
              desktop={
                <WebsitesPrinciplesDesktop
                  eyebrow={WEBSITES_WHY_CHOOSE_SECTION.eyebrow}
                  title={WEBSITES_WHY_CHOOSE_SECTION.title}
                  titleLead={WEBSITES_WHY_CHOOSE_SECTION.titleLead}
                  titleAccent={WEBSITES_WHY_CHOOSE_SECTION.titleAccent}
                  description={WEBSITES_WHY_CHOOSE_SECTION.description}
                  items={WEBSITES_WHY_CHOOSE_SECTION.cards}
                />
              }
            />
          ) : isSaasService ? (
            <MarketingViewportGate
              mobile={
                <MobilePrincipleList
                  eyebrow={SAAS_WHY_FOUNDERS_SECTION.eyebrow}
                  title={SAAS_WHY_FOUNDERS_SECTION.title}
                  titleLead={SAAS_WHY_FOUNDERS_SECTION.titleLead}
                  titleAccent={SAAS_WHY_FOUNDERS_SECTION.titleAccent}
                  description={SAAS_WHY_FOUNDERS_SECTION.description}
                  items={SAAS_WHY_FOUNDERS_SECTION.cards}
                />
              }
              desktop={
                <>
                  <SectionHeading
                    eyebrow={SAAS_WHY_FOUNDERS_SECTION.eyebrow}
                    title={SAAS_WHY_FOUNDERS_SECTION.title}
                    titleLead={SAAS_WHY_FOUNDERS_SECTION.titleLead}
                    titleAccent={SAAS_WHY_FOUNDERS_SECTION.titleAccent}
                    description={SAAS_WHY_FOUNDERS_SECTION.description}
                  />
                  <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2" stagger={0.07}>
                    {copy.differentiators.map((d) => (
                      <RevealItem key={d.title} className="h-full">
                        <div className="h-full rounded-md border border-border bg-surface p-6">
                          <h3 className="font-display text-xl tracking-tight">{d.title}</h3>
                          <p className="mt-2 text-text-muted leading-7 text-pretty">{d.description}</p>
                        </div>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </>
              }
            />
          ) : isMobileAppsService ? (
            <MarketingViewportGate
              mobile={
                <MobilePrincipleList
                  eyebrow={MOBILE_WHY_BUILD_SECTION.eyebrow}
                  title={MOBILE_WHY_BUILD_SECTION.title}
                  titleLead={MOBILE_WHY_BUILD_SECTION.titleLead}
                  titleAccent={MOBILE_WHY_BUILD_SECTION.titleAccent}
                  description={MOBILE_WHY_BUILD_SECTION.description}
                  items={MOBILE_WHY_BUILD_SECTION.cards}
                />
              }
              desktop={
                <>
                  <SectionHeading
                    eyebrow={MOBILE_WHY_BUILD_SECTION.eyebrow}
                    title={MOBILE_WHY_BUILD_SECTION.title}
                    titleLead={MOBILE_WHY_BUILD_SECTION.titleLead}
                    titleAccent={MOBILE_WHY_BUILD_SECTION.titleAccent}
                    description={MOBILE_WHY_BUILD_SECTION.description}
                  />
                  <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2" stagger={0.07}>
                    {copy.differentiators.map((d) => (
                      <RevealItem key={d.title} className="h-full">
                        <div className="h-full rounded-md border border-border bg-surface p-6">
                          <h3 className="font-display text-xl tracking-tight">{d.title}</h3>
                          <p className="mt-2 text-text-muted leading-7 text-pretty">{d.description}</p>
                        </div>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </>
              }
            />
          ) : isAutomationService ? (
            <MarketingViewportGate
              mobile={
                <MobilePrincipleList
                  eyebrow={AUTOMATION_WHY_BUILD_SECTION.eyebrow}
                  title={AUTOMATION_WHY_BUILD_SECTION.title}
                  titleLead={AUTOMATION_WHY_BUILD_SECTION.titleLead}
                  titleAccent={AUTOMATION_WHY_BUILD_SECTION.titleAccent}
                  description={AUTOMATION_WHY_BUILD_SECTION.description}
                  items={AUTOMATION_WHY_BUILD_SECTION.cards}
                />
              }
              desktop={
                <>
                  <SectionHeading
                    eyebrow={AUTOMATION_WHY_BUILD_SECTION.eyebrow}
                    title={AUTOMATION_WHY_BUILD_SECTION.title}
                    titleLead={AUTOMATION_WHY_BUILD_SECTION.titleLead}
                    titleAccent={AUTOMATION_WHY_BUILD_SECTION.titleAccent}
                    description={AUTOMATION_WHY_BUILD_SECTION.description}
                  />
                  <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2" stagger={0.07}>
                    {copy.differentiators.map((d) => (
                      <RevealItem key={d.title} className="h-full">
                        <div className="h-full rounded-md border border-border bg-surface p-6">
                          <h3 className="font-display text-xl tracking-tight">{d.title}</h3>
                          <p className="mt-2 text-text-muted leading-7 text-pretty">{d.description}</p>
                        </div>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </>
              }
            />
          ) : isTechnicalSeoService ? (
            <MarketingViewportGate
              mobile={
                <MobilePrincipleList
                  eyebrow={TECHNICAL_SEO_WHY_SECTION.eyebrow}
                  title={TECHNICAL_SEO_WHY_SECTION.title}
                  titleLead={TECHNICAL_SEO_WHY_SECTION.titleLead}
                  titleAccent={TECHNICAL_SEO_WHY_SECTION.titleAccent}
                  description={TECHNICAL_SEO_WHY_SECTION.description}
                  items={TECHNICAL_SEO_WHY_SECTION.cards}
                />
              }
              desktop={
                <>
                  <SectionHeading
                    eyebrow={TECHNICAL_SEO_WHY_SECTION.eyebrow}
                    title={TECHNICAL_SEO_WHY_SECTION.title}
                    titleLead={TECHNICAL_SEO_WHY_SECTION.titleLead}
                    titleAccent={TECHNICAL_SEO_WHY_SECTION.titleAccent}
                    description={TECHNICAL_SEO_WHY_SECTION.description}
                  />
                  <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2" stagger={0.07}>
                    {copy.differentiators.map((d) => (
                      <RevealItem key={d.title} className="h-full">
                        <div className="h-full rounded-md border border-border bg-surface p-6">
                          <h3 className="font-display text-xl tracking-tight">{d.title}</h3>
                          <p className="mt-2 text-text-muted leading-7 text-pretty">{d.description}</p>
                        </div>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </>
              }
            />
          ) : isAiBusinessSystemsService ? (
            <MarketingViewportGate
              mobile={
                <MobilePrincipleList
                  eyebrow={AI_WHY_BUILD_SECTION.eyebrow}
                  title={AI_WHY_BUILD_SECTION.title}
                  titleLead={AI_WHY_BUILD_SECTION.titleLead}
                  titleAccent={AI_WHY_BUILD_SECTION.titleAccent}
                  description={AI_WHY_BUILD_SECTION.description}
                  items={AI_WHY_BUILD_SECTION.cards}
                />
              }
              desktop={
                <>
                  <SectionHeading
                    eyebrow={AI_WHY_BUILD_SECTION.eyebrow}
                    title={AI_WHY_BUILD_SECTION.title}
                    titleLead={AI_WHY_BUILD_SECTION.titleLead}
                    titleAccent={AI_WHY_BUILD_SECTION.titleAccent}
                    description={AI_WHY_BUILD_SECTION.description}
                  />
                  <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2" stagger={0.07}>
                    {copy.differentiators.map((d) => (
                      <RevealItem key={d.title} className="h-full">
                        <div className="h-full rounded-md border border-border bg-surface p-6">
                          <h3 className="font-display text-xl tracking-tight">{d.title}</h3>
                          <p className="mt-2 text-text-muted leading-7 text-pretty">{d.description}</p>
                        </div>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </>
              }
            />
          ) : (
            <>
          <SectionHeading
            eyebrow={
              isSaasService
                ? SAAS_WHY_FOUNDERS_SECTION.eyebrow
                : isMobileAppsService
                  ? MOBILE_WHY_BUILD_SECTION.eyebrow
                  : isAutomationService
                    ? AUTOMATION_WHY_BUILD_SECTION.eyebrow
                    : isTechnicalSeoService
                      ? TECHNICAL_SEO_WHY_SECTION.eyebrow
                      : isAiBusinessSystemsService
                        ? AI_WHY_BUILD_SECTION.eyebrow
                        : "What makes it different"
            }
            title={
              isSaasService
                ? SAAS_WHY_FOUNDERS_SECTION.title
                : isMobileAppsService
                  ? MOBILE_WHY_BUILD_SECTION.title
                  : isAutomationService
                    ? AUTOMATION_WHY_BUILD_SECTION.title
                    : isTechnicalSeoService
                      ? TECHNICAL_SEO_WHY_SECTION.title
                      : isAiBusinessSystemsService
                        ? AI_WHY_BUILD_SECTION.title
                        : "Operating choices, not adjectives."
            }
            description={
              isSaasService
                ? SAAS_WHY_FOUNDERS_SECTION.description
                : isMobileAppsService
                  ? MOBILE_WHY_BUILD_SECTION.description
                  : isAutomationService
                    ? AUTOMATION_WHY_BUILD_SECTION.description
                    : isTechnicalSeoService
                      ? TECHNICAL_SEO_WHY_SECTION.description
                      : isAiBusinessSystemsService
                        ? AI_WHY_BUILD_SECTION.description
                        : "The decisions that shape how this work actually feels to use, ship, and maintain."
            }
          />
          <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2" stagger={0.07}>
            {copy.differentiators.map((d) => (
              <RevealItem key={d.title} className="h-full">
                <div className="h-full rounded-md border border-border bg-surface p-6">
                  {!isConversionServicePage ? (
                    <div className="font-mono text-xs uppercase tracking-wider text-primary">Principle</div>
                  ) : null}
                  <h3
                    className={cn(
                      "font-display text-xl tracking-tight",
                      !isConversionServicePage && "mt-2",
                    )}
                  >
                    {d.title}
                  </h3>
                  <p className="mt-2 text-text-muted leading-7 text-pretty">{d.description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
            </>
          )}
        </Container>
      </Section>

      <Section {...marketingSection(serviceSectionPage, "process")}>
        <Container>
          {isWebsitesService ? (
            <MarketingViewportGate
              mobile={
                <ProcessStepsMobile
                  steps={[...WEBSITES_LAUNCH_PROCESS_SECTION.steps]}
                  eyebrow={WEBSITES_LAUNCH_PROCESS_SECTION.eyebrow}
                  titleLead={WEBSITES_LAUNCH_PROCESS_SECTION.titleLead}
                  titleAccent={WEBSITES_LAUNCH_PROCESS_SECTION.titleAccent}
                  description={WEBSITES_LAUNCH_PROCESS_SECTION.description}
                />
              }
              desktop={
                <>
                  <SectionHeading
                    eyebrow={WEBSITES_LAUNCH_PROCESS_SECTION.eyebrow}
                    title={WEBSITES_LAUNCH_PROCESS_SECTION.title}
                    titleLead={WEBSITES_LAUNCH_PROCESS_SECTION.titleLead}
                    titleAccent={WEBSITES_LAUNCH_PROCESS_SECTION.titleAccent}
                    description={WEBSITES_LAUNCH_PROCESS_SECTION.description}
                  />
                  <div className="mt-10">
                    <WebsiteLaunchProcessTimeline steps={[...WEBSITES_LAUNCH_PROCESS_SECTION.steps]} />
                  </div>
                </>
              }
            />
          ) : isSaasService ? (
            <MarketingViewportGate
              mobile={
                <ProcessStepsMobile
                  steps={[...SAAS_LAUNCH_PROCESS_SECTION.steps]}
                  eyebrow={SAAS_LAUNCH_PROCESS_SECTION.eyebrow}
                  titleLead={SAAS_LAUNCH_PROCESS_SECTION.titleLead}
                  titleAccent={SAAS_LAUNCH_PROCESS_SECTION.titleAccent}
                  description={SAAS_LAUNCH_PROCESS_SECTION.description}
                />
              }
              desktop={
                <>
                  <SectionHeading
                    eyebrow={SAAS_LAUNCH_PROCESS_SECTION.eyebrow}
                    title={SAAS_LAUNCH_PROCESS_SECTION.title}
                    titleLead={SAAS_LAUNCH_PROCESS_SECTION.titleLead}
                    titleAccent={SAAS_LAUNCH_PROCESS_SECTION.titleAccent}
                    description={SAAS_LAUNCH_PROCESS_SECTION.description}
                  />
                  <div className="mt-10">
                    <WebsiteLaunchProcessTimeline steps={[...SAAS_LAUNCH_PROCESS_SECTION.steps]} />
                  </div>
                </>
              }
            />
          ) : isMobileAppsService ? (
            <MarketingViewportGate
              mobile={
                <ProcessStepsMobile
                  steps={[...MOBILE_LAUNCH_PROCESS_SECTION.steps]}
                  eyebrow={MOBILE_LAUNCH_PROCESS_SECTION.eyebrow}
                  titleLead={MOBILE_LAUNCH_PROCESS_SECTION.titleLead}
                  titleAccent={MOBILE_LAUNCH_PROCESS_SECTION.titleAccent}
                  description={MOBILE_LAUNCH_PROCESS_SECTION.description}
                />
              }
              desktop={
                <>
                  <SectionHeading
                    eyebrow={MOBILE_LAUNCH_PROCESS_SECTION.eyebrow}
                    title={MOBILE_LAUNCH_PROCESS_SECTION.title}
                    titleLead={MOBILE_LAUNCH_PROCESS_SECTION.titleLead}
                    titleAccent={MOBILE_LAUNCH_PROCESS_SECTION.titleAccent}
                    description={MOBILE_LAUNCH_PROCESS_SECTION.description}
                  />
                  <div className="mt-10">
                    <WebsiteLaunchProcessTimeline steps={[...MOBILE_LAUNCH_PROCESS_SECTION.steps]} />
                  </div>
                </>
              }
            />
          ) : isAutomationService ? (
            <MarketingViewportGate
              mobile={
                <ProcessStepsMobile
                  steps={[...AUTOMATION_PROCESS_SECTION.steps]}
                  eyebrow={AUTOMATION_PROCESS_SECTION.eyebrow}
                  titleLead={AUTOMATION_PROCESS_SECTION.titleLead}
                  titleAccent={AUTOMATION_PROCESS_SECTION.titleAccent}
                  description={AUTOMATION_PROCESS_SECTION.description}
                />
              }
              desktop={
                <>
                  <SectionHeading
                    eyebrow={AUTOMATION_PROCESS_SECTION.eyebrow}
                    title={AUTOMATION_PROCESS_SECTION.title}
                    titleLead={AUTOMATION_PROCESS_SECTION.titleLead}
                    titleAccent={AUTOMATION_PROCESS_SECTION.titleAccent}
                    description={AUTOMATION_PROCESS_SECTION.description}
                  />
                  <div className="mt-10">
                    <WebsiteLaunchProcessTimeline steps={[...AUTOMATION_PROCESS_SECTION.steps]} />
                  </div>
                </>
              }
            />
          ) : isTechnicalSeoService ? (
            <MarketingViewportGate
              mobile={
                <ProcessStepsMobile
                  steps={[...TECHNICAL_SEO_PROCESS_SECTION.steps]}
                  eyebrow={TECHNICAL_SEO_PROCESS_SECTION.eyebrow}
                  titleLead={TECHNICAL_SEO_PROCESS_SECTION.titleLead}
                  titleAccent={TECHNICAL_SEO_PROCESS_SECTION.titleAccent}
                  description={TECHNICAL_SEO_PROCESS_SECTION.description}
                />
              }
              desktop={
                <>
                  <SectionHeading
                    eyebrow={TECHNICAL_SEO_PROCESS_SECTION.eyebrow}
                    title={TECHNICAL_SEO_PROCESS_SECTION.title}
                    titleLead={TECHNICAL_SEO_PROCESS_SECTION.titleLead}
                    titleAccent={TECHNICAL_SEO_PROCESS_SECTION.titleAccent}
                    description={TECHNICAL_SEO_PROCESS_SECTION.description}
                  />
                  <div className="mt-10">
                    <WebsiteLaunchProcessTimeline steps={[...TECHNICAL_SEO_PROCESS_SECTION.steps]} />
                  </div>
                </>
              }
            />
          ) : isAiBusinessSystemsService ? (
            <MarketingViewportGate
              mobile={
                <ProcessStepsMobile
                  steps={[...AI_BUSINESS_SYSTEMS_PROCESS_SECTION.steps]}
                  eyebrow={AI_BUSINESS_SYSTEMS_PROCESS_SECTION.eyebrow}
                  titleLead={AI_BUSINESS_SYSTEMS_PROCESS_SECTION.titleLead}
                  titleAccent={AI_BUSINESS_SYSTEMS_PROCESS_SECTION.titleAccent}
                  description={AI_BUSINESS_SYSTEMS_PROCESS_SECTION.description}
                />
              }
              desktop={
                <>
                  <SectionHeading
                    eyebrow={AI_BUSINESS_SYSTEMS_PROCESS_SECTION.eyebrow}
                    title={AI_BUSINESS_SYSTEMS_PROCESS_SECTION.title}
                    titleLead={AI_BUSINESS_SYSTEMS_PROCESS_SECTION.titleLead}
                    titleAccent={AI_BUSINESS_SYSTEMS_PROCESS_SECTION.titleAccent}
                    description={AI_BUSINESS_SYSTEMS_PROCESS_SECTION.description}
                  />
                  <div className="mt-10">
                    <WebsiteLaunchProcessTimeline steps={[...AI_BUSINESS_SYSTEMS_PROCESS_SECTION.steps]} />
                  </div>
                </>
              }
            />
          ) : (
            <>
              <SectionHeading eyebrow="Delivery" title="How an engagement runs end-to-end." />
              <div className="mt-10">
                <ProcessSteps steps={PROCESS_STEPS} />
              </div>
            </>
          )}
        </Container>
      </Section>

      {related.length > 0 &&
        !isSaasService &&
        !isMobileAppsService &&
        !isAutomationService &&
        !isTechnicalSeoService &&
        !isAiBusinessSystemsService && (
        <Section {...marketingSection(serviceSectionPage, "proof")}>
          <Container>
            {isWebsitesService ? (
              <MarketingViewportGate
                mobile={
                  <ServiceFeaturedProofMobile
                    eyebrow={WEBSITES_PROOF_SECTION.eyebrow}
                    title={WEBSITES_PROOF_SECTION.title}
                    titleLead={WEBSITES_PROOF_SECTION.titleLead}
                    titleAccent={WEBSITES_PROOF_SECTION.titleAccent}
                    projects={related}
                  />
                }
                desktop={
                  <>
                    <div className="flex items-end justify-between gap-6 flex-wrap">
                      <SectionHeading
                        eyebrow={WEBSITES_PROOF_SECTION.eyebrow}
                        title={WEBSITES_PROOF_SECTION.title}
                        titleLead={WEBSITES_PROOF_SECTION.titleLead}
                        titleAccent={WEBSITES_PROOF_SECTION.titleAccent}
                      />
                      <Link href="/portfolio" className="text-sm font-medium text-primary">
                        View all <ArrowUpRightIcon className="inline size-4" />
                      </Link>
                    </div>
                    <RevealGroup className="mt-10 grid gap-5 lg:grid-cols-3" stagger={0.07}>
                      {related.map((p) => (
                        <RevealItem key={p.slug} className="h-full">
                          <PortfolioCard project={p} />
                        </RevealItem>
                      ))}
                    </RevealGroup>
                  </>
                }
              />
            ) : (
              <>
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <SectionHeading eyebrow="Featured proof" title="Recent work in this practice." />
              <Link href="/portfolio" className="text-sm font-medium text-primary">
                View all <ArrowUpRightIcon className="inline size-4" />
              </Link>
            </div>
            <RevealGroup className="mt-10 grid gap-5 lg:grid-cols-3" stagger={0.07}>
              {related.map((p) => (
                <RevealItem key={p.slug} className="h-full">
                  <PortfolioCard project={p} />
                </RevealItem>
              ))}
            </RevealGroup>
              </>
            )}
          </Container>
        </Section>
      )}

      {isTechnicalSeoService ? (
        <Section
          id={TECHNICAL_SEO_DELIVERABLES_SECTION.id}
          {...marketingSection("service-detail-technical-seo", "whats-included")}
        >
          <Container className="min-w-0">
            <MarketingViewportGate
              mobile={<SeoDeliverablesChecklistMobile />}
              desktop={
                <>
                  <SectionHeading
                    eyebrow={TECHNICAL_SEO_DELIVERABLES_SECTION.eyebrow}
                    title={TECHNICAL_SEO_DELIVERABLES_SECTION.title}
                    titleLead={TECHNICAL_SEO_DELIVERABLES_SECTION.titleLead}
                    titleAccent={TECHNICAL_SEO_DELIVERABLES_SECTION.titleAccent}
                    description={TECHNICAL_SEO_DELIVERABLES_SECTION.description}
                  />
                  <SeoDeliverablesChecklist categories={[...TECHNICAL_SEO_DELIVERABLES_SECTION.categories]} />
                </>
              }
            />
          </Container>
        </Section>
      ) : null}

      {!isWebsitesService ? engagementModelsSection : null}

      {SHOW_GOOGLE_REVIEWS && (
        <Section size="standard" layout="content" spacing="split">
          <Container>
            <GoogleReviews
              eyebrow="Google reviews"
              title="Recent client feedback from the studio."
              description="Live reviews from the public business profile, reused across service trust surfaces."
            />
          </Container>
        </Section>
      )}

      <Section {...marketingSection(serviceSectionPage, "faq")}>
        <Container width="reading">
          {isWebsitesService ? (
            <MarketingViewportGate
              mobile={
                <ServiceFaqMobile
                  eyebrow={WEBSITES_SERVICE_FAQ_SECTION.eyebrow}
                  title={WEBSITES_SERVICE_FAQ_SECTION.title}
                  titleLead={WEBSITES_SERVICE_FAQ_SECTION.titleLead}
                  titleAccent={WEBSITES_SERVICE_FAQ_SECTION.titleAccent}
                  description={WEBSITES_SERVICE_FAQ_SECTION.description}
                  items={copy.faq.map((item) => ({ ...item }))}
                />
              }
              desktop={
                <>
                  <SectionHeading
                    eyebrow={WEBSITES_SERVICE_FAQ_SECTION.eyebrow}
                    title={WEBSITES_SERVICE_FAQ_SECTION.title}
                    titleLead={WEBSITES_SERVICE_FAQ_SECTION.titleLead}
                    titleAccent={WEBSITES_SERVICE_FAQ_SECTION.titleAccent}
                    description={WEBSITES_SERVICE_FAQ_SECTION.description}
                    align="center"
                  />
                  <div className="mt-10">
                    <Accordion items={copy.faq} />
                  </div>
                </>
              }
            />
          ) : isSaasService ? (
            <MarketingViewportGate
              mobile={
                <ServiceFaqMobile
                  eyebrow={SAAS_SERVICE_FAQ_SECTION.eyebrow}
                  title={SAAS_SERVICE_FAQ_SECTION.title}
                  titleLead={SAAS_SERVICE_FAQ_SECTION.titleLead}
                  titleAccent={SAAS_SERVICE_FAQ_SECTION.titleAccent}
                  description={SAAS_SERVICE_FAQ_SECTION.description}
                  items={copy.faq.map((item) => ({ ...item }))}
                />
              }
              desktop={
                <>
                  <SectionHeading
                    eyebrow={SAAS_SERVICE_FAQ_SECTION.eyebrow}
                    title={SAAS_SERVICE_FAQ_SECTION.title}
                    titleLead={SAAS_SERVICE_FAQ_SECTION.titleLead}
                    titleAccent={SAAS_SERVICE_FAQ_SECTION.titleAccent}
                    description={SAAS_SERVICE_FAQ_SECTION.description}
                    align="center"
                  />
                  <div className="mt-10">
                    <Accordion items={copy.faq} />
                  </div>
                </>
              }
            />
          ) : isMobileAppsService ? (
            <MarketingViewportGate
              mobile={
                <ServiceFaqMobile
                  eyebrow={MOBILE_APPS_SERVICE_FAQ_SECTION.eyebrow}
                  title={MOBILE_APPS_SERVICE_FAQ_SECTION.title}
                  titleLead={MOBILE_APPS_SERVICE_FAQ_SECTION.titleLead}
                  titleAccent={MOBILE_APPS_SERVICE_FAQ_SECTION.titleAccent}
                  description={MOBILE_APPS_SERVICE_FAQ_SECTION.description}
                  items={copy.faq.map((item) => ({ ...item }))}
                />
              }
              desktop={
                <>
                  <SectionHeading
                    eyebrow={MOBILE_APPS_SERVICE_FAQ_SECTION.eyebrow}
                    title={MOBILE_APPS_SERVICE_FAQ_SECTION.title}
                    titleLead={MOBILE_APPS_SERVICE_FAQ_SECTION.titleLead}
                    titleAccent={MOBILE_APPS_SERVICE_FAQ_SECTION.titleAccent}
                    description={MOBILE_APPS_SERVICE_FAQ_SECTION.description}
                    align="center"
                  />
                  <div className="mt-10">
                    <Accordion items={copy.faq} />
                  </div>
                </>
              }
            />
          ) : isAutomationService ? (
            <MarketingViewportGate
              mobile={
                <ServiceFaqMobile
                  eyebrow={AUTOMATION_SERVICE_FAQ_SECTION.eyebrow}
                  title={AUTOMATION_SERVICE_FAQ_SECTION.title}
                  titleLead={AUTOMATION_SERVICE_FAQ_SECTION.titleLead}
                  titleAccent={AUTOMATION_SERVICE_FAQ_SECTION.titleAccent}
                  description={AUTOMATION_SERVICE_FAQ_SECTION.description}
                  items={copy.faq.map((item) => ({ ...item }))}
                />
              }
              desktop={
                <>
                  <SectionHeading
                    eyebrow={AUTOMATION_SERVICE_FAQ_SECTION.eyebrow}
                    title={AUTOMATION_SERVICE_FAQ_SECTION.title}
                    titleLead={AUTOMATION_SERVICE_FAQ_SECTION.titleLead}
                    titleAccent={AUTOMATION_SERVICE_FAQ_SECTION.titleAccent}
                    description={AUTOMATION_SERVICE_FAQ_SECTION.description}
                    align="center"
                  />
                  <div className="mt-10">
                    <Accordion items={copy.faq} />
                  </div>
                </>
              }
            />
          ) : isTechnicalSeoService ? (
            <MarketingViewportGate
              mobile={
                <ServiceFaqMobile
                  eyebrow={TECHNICAL_SEO_SERVICE_FAQ_SECTION.eyebrow}
                  title={TECHNICAL_SEO_SERVICE_FAQ_SECTION.title}
                  titleLead={TECHNICAL_SEO_SERVICE_FAQ_SECTION.titleLead}
                  titleAccent={TECHNICAL_SEO_SERVICE_FAQ_SECTION.titleAccent}
                  description={TECHNICAL_SEO_SERVICE_FAQ_SECTION.description}
                  items={copy.faq.map((item) => ({ ...item }))}
                />
              }
              desktop={
                <>
                  <SectionHeading
                    eyebrow={TECHNICAL_SEO_SERVICE_FAQ_SECTION.eyebrow}
                    title={TECHNICAL_SEO_SERVICE_FAQ_SECTION.title}
                    titleLead={TECHNICAL_SEO_SERVICE_FAQ_SECTION.titleLead}
                    titleAccent={TECHNICAL_SEO_SERVICE_FAQ_SECTION.titleAccent}
                    description={TECHNICAL_SEO_SERVICE_FAQ_SECTION.description}
                    align="center"
                  />
                  <div className="mt-10">
                    <Accordion items={copy.faq} />
                  </div>
                </>
              }
            />
          ) : isAiBusinessSystemsService ? (
            <MarketingViewportGate
              mobile={
                <ServiceFaqMobile
                  eyebrow={AI_BUSINESS_SYSTEMS_SERVICE_FAQ_SECTION.eyebrow}
                  title={AI_BUSINESS_SYSTEMS_SERVICE_FAQ_SECTION.title}
                  titleLead={AI_BUSINESS_SYSTEMS_SERVICE_FAQ_SECTION.titleLead}
                  titleAccent={AI_BUSINESS_SYSTEMS_SERVICE_FAQ_SECTION.titleAccent}
                  description={AI_BUSINESS_SYSTEMS_SERVICE_FAQ_SECTION.description}
                  items={copy.faq.map((item) => ({ ...item }))}
                />
              }
              desktop={
                <>
                  <SectionHeading
                    eyebrow={AI_BUSINESS_SYSTEMS_SERVICE_FAQ_SECTION.eyebrow}
                    title={AI_BUSINESS_SYSTEMS_SERVICE_FAQ_SECTION.title}
                    titleLead={AI_BUSINESS_SYSTEMS_SERVICE_FAQ_SECTION.titleLead}
                    titleAccent={AI_BUSINESS_SYSTEMS_SERVICE_FAQ_SECTION.titleAccent}
                    description={AI_BUSINESS_SYSTEMS_SERVICE_FAQ_SECTION.description}
                    align="center"
                  />
                  <div className="mt-10">
                    <Accordion items={copy.faq} />
                  </div>
                </>
              }
            />
          ) : (
            <>
          <SectionHeading
            eyebrow="FAQ"
            title={
              isSaasService
                ? "Common SaaS project questions, answered."
                : isMobileAppsService
                  ? "Common mobile product questions, answered."
                  : isAutomationService
                    ? "Common automation questions, answered."
                    : isTechnicalSeoService
                      ? "Common technical SEO questions, answered."
                      : isAiBusinessSystemsService
                        ? "Common AI implementation questions, answered."
                        : `${copy.eyebrow} questions, answered.`
            }
            description={
              isSaasService
                ? "MVP timelines, stack, ownership, integrations, and post-launch support—covered before you book a call."
                : isMobileAppsService
                  ? "Platforms, MVPs, store submission, ownership, and post-launch support—covered before you book a call."
                  : isAutomationService
                    ? "Platforms, failures, data handling, implementation timelines, and expansion—covered before you book a call."
                    : isTechnicalSeoService
                      ? "Setup scope, rankings, analytics, schema, Core Web Vitals, and post-launch support—covered before you book a call."
                      : isAiBusinessSystemsService
                        ? "Use cases, integrations, data handling, implementation timelines, and ongoing support—covered before you book a call."
                        : undefined
            }
            align="center"
          />
          <div className="mt-10">
            <Accordion items={copy.faq} />
          </div>
            </>
          )}
        </Container>
      </Section>

      {isWebsitesService ? (
        <MarketingViewportGate
          mobile={
            <ProductLedFinalCTAMobile
              eyebrow="Next step"
              titleLead={WEBSITES_SERVICE_CTA.titleLead}
              titleAccent={WEBSITES_SERVICE_CTA.titleAccent}
              description={WEBSITES_SERVICE_CTA.description}
              primaryLabel={WEBSITES_SERVICE_CTA.primaryLabel}
              primaryHref={WEBSITES_SERVICE_CTA.primaryHref}
              secondaryLabel={WEBSITES_SERVICE_CTA.secondaryLabel}
              secondaryHref={WEBSITES_SERVICE_CTA.secondaryHref}
            />
          }
          desktop={
            <CTABand
              title={WEBSITES_SERVICE_CTA.title}
              titleLead={WEBSITES_SERVICE_CTA.titleLead}
              titleAccent={WEBSITES_SERVICE_CTA.titleAccent}
              description={WEBSITES_SERVICE_CTA.description}
              primary={{
                label: WEBSITES_SERVICE_CTA.primaryLabel,
                href: WEBSITES_SERVICE_CTA.primaryHref,
              }}
              secondary={{
                label: WEBSITES_SERVICE_CTA.secondaryLabel,
                href: WEBSITES_SERVICE_CTA.secondaryHref,
              }}
            />
          }
        />
      ) : isSaasService ? (
        <MarketingViewportGate
          mobile={
            <ProductLedFinalCTAMobile
              eyebrow="Next step"
              titleLead={SAAS_SERVICE_CTA.titleLead}
              titleAccent={SAAS_SERVICE_CTA.titleAccent}
              description={SAAS_SERVICE_CTA.description}
              primaryLabel={SAAS_SERVICE_CTA.primaryLabel}
              primaryHref={SAAS_SERVICE_CTA.primaryHref}
              secondaryLabel={SAAS_SERVICE_CTA.secondaryLabel}
              secondaryHref={SAAS_SERVICE_CTA.secondaryHref}
            />
          }
          desktop={
            <CTABand
              title={SAAS_SERVICE_CTA.title}
              titleLead={SAAS_SERVICE_CTA.titleLead}
              titleAccent={SAAS_SERVICE_CTA.titleAccent}
              description={SAAS_SERVICE_CTA.description}
              primary={{
                label: SAAS_SERVICE_CTA.primaryLabel,
                href: SAAS_SERVICE_CTA.primaryHref,
              }}
              secondary={{
                label: SAAS_SERVICE_CTA.secondaryLabel,
                href: SAAS_SERVICE_CTA.secondaryHref,
              }}
            />
          }
        />
      ) : isMobileAppsService ? (
        <MarketingViewportGate
          mobile={
            <ProductLedFinalCTAMobile
              eyebrow="Next step"
              titleLead={MOBILE_APPS_SERVICE_CTA.titleLead}
              titleAccent={MOBILE_APPS_SERVICE_CTA.titleAccent}
              description={MOBILE_APPS_SERVICE_CTA.description}
              primaryLabel={MOBILE_APPS_SERVICE_CTA.primaryLabel}
              primaryHref={MOBILE_APPS_SERVICE_CTA.primaryHref}
              secondaryLabel={MOBILE_APPS_SERVICE_CTA.secondaryLabel}
              secondaryHref={MOBILE_APPS_SERVICE_CTA.secondaryHref}
            />
          }
          desktop={
            <CTABand
              title={MOBILE_APPS_SERVICE_CTA.title}
              titleLead={MOBILE_APPS_SERVICE_CTA.titleLead}
              titleAccent={MOBILE_APPS_SERVICE_CTA.titleAccent}
              description={MOBILE_APPS_SERVICE_CTA.description}
              primary={{
                label: MOBILE_APPS_SERVICE_CTA.primaryLabel,
                href: MOBILE_APPS_SERVICE_CTA.primaryHref,
              }}
              secondary={{
                label: MOBILE_APPS_SERVICE_CTA.secondaryLabel,
                href: MOBILE_APPS_SERVICE_CTA.secondaryHref,
              }}
            />
          }
        />
      ) : isAutomationService ? (
        <MarketingViewportGate
          mobile={
            <ProductLedFinalCTAMobile
              eyebrow="Next step"
              titleLead={AUTOMATION_SERVICE_CTA.titleLead}
              titleAccent={AUTOMATION_SERVICE_CTA.titleAccent}
              description={AUTOMATION_SERVICE_CTA.description}
              primaryLabel={AUTOMATION_SERVICE_CTA.primaryLabel}
              primaryHref={AUTOMATION_SERVICE_CTA.primaryHref}
              secondaryLabel={AUTOMATION_SERVICE_CTA.secondaryLabel}
              secondaryHref={AUTOMATION_SERVICE_CTA.secondaryHref}
            />
          }
          desktop={
            <CTABand
              title={AUTOMATION_SERVICE_CTA.title}
              titleLead={AUTOMATION_SERVICE_CTA.titleLead}
              titleAccent={AUTOMATION_SERVICE_CTA.titleAccent}
              description={AUTOMATION_SERVICE_CTA.description}
              primary={{
                label: AUTOMATION_SERVICE_CTA.primaryLabel,
                href: AUTOMATION_SERVICE_CTA.primaryHref,
              }}
              secondary={{
                label: AUTOMATION_SERVICE_CTA.secondaryLabel,
                href: AUTOMATION_SERVICE_CTA.secondaryHref,
              }}
            />
          }
        />
      ) : isTechnicalSeoService ? (
        <MarketingViewportGate
          mobile={
            <ProductLedFinalCTAMobile
              eyebrow="Next step"
              titleLead={TECHNICAL_SEO_SERVICE_CTA.titleLead}
              titleAccent={TECHNICAL_SEO_SERVICE_CTA.titleAccent}
              description={TECHNICAL_SEO_SERVICE_CTA.description}
              primaryLabel={TECHNICAL_SEO_SERVICE_CTA.primaryLabel}
              primaryHref={TECHNICAL_SEO_SERVICE_CTA.primaryHref}
              secondaryLabel={TECHNICAL_SEO_SERVICE_CTA.secondaryLabel}
              secondaryHref={TECHNICAL_SEO_SERVICE_CTA.secondaryHref}
            />
          }
          desktop={
            <CTABand
              title={TECHNICAL_SEO_SERVICE_CTA.title}
              titleLead={TECHNICAL_SEO_SERVICE_CTA.titleLead}
              titleAccent={TECHNICAL_SEO_SERVICE_CTA.titleAccent}
              description={TECHNICAL_SEO_SERVICE_CTA.description}
              primary={{
                label: TECHNICAL_SEO_SERVICE_CTA.primaryLabel,
                href: TECHNICAL_SEO_SERVICE_CTA.primaryHref,
              }}
              secondary={{
                label: TECHNICAL_SEO_SERVICE_CTA.secondaryLabel,
                href: TECHNICAL_SEO_SERVICE_CTA.secondaryHref,
              }}
            />
          }
        />
      ) : isAiBusinessSystemsService ? (
        <MarketingViewportGate
          mobile={
            <ProductLedFinalCTAMobile
              eyebrow="Next step"
              titleLead={AI_BUSINESS_SYSTEMS_SERVICE_CTA.titleLead}
              titleAccent={AI_BUSINESS_SYSTEMS_SERVICE_CTA.titleAccent}
              description={AI_BUSINESS_SYSTEMS_SERVICE_CTA.description}
              primaryLabel={AI_BUSINESS_SYSTEMS_SERVICE_CTA.primaryLabel}
              primaryHref={AI_BUSINESS_SYSTEMS_SERVICE_CTA.primaryHref}
              secondaryLabel={AI_BUSINESS_SYSTEMS_SERVICE_CTA.secondaryLabel}
              secondaryHref={AI_BUSINESS_SYSTEMS_SERVICE_CTA.secondaryHref}
            />
          }
          desktop={
            <CTABand
              title={AI_BUSINESS_SYSTEMS_SERVICE_CTA.title}
              titleLead={AI_BUSINESS_SYSTEMS_SERVICE_CTA.titleLead}
              titleAccent={AI_BUSINESS_SYSTEMS_SERVICE_CTA.titleAccent}
              description={AI_BUSINESS_SYSTEMS_SERVICE_CTA.description}
              primary={{
                label: AI_BUSINESS_SYSTEMS_SERVICE_CTA.primaryLabel,
                href: AI_BUSINESS_SYSTEMS_SERVICE_CTA.primaryHref,
              }}
              secondary={{
                label: AI_BUSINESS_SYSTEMS_SERVICE_CTA.secondaryLabel,
                href: AI_BUSINESS_SYSTEMS_SERVICE_CTA.secondaryHref,
              }}
            />
          }
        />
      ) : (
        <CTABand
          title={
            isSaasService
              ? SAAS_SERVICE_CTA.title
              : isMobileAppsService
                ? MOBILE_APPS_SERVICE_CTA.title
                : isAutomationService
                  ? AUTOMATION_SERVICE_CTA.title
                  : isTechnicalSeoService
                    ? TECHNICAL_SEO_SERVICE_CTA.title
                    : isAiBusinessSystemsService
                      ? AI_BUSINESS_SYSTEMS_SERVICE_CTA.title
                      : `${copy.primaryCta} — let's talk specifics.`
          }
          description={
            isSaasService
              ? SAAS_SERVICE_CTA.description
              : isMobileAppsService
                ? MOBILE_APPS_SERVICE_CTA.description
                : isAutomationService
                  ? AUTOMATION_SERVICE_CTA.description
                  : isTechnicalSeoService
                    ? TECHNICAL_SEO_SERVICE_CTA.description
                    : isAiBusinessSystemsService
                      ? AI_BUSINESS_SYSTEMS_SERVICE_CTA.description
                      : "A 30-minute discovery call. A written plan within 48 hours. Your call on whether to move forward."
          }
          primary={{
            label: isSaasService
              ? SAAS_SERVICE_CTA.primaryLabel
              : isMobileAppsService
                ? MOBILE_APPS_SERVICE_CTA.primaryLabel
                : isAutomationService
                  ? AUTOMATION_SERVICE_CTA.primaryLabel
                  : isTechnicalSeoService
                    ? TECHNICAL_SEO_SERVICE_CTA.primaryLabel
                    : isAiBusinessSystemsService
                      ? AI_BUSINESS_SYSTEMS_SERVICE_CTA.primaryLabel
                      : copy.primaryCta,
            href: isSaasService
              ? SAAS_SERVICE_CTA.primaryHref
              : isMobileAppsService
                ? MOBILE_APPS_SERVICE_CTA.primaryHref
                : isAutomationService
                  ? AUTOMATION_SERVICE_CTA.primaryHref
                  : isTechnicalSeoService
                    ? TECHNICAL_SEO_SERVICE_CTA.primaryHref
                    : isAiBusinessSystemsService
                      ? AI_BUSINESS_SYSTEMS_SERVICE_CTA.primaryHref
                      : "/book-appointment",
          }}
          secondary={
            isSaasService
              ? { label: SAAS_SERVICE_CTA.secondaryLabel, href: SAAS_SERVICE_CTA.secondaryHref }
              : isMobileAppsService
                ? {
                    label: MOBILE_APPS_SERVICE_CTA.secondaryLabel,
                    href: MOBILE_APPS_SERVICE_CTA.secondaryHref,
                  }
                : isAutomationService
                  ? {
                      label: AUTOMATION_SERVICE_CTA.secondaryLabel,
                      href: AUTOMATION_SERVICE_CTA.secondaryHref,
                    }
                  : isTechnicalSeoService
                    ? {
                        label: TECHNICAL_SEO_SERVICE_CTA.secondaryLabel,
                        href: TECHNICAL_SEO_SERVICE_CTA.secondaryHref,
                      }
                    : isAiBusinessSystemsService
                      ? {
                          label: AI_BUSINESS_SYSTEMS_SERVICE_CTA.secondaryLabel,
                          href: AI_BUSINESS_SYSTEMS_SERVICE_CTA.secondaryHref,
                        }
                      : { label: "Open WhatsApp", href: WHATSAPP_HREF }
          }
        />
      )}
    </>
  );
}
