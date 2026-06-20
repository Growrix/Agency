/** User-facing copy for website template preview products — no "HTML preview" in UI. */

export const WEBSITE_TEMPLATE_PREVIEW = {
  categoryNavLabel: "Website Templates with Live Preview",
  categoryNavDescription: "Preview-first website templates with embedded live website preview.",
  categoryPageTitle: "Website Templates with Live Preview",
  categoryPageDescription:
    "Browse website templates with embedded desktop and mobile live previews. Inspect each template live, then purchase or request Done-For-You setup.",
  productCategoryLabel: "Website Templates with Live Preview",
  previewBadge: "Live Preview",
  livePreviewLabel: "Live preview",
  livePreviewChip: "Live preview",
  livePreviewChipHint: "Real pages in-frame",
  livePreviewAtFullWidth: "Live preview at full width — judge spacing and brand feel before you buy",
  scrollLivePreviewCopy: (width: number) =>
    `Scroll the live preview at ${width}px. The layout you preview is the template you can launch.`,
  sameAsDesktopCopy: "Same website as desktop.",
  productNameSuffix: " — Live Preview",
  browseCollectionCta: "Browse Live Preview Collection",
  browseCategoryCta: "Browse Live Preview Category",
  statPreviewsLabel: "Live Previews",
  catalogSectionTitle: "Website preview templates you can buy right now",
  catalogSectionDescription:
    "Live website templates in a compact grid — preview in-frame, then open the product page to buy.",
  heroBadge: "Live Preview",
  heroTitle: "Website templates with embedded live preview.",
  heroDescription:
    "This page mirrors the website templates experience but focuses on direct preview-first discovery.",
  faqTitle: "Live preview page questions, answered.",
  bottomCtaCopy:
    "Start from this live preview flow, then move into customization or full implementation with our team",
  relatedProductsCopy: "Browse more website template previews from this category.",
  showcaseDescription:
    "This section is preview-first by design, so users can inspect the same website template in desktop and mobile form before moving into purchase or customization.",
  shopSpotlightEyebrow: "Website templates with live preview",
  shopSpotlightDescription:
    "Browse website templates with embedded desktop previews — open a product page to buy or request Done-For-You setup.",
  browseTemplatePreviewsCta: "Browse template previews",
  productLedNavChip: "Website templates with live preview",
} as const;

export const WEBSITE_TEMPLATE_PREVIEW_FAQ = [
  {
    question: "Is this separate from the main website templates page?",
    answer:
      "Yes. This preview page is a dedicated website showcase while the existing website templates page remains connected to Sanity as-is.",
  },
  {
    question: "Can I interact with a real live preview here?",
    answer:
      "Yes. The hero preview is rendered from local template files using the same secure iframe pattern used by the business profile previews.",
  },
  {
    question: "Can this be expanded with more live previews later?",
    answer: "Yes. Additional template files can be added to the preview mapping and immediately surfaced in this page carousel.",
  },
] as const;

export function websiteTemplatePreviewProductName(title: string): string {
  return `${title}${WEBSITE_TEMPLATE_PREVIEW.productNameSuffix}`;
}
