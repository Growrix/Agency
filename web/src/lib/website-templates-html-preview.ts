export const WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG = "website-templates-html-preview" as const;

export type WebsiteTemplateHtmlPreviewRoot = "website-templates-html" | "html-business-profiles";

export type WebsiteTemplateHtmlPreviewRecord = {
  slug: string;
  fileName: string;
  title: string;
  type: string;
  price: string;
  previewRoot?: WebsiteTemplateHtmlPreviewRoot;
  industry?: string;
  teaser?: string;
  summary?: string;
};

const WEBSITE_TEMPLATE_HTML_PREVIEWS: WebsiteTemplateHtmlPreviewRecord[] = [
  {
    slug: "01-bedrock-construction",
    fileName: "01-BedrockConstruction.html",
    previewRoot: "website-templates-html",
    title: "Bedrock Construction",
    type: "Construction & Trades",
    price: "$149",
    industry: "Construction",
    teaser: "Bold construction company template with services, proof, and quote-ready sections.",
    summary: "A trades-focused website template with embedded HTML preview, built for contractors who need credibility fast.",
  },
  {
    slug: "02-luminary-studio",
    fileName: "profile-02-luminary-studio.html",
    previewRoot: "html-business-profiles",
    title: "Luminary Studio",
    type: "Creative Agency",
    price: "$149",
    industry: "Creative & Marketing",
  },
  {
    slug: "03-nexus-digital",
    fileName: "profile-03-nexus-digital.html",
    previewRoot: "html-business-profiles",
    title: "Nexus Digital",
    type: "Digital Agency",
    price: "$149",
    industry: "Creative & Marketing",
  },
  {
    slug: "04-law-firm",
    fileName: "profile-04-law-firm.html",
    previewRoot: "html-business-profiles",
    title: "Sterling Law Group",
    type: "Professional Services",
    price: "$149",
    industry: "Legal",
  },
  {
    slug: "05-yoga-studio",
    fileName: "profile-05-yoga-studio.html",
    previewRoot: "html-business-profiles",
    title: "Solstice Yoga Studio",
    type: "Wellness & Fitness",
    price: "$149",
    industry: "Wellness",
  },
  {
    slug: "06-barbershop",
    fileName: "profile-06-barbershop.html",
    previewRoot: "html-business-profiles",
    title: "Iron & Blade Barbershop",
    type: "Local Business",
    price: "$149",
    industry: "Personal Care",
  },
  {
    slug: "07-real-estate",
    fileName: "profile-07-real-estate.html",
    previewRoot: "html-business-profiles",
    title: "Harbor Real Estate",
    type: "Real Estate",
    price: "$149",
    industry: "Real Estate",
  },
  {
    slug: "08-food-truck",
    fileName: "profile-08-food-truck.html",
    previewRoot: "html-business-profiles",
    title: "Rolling Bites Food Truck",
    type: "Food & Hospitality",
    price: "$149",
    industry: "Food & Beverage",
  },
  {
    slug: "09-dental-clinic",
    fileName: "profile-09-dental-clinic.html",
    previewRoot: "html-business-profiles",
    title: "BrightSmile Dental",
    type: "Healthcare",
    price: "$149",
    industry: "Healthcare",
  },
  {
    slug: "10-personal-trainer",
    fileName: "profile-10-personal-trainer.html",
    previewRoot: "html-business-profiles",
    title: "PeakForm Training",
    type: "Fitness Coach",
    price: "$149",
    industry: "Fitness",
  },
  {
    slug: "11-flower-shop",
    fileName: "profile-11-flower-shop.html",
    previewRoot: "html-business-profiles",
    title: "Petal & Stem Florals",
    type: "Retail & Local",
    price: "$149",
    industry: "Retail",
  },
  {
    slug: "12-tutoring",
    fileName: "profile-12-tutoring.html",
    previewRoot: "html-business-profiles",
    title: "BrightPath Tutoring",
    type: "Education",
    price: "$149",
    industry: "Education",
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
    return `/previews/website-templates-html/${templateSlug}.html`;
  }

  const previewRoot = template.previewRoot ?? "website-templates-html";
  return `/previews/${previewRoot}/${template.fileName}`;
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
