export const WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG = "website-templates-html-preview" as const;

export type WebsiteTemplateHtmlPreviewRecord = {
  slug: string;
  fileName: string;
  title: string;
  type: string;
  price: string;
  href: string;
};

const WEBSITE_TEMPLATE_HTML_PREVIEWS: WebsiteTemplateHtmlPreviewRecord[] = [
  {
    slug: "01-bedrock-construction",
    fileName: "01-BedrockConstruction.html",
    title: "Bedrock Construction",
    type: "Website Template HTML",
    price: "$149",
    href: "/products/category/website-templates-html-preview",
  },
];

export function getWebsiteTemplateHtmlPreviewBySlug(templateSlug: string) {
  return WEBSITE_TEMPLATE_HTML_PREVIEWS.find((template) => template.slug === templateSlug) ?? null;
}

export function listWebsiteTemplateHtmlPreviews() {
  return WEBSITE_TEMPLATE_HTML_PREVIEWS;
}

export function getWebsiteTemplateHtmlPreviewUrl(templateSlug: string) {
  return `/api/website-templates-html-preview/${templateSlug}`;
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
    const catalogProduct = catalogProducts.find(
      (item) => item.embeddedPreviewUrl === previewUrl || item.livePreviewUrl === previewUrl,
    );

    return {
      name: template.title,
      type: template.type,
      price: catalogProduct?.price ?? template.price,
      href: catalogProduct ? `/products/${catalogProduct.slug}` : template.href,
      previewUrl,
    };
  });
}
