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

export const SHOP_DESKTOP_COPY = {
  breadcrumbs: { home: "Home", current: "Digital Products" },
  hero: {
    eyebrow: "Digital Products",
    titleLead: "Ready-to-launch digital products",
    titleAccent: "built for real results.",
    description:
      "High-performance templates, SaaS starters, and automation systems designed to help you launch faster, convert better, and scale with confidence.",
    features: [
      { label: "Instant Download", icon: "download" as const },
      { label: "Secure & Reliable", icon: "shield" as const },
      { label: "Lifetime Updates", icon: "refresh" as const },
    ],
    primaryCta: { label: "Browse All Products", href: "#shop-catalog" },
    secondaryCta: { label: "How it works", href: "/services" },
  },
  stats: [
    { label: "Premium Products", icon: "cube" as const, valueKey: "productCount" as const },
    { label: "Happy Customers", icon: "users" as const, value: "8,000+" },
    { label: "Average Rating", icon: "star" as const, value: "4.9/5" },
    { label: "Support & Updates", icon: "support" as const, value: "24/7" },
  ],
  catalog: {
    allTabLabel: "All Products",
    filterTitle: "Filter Products",
    clearAll: "Clear all",
    showingTemplate: "Showing {start}–{end} of {total} products",
    sortLabel: "Sort by",
    sortOptions: [
      { value: "popular", label: "Popular" },
      { value: "price-asc", label: "Price: Low to High" },
      { value: "price-desc", label: "Price: High to Low" },
      { value: "name", label: "Name A–Z" },
    ] as const,
    bundlePromo: {
      title: "Looking for a bundle?",
      description: "Save when you buy curated product bundles tailored for faster launches.",
      ctaLabel: "Explore Bundles",
      ctaHref: "/digital-products/bundles",
    },
    emptyTitle: "No products match those filters.",
    emptyDescription: "Clear a filter to see more of the catalog.",
    resetLabel: "Reset filters",
  },
  valueProps: [
    {
      title: "Built for Speed",
      description: "Launch in hours, not weeks — every product ships production-ready.",
      icon: "bolt" as const,
    },
    {
      title: "Premium Quality",
      description: "Clean code, modern design, and scalable architecture out of the box.",
      icon: "sparkles" as const,
    },
    {
      title: "Secure & Reliable",
      description: "Tested, documented, and ready for real-world deployment.",
      icon: "shield" as const,
    },
    {
      title: "One-time Payment",
      description: "No monthly fees. Own it forever with lifetime updates included.",
      icon: "wallet" as const,
    },
  ],
  finalCta: {
    eyebrow: "Need something custom?",
    titleLead: "Can't find the perfect",
    titleAccent: "fit?",
    title: "Can't find the perfect fit?",
    description:
      "Let's build a custom solution designed specifically for your business goals, brand, and launch timeline.",
    primary: { label: "Book a Free Call", href: "/book-appointment" },
    secondary: { label: "Request Custom Quote", href: "/contact" },
  },
} as const;

export const SHOP_MARKETPLACE_COPY = {
  caps: {
    maxFeatured: 4,
    maxPremium: 3,
    maxNew: 3,
    maxBundles: 2,
  },
  curatedSlugs: {
    featured: [] as string[],
    premium: [] as string[],
    newArrivals: [] as string[],
    bundles: [] as string[],
  },
  bands: {
    featured: {
      id: "featured" as const,
      eyebrow: "Editor's picks",
      title: "Featured templates",
      description: "High-trust products chosen for launch speed and conversion quality.",
      seeAllHref: "/digital-products",
      seeAllLabel: "See all",
      gridColumns: 2 as const,
    },
    premium: {
      id: "premium" as const,
      eyebrow: "Premium tier",
      title: "Premium collection",
      description: "Expanded packages with Standard, Premium, and Done-For-You options.",
      seeAllHref: "/digital-products",
      seeAllLabel: "See all",
      gridColumns: 3 as const,
      badgeLabel: "Premium",
    },
    newArrivals: {
      id: "new" as const,
      eyebrow: "Just added",
      title: "New arrivals",
      description: "Fresh releases added to the marketplace this season.",
      seeAllHref: "/digital-products",
      seeAllLabel: "See all",
      gridColumns: 3 as const,
    },
    bundles: {
      id: "bundles" as const,
      eyebrow: "Save more",
      title: "Bundle spotlight",
      description: "Curated product bundles for faster launches at a better value.",
      seeAllHref: "/digital-products/bundles",
      seeAllLabel: "Explore bundles",
      gridColumns: 2 as const,
    },
    allProducts: {
      title: "All products",
      description: "Browse the full catalog with website previews.",
    },
  },
  mobile: {
    filterLabel: "Filters",
    clearAllLabel: "Clear all",
    resultsLabel: "results",
    drawerTitle: "Filters",
    doneForYouCta: { label: "Need Done-For-You setup?", href: "/book-appointment" },
  },
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
