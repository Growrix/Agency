import type { Step } from "@/components/sections/ProcessSteps";
import type { Stat } from "@/components/sections/StatBlock";

export const MOBILE_APPS_SERVICE_STATS: Stat[] = [
  { value: "50+", label: "Digital assets built", hint: "Products, platforms, and launch systems" },
  { value: "3", label: "Delivery models", hint: "Launch package, companion MVP, or full build" },
  { value: "24h", label: "Average response time", hint: "Discovery and project inquiries" },
  { value: "Cross-platform", label: "Mobile-ready product systems", hint: "iOS and Android from one codebase" },
];

export const MOBILE_APPS_SERVICE_HERO = {
  headline: "Launch mobile products without rebuilding your entire business.",
  headlineLead: "Launch mobile products",
  headlineAccent: "without rebuilding your entire business.",
  description:
    "From companion apps and customer portals to mobile-first products, we help founders and businesses launch practical mobile experiences that support growth.",
  secondaryCta: "View engagement models",
  secondaryHref: "#pricing",
} as const;

export const MOBILE_PRODUCT_TYPES_SECTION = {
  eyebrow: "Product types",
  title: "Examples of mobile products we can build.",
  titleLead: "Examples of mobile products",
  titleAccent: "we can build.",
  description:
    "From internal business tools to customer-facing applications, we help businesses launch mobile experiences designed around real user needs and workflows.",
  items: [
    {
      title: "Customer Portal App",
      description:
        "Allow users to access services, documents, projects, and account information on the go.",
    },
    {
      title: "Membership App",
      description: "Subscriptions, gated content, member experiences, and community access.",
    },
    {
      title: "Booking App",
      description: "Appointments, scheduling, reminders, payments, and customer management.",
    },
    {
      title: "Internal Team App",
      description: "Replace spreadsheets and manual processes with mobile-first workflows.",
    },
    {
      title: "Marketplace Companion App",
      description: "Extend marketplace experiences into mobile user journeys.",
    },
    {
      title: "Event & Community App",
      description: "Registrations, engagement, updates, and member participation.",
    },
    {
      title: "Fitness & Tracking App",
      description: "Habit tracking, progress dashboards, reporting, and user engagement.",
    },
    {
      title: "Business Operations App",
      description: "Real-time visibility into business activities, workflows, and reporting.",
    },
  ],
} as const;

export const MOBILE_SYSTEMS_SECTION = {
  eyebrow: "What we deliver",
  title: "Mobile experiences designed around user actions.",
  titleLead: "Mobile experiences designed",
  titleAccent: "around user actions.",
  description:
    "Practical mobile systems that help businesses engage users, streamline operations, and support growth.",
  builds: [
    {
      title: "Customer Apps",
      description: "Deliver services and experiences directly to users.",
    },
    {
      title: "Companion Apps",
      description: "Extend existing SaaS products and digital systems into mobile workflows.",
    },
    {
      title: "Member Platforms",
      description: "Subscriptions, gated content, loyalty systems, and community engagement.",
    },
    {
      title: "Booking & Scheduling",
      description: "Appointments, availability, reminders, and payments.",
    },
    {
      title: "Internal Operations Apps",
      description: "Replace repetitive tasks and manual workflows with mobile tools.",
    },
    {
      title: "Mobile Dashboards",
      description: "Access business data, reporting, and insights from anywhere.",
    },
  ],
} as const;

export const MOBILE_WHY_BUILD_SECTION = {
  eyebrow: "Why businesses build mobile products with GrowrixOS",
  title: "Built for adoption, scalability, and long-term growth.",
  titleLead: "Built for adoption, scalability, and",
  titleAccent: "long-term growth.",
  description:
    "Every mobile project is designed around usability, maintainability, and measurable business outcomes.",
  cards: [
    {
      title: "Product-First Thinking",
      description: "Focus on user adoption and business goals before feature expansion.",
    },
    {
      title: "Launch-Ready Systems",
      description: "Built for real users and real workflows, not demo environments.",
    },
    {
      title: "Cross-Platform Efficiency",
      description: "Reach both iOS and Android without doubling development costs.",
    },
    {
      title: "Long-Term Maintainability",
      description: "Structured for future updates, releases, and product evolution.",
    },
  ],
} as const;

export const MOBILE_LAUNCH_PROCESS_SECTION = {
  eyebrow: "Our process",
  title: "How we take mobile products from concept to launch.",
  titleLead: "How we take mobile products",
  titleAccent: "from concept to launch.",
  description:
    "A structured process designed to reduce risk, improve clarity, and accelerate product delivery.",
  steps: [
    {
      number: "01",
      title: "Discovery",
      description: "Clarify goals, users, workflows, and opportunities.",
    },
    {
      number: "02",
      title: "UX & Mobile Planning",
      description: "Define user journeys, screens, priorities, and technical requirements.",
    },
    {
      number: "03",
      title: "Build & Testing",
      description: "Develop, test, refine, and prepare for launch.",
    },
    {
      number: "04",
      title: "Launch & Iterate",
      description: "Release, gather feedback, improve continuously, and support future growth.",
    },
  ] satisfies Step[],
} as const;

export const MOBILE_ENGAGEMENT_SECTION = {
  eyebrow: "Engagement models",
  title: "Choose the build path that matches your product stage.",
  titleLead: "Choose the build path",
  titleAccent: "that matches your product stage.",
  description:
    "Whether you're validating an idea, extending an existing platform, or launching a new mobile product, we'll recommend the right approach for your goals.",
  trustNote:
    "Need something different? Every mobile product is unique. Discovery sessions help define scope, timelines, and the most suitable engagement model.",
  tiers: [
    {
      name: "Mobile Launch Package",
      iconKey: "mobile-launch",
      price: "From $2,500",
      description:
        "Perfect for businesses needing mobile-ready experiences, launch support, and product validation.",
      features: [
        "Product discovery",
        "Mobile UX planning",
        "Launch architecture",
        "Core workflows",
        "Analytics setup",
        "Performance optimization",
      ],
      cta: { label: "Plan Launch", href: "/book-appointment" },
    },
    {
      name: "Companion App MVP",
      iconKey: "companion-mvp",
      price: "From $14,000",
      description:
        "For businesses extending existing products, SaaS platforms, or customer workflows into mobile experiences.",
      features: [
        "Authentication",
        "User accounts",
        "Core product flows",
        "React Native build",
        "App Store preparation",
        "Release support",
      ],
      cta: { label: "Scope Companion App", href: "/book-appointment" },
      featured: true,
      badge: "Most popular",
    },
    {
      name: "Mobile Product Build",
      iconKey: "mobile-product-build",
      price: "Custom Scope",
      description:
        "For startups and businesses building complete mobile products with advanced requirements.",
      features: [
        "Product roadmap",
        "Advanced workflows",
        "Subscription systems",
        "Marketplace functionality",
        "Integrations",
        "Long-term product support",
      ],
      cta: { label: "Discuss Partnership", href: "/book-appointment" },
    },
  ],
} as const;

export const MOBILE_APPS_SERVICE_FAQ = [
  {
    question: "Do you build both iOS and Android apps?",
    answer:
      "Yes. We default to React Native or Expo so one codebase reaches iOS and Android efficiently. Native modules are scoped only when the product genuinely requires platform-specific capability.",
  },
  {
    question: "Can you build companion apps for existing SaaS products?",
    answer:
      "Yes. Companion app MVPs are a common path—we extend your existing auth, data, and workflows into mobile while keeping product logic consistent across web and mobile surfaces.",
  },
  {
    question: "Do you handle App Store submissions?",
    answer:
      "Yes. We prepare store assets, privacy disclosures, submission packages, and support review cycles for both Apple App Store and Google Play when release support is in scope.",
  },
  {
    question: "Can you redesign an existing mobile app?",
    answer:
      "Yes. We audit UX, performance, and codebase health, then scope phased improvements or a rebuild that preserves what works while fixing adoption and maintainability gaps.",
  },
  {
    question: "Do you build MVP apps?",
    answer:
      "Yes. Mobile Launch Package and Companion App MVP paths are designed to validate ideas and ship core flows without overbuilding before you have real user feedback.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "We typically use React Native or Expo with TypeScript, backed by your existing API or a scoped backend. Analytics, auth, and push-ready architecture are planned from the start.",
  },
  {
    question: "How long does a mobile app project take?",
    answer:
      "Launch-focused packages often land in a few weeks to two months depending on scope. Companion MVPs and full product builds typically run longer based on flows, integrations, and release requirements.",
  },
  {
    question: "Can you integrate payments and subscriptions?",
    answer:
      "Yes. We integrate Stripe and in-app purchase patterns where appropriate, with webhook handling, account states, and testing documented for your team.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We verify analytics, crash reporting, and critical flows post-release. Iteration sprints and product support can continue if you want ongoing improvements, experiments, or store updates.",
  },
  {
    question: "Will I own the source code?",
    answer:
      "Yes. You receive repository access, documentation, and deployment guidance at handoff so your team—or ours on retainer—can continue building after launch.",
  },
] as const;

export const MOBILE_APPS_SERVICE_FAQ_SECTION = {
  eyebrow: "FAQ",
  title: "Common mobile product questions, answered.",
  titleLead: "Common mobile product questions,",
  titleAccent: "answered.",
  description:
    "Platforms, MVPs, store submission, ownership, and post-launch support—covered before you book a call.",
} as const;

export const MOBILE_APPS_SERVICE_CTA = {
  title: "Let's map your mobile product.",
  titleLead: "Let's map your",
  titleAccent: "mobile product.",
  description:
    "Book a 30-minute discovery session and leave with a clearer roadmap, feature scope, and launch strategy.",
  primaryLabel: "Plan Mobile Launch",
  primaryHref: "/book-appointment",
  secondaryLabel: "Browse Digital Products",
  secondaryHref: "/digital-products",
} as const;
