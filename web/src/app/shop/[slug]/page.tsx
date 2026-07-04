import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowUpRightIcon, ShoppingBagIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";
import { LinkButton } from "@/components/primitives/Button";
import { PreviewableImageFrame } from "@/components/media/PreviewableImageFrame";
import { PortfolioGalleryLightbox } from "@/components/media/PortfolioGalleryLightbox";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Accordion } from "@/components/sections/Accordion";
import { WebsiteTemplateHtmlMobilePreviewSection } from "@/components/sections/WebsiteTemplateHtmlMobilePreviewSection";
import { HtmlBusinessProfileProductPreviewHighlights, WebsiteTemplateHtmlProductPreviewHighlights } from "@/components/sections/WebsiteTemplateHtmlPreviewMarketing";
import { ShopProductCatalogCard } from "@/components/shop/ShopProductCatalogCard";
import { ShopProductHeroTitle } from "@/components/shop/ShopProductHeroTitle";
import { WebsiteTemplateChoosePathIntro } from "@/components/shop/WebsiteTemplateChoosePathIntro";
import { ProductPreviewSurface } from "@/components/shop/ProductPreviewSurface";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { ProductReviews } from "@/components/shop/ProductReviews";
import { WishlistButton } from "@/components/shop/WishlistButton";
import { JsonLd, type JsonLdData } from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/site";
import { WebsiteTemplateHtmlDesktopPreviewFrame } from "@/components/shop/WebsiteTemplateHtmlDesktopPreviewFrame";
import { WebsiteTemplateHtmlMobilePreviewFrame } from "@/components/shop/WebsiteTemplateHtmlMobilePreviewFrame";
import { WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG } from "@/lib/website-templates-html-preview";
import { WEBSITE_TEMPLATE_PREVIEW } from "@/lib/preview-terminology";
import {
  getTierCardBadgeClass,
  getTierCardCheckClass,
  getTierCardContainerClass,
  getTierCardMutedTextClass,
} from "@/components/sections/tierCardTheme";
import { SERVICES } from "@/lib/content";
import { getCheckoutHref, getProductHref } from "@/lib/shop";
import type { PublicShopProductRecord } from "@/server/domain/catalog";
import { getPublicShopProduct, listPublicShopProducts } from "@/server/domain/catalog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const publicProducts = await listPublicShopProducts().catch(() => []);
  return publicProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getPublicShopProduct(slug).catch(() => null);
  if (!product) return {};

  const canonical = `/digital-products/${product.slug}`;
  const description = product.summary ?? product.teaser ?? undefined;
  const ogImage = product.image?.src;

  return {
    title: product.name,
    description,
    alternates: { canonical },
    openGraph: {
      title: product.name,
      description,
      url: canonical,
      type: "website",
      images: ogImage ? [{ url: ogImage, alt: product.image?.alt ?? product.name }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          viewBox="0 0 16 16"
          className={star <= Math.round(rating) ? "size-4 fill-amber-400" : "size-4 fill-border"}
          aria-hidden
        >
          <path d="M8 1.5l1.76 3.57 3.94.57-2.85 2.78.67 3.93L8 10.35l-3.52 1.99.67-3.93L2.3 5.63l3.94-.57z" />
        </svg>
      ))}
    </span>
  );
}

function getFallbackVariants(product: PublicShopProductRecord) {
  const baseIncludes = product.includes.length > 0 ? product.includes.slice(0, 4) : ["Launch-ready pages", "Deployment handoff"];

  return [
    {
      slug: "standard",
      tier_name: "Standard" as const,
      title: `${product.name} Standard`,
      price: product.price,
      fulfillment_type: "digital_download" as const,
      includes: baseIncludes,
      comparison_points: ["Template package", "Setup guide", "Self-serve launch"],
      recommended: true,
    },
    {
      slug: "premium",
      tier_name: "Premium" as const,
      title: `${product.name} Premium`,
      price: "Contact for pricing",
      fulfillment_type: "hybrid_support" as const,
      includes: [...baseIncludes, "Priority support", "Implementation consultation"],
      comparison_points: ["Everything in Standard", "Priority support", "Implementation review"],
    },
    {
      slug: "done-for-you",
      tier_name: "Done-For-You" as const,
      title: `${product.name} Done-For-You`,
      price: "Discovery-based",
      fulfillment_type: "done_for_you_service" as const,
      includes: ["Everything in Premium", "Full setup by Growrix", "Launch QA + handoff"],
      comparison_points: ["Everything in Premium", "Full setup by Growrix", "Launch QA + support"],
    },
  ];
}

function variantIncludesPoint(
  variant: NonNullable<PublicShopProductRecord["variants"]>[number],
  point: string,
) {
  const normalizedPoint = point.trim().toLowerCase();
  const points = [...(variant.comparison_points ?? []), ...variant.includes];
  return points.some((entry) => entry.trim().toLowerCase() === normalizedPoint);
}

type ProductVariant = NonNullable<PublicShopProductRecord["variants"]>[number];

type HtmlProfileTierPreset = {
  label: string;
  title: string;
  description: string;
  includesHeading: string;
  includes: string[];
  notIncluded: string[];
  cta: string;
  helper: string;
  isOutcomeFocused?: boolean;
};

type WebsiteTemplateTierPreset = {
  label: string;
  price: string;
  description: string;
  includesHeading: string;
  includes: string[];
  notIncluded: string[];
  bestFor?: string;
  optionalAddOns?: string[];
  cta: string;
  helper: string;
};

const HTML_PROFILE_TIER_PRESETS: Record<string, HtmlProfileTierPreset> = {
  standard: {
    label: "Template Only",
    title: "For developers, designers, and DIY users who want a ready-made HTML business profile they can edit themselves.",
    description: "",
    includesHeading: "Includes",
    includes: [
      "1-page HTML business profile template",
      "Responsive layout",
      "Clean HTML, CSS & JavaScript",
      "Launch-ready content structure",
      "Basic SEO meta setup",
      "Commercial use license",
      "Instant download",
    ],
    notIncluded: [
      "Branding implementation",
      "Content customization",
      "Deployment",
      "Form integration",
    ],
    cta: "Download Template",
    helper: "Best for users comfortable editing HTML themselves.",
  },
  premium: {
    label: "Branded Template",
    title: "For businesses that like the template and want it personalized with their own brand, colors, and business information.",
    description: "",
    includesHeading: "Includes Everything in Standard Plus",
    includes: [
      "Logo replacement",
      "Business information update",
      "Brand color customization",
      "Contact details setup",
      "Contact form section UI",
      "Up to 5 additional content sections",
      "Priority email support",
    ],
    notIncluded: [
      "Backend integrations",
      "Hosting setup",
      "Website deployment",
    ],
    cta: "Customize This Template",
    helper: "Ideal when you want a professional branded version without a full custom build.",
  },
  "done-for-you": {
    label: "Business Launch",
    title: "For business owners who want a complete business profile planned, customized, and prepared for launch.",
    description:
      "We transform this template into a complete business profile for your brand, organize your content, integrate forms, and prepare everything for launch.",
    includesHeading: "Includes Everything in Premium Plus",
    includes: [
      "Business profile planning",
      "Content organization",
      "Complete branding implementation",
      "Contact form integration",
      "Image support and optimization",
      "Mobile optimization review",
      "Deployment assistance",
      "Revision rounds",
      "Launch-ready delivery",
    ],
    notIncluded: [],
    cta: "Request a Launch Quote",
    helper: "We'll customize, prepare, and launch the profile for your business.",
    isOutcomeFocused: true,
  },
};

const WEBSITE_TEMPLATE_TIER_PRESETS: Record<string, WebsiteTemplateTierPreset> = {
  standard: {
    label: "Template Only",
    price: "$149",
    description:
      "Download the complete website template and customize it on your own. Perfect for developers, agencies, and businesses with internal technical resources.",
    includesHeading: "Includes",
    includes: [
      "Complete website template",
      "Homepage and inner pages",
      "Responsive design",
      "Built-in components and sections",
      "Documentation",
      "Commercial usage",
      "Instant download",
    ],
    notIncluded: [
      "Branding implementation",
      "Content population",
      "Integrations setup",
      "Deployment",
      "Support services",
    ],
    cta: "Get Template Access",
    helper: "Best for teams that prefer managing everything themselves.",
  },
  premium: {
    label: "Done-For-You Setup",
    price: "$499",
    description:
      "We'll transform the template into your business website, configure available integrations, and deploy it for launch. This is the fastest and most cost-effective way to get a professional website online.",
    includesHeading: "Includes Everything in Template Only Plus",
    includes: [
      "Complete brand implementation",
      "Logo and color customization",
      "Business content population",
      "Service pages customization",
      "Contact information setup",
      "WhatsApp integration",
      "Contact form setup",
      "Authentication setup (if included)",
      "Chat integration (if included)",
      "Built-in feature configuration",
      "Mobile optimization review",
      "Website deployment",
      "Launch-ready handoff",
      "Revision rounds",
    ],
    notIncluded: [],
    bestFor: "Businesses that want a professional website without the cost and timeline of a custom build.",
    cta: "Customize & Launch My Website",
    helper: "Most popular. Get a fully branded and deployed website without building from scratch.",
  },
  "done-for-you": {
    label: "Business Launch",
    price: "Custom Pricing",
    description:
      "A fully tailored website engagement designed around your business goals, structure, and growth plans. Instead of adapting your business to a template, we design the website experience around your business.",
    includesHeading: "Includes Everything in Done-For-You Setup Plus",
    includes: [
      "Discovery and planning workshops",
      "Website strategy",
      "Custom information architecture",
      "Unlimited pages",
      "Custom content structure",
      "Advanced integrations",
      "Custom functionality planning",
      "SEO foundation setup",
      "Analytics setup",
      "Ongoing implementation support",
      "Priority communication",
      "12 months maintenance support",
      "Long-term growth partnership",
    ],
    notIncluded: [],
    bestFor:
      "Growing businesses that need more than a website and want a strategic digital presence built around their goals.",
    optionalAddOns: [
      "Booking system",
      "CRM integrations",
      "WhatsApp integration",
      "Additional pages",
      "Ongoing maintenance",
      "Custom functionality",
    ],
    cta: "Book Discovery Call",
    helper: "Ideal for businesses that want a fully tailored website and a long-term implementation partner.",
  },
};

function getHtmlProfileTierLabel(variant: ProductVariant) {
  return HTML_PROFILE_TIER_PRESETS[variant.slug]?.label ?? variant.title;
}

function getWebsiteTemplateTierLabel(variant: ProductVariant) {
  return WEBSITE_TEMPLATE_TIER_PRESETS[variant.slug]?.label ?? variant.title;
}

const HTML_PROFILE_COMPARISON_ROWS = [
  { capability: "Template files", standard: true, premium: true, doneForYou: true },
  { capability: "Responsive design", standard: true, premium: true, doneForYou: true },
  { capability: "Documentation", standard: true, premium: true, doneForYou: true },
  { capability: "Business information setup", standard: false, premium: true, doneForYou: true },
  { capability: "Logo implementation", standard: false, premium: true, doneForYou: true },
  { capability: "Color customization", standard: false, premium: true, doneForYou: true },
  { capability: "Additional sections", standard: false, premium: true, doneForYou: true },
  { capability: "Contact form UI", standard: false, premium: true, doneForYou: true },
  { capability: "Contact form integration", standard: false, premium: false, doneForYou: true },
  { capability: "Deployment assistance", standard: false, premium: false, doneForYou: true },
  { capability: "Launch support", standard: false, premium: false, doneForYou: true },
] as const;

const WEBSITE_TEMPLATE_COMPARISON_ROWS = [
  { capability: "Complete website template", templateOnly: true, configuredTemplate: true, businessLaunch: true },
  { capability: "Homepage and inner pages", templateOnly: true, configuredTemplate: true, businessLaunch: true },
  { capability: "Responsive design", templateOnly: true, configuredTemplate: true, businessLaunch: true },
  { capability: "Service pages", templateOnly: true, configuredTemplate: true, businessLaunch: true },
  { capability: "Built-in components and sections", templateOnly: true, configuredTemplate: true, businessLaunch: true },
  { capability: "Documentation", templateOnly: true, configuredTemplate: true, businessLaunch: true },
  { capability: "Logo implementation", templateOnly: false, configuredTemplate: true, businessLaunch: true },
  { capability: "Brand color customization", templateOnly: false, configuredTemplate: true, businessLaunch: true },
  { capability: "Business content population", templateOnly: false, configuredTemplate: true, businessLaunch: true },
  { capability: "Service content population", templateOnly: false, configuredTemplate: true, businessLaunch: true },
  { capability: "Contact form + WhatsApp setup", templateOnly: false, configuredTemplate: true, businessLaunch: true },
  { capability: "Deployment", templateOnly: false, configuredTemplate: true, businessLaunch: true },
  { capability: "Custom information architecture", templateOnly: false, configuredTemplate: false, businessLaunch: true },
  { capability: "Unlimited pages", templateOnly: false, configuredTemplate: false, businessLaunch: true },
  { capability: "Analytics setup", templateOnly: false, configuredTemplate: false, businessLaunch: true },
  { capability: "SEO foundation setup", templateOnly: false, configuredTemplate: false, businessLaunch: true },
  { capability: "Long-term growth partnership", templateOnly: false, configuredTemplate: false, businessLaunch: true },
] as const;

const HTML_PROFILE_FAQ_FALLBACK = [
  {
    question: "What do I receive after purchase?",
    answer:
      "You receive your selected package details right after checkout, including files or the next onboarding steps for customization and launch support.",
  },
  {
    question: "Can I use this template for client projects?",
    answer:
      "Yes. The template license supports commercial work, including client delivery, as long as usage follows the provided license terms.",
  },
  {
    question: "Can you customize it for my business?",
    answer:
      "Yes. Choose Branded Template for focused personalization, or Business Launch if you want complete setup and launch preparation handled for you.",
  },
  {
    question: "Do you provide deployment?",
    answer:
      "Deployment support is included in the Business Launch path. We can also scope deployment add-ons for other packages if needed.",
  },
  {
    question: "Can this become a full website later?",
    answer:
      "Absolutely. This profile can be the foundation for a larger website with additional pages, lead systems, and growth features.",
  },
  {
    question: "How long does customization take?",
    answer:
      "Timelines depend on scope and content readiness. Branded Template work is typically fast, while Business Launch includes deeper planning and rollout steps.",
  },
];

type FaqItem = {
  question: string;
  answer: string;
};

function ProductFaqSection({ items, title }: { items: FaqItem[]; title: string }) {
  return (
    <Section tone="inset">
      <Container width="reading">
        <SectionHeading eyebrow="FAQ" title={title} align="center" />
        <div className="mt-10">
          <Accordion items={items} />
        </div>
      </Container>
    </Section>
  );
}

export default async function ShopPreviewPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getPublicShopProduct(slug).catch(() => null);

  if (!product) notFound();

  const allProducts = await listPublicShopProducts();
  const isWebsiteTemplatesHtmlPreview = product.categorySlug === WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG;
  const explicitRelated = (product.related_product_slugs ?? [])
    .map((relatedSlug) => allProducts.find((item) => item.slug === relatedSlug))
    .filter((item): item is (typeof allProducts)[number] => item !== undefined)
    .filter((item) => item.slug !== product.slug);
  const related = isWebsiteTemplatesHtmlPreview
    ? allProducts
      .filter((item) => item.categorySlug === WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG && item.slug !== product.slug)
      .slice(0, 3)
    : (explicitRelated.length > 0
      ? explicitRelated
      : allProducts.filter((item) => item.slug !== product.slug)).slice(0, 3);

  const serviceMap = new Map<string, (typeof SERVICES)[number]>(SERVICES.map((service) => [service.slug, service]));
  const relatedServices = (product.related_service_slugs ?? [])
    .map((serviceSlug) => serviceMap.get(serviceSlug))
    .filter((service): service is (typeof SERVICES)[number] => service !== undefined);
  const displayRelatedServices = relatedServices.length > 0
    ? relatedServices
    : SERVICES.filter((service) => service.slug === "websites" || service.slug === "saas-applications");

  const features = product.features ?? [];
  const variants = product.variants && product.variants.length > 0 ? product.variants : getFallbackVariants(product);
  const recommendedVariant = variants.find((variant) => variant.recommended) ?? variants[0];
  const variantComparisonPoints = Array.from(
    new Set(variants.flatMap((variant) => [...(variant.comparison_points ?? []), ...variant.includes]))
  ).slice(0, 8);
  const faqs = product.faqs && product.faqs.length > 0
    ? product.faqs
    : [
        {
          question: "What happens after purchase?",
          answer: "You get immediate access to your package details and next-step instructions in checkout and follow-up email.",
        },
        {
          question: "Can this be customized for my business?",
          answer:
            "Yes. Choose the Done-For-You path or request a custom scope and we will tailor content, structure, and integrations to your offer.",
        },
        {
          question: "Do you support setup after delivery?",
          answer:
            "Standard includes documentation. Premium and Done-For-You tiers include guided or full-service implementation support.",
        },
      ];
  const doneForYouVariant = variants.find((variant) => variant.tier_name === "Done-For-You");
  const customizationUpsells = product.customization_upsells && product.customization_upsells.length > 0
    ? product.customization_upsells
    : doneForYouVariant
      ? [
          {
            title: "Need a Done-For-You rollout?",
            description: "Let the Growrix team configure, launch, and quality-check this product for your business model.",
            cta_label: "Request Done-For-You Scope",
            cta_href: `/contact?intent=done-for-you&product=${encodeURIComponent(product.slug)}`,
          },
        ]
      : [];
  const shouldUseEmbeddedPreview = product.categorySlug === "html-business-profiles" && Boolean(product.embeddedPreviewUrl);
  const hasExternalPreview = Boolean(product.livePreviewUrl || product.embeddedPreviewUrl);
  const previewHref = shouldUseEmbeddedPreview
    ? product.embeddedPreviewUrl ?? product.livePreviewUrl ?? `${getProductHref(product)}#preview`
    : product.livePreviewUrl ?? product.embeddedPreviewUrl ?? `${getProductHref(product)}#preview`;
  const galleryImages = (product.gallery?.length ?? 0) > 0
    ? product.gallery ?? []
    : product.image
      ? [product.image]
      : [];
  const basePriceLabel = variants[0]?.price ?? product.price;
  const isHtmlBusinessProfile = product.categorySlug === "html-business-profiles";
  const isWebsiteTemplatesCategory = product.categorySlug === "website-templates";
  const isWebsiteTemplateProduct =
    isWebsiteTemplatesCategory ||
    product.categorySlug === "saas-templates" ||
    product.categorySlug === "ready-websites";
  const websiteTemplateStandardVariant = variants.find((variant) => variant.slug === "standard") ?? variants[0];
  const websiteTemplatePremiumVariant = variants.find((variant) => variant.slug === "premium") ?? variants[1] ?? variants[0];
  const websiteTemplateLaunchVariant = variants.find((variant) => variant.slug === "done-for-you") ?? variants[2] ?? variants[0];
  const websiteTemplatePathVariants = isWebsiteTemplateProduct
    ? [websiteTemplateStandardVariant, websiteTemplatePremiumVariant, websiteTemplateLaunchVariant]
    : variants;
  const sidebarBasePriceLabel = isWebsiteTemplateProduct
    ? WEBSITE_TEMPLATE_TIER_PRESETS.standard.price
    : basePriceLabel;
  const sidebarPrimaryVariant = isWebsiteTemplateProduct ? websiteTemplateStandardVariant : recommendedVariant;
  const useCases = product.features && product.features.length > 0
    ? product.features.slice(0, 4)
    : [
      `Teams in ${product.industry} launching quickly`,
      "Buyers who want a production-ready baseline",
      "Founders choosing between DIY and Done-For-You paths",
    ];

  const productCanonicalUrl = absoluteUrl(`/digital-products/${product.slug}`);
  const productPriceMatch = /([0-9][0-9,]*(?:\.[0-9]+)?)/.exec(product.price ?? "");
  const productPriceValue = productPriceMatch ? productPriceMatch[1].replace(/,/g, "") : undefined;
  const productJsonLd: JsonLdData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary ?? product.teaser ?? undefined,
    url: productCanonicalUrl,
    category: product.category,
    ...(product.image?.src ? { image: absoluteUrl(product.image.src) } : {}),
    brand: { "@type": "Brand", name: "Growrix OS" },
    ...(productPriceValue
      ? {
          offers: {
            "@type": "Offer",
            price: productPriceValue,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: productCanonicalUrl,
          },
        }
      : {}),
  };
  const faqJsonLd: JsonLdData | null = faqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;
  const productStructuredData: JsonLdData[] = faqJsonLd ? [productJsonLd, faqJsonLd] : [productJsonLd];

  if (isHtmlBusinessProfile) {
    const standardVariant = variants.find((variant) => variant.slug === "standard") ?? variants[0];
    const premiumVariant = variants.find((variant) => variant.slug === "premium") ?? variants[1] ?? variants[0];
    const doneForYouVariantForPath = variants.find((variant) => variant.slug === "done-for-you") ?? variants[2] ?? variants[0];
    const htmlPathVariants = [standardVariant, premiumVariant, doneForYouVariantForPath];
    const htmlFaqs = product.faqs && product.faqs.length > 0 ? product.faqs : HTML_PROFILE_FAQ_FALLBACK;

    return (
      <>
        <JsonLd data={productStructuredData} />
        <Section className="pb-10 pt-6 sm:pb-14 sm:pt-8">
          <Container>
            <Link href="/digital-products" className="mb-6 inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-primary">
              <ArrowLeftIcon className="size-4" /> Back to digital products
            </Link>

            <div className="grid min-w-0 gap-10 lg:grid-cols-[1fr_360px] lg:items-start xl:grid-cols-[1fr_380px]">
              <div className="min-w-0 space-y-6">
                <div className="lg:hidden">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                    {product.category} &middot; {product.type}
                  </p>
                  <ShopProductHeroTitle name={product.name} variant="mobile" />
                </div>

                <div id="preview" className="min-w-0 w-full">
                  {product.embeddedPreviewUrl ? (
                    <Card className="overflow-hidden p-0">
                      <div className="border-b border-border px-5 py-4 sm:px-6">
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">
                          Live mobile profile preview
                        </p>
                      </div>
                      <div className="flex min-h-[320px] w-full items-center justify-center bg-[#0a0a0a] px-4 py-6 sm:min-h-[420px] sm:px-6 sm:py-8">
                        <WebsiteTemplateHtmlMobilePreviewFrame
                          previewUrl={product.embeddedPreviewUrl}
                          title={`${product.name} mobile preview`}
                          maxFrameHeight={480}
                          showViewportLabel={false}
                          className="w-[410px] max-w-full shrink-0"
                        />
                      </div>
                    </Card>
                  ) : product.image ? (
                    <PreviewableImageFrame
                      src={product.image.src}
                      alt={product.image.alt}
                      sizes="(min-width: 1280px) 70vw, (min-width: 1024px) 60vw, 100vw"
                    />
                  ) : (
                    <ProductPreviewSurface variant={product.previewVariant} />
                  )}
                </div>

                {/* Mobile buy box — visible on small screens, right below preview */}
                <div className="lg:hidden rounded-2xl border border-border bg-surface p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">Starting from</p>
                      <p className="mt-1 font-display text-2xl font-bold tracking-tight">{standardVariant.price}</p>
                    </div>
                    <span className="rounded-full border border-border bg-inset/40 px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted">
                      {product.type}
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <LinkButton
                      href={getCheckoutHref(product, {
                        variantSlug: standardVariant.slug,
                        tierName: standardVariant.tier_name,
                        fulfillmentType: standardVariant.fulfillment_type,
                      })}
                      size="sm"
                      fullWidth
                    >
                      Download Template
                    </LinkButton>
                    <LinkButton
                      href={previewHref}
                      variant="outline"
                      size="sm"
                      fullWidth
                      target={hasExternalPreview ? "_blank" : undefined}
                      rel={hasExternalPreview ? "noreferrer" : undefined}
                    >
                      {WEBSITE_TEMPLATE_PREVIEW.previewCta}
                    </LinkButton>
                    <AddToCartButton
                      productSlug={product.slug}
                      productName={product.name}
                      productPrice={standardVariant.price}
                      variantSlug={standardVariant.slug}
                      tierName={standardVariant.tier_name}
                      fulfillmentType={standardVariant.fulfillment_type}
                      size="sm"
                      variant="outline"
                      fullWidth
                      className="col-span-2"
                    />
                  </div>
                </div>

                <HtmlBusinessProfileProductPreviewHighlights />

                <div>
                  <h2 className="font-display text-xl font-semibold tracking-tight">Profile overview</h2>
                  <p className="mt-3 text-sm leading-7 text-text-muted">{product.summary}</p>
                  <p className="mt-3 text-sm leading-7 text-text-muted">
                    This product gives you a professional business profile foundation you can launch quickly, brand
                    confidently, and upgrade as your business grows.
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-xl font-semibold tracking-tight">Who this is for</h2>
                  <p className="mt-2 text-sm leading-6 text-text-muted">{product.audience}</p>
                  <ul className="mt-3 space-y-2">
                    {useCases.slice(0, 3).map((item, index) => (
                      <li key={`${item}-${index}`} className="flex items-start gap-2.5 text-sm leading-6 text-text-muted">
                        <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="font-display text-xl font-semibold tracking-tight">What&apos;s included</h2>
                  <ul className="mt-3 space-y-2">
                    {product.includes.slice(0, 3).map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-text-muted">
                        <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {product.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border bg-inset/40 px-3 py-1 text-xs text-text-muted"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {galleryImages.length > 0 ? (
                  <div>
                    <h2 className="font-display text-xl font-semibold tracking-tight">Screenshots</h2>
                    <div className="mt-4">
                      <PortfolioGalleryLightbox images={galleryImages} />
                    </div>
                  </div>
                ) : null}
              </div>

              <aside className="min-w-0 space-y-4 lg:sticky lg:top-24">
                <div className="hidden lg:block">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                    {product.category} &middot; {product.type}
                  </p>
                  <ShopProductHeroTitle name={product.name} variant="sidebar" />
                  <p className="mt-3 text-sm leading-6 text-text-muted">{product.summary}</p>
                </div>

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">Starting from</p>
                  <p className="mt-1 font-display text-4xl font-bold tracking-tight">{standardVariant.price}</p>
                </div>

                <div className="flex flex-col gap-3">
                  <LinkButton
                    href={getCheckoutHref(product, {
                      variantSlug: standardVariant.slug,
                      tierName: standardVariant.tier_name,
                      fulfillmentType: standardVariant.fulfillment_type,
                    })}
                    size="lg"
                    fullWidth
                  >
                    <ShoppingBagIcon className="size-5" /> Download Template
                  </LinkButton>
                  <LinkButton
                    href={previewHref}
                    variant="outline"
                    size="lg"
                    fullWidth
                    target={hasExternalPreview ? "_blank" : undefined}
                    rel={hasExternalPreview ? "noreferrer" : undefined}
                  >
                    {WEBSITE_TEMPLATE_PREVIEW.previewCta} <ArrowUpRightIcon className="size-4" />
                  </LinkButton>
                  <AddToCartButton
                    productSlug={product.slug}
                    productName={product.name}
                    productPrice={standardVariant.price}
                    variantSlug={standardVariant.slug}
                    tierName={standardVariant.tier_name}
                    fulfillmentType={standardVariant.fulfillment_type}
                    size="lg"
                    variant="outline"
                    fullWidth
                  />
                </div>

                <div className="rounded-2xl border border-border bg-inset/40 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">Quick tier summary</p>
                  <div className="mt-3 space-y-2">
                    {htmlPathVariants.map((variant) => (
                      <Link
                        key={variant.slug}
                        href={variant.slug === "done-for-you"
                          ? `/contact?intent=done-for-you&product=${encodeURIComponent(product.slug)}`
                          : getCheckoutHref(product, {
                              variantSlug: variant.slug,
                              tierName: variant.tier_name,
                              fulfillmentType: variant.fulfillment_type,
                            })}
                        className="flex items-center justify-between rounded-xl border border-border px-3 py-2 text-sm hover:border-primary/60 hover:bg-primary/5"
                      >
                        <span>{getHtmlProfileTierLabel(variant)}</span>
                        <span className="font-medium text-text-muted">{variant.price}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <hr className="border-border" />

                <dl className="space-y-2 text-sm">
                  {[
                    { label: "Category", value: product.category },
                    { label: "Type", value: product.type },
                    { label: "Industry", value: product.industry },
                  ].map((row) => (
                    <div key={row.label} className="flex min-w-0 items-start justify-between gap-4">
                      <dt className="shrink-0 font-medium text-text-muted">{row.label}</dt>
                      <dd className="min-w-0 flex-1 wrap-anywhere text-right text-text">{row.value}</dd>
                    </div>
                  ))}
                </dl>

                <hr className="border-border" />

                <div className="rounded-2xl border border-border bg-inset/40 p-4 text-sm leading-6 text-text-muted">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">Ideal for</p>
                  <p className="mt-2">{product.audience}</p>
                </div>

                <div className="text-center">
                  <LinkButton
                    href="/book-appointment"
                    variant="ghost"
                    size="sm"
                    fullWidth
                    className="h-auto whitespace-normal px-4 py-2.5 leading-5"
                  >
                    Need flexible payment or a custom fit? Talk to us first
                  </LinkButton>
                </div>
              </aside>
            </div>
          </Container>
        </Section>

        {product.embeddedPreviewUrl ? (
          <Section className="border-t border-border py-10 sm:py-12">
            <Container>
              <WebsiteTemplateHtmlMobilePreviewSection
                previewUrl={product.embeddedPreviewUrl}
                templateTitle={product.name}
                previewOnRight
                marketingVariant="business-profile"
              />
            </Container>
          </Section>
        ) : null}

        <Section tone="inset" className="py-10 sm:py-12">
          <Container>
            <div className="space-y-10">
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight">At a glance</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {product.highlights.map((highlight) => (
                    <div key={highlight.label} className="rounded-2xl border border-border bg-surface px-4 py-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">{highlight.label}</p>
                      <p className="mt-2 font-display text-lg font-semibold tracking-tight">{highlight.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {features.length > 0 ? (
                <div>
                  <h2 className="font-display text-2xl font-semibold tracking-tight">Key features</h2>
                  <ul className="mt-4 space-y-2">
                    {features.map((item, index) => (
                      <li key={`${item}-${index}`} className="flex items-start gap-3 text-sm leading-6 text-text-muted">
                        <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight">Stack</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section className="border-t border-border py-10 sm:py-12">
          <Container>
            <div className="space-y-8">
              <div className="max-w-4xl">
                <h2 className="font-display text-2xl font-semibold tracking-tight">Choose Your Plan</h2>
                <p className="mt-2 text-base leading-7 text-text-muted">
                  Whether you want a ready-made template, a branded version, or a complete business profile setup, choose the option that matches your goals and technical comfort level.
                </p>
                <p className="mt-2 text-base leading-7 text-text-muted">
                  Every HTML Business Profile is available in three delivery options: Standard for DIY users who want the template files, Premium for businesses that need branding applied to the template, and Done-For-You for owners who want a complete profile prepared and launched.
                </p>
              </div>

              <div className="grid gap-5 lg:grid-cols-3">
                {htmlPathVariants.map((variant) => {
                  const preset = HTML_PROFILE_TIER_PRESETS[variant.slug];
                  const isMostPopular = variant.slug === "premium";
                  const isFeaturedCard = isMostPopular;
                  const variantHref = variant.slug === "done-for-you"
                    ? `/contact?intent=done-for-you&product=${encodeURIComponent(product.slug)}`
                    : getCheckoutHref(product, {
                        variantSlug: variant.slug,
                        tierName: variant.tier_name,
                        fulfillmentType: variant.fulfillment_type,
                      });

                  return (
                    <article
                      key={variant.slug}
                      className={getTierCardContainerClass(isFeaturedCard)}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className={`font-mono text-[10px] uppercase tracking-[0.18em] ${getTierCardMutedTextClass(isFeaturedCard)}`}>{variant.tier_name}</p>
                        {isMostPopular ? (
                          <span className={getTierCardBadgeClass(isFeaturedCard)}>
                            Most Popular
                          </span>
                        ) : null}
                      </div>
                      <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">{preset?.label ?? variant.title}</h3>
                      <p className="mt-2 font-display text-3xl font-bold tracking-tight">{variant.price}</p>
                      {preset?.title ? <p className={`mt-3 text-sm leading-6 ${getTierCardMutedTextClass(isFeaturedCard)}`}>{preset.title}</p> : null}
                      {preset?.description ? <p className={`mt-3 text-sm leading-6 ${getTierCardMutedTextClass(isFeaturedCard)}`}>{preset.description}</p> : null}

                      <p className={`mt-4 text-xs font-semibold uppercase tracking-[0.15em] ${getTierCardMutedTextClass(isFeaturedCard)}`}>
                        {preset?.includesHeading ?? "Includes"}
                      </p>
                      <ul className="mt-3 space-y-2">
                        {(preset?.includes ?? variant.includes).map((item) => (
                          <li key={item} className={`flex items-start gap-2 text-sm leading-6 ${getTierCardMutedTextClass(isFeaturedCard)}`}>
                            <CheckIcon className={`mt-1 size-4 shrink-0 ${getTierCardCheckClass()}`} />
                            {item}
                          </li>
                        ))}
                      </ul>

                      {(preset?.notIncluded?.length ?? 0) > 0 ? (
                        <>
                          <p className={`mt-4 text-xs font-semibold uppercase tracking-[0.15em] ${getTierCardMutedTextClass(isFeaturedCard)}`}>Not Included</p>
                          <ul className="mt-2 space-y-2">
                            {preset?.notIncluded.map((item) => (
                              <li key={item} className={`flex items-start gap-2 text-sm leading-6 ${getTierCardMutedTextClass(isFeaturedCard)}`}>
                                <span className={`mt-[6px] inline-flex h-4 w-4 items-center justify-center text-xs leading-none ${getTierCardMutedTextClass(isFeaturedCard)}`}>✗</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : null}

                      {preset?.isOutcomeFocused ? (
                        <p className="mt-3 text-sm font-medium leading-6 text-text">
                          Get a professional business profile online without touching code.
                        </p>
                      ) : null}

                      <div className="mt-auto pt-5">
                        <LinkButton href={variantHref} variant={isFeaturedCard ? "primary" : "outline"} size="sm" fullWidth>
                          {preset?.cta ?? `Continue with ${variant.tier_name}`}
                        </LinkButton>
                      </div>

                      {preset?.helper ? <p className={`mt-2 min-h-10 text-xs leading-5 ${getTierCardMutedTextClass(isFeaturedCard)}`}>{preset.helper}</p> : null}
                    </article>
                  );
                })}
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight">What&apos;s Included</h2>
                <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
                  <table className="min-w-full divide-y divide-border text-left text-sm">
                    <thead className="bg-inset/50 text-text-muted">
                      <tr>
                        <th className="px-4 py-3 font-medium">Capability</th>
                        <th className="px-4 py-3 font-medium">Template Only</th>
                        <th className="px-4 py-3 font-medium">Branded Template</th>
                        <th className="px-4 py-3 font-medium">Business Launch</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {HTML_PROFILE_COMPARISON_ROWS.map((row) => (
                        <tr key={row.capability}>
                          <td className="px-4 py-3 text-text">{row.capability}</td>
                          <td className="px-4 py-3 text-text-muted">{row.standard ? "Included" : "-"}</td>
                          <td className="px-4 py-3 text-text-muted">{row.premium ? "Included" : "-"}</td>
                          <td className="px-4 py-3 text-text-muted">{row.doneForYou ? "Included" : "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-inset/40 p-6">
                <h2 className="font-display text-2xl font-semibold tracking-tight">Need More Than A Template?</h2>
                <p className="mt-3 text-base leading-7 text-text-muted">
                  This business profile can serve as the starting point for a larger digital presence.
                </p>
                <p className="mt-3 text-sm font-medium text-text">Possible next steps:</p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {[
                    "Multi-page business website",
                    "Appointment booking system",
                    "Lead generation setup",
                    "SEO implementation",
                    "Business dashboard",
                    "SaaS application",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-6 text-text-muted">
                      <CheckIcon className="mt-1 size-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-3">
                  <LinkButton href={`/contact?intent=customize_template&product=${encodeURIComponent(product.slug)}`}>
                    Discuss Your Next Phase <ArrowUpRightIcon className="size-4" />
                  </LinkButton>
                  <LinkButton href="/book-appointment" variant="outline">
                    Book Consultation
                  </LinkButton>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {htmlFaqs.length > 0 ? <ProductFaqSection items={htmlFaqs} title="Product FAQ" /> : null}

        {related.length > 0 ? (
          <Section className="border-t border-border py-12 sm:py-16">
            <Container>
              <h2 className="font-display text-2xl font-bold tracking-tight">More in the catalog</h2>
              <p className="mt-2 text-sm text-text-muted">
                Browse more published products from the live catalog.
              </p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <ShopProductCatalogCard key={item.slug} product={item} />
                ))}
              </div>
            </Container>
          </Section>
        ) : null}

        <div className="h-20 lg:hidden" aria-hidden />

        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 p-3 backdrop-blur lg:hidden">
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-2">
            <LinkButton
              href={getCheckoutHref(product, {
                variantSlug: standardVariant.slug,
                tierName: standardVariant.tier_name,
                fulfillmentType: standardVariant.fulfillment_type,
              })}
              size="sm"
              fullWidth
            >
              Download Template
            </LinkButton>
            <LinkButton
              href={`/contact?intent=done-for-you&product=${encodeURIComponent(product.slug)}`}
              variant="outline"
              size="sm"
              fullWidth
            >
              Launch Quote
            </LinkButton>
          </div>
        </div>
      </>
    );
  }

  if (isWebsiteTemplatesHtmlPreview) {
    const standardVariant = variants.find((variant) => variant.slug === "standard") ?? variants[0];
    const premiumVariant = variants.find((variant) => variant.slug === "premium") ?? variants[1] ?? variants[0];
    const launchVariant = variants.find((variant) => variant.slug === "done-for-you") ?? variants[2] ?? variants[0];
    const htmlPreviewPathVariants = [standardVariant, premiumVariant, launchVariant];

    return (
      <>
        <JsonLd data={productStructuredData} />
        <Section className="pb-10 pt-6 sm:pb-14 sm:pt-8">
          <Container>
            <Link href="/digital-products" className="mb-6 inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-primary">
              <ArrowLeftIcon className="size-4" /> Back to digital products
            </Link>

            <div className="grid min-w-0 gap-10 lg:grid-cols-[1fr_360px] lg:items-start xl:grid-cols-[1fr_380px]">
              <div className="min-w-0 space-y-6">
                <div className="lg:hidden">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                    {product.category} &middot; {product.type}
                  </p>
                  <ShopProductHeroTitle name={product.name} variant="mobile" />
                </div>

                <div id="preview" className="min-w-0 overflow-hidden rounded-2xl border border-border">
                  {product.embeddedPreviewUrl ? (
                    <WebsiteTemplateHtmlDesktopPreviewFrame
                      previewUrl={product.embeddedPreviewUrl}
                      title={`${product.name} desktop preview`}
                      fit="width"
                      frameClassName="rounded-2xl"
                    />
                  ) : (
                    <ProductPreviewSurface variant={product.previewVariant} />
                  )}
                </div>

                {/* Mobile buy box — visible on small screens, right below preview */}
                <div className="lg:hidden rounded-2xl border border-border bg-surface p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">Starting from</p>
                      <p className="mt-1 font-display text-2xl font-bold tracking-tight">
                        {WEBSITE_TEMPLATE_TIER_PRESETS.standard.price}
                      </p>
                    </div>
                    <span className="rounded-full border border-border bg-inset/40 px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted">
                      {product.type}
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <LinkButton
                      href={getCheckoutHref(product, {
                        variantSlug: standardVariant.slug,
                        tierName: standardVariant.tier_name,
                        fulfillmentType: standardVariant.fulfillment_type,
                      })}
                      size="sm"
                      fullWidth
                    >
                      Get Template Access
                    </LinkButton>
                    <LinkButton
                      href={previewHref}
                      variant="outline"
                      size="sm"
                      fullWidth
                      target={hasExternalPreview ? "_blank" : undefined}
                      rel={hasExternalPreview ? "noreferrer" : undefined}
                    >
                      {WEBSITE_TEMPLATE_PREVIEW.previewCta}
                    </LinkButton>
                    <AddToCartButton
                      productSlug={product.slug}
                      productName={product.name}
                      productPrice={WEBSITE_TEMPLATE_TIER_PRESETS.standard.price}
                      variantSlug={standardVariant.slug}
                      tierName={standardVariant.tier_name}
                      fulfillmentType={standardVariant.fulfillment_type}
                      size="sm"
                      variant="outline"
                      fullWidth
                      className="col-span-2"
                    />
                  </div>
                </div>

                <WebsiteTemplateHtmlProductPreviewHighlights />

                <div>
                  <h2 className="font-display text-xl font-semibold tracking-tight">Template overview</h2>
                  <p className="mt-3 text-sm leading-7 text-text-muted">{product.summary}</p>
                </div>

                <div>
                  <h2 className="font-display text-xl font-semibold tracking-tight">Who this is for</h2>
                  <p className="mt-2 text-sm leading-6 text-text-muted">{product.audience}</p>
                  <ul className="mt-3 space-y-2">
                    {useCases.slice(0, 3).map((item, index) => (
                      <li key={`${item}-${index}`} className="flex items-start gap-2.5 text-sm leading-6 text-text-muted">
                        <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="font-display text-xl font-semibold tracking-tight">What&apos;s included</h2>
                  <ul className="mt-3 space-y-2">
                    {product.includes.slice(0, 3).map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-text-muted">
                        <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {product.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border bg-inset/40 px-3 py-1 text-xs text-text-muted"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <aside className="min-w-0 space-y-4 lg:sticky lg:top-24">
                <div className="hidden lg:block">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                    {product.category} &middot; {product.type}
                  </p>
                  <ShopProductHeroTitle name={product.name} variant="sidebar" />
                  <p className="mt-3 text-sm leading-6 text-text-muted">{product.summary}</p>
                </div>

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">Starting from</p>
                  <p className="mt-1 font-display text-4xl font-bold tracking-tight">
                    {WEBSITE_TEMPLATE_TIER_PRESETS.standard.price}
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <LinkButton
                    href={getCheckoutHref(product, {
                      variantSlug: standardVariant.slug,
                      tierName: standardVariant.tier_name,
                      fulfillmentType: standardVariant.fulfillment_type,
                    })}
                    size="lg"
                    fullWidth
                  >
                    <ShoppingBagIcon className="size-5" /> Get Template Access
                  </LinkButton>
                  <LinkButton
                    href={previewHref}
                    variant="outline"
                    size="lg"
                    fullWidth
                    target={hasExternalPreview ? "_blank" : undefined}
                    rel={hasExternalPreview ? "noreferrer" : undefined}
                  >
                    {WEBSITE_TEMPLATE_PREVIEW.previewCta} <ArrowUpRightIcon className="size-4" />
                  </LinkButton>
                </div>

                <div className="rounded-2xl border border-border bg-inset/40 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">Quick tier links</p>
                  <div className="mt-3 space-y-2">
                    {htmlPreviewPathVariants.map((variant) => (
                      <Link
                        key={variant.slug}
                        href={variant.slug === "done-for-you"
                          ? "/book-appointment"
                          : getCheckoutHref(product, {
                              variantSlug: variant.slug,
                              tierName: variant.tier_name,
                              fulfillmentType: variant.fulfillment_type,
                            })}
                        className="flex items-center justify-between rounded-xl border border-border px-3 py-2 text-sm hover:border-primary/60 hover:bg-primary/5"
                      >
                        <span>{getWebsiteTemplateTierLabel(variant)}</span>
                        <span className="font-medium text-text-muted">
                          {WEBSITE_TEMPLATE_TIER_PRESETS[variant.slug]?.price ?? variant.price}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                <hr className="border-border" />

                <dl className="space-y-2 text-sm">
                  {[
                    { label: "Category", value: product.category },
                    { label: "Type", value: product.type },
                    { label: "Industry", value: product.industry },
                  ].map((row) => (
                    <div key={row.label} className="flex min-w-0 items-start justify-between gap-4">
                      <dt className="shrink-0 font-medium text-text-muted">{row.label}</dt>
                      <dd className="min-w-0 flex-1 wrap-anywhere text-right text-text">{row.value}</dd>
                    </div>
                  ))}
                </dl>

                <hr className="border-border" />

                <div className="rounded-2xl border border-border bg-inset/40 p-4 text-sm leading-6 text-text-muted">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">Ideal for</p>
                  <p className="mt-2">{product.audience}</p>
                </div>

                <div className="text-center">
                  <LinkButton
                    href="/book-appointment"
                    variant="ghost"
                    size="sm"
                    fullWidth
                    className="h-auto whitespace-normal px-4 py-2.5 leading-5"
                  >
                    Need flexible payment or a custom fit? Talk to us first
                  </LinkButton>
                </div>
              </aside>
            </div>
          </Container>
        </Section>

        {product.embeddedPreviewUrl ? (
          <Section className="border-t border-border py-10 sm:py-12">
            <Container>
              <WebsiteTemplateHtmlMobilePreviewSection
                previewUrl={product.embeddedPreviewUrl}
                templateTitle={product.name}
                previewOnRight
              />
            </Container>
          </Section>
        ) : null}

        <Section tone="inset" className="py-10 sm:py-12">
          <Container>
            <div className="space-y-10">
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight">At a glance</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {product.highlights.map((highlight) => (
                    <div key={highlight.label} className="rounded-2xl border border-border bg-surface px-4 py-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">{highlight.label}</p>
                      <p className="mt-2 font-display text-lg font-semibold tracking-tight">{highlight.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {features.length > 0 ? (
                <div>
                  <h2 className="font-display text-2xl font-semibold tracking-tight">Key features</h2>
                  <ul className="mt-4 space-y-2">
                    {features.map((item, index) => (
                      <li key={`${item}-${index}`} className="flex items-start gap-3 text-sm leading-6 text-text-muted">
                        <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight">Stack</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section className="border-t border-border py-10 sm:py-12">
          <Container>
            <div className="space-y-8">
              <WebsiteTemplateChoosePathIntro />

              <div className="grid gap-5 lg:grid-cols-3">
                {htmlPreviewPathVariants.map((variant) => {
                  const preset = WEBSITE_TEMPLATE_TIER_PRESETS[variant.slug];
                  const isRecommended = variant.slug === "premium";
                  const isFeaturedCard = isRecommended;
                  const variantHref = variant.slug === "done-for-you"
                    ? "/book-appointment"
                    : getCheckoutHref(product, {
                        variantSlug: variant.slug,
                        tierName: variant.tier_name,
                        fulfillmentType: variant.fulfillment_type,
                      });

                  return (
                    <article key={variant.slug} className={getTierCardContainerClass(isFeaturedCard)}>
                      <div className="flex items-center justify-between gap-3">
                        <p className={`font-mono text-[10px] uppercase tracking-[0.18em] ${getTierCardMutedTextClass(isFeaturedCard)}`}>{variant.tier_name}</p>
                        {isRecommended ? (
                          <span className={getTierCardBadgeClass(isFeaturedCard)}>Recommended</span>
                        ) : null}
                      </div>
                      <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">{preset?.label ?? variant.title}</h3>
                      <p className="mt-2 font-display text-3xl font-bold tracking-tight">{preset?.price ?? variant.price}</p>
                      {preset?.description ? (
                        <p className={`mt-3 text-sm leading-6 ${getTierCardMutedTextClass(isFeaturedCard)}`}>{preset.description}</p>
                      ) : null}

                      <p className={`mt-4 text-xs font-semibold uppercase tracking-[0.15em] ${getTierCardMutedTextClass(isFeaturedCard)}`}>
                        {preset?.includesHeading ?? "Includes"}
                      </p>
                      <ul className="mt-3 space-y-2">
                        {(preset?.includes ?? variant.includes).map((item) => (
                          <li key={item} className={`flex items-start gap-2 text-sm leading-6 ${getTierCardMutedTextClass(isFeaturedCard)}`}>
                            <CheckIcon className={`mt-1 size-4 shrink-0 ${getTierCardCheckClass()}`} />
                            {item}
                          </li>
                        ))}
                      </ul>

                      {(preset?.notIncluded?.length ?? 0) > 0 ? (
                        <>
                          <p className={`mt-4 text-xs font-semibold uppercase tracking-[0.15em] ${getTierCardMutedTextClass(isFeaturedCard)}`}>Not Included</p>
                          <ul className="mt-2 space-y-2">
                            {preset?.notIncluded.map((item) => (
                              <li key={item} className={`flex items-start gap-2 text-sm leading-6 ${getTierCardMutedTextClass(isFeaturedCard)}`}>
                                <span className={`mt-[6px] inline-flex h-4 w-4 items-center justify-center text-xs leading-none ${getTierCardMutedTextClass(isFeaturedCard)}`}>✗</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : null}

                      {preset?.bestFor ? (
                        <>
                          <p className={`mt-4 text-xs font-semibold uppercase tracking-[0.15em] ${getTierCardMutedTextClass(isFeaturedCard)}`}>Best For</p>
                          <p className={`mt-2 text-sm leading-6 ${getTierCardMutedTextClass(isFeaturedCard)}`}>{preset.bestFor}</p>
                        </>
                      ) : null}

                      <div className="mt-auto pt-5">
                        <LinkButton href={variantHref} variant={isFeaturedCard ? "primary" : "outline"} size="sm" fullWidth>
                          {preset?.cta ?? `Continue with ${variant.tier_name}`}
                        </LinkButton>
                      </div>

                      {preset?.helper ? (
                        <p className={`mt-2 min-h-10 text-xs leading-5 ${getTierCardMutedTextClass(isFeaturedCard)}`}>{preset.helper}</p>
                      ) : null}
                    </article>
                  );
                })}
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight">Tier comparison</h2>
                <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
                  <table className="min-w-full divide-y divide-border text-left text-sm">
                    <thead className="bg-inset/50 text-text-muted">
                      <tr>
                        <th className="px-4 py-3 font-medium">Capability</th>
                        <th className="px-4 py-3 font-medium">Template Only</th>
                        <th className="px-4 py-3 font-medium">Done-For-You Setup</th>
                        <th className="px-4 py-3 font-medium">Business Launch</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {WEBSITE_TEMPLATE_COMPARISON_ROWS.map((row) => (
                        <tr key={row.capability}>
                          <td className="px-4 py-3 text-text">{row.capability}</td>
                          <td className="px-4 py-3 text-text-muted">{row.templateOnly ? "Included" : "-"}</td>
                          <td className="px-4 py-3 text-text-muted">{row.configuredTemplate ? "Included" : "-"}</td>
                          <td className="px-4 py-3 text-text-muted">{row.businessLaunch ? "Included" : "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {customizationUpsells.length > 0 ? (
          <Section tone="inset" className="py-10 sm:py-12">
            <Container>
              <h2 className="font-display text-2xl font-semibold tracking-tight">Customization and implementation</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {customizationUpsells.map((upsell) => (
                  <div key={`${upsell.title}-${upsell.cta_href}`} className="rounded-2xl border border-border bg-surface p-4">
                    <h3 className="font-display text-lg font-semibold tracking-tight">{upsell.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-text-muted">{upsell.description}</p>
                    <div className="mt-4">
                      <LinkButton href={upsell.cta_href} variant="outline" size="sm">
                        {upsell.cta_label} <ArrowUpRightIcon className="size-4" />
                      </LinkButton>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </Section>
        ) : null}

        {displayRelatedServices.length > 0 ? (
          <Section className="border-t border-border py-10 sm:py-12">
            <Container>
              <h2 className="font-display text-2xl font-semibold tracking-tight">Related services</h2>
              <p className="mt-2 text-sm leading-6 text-text-muted">
                Need help beyond the template itself? These services are the most common next steps.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {displayRelatedServices.map((service) => (
                  <LinkButton key={service.slug} href={`/services/${service.slug}`} variant="outline" size="sm">
                    {service.name}
                  </LinkButton>
                ))}
              </div>
            </Container>
          </Section>
        ) : null}

        {faqs.length > 0 ? <ProductFaqSection items={faqs} title="Product FAQ" /> : null}

        {related.length > 0 ? (
          <Section className="border-t border-border py-12 sm:py-16">
            <Container>
              <h2 className="font-display text-2xl font-bold tracking-tight">More in the catalog</h2>
              <p className="mt-2 text-sm text-text-muted">{WEBSITE_TEMPLATE_PREVIEW.relatedProductsCopy}</p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
                {related.map((item) => (
                  <ShopProductCatalogCard key={item.slug} product={item} />
                ))}
              </div>
            </Container>
          </Section>
        ) : null}

        <div className="h-20 lg:hidden" aria-hidden />

        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 p-3 backdrop-blur lg:hidden">
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-2">
            <LinkButton
              href={getCheckoutHref(product, {
                variantSlug: standardVariant.slug,
                tierName: standardVariant.tier_name,
                fulfillmentType: standardVariant.fulfillment_type,
              })}
              size="sm"
              fullWidth
            >
              Get Template Access
            </LinkButton>
            <LinkButton
              href={previewHref}
              variant="outline"
              size="sm"
              fullWidth
              target={hasExternalPreview ? "_blank" : undefined}
              rel={hasExternalPreview ? "noreferrer" : undefined}
            >
              {WEBSITE_TEMPLATE_PREVIEW.previewCta}
            </LinkButton>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <JsonLd data={productStructuredData} />
      {/* Main product layout */}
      <Section className="pb-10 pt-6 sm:pb-14 sm:pt-8">
        <Container>
          <Link href="/digital-products" className="mb-6 inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-primary">
            <ArrowLeftIcon className="size-4" /> Back to digital products
          </Link>

          <div className="grid min-w-0 gap-10 lg:grid-cols-[1fr_360px] lg:items-start xl:grid-cols-[1fr_380px]">

            {/* LEFT — preview + details */}
            <div className="min-w-0 space-y-8">
              {/* Product name (mobile only, shown above preview) */}
              <div className="lg:hidden">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                  {product.category} &middot; {product.type}
                </p>
                <ShopProductHeroTitle name={product.name} variant="mobile" />
              </div>

              {/* Preview surface */}
              <div id="preview" className="min-w-0 overflow-hidden rounded-2xl border border-border">
                {shouldUseEmbeddedPreview || (!product.image && product.embeddedPreviewUrl) ? (
                  <div className="aspect-16/10 min-w-0 bg-black">
                    <iframe
                      src={product.embeddedPreviewUrl}
                      title={`${product.name} website preview`}
                      className="h-full w-full border-0"
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  </div>
                ) : product.image ? (
                  <PreviewableImageFrame
                    src={product.image.src}
                    alt={product.image.alt}
                    sizes="(min-width: 1280px) 70vw, (min-width: 1024px) 60vw, 100vw"
                  />
                ) : (
                  <ProductPreviewSurface variant={product.previewVariant} />
                )}
              </div>

              {/* Mobile buy box — visible on small screens, right below preview */}
              <div className="lg:hidden rounded-2xl border border-border bg-surface p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">Starting from</p>
                    <p className="mt-1 font-display text-2xl font-bold tracking-tight">{sidebarBasePriceLabel}</p>
                  </div>
                  <span className="rounded-full border border-border bg-inset/40 px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.18em] text-text-muted">
                    {product.type}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <LinkButton
                    href={getCheckoutHref(product, {
                      variantSlug: sidebarPrimaryVariant.slug,
                      tierName: sidebarPrimaryVariant.tier_name,
                      fulfillmentType: sidebarPrimaryVariant.fulfillment_type,
                    })}
                    size="sm"
                    fullWidth
                  >
                    {isWebsiteTemplateProduct ? "Get Template Access" : "Buy Now"}
                  </LinkButton>
                  <LinkButton
                    href={previewHref}
                    variant="outline"
                    size="sm"
                    fullWidth
                    target={hasExternalPreview ? "_blank" : undefined}
                    rel={hasExternalPreview ? "noreferrer" : undefined}
                  >
                    Preview
                  </LinkButton>
                  <AddToCartButton
                    productSlug={product.slug}
                    productName={product.name}
                    productPrice={sidebarBasePriceLabel}
                    variantSlug={sidebarPrimaryVariant.slug}
                    tierName={sidebarPrimaryVariant.tier_name}
                    fulfillmentType={sidebarPrimaryVariant.fulfillment_type}
                    size="sm"
                    variant="outline"
                    fullWidth
                    className="col-span-2"
                  />
                </div>
              </div>

              {/* Template overview */}
              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight">Template overview</h2>
                <p className="mt-3 leading-7 text-text-muted">{product.teaser}</p>
                <p className="mt-3 leading-7 text-text-muted">{product.summary}</p>
              </div>

              {/* Who this is for */}
              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight">Who this is for</h2>
                <p className="mt-2 text-sm leading-6 text-text-muted">{product.audience}</p>
                <ul className="mt-4 space-y-2">
                  {useCases.map((item, index) => (
                    <li key={`${item}-${index}`} className="flex items-start gap-3 text-sm leading-6 text-text-muted">
                      <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Highlights */}
              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight">At a glance</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {product.highlights.map((highlight) => (
                    <div key={highlight.label} className="rounded-2xl border border-border bg-inset/40 px-4 py-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">{highlight.label}</p>
                      <p className="mt-2 font-display text-lg font-semibold tracking-tight">{highlight.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tier options */}
              {!isWebsiteTemplateProduct ? (
              <div className={isWebsiteTemplateProduct ? "space-y-6" : undefined}>
                <div className={isWebsiteTemplateProduct ? "max-w-4xl" : undefined}>
                <h2 className={`font-display font-semibold tracking-tight ${isWebsiteTemplateProduct ? "text-2xl" : "text-xl"}`}>
                  {isWebsiteTemplateProduct ? "Choose Your Path" : "Choose your package"}
                </h2>
                <p className={`mt-2 leading-7 text-text-muted ${isWebsiteTemplateProduct ? "text-base" : "text-sm"}`}>
                  {isWebsiteTemplateProduct
                    ? "Whether you need a ready-to-use website template, a branded version tailored to your business, or a complete launch-ready implementation, choose the option that matches your goals and level of involvement."
                    : "Pick Standard for self-serve launch, Premium for guided implementation, or Done-For-You when you want full rollout support."}
                </p>
                {isWebsiteTemplateProduct ? (
                  <p className="mt-2 text-base leading-7 text-text-muted">
                    <strong>Quick Buyer Guide</strong><br />
                    Template Only - For developers and DIY users.<br />
                    Configured Template - For businesses that want branding and setup completed.<br />
                    Business Launch - For businesses that want a complete website prepared and ready to launch.
                  </p>
                ) : null}
                </div>
                <div className={`grid lg:grid-cols-3 ${isWebsiteTemplateProduct ? "gap-5" : "mt-4 gap-4"}`}>
                  {websiteTemplatePathVariants.map((variant) => {
                    const htmlPreset = isHtmlBusinessProfile ? HTML_PROFILE_TIER_PRESETS[variant.slug] : null;
                    const websitePreset = isWebsiteTemplateProduct ? WEBSITE_TEMPLATE_TIER_PRESETS[variant.slug] : null;
                    const isMostPopular = isWebsiteTemplateProduct && variant.slug === "premium";
                    const isRecommended = isWebsiteTemplateProduct && variant.slug === "done-for-you";
                    const isFeaturedCard = isMostPopular || Boolean(variant.recommended);
                    const variantHref = variant.slug === "done-for-you"
                      ? `/contact?intent=done-for-you&product=${encodeURIComponent(product.slug)}`
                      : getCheckoutHref(product, {
                          variantSlug: variant.slug,
                          tierName: variant.tier_name,
                          fulfillmentType: variant.fulfillment_type,
                        });

                    return (
                      <article
                        key={variant.slug}
                        className={`${getTierCardContainerClass(isFeaturedCard)} ${isWebsiteTemplateProduct ? "p-5" : "p-4"}`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className={`font-mono text-[10px] uppercase tracking-[0.18em] ${getTierCardMutedTextClass(isFeaturedCard)}`}>{variant.tier_name}</p>
                          {isMostPopular ? (
                            <span className={getTierCardBadgeClass(true)}>
                              Most Popular
                            </span>
                          ) : null}
                          {isRecommended ? (
                            <span className={getTierCardBadgeClass(false)}>
                              Recommended
                            </span>
                          ) : null}
                        </div>
                        <h3 className="mt-2 font-display text-lg font-semibold tracking-tight">
                          {websitePreset?.label ?? htmlPreset?.label ?? variant.title}
                        </h3>
                        <p className="mt-2 font-display text-2xl font-bold tracking-tight">
                          {websitePreset?.price ?? variant.price}
                        </p>
                        {htmlPreset?.title ? <p className={`mt-3 text-sm leading-6 ${getTierCardMutedTextClass(isFeaturedCard)}`}>{htmlPreset.title}</p> : null}
                        {websitePreset?.description ? (
                          <p className={`mt-3 text-sm leading-6 ${getTierCardMutedTextClass(isFeaturedCard)}`}>{websitePreset.description}</p>
                        ) : htmlPreset?.description ? (
                          <p className={`mt-3 text-sm leading-6 ${getTierCardMutedTextClass(isFeaturedCard)}`}>{htmlPreset.description}</p>
                        ) : null}
                        <p className={`mt-4 text-xs font-semibold uppercase tracking-[0.15em] ${getTierCardMutedTextClass(isFeaturedCard)}`}>
                          {websitePreset?.includesHeading ?? htmlPreset?.includesHeading ?? "Includes"}
                        </p>
                        <ul className="mt-3 space-y-2">
                          {(websitePreset?.includes ?? htmlPreset?.includes ?? variant.includes.slice(0, 5)).map((item) => (
                            <li key={item} className={`flex items-start gap-2 text-sm leading-6 ${getTierCardMutedTextClass(isFeaturedCard)}`}>
                              <CheckIcon className={`mt-1 size-4 shrink-0 ${getTierCardCheckClass()}`} />
                              {item}
                            </li>
                          ))}
                        </ul>
                        {((websitePreset?.notIncluded?.length ?? 0) > 0 || (htmlPreset?.notIncluded?.length ?? 0) > 0) ? (
                          <>
                            <p className={`mt-4 text-xs font-semibold uppercase tracking-[0.15em] ${getTierCardMutedTextClass(isFeaturedCard)}`}>Not Included</p>
                            <ul className="mt-2 space-y-2">
                              {(websitePreset?.notIncluded ?? htmlPreset?.notIncluded ?? []).map((item) => (
                                <li key={item} className={`flex items-start gap-2 text-sm leading-6 ${getTierCardMutedTextClass(isFeaturedCard)}`}>
                                  <span className={`mt-[6px] inline-flex h-4 w-4 items-center justify-center text-xs leading-none ${getTierCardMutedTextClass(isFeaturedCard)}`}>✗</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </>
                        ) : null}
                        {(websitePreset?.optionalAddOns?.length ?? 0) > 0 ? (
                          <>
                            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">Optional Add-ons</p>
                            <ul className="mt-2 space-y-2">
                              {websitePreset?.optionalAddOns?.map((item) => (
                                <li key={item} className={`flex items-start gap-2 text-sm leading-6 ${getTierCardMutedTextClass(isFeaturedCard)}`}>
                                  <span className={`mt-[6px] inline-flex h-4 w-4 items-center justify-center text-xs leading-none ${getTierCardMutedTextClass(isFeaturedCard)}`}>•</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </>
                        ) : null}
                        {htmlPreset?.isOutcomeFocused ? (
                          <p className="mt-3 text-sm font-medium leading-6 text-text">
                            Get a professional business profile online without touching code.
                          </p>
                        ) : null}
                        <div className="mt-auto pt-4">
                          <LinkButton
                            href={variantHref}
                            variant={isFeaturedCard ? "primary" : "outline"}
                            size="sm"
                            fullWidth
                          >
                            {websitePreset?.cta ?? htmlPreset?.cta ?? `Continue with ${variant.tier_name}`}
                          </LinkButton>
                        </div>
                        {(websitePreset?.helper ?? htmlPreset?.helper) ? (
                          <p className={`mt-2 text-xs leading-5 ${getTierCardMutedTextClass(isFeaturedCard)}`}>{websitePreset?.helper ?? htmlPreset?.helper}</p>
                        ) : null}
                      </article>
                    );
                  })}
                </div>
                {isHtmlBusinessProfile ? (
                  <div className="mt-6 rounded-2xl border border-border bg-inset/40 p-5">
                    <h3 className="font-display text-lg font-semibold tracking-tight">Not Sure Which Option Fits You?</h3>
                    <p className="mt-2 text-sm leading-6 text-text-muted">
                      If you&apos;re comfortable editing HTML yourself, choose <strong>Template Only</strong>.
                    </p>
                    <p className="mt-2 text-sm leading-6 text-text-muted">
                      If you already have a logo and brand identity but want a polished version prepared for your business, choose <strong>Branded Template</strong>.
                    </p>
                    <p className="mt-2 text-sm leading-6 text-text-muted">
                      If you&apos;d rather skip the setup process entirely and receive a launch-ready business profile, choose <strong>Business Launch</strong>.
                    </p>
                    <p className="mt-3 text-sm leading-6 text-text">
                      Need something custom? Let&apos;s discuss your requirements and recommend the right approach.
                    </p>
                    <div className="mt-4">
                      <LinkButton href="/contact" variant="outline" size="sm">
                        Talk to Us <ArrowUpRightIcon className="size-4" />
                      </LinkButton>
                    </div>
                  </div>
                ) : null}
              </div>
              ) : null}

              {/* Tier comparison */}
              {!isWebsiteTemplateProduct && variantComparisonPoints.length > 0 ? (
                <div>
                  <h2 className="font-display text-xl font-semibold tracking-tight">Tier comparison</h2>
                  <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
                    <table className="min-w-full divide-y divide-border text-left text-sm">
                      <thead className="bg-inset/50 text-text-muted">
                        <tr>
                          <th className="px-4 py-3 font-medium">Capability</th>
                          {websiteTemplatePathVariants.map((variant) => (
                            <th key={variant.slug} className="px-4 py-3 font-medium">
                              {isWebsiteTemplateProduct
                                ? getWebsiteTemplateTierLabel(variant)
                                : isHtmlBusinessProfile
                                  ? getHtmlProfileTierLabel(variant)
                                  : variant.tier_name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {variantComparisonPoints.map((point) => (
                          <tr key={point}>
                            <td className="px-4 py-3 text-text">{point}</td>
                            {websiteTemplatePathVariants.map((variant) => (
                              <td key={`${variant.slug}-${point}`} className="px-4 py-3 text-text-muted">
                                {variantIncludesPoint(variant, point) ? "Included" : "-"}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}

              {/* Key features */}
              {features.length > 0 ? (
                <div>
                  <h2 className="font-display text-xl font-semibold tracking-tight">Key features</h2>
                  <ul className="mt-4 space-y-2">
                    {features.map((item, index) => (
                      <li key={`${item}-${index}`} className="flex items-start gap-3 text-sm leading-6 text-text-muted">
                        <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}


              {/* Stack */}
              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight">Stack</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border bg-inset/40 px-3 py-1.5 text-sm text-text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {isWebsiteTemplateProduct && !isWebsiteTemplatesCategory ? (
                <div className="space-y-8">
                  <WebsiteTemplateChoosePathIntro />

                  <div className="grid gap-5 lg:grid-cols-3">
                    {websiteTemplatePathVariants.map((variant) => {
                      const preset = WEBSITE_TEMPLATE_TIER_PRESETS[variant.slug];
                      const isRecommended = variant.slug === "premium";
                      const isFeaturedCard = isRecommended;
                      const variantHref = variant.slug === "done-for-you"
                        ? "/book-appointment"
                        : getCheckoutHref(product, {
                            variantSlug: variant.slug,
                            tierName: variant.tier_name,
                            fulfillmentType: variant.fulfillment_type,
                          });

                      return (
                        <article
                          key={variant.slug}
                          className={getTierCardContainerClass(isFeaturedCard)}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <p className={`font-mono text-[10px] uppercase tracking-[0.18em] ${getTierCardMutedTextClass(isFeaturedCard)}`}>{variant.tier_name}</p>
                            {isRecommended ? (
                              <span className={getTierCardBadgeClass(isFeaturedCard)}>
                                Recommended
                              </span>
                            ) : null}
                          </div>
                          <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">{preset?.label ?? variant.title}</h3>
                          <p className="mt-2 font-display text-3xl font-bold tracking-tight">{preset?.price ?? variant.price}</p>
                          {preset?.description ? <p className={`mt-3 text-sm leading-6 ${getTierCardMutedTextClass(isFeaturedCard)}`}>{preset.description}</p> : null}

                          <p className={`mt-4 text-xs font-semibold uppercase tracking-[0.15em] ${getTierCardMutedTextClass(isFeaturedCard)}`}>
                            {preset?.includesHeading ?? "Includes"}
                          </p>
                          <ul className="mt-3 space-y-2">
                            {(preset?.includes ?? variant.includes).map((item) => (
                              <li key={item} className={`flex items-start gap-2 text-sm leading-6 ${getTierCardMutedTextClass(isFeaturedCard)}`}>
                                <CheckIcon className={`mt-1 size-4 shrink-0 ${getTierCardCheckClass()}`} />
                                {item}
                              </li>
                            ))}
                          </ul>

                          {(preset?.notIncluded?.length ?? 0) > 0 ? (
                            <>
                              <p className={`mt-4 text-xs font-semibold uppercase tracking-[0.15em] ${getTierCardMutedTextClass(isFeaturedCard)}`}>Not Included</p>
                              <ul className="mt-2 space-y-2">
                                {preset?.notIncluded.map((item) => (
                                  <li key={item} className={`flex items-start gap-2 text-sm leading-6 ${getTierCardMutedTextClass(isFeaturedCard)}`}>
                                    <span className={`mt-[6px] inline-flex h-4 w-4 items-center justify-center text-xs leading-none ${getTierCardMutedTextClass(isFeaturedCard)}`}>✗</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </>
                          ) : null}

                          {preset?.bestFor ? (
                            <>
                              <p className={`mt-4 text-xs font-semibold uppercase tracking-[0.15em] ${getTierCardMutedTextClass(isFeaturedCard)}`}>Best For</p>
                              <p className={`mt-2 text-sm leading-6 ${getTierCardMutedTextClass(isFeaturedCard)}`}>{preset.bestFor}</p>
                            </>
                          ) : null}

                          {(preset?.optionalAddOns?.length ?? 0) > 0 ? (
                            <>
                              <p className={`mt-4 text-xs font-semibold uppercase tracking-[0.15em] ${getTierCardMutedTextClass(isFeaturedCard)}`}>Optional Add-ons</p>
                              <ul className="mt-2 space-y-2">
                                {(preset?.optionalAddOns ?? []).map((item) => (
                                  <li key={item} className={`flex items-start gap-2 text-sm leading-6 ${getTierCardMutedTextClass(isFeaturedCard)}`}>
                                    <span className={`mt-[6px] inline-flex h-4 w-4 items-center justify-center text-xs leading-none ${getTierCardMutedTextClass(isFeaturedCard)}`}>•</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </>
                          ) : null}

                          <div className="mt-auto pt-5">
                            <LinkButton href={variantHref} variant={isFeaturedCard ? "primary" : "outline"} size="sm" fullWidth>
                              {preset?.cta ?? `Continue with ${variant.tier_name}`}
                            </LinkButton>
                          </div>

                          {preset?.helper ? <p className={`mt-2 min-h-10 text-xs leading-5 ${getTierCardMutedTextClass(isFeaturedCard)}`}>{preset.helper}</p> : null}
                        </article>
                      );
                    })}
                  </div>

                  <div>
                    <h2 className="font-display text-xl font-semibold tracking-tight">Tier comparison</h2>
                    <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
                      <table className="min-w-full divide-y divide-border text-left text-sm">
                        <thead className="bg-inset/50 text-text-muted">
                          <tr>
                            <th className="px-4 py-3 font-medium">Capability</th>
                            <th className="px-4 py-3 font-medium">Template Only</th>
                            <th className="px-4 py-3 font-medium">Done-For-You Setup</th>
                            <th className="px-4 py-3 font-medium">Business Launch</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {WEBSITE_TEMPLATE_COMPARISON_ROWS.map((row) => (
                            <tr key={row.capability}>
                              <td className="px-4 py-3 text-text">{row.capability}</td>
                              <td className="px-4 py-3 text-text-muted">{row.templateOnly ? "Included" : "-"}</td>
                              <td className="px-4 py-3 text-text-muted">{row.configuredTemplate ? "Included" : "-"}</td>
                              <td className="px-4 py-3 text-text-muted">{row.businessLaunch ? "Included" : "-"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : null}

              {customizationUpsells.length > 0 && !isWebsiteTemplatesCategory ? (
                <div>
                  <h2 className="font-display text-xl font-semibold tracking-tight">Customization and implementation</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {customizationUpsells.map((upsell) => (
                      <div key={`${upsell.title}-${upsell.cta_href}`} className="rounded-2xl border border-border bg-inset/40 p-4">
                        <h3 className="font-display text-lg font-semibold tracking-tight">{upsell.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-text-muted">{upsell.description}</p>
                        <div className="mt-4">
                          <LinkButton href={upsell.cta_href} variant="outline" size="sm">
                            {upsell.cta_label} <ArrowUpRightIcon className="size-4" />
                          </LinkButton>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {displayRelatedServices.length > 0 && !isWebsiteTemplatesCategory ? (
                <div>
                  <h2 className="font-display text-xl font-semibold tracking-tight">Related services</h2>
                  <p className="mt-2 text-sm leading-6 text-text-muted">
                    Need help beyond the template itself? These services are the most common next steps.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {displayRelatedServices.map((service) => (
                      <LinkButton key={service.slug} href={`/services/${service.slug}`} variant="outline" size="sm">
                        {service.name}
                      </LinkButton>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {/* RIGHT — sticky purchase sidebar */}
            <aside className="min-w-0 space-y-4 lg:sticky lg:top-24">
              {/* Name + category (desktop) */}
              <div className="hidden lg:block">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                  {product.category} &middot; {product.type}
                </p>
                <ShopProductHeroTitle name={product.name} variant="sidebar" />
              </div>

              {/* Rating row */}
              {product.rating ? (
                <div className="flex flex-wrap items-center gap-2 text-sm text-text-muted">
                  <StarRating rating={product.rating} />
                  <span className="font-semibold text-text">{product.rating}</span>
                  {product.reviewCount ? <span>({product.reviewCount} reviews)</span> : null}
                  {product.salesCount ? (
                    <>
                      <span aria-hidden className="select-none">·</span>
                      <span>{product.salesCount} sales</span>
                    </>
                  ) : null}
                </div>
              ) : null}

              {/* Price */}
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">Starting from</p>
                <p className="mt-1 font-display text-4xl font-bold tracking-tight">{sidebarBasePriceLabel}</p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-3">
                <LinkButton
                  href={getCheckoutHref(product, {
                    variantSlug: sidebarPrimaryVariant.slug,
                    tierName: sidebarPrimaryVariant.tier_name,
                    fulfillmentType: sidebarPrimaryVariant.fulfillment_type,
                  })}
                  size="lg"
                  fullWidth
                >
                  <ShoppingBagIcon className="size-5" /> {isWebsiteTemplateProduct
                    ? "Get Template Access"
                    : `Start with ${isHtmlBusinessProfile ? getHtmlProfileTierLabel(sidebarPrimaryVariant) : sidebarPrimaryVariant.tier_name}`}
                </LinkButton>
                <LinkButton
                  href={previewHref}
                  variant="outline"
                  size="lg"
                  fullWidth
                  target={hasExternalPreview ? "_blank" : undefined}
                  rel={hasExternalPreview ? "noreferrer" : undefined}
                >
                  {WEBSITE_TEMPLATE_PREVIEW.previewCta} <ArrowUpRightIcon className="size-4" />
                </LinkButton>
                <AddToCartButton
                  productSlug={product.slug}
                  productName={product.name}
                  productPrice={sidebarBasePriceLabel}
                  variantSlug={sidebarPrimaryVariant.slug}
                  tierName={sidebarPrimaryVariant.tier_name}
                  fulfillmentType={sidebarPrimaryVariant.fulfillment_type}
                  size="lg"
                  variant="outline"
                  fullWidth
                />
                <WishlistButton
                  productSlug={product.slug}
                  productName={product.name}
                  size="lg"
                  variant="ghost"
                  fullWidth
                />
              </div>

              {websiteTemplatePathVariants.length > 1 ? (
                <div className="rounded-2xl border border-border bg-inset/40 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">Quick tier links</p>
                  <div className="mt-3 space-y-2">
                    {websiteTemplatePathVariants.map((variant) => (
                      <Link
                        key={variant.slug}
                        href={variant.slug === "done-for-you"
                          ? (isWebsiteTemplateProduct
                            ? "/book-appointment"
                            : `/contact?intent=done-for-you&product=${encodeURIComponent(product.slug)}`)
                          : getCheckoutHref(product, {
                              variantSlug: variant.slug,
                              tierName: variant.tier_name,
                              fulfillmentType: variant.fulfillment_type,
                            })}
                        className="flex items-center justify-between rounded-xl border border-border px-3 py-2 text-sm hover:border-primary/60 hover:bg-primary/5"
                      >
                        <span>{isWebsiteTemplateProduct
                          ? getWebsiteTemplateTierLabel(variant)
                          : isHtmlBusinessProfile
                            ? getHtmlProfileTierLabel(variant)
                            : variant.tier_name}
                        </span>
                        <span className="font-medium text-text-muted">
                          {isWebsiteTemplateProduct ? (WEBSITE_TEMPLATE_TIER_PRESETS[variant.slug]?.price ?? variant.price) : variant.price}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}

              <hr className="border-border" />

              {/* Meta table */}
              <dl className="space-y-2 text-sm">
                {[
                  { label: "Category", value: product.category },
                  { label: "Type", value: product.type },
                  { label: "Industry", value: product.industry },
                ].map((row) => (
                  <div key={row.label} className="flex min-w-0 items-start justify-between gap-4">
                    <dt className="shrink-0 font-medium text-text-muted">{row.label}</dt>
                    <dd className="min-w-0 flex-1 wrap-anywhere text-right text-text">{row.value}</dd>
                  </div>
                ))}
              </dl>

              <hr className="border-border" />

              {/* Ideal for */}
              <div className="rounded-2xl border border-border bg-inset/40 p-4 text-sm leading-6 text-text-muted">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">Ideal for</p>
                <p className="mt-2">{product.audience}</p>
              </div>

              {/* Talk to us */}
              <div className="text-center">
                <LinkButton
                  href="/book-appointment"
                  variant="ghost"
                  size="sm"
                  fullWidth
                  className="h-auto whitespace-normal px-4 py-2.5 leading-5"
                >
                  Need flexible payment or a custom fit? Talk to us first
                </LinkButton>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {isWebsiteTemplatesCategory ? (
        <Section className="border-t border-border pt-6 sm:pt-8">
          <Container>
            <div className="space-y-8">
              <WebsiteTemplateChoosePathIntro />

              <div className="grid gap-5 lg:grid-cols-3">
                {websiteTemplatePathVariants.map((variant) => {
                  const preset = WEBSITE_TEMPLATE_TIER_PRESETS[variant.slug];
                  const isRecommended = variant.slug === "premium";
                  const isFeaturedCard = isRecommended;
                  const variantHref = variant.slug === "done-for-you"
                    ? "/book-appointment"
                    : getCheckoutHref(product, {
                        variantSlug: variant.slug,
                        tierName: variant.tier_name,
                        fulfillmentType: variant.fulfillment_type,
                      });

                  return (
                    <article
                      key={variant.slug}
                      className={getTierCardContainerClass(isFeaturedCard)}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className={`font-mono text-[10px] uppercase tracking-[0.18em] ${getTierCardMutedTextClass(isFeaturedCard)}`}>{variant.tier_name}</p>
                        {isRecommended ? (
                          <span className={getTierCardBadgeClass(isFeaturedCard)}>
                            Recommended
                          </span>
                        ) : null}
                      </div>
                      <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">{preset?.label ?? variant.title}</h3>
                      <p className="mt-2 font-display text-3xl font-bold tracking-tight">{preset?.price ?? variant.price}</p>
                      {preset?.description ? <p className={`mt-3 text-sm leading-6 ${getTierCardMutedTextClass(isFeaturedCard)}`}>{preset.description}</p> : null}

                      <p className={`mt-4 text-xs font-semibold uppercase tracking-[0.15em] ${getTierCardMutedTextClass(isFeaturedCard)}`}>
                        {preset?.includesHeading ?? "Includes"}
                      </p>
                      <ul className="mt-3 space-y-2">
                        {(preset?.includes ?? variant.includes).map((item) => (
                          <li key={item} className={`flex items-start gap-2 text-sm leading-6 ${getTierCardMutedTextClass(isFeaturedCard)}`}>
                            <CheckIcon className={`mt-1 size-4 shrink-0 ${getTierCardCheckClass()}`} />
                            {item}
                          </li>
                        ))}
                      </ul>

                      {(preset?.notIncluded?.length ?? 0) > 0 ? (
                        <>
                          <p className={`mt-4 text-xs font-semibold uppercase tracking-[0.15em] ${getTierCardMutedTextClass(isFeaturedCard)}`}>Not Included</p>
                          <ul className="mt-2 space-y-2">
                            {preset?.notIncluded.map((item) => (
                              <li key={item} className={`flex items-start gap-2 text-sm leading-6 ${getTierCardMutedTextClass(isFeaturedCard)}`}>
                                <span className={`mt-[6px] inline-flex h-4 w-4 items-center justify-center text-xs leading-none ${getTierCardMutedTextClass(isFeaturedCard)}`}>✗</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : null}

                      {preset?.bestFor ? (
                        <>
                          <p className={`mt-4 text-xs font-semibold uppercase tracking-[0.15em] ${getTierCardMutedTextClass(isFeaturedCard)}`}>Best For</p>
                          <p className={`mt-2 text-sm leading-6 ${getTierCardMutedTextClass(isFeaturedCard)}`}>{preset.bestFor}</p>
                        </>
                      ) : null}

                      {(preset?.optionalAddOns?.length ?? 0) > 0 ? (
                        <>
                          <p className={`mt-4 text-xs font-semibold uppercase tracking-[0.15em] ${getTierCardMutedTextClass(isFeaturedCard)}`}>Optional Add-ons</p>
                          <ul className="mt-2 space-y-2">
                            {(preset?.optionalAddOns ?? []).map((item) => (
                              <li key={item} className={`flex items-start gap-2 text-sm leading-6 ${getTierCardMutedTextClass(isFeaturedCard)}`}>
                                <span className={`mt-[6px] inline-flex h-4 w-4 items-center justify-center text-xs leading-none ${getTierCardMutedTextClass(isFeaturedCard)}`}>•</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : null}

                      <div className="mt-auto pt-5">
                        <LinkButton href={variantHref} variant={isFeaturedCard ? "primary" : "outline"} size="sm" fullWidth>
                          {preset?.cta ?? `Continue with ${variant.tier_name}`}
                        </LinkButton>
                      </div>

                      {preset?.helper ? <p className={`mt-2 min-h-10 text-xs leading-5 ${getTierCardMutedTextClass(isFeaturedCard)}`}>{preset.helper}</p> : null}
                    </article>
                  );
                })}
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight">Tier comparison</h2>
                <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
                  <table className="min-w-full divide-y divide-border text-left text-sm">
                    <thead className="bg-inset/50 text-text-muted">
                      <tr>
                        <th className="px-4 py-3 font-medium">Capability</th>
                        <th className="px-4 py-3 font-medium">Template Only</th>
                        <th className="px-4 py-3 font-medium">Done-For-You Setup</th>
                        <th className="px-4 py-3 font-medium">Business Launch</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {WEBSITE_TEMPLATE_COMPARISON_ROWS.map((row) => (
                        <tr key={row.capability}>
                          <td className="px-4 py-3 text-text">{row.capability}</td>
                          <td className="px-4 py-3 text-text-muted">{row.templateOnly ? "Included" : "-"}</td>
                          <td className="px-4 py-3 text-text-muted">{row.configuredTemplate ? "Included" : "-"}</td>
                          <td className="px-4 py-3 text-text-muted">{row.businessLaunch ? "Included" : "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {customizationUpsells.length > 0 ? (
                <div>
                  <h2 className="font-display text-xl font-semibold tracking-tight">Customization and implementation</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {customizationUpsells.map((upsell) => (
                      <div key={`${upsell.title}-${upsell.cta_href}`} className="rounded-2xl border border-border bg-inset/40 p-4">
                        <h3 className="font-display text-lg font-semibold tracking-tight">{upsell.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-text-muted">{upsell.description}</p>
                        <div className="mt-4">
                          <LinkButton href={upsell.cta_href} variant="outline" size="sm">
                            {upsell.cta_label} <ArrowUpRightIcon className="size-4" />
                          </LinkButton>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {displayRelatedServices.length > 0 ? (
                <div>
                  <h2 className="font-display text-xl font-semibold tracking-tight">Related services</h2>
                  <p className="mt-2 text-sm leading-6 text-text-muted">
                    Need help beyond the template itself? These services are the most common next steps.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {displayRelatedServices.map((service) => (
                      <LinkButton key={service.slug} href={`/services/${service.slug}`} variant="outline" size="sm">
                        {service.name}
                      </LinkButton>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </Container>
        </Section>
      ) : null}

      {faqs.length > 0 ? <ProductFaqSection items={faqs} title="Product FAQ" /> : null}

      {/* Screenshot gallery */}
      {galleryImages.length > 0 ? (
        <Section>
          <Container>
            <SectionHeading eyebrow="Template gallery" titleLead="Surfaces from" titleAccent="the template." />
            <PortfolioGalleryLightbox images={galleryImages} />
          </Container>
        </Section>
      ) : null}

      {/* Customer reviews */}
      <Section className="border-t border-border py-12 sm:py-16">
        <Container>
          <ProductReviews productSlug={product.slug} />
        </Container>
      </Section>

      {/* Related products */}
      {related.length > 0 ? (
        <Section className="border-t border-border py-12 sm:py-16">
          <Container>
            <h2 className="font-display text-2xl font-bold tracking-tight">More in the catalog</h2>
            <p className="mt-2 text-sm text-text-muted">
              Browse more published products from the live catalog.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ShopProductCatalogCard key={item.slug} product={item} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <div className="h-20 lg:hidden" aria-hidden />

      {/* Mobile sticky actions */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 p-3 backdrop-blur lg:hidden">
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-2">
          <LinkButton
            href={getCheckoutHref(product, {
              variantSlug: sidebarPrimaryVariant.slug,
              tierName: sidebarPrimaryVariant.tier_name,
              fulfillmentType: sidebarPrimaryVariant.fulfillment_type,
            })}
            size="sm"
            fullWidth
          >
            {isWebsiteTemplateProduct
              ? "Get Template Access"
              : `Buy (${isHtmlBusinessProfile ? getHtmlProfileTierLabel(sidebarPrimaryVariant) : sidebarPrimaryVariant.tier_name})`}
          </LinkButton>
          <LinkButton
            href={previewHref}
            variant="outline"
            size="sm"
            fullWidth
            target={hasExternalPreview ? "_blank" : undefined}
            rel={hasExternalPreview ? "noreferrer" : undefined}
          >
            {WEBSITE_TEMPLATE_PREVIEW.previewCta}
          </LinkButton>
        </div>
      </div>
    </>
  );
}
