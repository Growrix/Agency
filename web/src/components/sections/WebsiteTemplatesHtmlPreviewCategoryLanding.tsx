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

const WEBSITE_TEMPLATE_HTML_PREVIEW_FAQ = [
  {
    question: "Is this page different from the CMS-driven website templates page?",
    answer: "Yes. This preview page is a dedicated HTML showcase while the existing website templates page remains connected to Sanity as-is.",
  },
  {
    question: "Can I interact with a real HTML preview here?",
    answer: "Yes. The hero preview is rendered from local HTML using the same secure iframe pattern used by the HTML business profiles previews.",
  },
  {
    question: "Can this be expanded with more HTML previews later?",
    answer: "Yes. Additional HTML files can be added to the preview mapping and immediately surfaced in this page carousel.",
  },
  {
    question: "Can I still buy from the regular product catalog?",
    answer: "Yes. Product cards below still come from the existing website templates catalog so checkout flow stays unchanged.",
  },
];

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
    type: primaryTemplate?.type ?? "HTML Preview",
    price: primaryTemplate?.price ?? "$149",
    href: primaryTemplate ? getProductHref(primaryTemplate) : "/products/category/website-templates-html-preview",
    previewUrl: listWebsiteTemplateHtmlPreviews()[0]
      ? getWebsiteTemplateHtmlPreviewUrl(listWebsiteTemplateHtmlPreviews()[0].slug)
      : undefined,
  };

  return (
    <>
      <Section size="hero" layout="viewport" className="hero-section relative overflow-x-hidden">
        <div className="absolute inset-0 bg-grid opacity-45 pointer-events-none" aria-hidden />
        <Container className="min-w-0">
          <Link href="/products" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-primary">
            ← All products
          </Link>

          <div className="mt-6 grid min-w-0 gap-8 lg:grid-cols-12 lg:items-start xl:gap-10">
            <div className="min-w-0 self-start lg:col-span-4 lg:sticky lg:top-24">
              <Badge tone="primary" dot>HTML Preview Edition</Badge>
              <h1 className="mt-5 font-display text-3xl sm:text-4xl leading-[1.08] tracking-tight text-balance">
                Website templates with embedded HTML live preview.
              </h1>
              <p className="mt-5 text-lg leading-7 text-text-muted">
                This page mirrors the website templates experience but focuses on direct HTML preview-first discovery.
                Review the template in-frame, then continue with your preferred purchase or customization path.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href="#profiles" size="lg">
                  Browse HTML Preview Collection <ArrowRightIcon className="size-4" />
                </LinkButton>
                <LinkButton
                  href={primaryTemplate ? getProductHref(primaryTemplate) : "/products/category/website-templates"}
                  variant="outline"
                  size="lg"
                >
                  Open Product Details
                </LinkButton>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  { value: `${catalogProducts.length}+`, label: "Catalog Items" },
                  { value: `${htmlPreviewSlides.length}`, label: "HTML Previews" },
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
      />

      <Section id="profiles" size="standard" layout="viewport" tone="inset" className="overflow-x-hidden">
        <Container className="min-w-0">
          <SectionHeading
            eyebrow="Template catalog"
            title="HTML preview templates you can buy right now"
            description="Live HTML website templates in a compact grid — preview in-frame, then open the product page to buy."
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
              href={primaryTemplate ? getProductHref(primaryTemplate) : "/products/category/website-templates-html-preview#profiles"}
              size="lg"
            >
              Open Featured Template <ArrowRightIcon className="size-4" />
            </LinkButton>
            <LinkButton href="/products/category/website-templates-html-preview#profiles" variant="outline" size="lg">
              Browse HTML Preview Category <ArrowUpRightIcon className="size-4" />
            </LinkButton>
            <LinkButton href="/products/category/website-templates" variant="ghost" size="lg">
              View CMS Website Templates
            </LinkButton>
          </div>
        </Container>
      </Section>

      <Section id="pricing" size="standard" layout="viewport">
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
                href: "/products/category/website-templates",
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

      <Section size="standard" layout="viewport" tone="inset">
        <Container width="reading">
          <SectionHeading eyebrow="FAQ" title="HTML preview page questions, answered." align="center" />
          <div className="mt-10">
            <Accordion items={WEBSITE_TEMPLATE_HTML_PREVIEW_FAQ} />
          </div>
        </Container>
      </Section>

      <Section size="standard" layout="viewport">
        <Container width="reading">
          <Card className="p-8 text-center">
            <h2 className="font-display text-3xl tracking-tight">Need a custom website rollout plan?</h2>
            <p className="mt-3 text-base leading-7 text-text-muted">
              Start from this HTML preview flow, then move into customization or full implementation with our team
              when you are ready to launch.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <LinkButton href="/book-appointment">Book Consultation</LinkButton>
              <LinkButton href="/products/category/website-templates-html-preview" variant="outline">
                Reopen Preview Page <ArrowUpRightIcon className="size-4" />
              </LinkButton>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}
