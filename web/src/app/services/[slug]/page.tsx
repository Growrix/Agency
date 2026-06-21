import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BoltIcon,
  CheckIcon,
  CodeBracketSquareIcon,
  CpuChipIcon,
  DevicePhoneMobileIcon,
  DocumentTextIcon,
  MagnifyingGlassCircleIcon,
  WrenchScrewdriverIcon,
  WindowIcon,
} from "@heroicons/react/24/outline";
import { Container, Section } from "@/components/primitives/Container";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Badge } from "@/components/primitives/Badge";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { WebsiteLaunchProcessTimeline } from "@/components/sections/WebsiteLaunchProcessTimeline";
import { PricingTier, type Tier } from "@/components/sections/PricingTier";
import { Accordion } from "@/components/sections/Accordion";
import { CTABand } from "@/components/sections/CTABand";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { StatBlock } from "@/components/sections/StatBlock";
import { PortfolioCard } from "@/components/sections/PortfolioCard";
import { WebsiteTemplateHtmlPreviewShowcaseSections } from "@/components/sections/WebsiteTemplateHtmlPreviewShowcaseSections";
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
import { HERO_TITLE_CLASS, HERO_VIEWPORT_CONTAINER_CLASS } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { getPublicService, listPublicPortfolio, listPublicShopProducts } from "@/server/domain/catalog";
import { getSanityServiceDetailContent } from "@/server/sanity/marketing";
import {
  WEBSITES_LAUNCH_PROCESS_SECTION,
  WEBSITES_OUTCOMES_SECTION,
  WEBSITES_SERVICE_CTA,
  WEBSITES_SERVICE_FAQ,
  WEBSITES_SERVICE_HERO,
  WEBSITES_SERVICE_STATS,
  WEBSITES_WHY_CHOOSE_SECTION,
} from "@/lib/websites-service-content";

const ICONS = {
  "saas-applications": CodeBracketSquareIcon,
  websites: WindowIcon,
  "mobile-apps": DevicePhoneMobileIcon,
  "html-business-profiles": DocumentTextIcon,
  "template-customization": WrenchScrewdriverIcon,
  "mcp-servers": CpuChipIcon,
  automation: BoltIcon,
  "technical-seo": MagnifyingGlassCircleIcon,
} as const;

type SlugKey = keyof typeof ICONS;
const PRICE_MUTED_SERVICE_SLUGS = new Set<SlugKey>(["mcp-servers", "automation"]);

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
    headline: "SaaS products built like real products, not long demos.",
    description:
      "End-to-end product strategy, design systems, and engineering for founders and product teams launching or rebuilding SaaS.",
    primaryCta: "Start a SaaS Build",
    secondaryCta: "See SaaS work",
    secondaryHref: "/portfolio",
    builds: [
      { title: "Admin & ops panels", description: "Operator-grade dashboards, role-aware access, audit trails." },
      { title: "User portals & onboarding", description: "Activation-first flows, billing, and self-serve upgrades." },
      { title: "Billing & subscriptions", description: "Stripe metering, plans, coupons, dunning, and tax handling." },
      { title: "Dashboards & reporting", description: "Live charts, exports, and segmentable filters built for clarity." },
      { title: "Internal tools", description: "Replacements for spreadsheets, no-code stacks, and brittle scripts." },
      { title: "AI-assisted features", description: "LLM workflows that respect data boundaries and explain themselves." },
    ],
    differentiators: [
      { title: "Product strategy first", description: "MVP shaping, monetization inputs, and information architecture before any pixel." },
      { title: "Scalable design system", description: "Tokens, primitives, and accessible patterns that survive feature growth." },
      { title: "App-like mobile behavior", description: "Sheets, sticky utilities, thumb-friendly tap targets, real responsive depth." },
      { title: "Production-ready engineering", description: "Tests, CI, observability, and ops-ready release cadence from day one." },
    ],
    tiers: [
      { name: "MVP Sprint", price: "$24k", cadence: "/ project", description: "An 8-week sprint to validated MVP with core flows shipped.", features: ["Discovery + product framing", "Design system", "Auth, billing, primary flows", "Launch & analytics"], cta: { label: "Scope MVP", href: "/book-appointment" } },
      { name: "Product Partner", price: "$14k", cadence: "/ month", description: "An embedded studio building features alongside your team.", features: ["Lead + designer + engineer", "Quarterly strategy", "Continuous shipping", "Stack ownership"], cta: { label: "Plan partnership", href: "/book-appointment" }, featured: true, badge: "Most chosen" },
      { name: "Rebuild Engagement", price: "Custom", description: "A focused rebuild of an aging SaaS product with measurable handoff.", features: ["Architecture review", "Migration plan", "Phased shipping", "Knowledge transfer"], cta: { label: "Talk rebuilds", href: "/book-appointment" } },
    ],
    faq: [
      { question: "How fast can we launch?", answer: "Most MVP sprints land in 8 weeks. Larger products are split into phased releases starting at week 6." },
      { question: "Do you work with our existing engineers?", answer: "Yes. We frequently embed alongside in-house teams as a product pod or design + frontend specialists." },
      { question: "Stack preferences?", answer: "We default to Next.js + Postgres + Stripe + OpenAI/Anthropic, but adapt to existing stacks where it makes sense." },
    ],
    stats: [
      { value: "8 wk", label: "MVP sprint" },
      { value: "47", label: "Products shipped" },
      { value: "$18M+", label: "Client funding raised" },
      { value: "98", label: "NPS" },
    ],
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
      { name: "Template Packs", price: "From $500", cadence: "one-time", description: "Launch-ready website templates customized for your brand, offer, and conversion flow.", features: ["Basic: $500 - $1k", "Standard: $1k - $3k", "Premium: $3k - $10k", "Setup and handoff docs"], cta: { label: "Browse templates", href: "/digital-products" } },
      { name: "Ready Websites", price: "From $1k", cadence: "one-time", description: "Complete ready-to-deploy websites for teams that need speed without custom-build timelines.", features: ["Basic: $1k - $2.5k", "Standard: $2.5k - $5k", "Premium: $5k - $15k", "Optional install support"], cta: { label: "View ready websites", href: "/digital-products" }, featured: true, badge: "Most chosen" },
      { name: "Custom Build Scope", price: "Discovery-based", cadence: "project pricing", description: "For SaaS applications, mobile launch systems, and MCP or automation work scoped to your goals.", features: ["SaaS applications: custom scope", "Mobile launch systems: custom scope", "MCP and automation: secondary scope", "Final quote after discovery"], cta: { label: "Book discovery call", href: "/book-appointment" } },
    ],
    faq: WEBSITES_SERVICE_FAQ.map((item) => ({ ...item })),
    stats: WEBSITES_SERVICE_STATS.map((item) => ({ ...item })),
  },
  "mobile-apps": {
    eyebrow: "Mobile Apps",
    headline: "Mobile launch systems that feel product-grade on day one.",
    description:
      "App launch sites, React Native companion apps, and mobile-first UX for founders who need store-ready credibility without rebuilding their entire stack.",
    primaryCta: "Plan a mobile launch",
    secondaryCta: "Browse mobile launch products",
    secondaryHref: "/digital-products",
    builds: [
      { title: "App launch marketing sites", description: "High-converting launch pages with store badges, feature storytelling, and waitlist flows." },
      { title: "Companion mobile apps", description: "React Native or Expo apps that extend your SaaS or service with on-the-go workflows." },
      { title: "Onboarding & activation flows", description: "Permission prompts, progressive profiling, and first-session paths tuned for retention." },
      { title: "Push & lifecycle messaging", description: "Notification strategy, deep links, and lifecycle hooks tied to your product events." },
      { title: "Store readiness", description: "App Store and Play Store assets, privacy disclosures, and submission support." },
      { title: "Mobile dashboards", description: "Operator and customer views optimized for thumb reach, sheets, and offline-tolerant states." },
    ],
    differentiators: [
      { title: "Launch + product continuity", description: "Mobile work stays aligned with your web brand, billing, and analytics—not a disconnected side project." },
      { title: "Performance-first mobile UX", description: "Sheets, sticky actions, skeleton states, and reduced-motion-safe interactions by default." },
      { title: "Store submission support", description: "We help you navigate review requirements, screenshots, and release cadence with less guesswork." },
      { title: "Companion, not replacement", description: "We scope mobile as an extension of your core product—auth, roles, and data stay consistent." },
    ],
    tiers: [
      { name: "Launch Site Sprint", price: "From $4.5k", cadence: "/ project", description: "A polished app launch site with store CTAs, analytics, and SEO foundations.", features: ["Launch page architecture", "Store badge + CTA flows", "Analytics instrumentation", "Performance pass"], cta: { label: "Scope launch site", href: "/book-appointment" } },
      { name: "Companion App MVP", price: "From $18k", cadence: "/ project", description: "A focused mobile companion with auth, core flows, and release support.", features: ["React Native / Expo build", "Auth + primary flows", "Push-ready architecture", "Store submission support"], cta: { label: "Scope companion app", href: "/book-appointment" }, featured: true, badge: "Most chosen" },
      { name: "Mobile Product Partner", price: "Custom", description: "Embedded mobile pod for ongoing releases, experiments, and platform expansion.", features: ["Roadmap alignment", "Continuous shipping", "Release management", "Cross-platform parity"], cta: { label: "Discuss partnership", href: "/book-appointment" } },
    ],
    faq: [
      { question: "Do you build native iOS and Android apps?", answer: "We default to React Native or Expo for speed and shared logic. Native modules are scoped when the product truly requires them." },
      { question: "Can mobile work run alongside a website or SaaS build?", answer: "Yes. We frequently ship launch sites first, then companion apps once the core product surface is stable." },
      { question: "Do you handle App Store submission?", answer: "Yes. We prepare assets, privacy disclosures, and submission packages, and support review cycles through launch." },
    ],
    stats: [
      { value: "4–16 wk", label: "Typical window" },
      { value: "2", label: "Store platforms" },
      { value: "100%", label: "Analytics wired" },
      { value: "1", label: "Shared design system" },
    ],
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
  "template-customization": {
    eyebrow: "Template Customization",
    headline: "Bought a template? We will customize and launch it for you.",
    description:
      "Done-For-You setup for product buyers who need branding, deployment, forms, payments, and QA — without learning how to edit code or manage hosting.",
    primaryCta: "Request setup scope",
    secondaryCta: "Browse digital products first",
    secondaryHref: "/digital-products",
    builds: [
      { title: "Brand and content adaptation", description: "Logo, palette, typography, and copy updates aligned to your offer." },
      { title: "Deployment and domain setup", description: "Hosting, SSL, environment configuration, and launch checklist." },
      { title: "Forms and lead routing", description: "Contact flows connected to email, CRM, or internal notifications." },
      { title: "Payments and integrations", description: "Stripe, analytics, and template-native integrations wired correctly." },
      { title: "Additional pages", description: "Extra sections or pages within the purchased template structure." },
      { title: "Launch QA and handoff", description: "Cross-device QA, performance checks, and operator documentation." },
    ],
    differentiators: [
      { title: "Product-aware delivery", description: "We start from the exact template or tier you purchased — no mystery scope." },
      { title: "Non-technical friendly", description: "You bring brand inputs and goals; we handle implementation details." },
      { title: "Clear package boundaries", description: "Basic, business, and advanced setup tiers keep expectations explicit." },
      { title: "Upgrade path to custom work", description: "When scope exceeds the template, we transition into a scoped custom engagement." },
    ],
    tiers: [
      {
        name: "Basic Setup",
        price: "$299",
        cadence: "one-time",
        description: "Branding refresh, deployment, and essential configuration for a single template.",
        features: ["Brand colors and logo placement", "Deployment to your host", "Contact form wiring", "Launch checklist"],
        cta: { label: "Request basic setup", href: "/contact?intent=customize_template" },
      },
      {
        name: "Business Setup",
        price: "$599",
        cadence: "one-time",
        description: "Expanded customization with extra sections, analytics, and payment readiness.",
        features: ["Everything in Basic", "Extra sections or pages", "Analytics setup", "Stripe or payment wiring"],
        cta: { label: "Request business setup", href: "/contact?intent=customize_template" },
        featured: true,
        badge: "Most chosen",
      },
      {
        name: "Advanced Setup",
        price: "$999+",
        description: "Complex integrations, multi-environment rollout, and deeper QA for demanding launches.",
        features: ["Everything in Business", "Advanced integrations", "Multi-environment support", "Extended QA window"],
        cta: { label: "Discuss advanced scope", href: "/book-appointment" },
      },
    ],
    faq: [
      { question: "Do I need to buy the template first?", answer: "Usually yes — we customize from a purchased Standard, Premium, or Done-For-You product so scope stays tied to a real asset." },
      { question: "What is not included?", answer: "Custom automation platforms, net-new features outside the template, and large infrastructure programs are scoped separately." },
      { question: "How fast can you launch?", answer: "Most setup packages land in 3-14 days depending on content readiness and integration count." },
    ],
    stats: [
      { value: "3-14d", label: "Typical setup window" },
      { value: "$299+", label: "Entry setup tier" },
      { value: "100%", label: "Product-linked scope" },
      { value: "1yr", label: "Support option" },
    ],
  },
  "mcp-servers": {
    eyebrow: "MCP Servers",
    headline: "Production-ready MCP servers that agents can actually trust.",
    description:
      "We build secure, observable Model Context Protocol servers that wrap your APIs, data, and internal tools so agents act with confidence.",
    primaryCta: "Scope an MCP Server",
    secondaryCta: "Browse MCP Products",
    secondaryHref: "/digital-products",
    builds: [
      { title: "API wrappers", description: "Existing REST/GraphQL APIs exposed as cleanly typed MCP tools." },
      { title: "Internal data tools", description: "Read/write access to internal systems with role-aware permissions." },
      { title: "CRM & ops integrations", description: "HubSpot, Salesforce, Linear, Notion, Slack tool exposures." },
      { title: "Document retrieval", description: "Hybrid search MCPs over your docs with citations and source URLs." },
      { title: "Workflow orchestration", description: "Multi-step tool flows that can pause, resume, and request approval." },
      { title: "Developer tooling MCPs", description: "Code, deployment, and incident-response tools wired to your stack." },
    ],
    differentiators: [
      { title: "Auth & access by design", description: "OAuth, API keys, scoped tokens, and clear human-in-the-loop boundaries." },
      { title: "Observability built-in", description: "Trace every tool call, log every input, surface every failure with context." },
      { title: "Schema-first tools", description: "Strict JSON schemas, examples, and behaviour notes agents can rely on." },
      { title: "Deployable anywhere", description: "Self-host or deploy to your cloud — Cloudflare Workers, Fly, Vercel, or AWS." },
    ],
    tiers: [
      { name: "Starter MCP", price: "$249", cadence: "one-time", description: "Productized starter with auth, logging, and example tools.", features: ["TypeScript codebase", "Auth + secrets handling", "Example tools", "Deployment guide"], cta: { label: "Buy starter", href: "/digital-products" } },
      { name: "Custom Integration", price: "$8.5k", cadence: "/ project", description: "A focused MCP server scoped around 1–2 systems with secure access.", features: ["Discovery + scoping", "Auth + permission model", "Tool design + tests", "Deployment + handoff"], cta: { label: "Scope an MCP", href: "/book-appointment" }, featured: true, badge: "Most chosen" },
      { name: "Platform Engagement", price: "Custom", description: "Multi-system MCP platform with shared infra, observability, and governance.", features: ["Shared auth layer", "Tool registry", "Audit + governance", "Ongoing support"], cta: { label: "Plan platform", href: "/book-appointment" } },
    ],
    faq: [
      { question: "What is MCP?", answer: "Model Context Protocol — an open standard for giving AI agents structured, auditable access to tools and data." },
      { question: "Where do you deploy?", answer: "We deploy to your cloud or recommended hosts: Cloudflare Workers, Fly, Vercel, or AWS." },
      { question: "How do you handle security?", answer: "Scoped auth, secrets via your existing vault, full call logging, and explicit human-in-the-loop boundaries." },
    ],
    stats: [
      { value: "12+", label: "MCPs shipped" },
      { value: "<150ms", label: "Median tool latency" },
      { value: "100%", label: "Audit-traced calls" },
      { value: "3 wk", label: "Typical scope-to-ship" },
    ],
  },
  automation: {
    eyebrow: "Automation",
    headline: "Operational systems that remove repetitive work — measurably.",
    description:
      "We map workflows, design exception logic, and ship integrations that turn manual work into measurable operational speed.",
    primaryCta: "Audit My Workflow",
    secondaryCta: "View automation examples",
    secondaryHref: "/portfolio",
    builds: [
      { title: "Lead routing & enrichment", description: "Inbound leads scored, enriched, and routed to the right owner instantly." },
      { title: "CRM sync & pipelines", description: "Bi-directional sync between CRM, billing, and product systems." },
      { title: "Support triage", description: "Automated routing, tagging, and first-response drafts via LLM workflows." },
      { title: "Reporting & dashboards", description: "Scheduled exports, executive digests, and live dashboards." },
      { title: "Onboarding & approvals", description: "Step-based flows with exceptions, escalations, and human checkpoints." },
      { title: "Content workflows", description: "Multi-channel publishing pipelines with review gates and version history." },
    ],
    differentiators: [
      { title: "Real workflow mapping", description: "We document exceptions, owners, and edge cases — not just the happy path." },
      { title: "Exception-first design", description: "Failures route to humans with full context, never to silent dead-ends." },
      { title: "Observability included", description: "Every run logged, retryable, and reportable from day one." },
      { title: "Predictable cost & speed", description: "We model integration costs and latency before recommending a tool." },
    ],
    tiers: [
      { name: "Audit Sprint", price: "$3.5k", cadence: "/ project", description: "Two-week audit of one or two workflows with prioritized recommendations.", features: ["Workflow mapping", "Cost & risk model", "Prioritized roadmap", "Implementation handoff"], cta: { label: "Book audit", href: "/book-appointment" } },
      { name: "Implementation", price: "$8k", cadence: "/ project", description: "Build and ship a complete automation system with exception handling.", features: ["Discovery + design", "Build + integrations", "Observability setup", "Documentation + handoff"], cta: { label: "Scope build", href: "/book-appointment" }, featured: true, badge: "Most chosen" },
      { name: "Optimization Retainer", price: "$3.2k", cadence: "/ month", description: "Continuous monitoring, tuning, and new workflow rollouts.", features: ["Monthly review", "New workflows shipped", "Failure monitoring", "Quarterly cost review"], cta: { label: "Start retainer", href: "/book-appointment" } },
    ],
    faq: [
      { question: "What tools do you use?", answer: "We use the right tool for the workflow — Zapier, n8n, custom Node services, or direct API integrations depending on volume and complexity." },
      { question: "How do you handle failures?", answer: "Every workflow has explicit retry, escalation, and human handoff paths. Failures never silently disappear." },
      { question: "Can you connect AI safely?", answer: "Yes. We design AI steps with clear inputs, outputs, and human checkpoints where decisions matter." },
    ],
    stats: [
      { value: "5h/wk", label: "Avg time saved" },
      { value: "−38%", label: "No-show rate" },
      { value: "2 wk", label: "Audit window" },
      { value: "100%", label: "Logged runs" },
    ],
  },
  "technical-seo": {
    eyebrow: "Technical SEO",
    headline: "Get discovered, tracked, and optimized from day one.",
    description:
      "One-time technical SEO, Search Console, analytics, schema, and Core Web Vitals configuration so your product ranks, measures, and converts correctly after launch.",
    primaryCta: "Book SEO setup",
    secondaryCta: "See what's included",
    secondaryHref: "#pricing",
    builds: [
      { title: "Search Console & indexing", description: "Property setup, sitemap submission, and crawlability fixes." },
      { title: "On-page SEO fundamentals", description: "Titles, meta descriptions, Open Graph, and canonical hygiene." },
      { title: "Google Analytics 4", description: "Property setup, data streams, and conversion event verification." },
      { title: "Meta Pixel & ad readiness", description: "Base pixel installation with verified core events." },
      { title: "Structured data", description: "Schema markup for key page types so algorithms understand your content." },
      { title: "Core Web Vitals", description: "Performance audit with actionable fixes for LCP, INP, and CLS." },
    ],
    differentiators: [
      { title: "Launch-aligned setup", description: "We configure tracking and SEO foundations in parallel with website or SaaS delivery—not weeks later." },
      { title: "Verified, not assumed", description: "Every configuration is tested: indexing active, events firing, schema validating." },
      { title: "Documentation handoff", description: "You receive clear documentation for every setting—no black boxes after we leave." },
      { title: "One-time foundation", description: "These are durable configurations designed to run without ongoing retainers unless you want them." },
    ],
    tiers: [
      { name: "Essentials Setup", price: "From $750", cadence: "one-time", description: "Search Console, sitemap, GA4, and core meta coverage for a focused site.", features: ["Search Console setup", "Sitemap + robots.txt", "GA4 property + stream", "Meta tag review"], cta: { label: "Book essentials", href: "/book-appointment" } },
      { name: "Full Technical SEO Sprint", price: "From $1.5k", cadence: "one-time", description: "Complete technical SEO foundation with analytics, schema, and performance fixes.", features: ["Everything in Essentials", "Meta Pixel setup", "Schema for key templates", "Core Web Vitals fixes"], cta: { label: "Book full sprint", href: "/book-appointment" }, featured: true, badge: "Most chosen" },
      { name: "Launch + Product Bundle", price: "Custom", description: "Run SEO and analytics setup alongside an active website or SaaS build.", features: ["Parallel with build team", "Event map aligned to product", "Post-launch verification", "Handoff workshop"], cta: { label: "Discuss bundle", href: "/book-appointment" } },
    ],
    faq: [
      { question: "Do I need this if you built my site?", answer: "Often yes. Many launches ship without Search Console, pixels, or schema configured—even when the build quality is strong." },
      { question: "Is this ongoing SEO?", answer: "No. This is a one-time technical foundation. Content strategy, link building, and retainers are separate engagements." },
      { question: "How long does setup take?", answer: "Most engagements complete in 3–10 business days depending on site size and existing technical debt." },
    ],
    stats: [
      { value: "3–10d", label: "Typical setup" },
      { value: "100%", label: "Verified events" },
      { value: "GA4", label: "Analytics ready" },
      { value: "Schema", label: "Structured data" },
    ],
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
  if (!service) return {};
  return {
    title: `${service.title} Service`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (isHiddenServiceSlug(slug)) {
    notFound();
  }
  if (slug === "html-business-profiles") {
    redirect("/digital-products/category/html-business-profiles");
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

  const serviceSectionPage = isWebsitesService ? "service-detail-websites" : "service-detail";

  const engagementModelsSection = (
    <Section
      id="pricing"
      {...marketingSection(
        serviceSectionPage,
        isWebsitesService ? "engagement" : "overview",
      )}
    >
      <Container>
        <SectionHeading
          eyebrow="Engagement models"
          title="Pick the surface area that matches the work."
          align="center"
        />
        <RevealGroup className="mt-12 grid gap-5 lg:grid-cols-3" stagger={0.08}>
          {copy.tiers.map((t) => (
            <RevealItem key={t.name} className="h-full">
              <PricingTier tier={t} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );

  return (
    <>
      <Section {...marketingSection("service-detail", "hero")} layout="viewport" className="hero-section relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" aria-hidden />
        <Container className={HERO_VIEWPORT_CONTAINER_CLASS}>
          <Link href="/services" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-primary">
            ← All services
          </Link>
          <div className="mt-6 grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7">
              <div className="signal-rise" style={{ animationDelay: "0ms" }}>
                <Badge tone="primary" dot>{copy.eyebrow}</Badge>
              </div>
              <h1
                className={cn("signal-rise mt-5", HERO_TITLE_CLASS)}
                style={{ animationDelay: "70ms" }}
              >
                {copy.headline}
              </h1>
              <p
                className="mt-6 text-lg text-text-muted leading-7 signal-rise"
                style={{ animationDelay: "140ms" }}
              >
                {copy.description}
              </p>
              <div
                className="mt-8 flex flex-wrap gap-3 signal-rise"
                style={{ animationDelay: "210ms" }}
              >
                <LinkButton href="/book-appointment" size="lg">
                  {copy.primaryCta} <ArrowRightIcon className="size-4" />
                </LinkButton>
                <LinkButton href={copy.secondaryHref} variant="outline" size="lg">{copy.secondaryCta}</LinkButton>
              </div>
            </div>
            <div className="lg:col-span-5 signal-rise" style={{ animationDelay: "280ms" }}>
              <Card className="overflow-hidden">
                <div className="flex items-center justify-between mb-5">
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
          </div>
          {isWebsitesService ? (
            <div className="mt-12 signal-rise" style={{ animationDelay: "350ms" }}>
              <StatBlock stats={WEBSITES_SERVICE_STATS} containerWidth="shell" />
            </div>
          ) : null}
        </Container>
      </Section>

      {isWebsitesService ? (
        <>
          <FeaturedProducts
            products={featuredHtmlWebsiteTemplates}
            variant="html-preview"
            maxProducts={3}
            sectionShell={marketingSection("service-detail-websites", "featured-templates")}
            eyebrow="Featured templates"
            title="Production-ready templates with live desktop preview"
            description="Deliver flawless experiences across every device—preview, purchase, and launch from proven website systems."
            ctaHref="/digital-products/category/website-templates-html-preview#profiles"
            ctaLabel={WEBSITE_TEMPLATE_PREVIEW.browseTemplatePreviewsCta}
          />

          <WebsiteTemplateHtmlPreviewShowcaseSections
            slides={htmlPreviewSlides}
            emptyFallbackSlide={htmlPreviewFallbackSlide}
            reverseMobileLayout
            showMobileSectionDivider
            autoPlayMobileCarousel={false}
            sectionTitleClassName={HERO_TITLE_CLASS}
            sectionShell={marketingSection("service-detail-websites", "preview")}
            title={HOME_PREVIEW_COPY.title}
            description={HOME_PREVIEW_COPY.description}
          />

          {engagementModelsSection}
        </>
      ) : null}

      {slug !== "mcp-servers" && slug !== "automation" && !isWebsitesService && (
        <Section size="compact">
          <StatBlock stats={HOME_STATS} />
        </Section>
      )}

      {slug === "saas-applications" && (
        <Section size="standard" layout="content" spacing="split" tone="inset">
          <Container>
            <SectionHeading
              eyebrow="Our stack"
              title="Our SaaS Development Stack"
              description="We build modern, scalable SaaS applications using a proven, flexible tech stack—carefully selected for performance, scalability, and speed of execution."
            />
            <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
              {[
                {
                  category: "Core Development",
                  items: ["Python", "Django", "JavaScript", "TypeScript", "Node.js", "REST APIs", "GraphQL"],
                },
                {
                  category: "Frontend & Frameworks",
                  items: ["Next.js", "React", "Vite", "Tailwind CSS", "ShadCN UI"],
                },
                {
                  category: "AI & Automation Systems",
                  items: ["Custom MCP servers", "AI-driven workflows", "API automation", "Background job systems", "Cron pipelines"],
                },
                {
                  category: "Cloud & Infrastructure",
                  items: ["AWS (S3, EC2, Lambda)", "Vercel", "Docker", "CI/CD pipelines", "Serverless architecture"],
                },
                {
                  category: "Databases",
                  items: ["PostgreSQL", "MongoDB", "Redis"],
                },
                {
                  category: "Payments & Monetization",
                  items: ["Stripe", "Webhooks", "Subscription systems"],
                },
                {
                  category: "Email & Communication",
                  items: ["SendGrid", "Resend", "SMTP systems", "Transactional email pipelines"],
                },
                {
                  category: "CMS & Content Systems",
                  items: ["Sanity", "Payload CMS", "Headless CMS architectures"],
                },
                {
                  category: "Integrations & Tools",
                  items: ["Third-party APIs", "OAuth systems", "Webhook integrations", "Zapier-style automation bridges"],
                },
              ].map((group) => (
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
              We don&apos;t just pick tools—we combine them into a system that can build, launch, and scale SaaS products efficiently.
            </p>
          </Container>
        </Section>
      )}

      <Section {...marketingSection(serviceSectionPage, "overview")}>
        <Container>
          <SectionHeading
            eyebrow={isWebsitesService ? WEBSITES_OUTCOMES_SECTION.eyebrow : "What gets built"}
            title={
              isWebsitesService
                ? WEBSITES_OUTCOMES_SECTION.title
                : "The actual surfaces and systems we ship."
            }
            description={isWebsitesService ? WEBSITES_OUTCOMES_SECTION.description : undefined}
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
        </Container>
      </Section>

      <Section {...marketingSection(serviceSectionPage, "deliverables")}>
        <Container>
          <SectionHeading
            eyebrow={
              isWebsitesService ? WEBSITES_WHY_CHOOSE_SECTION.eyebrow : "What makes it different"
            }
            title={
              isWebsitesService
                ? WEBSITES_WHY_CHOOSE_SECTION.title
                : "Operating choices, not adjectives."
            }
            description={
              isWebsitesService
                ? WEBSITES_WHY_CHOOSE_SECTION.description
                : "The decisions that shape how this work actually feels to use, ship, and maintain."
            }
          />
          <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2" stagger={0.07}>
            {copy.differentiators.map((d) => (
              <RevealItem key={d.title} className="h-full">
                <div className="h-full rounded-md border border-border bg-surface p-6">
                  {!isWebsitesService ? (
                    <div className="font-mono text-xs uppercase tracking-wider text-primary">Principle</div>
                  ) : null}
                  <h3 className={cn("font-display text-xl tracking-tight", !isWebsitesService && "mt-2")}>
                    {d.title}
                  </h3>
                  <p className="mt-2 text-text-muted leading-7 text-pretty">{d.description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section {...marketingSection(serviceSectionPage, "process")}>
        <Container>
          {isWebsitesService ? (
            <>
              <SectionHeading
                eyebrow={WEBSITES_LAUNCH_PROCESS_SECTION.eyebrow}
                title={WEBSITES_LAUNCH_PROCESS_SECTION.title}
                description={WEBSITES_LAUNCH_PROCESS_SECTION.description}
              />
              <div className="mt-10">
                <WebsiteLaunchProcessTimeline steps={[...WEBSITES_LAUNCH_PROCESS_SECTION.steps]} />
              </div>
            </>
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

      {related.length > 0 && (
        <Section {...marketingSection(serviceSectionPage, "proof")}>
          <Container>
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
          </Container>
        </Section>
      )}

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
          <SectionHeading
            eyebrow="FAQ"
            title={
              isWebsitesService
                ? "Common website project questions, answered."
                : `${copy.eyebrow} questions, answered.`
            }
            description={
              isWebsitesService
                ? "Timelines, ownership, platforms, support, and pricing—covered before you book a call."
                : undefined
            }
            align="center"
          />
          <div className="mt-10">
            <Accordion items={copy.faq} />
          </div>
        </Container>
      </Section>

      <CTABand
        title={isWebsitesService ? WEBSITES_SERVICE_CTA.title : `${copy.primaryCta} — let's talk specifics.`}
        description={
          isWebsitesService
            ? WEBSITES_SERVICE_CTA.description
            : "A 30-minute discovery call. A written plan within 48 hours. Your call on whether to move forward."
        }
        primary={{
          label: isWebsitesService ? WEBSITES_SERVICE_CTA.primaryLabel : copy.primaryCta,
          href: isWebsitesService ? WEBSITES_SERVICE_CTA.primaryHref : "/book-appointment",
        }}
        secondary={
          isWebsitesService
            ? { label: WEBSITES_SERVICE_CTA.secondaryLabel, href: WEBSITES_SERVICE_CTA.secondaryHref }
            : { label: "Open WhatsApp", href: WHATSAPP_HREF }
        }
      />
    </>
  );
}
