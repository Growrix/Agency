export const WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG = "website-templates-html-preview" as const;

/** Public URL segment and shop folder name for HTML website template files. */
export const WEBSITE_TEMPLATE_HTML_PREVIEW_ROOT = "html-template-websites" as const;
const WEBSITE_TEMPLATE_HTML_PREVIEW_API_ROOT = "website-templates-html-preview" as const;

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
  {
    slug: "08-voltcore-power",
    fileName: "08-VoltCorePower.html",
    title: "VoltCore Power",
    type: "Electrical & Home Services",
    price: "$149",
    industry: "Electrical",
    teaser: "Premium electrical services template with 24/7 emergency response, EV chargers, smart-home installs, and master electrician trust proof.",
    summary: "A conversion-ready electrical contractor website template with emergency CTAs, service tiers, maintenance plans, and mobile-first booking UX.",
  },
  {
    slug: "09-guardian-pest-pro",
    fileName: "09-GuardianPestPro.html",
    title: "Guardian Pest Pro",
    type: "Pest Control & Home Services",
    price: "$149",
    industry: "Pest Control",
    teaser: "Local pest control template with inspection flows, treatment plans, emergency bookings, and trust-first service positioning.",
    summary: "A conversion-ready pest management website template with service coverage highlights, prevention plans, and fast quote capture for local operators.",
  },
  {
    slug: "10-fixhaus-handyman",
    fileName: "10-FixHausHandyman.html",
    title: "FixHaus Handyman",
    type: "Handyman & Home Services",
    price: "$149",
    industry: "Handyman",
    teaser: "On-demand handyman services template with repair categories, rapid booking CTAs, and homeowner trust proof sections.",
    summary: "A practical handyman website template designed for recurring maintenance, one-off repair jobs, and fast service-request conversion.",
  },
  {
    slug: "11-terragrove-flooring",
    fileName: "11-TerraGroveFlooring.html",
    title: "TerraGrove Flooring",
    type: "Flooring & Interior Services",
    price: "$149",
    industry: "Flooring",
    teaser: "Premium flooring services template with material showcases, installation journeys, and project-ready quote capture.",
    summary: "A polished flooring contractor website template built for tile, hardwood, and renovation teams that need premium lead quality.",
  },
  {
    slug: "12-stoneaxis-flooring",
    fileName: "12-StoneAxisFlooring.html",
    title: "StoneAxis Flooring",
    type: "Flooring & Interior Services",
    price: "$149",
    industry: "Flooring",
    teaser: "Craftsmanship-led flooring and tile template with portfolio sections, process education, and consultation-first conversion blocks.",
    summary: "A flooring and tile installation website template that balances visual proof, service depth, and straightforward booking pathways.",
  },
  {
    slug: "13-clearframe-windows",
    fileName: "13-ClearFrameWindows.html",
    title: "ClearFrame Windows",
    type: "Windows & Doors Services",
    price: "$149",
    industry: "Windows & Doors",
    teaser: "Window and door installation template with replacement options, energy-efficiency value props, and inspection-driven lead capture.",
    summary: "A conversion-focused windows and doors website template for teams delivering upgrades, retrofits, and premium installation projects.",
  },
  {
    slug: "14-aquaverde-pool",
    fileName: "14-AquaVerdePool.html",
    title: "AquaVerde Pool",
    type: "Pool Services",
    price: "$149",
    industry: "Pool Maintenance",
    teaser: "Resort-style pool service template with maintenance plans, water-quality trust messaging, and recurring-service conversion flows.",
    summary: "A premium pool care website template for cleaning, repair, and seasonal maintenance teams that need repeat bookings.",
  },
  {
    slug: "15-rapidtrack-garage",
    fileName: "15-RapidTrackGarage.html",
    title: "RapidTrack Garage",
    type: "Garage Door Services",
    price: "$149",
    industry: "Garage Doors",
    teaser: "Emergency garage door template with same-day repair CTAs, opener service pages, and reliability-first proof sections.",
    summary: "A high-conversion garage door service website template for local operators handling urgent repairs and preventative maintenance.",
  },
  {
    slug: "16-maison-clair",
    fileName: "16-MaisonClair.html",
    title: "Maison Clair",
    type: "Home & Commercial Cleaning",
    price: "$149",
    industry: "Cleaning Services",
    teaser: "Luxury cleaning services template with residential and commercial packages, recurring plans, and polished trust messaging.",
    summary: "A premium cleaning company website template built for bookings, package comparisons, and retention-focused service plans.",
  },
  {
    slug: "17-heartwood-arbor",
    fileName: "17-HeartwoodArbor.html",
    title: "Heartwood Arbor",
    type: "Tree Care & Arborist Services",
    price: "$149",
    industry: "Tree Services",
    teaser: "Certified arborist template with emergency removal calls, risk-assessment sections, and long-term tree health service positioning.",
    summary: "A professional tree care website template for arborists and landscaping teams that need authority-led local lead conversion.",
  },
  {
    slug: "18-mint-pearl-dental",
    fileName: "18-MintPearlDental.html",
    title: "Mint & Pearl Dental",
    type: "Healthcare",
    price: "$149",
    industry: "Dentistry",
    teaser: "Modern dental studio template with cosmetic care, same-week booking, transparent pricing, and smile-design conversion flows.",
    summary: "A gentle, conversion-ready dental website template for general, cosmetic, and orthodontic practices that need trust-first appointment booking.",
  },
];

export function getWebsiteTemplateHtmlPreviewBySlug(templateSlug: string) {
  return WEBSITE_TEMPLATE_HTML_PREVIEWS.find((template) => template.slug === templateSlug) ?? null;
}

export function listWebsiteTemplateHtmlPreviews() {
  return WEBSITE_TEMPLATE_HTML_PREVIEWS;
}

export function getWebsiteTemplateHtmlPreviewUrl(templateSlug: string) {
  return `/api/${WEBSITE_TEMPLATE_HTML_PREVIEW_API_ROOT}/${encodeURIComponent(templateSlug)}`;
}

export function getWebsiteTemplateHtmlPreviewStaticUrl(templateSlug: string) {
  const template = getWebsiteTemplateHtmlPreviewBySlug(templateSlug);
  if (!template) {
    return `/previews/${WEBSITE_TEMPLATE_HTML_PREVIEW_ROOT}/${templateSlug}.html`;
  }

  return `/previews/${WEBSITE_TEMPLATE_HTML_PREVIEW_ROOT}/${encodePreviewFileName(template.fileName)}`;
}

export function getWebsiteTemplateHtmlPreviewByProductSlug(productSlug: string) {
  return listWebsiteTemplateHtmlPreviews().find(
    (template) => getWebsiteTemplateHtmlPreviewProductSlug(template.slug) === productSlug,
  ) ?? null;
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
      href: catalogProduct ? `/digital-products/${catalogProduct.slug}` : `/digital-products/${productSlug}`,
      previewUrl,
    };
  });
}
