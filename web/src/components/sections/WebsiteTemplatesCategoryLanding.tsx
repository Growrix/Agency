import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Accordion } from "@/components/sections/Accordion";
import { HtmlProfileHeroCarousel, type HtmlProfileHeroSlide } from "@/components/sections/HtmlProfileHeroCarousel";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import { getProductHref, type ShopProduct } from "@/lib/shop";
import { getProductImage } from "@/lib/site-images";

type PublicProduct = ShopProduct & {
  gallery?: Array<{
    src: string;
    alt: string;
  }>;
  variants?: Array<{
    slug: string;
    tier_name: string;
    price: string;
    fulfillment_type: "digital_download" | "hybrid_support" | "done_for_you_service";
  }>;
};

function getScreen02Image(product: PublicProduct) {
  const images = product.gallery ?? [];
  // Convention: gallery index 1 is Screen 02.
  if (images.length > 1) {
    return images[1] ?? null;
  }

  return images.find((item) => {
    const haystack = `${item.alt} ${item.src}`.toLowerCase();
    return /(screen|screenshot)[\s_-]*0?2\b/.test(haystack) || /\b02\b/.test(haystack);
  }) ?? null;
}

const WEBSITE_TEMPLATE_FAQ = [
  {
    question: "Can I preview templates before purchasing?",
    answer: "Yes. Each website template includes preview imagery and product detail pages before checkout.",
  },
  {
    question: "Is this a one-time purchase or subscription?",
    answer: "Template purchases are one-time. Customization or launch help is scoped separately when needed.",
  },
  {
    question: "Can you customize the template for my business?",
    answer: "Yes. Choose the configured or launch path and our team will tailor branding, content, and implementation.",
  },
  {
    question: "Can these templates evolve into full custom products?",
    answer: "Yes. You can start with templates and move into full website or SaaS build engagements as your needs grow.",
  },
];

function getVariantPrice(products: PublicProduct[], slug: string, fallback: string) {
  for (const product of products) {
    const found = product.variants?.find((variant) => variant.slug === slug);
    if (found?.price) return found.price;
  }
  return fallback;
}

export function WebsiteTemplatesCategoryLanding({ products }: { products: PublicProduct[] }) {
  const featuredProducts = products.slice(0, 8);
  const standardPrice = getVariantPrice(products, "standard", "$149");
  const premiumPrice = getVariantPrice(products, "premium", "$499");
  const launchPrice = getVariantPrice(products, "done-for-you", "Custom Pricing");
  const primaryTemplate = products[0];
  const heroSlides: HtmlProfileHeroSlide[] = products.map((product) => {
    const previewImage = getScreen02Image(product) ?? product.image ?? getProductImage(product.name) ?? null;
    // Website-template previews should prefer image first.
    // Many external livePreviewUrl targets don't allow reliable iframe embedding.
    const previewUrl = previewImage ? undefined : (product.embeddedPreviewUrl ?? product.livePreviewUrl);

    return {
      name: product.name,
      type: product.type,
      price: product.price,
      href: getProductHref(product),
      previewUrl,
      previewImage,
    };
  });

  return (
    <>
      <Section size="hero" layout="viewport" className="hero-section relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-45 pointer-events-none" aria-hidden />
        <Container>
          <Link href="/digital-products" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-primary">
            ← All digital products
          </Link>

          <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:items-stretch">
            <div className="lg:col-span-7">
              <Badge tone="primary" dot>Website Templates</Badge>
              <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-balance">
                Ready-to-launch website templates for faster business growth.
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-7 text-text-muted">
                Start with a production-ready template, choose your delivery path, and launch a professional website
                without waiting for a full custom build cycle.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href="/digital-products/category/website-templates" size="lg">
                  Browse Website Templates <ArrowRightIcon className="size-4" />
                </LinkButton>
                <LinkButton
                  href={primaryTemplate ? `/digital-products/${primaryTemplate.slug}` : "/digital-products/category/website-templates"}
                  variant="outline"
                  size="lg"
                >
                  View Example Template
                </LinkButton>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { value: `${products.length}+`, label: "Template Options" },
                  { value: "24h", label: "Response Time" },
                  { value: "3", label: "Delivery Paths" },
                  { value: "100%", label: "Mobile Responsive" },
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
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">Website preview carousel</p>
                <div className="mt-4 min-h-[420px] lg:min-h-[560px]">
                  <HtmlProfileHeroCarousel
                    slides={heroSlides}
                    ctaLabel="View Template"
                    emptyFallbackSlide={{
                      name: "Website Template",
                      type: "Category Template",
                      price: "$149",
                      href: "/digital-products/category/website-templates",
                      previewImage: getProductImage("Atelier Marketing Theme") ?? null,
                    }}
                  />
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="profiles" size="standard" layout="content" spacing="split" tone="inset">
        <Container>
          <SectionHeading
            eyebrow="Featured templates"
            title="Browse popular website templates"
            description="Real products from the website templates catalog."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <ShopProductCard key={product.slug} product={product} />
            ))}
          </div>
          <div className="mt-8">
            <LinkButton href="/digital-products/category/website-templates" variant="outline">
              View All Website Templates <ArrowUpRightIcon className="size-4" />
            </LinkButton>
          </div>
        </Container>
      </Section>

      <Section id="pricing" size="standard" layout="content" spacing="split">
        <Container>
          <SectionHeading eyebrow="Pricing paths" title="Pick your launch speed and involvement level." align="center" />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {[
              {
                tier: "Template Only",
                price: standardPrice,
                desc: "Best for teams that can customize and launch internally.",
                includes: ["Template files", "Responsive layout", "Documentation", "Commercial usage"],
                cta: "Get Template Access",
                href: "/digital-products/category/website-templates",
              },
              {
                tier: "Template Customization",
                price: premiumPrice,
                desc: "Branding, content setup, and deployment-ready handoff by our team.",
                includes: ["Brand setup", "Content population", "Core integrations", "Launch handoff"],
                cta: "Customize & Launch My Website",
                href: "/contact?intent=customize_template&category=website-templates",
                featured: true,
              },
              {
                tier: "Business Launch",
                price: launchPrice,
                desc: "Done-for-you path for businesses that need complete implementation support.",
                includes: ["Planning", "Advanced customization", "Deployment support", "Launch assistance"],
                cta: "Book Discovery Call",
                href: "/contact?intent=done-for-you&category=website-templates",
              },
            ].map((plan) => (
              <Card
                key={plan.tier}
                className={`flex h-full flex-col ${plan.featured ? "contrast-surface bg-contrast text-contrast-text border-white/10 ring-1 ring-primary/40 shadow-(--shadow-2)" : ""}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-xl tracking-tight">{plan.tier}</h3>
                  {plan.featured ? <Badge tone="primary">Most Popular</Badge> : null}
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

      <Section size="standard" layout="content" spacing="split" tone="inset">
        <Container width="reading">
          <SectionHeading eyebrow="FAQ" title="Website templates questions, answered." align="center" />
          <div className="mt-10">
            <Accordion items={WEBSITE_TEMPLATE_FAQ} />
          </div>
        </Container>
      </Section>

      <Section size="standard" layout="content" spacing="split">
        <Container width="reading">
          <Card className="p-8 text-center">
            <h2 className="font-display text-3xl tracking-tight">Need More Than a Template?</h2>
            <p className="mt-3 text-base leading-7 text-text-muted">
              If you need custom functionality, booking systems, or a complete product build, we can scope the right
              next phase with you.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <LinkButton href="/book-appointment">Book Consultation</LinkButton>
              <LinkButton href="/digital-products/category/website-templates" variant="outline">
                Browse Templates <ArrowUpRightIcon className="size-4" />
              </LinkButton>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}
