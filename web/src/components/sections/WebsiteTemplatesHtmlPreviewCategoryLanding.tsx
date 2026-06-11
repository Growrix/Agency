import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Accordion } from "@/components/sections/Accordion";
import { HtmlProfileHeroCarousel, type HtmlProfileHeroSlide } from "@/components/sections/HtmlProfileHeroCarousel";
import { WebsiteTemplateHtmlDualPreview } from "@/components/sections/WebsiteTemplateHtmlDualPreview";
import { ShopProductHtmlPreviewCard } from "@/components/shop/ShopProductHtmlPreviewCard";
import { getProductHref, type ShopProduct } from "@/lib/shop";
import {
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
  const featuredProducts = catalogProducts.slice(0, 8);
  const standardPrice = getVariantPrice(products, "standard", "$149");
  const premiumPrice = getVariantPrice(products, "premium", "$499");
  const launchPrice = getVariantPrice(products, "done-for-you", "Custom Pricing");
  const primaryTemplate = catalogProducts[0] ?? products[0];
  const primaryHtmlPreview = listWebsiteTemplateHtmlPreviews()[0];
  const primaryHtmlPreviewUrl = primaryHtmlPreview
    ? getWebsiteTemplateHtmlPreviewUrl(primaryHtmlPreview.slug)
    : undefined;
  const htmlPreviewSlides: HtmlProfileHeroSlide[] = listWebsiteTemplateHtmlPreviews().map((template) => ({
    name: template.title,
    type: template.type,
    price: template.price,
    href: template.href,
    previewUrl: getWebsiteTemplateHtmlPreviewUrl(template.slug),
  }));

  return (
    <>
      <Section className="pt-10 pb-10 sm:pt-14 sm:pb-12">
        <Container>
          <div className="flex flex-col gap-3 text-center">
            <Badge tone="primary" dot>New Preview Concept</Badge>
            <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-balance">
              Desktop and mobile preview, side by side
            </h2>
            <p className="mx-auto max-w-3xl text-base leading-7 text-text-muted">
              This section is preview-first by design, so users can inspect the same HTML template in desktop and
              mobile form before moving into purchase or customization.
            </p>
          </div>

          <div className="mt-8">
            <WebsiteTemplateHtmlDualPreview
              previewUrl={primaryHtmlPreviewUrl}
              templateTitle={primaryHtmlPreview?.title ?? "Website Template"}
            />
          </div>
        </Container>
      </Section>

      <Section className="pt-12 pb-14 sm:pt-16 sm:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-45 pointer-events-none" aria-hidden />
        <Container>
          <Link href="/products" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-primary">
            ← All products
          </Link>

          <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:items-stretch">
            <div className="lg:col-span-7">
              <Badge tone="primary" dot>HTML Preview Edition</Badge>
              <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-balance">
                Website templates with embedded HTML live preview.
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-7 text-text-muted">
                This page mirrors the website templates experience but focuses on direct HTML preview-first discovery.
                Review the template in-frame, then continue with your preferred purchase or customization path.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href="/products/category/website-templates-html-preview" size="lg">
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
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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

            <div className="lg:col-span-5">
              <Card className="h-full p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">HTML template preview</p>
                <div className="mt-4 min-h-[420px] lg:min-h-[560px]">
                  <HtmlProfileHeroCarousel
                    slides={htmlPreviewSlides}
                    ctaLabel="View Product"
                    emptyFallbackSlide={{
                      name: "Website Template",
                      type: "HTML Preview",
                      price: "$149",
                      href: "/products/category/website-templates-html-preview",
                    }}
                  />
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="profiles" tone="inset">
        <Container>
          <SectionHeading
            eyebrow="Template catalog"
            title="HTML preview templates you can buy right now"
            description="Products in this category use the dedicated HTML preview card layout."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
            {featuredProducts.map((product) => (
              <ShopProductHtmlPreviewCard key={product.slug} product={product} />
            ))}
          </div>
          <div className="mt-8">
            <LinkButton href="/products/category/website-templates" variant="outline">
              View CMS Website Templates <ArrowUpRightIcon className="size-4" />
            </LinkButton>
          </div>
        </Container>
      </Section>

      <Section id="pricing" className="py-14 sm:py-16">
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

      <Section tone="inset">
        <Container width="reading">
          <SectionHeading eyebrow="FAQ" title="HTML preview page questions, answered." align="center" />
          <div className="mt-10">
            <Accordion items={WEBSITE_TEMPLATE_HTML_PREVIEW_FAQ} />
          </div>
        </Container>
      </Section>

      <Section className="py-14 sm:py-16">
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
