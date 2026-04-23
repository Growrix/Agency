// Central mock content used across pages. Real data would come from a CMS / API.

export const SERVICES = [
  {
    slug: "websites",
    name: "Websites",
    short: "Premium websites and ready-to-launch fronts built for conversion.",
    long: "From marketing sites and mobile app launch pages to content-heavy hubs and ready websites - built around conversion architecture, clarity, and performance.",
    typical: "Launch sprint or redesign track",
    timeline: "4-10 weeks",
    pillars: ["Conversion architecture", "Design system & motion", "SEO & Core Web Vitals", "CMS handoff"],
  },
  {
    slug: "saas-applications",
    name: "SaaS Applications",
    short: "SaaS and product platforms for web-first and mobile-first teams.",
    long: "Admin panels, user portals, billing, dashboards, and companion mobile experiences built as durable products, not long demos.",
    typical: "MVP sprint to product partnership",
    timeline: "8-24 weeks",
    pillars: ["Product strategy", "Frontend systems", "Billing & auth", "Growth-ready analytics"],
  },
  {
    slug: "mcp-servers",
    name: "MCP Servers",
    short: "Secondary: MCP infrastructure when your product stack needs agents.",
    long: "Secure, observable MCP servers that extend websites, SaaS products, and internal tools when agent workflows are part of the roadmap.",
    typical: "Scoped integration or platform engagement",
    timeline: "3-12 weeks",
    pillars: ["Tool design", "Auth & access", "Observability", "Deployment & ops"],
  },
  {
    slug: "automation",
    name: "Automation",
    short: "Secondary: automation for the workflows around your core product.",
    long: "We map workflows and ship integrations across CRM, payments, support, and content systems when manual operations start slowing delivery.",
    typical: "Audit + implementation + retainer",
    timeline: "2-8 weeks",
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
      "Best frontend partner we've worked with. The website redesign carried our entire Q4 narrative without us pushing copy.",
    author: "Priya Shankar",
    role: "VP Marketing, Lumora",
    metric: "+64% demo bookings",
  },
  {
    quote:
      "They shipped what felt like a polished v3 in a single quarter. The system they handed over runs itself - that's rare.",
    author: "Maya Okonkwo",
    role: "CEO, Tideline Health",
    metric: "+182% activation",
  },
  {
    quote:
      "We went from 'we should launch soon' to taking paid bookings in under two weeks. The ready website felt custom enough that no one guessed it started from a packaged system.",
    author: "Daniel Vargas",
    role: "Founder, Cedar Lane Studio",
    metric: "12-day launch",
  },
];

export const HOME_STATS = [
  { value: "47", label: "Launches shipped", hint: "Websites, SaaS, ready websites" },
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
  { slug: "atelier-marketing-theme", name: "Atelier Marketing Theme", price: "$790", category: "Templates", tag: "Best seller" },
  { slug: "operator-dashboard-kit", name: "Operator Dashboard Kit", price: "$1,850", category: "Templates", tag: "Updated" },
  { slug: "mobile-app-landing-pack", name: "Mobile App Landing Pack", price: "$1,950", category: "Ready Websites" },
  { slug: "booking-stripe-bundle", name: "Booking + Stripe Bundle", price: "$3,900", category: "Ready Websites", tag: "Bundle" },
];

export const PORTFOLIO = [
  {
    slug: "lumora-studio",
    name: "Lumora Studio",
    industry: "Brand & Marketing",
    service: "websites",
    summary: "A premium agency website rebuild with editorial motion, tighter narrative sequencing, and a productized portfolio.",
    metric: "+64% demo bookings",
    accent: "from-amber-500 to-orange-600",
  },
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
    slug: "helix-research-portal",
    name: "Helix Research Portal",
    industry: "Capital Markets",
    service: "websites",
    summary: "A subscriber research hub with secure gating, richer editorial structure, and AI-assisted search.",
    metric: "3.4x dwell time",
    accent: "from-indigo-500 to-violet-600",
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
    slug: "northcrest-mcp",
    name: "Northcrest MCP",
    industry: "B2B Operations",
    service: "mcp-servers",
    summary: "An MCP server connecting CRM, billing, and inventory for an internal ops agent.",
    metric: "5h/week saved per ops lead",
    accent: "from-sky-500 to-blue-600",
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
      "Custom websites usually land in 4-10 weeks. Ready websites can move much faster when the content is clear. SaaS products run 8-24 weeks depending on integrations. MCP and automation work are scoped when they support the main build.",
  },
  {
    question: "Do you handle content, copy, and assets?",
    answer:
      "Yes. Hero rewrites, FAQ updates, case study positioning, and launch-supporting content can be handled as part of the build or as a focused content pass.",
  },
  {
    question: "How do payments work?",
    answer:
      "For international clients, we can offer delivery-first payment with no advance on the first 100 qualifying projects. We also support flexible milestone or custom arrangements when the scope makes sense.",
  },
  {
    question: "Will I own the code?",
    answer: "Yes. On project completion, code, design files, and infrastructure ownership transfer to you.",
  },
  {
    question: "Do you support after launch?",
    answer:
      "Yes. Every delivered site includes 1 year of free support and maintenance covering bug fixes, security updates, and minor content changes. Ongoing packages and growth add-ons are available after that.",
  },
];

// ---------------- BLOG ----------------

export type BlogBodyBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "code"; lang?: string; code: string }
  | { type: "hr" };

export type BlogAuthor = {
  name: string;
  role: string;
  bio: string;
  initials: string;
};

export type BlogComment = {
  id: string;
  author: string;
  initials: string;
  postedAt: string;
  body: string;
  replies?: { id: string; author: string; initials: string; postedAt: string; body: string }[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: BlogAuthor;
  publishedAt: string;
  readMinutes: number;
  accent: string;
  body: BlogBodyBlock[];
  comments: BlogComment[];
};

const BLOG_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

export function formatBlogDate(iso: string): string {
  // Parse YYYY-MM-DD as UTC so SSR and client agree regardless of timezone.
  const [y, m, d] = iso.split("-").map(Number);
  const date = Number.isFinite(y) && Number.isFinite(m) && Number.isFinite(d)
    ? new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1))
    : new Date(iso);
  return BLOG_DATE_FORMATTER.format(date);
}
