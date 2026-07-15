import type { Step } from "@/components/sections/ProcessSteps";
import type { Stat } from "@/components/sections/StatBlock";

export const SAAS_SERVICE_STATS: Stat[] = [
  { value: "50+", label: "Digital assets built", hint: "Products, platforms, and internal tools" },
  { value: "3", label: "Delivery models", hint: "MVP sprint, partnership, or rebuild" },
  { value: "24h", label: "Average response time", hint: "Discovery and project inquiries" },
  { value: "Full-stack", label: "Modern SaaS architecture", hint: "Auth, APIs, billing, and scalable backends" },
];

export const SAAS_SERVICE_HERO = {
  headline: "Build SaaS products that users actually adopt.",
  headlineLead: "Build SaaS products",
  headlineAccent: "users actually adopt.",
  description:
    "From MVPs and internal platforms to subscription products, we help founders and teams launch scalable SaaS applications without wasting months on unnecessary development.",
  secondaryCta: "View engagement models",
  secondaryHref: "#pricing",
} as const;

export const SAAS_PRODUCT_TYPES_SECTION = {
  eyebrow: "Product types",
  title: "Examples of SaaS applications we can build.",
  titleLead: "Examples of SaaS applications",
  titleAccent: "we can build.",
  description:
    "From internal business tools to customer-facing platforms, we help teams launch software designed around real workflows and measurable outcomes.",
  items: [
    {
      title: "Client Portals",
      description:
        "Secure spaces for customers to manage projects, documents, communication, and account activity.",
    },
    {
      title: "Membership Platforms",
      description:
        "Subscription-based products with gated content, user management, and recurring access.",
    },
    {
      title: "CRM Systems",
      description: "Custom relationship management platforms tailored to your business processes.",
    },
    {
      title: "Booking & Scheduling Systems",
      description: "Manage appointments, availability, payments, and customer workflows.",
    },
    {
      title: "Marketplaces",
      description: "Connect buyers and sellers through scalable multi-user platforms.",
    },
    {
      title: "Learning Platforms",
      description: "Courses, training programs, certifications, and educational experiences.",
    },
    {
      title: "Internal Dashboards",
      description: "Replace spreadsheets and manual processes with custom operational software.",
    },
    {
      title: "Subscription Products",
      description: "Recurring revenue platforms with plans, billing, permissions, and account management.",
    },
  ],
} as const;

export const SAAS_STACK_SECTION = {
  eyebrow: "Our stack",
  title: "Built for scale, speed, and long-term ownership.",
  titleLead: "Built for scale, speed, and",
  titleAccent: "long-term ownership.",
  description:
    "Every technology choice is made to support product growth, maintainability, performance, and future flexibility.",
  benefits: [
    {
      title: "Built for Scale",
      description: "Architecture designed to support growth without requiring expensive rebuilds.",
    },
    {
      title: "Fast Iteration",
      description: "Launch improvements and new features quickly as your product evolves.",
    },
    {
      title: "Ownership Friendly",
      description: "Clean architecture and maintainable code your team can continue to build on.",
    },
    {
      title: "Secure Foundations",
      description: "Authentication, permissions, and data protection built into every project.",
    },
  ],
  footerNote:
    "We combine proven tools into a system that can build, launch, and scale SaaS products efficiently.",
} as const;

export const SAAS_STACK_GROUPS = [
  {
    category: "Core Development",
    items: ["Python", "Django", "JavaScript", "TypeScript", "Node.js", "REST APIs", "GraphQL"],
  },
  {
    category: "Frontend & Frameworks",
    items: ["Next.js", "React", "Vite", "Tailwind CSS", "ShadCN UI"],
  },
  {
    category: "AI & Automation Systems",
    items: [
      "Custom MCP servers",
      "AI-driven workflows",
      "API automation",
      "Background job systems",
      "Cron pipelines",
    ],
  },
  {
    category: "Cloud & Infrastructure",
    items: ["AWS (S3, EC2, Lambda)", "Vercel", "Docker", "CI/CD pipelines", "Serverless architecture"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MongoDB", "Redis"],
  },
  {
    category: "Payments & Monetization",
    items: ["Stripe", "Webhooks", "Subscription systems"],
  },
  {
    category: "Email & Communication",
    items: ["SendGrid", "Resend", "SMTP systems", "Transactional email pipelines"],
  },
  {
    category: "CMS & Content Systems",
    items: ["Sanity", "Payload CMS", "Headless CMS architectures"],
  },
  {
    category: "Integrations & Tools",
    items: [
      "Third-party APIs",
      "OAuth systems",
      "Webhook integrations",
      "Zapier-style automation bridges",
    ],
  },
] as const;

export const SAAS_SYSTEMS_SECTION = {
  eyebrow: "What we deliver",
  title: "The SaaS systems we help teams launch.",
  titleLead: "The SaaS systems we help",
  titleAccent: "teams launch.",
  description:
    "Practical software solutions designed to improve operations, customer experience, and business performance.",
  builds: [
    {
      title: "Customer Platforms",
      description: "Subscription-based products and member experiences.",
    },
    {
      title: "Admin & Operations Dashboards",
      description: "Manage users, content, workflows, and business activity.",
    },
    {
      title: "Internal Business Tools",
      description: "Replace spreadsheets and manual processes with custom software.",
    },
    {
      title: "Reporting & Analytics",
      description: "Turn operational data into actionable insights.",
    },
    {
      title: "Billing & Subscription Systems",
      description: "Recurring revenue, plans, invoices, and account management.",
    },
    {
      title: "AI-Powered Features",
      description: "Assistants, automation, intelligent workflows, and productivity tools.",
    },
  ],
} as const;

export const SAAS_WHY_FOUNDERS_SECTION = {
  eyebrow: "Why founders work with GrowrixOS",
  title: "Built for product growth, not just project delivery.",
  titleLead: "Built for product growth,",
  titleAccent: "not just project delivery.",
  description:
    "Every engagement is structured around creating usable products that can evolve, scale, and generate value long after launch.",
  cards: [
    {
      title: "Product Thinking",
      description: "We focus on solving business problems before building features.",
    },
    {
      title: "Scalable Architecture",
      description: "Designed for growth without requiring major rebuilds later.",
    },
    {
      title: "Fast Iteration Cycles",
      description: "Launch faster and improve based on real user feedback.",
    },
    {
      title: "Production-Ready Engineering",
      description: "Built with maintainability, performance, and reliability in mind.",
    },
  ],
} as const;

export const SAAS_LAUNCH_PROCESS_SECTION = {
  eyebrow: "Our process",
  title: "How we take SaaS products from idea to launch.",
  titleLead: "How we take SaaS products",
  titleAccent: "from idea to launch.",
  description:
    "A structured approach designed to reduce risk, improve clarity, and accelerate product delivery.",
  steps: [
    {
      number: "01",
      title: "Product Discovery",
      description: "Validate goals, users, workflows, and opportunities.",
    },
    {
      number: "02",
      title: "Planning & Architecture",
      description: "Define product structure, technical foundations, and roadmap.",
    },
    {
      number: "03",
      title: "Design & Development",
      description: "Build interfaces, backend systems, workflows, and integrations.",
    },
    {
      number: "04",
      title: "Launch & Iterate",
      description: "Release, gather feedback, improve continuously, and scale.",
    },
  ] satisfies Step[],
} as const;

export const SAAS_SERVICE_FAQ = [
  {
    question: "How fast can you launch an MVP?",
    answer:
      "Most MVP sprints land in 8 weeks when scope is focused and decisions move quickly. Larger products are phased into releases so you can validate early and expand from a working foundation.",
  },
  {
    question: "Do you work with existing development teams?",
    answer:
      "Yes. We frequently embed alongside in-house engineers as a product pod—handling design, frontend, backend, or specific workstreams while your team keeps ownership of the broader roadmap.",
  },
  {
    question: "What technology stack do you use?",
    answer:
      "We default to Next.js, React, TypeScript, PostgreSQL, and Stripe for SaaS products, with Python/Django or Node backends when the product requires it. Stack choices are documented so your team can maintain and extend the codebase.",
  },
  {
    question: "Can you improve an existing SaaS product?",
    answer:
      "Yes. Rebuild and optimization engagements start with an architecture and UX review, then phased shipping to reduce risk while improving performance, usability, and maintainability.",
  },
  {
    question: "Can you build both frontend and backend systems?",
    answer:
      "Yes. Engagements cover product UI, APIs, authentication, data models, background jobs, and integrations—scoped so you get a coherent full-stack product, not disconnected pieces.",
  },
  {
    question: "Do you handle authentication and user management?",
    answer:
      "Yes. Role-based access, secure sessions, invitation flows, and account management are standard parts of SaaS builds—not add-ons scoped late in the project.",
  },
  {
    question: "Can you integrate payment systems like Stripe?",
    answer:
      "Yes. We implement subscriptions, one-time payments, webhooks, plan changes, and customer billing portals with testing and documentation for your finance and ops teams.",
  },
  {
    question: "Can I start with an MVP and scale later?",
    answer:
      "Yes. MVP sprints are designed to ship core value first, with architecture and data models that support growth without a full rewrite when you add features or users.",
  },
  {
    question: "Will I own the source code?",
    answer:
      "Yes. You receive repository access, documentation, and deployment guidance at handoff. We structure projects so your team—or ours on retainer—can continue building after launch.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We support launch verification, analytics setup, and stabilization. Product Partner retainers and phased improvement sprints are available if you want ongoing shipping, experiments, and platform support.",
  },
] as const;

export const SAAS_SERVICE_FAQ_SECTION = {
  eyebrow: "FAQ",
  title: "Common SaaS project questions, answered.",
  titleLead: "Common SaaS project questions,",
  titleAccent: "answered.",
  description:
    "MVP timelines, stack, ownership, integrations, and post-launch support—covered before you book a call.",
} as const;

export const SAAS_ENGAGEMENT_SECTION = {
  eyebrow: "Engagement models",
  title: "Choose the build path that matches your product stage.",
  titleLead: "Choose the build path",
  titleAccent: "that matches your product stage.",
  description:
    "Every SaaS product starts differently. Whether you're validating an idea, building a production-ready platform, or scaling a complex system, we'll recommend the right approach for your goals.",
  trustNote:
    "Need something different? Every SaaS product is unique. Discovery sessions help define scope, timelines, and the most suitable engagement model.",
  tiers: [
    {
      name: "MVP Launch",
      iconKey: "mvp-launch",
      price: "From $1,500",
      description:
        "For founders validating an idea and launching a functional first version of their product.",
      features: [
        "Discovery workshop",
        "Product planning",
        "UX & interface design",
        "Authentication & user accounts",
        "Core product workflows",
        "Responsive web application",
        "Launch-ready deployment",
      ],
      timeline: "4–8 weeks",
      cta: { label: "Start MVP", href: "/book-appointment" },
    },
    {
      name: "Product Build",
      iconKey: "product-build",
      price: "From $18,000",
      description:
        "For businesses building a production-ready SaaS platform designed for real users and growth.",
      features: [
        "Everything in MVP Launch",
        "Admin dashboard",
        "Role-based permissions",
        "Stripe subscriptions",
        "API integrations",
        "Advanced workflows",
        "Product optimization support",
      ],
      timeline: "8–12 weeks",
      cta: { label: "Plan Product", href: "/book-appointment" },
      featured: true,
      badge: "Most popular",
    },
    {
      name: "Custom Platform",
      iconKey: "custom-platform",
      price: "Custom Scope",
      description:
        "For startups and organizations requiring advanced architecture, integrations, and custom business logic.",
      features: [
        "Multi-tenant architecture",
        "AI integrations",
        "Marketplace functionality",
        "Internal business systems",
        "Enterprise workflows",
        "Advanced automation",
        "Long-term product roadmap",
      ],
      timeline: "Project based",
      cta: { label: "Book Discovery", href: "/book-appointment" },
    },
  ],
} as const;

export const SAAS_SERVICE_CTA = {
  title: "Let's map your SaaS product.",
  titleLead: "Let's map your",
  titleAccent: "SaaS product.",
  description:
    "Book a 30-minute discovery session and leave with a clearer roadmap, technical approach, and launch strategy.",
  primaryLabel: "Start a SaaS Build",
  primaryHref: "/book-appointment",
  secondaryLabel: "Explore Templates",
  secondaryHref: "/digital-products",
} as const;
