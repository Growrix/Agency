import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";
import { MarketingAccentTitle } from "@/components/marketing/MarketingAccentTitle";
import { MarketingHeroTitle } from "@/components/marketing/MarketingHeroTitle";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Accordion } from "@/components/sections/Accordion";
import {
  WebsiteTemplateHtmlDesktopPreviewCarousel,
  WebsiteTemplateHtmlHeroPreviewFooter,
} from "@/components/sections/WebsiteTemplateHtmlDualPreview";
import { WebsiteTemplateHtmlPreviewShowcaseSections } from "@/components/sections/WebsiteTemplateHtmlPreviewShowcaseSections";
import type { HtmlProfileHeroSlide } from "@/components/sections/HtmlProfileHeroCarousel";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { MobilePricingCards } from "@/components/marketing/MobilePricingCards";
import { ProductLedFinalCTAMobile } from "@/components/marketing/ProductLedFinalCTAMobile";
import { WebsiteTemplatesHtmlPreviewCategoryCatalogMobile } from "@/components/marketing/categories/WebsiteTemplatesHtmlPreviewCategoryCatalogMobile";
import { WebsiteTemplatesHtmlPreviewCategoryHeroMobile } from "@/components/marketing/categories/WebsiteTemplatesHtmlPreviewCategoryHeroMobile";
import { WebsiteTemplatesHtmlPreviewCategoryShowcaseMobile } from "@/components/marketing/categories/WebsiteTemplatesHtmlPreviewCategoryShowcaseMobile";
import { ServiceFaqMobile } from "@/components/marketing/services/ServiceFaqMobile";
import { ShopProductHtmlPreviewCard } from "@/components/shop/ShopProductHtmlPreviewCard";
import { getProductHref, type ShopProduct } from "@/lib/shop";
import { marketingSection } from "@/lib/marketing-composition";
import { WEBSITE_TEMPLATE_PREVIEW } from "@/lib/preview-terminology";
import {
  WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_ANCHORS,
  WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_CATALOG_SECTION,
  WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_FAQ,
  WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_FAQ_SECTION,
  WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_FINAL_CTA,
  WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_HERO,
  WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_PRICING_SECTION,
  WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SHOWCASE_SECTION,
  buildWebsiteTemplatesCategoryHeroStats,
  buildWebsiteTemplatesCategoryPricingTiers,
  getWebsiteTemplatesCategoryAnchorHref,
} from "@/lib/website-templates-html-preview-category-content";
import {
  buildWebsiteTemplateHtmlPreviewSlides,
  getWebsiteTemplateHtmlPreviewUrl,
  listWebsiteTemplateHtmlPreviews,
  WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG,
} from "@/lib/website-templates-html-preview";

type PublicProduct = ShopProduct & {
  variants?: Array<{
    slug: string;
    tier_name: string;
    price: string;
    fulfillment_type: "digital_download" | "hybrid_support" | "done_for_you_service";
  }>;
};

function getVariantPrice(products: PublicProduct[], slug: string, fallback: string) {
  for (const product of products) {
    const found = product.variants?.find((variant) => variant.slug === slug);
    if (found?.price) return found.price;
  }
  return fallback;
}

export function WebsiteTemplatesHtmlPreviewCategoryLanding({ products }: { products: PublicProduct[] }) {
  const catalogProducts = products.filter(
    (product) => product.categorySlug === WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG,
  );
  const standardPrice = getVariantPrice(products, "standard", "$149");
  const premiumPrice = getVariantPrice(products, "premium", "$499");
  const launchPrice = getVariantPrice(products, "done-for-you", "Custom Pricing");
  const primaryTemplate = catalogProducts[0] ?? products[0];
  const primaryTemplateHref = primaryTemplate
    ? getProductHref(primaryTemplate)
    : getWebsiteTemplatesCategoryAnchorHref("profiles");
  const htmlPreviewSlides: HtmlProfileHeroSlide[] = buildWebsiteTemplateHtmlPreviewSlides(catalogProducts);
  const htmlPreviewFallbackSlide: HtmlProfileHeroSlide = {
    name: primaryTemplate?.name ?? "Website Template",
    type: primaryTemplate?.type ?? WEBSITE_TEMPLATE_PREVIEW.previewBadge,
    price: primaryTemplate?.price ?? "$149",
    href: primaryTemplateHref,
    previewUrl: listWebsiteTemplateHtmlPreviews()[0]
      ? getWebsiteTemplateHtmlPreviewUrl(listWebsiteTemplateHtmlPreviews()[0].slug)
      : undefined,
  };
  const pricingTiers = buildWebsiteTemplatesCategoryPricingTiers(
    primaryTemplate,
    standardPrice,
    premiumPrice,
    launchPrice,
  );
  const heroStats = buildWebsiteTemplatesCategoryHeroStats(catalogProducts.length, htmlPreviewSlides.length);

  return (
    <>
      <Section
        {...marketingSection("category-website-templates-preview", "hero")}
        className="hero-section relative overflow-x-hidden"
      >
        <div className="absolute inset-0 bg-grid opacity-45 pointer-events-none" aria-hidden />
        <Container className="min-w-0">
          <MarketingViewportGate
            mobile={
              <WebsiteTemplatesHtmlPreviewCategoryHeroMobile
                slides={htmlPreviewSlides}
                previewCount={htmlPreviewSlides.length}
                catalogCount={catalogProducts.length}
                secondaryHref={primaryTemplateHref}
              />
            }
            desktop={
              <>
                <Link
                  href={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_HERO.backHref}
                  className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-primary"
                >
                  ← {WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_HERO.backLabel}
                </Link>

                <div className="mt-6 grid min-w-0 gap-8 lg:grid-cols-12 lg:items-start xl:gap-10">
                  <div className="min-w-0 self-start lg:col-span-4 lg:sticky lg:top-24">
                    <Badge tone="primary" dot>
                      {WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_HERO.eyebrow}
                    </Badge>
                    <MarketingHeroTitle
                      className="mt-5 font-display text-3xl sm:text-4xl leading-[1.08] tracking-tight text-balance"
                      titleLead={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_HERO.titleLead}
                      titleAccent={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_HERO.titleAccent}
                      layout="block"
                    />
                    <p className="mt-5 text-lg leading-7 text-text-muted">
                      {WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_HERO.description}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <LinkButton href={getWebsiteTemplatesCategoryAnchorHref("profiles")} size="lg">
                        {WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_HERO.primaryCta}{" "}
                        <ArrowRightIcon className="size-4" />
                      </LinkButton>
                      <LinkButton href={primaryTemplateHref} variant="outline" size="lg">
                        {WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_HERO.secondaryCta}
                      </LinkButton>
                    </div>
                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      {heroStats.map((metric) => (
                        <Card key={metric.label} className="p-4">
                          <p className="font-display text-2xl tracking-tight">{metric.value}</p>
                          <p className="mt-1 text-xs uppercase tracking-[0.16em] text-text-muted">{metric.label}</p>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div className="min-w-0 lg:col-span-8">
                    <Card className="flex h-full min-w-0 flex-col overflow-hidden p-5 sm:p-6">
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">
                        {WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_HERO.previewLabel}
                      </p>
                      <div className="mt-4 flex min-h-[380px] flex-1 flex-col sm:min-h-[440px] lg:min-h-[520px] xl:min-h-[560px]">
                        <WebsiteTemplateHtmlDesktopPreviewCarousel
                          slides={htmlPreviewSlides}
                          fillHeight
                          desktopPreviewFit="width"
                          autoPlay={false}
                          minHeightClass="min-h-[380px] sm:min-h-[440px] lg:min-h-[520px] xl:min-h-[560px]"
                          className="flex-1"
                        />
                      </div>
                      <WebsiteTemplateHtmlHeroPreviewFooter previewCount={htmlPreviewSlides.length} />
                    </Card>
                  </div>
                </div>
              </>
            }
          />
        </Container>
      </Section>

      <MarketingViewportGate
        mobile={
          <Section {...marketingSection("category-website-templates-preview", "showcase")} className="overflow-x-hidden">
            <Container className="min-w-0">
              <WebsiteTemplatesHtmlPreviewCategoryShowcaseMobile
                slides={htmlPreviewSlides}
                emptyFallbackSlide={htmlPreviewFallbackSlide}
              />
            </Container>
          </Section>
        }
        desktop={
          <WebsiteTemplateHtmlPreviewShowcaseSections
            slides={htmlPreviewSlides}
            emptyFallbackSlide={htmlPreviewFallbackSlide}
            reverseMobileLayout
            showDesktopSection={false}
            showMobileSectionDivider={false}
            autoPlayMobileCarousel={false}
            sectionShell={marketingSection("category-website-templates-preview", "showcase")}
            title={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SHOWCASE_SECTION.title}
            description={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SHOWCASE_SECTION.description}
          />
        }
      />

      <Section
        id={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_ANCHORS.profiles}
        {...marketingSection("category-website-templates-preview", "catalog")}
        className="overflow-x-hidden"
      >
        <Container className="min-w-0">
          <MarketingViewportGate
            mobile={
              <WebsiteTemplatesHtmlPreviewCategoryCatalogMobile
                products={catalogProducts}
                featuredHref={primaryTemplateHref}
              />
            }
            desktop={
              <>
                <SectionHeading
                  eyebrow={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_CATALOG_SECTION.eyebrow}
                  titleLead={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_CATALOG_SECTION.titleLead}
                  titleAccent={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_CATALOG_SECTION.titleAccent}
                  description={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_CATALOG_SECTION.description}
                />
                <div className="mt-8 grid w-full min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {catalogProducts.map((product) => (
                    <div key={product.slug} className="min-w-0">
                      <ShopProductHtmlPreviewCard product={product} />
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <LinkButton href={primaryTemplateHref} size="lg">
                    {WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_CATALOG_SECTION.featuredCta}{" "}
                    <ArrowRightIcon className="size-4" />
                  </LinkButton>
                  <LinkButton href={getWebsiteTemplatesCategoryAnchorHref("profiles")} variant="outline" size="lg">
                    {WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_CATALOG_SECTION.browseCta}{" "}
                    <ArrowUpRightIcon className="size-4" />
                  </LinkButton>
                </div>
              </>
            }
          />
        </Container>
      </Section>

      <Section
        id={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_ANCHORS.pricing}
        {...marketingSection("category-website-templates-preview", "pricing")}
      >
        <Container>
          <MarketingViewportGate
            mobile={
              <MobilePricingCards
                eyebrow={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_PRICING_SECTION.eyebrow}
                titleLead={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_PRICING_SECTION.titleLead}
                titleAccent={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_PRICING_SECTION.titleAccent}
                cards={pricingTiers}
              />
            }
            desktop={
              <>
                <SectionHeading
                  eyebrow={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_PRICING_SECTION.eyebrow}
                  titleLead={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_PRICING_SECTION.titleLead}
                  titleAccent={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_PRICING_SECTION.titleAccent}
                  align="center"
                />
                <div className="mt-10 grid gap-5 lg:grid-cols-3">
                  {pricingTiers.map((plan) => {
                    const featured = "featured" in plan && Boolean(plan.featured);

                    return (
                      <Card
                        key={plan.title}
                        className={`flex h-full flex-col ${featured ? "contrast-surface bg-contrast text-contrast-text border-white/10 ring-1 ring-primary/40 shadow-(--shadow-2)" : ""}`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="font-display text-xl tracking-tight">{plan.title}</h3>
                          {featured ? <Badge tone="primary">Recommended</Badge> : null}
                        </div>
                        <p className="mt-3 font-display text-4xl tracking-tight">{plan.investment}</p>
                        <p className={`mt-3 text-sm leading-6 ${featured ? "text-white/75" : "text-text-muted"}`}>
                          {plan.description}
                        </p>
                        <ul className="mt-5 flex-1 space-y-2">
                          {plan.bestFor.map((item) => (
                            <li
                              key={item}
                              className={`flex items-start gap-2 text-sm ${featured ? "text-white/80" : "text-text-muted"}`}
                            >
                              <CheckIcon className="size-4 shrink-0 mt-0.5 text-primary" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-auto pt-6">
                          <LinkButton href={plan.cta.href} variant={featured ? "primary" : "outline"} fullWidth>
                            {plan.cta.label}
                          </LinkButton>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </>
            }
          />
        </Container>
      </Section>

      <Section {...marketingSection("category-website-templates-preview", "faq")}>
        <Container width="reading">
          <MarketingViewportGate
            mobile={
              <ServiceFaqMobile
                eyebrow={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_FAQ_SECTION.eyebrow}
                title={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_FAQ_SECTION.title}
                titleLead={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_FAQ_SECTION.titleLead}
                titleAccent={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_FAQ_SECTION.titleAccent}
                items={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_FAQ}
              />
            }
            desktop={
              <>
                <SectionHeading
                  eyebrow={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_FAQ_SECTION.eyebrow}
                  titleLead={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_FAQ_SECTION.titleLead}
                  titleAccent={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_FAQ_SECTION.titleAccent}
                  align="center"
                />
                <div className="mt-10">
                  <Accordion items={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_FAQ} />
                </div>
              </>
            }
          />
        </Container>
      </Section>

      <MarketingViewportGate
        mobile={
          <ProductLedFinalCTAMobile
            eyebrow={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_FINAL_CTA.eyebrow}
            titleLead={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_FINAL_CTA.titleLead}
            titleAccent={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_FINAL_CTA.titleAccent}
            description={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_FINAL_CTA.description}
            primaryLabel={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_FINAL_CTA.primaryCta}
            primaryHref={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_FINAL_CTA.primaryHref}
            secondaryLabel={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_FINAL_CTA.secondaryCta}
            secondaryHref={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_FINAL_CTA.secondaryHref}
          />
        }
        desktop={
          <Section {...marketingSection("category-website-templates-preview", "cta")}>
            <Container width="reading">
              <Card className="p-8 text-center">
                <h2 className="font-display text-3xl tracking-tight">
                  <MarketingAccentTitle
                    lead={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_FINAL_CTA.titleLead}
                    accent={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_FINAL_CTA.titleAccent}
                  />
                </h2>
                <p className="mt-3 text-base leading-7 text-text-muted">
                  {WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_FINAL_CTA.description}
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <LinkButton href={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_FINAL_CTA.primaryHref}>
                    {WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_FINAL_CTA.primaryCta}
                  </LinkButton>
                  <LinkButton href={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_FINAL_CTA.secondaryHref} variant="outline">
                    {WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_FINAL_CTA.secondaryCta}{" "}
                    <ArrowUpRightIcon className="size-4" />
                  </LinkButton>
                </div>
              </Card>
            </Container>
          </Section>
        }
      />
    </>
  );
}
