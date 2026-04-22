export type PreviewVariant =
  | "mcp"
  | "marketing"
  | "dashboard"
  | "automation"
  | "mobile"
  | "booking";

export type ShopProduct = {
  slug: string;
  name: string;
  price: string;
  category: string;
  categorySlug: string;
  type: string;
  typeSlug: string;
  industry: string;
  industrySlug: string;
  tag?: string;
  published?: boolean;
  rating?: number;
  reviewCount?: string;
  salesCount?: string;
  teaser: string;
  summary: string;
  audience: string;
  previewVariant: PreviewVariant;
  includes: string[];
  stack: string[];
  highlights: { label: string; value: string }[];
};

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    slug: "concierge-mcp-starter",
    name: "Concierge MCP Starter",
    price: "$249",
    category: "MCP Servers",
    categorySlug: "mcp",
    type: "Internal Tool Starter",
    typeSlug: "internal-tool-starter",
    industry: "AI Operations",
    industrySlug: "ai-operations",
    tag: "New",
    published: false,
    teaser: "A premium MCP starter with auth, tracing, tool scaffolding, and operator-safe defaults.",
    summary:
      "Built for teams who want a fast path to an internal agent surface without inventing the architecture from scratch.",
    audience: "AI product teams, internal platforms, operations enablement",
    previewVariant: "mcp",
    includes: [
      "Typed MCP server scaffold",
      "Signed-session auth starter",
      "Tool registry + tracing hooks",
      "Operator console screens",
      "Deployment checklist",
    ],
    stack: ["TypeScript", "MCP", "Auth.js", "Observability hooks"],
    highlights: [
      { label: "Setup time", value: "< 1 day" },
      { label: "Starter tools", value: "8" },
      { label: "Trace coverage", value: "100%" },
    ],
  },
  {
    slug: "atelier-marketing-theme",
    name: "Atelier Marketing Theme",
    price: "$129",
    category: "Templates",
    categorySlug: "templates",
    type: "Marketing Site",
    typeSlug: "marketing-site",
    industry: "Studios & SaaS",
    industrySlug: "studios-saas",
    tag: "Best seller",
    published: true,
    rating: 4.8,
    reviewCount: "3.2K",
    salesCount: "412",
    teaser: "An editorial Next.js marketing theme with premium typography, modular sections, and launch-ready pacing.",
    summary:
      "For founders and agencies who want a site that feels intentional on day one instead of generic-by-template.",
    audience: "Studios, SaaS launches, design-led service brands",
    previewVariant: "marketing",
    includes: [
      "Homepage + service + case study layouts",
      "Editorial section library",
      "Token-based theme system",
      "Blog and CTA blocks",
      "Performance-first defaults",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    highlights: [
      { label: "Pages", value: "14" },
      { label: "Lighthouse target", value: "95+" },
      { label: "Setup time", value: "2 hrs" },
    ],
  },
  {
    slug: "operator-dashboard-kit",
    name: "Operator Dashboard Kit",
    price: "$189",
    category: "Templates",
    categorySlug: "templates",
    type: "Dashboard Website",
    typeSlug: "dashboard-website",
    industry: "B2B SaaS",
    industrySlug: "b2b-saas",
    tag: "Updated",
    published: true,
    rating: 4.6,
    reviewCount: "1.4K",
    salesCount: "238",
    teaser: "A polished dashboard system for teams shipping internal tools, queues, and KPI-heavy operations surfaces.",
    summary:
      "Made for product teams who need a credible operator UI without spending weeks on table states, charts, and navigation shells.",
    audience: "Ops platforms, internal tools, B2B admin products",
    previewVariant: "dashboard",
    includes: [
      "Analytics dashboard shell",
      "Queue and table states",
      "Command center modules",
      "KPI widgets + alerts",
      "Dark theme presets",
    ],
    stack: ["Next.js", "React", "TypeScript", "Chart-ready components"],
    highlights: [
      { label: "UI modules", value: "24" },
      { label: "Themes", value: "2" },
      { label: "Ready screens", value: "9" },
    ],
  },
  {
    slug: "inquiry-to-crm-automation",
    name: "Inquiry-to-CRM Automation",
    price: "$99",
    category: "Automation kit",
    categorySlug: "automation",
    type: "Lead Routing Kit",
    typeSlug: "lead-routing-kit",
    industry: "Marketing Operations",
    industrySlug: "marketing-operations",
    published: false,
    teaser: "A workflow starter for routing leads, enriching records, and triggering follow-up across your CRM stack.",
    summary:
      "Ideal for teams stuck between form fills, spreadsheets, and delayed follow-up. The kit makes the flow legible before you automate it.",
    audience: "Marketing ops, sales ops, service businesses",
    previewVariant: "automation",
    includes: [
      "Workflow map templates",
      "Lead routing logic",
      "CRM field schema starter",
      "Exception and retry rules",
      "Ops reporting blocks",
    ],
    stack: ["Zapier-ready maps", "HubSpot", "Slack", "Webhook patterns"],
    highlights: [
      { label: "Automations", value: "12" },
      { label: "Handoffs", value: "5" },
      { label: "Review points", value: "3" },
    ],
  },
  {
    slug: "mobile-app-landing-pack",
    name: "Mobile App Landing Pack",
    price: "$149",
    category: "Ready Websites",
    categorySlug: "ready-websites",
    type: "Launch Website",
    typeSlug: "launch-website",
    industry: "Mobile Apps",
    industrySlug: "mobile-apps",
    published: true,
    rating: 4.7,
    reviewCount: "980",
    salesCount: "174",
    teaser: "A launch-focused mobile landing system with app-store panels, feature storytelling, and device-first sections.",
    summary:
      "Useful when the product is mobile-first and the launch site needs to feel like it belongs to a real app team.",
    audience: "Mobile app launches, consumer SaaS, founders shipping MVPs",
    previewVariant: "mobile",
    includes: [
      "Hero + feature strips",
      "Device showcase layouts",
      "Download CTA modules",
      "Pricing + FAQ sections",
      "Social proof variants",
    ],
    stack: ["Next.js", "Responsive UI", "Mobile-first sections"],
    highlights: [
      { label: "Layouts", value: "11" },
      { label: "Breakpoints tuned", value: "6" },
      { label: "CTA variants", value: "8" },
    ],
  },
  {
    slug: "booking-stripe-bundle",
    name: "Booking + Stripe Bundle",
    price: "$229",
    category: "Ready Websites",
    categorySlug: "ready-websites",
    type: "Booking Website",
    typeSlug: "booking-website",
    industry: "Service Businesses",
    industrySlug: "service-businesses",
    tag: "Bundle",
    published: true,
    rating: 4.9,
    reviewCount: "2.1K",
    salesCount: "307",
    teaser: "A service-business starter that combines booking UX, checkout states, and payment-ready operational flows.",
    summary:
      "Designed for service companies that need the front-end polish and the operational structure behind a premium booking flow.",
    audience: "Studios, consultancies, premium service businesses",
    previewVariant: "booking",
    includes: [
      "Booking journey screens",
      "Stripe-ready checkout states",
      "Confirmation and reminder flows",
      "Order summary patterns",
      "Staff handoff screens",
    ],
    stack: ["Stripe", "Calendaring flows", "Next.js", "Email state maps"],
    highlights: [
      { label: "Checkout states", value: "7" },
      { label: "Booking steps", value: "4" },
      { label: "Admin views", value: "5" },
    ],
  },
];

export const SHOP_PRODUCT_BY_SLUG = Object.fromEntries(
  SHOP_PRODUCTS.map((product) => [product.slug, product])
) as Record<string, ShopProduct>;

export const PUBLISHED_SHOP_PRODUCTS = SHOP_PRODUCTS.filter((product) => product.published !== false);

export const SHOP_CATEGORY_OPTIONS = Array.from(
  new Map(PUBLISHED_SHOP_PRODUCTS.map((product) => [product.categorySlug, product.category])).entries(),
  ([value, label]) => ({ value, label })
);

export const SHOP_TYPE_OPTIONS = Array.from(
  new Map(PUBLISHED_SHOP_PRODUCTS.map((product) => [product.typeSlug, product.type])).entries(),
  ([value, label]) => ({ value, label })
);

export const SHOP_INDUSTRY_OPTIONS = Array.from(
  new Map(PUBLISHED_SHOP_PRODUCTS.map((product) => [product.industrySlug, product.industry])).entries(),
  ([value, label]) => ({ value, label })
);

export function getShopProduct(slug: string) {
  return SHOP_PRODUCT_BY_SLUG[slug];
}

export function getCheckoutHref(productOrSlug: ShopProduct | string) {
  const slug = typeof productOrSlug === "string" ? productOrSlug : productOrSlug.slug;
  return `/checkout?product=${slug}`;
}