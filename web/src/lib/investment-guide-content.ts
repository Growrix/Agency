export const INVESTMENT_GUIDE_HERO = {
  eyebrow: "Investment guide",
  title: "Choose the investment path that fits your goals.",
  titleLead: "Choose the investment path",
  titleAccent: "that fits your goals.",
  description:
    "Whether you're purchasing a ready-made digital product, launching with implementation support, or building a custom platform, we'll help you choose the right path.",
  primaryCta: "Browse Digital Products",
  primaryHref: "/digital-products",
  secondaryCta: "Book Strategy Call",
  secondaryHref: "/book-appointment",
} as const;

export const INVESTMENT_HERO_PANEL = {
  pathsEyebrow: "Three starting paths",
  rangesEyebrow: "Typical service ranges",
  decisionEyebrow: "Decide based on",
  decisions: [
    { label: "Budget" },
    { label: "Timeline" },
    { label: "Scope" },
  ],
  viewAllLabel: "View full service ranges",
  viewAllHref: "#service-investment-ranges",
} as const;

export const INVESTMENT_STARTING_POINTS = {
  eyebrow: "Starting points",
  title: "Three ways businesses typically work with GrowrixOS.",
  titleLead: "Three ways to work",
  titleAccent: "with GrowrixOS.",
  description: "Choose the path that best matches your current stage, budget, and goals.",
  cards: [
    {
      title: "Digital Products",
      investment: "From $15–$399",
      description:
        "Ready-made websites, SaaS starters, business profiles, templates, and launch kits designed to help you move quickly.",
      bestFor: ["Fast launches", "DIY implementation", "Small budgets", "Validating ideas"],
      cta: { label: "Browse Products", href: "/digital-products" },
    },
    {
      title: "Done-For-You Setup",
      investment: "From $299–$1,500+",
      description:
        "Implementation, customization, deployment, and launch support for businesses that want results without managing technical details.",
      bestFor: ["Faster implementation", "Launch support", "Small business websites", "Product deployment"],
      cta: { label: "Explore Services", href: "/services" },
      featured: true,
    },
    {
      title: "Custom Builds",
      investment: "From $1,500–$25,000+",
      description:
        "Custom websites, SaaS applications, mobile apps, automation systems, and AI implementations tailored to specific business requirements.",
      bestFor: ["Unique requirements", "Business systems", "Product development", "Long-term growth"],
      cta: { label: "Book Consultation", href: "/book-appointment" },
    },
  ],
} as const;

export const INVESTMENT_SERVICE_RANGES = {
  eyebrow: "Service investment ranges",
  title: "Typical investment ranges by service.",
  description:
    "These ranges provide guidance only. Final pricing depends on scope, complexity, integrations, and delivery requirements.",
  services: [
    {
      title: "Technical SEO",
      investment: "$750 – $1,500+",
      description: "Search visibility, analytics, schema, and technical foundations.",
      href: "/services/technical-seo",
    },
    {
      title: "Automation",
      investment: "$1,500 – $5,000+",
      description: "Workflow automation, integrations, and operational systems.",
      href: "/services/automation",
    },
    {
      title: "AI Business Systems",
      investment: "$1,500 – $5,000+",
      description: "Knowledge systems, AI assistants, and operational AI workflows.",
      href: "/services/ai-business-systems",
    },
    {
      title: "Websites",
      investment: "$500 – $15,000+",
      description: "Professional business websites and lead-generation platforms.",
      href: "/services/websites",
    },
    {
      title: "Mobile Apps",
      investment: "$6,500 – $14,000+",
      description: "Companion apps, customer portals, and mobile-first products.",
      href: "/services/mobile-apps",
    },
    {
      title: "SaaS Applications",
      investment: "$9,500 – $18,000+",
      description: "Custom software products, platforms, and scalable systems.",
      href: "/services/saas-applications",
    },
  ],
} as const;

export const INVESTMENT_DELIVERY_COMPARISON = {
  eyebrow: "Delivery comparison",
  title: "Which path fits your situation?",
  paths: [
    {
      title: "Digital Products",
      highlights: ["Fastest path", "Lowest investment", "Self-managed", "Best for quick launches"],
    },
    {
      title: "Done-For-You Setup",
      highlights: ["Moderate investment", "Implementation support", "Faster launch", "Business-friendly"],
      featured: true,
    },
    {
      title: "Custom Builds",
      highlights: ["Highest flexibility", "Tailored systems", "Scalable architecture", "Long-term growth"],
    },
  ],
} as const;

export const INVESTMENT_PROJECT_SCOPING = {
  eyebrow: "Project scoping",
  title: "What affects project investment?",
  factors: [
    {
      question: "Scope complexity",
      answer: "More functionality requires additional planning, development, and testing.",
    },
    {
      question: "Integrations",
      answer: "External systems, APIs, payments, automation, and third-party services increase implementation effort.",
    },
    {
      question: "Timeline requirements",
      answer: "Accelerated timelines may require additional resources.",
    },
    {
      question: "Post-launch support",
      answer: "Ongoing optimization, maintenance, and enhancements affect total investment.",
    },
    {
      question: "Team involvement",
      answer: "Collaborative projects often move faster and more efficiently.",
    },
  ],
} as const;

export const INVESTMENT_CLIENT_JOURNEYS = {
  eyebrow: "Client journeys",
  title: "How businesses typically grow with GrowrixOS.",
  journeys: [
    {
      persona: "Startup Founder",
      steps: ["Digital Product", "Website", "SaaS Build"],
    },
    {
      persona: "Local Business",
      steps: ["Website Template", "Done-For-You Setup", "Technical SEO"],
    },
    {
      persona: "Growing Team",
      steps: ["Automation", "AI Business Systems", "Custom Internal Tools"],
    },
  ],
} as const;

export const INVESTMENT_GUIDE_FAQ = [
  {
    question: "Which option is right for me?",
    answer:
      "It depends on your stage, budget, and goals. Digital products suit fast DIY launches. Done-For-You setup fits businesses that want implementation support. Custom builds are best when requirements, integrations, or product scope need tailored delivery. A strategy call helps map the right starting point.",
  },
  {
    question: "Can I start with a digital product and upgrade later?",
    answer:
      "Yes. Many clients purchase a template or starter kit first, then move into Done-For-You setup or custom development as requirements grow.",
  },
  {
    question: "Do you offer staged projects?",
    answer:
      "Yes. Larger engagements are often phased—starting with foundations like a website or SEO setup, then adding automation, AI systems, or product features in later stages.",
  },
  {
    question: "How are custom projects priced?",
    answer:
      "Custom projects are scoped after discovery. Pricing reflects functionality, integrations, timeline, and delivery requirements—not a one-size-fits-all package.",
  },
  {
    question: "Do you offer payment milestones?",
    answer:
      "Yes. Milestone-based payments are available for scoped projects. Terms are agreed before work begins so delivery stays predictable.",
  },
  {
    question: "Are consultations free?",
    answer:
      "Strategy and discovery calls are complimentary for qualified projects. They help clarify goals, recommend the right path, and outline next steps before any commitment.",
  },
  {
    question: "What happens during discovery?",
    answer:
      "We review your goals, audience, current systems, constraints, and success criteria—then outline a recommended path, scope direction, and realistic timeline.",
  },
  {
    question: "Can pricing change during a project?",
    answer:
      "If scope expands materially, we re-estimate transparently and confirm changes before additional work proceeds. The goal is no surprises.",
  },
  {
    question: "Do you provide post-launch support?",
    answer:
      "Yes. Support, optimization, and growth engagements are available after launch—including maintenance, improvements, and ongoing product development.",
  },
  {
    question: "Can multiple services be combined?",
    answer:
      "Yes. Most clients combine complementary services—such as Website + Technical SEO, or Automation + AI Business Systems—for stronger outcomes.",
  },
] as const;

export const INVESTMENT_GUIDE_CTA = {
  title: "Not sure which investment path fits?",
  titleLead: "Not sure which",
  titleAccent: "investment path fits?",
  description:
    "Book a strategy call and we'll recommend the fastest, most cost-effective route based on your goals, timeline, and requirements.",
  primaryCta: "Book Strategy Call",
  primaryHref: "/book-appointment",
  secondaryCta: "Browse Products",
  secondaryHref: "/digital-products",
} as const;
