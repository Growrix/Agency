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
    cta: { label: "Browse products", href: "/products" },
  },
  {
    visitor: "Non-technical owner",
    want: "Setup and customization",
    funnel: "Product page → Done-For-You tier → Service request → Book call",
    cta: { label: "See customization", href: "/services/template-customization" },
  },
  {
    visitor: "Serious founder",
    want: "Full SaaS or web build",
    funnel: "Solutions page → Service detail → Discovery call",
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

export const PRODUCT_CATEGORY_CHIPS = [
  { label: "All products", href: "/products" },
  { label: "HTML templates", href: "/products/category/html-business-profiles" },
  { label: "Website templates", href: "/products/category/website-templates" },
  { label: "Business profile pages", href: "/products/category/business-profile-pages" },
  { label: "Digital business cards", href: "/products/category/digital-business-cards" },
  { label: "Newsletter templates", href: "/products/category/newsletter-templates" },
  { label: "Course landing pages", href: "/products/category/course-landing-pages" },
  { label: "Bundles", href: "/products/bundles" },
  { label: "Free starters", href: "/products/free" },
] as const;

export type SolutionAudience = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  pains: string[];
  offers: { title: string; description: string; href: string }[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export const SOLUTION_AUDIENCES: SolutionAudience[] = [
  {
    slug: "for-startups",
    eyebrow: "For startups",
    title: "Launch faster with SaaS templates and MVP support",
    description:
      "Start with a production-ready SaaS landing page or Next.js starter, then upgrade to Done-For-You setup or a scoped MVP build when traction demands it.",
    pains: [
      "Need to validate before hiring a full product team",
      "Want auth, pricing, and dashboard patterns without reinventing them",
      "Need a credible site live in days, not months",
    ],
    offers: [
      { title: "SaaS landing templates", description: "From $49 — marketing site with pricing and FAQ.", href: "/products" },
      { title: "Next.js SaaS starters", description: "From $99 — auth-ready foundation with docs.", href: "/products" },
      { title: "MVP build scope", description: "Discovery-based custom SaaS engineering.", href: "/services/saas-applications" },
    ],
    primaryCta: { label: "Browse SaaS products", href: "/products" },
    secondaryCta: { label: "Book startup consult", href: "/book-appointment" },
  },
  {
    slug: "for-local-businesses",
    eyebrow: "For local businesses",
    title: "Business profile templates with optional full setup",
    description:
      "Buy category-specific HTML business profiles, preview before purchase, and choose Done-For-You branding, deployment, and form integration when you need hands-on help.",
    pains: [
      "No in-house developer to customize a template",
      "Need a professional web presence quickly",
      "Want contact forms and hosting connected properly",
    ],
    offers: [
      { title: "HTML business profiles", description: "From $19 — responsive category templates.", href: "/products/category/html-business-profiles" },
      { title: "Category storefront", description: "Browse featured templates, pricing tiers, and launch options.", href: "/products/category/html-business-profiles" },
      { title: "Done-For-You setup", description: "From $299 — branding, deploy, and forms.", href: "/services/template-customization" },
    ],
    primaryCta: { label: "Browse business templates", href: "/products/category/html-business-profiles" },
    secondaryCta: { label: "Request setup help", href: "/services/template-customization" },
  },
  {
    slug: "for-agencies",
    eyebrow: "For agencies",
    title: "White-label templates and delivery systems",
    description:
      "Resell or deploy website templates, automation kits, and MCP tooling for client work — with optional GrowrixOS customization and implementation support.",
    pains: [
      "Client projects need faster starting points",
      "Delivery quality must stay consistent across engagements",
      "Custom automation and agent tooling are becoming table stakes",
    ],
    offers: [
      { title: "Template bundles", description: "Multi-product packs for agency delivery.", href: "/products/bundles" },
      { title: "Automation services", description: "Workflow design and integration support.", href: "/services/automation" },
      { title: "MCP server development", description: "Agent-ready tooling for client stacks.", href: "/services/mcp-servers" },
    ],
    primaryCta: { label: "View agency bundles", href: "/products/bundles" },
    secondaryCta: { label: "Discuss agency workflow", href: "/contact" },
  },
  {
    slug: "for-saas-founders",
    eyebrow: "For SaaS founders",
    title: "Starters, SEO kits, and technical implementation",
    description:
      "Combine SaaS starters, technical SEO toolkits, and implementation services to ship a credible product surface and growth foundation in one motion.",
    pains: [
      "Marketing site and app shell need to ship together",
      "Technical SEO and schema are easy to defer but costly later",
      "Need a partner who understands product-led delivery",
    ],
    offers: [
      { title: "SaaS Founder Bundle", description: "Landing + starter + SEO components.", href: "/products/bundles" },
      { title: "Technical SEO kits", description: "From $19 — checklists and Next.js SEO components.", href: "/products" },
      { title: "SEO implementation", description: "Audit and implementation services.", href: "/additional-services" },
    ],
    primaryCta: { label: "Browse founder products", href: "/products/bundles" },
    secondaryCta: { label: "Book technical review", href: "/book-appointment" },
  },
];

export const SOLUTION_BY_SLUG = Object.fromEntries(
  SOLUTION_AUDIENCES.map((solution) => [solution.slug, solution]),
) as Record<string, SolutionAudience>;
