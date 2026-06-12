export const WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG = "website-templates-html-preview" as const;

/** Public URL segment and shop folder name for HTML website template files. */
export const WEBSITE_TEMPLATE_HTML_PREVIEW_ROOT = "html-template-websites" as const;

export type WebsiteTemplateHtmlPreviewRecord = {
  slug: string;
  fileName: string;
  title: string;
  type: string;
  price: string;
  industry?: string;
  teaser?: string;
  summary?: string;
};

const WEBSITE_TEMPLATE_HTML_PREVIEWS: WebsiteTemplateHtmlPreviewRecord[] = [
  {
    slug: "01-bedrock-construction",
    fileName: "01-BedrockConstruction.html",
    title: "Bedrock Construction",
    type: "Construction & Trades",
    price: "$149",
    industry: "Construction",
    teaser: "Bold construction company template with services, proof, and quote-ready sections.",
    summary: "A trades-focused website template with embedded HTML preview, built for contractors who need credibility fast.",
  },
  {
    slug: "02-super-shop-commerce",
    fileName: "02-SuperShopCommerce.html",
    title: "SuperShop Commerce",
    type: "E-Commerce",
    price: "$149",
    industry: "Retail & E-Commerce",
    teaser: "Premium multi-category storefront with product discovery, promos, and conversion-ready checkout flows.",
    summary: "A full-width e-commerce website template with category browsing, deals, and mobile-first shopping UX.",
  },
  {
    slug: "03-primora-supershop",
    fileName: "03. primora-supershop-website.html",
    title: "Primora Super Shop",
    type: "E-Commerce",
    price: "$149",
    industry: "Retail & E-Commerce",
    teaser: "Premium super shop layout with fresh produce, member rewards, same-day delivery, and conversion-ready category pages.",
    summary: "A polished grocery and multi-category retail website template with loyalty messaging, promos, and mobile-first shopping UX.",
  },
  {
    slug: "04-prime-climate-hvac",
    fileName: "04-PrimeClimateHVAC.html",
    title: "Prime Climate HVAC",
    type: "HVAC & Home Services",
    price: "$149",
    industry: "HVAC",
    teaser: "Premium HVAC services template with repair, installation, maintenance plans, and 24/7 emergency CTAs.",
    summary: "A conversion-ready HVAC website template with service tiers, trust proof, and quote-ready sections for local climate businesses.",
  },
  {
    slug: "05-elite-estates-realty",
    fileName: "05-EliteEstatesRealty.html",
    title: "Elite Estates Realty",
    type: "Real Estate",
    price: "$149",
    industry: "Real Estate",
    teaser: "Luxury real estate advisory layout with premium listings, market highlights, and concierge-style lead capture.",
    summary: "A high-end property website template built for luxury brokers, off-market showcases, and international market positioning.",
  },
  {
    slug: "06-elite-medical-clinic",
    fileName: "06-EliteMedicalClinic.html",
    title: "EliteMed Clinic",
    type: "Healthcare",
    price: "$149",
    industry: "Healthcare",
    teaser: "Medical clinic template with specialist profiles, same-day booking, telemedicine, and patient trust sections.",
    summary: "A healthcare website template with appointment flows, service departments, and credibility-first layout for clinics and medical groups.",
  },
  {
    slug: "07-proflow-plumbing",
    fileName: "07-ProFlowPlumbing.html",
    title: "ProFlow Plumbing",
    type: "Plumbing & Home Services",
    price: "$149",
    industry: "Plumbing",
    teaser: "24/7 emergency plumbing template with drain cleaning, water heaters, sewer lines, and same-day service CTAs.",
    summary: "A conversion-ready plumbing website template with emergency response, service tiers, trust proof, and quote-ready sections for local trades.",
  },
];

export function getWebsiteTemplateHtmlPreviewBySlug(templateSlug: string) {
  return WEBSITE_TEMPLATE_HTML_PREVIEWS.find((template) => template.slug === templateSlug) ?? null;
}

export function listWebsiteTemplateHtmlPreviews() {
  return WEBSITE_TEMPLATE_HTML_PREVIEWS;
}

export function getWebsiteTemplateHtmlPreviewUrl(templateSlug: string) {
  const template = getWebsiteTemplateHtmlPreviewBySlug(templateSlug);
  if (!template) {
    return `/previews/${WEBSITE_TEMPLATE_HTML_PREVIEW_ROOT}/${templateSlug}.html`;
  }

  return `/previews/${WEBSITE_TEMPLATE_HTML_PREVIEW_ROOT}/${encodePreviewFileName(template.fileName)}`;
}

function encodePreviewFileName(fileName: string) {
  return fileName.replace(/ /g, "%20");
}

export function getWebsiteTemplateHtmlPreviewProductSlug(templateSlug: string) {
  if (templateSlug === "01-bedrock-construction") {
    return "website-template-html-preview-bedrock-construction";
  }

  return `website-template-html-preview-${templateSlug}`;
}

type WebsiteTemplateHtmlPreviewCatalogProduct = {
  slug: string;
  price: string;
  embeddedPreviewUrl?: string;
  livePreviewUrl?: string;
};

export function buildWebsiteTemplateHtmlPreviewSlides(catalogProducts: WebsiteTemplateHtmlPreviewCatalogProduct[]) {
  return listWebsiteTemplateHtmlPreviews().map((template) => {
    const previewUrl = getWebsiteTemplateHtmlPreviewUrl(template.slug);
    const productSlug = getWebsiteTemplateHtmlPreviewProductSlug(template.slug);
    const catalogProduct = catalogProducts.find(
      (item) =>
        item.slug === productSlug ||
        item.embeddedPreviewUrl === previewUrl ||
        item.livePreviewUrl === previewUrl,
    );

    return {
      name: template.title,
      type: template.type,
      price: catalogProduct?.price ?? template.price,
      href: catalogProduct ? `/products/${catalogProduct.slug}` : `/products/${productSlug}`,
      previewUrl,
    };
  });
}
