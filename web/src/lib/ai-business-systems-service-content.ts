import type { Step } from "@/components/sections/ProcessSteps";
import type { Stat } from "@/components/sections/StatBlock";

export const AI_BUSINESS_SYSTEMS_SERVICE_STATS: Stat[] = [
  { value: "50+", label: "Digital assets built", hint: "Products, platforms, and operational systems" },
  { value: "AI + Auto", label: "Automation expertise", hint: "Integrated AI and workflow implementation" },
  { value: "24h", label: "Average response time", hint: "Discovery and scoping inquiries" },
  { value: "Business-first", label: "AI systems", hint: "Practical implementations, not experiments" },
];

export const AI_BUSINESS_SYSTEMS_SERVICE_HERO = {
  headline: "AI systems that create leverage, not complexity.",
  description:
    "From AI assistants and content workflows to internal knowledge systems and customer support automation, we help businesses apply AI where it creates measurable value.",
  secondaryCta: "Explore AI Systems",
  secondaryHref: "#ai-solutions",
} as const;

export const AI_SOLUTIONS_SECTION = {
  id: "ai-solutions",
  eyebrow: "AI solutions",
  title: "Practical AI systems built for business operations.",
  description:
    "We focus on real-world AI applications that improve efficiency, support teams, and create measurable outcomes.",
  items: [
    {
      title: "AI Knowledge Base",
      description: "Internal company knowledge assistants trained on business information.",
    },
    {
      title: "Customer Support Assistant",
      description: "AI-powered support systems that answer questions and reduce workload.",
    },
    {
      title: "Sales Assistant",
      description: "Lead qualification, follow-up assistance, and customer interaction support.",
    },
    {
      title: "Content Operations",
      description: "Research, drafting, repurposing, and publishing workflows.",
    },
    {
      title: "Internal Productivity Assistant",
      description: "AI-powered tools that help teams find information and complete tasks faster.",
    },
    {
      title: "AI Reporting & Insights",
      description: "Automated summaries, analysis, and business intelligence.",
    },
    {
      title: "Proposal & Document Generation",
      description: "Generate business documents, proposals, and operational content.",
    },
    {
      title: "AI Workflow Assistants",
      description: "AI integrated directly into business processes and operations.",
    },
  ],
} as const;

export const AI_VALUE_SECTION = {
  eyebrow: "Business impact",
  title: "How AI creates operational leverage.",
  description: undefined,
  builds: [
    {
      title: "Faster Decisions",
      description: "Access information and insights instantly.",
    },
    {
      title: "Reduced Manual Work",
      description: "Automate repetitive content and operational tasks.",
    },
    {
      title: "Better Customer Support",
      description: "Improve response times and customer experience.",
    },
    {
      title: "Increased Team Productivity",
      description: "Help teams spend more time on high-value work.",
    },
    {
      title: "Consistent Outputs",
      description: "Reduce variation and improve process reliability.",
    },
    {
      title: "Scalable Operations",
      description: "Support growth without increasing administrative burden.",
    },
  ],
} as const;

export const AI_WHY_BUILD_SECTION = {
  eyebrow: "Why businesses implement AI with GrowrixOS",
  title: "Focused on business outcomes, not AI hype.",
  description:
    "Every AI implementation is designed around practical value, measurable improvements, and operational impact.",
  cards: [
    {
      title: "AI With Purpose",
      description: "We implement AI where it creates measurable value.",
    },
    {
      title: "Human Oversight",
      description: "Critical decisions remain under human control.",
    },
    {
      title: "Operational Integration",
      description: "AI is embedded into existing workflows and systems.",
    },
    {
      title: "Long-Term Maintainability",
      description: "Solutions are designed for ongoing use and future improvement.",
    },
  ],
} as const;

export const AI_BUSINESS_SYSTEMS_PROCESS_SECTION = {
  eyebrow: "Our process",
  title: "How we implement AI systems that businesses actually use.",
  description: undefined,
  steps: [
    {
      number: "01",
      title: "Discovery & Opportunities",
      description: "Identify where AI can create meaningful value.",
    },
    {
      number: "02",
      title: "System Design",
      description: "Define workflows, integrations, and user interactions.",
    },
    {
      number: "03",
      title: "Build & Integration",
      description: "Implement AI systems and connect them with business operations.",
    },
    {
      number: "04",
      title: "Testing & Optimization",
      description: "Monitor usage, improve outputs, and refine workflows.",
    },
  ] satisfies Step[],
} as const;

export const AI_ENGAGEMENT_SECTION = {
  eyebrow: "Engagement models",
  title: "Choose the AI implementation path that fits your business.",
  description:
    "Whether you're exploring opportunities or deploying operational AI systems, we'll recommend the most suitable approach.",
  trustNote:
    "Need something different? Every business operates differently. Discovery sessions help define scope, tooling, and the most suitable AI implementation path.",
  tiers: [
    {
      name: "AI Discovery",
      price: "From $1,500",
      description: "Identify opportunities, use cases, and implementation priorities.",
      features: [
        "AI opportunity audit",
        "Workflow assessment",
        "Recommendations",
        "Implementation roadmap",
        "Strategic planning",
      ],
      cta: { label: "Book Discovery", href: "/book-appointment" },
    },
    {
      name: "AI System Build",
      price: "From $5,000",
      description: "Design and implement AI-powered business systems.",
      features: [
        "AI assistant implementation",
        "Workflow integration",
        "Knowledge system setup",
        "Prompt architecture",
        "Testing & optimization",
        "Team onboarding",
      ],
      cta: { label: "Scope AI Build", href: "/book-appointment" },
      featured: true,
      badge: "Most popular",
    },
    {
      name: "AI Operations Partner",
      price: "Custom Scope",
      description: "Ongoing optimization, monitoring, and AI system expansion.",
      features: [
        "Continuous improvement",
        "New use cases",
        "Workflow expansion",
        "Usage reviews",
        "Strategic planning",
      ],
      cta: { label: "Start Partnership", href: "/book-appointment" },
    },
  ],
} as const;

export const AI_BUSINESS_SYSTEMS_SERVICE_FAQ = [
  {
    question: "What types of AI systems do you build?",
    answer:
      "Knowledge assistants, customer support systems, sales assistants, content operations workflows, internal productivity tools, reporting systems, and AI embedded in business processes.",
  },
  {
    question: "Can AI be integrated with existing business tools?",
    answer:
      "Yes. We connect AI systems to CRMs, help desks, CMS platforms, internal databases, and communication tools your team already uses.",
  },
  {
    question: "Do you use OpenAI models?",
    answer:
      "Often, yes—but we choose models based on quality, cost, latency, and data requirements. Other providers are used when they fit the use case better.",
  },
  {
    question: "Can AI be trained on our business knowledge?",
    answer:
      "Yes. We implement retrieval and knowledge bases over your documents, policies, and operational content—with scoped access and update workflows.",
  },
  {
    question: "How do you handle sensitive information?",
    answer:
      "We map data boundaries during discovery, use least-privilege access, and design systems that keep sensitive content out of inappropriate model contexts.",
  },
  {
    question: "What is the difference between AI and automation?",
    answer:
      "Automation follows fixed rules; AI handles judgment, language, classification, and generation. We combine both where each creates the most value.",
  },
  {
    question: "Can AI assist customer support?",
    answer:
      "Yes. Support assistants can answer common questions, route complex cases, summarize tickets, and reduce response times with human escalation paths.",
  },
  {
    question: "How long does implementation take?",
    answer:
      "Discovery often completes in one to two weeks. Focused AI builds typically land in two to six weeks depending on integrations, data readiness, and review cycles.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Yes. AI Operations Partner engagements cover monitoring, refinement, and expansion. One-time builds include handoff documentation and optional support scopes.",
  },
  {
    question: "How do AI projects usually begin?",
    answer:
      "With a discovery session to map workflows, identify high-value use cases, and recommend an implementation path before any build commitment.",
  },
] as const;

export const AI_BUSINESS_SYSTEMS_SERVICE_CTA = {
  title: "Let's identify where AI can create the most value.",
  description:
    "Book a discovery session and receive a practical roadmap for AI opportunities, implementation priorities, and expected business outcomes.",
  primaryLabel: "Book AI Discovery",
  primaryHref: "/book-appointment",
  secondaryLabel: "Explore AI Systems",
  secondaryHref: "#ai-solutions",
} as const;
