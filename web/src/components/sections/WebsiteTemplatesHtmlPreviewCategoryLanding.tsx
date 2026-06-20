import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Accordion } from "@/components/sections/Accordion";
import { WebsiteTemplateHtmlDesktopPreviewCarousel, WebsiteTemplateHtmlHeroPreviewFooter } from "@/components/sections/WebsiteTemplateHtmlDualPreview";
import { WebsiteTemplateHtmlPreviewShowcaseSections } from "@/components/sections/WebsiteTemplateHtmlPreviewShowcaseSections";
import type { HtmlProfileHeroSlide } from "@/components/sections/HtmlProfileHeroCarousel";
import { ShopProductHtmlPreviewCard } from "@/components/shop/ShopProductHtmlPreviewCard";
import { getProductHref, type ShopProduct } from "@/lib/shop";
import { marketingSection } from "@/lib/marketing-composition";
import { WEBSITE_TEMPLATE_PREVIEW, WEBSITE_TEMPLATE_PREVIEW_FAQ } from "@/lib/preview-terminology";
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
  const catalogGridProducts = catalogProducts;
  const standardPrice = getVariantPrice(products, "standard", "$149");
  const premiumPrice = getVariantPrice(products, "premium", "$499");
  const launchPrice = getVariantPrice(products, "done-for-you", "Custom Pricing");
  const primaryTemplate = catalogProducts[0] ?? products[0];
  const htmlPreviewSlides: HtmlProfileHeroSlide[] = buildWebsiteTemplateHtmlPreviewSlides(catalogProducts);
  const htmlPreviewFallbackSlide: HtmlProfileHeroSlide = {
    name: primaryTemplate?.name ?? "Website Template",
    type: primaryTemplate?.type ?? WEBSITE_TEMPLATE_PREVIEW.previewBadge,
    price: primaryTemplate?.price ?? "$149",
    href: primaryTemplate ? getProductHref(primaryTemplate) : "/digital-products/category/website-templates-html-preview",
    previewUrl: listWebsiteTemplateHtmlPreviews()[0]
      ? getWebsiteTemplateHtmlPreviewUrl(listWebsiteTemplateHtmlPreviews()[0].slug)
      : undefined,
  };

  return (
    <>
      <Section {...marketingSection("category-website-templates-preview", "hero")} className="hero-section relative overflow-x-hidden">
        <div className="absolute inset-0 bg-grid opacity-45 pointer-events-none" aria-hidden />
        <Container className="min-w-0">
          <Link href="/digital-products" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-primary">
            ← All digital products
          </Link>

          <div className="mt-6 grid min-w-0 gap-8 lg:grid-cols-12 lg:items-start xl:gap-10">
            <div className="min-w-0 self-start lg:col-span-4 lg:sticky lg:top-24">
              <Badge tone="primary" dot>{WEBSITE_TEMPLATE_PREVIEW.heroBadge}</Badge>
              <h1 className="mt-5 font-display text-3xl sm:text-4xl leading-[1.08] tracking-tight text-balance">
                {WEBSITE_TEMPLATE_PREVIEW.heroTitle}
              </h1>
              <p className="mt-5 text-lg leading-7 text-text-muted">
                {WEBSITE_TEMPLATE_PREVIEW.heroDescription}
                Review the template in-frame, then continue with your preferred purchase or customization path.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href="#profiles" size="lg">
                  {WEBSITE_TEMPLATE_PREVIEW.browseCollectionCta} <ArrowRightIcon className="size-4" />
                </LinkButton>
                <LinkButton
                  href={primaryTemplate ? getProductHref(primaryTemplate) : "/digital-products/category/website-templates"}
                  variant="outline"
                  size="lg"
                >
                  Open Product Details
                </LinkButton>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  { value: `${catalogProducts.length}+`, label: "Catalog Items" },
                  { value: `${htmlPreviewSlides.length}`, label: WEBSITE_TEMPLATE_PREVIEW.statPreviewsLabel },
                  { value: "3", label: "Delivery Paths" },
                  { value: "Live", label: "Embedded Preview" },
                ].map((metric) => (
                  <Card key={metric.label} className="p-4">
                    <p className="font-display text-2xl tracking-tight">{metric.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-text-muted">{metric.label}</p>
                  </Card>
                ))}
              </div>
            </div>

            <div className="min-w-0 lg:col-span-8">
              <Card className="flex h-full min-w-0 flex-col overflow-hidden p-5 sm:p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">Live template preview</p>
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
        </Container>
      </Section>

      <WebsiteTemplateHtmlPreviewShowcaseSections
        slides={htmlPreviewSlides}
        emptyFallbackSlide={htmlPreviewFallbackSlide}
        reverseMobileLayout
        showDesktopSection={false}
        showMobileSectionDivider={false}
        autoPlayMobileCarousel={false}
        sectionShell={marketingSection("category-website-templates-preview", "showcase")}
      />

      <Section id="profiles" {...marketingSection("category-website-templates-preview", "catalog")} className="overflow-x-hidden">
        <Container className="min-w-0">
          <SectionHeading
            eyebrow="Template catalog"
            title={WEBSITE_TEMPLATE_PREVIEW.catalogSectionTitle}
            description={WEBSITE_TEMPLATE_PREVIEW.catalogSectionDescription}
          />
          <div className="mt-8 grid w-full min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {catalogGridProducts.map((product) => (
              <div key={product.slug} className="min-w-0">
                <ShopProductHtmlPreviewCard product={product} />
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <LinkButton
              href={primaryTemplate ? getProductHref(primaryTemplate) : "/digital-products/category/website-templates-html-preview#profiles"}
              size="lg"
            >
              Open Featured Template <ArrowRightIcon className="size-4" />
            </LinkButton>
            <LinkButton href="/digital-products/category/website-templates-html-preview#profiles" variant="outline" size="lg">
              {WEBSITE_TEMPLATE_PREVIEW.browseCategoryCta} <ArrowUpRightIcon className="size-4" />
            </LinkButton>
            <LinkButton href="/digital-products/category/website-templates" variant="ghost" size="lg">
              View CMS Website Templates
            </LinkButton>
          </div>
        </Container>
      </Section>

      <Section id="pricing" {...marketingSection("category-website-templates-preview", "pricing")}>
        <Container>
          <SectionHeading eyebrow="Pricing paths" title="Choose your preferred implementation level." align="center" />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {[
              {
                tier: "Template Access",
                price: standardPrice,
                desc: "Download the template and deploy with your own team.",
                includes: ["Template files", "Responsive structure", "Basic setup guidance", "Commercial usage rights"],
                cta: "Get Template",
                href: "/digital-products/category/website-templates",
              },
              {
                tier: "Branded Setup",
                price: premiumPrice,
                desc: "We apply brand, content, and launch setup on your selected template.",
                includes: ["Brand styling", "Content setup", "Core configuration", "Launch-ready handoff"],
                cta: "Request Setup",
                href: "/contact?intent=customize_template&category=website-templates-html-preview",
                featured: true,
              },
              {
                tier: "Launch Partnership",
                price: launchPrice,
                desc: "Done-for-you implementation for teams that want full support.",
                includes: ["Planning support", "Extended implementation", "Deployment assistance", "Post-launch guidance"],
                cta: "Book Discovery",
                href: "/contact?intent=done-for-you&category=website-templates-html-preview",
              },
            ].map((plan) => (
              <Card
                key={plan.tier}
                className={`flex h-full flex-col ${plan.featured ? "contrast-surface bg-contrast text-contrast-text border-white/10 ring-1 ring-primary/40 shadow-(--shadow-2)" : ""}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-xl tracking-tight">{plan.tier}</h3>
                  {plan.featured ? <Badge tone="primary">Recommended</Badge> : null}
                </div>
                <p className="mt-3 font-display text-4xl tracking-tight">{plan.price}</p>
                <p className={`mt-3 text-sm leading-6 ${plan.featured ? "text-white/75" : "text-text-muted"}`}>{plan.desc}</p>
                <ul className="mt-5 flex-1 space-y-2">
                  {plan.includes.map((item) => (
                    <li key={item} className={`flex items-start gap-2 text-sm ${plan.featured ? "text-white/80" : "text-text-muted"}`}>
                      <CheckIcon className="size-4 shrink-0 mt-0.5 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <LinkButton href={plan.href} variant={plan.featured ? "primary" : "outline"} fullWidth>
                    {plan.cta}
                  </LinkButton>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section {...marketingSection("category-website-templates-preview", "faq")}>
        <Container width="reading">
          <SectionHeading eyebrow="FAQ" title={WEBSITE_TEMPLATE_PREVIEW.faqTitle} align="center" />
          <div className="mt-10">
            <Accordion items={[...WEBSITE_TEMPLATE_PREVIEW_FAQ, {
              question: "Can I still buy from the regular product catalog?",
              answer: "Yes. Product cards below still come from the existing website templates catalog so checkout flow stays unchanged.",
            }]} />
          </div>
        </Container>
      </Section>

      <Section {...marketingSection("category-website-templates-preview", "cta")}>
        <Container width="reading">
          <Card className="p-8 text-center">
            <h2 className="font-display text-3xl tracking-tight">Need a custom website rollout plan?</h2>
            <p className="mt-3 text-base leading-7 text-text-muted">
              {WEBSITE_TEMPLATE_PREVIEW.bottomCtaCopy}
              when you are ready to launch.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <LinkButton href="/book-appointment">Book Consultation</LinkButton>
              <LinkButton href="/digital-products/category/website-templates-html-preview" variant="outline">
                Reopen Preview Page <ArrowUpRightIcon className="size-4" />
              </LinkButton>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}
