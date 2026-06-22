import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  CubeTransparentIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { Container, Section } from "@/components/primitives/Container";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { HeroTrustStrip } from "@/components/marketing/HeroTrustStrip";
import { FeaturedProducts } from "@/components/marketing/FeaturedProducts";
import { ThreePathExplainer } from "@/components/marketing/ThreePathExplainer";
import { ServiceCards } from "@/components/marketing/ServiceCards";
import { Testimonials } from "@/components/marketing/Testimonials";
import { ProductLedFinalCTA } from "@/components/marketing/ProductLedFinalCTA";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ConciergeTriggerButton } from "@/components/ai/ConciergeTrigger";
import { BlogCard } from "@/components/sections/BlogCard";
import { PortfolioCard } from "@/components/sections/PortfolioCard";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { ShopProductHtmlMobilePreviewCard } from "@/components/shop/ShopProductHtmlMobilePreviewCard";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import {
  HOME_STACK_MARQUEE,
  PROCESS_STEPS,
} from "@/lib/content";
import { SHOW_GOOGLE_REVIEWS } from "@/lib/feature-flags";
import { WHATSAPP_HREF } from "@/lib/nav";
import { WEBSITE_TEMPLATE_PREVIEW } from "@/lib/preview-terminology";
import { HERO_TITLE_CLASS } from "@/lib/typography";
import { HTML_BUSINESS_PROFILE_SHOP_CATEGORY } from "@/lib/html-business-profiles";
import { buildReadyMadeSolutionTabs, pickPreviewProducts } from "@/lib/ready-made-solutions";
import {
  HOME_AI_COPY,
  HOME_CASE_STUDIES_COPY,
  HOME_OPERATING_SYSTEM_COPY,
  HOME_PREVIEW_COPY,
  HOME_TEMPLATES_MARKETPLACE_COPY,
} from "@/lib/home-conversion-content";
import { homeSection } from "@/lib/homepage-composition";
import { getHomePageData } from "@/server/marketing/home-page-data";
import { WebsiteTemplateHtmlPreviewShowcaseSections } from "@/components/sections/WebsiteTemplateHtmlPreviewShowcaseSections";
import { JsonLd, type JsonLdData } from "@/components/seo/JsonLd";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";
import {
  buildWebsiteTemplateHtmlPreviewSlides,
  getWebsiteTemplateHtmlPreviewUrl,
  listWebsiteTemplateHtmlPreviews,
  WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG,
} from "@/lib/website-templates-html-preview";
import { getProductHref } from "@/lib/shop";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const ReadyMadeSolutionsSection = dynamic(
  () => import("@/components/marketing/ReadyMadeSolutionsSection").then((mod) => mod.ReadyMadeSolutionsSection),
);

const HomeDigitalProductsShowcase = dynamic(
  () => import("@/components/marketing/HomeDigitalProductsShowcase").then((mod) => mod.HomeDigitalProductsShowcase),
);

const SHOW_LIVE_SAAS_SECTION = false;
export const revalidate = 120;

const HOME_PROFILE_PREVIEW_COUNT = 4;

function pickBySlugs<T extends { slug: string }>(items: T[], slugs: string[] | undefined, fallback: T[]) {
  if (!slugs || slugs.length === 0) {
    return fallback;
  }

  const bySlug = new Map(items.map((item) => [item.slug, item]));
  const picked = slugs.map((slug) => bySlug.get(slug)).filter((item): item is T => item !== undefined);
  return picked.length > 0 ? picked : fallback;
}

function isLiveSaasProduct(product: { category: string; categorySlug: string }) {
  const normalizedSlug = product.categorySlug.trim().toLowerCase();
  const normalizedCategory = product.category.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return normalizedSlug === "live-saas" || normalizedCategory === "live-saas";
}

export default async function Home() {
  const { latestBlogPosts, homeContent, services, portfolio, publicProducts } = await getHomePageData();

  const featuredProjects = pickBySlugs(portfolio, homeContent?.featuredBuilds?.projectSlugs, portfolio.slice(0, 3));
  const readyMadeSolutions = buildReadyMadeSolutionTabs(publicProducts);
  const featuredHtmlBusinessProfileProducts = pickPreviewProducts(
    publicProducts,
    HTML_BUSINESS_PROFILE_SHOP_CATEGORY.slug,
    HOME_PROFILE_PREVIEW_COUNT,
    "start",
  );
  const htmlPreviewCatalogProducts = publicProducts.filter(
    (product) => product.categorySlug === WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG,
  );
  const featuredHtmlWebsiteTemplates = pickPreviewProducts(
    publicProducts,
    WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG,
    3,
    "start",
  );
  const liveSaasProducts = publicProducts.filter(isLiveSaasProduct);
  const featuredLiveSaasProducts = pickBySlugs(
    liveSaasProducts,
    homeContent?.liveSaas?.productSlugs,
    liveSaasProducts.slice(0, 4),
  );
  const htmlPreviewSlides = buildWebsiteTemplateHtmlPreviewSlides(htmlPreviewCatalogProducts);
  const htmlPreviewPrimaryTemplate = htmlPreviewCatalogProducts[0];
  const htmlPreviewFallbackSlide = {
    name: htmlPreviewPrimaryTemplate?.name ?? "Website Template",
    type: htmlPreviewPrimaryTemplate?.type ?? WEBSITE_TEMPLATE_PREVIEW.previewBadge,
    price: htmlPreviewPrimaryTemplate?.price ?? "$149",
    href: htmlPreviewPrimaryTemplate
      ? getProductHref(htmlPreviewPrimaryTemplate)
      : "/digital-products/category/website-templates-html-preview",
    previewUrl: listWebsiteTemplateHtmlPreviews()[0]
      ? getWebsiteTemplateHtmlPreviewUrl(listWebsiteTemplateHtmlPreviews()[0].slug)
      : undefined,
  };
  const homeStructuredData: JsonLdData[] = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: absoluteUrl("/Favicon.svg"),
      sameAs: [],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/digital-products?search={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ];

  return (
    <>
      <JsonLd data={homeStructuredData} />
      {/* Hero */}
      <Section {...homeSection("hero")} className="hero-section relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" aria-hidden />
        <div className="hero-glow pointer-events-none absolute left-1/2 top-8 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" aria-hidden />
        <div className="hero-glow pointer-events-none absolute right-12 top-24 h-40 w-40 rounded-full bg-secondary/20 blur-3xl" aria-hidden />
        <Container width="shell">
          <div className="mx-auto max-w-5xl text-center">
            <div className="signal-rise" style={{ animationDelay: "0ms" }}>
              <Badge tone="primary" dot>{homeContent?.heroBadge ?? "Productized SaaS studio + digital marketplace"}</Badge>
            </div>
            <h1
              className={cn("signal-rise mt-5", HERO_TITLE_CLASS)}
              style={{ animationDelay: "90ms" }}
            >
              {homeContent?.heroTitle ?? "Launch faster with ready-made systems, digital products, and expert growth support."}
            </h1>
            <p
              className="signal-rise mx-auto mt-6 max-w-3xl text-lg leading-7 text-pretty text-text-muted"
              style={{ animationDelay: "180ms" }}
            >
              {homeContent?.heroDescription ?? "Buy production-ready digital products, customize them yourself, or partner with GrowrixOS to implement, optimize, and scale what your business needs next."}
            </p>
            <div
              className="signal-rise mt-8 flex flex-wrap items-center justify-center gap-3"
              style={{ animationDelay: "270ms" }}
            >
              <LinkButton href="/digital-products" size="lg">
                Browse Digital Products <ArrowRightIcon className="size-4" />
              </LinkButton>
              <LinkButton href="/book-appointment" variant="outline" size="lg">
                Book a Free Consultation
              </LinkButton>
            </div>
            <div
              className="signal-rise mt-4 flex flex-wrap items-center justify-center gap-2"
              style={{ animationDelay: "320ms" }}
            >
              <LinkButton href="/contact" variant="ghost" size="sm">
                Need Custom Work?
              </LinkButton>
              <LinkButton href={WHATSAPP_HREF} variant="ghost" size="sm" target="_blank" rel="noreferrer">
                Chat on WhatsApp
              </LinkButton>
              <ConciergeTriggerButton
                variant="ghost"
                size="sm"
                prompt="I need help choosing between a product purchase and a done-for-you custom build."
              >
                Ask AI Assistant
              </ConciergeTriggerButton>
            </div>
            <div className="signal-rise mt-6" style={{ animationDelay: "340ms" }}>
              <HeroTrustStrip />
            </div>
            <p
              className="signal-rise mx-auto mt-6 max-w-2xl font-mono text-xs uppercase tracking-wider text-text-muted"
              style={{ animationDelay: "360ms" }}
            >
              Next.js · React · TypeScript · Python · Django · Stripe · Supabase
            </p>
          </div>

        </Container>
      </Section>

      <ServiceCards services={services} />

      <ReadyMadeSolutionsSection
        tabs={readyMadeSolutions.tabs}
        productsByTabId={readyMadeSolutions.productsByTabId}
      />

      <Section {...homeSection("html-profiles")}>
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow={HOME_TEMPLATES_MARKETPLACE_COPY.eyebrow}
              title={HOME_TEMPLATES_MARKETPLACE_COPY.title}
              description={HOME_TEMPLATES_MARKETPLACE_COPY.description}
              titleClassName={HERO_TITLE_CLASS}
            />
            <div className="flex flex-wrap gap-3">
              <LinkButton href="/digital-products/category/html-business-profiles" variant="outline">
                Preview all profiles <ArrowUpRightIcon className="size-4" />
              </LinkButton>
              <LinkButton href="/digital-products/category/website-templates-html-preview">
                Browse templates <ArrowRightIcon className="size-4" />
              </LinkButton>
            </div>
          </div>

          <RevealGroup className="mt-8 grid w-full min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:mt-10 sm:gap-5" stagger={0.07}>
            {featuredHtmlBusinessProfileProducts.map((product, index) => (
              <RevealItem key={product.slug} className="h-full min-w-0">
                <ShopProductHtmlMobilePreviewCard
                  product={product}
                  loadPriority={index === 0}
                />
              </RevealItem>
            ))}
          </RevealGroup>
          {featuredHtmlBusinessProfileProducts.length === 0 && (
            <Card className="mt-10 text-center">
              <p className="font-display text-2xl tracking-tight">No published HTML Business Profile items yet.</p>
              <p className="mt-2 text-text-muted">
                Publish HTML business profile products to display cards in this section.
              </p>
            </Card>
          )}

        </Container>
      </Section>

      <FeaturedProducts
        products={featuredHtmlWebsiteTemplates}
        variant="html-preview"
        maxProducts={3}
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
        sectionShell={homeSection("html-preview")}
        title={HOME_PREVIEW_COPY.title}
        description={HOME_PREVIEW_COPY.description}
      />

      <HomeDigitalProductsShowcase products={publicProducts} />

      <ThreePathExplainer />

      {/* Featured Builds / Case Studies */}
      <Section {...homeSection("featured-builds")}>
        <Container>
          <SectionHeading
              eyebrow={HOME_CASE_STUDIES_COPY.eyebrow}
              title={homeContent?.featuredBuilds?.title ?? HOME_CASE_STUDIES_COPY.title}
              description={homeContent?.featuredBuilds?.description ?? HOME_CASE_STUDIES_COPY.description}
              titleClassName={HERO_TITLE_CLASS}
          />
          <RevealGroup className="mt-8 grid auto-rows-fr gap-4 sm:mt-10 sm:gap-5 lg:grid-cols-3" stagger={0.08}>
            {featuredProjects.map((p) => (
              <RevealItem key={p.slug} className="h-full">
                <PortfolioCard project={p} />
              </RevealItem>
            ))}
          </RevealGroup>
          <div className="mt-8 flex justify-center">
            <LinkButton href="/portfolio" variant="outline">
              See all projects
            </LinkButton>
          </div>
        </Container>
      </Section>

      <TrustStrip items={HOME_STACK_MARQUEE} tone={homeSection("trust-strip").tone} />

      {/* Process / Operating System */}
      <Section {...homeSection("process")}>
        <Container>
          <SectionHeading
            eyebrow={HOME_OPERATING_SYSTEM_COPY.eyebrow}
            title={HOME_OPERATING_SYSTEM_COPY.title}
            description={HOME_OPERATING_SYSTEM_COPY.description}
            titleClassName={HERO_TITLE_CLASS}
          />
          <div className="mt-8 sm:mt-10">
            <ProcessSteps steps={PROCESS_STEPS} />
          </div>
        </Container>
      </Section>

      {/* AI Assistant */}
      <Section {...homeSection("ai-concierge")}>
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow={homeContent?.ai?.eyebrow ?? HOME_AI_COPY.eyebrow}
                title={homeContent?.ai?.title ?? HOME_AI_COPY.title}
                description={homeContent?.ai?.description ?? HOME_AI_COPY.description}
                titleClassName={HERO_TITLE_CLASS}
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <ConciergeTriggerButton>
                  <SparklesIcon className="size-4" /> Ask AI Growrix OS
                </ConciergeTriggerButton>
                <LinkButton href={WHATSAPP_HREF} variant="outline">
                  <ChatBubbleLeftRightIcon className="size-4" /> WhatsApp
                </LinkButton>
              </div>
              <p className="mt-5 flex items-center gap-1.5 text-xs text-text-muted">
                <ShieldCheckIcon className="size-3.5" /> {homeContent?.ai?.privacyNote ?? "Conversations are private and never used to train models."}
              </p>
            </div>
            <div className="lg:col-span-7">
              <Card className="border-white/10 bg-contrast text-contrast-text">
                <div className="space-y-4">
                  <div className="flex max-w-md gap-3">
                    <div className="size-8 shrink-0 rounded-full bg-secondary" aria-hidden />
                    <div className="rounded-[14px] bg-white/5 px-4 py-3 text-sm leading-6">
                      Hey — I&apos;m thinking about rebuilding our SaaS dashboard. We&apos;re 12 people, 8k MAUs.
                    </div>
                  </div>
                  <div className="ml-auto flex max-w-md justify-end gap-3">
                    <div className="rounded-[14px] bg-primary px-4 py-3 text-sm leading-6 text-white">
                      That sounds like a Product Partner engagement. We typically scope these in a 1-week discovery sprint. Want timelines and team sizing?
                    </div>
                    <div className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                      <CubeTransparentIcon className="size-4" aria-hidden />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {["Show timelines", "Team & rates", "Talk to a human"].map((s) => (
                      <span key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* # muted by request: keep Live SaaS section in code but hide on homepage */}
      {SHOW_LIVE_SAAS_SECTION ? (
        <Section size="standard" layout="content" spacing="split" tone="inset">
          <Container>
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
              <SectionHeading
                eyebrow={homeContent?.liveSaas?.eyebrow ?? "Live SaaS"}
                title={homeContent?.liveSaas?.title ?? "Buy a Live SaaS — Not Just a Template"}
                description={homeContent?.liveSaas?.description ?? "We don&apos;t just sell templates—we build and launch real, revenue-ready SaaS applications. Explore our live products, interact with them, and experience how they work in real-world conditions. Every application is actively running, designed for real users, and built with business in mind."}
                titleClassName={HERO_TITLE_CLASS}
              />
              <LinkButton href="/digital-products" variant="outline">
                Explore Live SaaS <ArrowUpRightIcon className="size-4" />
              </LinkButton>
            </div>

            {/* Value bullets */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Test the product before you buy",
                "Experience real functionality, not demos",
                "Understand the business potential firsthand",
                "Launch instantly with a proven foundation",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3 rounded-xl border border-border bg-surface px-4 py-3">
                  <CheckCircleIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  <span className="text-sm leading-6">{point}</span>
                </div>
              ))}
            </div>

            {/* Live SaaS product cards */}
            <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
              {featuredLiveSaasProducts.map((p) => (
                <RevealItem key={p.slug} className="h-full">
                  <ShopProductCard product={p} />
                </RevealItem>
              ))}
            </RevealGroup>
            {featuredLiveSaasProducts.length === 0 && (
              <Card className="mt-10 text-center">
                <p className="font-display text-2xl tracking-tight">No published Live SaaS items yet.</p>
                <p className="mt-2 text-text-muted">
                  Publish shop items with the category slug or label set to Live SaaS to show them here.
                </p>
              </Card>
            )}

            {/* Bottom CTA */}
            <div className="mt-10 rounded-2xl border border-border bg-surface px-6 py-8 sm:px-10 sm:py-10 text-center">
              <p className="font-display text-xl tracking-tight sm:text-2xl">
                This is your chance to skip the idea stage and step directly into a working business.
              </p>
              <p className="mt-3 text-text-muted">
                Use it. Test it. Validate it. Then make your move with confidence.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <LinkButton href="/digital-products">
                  Explore All Live SaaS <ArrowRightIcon className="size-4" />
                </LinkButton>
                <LinkButton href="/book-appointment" variant="outline">
                  Book a Demo
                </LinkButton>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      <Testimonials />

      {SHOW_GOOGLE_REVIEWS && (
        <Section size="standard" layout="content" spacing="split">
          <Container>
            <GoogleReviews
              eyebrow="Voices"
              title="Teams we've shipped with."
              description="Live Google reviews from the public Growrix OS business profile."
              titleClassName={HERO_TITLE_CLASS}
            />
          </Container>
        </Section>
      )}

      {/* Field notes (Blog) */}
      <Section {...homeSection("field-notes")}>
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow={homeContent?.fieldNotes?.eyebrow ?? "Field notes"}
              title={homeContent?.fieldNotes?.title ?? "Long-form writing from the studio."}
              description={homeContent?.fieldNotes?.description ?? "Engineering deep-dives, design system reflections, and quarterly notes on what we shipped."}
              titleClassName={HERO_TITLE_CLASS}
            />
            <LinkButton href="/blog" variant="outline">
              Visit the blog <ArrowUpRightIcon className="size-4" />
            </LinkButton>
          </div>
          <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {latestBlogPosts.map((p) => (
                <RevealItem key={p.slug}>
                  <BlogCard post={p} />
                </RevealItem>
              ))}
          </RevealGroup>
          {latestBlogPosts.length === 0 && (
            <Card className="mt-8 text-center">
              <p className="font-display text-2xl tracking-tight">No published blog posts yet.</p>
              <p className="mt-2 text-text-muted">
                Publish your first post in Sanity to show it here.
              </p>
            </Card>
          )}
        </Container>
      </Section>

      <ProductLedFinalCTA
        eyebrow={homeContent?.finalCta?.eyebrow ?? "Start with a product or a conversation"}
        title={homeContent?.finalCta?.title ?? "Browse ready-made assets or book a free consultation."}
        description={
          homeContent?.finalCta?.description ??
          "Pick a digital product for instant delivery, request Done-For-You setup, or scope a custom build."
        }
        primaryLabel={homeContent?.finalCta?.primaryLabel ?? "Browse Digital Products"}
        primaryHref="/digital-products"
        secondaryLabel={homeContent?.finalCta?.secondaryLabel ?? "Book a Free Consultation"}
        secondaryHref="/book-appointment"
      />
    </>
  );
}
