import type { AccordionItem } from "@/components/sections/Accordion";
import { WEBSITE_TEMPLATE_PREVIEW, WEBSITE_TEMPLATE_PREVIEW_FAQ } from "@/lib/preview-terminology";
import { WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG } from "@/lib/website-templates-html-preview";
import { getProductHref, type ShopProduct } from "@/lib/shop";

export const WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_PATH =
  `/digital-products/category/${WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG}` as const;

export const WEBSITE_TEMPLATES_HTML_PREVIEW_DIGITAL_PRODUCTS_PATH = "/digital-products" as const;

export const WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_ANCHORS = {
  profiles: "profiles",
  pricing: "pricing",
} as const;

export const WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_METADATA = {
  title: WEBSITE_TEMPLATE_PREVIEW.categoryPageTitle,
  description: WEBSITE_TEMPLATE_PREVIEW.categoryPageDescription,
} as const;

export const WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_HERO = {
  eyebrow: WEBSITE_TEMPLATE_PREVIEW.heroBadge,
  title: WEBSITE_TEMPLATE_PREVIEW.heroTitle,
  titleLead: "Website preview",
  titleAccent: "for every template.",
  description: `${WEBSITE_TEMPLATE_PREVIEW.heroDescription} Review the template in-frame, then continue with your preferred purchase or customization path.`,
  primaryCta: WEBSITE_TEMPLATE_PREVIEW.browseCollectionCta,
  secondaryCta: "Open Product Details",
  previewLabel: "Website preview",
  backLabel: "All digital products",
  backHref: WEBSITE_TEMPLATES_HTML_PREVIEW_DIGITAL_PRODUCTS_PATH,
  statCatalogLabel: "Catalog Items",
  statPreviewsLabel: WEBSITE_TEMPLATE_PREVIEW.statPreviewsLabel,
  statDeliveryPathsLabel: "Delivery Paths",
  statEmbeddedPreviewLabel: "In-frame preview",
  statDeliveryPathsValue: "3",
  statEmbeddedPreviewValue: "Live",
} as const;

export function getWebsiteTemplatesCategoryAnchorHref(
  anchor: keyof typeof WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_ANCHORS,
) {
  return `${WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_PATH}#${WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_ANCHORS[anchor]}`;
}

export function buildWebsiteTemplatesCategoryHeroStats(catalogCount: number, previewCount: number) {
  return [
    { value: `${catalogCount}+`, label: WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_HERO.statCatalogLabel },
    { value: `${previewCount}`, label: WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_HERO.statPreviewsLabel },
    { value: WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_HERO.statDeliveryPathsValue, label: WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_HERO.statDeliveryPathsLabel },
    { value: WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_HERO.statEmbeddedPreviewValue, label: WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_HERO.statEmbeddedPreviewLabel },
  ] as const;
}

export const WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SHOWCASE_SECTION = {
  eyebrow: "Preview experience",
  title: "Desktop and mobile preview, side by side",
  titleLead: "Desktop and mobile preview,",
  titleAccent: "side by side",
  description: WEBSITE_TEMPLATE_PREVIEW.showcaseDescription,
} as const;

export const WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_CATALOG_SECTION = {
  eyebrow: "Template catalog",
  title: WEBSITE_TEMPLATE_PREVIEW.catalogSectionTitle,
  titleLead: "Website templates",
  titleAccent: "you can buy right now",
  description: WEBSITE_TEMPLATE_PREVIEW.catalogSectionDescription,
  browseCta: WEBSITE_TEMPLATE_PREVIEW.browseCategoryCta,
  featuredCta: "Open Featured Template",
} as const;

export const WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_PRICING_SECTION = {
  eyebrow: "Pricing paths",
  title: "Choose your preferred implementation level.",
  titleLead: "Choose your preferred",
  titleAccent: "implementation level.",
} as const;

function categoryContactHref(intent: string) {
  return `/contact?intent=${intent}&category=${WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG}`;
}

export function buildWebsiteTemplatesCategoryPricingTiers(
  primaryProduct: ShopProduct | undefined,
  standardPrice: string,
  premiumPrice: string,
  launchPrice: string,
) {
  const primaryHref = primaryProduct ? getProductHref(primaryProduct) : WEBSITE_TEMPLATES_HTML_PREVIEW_DIGITAL_PRODUCTS_PATH;

  return [
    {
      title: "Template Access",
      investment: standardPrice,
      description: "Download the template and deploy with your own team.",
      bestFor: ["Template files", "Responsive structure", "Basic setup guidance", "Commercial usage rights"],
      cta: { label: "Get Template", href: primaryHref },
    },
    {
      title: "Branded Setup",
      investment: premiumPrice,
      description: "We apply brand, content, and launch setup on your selected template.",
      bestFor: ["Brand styling", "Content setup", "Core configuration", "Launch-ready handoff"],
      cta: { label: "Request Setup", href: categoryContactHref("customize_template") },
      featured: true,
    },
    {
      title: "Launch Partnership",
      investment: launchPrice,
      description: "Done-for-you implementation for teams that want full support.",
      bestFor: ["Planning support", "Extended implementation", "Deployment assistance", "Post-launch guidance"],
      cta: { label: "Book Discovery", href: categoryContactHref("done-for-you") },
    },
  ] as const;
}

export const WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_FAQ_SECTION = {
  eyebrow: "FAQ",
  title: WEBSITE_TEMPLATE_PREVIEW.faqTitle,
  titleLead: "Website preview questions,",
  titleAccent: "answered.",
} as const;

export const WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_FAQ: AccordionItem[] = [
  ...WEBSITE_TEMPLATE_PREVIEW_FAQ,
  {
    question: "Can I still buy from the regular product catalog?",
    answer:
      "Yes. Product cards below still come from the existing website templates catalog so checkout flow stays unchanged.",
  },
];

export const WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_FINAL_CTA = {
  eyebrow: "Next step",
  title: "Need a custom website rollout plan?",
  titleLead: "Need a custom website",
  titleAccent: "rollout plan?",
  description: `${WEBSITE_TEMPLATE_PREVIEW.bottomCtaCopy} when you are ready to launch.`,
  primaryCta: "Book Consultation",
  primaryHref: "/book-appointment",
  secondaryCta: "Reopen Website Preview",
  secondaryHref: WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_PATH,
} as const;
