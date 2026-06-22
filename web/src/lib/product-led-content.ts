import { WEBSITE_TEMPLATE_PREVIEW } from "@/lib/preview-terminology";

export const TRUST_BAR_ITEMS = [
  { label: "Production-ready products", value: "Templates, starters, and toolkits" },
  { label: "Done-For-You setup", value: "From $299" },
  { label: "Typical response", value: "Under 24 hours" },
  { label: "Secure checkout", value: "Stripe-powered" },
] as const;

export const THREE_PATH_ROWS = [
  {
    visitor: "DIY buyer",
    want: "Template or toolkit",
    funnel: "Browse product → Standard/Premium tier → Checkout → Dashboard download",
    cta: { label: "Browse digital products", href: "/digital-products" },
  },
  {
    visitor: "Non-technical owner",
    want: "Setup and customization",
    funnel: "Product page → Done-For-You tier → Service request → Book call",
    cta: { label: "Request setup", href: "/book-appointment" },
  },
  {
    visitor: "Serious founder",
    want: "Full SaaS or web build",
    funnel: "Services page → Service detail → Discovery call",
    cta: { label: "Book consultation", href: "/book-appointment" },
  },
  {
    visitor: "Curious visitor",
    want: "Quick answers",
    funnel: "AI assistant or WhatsApp → Qualified lead → Follow-up",
    cta: { label: "Ask AI assistant", href: "/ai-concierge" },
  },
] as const;

export const PRODUCT_INDEX_COPY = {
  title: "Digital products for faster launches",
  description:
    "Browse HTML templates, SaaS starters, AI toolkits, MCP kits, and SEO packs. Pick Standard for self-serve, Premium for expanded packages, or Done-For-You when you want us to set it up.",
  eyebrow: "Marketplace",
} as const;

export const HOME_DIGITAL_PRODUCTS_COPY = {
  eyebrow: "Digital products",
  title: "Shop templates and toolkits",
  description: "Filter the catalog and preview a short list — open the full shop when you are ready to buy.",
  ctaLabel: "Open full catalog",
} as const;

export const PRODUCT_CATEGORY_CHIPS = [
  { label: "All Digital Products", href: "/digital-products" },
  { label: "HTML Business Profiles", href: "/digital-products/category/html-business-profiles" },
  { label: WEBSITE_TEMPLATE_PREVIEW.categoryNavLabel, href: "/digital-products/category/website-templates-html-preview" },
] as const;
