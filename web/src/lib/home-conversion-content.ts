export const HERO_TRUST_PILLS = [
  "100+ Ready-Made Templates",
  "Custom Development Available",
  "AI-Powered Business Systems",
  "Built for Startups & Agencies",
] as const;

export const HOME_HERO_HIGHLIGHTS = [
  { label: "100+ Ready-Made Templates", icon: "cube" as const },
  { label: "Custom Development Available", icon: "code" as const },
  { label: "Built for Startups & Agencies", icon: "users" as const },
  { label: "Secure & Scalable Systems", icon: "shield" as const },
] as const;

export const HOME_HERO_COPY = {
  badge: "Productized SaaS studio + digital marketplace",
  titleLines: ["Launch faster.", "Scale smarter."],
  titleAccent: "Grow with confidence.",
  description:
    "Access production-ready systems, powerful digital products, and expert growth support — all in one place.",
  /** Mobile hero — balanced for two lines at ~390px with token typography. */
  mobileDescriptionLines: [
    "Production-ready systems, digital products,",
    "and expert growth support — all in one place.",
  ],
  primaryCta: "Browse Digital Products",
  primaryCtaHref: "/digital-products",
  secondaryCta: "Book a Free Consultation",
  secondaryCtaHref: "/book-appointment",
} as const;

export const HOME_HERO_SOCIAL_PROOF = {
  ratingLabel: "Rated by growing businesses",
  reviewLinks: [
    { label: "Google Reviews", href: "#home-google-reviews" },
    { label: "Trustpilot Reviews", href: "https://www.trustpilot.com", external: true },
  ],
} as const;

/** SVG stack logos shown in the homepage hero trust panel. */
export const HOME_HERO_STACK_LOGOS = [
  { name: "FastAPI", src: "/images/logos/logo%20library-512/svg/FastAPI.svg", width: 28, height: 28 },
  { name: "Next.js", src: "/images/logos/logo%20library-512/svg/Next.js.svg", width: 28, height: 28 },
  { name: "Python", src: "/images/logos/logo%20library-512/svg/Python.svg", width: 28, height: 28 },
  { name: "React", src: "/images/logos/logo%20library-512/svg/React.svg", width: 28, height: 28 },
  { name: "TypeScript", src: "/images/logos/logo%20library-512/svg/TypeScript.svg", width: 28, height: 28 },
  { name: "Django", src: "/images/logos/logo%20library-512/svg/Django.svg", width: 28, height: 28 },
] as const;

export const HOME_HERO_TECH_STACK = {
  label: "Powered by technologies we trust",
  logos: HOME_HERO_STACK_LOGOS,
} as const;

/** @deprecated Use HOME_HERO_STACK_LOGOS */
export const HOME_HERO_TRUSTED_NAMES = HOME_HERO_STACK_LOGOS.map((logo) => logo.name);

/** @deprecated Use HOME_HERO_STACK_LOGOS */
export const HOME_HERO_TRUSTED_LOGOS = HOME_HERO_STACK_LOGOS;

export const HOME_SERVICES_COPY = {
  eyebrow: "Services",
  title: "Solutions built for modern businesses",
  titleLead: "Solutions built for",
  titleAccent: "modern businesses",
  description:
    "From SaaS platforms to AI-powered workflows, we design and build products that solve real business problems.",
  compareCta: "Compare all services",
  compareCtaHref: "/services",
} as const;

export const HOME_SERVICE_OUTCOME_DESCRIPTIONS: Record<string, string> = {
  websites: "Launch production-ready digital experiences without months of development.",
  "saas-applications": "Ship revenue-ready SaaS products with auth, billing, and growth systems built in.",
  "mobile-apps": "Turn mobile ideas into credible launch experiences that convert downloads into users.",
  automation: "Eliminate repetitive tasks and free up your team to focus on growth.",
  "technical-seo": "Get discovered faster with search, analytics, and performance tuned from day one.",
  "ai-business-systems": "Implement AI assistants, knowledge systems, and workflows that improve operations—not hype.",
};

export const HOME_TEMPLATES_MARKETPLACE_COPY = {
  eyebrow: "Templates marketplace",
  title: "Launch weeks faster using proven systems.",
  titleLead: "Launch weeks faster using",
  titleAccent: "proven systems.",
  description:
    "Browse category-based business profiles and website templates you can preview, purchase, and launch without starting from scratch.",
  previewProfilesCta: "Preview all profiles",
  previewProfilesHref: "/digital-products/category/html-business-profiles",
  browseTemplatesCta: "Browse templates",
  browseTemplatesHref: "/digital-products/category/website-templates-html-preview",
} as const;

export const HOME_PREVIEW_COPY = {
  eyebrow: "See every experience",
  title: "See every experience before you launch.",
  titleLead: "See every experience",
  titleAccent: "before you launch.",
  description:
    "Preview desktop and mobile versions side-by-side to ensure your website, portal, or application looks and performs exactly as intended.",
} as const;

export const HOME_FIELD_NOTES_COPY = {
  eyebrow: "Blog",
  title: "Long-form writing from the studio.",
  titleLead: "Long-form writing from",
  titleAccent: "the studio.",
  description:
    "Engineering deep-dives, design system reflections, and quarterly notes on what we shipped.",
  ctaLabel: "Visit the blog",
  ctaHref: "/blog",
} as const;

export const HOME_FOOTER_COPY = {
  responseLabel: "Average response time",
  responseValue: "Under 2 business hours",
  tagline: "Built deliberately. Shipped with care.",
} as const;

export const HOME_CASE_STUDY_TABS = [
  { id: "website-projects", label: "Website projects" },
  { id: "about-product", label: "About this product" },
] as const;

export const HOME_DIGITAL_PRODUCTS_CONVERSION_COPY = {
  eyebrow: "Digital products",
  title: "Launch proven digital products in days, not months.",
  titleLead: "Launch proven digital products in",
  titleAccent: "days, not months.",
  description:
    "Ready-made business systems, client portals, directories, dashboards, and niche applications designed to accelerate growth.",
  ctaLabel: "Open full catalog",
} as const;

export const HOME_READY_MADE_SOLUTIONS_COPY = {
  eyebrow: "Ready-made solutions",
  title: "Explore Ready-Made Solutions",
  titleLead: "Explore Ready-Made",
  titleAccent: "Solutions",
  description:
    "Browse professionally built systems designed to help businesses launch faster, operate smarter, and scale with confidence.",
} as const;

export const HOME_FEATURED_TEMPLATES_COPY = {
  eyebrow: "Featured templates",
  title: "Built on systems that scale",
  titleLead: "Built on systems that",
  titleAccent: "scale",
  description:
    "Reduce development time without compromising quality, performance or flexibility.",
} as const;

export const HOME_THREE_PATH_COPY = {
  eyebrow: "Choose your path",
  title: "Choose the way you want to build.",
  titleLead: "Choose the way you want",
  titleAccent: "to build.",
  description:
    "Whether you want to launch yourself, work alongside experts, or hand everything off, GrowrixOS adapts to your workflow.",
} as const;

export const HOME_THREE_PATH_CARDS = [
  {
    title: "Buy & Launch",
    description: "Perfect for founders and teams who want a fast start.",
    bullets: ["Instant access", "Ready-made templates", "Self implementation"],
    cta: { label: "Explore Templates", href: "/digital-products/category/website-templates-html-preview" },
    icon: "rocket-launch",
  },
  {
    title: "Guided Setup",
    description: "Work with experts to launch faster and avoid costly mistakes.",
    bullets: ["Setup support", "Integrations", "Optimization guidance"],
    cta: { label: "Book Consultation", href: "/book-appointment" },
    featured: true,
    icon: "users",
  },
  {
    title: "Custom Build",
    description: "A complete solution tailored to your business goals.",
    bullets: ["Custom development", "Full implementation", "Ongoing support"],
    cta: { label: "Start Project", href: "/contact?intent=custom_build" },
    icon: "code-bracket",
  },
] as const;

export const HOME_CASE_STUDIES_COPY = {
  eyebrow: "Case studies",
  title: "Proof from launches that moved the needle.",
  titleLead: "Proof from launches that",
  titleAccent: "moved the needle.",
  description:
    "Real outcomes from product buyers and service clients—launch-ready quality, clear communication, and measurable growth.",
} as const;

export const HOME_OPERATING_SYSTEM_COPY = {
  eyebrow: "Operating system",
  title: "An operating system you can plan launches around.",
  titleLead: "An operating system you can",
  titleAccent: "plan launches around.",
  description:
    "Every engagement runs through a clear phase model with explicit outputs, so you always know what ships next.",
} as const;

export const HOME_AI_COPY = {
  eyebrow: "AI Growrix OS",
  title: "Make better decisions and move faster with AI-powered assistance.",
  titleLead: "Make better decisions and",
  titleAccent: "move faster with AI-powered assistance.",
  description:
    "Ask about scope, pricing, product fit, or timelines before you book—then route into the right product or service path.",
  privacyNote: "Conversations are private and never used to train models.",
  quickReplies: ["Show timelines", "Team & rates", "Talk to a human"] as const,
  highlights: [
    { label: "Private", description: "Secure by design" },
    { label: "Fast routing", description: "Right path, faster" },
    { label: "Expert guided", description: "Human handoff when needed" },
    { label: "No spam", description: "Never used to train models" },
  ] as const,
} as const;

export const HOME_AI_DEMO_SCRIPT = {
  turns: [
    {
      user: "Hey — I'm thinking about rebuilding our SaaS dashboard. We're 12 people, 8k MAUs.",
      assistant:
        "That sounds like a Product Partner engagement. We typically scope these in a 1-week discovery sprint. Want timelines and team sizing?",
    },
    {
      user: "What does a typical SaaS MVP timeline look like for a team our size?",
      assistant:
        "Most MVPs in the 8k–15k MAU range ship in 10–14 weeks with a dedicated squad. I can outline phases and investment ranges if helpful.",
    },
  ],
  quickReplies: HOME_AI_COPY.quickReplies,
} as const;

export const HOME_TESTIMONIALS_COPY = {
  eyebrow: "Proof",
  title: "Teams that shipped with GrowrixOS",
  titleLead: "Teams that shipped with",
  titleAccent: "GrowrixOS",
  description:
    "Product buyers and service clients share the same bar — launch-ready quality, clear communication, and measurable outcomes.",
} as const;

export const HOME_FINAL_CTA_MOBILE_COPY = {
  titleLead: "Browse ready-made assets or",
  titleAccent: "book a free consultation.",
} as const;

export const HOME_FINAL_CTA_FEATURES = [
  { label: "Instant Access", description: "Buy and get instant digital delivery." },
  { label: "Expert Guidance", description: "Speak with our team and get the right path." },
  { label: "Built to Scale", description: "Launch with confidence and grow faster." },
] as const;
