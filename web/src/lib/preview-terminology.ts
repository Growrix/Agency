/** User-facing copy for website template products — no "HTML preview" in UI. */

export const WEBSITE_TEMPLATE_PREVIEW = {
  categoryNavLabel: "Website Templates",
  categoryNavDescription: "Website templates with in-frame website preview before you buy.",
  categoryPageTitle: "Website preview",
  categoryPageDescription:
    "Browse website templates with desktop and mobile preview. Inspect each template, then purchase or request Done-For-You setup.",
  productCategoryLabel: "Website Templates",
  previewBadge: "Website Templates",
  livePreviewLabel: "Website preview",
  livePreviewChip: "Website preview",
  livePreviewChipHint: "Real pages in-frame",
  livePreviewAtFullWidth: "Website preview at full width — judge spacing and brand feel before you buy",
  scrollLivePreviewCopy: (width: number) =>
    `Scroll the website preview at ${width}px. The layout you preview is the template you can launch.`,
  sameAsDesktopCopy: "Same website as desktop.",
  productNameSuffix: "",
  previewCta: "Preview",
  browseCollectionCta: "Browse Website Templates",
  browseCategoryCta: "Browse Website Templates",
  statPreviewsLabel: "Website previews",
  catalogSectionTitle: "Website templates you can buy right now",
  catalogSectionDescription:
    "Website templates in a compact grid — preview in-frame, then open the product page to buy.",
  heroBadge: "Website Templates",
  heroTitle: "Website preview for every template in the catalog.",
  heroDescription:
    "Browse website templates with direct preview-first discovery before you purchase or customize.",
  faqTitle: "Website preview questions, answered.",
  bottomCtaCopy:
    "Start from this website preview flow, then move into customization or full implementation with our team",
  relatedProductsCopy: "Browse more website templates from this category.",
  showcaseDescription:
    "Preview-first by design — inspect the same website template in desktop and mobile form before purchase or customization.",
  shopSpotlightEyebrow: "Website Templates",
  shopSpotlightDescription:
    "Browse website templates with desktop preview — open a product page to buy or request Done-For-You setup.",
  browseTemplatePreviewsCta: "Browse Website Templates",
  productLedNavChip: "Website Templates",
} as const;

export const WEBSITE_TEMPLATE_PREVIEW_FAQ = [
  {
    question: "Is this separate from the main website templates page?",
    answer:
      "Yes. This website preview page is a dedicated showcase while the existing website templates catalog remains connected to Sanity as-is.",
  },
  {
    question: "Can I interact with a real website preview here?",
    answer:
      "Yes. The hero preview is rendered from local template files using the same secure iframe pattern used by the business profile previews.",
  },
  {
    question: "Can this be expanded with more website templates later?",
    answer: "Yes. Additional template files can be added to the preview mapping and immediately surfaced in this page carousel.",
  },
] as const;

export function websiteTemplatePreviewProductName(title: string): string {
  return `${title}${WEBSITE_TEMPLATE_PREVIEW.productNameSuffix}`;
}
