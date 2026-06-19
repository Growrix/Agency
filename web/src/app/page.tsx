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
import { TrustBar } from "@/components/marketing/TrustBar";
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
import { listBlogPosts } from "@/server/blog/content";
import { listPublicPortfolio, listPublicServices, listPublicShopProducts } from "@/server/domain/catalog";
import { HtmlBusinessProfilesCategoryHero } from "@/components/sections/HtmlBusinessProfilesCategoryHero";
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
import { getSanityHomePageContent } from "@/server/sanity/marketing";

const SHOW_LIVE_SAAS_SECTION = false;

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
  const [latestBlogPosts, homeContent, services, portfolio, publicProducts] = await Promise.all([
    listBlogPosts().then((items) => items.slice(0, 3)),
    getSanityHomePageContent().catch(() => null),
    listPublicServices(),
    listPublicPortfolio(),
    listPublicShopProducts(),
  ]);

  const featuredProjects = pickBySlugs(portfolio, homeContent?.featuredBuilds?.projectSlugs, portfolio.slice(0, 3));
  const htmlBusinessProfileProducts = publicProducts.filter((product) => product.categorySlug === "html-business-profiles");
  const featuredHtmlBusinessProfileProducts = htmlBusinessProfileProducts.slice(0, 4);
  const htmlPreviewCatalogProducts = publicProducts.filter(
    (product) => product.categorySlug === WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG,
  );
  const featuredHtmlWebsiteTemplates = htmlPreviewCatalogProducts.slice(0, 3);
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
    type: htmlPreviewPrimaryTemplate?.type ?? "HTML Preview",
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
      <Section size="hero" layout="viewport" className="hero-section relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" aria-hidden />
        <div className="hero-glow pointer-events-none absolute left-1/2 top-8 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" aria-hidden />
        <div className="hero-glow pointer-events-none absolute right-12 top-24 h-40 w-40 rounded-full bg-secondary/20 blur-3xl" aria-hidden />
        <Container width="shell">
          <div className="mx-auto max-w-5xl text-center">
            <div className="signal-rise" style={{ animationDelay: "0ms" }}>
              <Badge tone="primary" dot>{homeContent?.heroBadge ?? "Productized SaaS studio + digital marketplace"}</Badge>
            </div>
            <h1
              className="signal-rise mt-5 font-display text-3xl sm:text-4xl leading-[1.08] tracking-tight text-balance"
              style={{ animationDelay: "90ms" }}
            >
              {homeContent?.heroTitle ?? "Launch faster with ready-made SaaS templates, AI tools, and custom development support."}
            </h1>
            <p
              className="signal-rise mx-auto mt-6 max-w-3xl text-lg leading-7 text-pretty text-text-muted"
              style={{ animationDelay: "180ms" }}
            >
              {homeContent?.heroDescription ?? "Buy production-ready digital products, customize them yourself, or hire GrowrixOS to set up, modify, and scale them for your business."}
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
            <p
              className="signal-rise mx-auto mt-6 max-w-2xl font-mono text-xs uppercase tracking-wider text-text-muted"
              style={{ animationDelay: "360ms" }}
            >
              Next.js · React · TypeScript · Python · Django · Stripe · Supabase
            </p>
          </div>

        </Container>
      </Section>

      <WebsiteTemplateHtmlPreviewShowcaseSections
        slides={htmlPreviewSlides}
        emptyFallbackSlide={htmlPreviewFallbackSlide}
        reverseMobileLayout
        showMobileSectionDivider
        autoPlayMobileCarousel={false}
      />

      <HtmlBusinessProfilesCategoryHero
        products={htmlBusinessProfileProducts}
        showBackLink={false}
        profilesAnchorId="profiles"
        autoPlayCarousel={false}
        sectionSize="standard"
      />

      <TrustBar />

      <FeaturedProducts
        products={featuredHtmlWebsiteTemplates}
        variant="html-preview"
        maxProducts={3}
        eyebrow={homeContent?.shopSpotlight?.eyebrow ?? "HTML website templates"}
        title={homeContent?.shopSpotlight?.title ?? "Production-ready templates with live desktop preview"}
        description={
          homeContent?.shopSpotlight?.description ??
          "Browse HTML website templates with embedded desktop previews — open a product page to buy or request Done-For-You setup."
        }
        ctaHref="/digital-products/category/website-templates-html-preview#profiles"
        ctaLabel="Browse HTML templates"
      />

      <ThreePathExplainer />

      <ServiceCards services={services} />

      <Section size="standard" layout="viewport">
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="New service"
              title="HTML Business Profiles - category-based digital products"
              description="Preview every built HTML business profile by category, then purchase directly from the product catalog with a clear template-to-checkout path."
            />
            <div className="flex flex-wrap gap-3">
              <LinkButton href="/digital-products/category/html-business-profiles" variant="outline">
                Preview all profiles <ArrowUpRightIcon className="size-4" />
              </LinkButton>
              <LinkButton href="/digital-products/category/html-business-profiles">
                Browse category <ArrowRightIcon className="size-4" />
              </LinkButton>
            </div>
          </div>

          <RevealGroup className="mt-10 grid w-full min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" stagger={0.07}>
            {featuredHtmlBusinessProfileProducts.map((product) => (
              <RevealItem key={product.slug} className="h-full min-w-0">
                <ShopProductHtmlMobilePreviewCard product={product} />
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

      {/* Featured Builds */}
      <Section size="standard" layout="viewport">
        <Container>
          <SectionHeading
              eyebrow={homeContent?.featuredBuilds?.eyebrow ?? "Featured builds"}
              title={homeContent?.featuredBuilds?.title ?? "Proof from launches, rebuilds, and growth."}
              description={homeContent?.featuredBuilds?.description ?? "A selection of websites and SaaS products we've shipped recently, plus the systems that kept them moving. Each engagement is shaped around a measurable result."}
          />
          <RevealGroup className="mt-10 grid gap-5 lg:grid-cols-3" stagger={0.08}>
            {featuredProjects.map((p) => (
              <RevealItem key={p.slug}>
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

      <TrustStrip items={HOME_STACK_MARQUEE} />

      {/* # muted by request: keep Live SaaS section in code but hide on homepage */}
      {SHOW_LIVE_SAAS_SECTION ? (
        <Section size="standard" layout="viewport" tone="inset">
          <Container>
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
              <SectionHeading
                eyebrow={homeContent?.liveSaas?.eyebrow ?? "Live SaaS"}
                title={homeContent?.liveSaas?.title ?? "Buy a Live SaaS — Not Just a Template"}
                description={homeContent?.liveSaas?.description ?? "We don&apos;t just sell templates—we build and launch real, revenue-ready SaaS applications. Explore our live products, interact with them, and experience how they work in real-world conditions. Every application is actively running, designed for real users, and built with business in mind."}
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

      {/* Process */}
      <Section size="standard" layout="viewport" tone="inset">
        <Container>
          <SectionHeading
            eyebrow="How we work"
            title="An operating system you can actually plan around."
            description="No mystery process. Every engagement runs through these four phases with explicit outputs and clear cadence."
          />
          <div className="mt-10">
            <ProcessSteps steps={PROCESS_STEPS} />
          </div>
        </Container>
      </Section>

      {/* AI + Live Chat */}
      <Section size="standard" layout="viewport">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow={homeContent?.ai?.eyebrow ?? "AI Growrix OS"}
                title={homeContent?.ai?.title ?? "Get the right answer before you book."}
                description={homeContent?.ai?.description ?? "Ask about website scope, SaaS roadmaps, ready website fit, pricing, or timelines. The concierge keeps MCP and automation in context when they support the main build."}
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
                  <div className="flex gap-3 max-w-md">
                    <div className="size-8 shrink-0 rounded-full bg-secondary" aria-hidden />
                    <div className="rounded-[14px] bg-white/5 px-4 py-3 text-sm leading-6">
                      Hey — I&apos;m thinking about rebuilding our SaaS dashboard. We&apos;re 12 people, 8k MAUs.
                    </div>
                  </div>
                  <div className="flex gap-3 max-w-md ml-auto justify-end">
                    <div className="rounded-[14px] bg-primary px-4 py-3 text-sm leading-6 text-white">
                      That sounds like a Product Partner engagement. We typically scope these in a 1-week discovery sprint. Want timelines and team sizing?
                    </div>
                    <div className="size-8 rounded-full bg-white/10 inline-flex items-center justify-center shrink-0">
                      <CubeTransparentIcon className="size-4" aria-hidden />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {["Show timelines", "Team & rates", "Talk to a human"].map((s) => (
                      <span key={s} className="rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-xs">
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

      <Testimonials />

      {SHOW_GOOGLE_REVIEWS && (
        <Section size="standard" layout="viewport">
          <Container>
            <GoogleReviews
              eyebrow="Voices"
              title="Teams we've shipped with."
              description="Live Google reviews from the public Growrix OS business profile."
            />
          </Container>
        </Section>
      )}

      {/* Field notes (Blog) */}
      <Section size="standard" layout="viewport" tone="inset">
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow={homeContent?.fieldNotes?.eyebrow ?? "Field notes"}
              title={homeContent?.fieldNotes?.title ?? "Long-form writing from the studio."}
              description={homeContent?.fieldNotes?.description ?? "Engineering deep-dives, design system reflections, and quarterly notes on what we shipped."}
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
