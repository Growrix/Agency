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
  { slug: "atelier-marketing-theme", name: "Atelier Marketing Theme", price: "$129", category: "Templates", tag: "Best seller" },
  { slug: "operator-dashboard-kit", name: "Operator Dashboard Kit", price: "$189", category: "Templates", tag: "Updated" },
  { slug: "mobile-app-landing-pack", name: "Mobile App Landing Pack", price: "$149", category: "Ready Websites" },
  { slug: "booking-stripe-bundle", name: "Booking + Stripe Bundle", price: "$229", category: "Ready Websites", tag: "Bundle" },
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

export const BLOG_AUTHORS: Record<string, BlogAuthor> = {
  noah: {
    name: "Noah Whitfield",
    role: "Founding Partner, Growrix OS",
    bio: "Noah leads product strategy and design at Growrix OS. Previously shipped two SaaS startups from zero to Series B.",
    initials: "NW",
  },
  amara: {
    name: "Amara Kessler",
    role: "Principal Engineer",
    bio: "Amara designs MCP servers and platform infrastructure. Loves observability, hates flaky tests.",
    initials: "AK",
  },
  rohan: {
    name: "Rohan Iyer",
    role: "Design Lead",
    bio: "Rohan leads visual systems and motion design across Growrix OS engagements.",
    initials: "RI",
  },
  sasha: {
    name: "Sasha Varga",
    role: "Automation Lead",
    bio: "Sasha builds operational systems that quietly remove tedious work for clients.",
    initials: "SV",
  },
};

export const BLOG_CATEGORIES = [
  "Field Notes",
  "Engineering",
  "Design",
  "MCP",
  "Automation",
  "Studio",
] as const;

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "designing-mcp-servers-real-teams-actually-deploy",
    title: "Designing MCP servers real teams actually deploy",
    excerpt:
      "What we've learned shipping production-grade Model Context Protocol servers — the patterns that hold up under real agent traffic.",
    category: "MCP",
    tags: ["MCP", "Architecture", "Observability", "Agents"],
    author: BLOG_AUTHORS.amara,
    publishedAt: "2026-04-12",
    readMinutes: 9,
    accent: "from-teal-500 to-emerald-500",
    body: [
      { type: "p", text: "After a year of shipping MCP servers for B2B operations, fintech, and content teams, a clear shape has emerged for what production looks like. It rarely matches the demos." },
      { type: "p", text: "The temptation is to wrap every API endpoint as a tool and ship. Real deployments need a layer of design discipline first — otherwise the agent calls the wrong tool, hallucinates arguments, or quietly burns through your rate limits." },
      { type: "h2", text: "Tool design is the product" },
      { type: "p", text: "Before any code, we list every tool we plan to expose, write a one-sentence description in plain English, and stress-test the names against likely agent queries. If two tools could plausibly answer the same prompt, we collapse them." },
      { type: "ul", items: [
        "One job per tool — never overload arguments to do two things",
        "Names should be verbs from the agent's point of view",
        "Argument shapes should be the smallest viable input",
        "Errors should be readable strings, not stack traces",
      ]},
      { type: "h2", text: "Auth is rarely optional" },
      { type: "p", text: "Even internal MCP servers should support a per-user identity. The pattern that's worked best for us is short-lived signed tokens minted by the host application, validated at the MCP boundary, and translated into the downstream credentials each tool needs." },
      { type: "code", lang: "ts", code: "server.tool(\"list_invoices\", {\n  description: \"List invoices for the signed-in customer\",\n  input: z.object({ status: z.enum([\"open\", \"paid\"]).optional() }),\n  handler: async ({ input, ctx }) => {\n    const customer = await requireCustomer(ctx);\n    return billing.invoices.list({ customer: customer.id, ...input });\n  },\n});" },
      { type: "h2", text: "Observability you'll actually open" },
      { type: "p", text: "Every tool call should be logged with: tool name, hashed user identity, input shape, latency, result kind, and a request id you can grep. We pipe these to a single dashboard with three charts — calls per tool, error rate, p95 latency — and almost never need more." },
      { type: "quote", text: "If you can't answer 'which tool does the agent call most often, and how fast' in under ten seconds, the server isn't done.", cite: "Internal Growrix OS Ops playbook" },
      { type: "h2", text: "What we're working on next" },
      { type: "p", text: "We're prototyping a small library that lets a single MCP server expose different toolsets per audience — staff, customer, anonymous — without forking the server. More on that soon." },
    ],
    comments: [
      { id: "c1", author: "Lena P.", initials: "LP", postedAt: "2026-04-13", body: "The 'one job per tool' rule changed our agent's accuracy overnight. Confirmed.",
        replies: [{ id: "c1r1", author: "Amara Kessler", initials: "AK", postedAt: "2026-04-13", body: "Glad to hear it — the temptation to overload is real." }] },
      { id: "c2", author: "Marcus T.", initials: "MT", postedAt: "2026-04-14", body: "How do you handle long-running tools? Do you stream progress back to the agent?" },
      { id: "c3", author: "Jin H.", initials: "JH", postedAt: "2026-04-15", body: "Would love a follow-up on the per-audience toolsets pattern." },
    ],
  },
  {
    slug: "the-launch-sprint-method",
    title: "The Launch Sprint method: shipping a marketing site in four weeks",
    excerpt:
      "Our fixed-scope sprint that takes a marketing site from kickoff to launch in 28 days — the timeline, the artifacts, the rituals.",
    category: "Studio",
    tags: ["Process", "Websites", "Studio"],
    author: BLOG_AUTHORS.noah,
    publishedAt: "2026-04-05",
    readMinutes: 7,
    accent: "from-amber-500 to-orange-600",
    body: [
      { type: "p", text: "A 'website refresh' can drift for six months. The Launch Sprint method exists because most teams don't actually need six months — they need disciplined scope and weekly artifacts." },
      { type: "h2", text: "The shape of the sprint" },
      { type: "ol", items: [
        "Week 1 — Discovery, narrative, and architecture",
        "Week 2 — Visual system and key page design",
        "Week 3 — Build, copy pass, and motion polish",
        "Week 4 — QA, performance audit, and launch",
      ]},
      { type: "h3", text: "Week 1 produces three artifacts" },
      { type: "p", text: "A one-page narrative, a sitemap with section-level intent, and a measurable launch goal. If we can't write the goal in one sentence, we don't continue." },
      { type: "quote", text: "The fixed deadline is the feature. Everything else negotiates around it." },
      { type: "h2", text: "What we cut to make it fit" },
      { type: "p", text: "Sprints succeed by being honest about what is out. Custom illustration libraries, multi-language support, blog migrations — these become follow-on engagements, not sprint risk." },
      { type: "h3", text: "Where most sprints break" },
      { type: "ul", items: [
        "Stakeholder reviews scheduled later than week 2",
        "Copy treated as a 'final week' task",
        "Performance audit deferred until after launch",
      ]},
      { type: "p", text: "Solve all three in the kickoff doc and the rest is mostly execution." },
    ],
    comments: [
      { id: "c1", author: "Priya S.", initials: "PS", postedAt: "2026-04-07", body: "We ran a version of this and the weekly artifact discipline was the unlock for our team." },
      { id: "c2", author: "Ben R.", initials: "BR", postedAt: "2026-04-09", body: "How do you handle clients who can't move at this pace? Do you decline?" },
    ],
  },
  {
    slug: "the-design-system-thats-allowed-to-bend",
    title: "The design system that's allowed to bend",
    excerpt:
      "How Growrix OS balances tight design tokens with the editorial flexibility a marketing site needs.",
    category: "Design",
    tags: ["Design Systems", "Tokens", "Editorial"],
    author: BLOG_AUTHORS.rohan,
    publishedAt: "2026-03-28",
    readMinutes: 6,
    accent: "from-rose-500 to-pink-600",
    body: [
      { type: "p", text: "The mistake we made early was treating the design system as a set of rules. It worked for product surfaces and broke immediately on marketing pages." },
      { type: "h2", text: "Tokens are the contract" },
      { type: "p", text: "We commit to color, type, spacing, and motion tokens. Beyond that, marketing pages are allowed editorial liberties — typographic scale jumps, asymmetric grids, hero treatments tuned to a single moment." },
      { type: "h3", text: "What stays rigid" },
      { type: "ul", items: ["Color tokens", "Type ramp values", "Spacing scale", "Motion timing functions"] },
      { type: "h3", text: "What's allowed to bend" },
      { type: "ul", items: ["Section composition", "Hero treatments", "Image cropping language", "Eyebrow phrasing"] },
      { type: "quote", text: "A system that bans expression is a system designers route around." },
      { type: "h2", text: "How we keep the bending honest" },
      { type: "p", text: "Every editorial deviation needs to compose from existing tokens. If we reach for a new value, we promote it to a token or rework the layout. No one-off hex codes — ever." },
    ],
    comments: [
      { id: "c1", author: "Sora M.", initials: "SM", postedAt: "2026-03-30", body: "This is exactly the framing we needed for our team. Saving this." },
    ],
  },
  {
    slug: "automating-the-inquiry-to-crm-loop",
    title: "Automating the inquiry-to-CRM loop without a full RevOps team",
    excerpt:
      "A pragmatic stack for routing inbound contact-form leads into your CRM with enrichment, dedup, and a Slack ping — all under 200 lines of glue.",
    category: "Automation",
    tags: ["Automation", "CRM", "Operations"],
    author: BLOG_AUTHORS.sasha,
    publishedAt: "2026-03-19",
    readMinutes: 8,
    accent: "from-sky-500 to-blue-600",
    body: [
      { type: "p", text: "The lead capture step is rarely the bottleneck. The handoff is — getting a clean record into the CRM with enough context that sales doesn't have to re-research the prospect." },
      { type: "h2", text: "The four-step pipeline" },
      { type: "ol", items: [
        "Validate and normalize the form payload",
        "Enrich with public firmographic data",
        "Upsert into the CRM with a deterministic key",
        "Notify the right Slack channel with the verdict",
      ]},
      { type: "h3", text: "Why deterministic keys matter" },
      { type: "p", text: "If you key by email alone, every test submission creates duplicates. We key by a hash of normalized email + company domain, which gives clean dedup without surprises." },
      { type: "code", lang: "ts", code: "function leadKey(payload: Lead) {\n  const email = payload.email.trim().toLowerCase();\n  const domain = (payload.company ?? email.split(\"@\")[1]).toLowerCase();\n  return sha256(`${email}|${domain}`).slice(0, 24);\n}" },
      { type: "h2", text: "The Slack message is the product" },
      { type: "p", text: "Sales reads Slack, not the CRM. Spend the time making the notification useful: company size, their plan tier, the page they came from, and the one-line message they sent. Three reactions cover triage." },
      { type: "hr" },
      { type: "p", text: "The full template is in our productized Inquiry-to-CRM Automation kit if you want a head start." },
    ],
    comments: [
      { id: "c1", author: "Chris L.", initials: "CL", postedAt: "2026-03-20", body: "We did the deterministic-key change yesterday and our duplicate rate dropped to zero. Bless." },
      { id: "c2", author: "Hannah O.", initials: "HO", postedAt: "2026-03-22", body: "Curious how you handle GDPR consent in the enrichment step." },
    ],
  },
  {
    slug: "shipping-react-19-to-real-customers",
    title: "Shipping React 19 to real customers",
    excerpt:
      "What changed in our app architecture when we moved production traffic onto React 19 and the Next.js App Router.",
    category: "Engineering",
    tags: ["React", "Next.js", "Performance"],
    author: BLOG_AUTHORS.amara,
    publishedAt: "2026-03-08",
    readMinutes: 10,
    accent: "from-indigo-500 to-violet-600",
    body: [
      { type: "p", text: "We migrated three production apps onto React 19 + the Next.js App Router this quarter. Here is what actually changed and what stayed the same." },
      { type: "h2", text: "Server components, but selectively" },
      { type: "p", text: "We default to server components for layout, content, and data fetching, and reach for client components only when we genuinely need interactivity. The boundary discipline is the win — not the framework." },
      { type: "h3", text: "Patterns that paid off" },
      { type: "ul", items: [
        "Co-locating data fetches with the server component that renders them",
        "Treating client components as small islands inside a server tree",
        "Using suspense boundaries to keep first paint fast",
      ]},
      { type: "h2", text: "Patterns we abandoned" },
      { type: "p", text: "Global state libraries lost most of their job. We still use Zustand, but only for cross-island UI state — never for server-derived data." },
      { type: "quote", text: "If you're reaching for a state library to share data between components in the same tree, the boundary is probably wrong." },
      { type: "h2", text: "Performance" },
      { type: "p", text: "Real-world LCP improved across all three apps. The biggest factor was not the framework — it was the audit we did during the migration. The framework just made the audit cheaper." },
    ],
    comments: [
      { id: "c1", author: "Eitan F.", initials: "EF", postedAt: "2026-03-10", body: "The 'islands inside a server tree' framing is going in our team handbook." },
    ],
  },
  {
    slug: "field-notes-q1-2026",
    title: "Field notes from Q1 2026",
    excerpt:
      "What we shipped, what surprised us, and the studio metrics we're sharing publicly this quarter.",
    category: "Field Notes",
    tags: ["Studio", "Transparency"],
    author: BLOG_AUTHORS.noah,
    publishedAt: "2026-03-01",
    readMinutes: 5,
    accent: "from-purple-500 to-fuchsia-500",
    body: [
      { type: "p", text: "Every quarter we publish a short note on what we shipped, the engagements that surprised us, and the metrics we track ourselves against." },
      { type: "h2", text: "Shipped this quarter" },
      { type: "ul", items: [
        "Tideline Health onboarding rebuild — +182% activation",
        "Northcrest MCP server v2 — five new tools, full observability",
        "Lumora Studio website refresh — +64% demo bookings",
      ]},
      { type: "h2", text: "Surprises" },
      { type: "p", text: "Two of the three engagements scoped out at almost half the time we initially estimated. Across all three, the discovery phase was the difference." },
      { type: "h3", text: "The metric we obsess over" },
      { type: "p", text: "Time from kickoff to first shipped surface in production. Our trailing-twelve-month average is now under nine days." },
      { type: "quote", text: "If you can't get something real in front of users in the first two weeks, the engagement is already off-track." },
    ],
    comments: [
      { id: "c1", author: "Maya O.", initials: "MO", postedAt: "2026-03-02", body: "Love that you publish these. More studios should." },
      { id: "c2", author: "Daniel V.", initials: "DV", postedAt: "2026-03-04", body: "The kickoff-to-first-ship metric is one we're stealing." },
    ],
  },
];

export const BLOG_POST_BY_SLUG: Record<string, BlogPost> = Object.fromEntries(
  BLOG_POSTS.map((p) => [p.slug, p])
);

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POST_BY_SLUG[slug];
}

export function getRelatedPosts(slug: string, limit = 2): BlogPost[] {
  const current = BLOG_POST_BY_SLUG[slug];
  if (!current) return [];
  const tagSet = new Set(current.tags);
  return BLOG_POSTS.filter((p) => p.slug !== slug)
    .map((p) => ({ post: p, score: p.tags.filter((t) => tagSet.has(t)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || +new Date(b.post.publishedAt) - +new Date(a.post.publishedAt))
    .slice(0, limit)
    .map((x) => x.post);
}

export function getBlogTagCounts(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of BLOG_POSTS) {
    for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getBlogCategoryCounts(): { category: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of BLOG_POSTS) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  return BLOG_CATEGORIES.map((c) => ({ category: c, count: counts.get(c) ?? 0 })).filter(
    (c) => c.count > 0
  );
}

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
