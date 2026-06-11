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
