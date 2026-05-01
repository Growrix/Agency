// Local stock images downloaded from free stock sources and reused across the site.

export type StockImage = {
  src: string;
  alt: string;
};

export type CaseStudyDetail = {
  client: string;
  year: string;
  duration: string;
  team: string;
  deliveryStory?: string;
  process?: string[];
  challenge: string[];
  strategy: string[];
  integrations?: string[];
  seo?: string[];
  standards?: string[];
  build: { label: string; value: string }[];
  results: { value: string; label: string; hint?: string }[];
  gallery: StockImage[];
};

export const HOME_IMAGES = {
  hero: {
    src: "/images/home/studio-hero.jpg",
    alt: "Product team collaborating around laptops in a studio workspace.",
  },
  mobile: {
    src: "/images/home/mobile-device.jpg",
    alt: "Close-up of a hand using a mobile device.",
  },
} as const;

export const ABOUT_IMAGES = {
  hero: {
    src: "/images/about/studio-team.jpg",
    alt: "Studio team working together around a table of laptops.",
  },
  founder: {
    src: "/images/about/founder/nayeem-founder-portrait.jpg",
    alt: "Portrait of Nayeem, founder of Growrix OS.",
  },
} as const;

export const TEAM_IMAGES: Record<string, StockImage> = {
  "Mira Aldenberg": {
    src: "/images/team/mira.jpg",
    alt: "Portrait of Mira Aldenberg.",
  },
  "Felix Aranha": {
    src: "/images/team/felix.jpg",
    alt: "Portrait of Felix Aranha.",
  },
  "Yuna Park": {
    src: "/images/team/yuna.jpg",
    alt: "Portrait of Yuna Park.",
  },
  "Ravi Saini": {
    src: "/images/team/ravi.jpg",
    alt: "Portrait of Ravi Saini.",
  },
};

export const PRODUCT_IMAGES: Record<string, StockImage> = {
  "Concierge MCP Starter": {
    src: "/images/products/mcp.jpg",
    alt: "Developer workstation showing code on a large screen.",
  },
  "Atelier Marketing Theme": {
    src: "/images/products/template.jpg",
    alt: "Designer workspace with laptop and visual design tools for a premium website template.",
  },
  "Operator Dashboard Kit": {
    src: "/images/portfolio/glasswing-onboarding-hero.jpg",
    alt: "Product-focused interface representing a SaaS dashboard and onboarding flow.",
  },
  "Inquiry-to-CRM Automation": {
    src: "/images/products/automation.jpg",
    alt: "Business analytics screen suggesting workflow automation.",
  },
  "Mobile App Landing Pack": {
    src: "/images/home/mobile-device.jpg",
    alt: "Close-up of a mobile device representing a mobile app launch website.",
  },
  "Booking + Stripe Bundle": {
    src: "/images/blog/launch-sprint.jpg",
    alt: "Team planning a launch-ready service website with booking and payments.",
  },
};

export const BLOG_IMAGES: Record<string, StockImage> = {
  "designing-mcp-servers-real-teams-actually-deploy": {
    src: "/images/blog/mcp.jpg",
    alt: "Developers working on laptops around a collaborative table.",
  },
  "the-launch-sprint-method": {
    src: "/images/blog/launch-sprint.jpg",
    alt: "Team workshop session planning a launch sprint around laptops.",
  },
  "the-design-system-thats-allowed-to-bend": {
    src: "/images/blog/design-system.jpg",
    alt: "Design-focused workspace with computer and creative tools.",
  },
  "automating-the-inquiry-to-crm-loop": {
    src: "/images/blog/automation.jpg",
    alt: "Analytics and operations workspace representing workflow automation.",
  },
  "shipping-react-19-to-real-customers": {
    src: "/images/blog/react19.jpg",
    alt: "Developer screen with code, representing frontend engineering work.",
  },
  "field-notes-q1-2026": {
    src: "/images/blog/field-notes.jpg",
    alt: "Notebook and desk setup for writing field notes and planning.",
  },
};

export const PORTFOLIO_IMAGES: Record<string, StockImage> = {
  "tideline-health": {
    src: "/images/portfolio/tideline-health-hero.jpg",
    alt: "Doctor using a mobile device in a healthcare setting.",
  },
  "northcrest-mcp": {
    src: "/images/portfolio/northcrest-mcp-hero.jpg",
    alt: "Server hardware and network equipment representing backend infrastructure.",
  },
  "lumora-studio": {
    src: "/images/portfolio/lumora-studio-hero.jpg",
    alt: "Creative team collaborating on laptops in a wood-lined studio.",
  },
  "glasswing-onboarding": {
    src: "/images/portfolio/glasswing-onboarding-hero.jpg",
    alt: "Professional reviewing financial charts on screen.",
  },
  "beacon-route-engine": {
    src: "/images/portfolio/beacon-route-engine-hero.jpg",
    alt: "Transportation scene representing route planning and mobility operations.",
  },
  "helix-research-portal": {
    src: "/images/portfolio/helix-research-portal-hero.jpg",
    alt: "Research desk with laptop, notebooks, and analysis materials.",
  },
};

export const CASE_STUDY_DETAILS: Record<string, CaseStudyDetail> = {
  "tideline-health": {
    client: "Tideline Health",
    year: "2026",
    duration: "11 weeks",
    team: "Strategy, design, frontend, backend",
    challenge: [
      "The previous patient journey depended on five disconnected tools, creating delays between intake, verification, and care-plan setup.",
      "Care coordinators had no clear signal for who was blocked, who needed follow-up, and where onboarding was losing momentum.",
      "Leadership needed a product surface that felt trustworthy for patients and practical for staff without adding more operational overhead.",
    ],
    strategy: [
      "Mapped the full onboarding lifecycle first, then reduced it into a simpler patient flow and a more actionable staff queue.",
      "Introduced a calmer UI language with clearer status communication so patients always understood the next step.",
      "Designed shared components for intake, approvals, and care-plan handoff to keep the experience consistent across roles.",
      "Launched with analytics tied to activation milestones so the team could keep iterating after release.",
    ],
    build: [
      { label: "Frontend", value: "Next.js, React, TypeScript" },
      { label: "Backend", value: "Node services, Postgres, queues" },
      { label: "Auth", value: "Role-based auth with audit history" },
      { label: "Billing", value: "Stripe invoicing + subscription sync" },
      { label: "Messaging", value: "Transactional email + SMS reminders" },
      { label: "Analytics", value: "PostHog funnels + onboarding events" },
    ],
    results: [
      { value: "+182%", label: "Activation rate", hint: "Within the first release cycle" },
      { value: "92s", label: "Avg approval", hint: "For standard onboarding paths" },
      { value: "-41%", label: "Drop-off", hint: "Across the intake funnel" },
      { value: "4.8/5", label: "Staff satisfaction", hint: "Internal rollout survey" },
    ],
    gallery: [
      { src: "/images/portfolio/tideline-health-hero.jpg", alt: "Healthcare professional using a mobile device." },
      { src: "/images/portfolio/tideline-health-2.jpg", alt: "Healthcare-related digital workflow on a mobile device." },
      { src: "/images/home/mobile-device.jpg", alt: "Close-up of a mobile screen interaction, representing patient app use." },
    ],
  },
  "northcrest-mcp": {
    client: "Northcrest",
    year: "2026",
    duration: "6 weeks",
    team: "MCP architecture, backend, ops enablement",
    challenge: [
      "Operations teams needed one safe way for an internal AI assistant to access CRM, billing, and inventory systems together.",
      "Existing internal tools had inconsistent naming and weak visibility into who triggered what across the stack.",
      "Any rollout needed strong auditability before operators would trust the assistant in production work.",
    ],
    strategy: [
      "Reduced the tool surface into a smaller, safer set of MCP actions aligned to real operator jobs.",
      "Added clear permission boundaries, request tracing, and reviewable logs from the first version.",
      "Built a supporting console so the ops team could test and inspect tool behavior without engineering involvement.",
      "Scoped the first release around high-frequency operations questions where time savings would be obvious.",
    ],
    build: [
      { label: "Server", value: "TypeScript MCP runtime" },
      { label: "Tools", value: "CRM, billing, inventory connectors" },
      { label: "Auth", value: "Signed session tokens + RBAC" },
      { label: "Observability", value: "Structured logs + trace review" },
      { label: "Hosting", value: "Cloudflare Workers" },
      { label: "Testing", value: "Schema fixtures + smoke tests" },
    ],
    results: [
      { value: "5h/wk", label: "Time saved", hint: "Per operations lead" },
      { value: "148ms", label: "Median tool latency", hint: "Across live requests" },
      { value: "100%", label: "Audit coverage", hint: "All tool calls logged" },
      { value: "8", label: "Live tools", hint: "Shipped in the initial scope" },
    ],
    gallery: [
      { src: "/images/portfolio/northcrest-mcp-hero.jpg", alt: "Close-up of server infrastructure." },
      { src: "/images/blog/mcp.jpg", alt: "Developers collaborating on engineering work." },
      { src: "/images/home/studio-hero.jpg", alt: "Team collaboration around laptops." },
    ],
  },
  "lumora-studio": {
    client: "Lumora Studio",
    year: "2025",
    duration: "5 weeks",
    team: "Narrative strategy, visual design, frontend",
    challenge: [
      "The old website looked competent but generic, weakening Lumora's premium positioning in client conversations.",
      "Case studies were hard to scan and the team had no repeatable system for publishing new proof quickly.",
      "Marketing needed a stronger editorial style without creating fragile one-off layouts everywhere.",
    ],
    strategy: [
      "Reframed the site around proof, process clarity, and stronger visual pacing from the homepage onward.",
      "Built reusable page sections that let the brand feel expressive without breaking consistency.",
      "Focused on typography, imagery, and white space so the portfolio felt more productized and easier to trust.",
      "Shipped with a structure the team could maintain instead of a design that only worked on launch day.",
    ],
    build: [
      { label: "Frontend", value: "Next.js, App Router, TypeScript" },
      { label: "CMS", value: "Structured content blocks + editorial templates" },
      { label: "SEO", value: "Metadata mapping + schema" },
      { label: "Motion", value: "Framer Motion + reduced-motion fallbacks" },
      { label: "Forms", value: "CRM sync + lead routing" },
      { label: "Analytics", value: "Plausible + booking attribution" },
    ],
    results: [
      { value: "+64%", label: "Demo bookings", hint: "Within 60 days" },
      { value: "3.8x", label: "Time on site", hint: "On portfolio-heavy visits" },
      { value: "14", label: "Reusable templates", hint: "Across v1 launch" },
      { value: "0.9s", label: "LCP", hint: "Homepage on broadband" },
    ],
    gallery: [
      { src: "/images/portfolio/lumora-studio-hero.jpg", alt: "Creative team working together in a studio." },
      { src: "/images/blog/design-system.jpg", alt: "Design workspace with a computer." },
      { src: "/images/about/studio-team.jpg", alt: "Team collaboration in a shared workspace." },
    ],
  },
  "glasswing-onboarding": {
    client: "Glasswing",
    year: "2025",
    duration: "9 weeks",
    team: "Product strategy, UX, full-stack build",
    challenge: [
      "A high-friction KYC flow was slowing approvals and making prospects feel uncertain before they reached value.",
      "Compliance and product had competing needs: better control for edge cases without a confusing experience for standard users.",
      "The business needed clearer insight into where onboarding stalled and why.",
    ],
    strategy: [
      "Separated the journey into clearer milestones so users understood where they were and what information was missing.",
      "Designed a reviewer workspace that focused attention on exceptions instead of forcing manual checks on every case.",
      "Used microcopy and state messaging to make a regulated process feel more guided and less intimidating.",
      "Instrumented the funnel so product and compliance could tune the system against both speed and risk.",
    ],
    build: [
      { label: "Frontend", value: "Next.js, React Hook Form, Zod" },
      { label: "Backend", value: "Node services + risk orchestration" },
      { label: "Compliance", value: "Vendor checks + manual review states" },
      { label: "Storage", value: "Encrypted document handling" },
      { label: "Alerts", value: "Slack + email review triggers" },
      { label: "Analytics", value: "Approval funnel + risk cohorts" },
    ],
    results: [
      { value: "92s", label: "Avg approval", hint: "For standard cases" },
      { value: "+37%", label: "Completion rate", hint: "Across onboarding submissions" },
      { value: "-23%", label: "False flags", hint: "After review tuning" },
      { value: "2.1x", label: "Reviewer throughput", hint: "Per analyst" },
    ],
    gallery: [
      { src: "/images/portfolio/glasswing-onboarding-hero.jpg", alt: "Person reviewing financial or onboarding information on screen." },
      { src: "/images/home/mobile-device.jpg", alt: "Close-up of a mobile device interaction." },
      { src: "/images/blog/launch-sprint.jpg", alt: "Team working around a table on a launch plan." },
    ],
  },
  "beacon-route-engine": {
    client: "Beacon Mobility",
    year: "2025",
    duration: "7 weeks",
    team: "Automation mapping, backend, ops dashboards",
    challenge: [
      "Dispatch teams were manually coordinating route changes, reminders, and operator follow-up every day.",
      "No-show risk was high, but the current workflow gave poor visibility into where human intervention was actually needed.",
      "Leadership wanted automation without losing the ability to step in quickly during exceptions.",
    ],
    strategy: [
      "Mapped the full route-change workflow and separated routine cases from the exceptions that genuinely needed operators.",
      "Built rules around assignment, reminders, and escalation so repetitive work could be handled automatically.",
      "Created a dashboard that highlights queue health, unresolved exceptions, and delay risk at a glance.",
      "Focused on a reporting layer that makes the system explainable to support and operations teams.",
    ],
    build: [
      { label: "Workflow engine", value: "Custom Node services + queues" },
      { label: "Messaging", value: "SMS triggers + reminder templates" },
      { label: "Scheduling", value: "Shift feed + route assignment sync" },
      { label: "Data", value: "Dispatch events + operator actions" },
      { label: "Dashboards", value: "Next.js operations console" },
      { label: "Reporting", value: "Daily digest + exception review" },
    ],
    results: [
      { value: "-38%", label: "No-show rate", hint: "After the new workflow launched" },
      { value: "84%", label: "Automated assignments", hint: "Without manual touch" },
      { value: "2m", label: "Escalation SLA", hint: "From issue to human queue" },
      { value: "11", label: "Rules shipped", hint: "In the first release" },
    ],
    gallery: [
      { src: "/images/portfolio/beacon-route-engine-hero.jpg", alt: "Transportation scene representing mobility operations." },
      { src: "/images/blog/automation.jpg", alt: "Operations or analytics workspace representing automation." },
      { src: "/images/home/mobile-device.jpg", alt: "Mobile device interaction representing field communication." },
    ],
  },
  "helix-research-portal": {
    client: "Helix Capital",
    year: "2025",
    duration: "8 weeks",
    team: "Editorial strategy, product design, frontend",
    challenge: [
      "Helix had strong long-form research, but the reading experience felt more like a file archive than a premium subscriber product.",
      "Analysts needed better publishing structure without depending on engineering for every content change.",
      "The product had to balance authority, searchability, and subscriber gating without sacrificing performance.",
    ],
    strategy: [
      "Designed a reading-first experience with stronger hierarchy, better issue structure, and clear navigation.",
      "Added reusable editorial modules for charts, takeaways, and gated previews.",
      "Focused the UX on clarity and trust so premium research felt worth paying for.",
      "Built the content model around editorial operations as much as reader-facing polish.",
    ],
    build: [
      { label: "Frontend", value: "Next.js, MDX, search indexing" },
      { label: "Access", value: "Subscriber gating + account flows" },
      { label: "Search", value: "Topic and quote indexing" },
      { label: "CMS", value: "Analyst-friendly publishing schema" },
      { label: "Charts", value: "Embedded research visuals" },
      { label: "Analytics", value: "Reader depth + content cohorts" },
    ],
    results: [
      { value: "3.4x", label: "Dwell time", hint: "On flagship reports" },
      { value: "61%", label: "Search adoption", hint: "Among active subscribers" },
      { value: "120+", label: "Issues migrated", hint: "Into the new system" },
      { value: "+19%", label: "Renewal lift", hint: "On annual plan" },
    ],
    gallery: [
      { src: "/images/portfolio/helix-research-portal-hero.jpg", alt: "Research desk with laptop and notebooks." },
      { src: "/images/blog/field-notes.jpg", alt: "Notebook and writing desk representing editorial research." },
      { src: "/images/blog/design-system.jpg", alt: "Desktop workspace for digital publication design." },
    ],
  },
};

export function getPortfolioImage(slug: string) {
  return PORTFOLIO_IMAGES[slug];
}

export function getBlogImage(slug: string) {
  return BLOG_IMAGES[slug];
}

export function getCaseStudyDetail(slug: string) {
  return CASE_STUDY_DETAILS[slug];
}

export function getProductImage(name: string) {
  return PRODUCT_IMAGES[name];
}