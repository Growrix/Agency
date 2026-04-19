// Central mock content used across pages. Real data would come from a CMS / API.

export const SERVICES = [
  {
    slug: "saas-applications",
    name: "SaaS Applications",
    short: "Strategy + engineering for new and rebuilt SaaS products.",
    long: "Admin panels, user portals, billing, dashboards, and AI-assisted features built as a real product, not a long demo.",
    typical: "MVP sprint to product partnership",
    timeline: "8–24 weeks",
    pillars: ["Product strategy", "Frontend systems", "Billing & auth", "Performance & QA"],
  },
  {
    slug: "websites",
    name: "Websites",
    short: "Design-forward sites engineered for conversion and speed.",
    long: "From editorial marketing to launch sites and content-heavy hubs — built around conversion architecture and performance.",
    typical: "Launch sprint or redesign track",
    timeline: "4–10 weeks",
    pillars: ["Design system", "Motion discipline", "SEO & Core Web Vitals", "CMS handoff"],
  },
  {
    slug: "mcp-servers",
    name: "MCP Servers",
    short: "Production-grade Model Context Protocol servers for agents.",
    long: "Secure, observable MCP servers that wrap your APIs, databases, and internal tools so agents can act with confidence.",
    typical: "Scoped integration or platform engagement",
    timeline: "3–12 weeks",
    pillars: ["Tool design", "Auth & access", "Observability", "Deployment & ops"],
  },
  {
    slug: "automation",
    name: "Automation",
    short: "Operational systems that remove repetitive work measurably.",
    long: "We map workflows, design exception logic, and ship integrations across CRMs, payments, support, and content systems.",
    typical: "Audit + implementation + retainer",
    timeline: "2–8 weeks",
    pillars: ["Workflow mapping", "Exception logic", "Integrations", "Observability"],
  },
] as const;

export const SERVICE_BY_SLUG = Object.fromEntries(SERVICES.map((s) => [s.slug, s]));

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery",
    description: "Goals, audience, current systems, and constraints. We surface the real problem before scoping.",
    meta: "Week 1",
  },
  {
    number: "02",
    title: "Strategy & UX",
    description: "Architecture, flows, content priorities, and decision-grade wireframes paired with measurable outcomes.",
    meta: "Weeks 2–3",
  },
  {
    number: "03",
    title: "Design & Build",
    description: "Design system, motion discipline, and engineering iterations shipped behind feature flags as we go.",
    meta: "Weeks 3–10",
  },
  {
    number: "04",
    title: "Launch & Optimize",
    description: "Performance audit, accessibility checks, analytics, and iterative optimization after launch.",
    meta: "Ongoing",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "They shipped what felt like a polished v3 in a single quarter. The system they handed over runs itself — that's rare.",
    author: "Maya Okonkwo",
    role: "CEO, Tideline Health",
    metric: "+182% activation",
  },
  {
    quote:
      "We replaced four spreadsheets and a contractor with one MCP server. Our agent now answers operations questions correctly.",
    author: "Daniel Vargas",
    role: "Head of Ops, Northcrest",
    metric: "5h/week saved",
  },
  {
    quote:
      "Best frontend partner we've worked with. The website redesign carried our entire Q4 narrative without us pushing copy.",
    author: "Priya Shankar",
    role: "VP Marketing, Lumora",
    metric: "+64% demo bookings",
  },
];

export const HOME_STATS = [
  { value: "47", label: "Products shipped", hint: "SaaS, websites, MCP, automation" },
  { value: "6", label: "Years in motion", hint: "Independent studio" },
  { value: "$18M+", label: "Client funding raised", hint: "Post-launch" },
  { value: "98", label: "NPS", hint: "Trailing 12 months" },
];

export const CLIENT_LOGOS = [
  "Tideline Health",
  "Northcrest Operations",
  "Lumora Studio",
  "Glasswing Labs",
  "Helix Capital",
  "Beacon Mobility",
  "Quartz Energy",
  "Sundial Foods",
];

export const FEATURED_PRODUCTS = [
  { name: "Concierge MCP Starter", price: "$249", category: "MCP Servers", tag: "New" },
  { name: "Atelier Marketing Theme", price: "$129", category: "Templates", tag: "Best seller" },
  { name: "Operator Dashboard Kit", price: "$189", category: "Templates", tag: "Updated" },
  { name: "Inquiry-to-CRM Automation", price: "$99", category: "Automation kit" },
  { name: "Mobile App Landing Pack", price: "$149", category: "Templates" },
  { name: "Booking + Stripe Bundle", price: "$229", category: "Automation kit", tag: "Bundle" },
];

export const PORTFOLIO = [
  {
    slug: "tideline-health",
    name: "Tideline Health",
    industry: "Healthcare SaaS",
    service: "saas-applications",
    summary: "A patient onboarding and care plan platform replacing five legacy tools.",
    metric: "+182% activation",
    accent: "from-teal-500 to-emerald-500",
  },
  {
    slug: "northcrest-mcp",
    name: "Northcrest MCP",
    industry: "B2B Operations",
    service: "mcp-servers",
    summary: "An MCP server connecting CRM, billing, and inventory for an internal ops agent.",
    metric: "5h/week saved per ops lead",
    accent: "from-sky-500 to-blue-600",
  },
  {
    slug: "lumora-studio",
    name: "Lumora Studio",
    industry: "Brand & Marketing",
    service: "websites",
    summary: "A premium agency website rebuild with editorial motion and a productized portfolio.",
    metric: "+64% demo bookings",
    accent: "from-amber-500 to-orange-600",
  },
  {
    slug: "glasswing-onboarding",
    name: "Glasswing Onboarding",
    industry: "Fintech SaaS",
    service: "saas-applications",
    summary: "A KYC + onboarding flow that compresses approval to under 90 seconds.",
    metric: "92s avg approval",
    accent: "from-purple-500 to-fuchsia-500",
  },
  {
    slug: "beacon-route-engine",
    name: "Beacon Route Engine",
    industry: "Mobility",
    service: "automation",
    summary: "Automated dispatch + driver SMS pipeline tied to live shift availability.",
    metric: "−38% no-shows",
    accent: "from-rose-500 to-pink-600",
  },
  {
    slug: "helix-research-portal",
    name: "Helix Research Portal",
    industry: "Capital Markets",
    service: "websites",
    summary: "A long-form research site with secure subscriber gating and AI search.",
    metric: "3.4x dwell time",
    accent: "from-indigo-500 to-violet-600",
  },
];

export const PORTFOLIO_BY_SLUG = Object.fromEntries(PORTFOLIO.map((p) => [p.slug, p]));

export const FAQ_GENERAL = [
  {
    question: "How do projects typically start?",
    answer:
      "Most engagements begin with a 30-minute discovery call. We summarize the problem, propose scope, and share a written plan within 48 hours. Nothing is signed until the plan reads correctly to you.",
  },
  {
    question: "What is your typical timeline?",
    answer:
      "Websites land in 4–10 weeks. SaaS products in 8–24 weeks depending on integrations. MCP servers in 3–12 weeks. Automation work often ships in under a month.",
  },
  {
    question: "Do you handle content, copy, and assets?",
    answer:
      "We can. Content production is offered as an add-on for marketing sites. For SaaS work, we collaborate with your team or designate a content lead inside the engagement.",
  },
  {
    question: "How do payments work?",
    answer:
      "We use a milestone-based model with a 30% kickoff deposit. Productized offers in the shop are charged once via Stripe at checkout.",
  },
  {
    question: "Will I own the code?",
    answer: "Yes. On project completion, code, design files, and infrastructure ownership transfer to you.",
  },
  {
    question: "Do you support after launch?",
    answer:
      "Yes. We offer support retainers covering maintenance, performance, security patches, and feature delivery on a predictable cadence.",
  },
];
