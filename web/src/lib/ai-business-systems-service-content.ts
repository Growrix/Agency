import type { Step } from "@/components/sections/ProcessSteps";
import type { Stat } from "@/components/sections/StatBlock";

export const AI_BUSINESS_SYSTEMS_SERVICE_STATS: Stat[] = [
  { value: "50+", label: "Digital assets built", hint: "Products, platforms, and operational systems" },
  { value: "AI + Auto", label: "Automation expertise", hint: "Integrated AI assistants and workflow implementation" },
  { value: "24h", label: "Average response time", hint: "Discovery and scoping inquiries" },
  { value: "Business-first", label: "AI assistants", hint: "Practical outcomes, not experiments" },
];

export const AI_BUSINESS_SYSTEMS_SERVICE_HERO = {
  headline: "Practical AI that saves time, supports your team, and automates repetitive work.",
  headlineLead: "Practical AI that saves time,",
  headlineAccent: "supports your team, and automates repetitive work.",
  description:
    "GrowrixOS builds AI assistants, internal knowledge tools, customer support assistants, and workflow automations that integrate into your existing business. Start small, grow over time, and partner long-term.",
  secondaryCta: "Explore AI Solutions",
  secondaryHref: "#ai-solutions",
} as const;

export const AI_SOLUTIONS_SECTION = {
  id: "ai-solutions",
  eyebrow: "Common AI solutions",
  title: "Practical AI assistants that solve everyday business problems.",
  titleLead: "Practical AI assistants",
  titleAccent: "that solve everyday business problems.",
  description:
    "We focus on AI that makes work easier, faster, and more consistent for startups, agencies, and growing businesses.",
  items: [
    {
      title: "Internal Knowledge Assistant",
      description: "Help your team find answers, policies, and information without searching through files.",
    },
    {
      title: "Customer Support Assistant",
      description: "Answer common questions instantly and reduce response times for your customers.",
    },
    {
      title: "Sales Assistant",
      description: "Qualify leads, draft follow-ups, and support your sales team with faster responses.",
    },
    {
      title: "Content Operations",
      description: "Speed up research, drafting, repurposing, and publishing with AI-assisted workflows.",
    },
    {
      title: "Internal Productivity Assistant",
      description: "Reduce repetitive work so your team can focus on high-value tasks.",
    },
    {
      title: "AI Reporting & Insights",
      description: "Turn data into clear summaries, updates, and decision-ready insights.",
    },
    {
      title: "Proposal & Document Generation",
      description: "Generate proposals, documents, and operational content from your business knowledge.",
    },
    {
      title: "AI Workflow Assistants",
      description: "Connect AI into the tools and workflows your business already uses.",
    },
  ],
} as const;

export const AI_VALUE_SECTION = {
  eyebrow: "Business benefits",
  title: "Save time, reduce repetitive work, and support your team.",
  titleLead: "Save time, reduce repetitive work,",
  titleAccent: "and support your team.",
  description: undefined,
  builds: [
    {
      title: "Save Time Every Week",
      description: "Automate everyday tasks and free up hours for work that matters.",
    },
    {
      title: "Reduce Repetitive Work",
      description: "Let AI handle drafts, answers, summaries, and follow-ups your team does repeatedly.",
    },
    {
      title: "Improve Customer Response",
      description: "Answer common questions faster and route complex issues to the right person.",
    },
    {
      title: "Make Information Easier to Access",
      description: "Turn scattered documents and knowledge into instant answers for your team.",
    },
    {
      title: "Increase Productivity",
      description: "Help your team focus on high-value work instead of manual lookups and busywork.",
    },
    {
      title: "Grow Without Adding Overhead",
      description: "Scale operations with practical AI assistants that work alongside your existing tools.",
    },
  ],
} as const;

export const AI_WHY_BUILD_SECTION = {
  eyebrow: "Why businesses choose GrowrixOS",
  title: "Built for practical outcomes, not experiments.",
  titleLead: "Built for practical outcomes,",
  titleAccent: "not experiments.",
  description:
    "Every AI assistant is designed around a real business job, integrated into your tools, and handed off so your team can keep improving it.",
  cards: [
    {
      title: "Start With One Use Case",
      description: "Solve one real problem first, then expand as the business sees value.",
    },
    {
      title: "Human-Ready Handoff",
      description: "Critical decisions stay with your team while AI handles the repetitive work.",
    },
    {
      title: "Works With Your Tools",
      description: "AI assistants connect into CRMs, help desks, knowledge bases, and communication tools.",
    },
    {
      title: "Designed to Improve",
      description: "Built with monitoring, feedback loops, and clear paths for expansion.",
    },
  ],
} as const;

export const AI_BUSINESS_SYSTEMS_PROCESS_SECTION = {
  eyebrow: "Our process",
  title: "How we build AI assistants that your team actually uses.",
  titleLead: "How we build AI assistants",
  titleAccent: "that your team actually uses.",
  description: undefined,
  steps: [
    {
      number: "01",
      title: "Discovery & Use Case",
      description: "Identify one practical AI opportunity that saves time or supports your team.",
    },
    {
      number: "02",
      title: "Knowledge & Design",
      description: "Define knowledge sources, workflows, and how the AI assistant will interact with users.",
    },
    {
      number: "03",
      title: "Build & Integration",
      description: "Implement the AI assistant and connect it to your existing tools and systems.",
    },
    {
      number: "04",
      title: "Testing & Handoff",
      description: "Refine responses, train your team, and deploy the assistant with confidence.",
    },
  ] satisfies Step[],
} as const;

export const AI_ENGAGEMENT_SECTION = {
  eyebrow: "Pricing",
  title: "Choose the AI path that fits your business stage.",
  titleLead: "Choose the AI path",
  titleAccent: "that fits your business stage.",
  description:
    "Whether you're exploring your first AI assistant, building a connected AI system, or looking for ongoing AI support, choose the option that matches your current stage.",
  trustNote:
    "Need something different? Every business operates differently. Discovery sessions help define scope, tooling, and the most suitable AI path.",
  tiers: [
    {
      name: "AI Starter",
      iconKey: "ai-discovery",
      price: "From $499",
      description:
        "Start with one practical AI assistant that solves a real business problem. Ideal for businesses exploring AI for the first time.",
      features: [
        "Discovery call",
        "One AI assistant",
        "Knowledge setup",
        "Prompt engineering",
        "Testing",
        "Deployment",
      ],
      cta: { label: "Build My First AI", href: "/book-appointment" },
    },
    {
      name: "Business AI System",
      iconKey: "ai-system-build",
      price: "From $1,999",
      description:
        "Design and deploy an AI system that supports your daily business operations. Ideal for businesses ready to integrate AI into customer support, internal workflows, sales, or content operations.",
      features: [
        "Discovery workshop",
        "Multiple AI workflows",
        "Business knowledge integration",
        "Customer support assistant",
        "Internal AI assistant",
        "Workflow integrations",
        "Staff onboarding",
        "Deployment",
      ],
      cta: { label: "Build My AI System", href: "/book-appointment" },
      featured: true,
      badge: "Most Popular",
    },
    {
      name: "AI Growth Partner",
      iconKey: "ai-operations-partner",
      price: "From $499",
      cadence: "/month",
      description:
        "Continuous improvements, prompt optimization, monitoring, and expansion of your AI systems. Starting from $499/month depending on scope.",
      features: [
        "AI improvements",
        "New assistants",
        "Knowledge updates",
        "Prompt optimization",
        "Monitoring",
        "Priority support",
      ],
      cta: { label: "Become an AI Partner", href: "/book-appointment" },
    },
  ],
} as const;

export const AI_BUSINESS_SYSTEMS_SERVICE_FAQ = [
  {
    question: "What types of AI assistants do you build?",
    answer:
      "Internal knowledge assistants, customer support assistants, sales assistants, content operations helpers, productivity tools, reporting assistants, and AI embedded in business workflows.",
  },
  {
    question: "Can AI be integrated with existing business tools?",
    answer:
      "Yes. We connect AI assistants to CRMs, help desks, CMS platforms, internal databases, and communication tools your team already uses.",
  },
  {
    question: "Do you use OpenAI models?",
    answer:
      "Often, yes—but we choose models based on quality, cost, latency, and data requirements. Other providers are used when they fit the use case better.",
  },
  {
    question: "Can AI be trained on our business knowledge?",
    answer:
      "Yes. We implement knowledge bases over your documents, policies, and operational content—with scoped access and update workflows.",
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
      "Discovery often completes in one to two weeks. An AI Starter build typically lands in two to four weeks. A Business AI System build usually lands in four to six weeks depending on integrations and review cycles.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Yes. AI Growth Partner engagements cover continuous improvements, monitoring, and expansion. One-time builds include handoff documentation and optional support scopes.",
  },
  {
    question: "How do AI projects usually begin?",
    answer:
      "With a discovery session to map workflows, identify one high-value use case, and recommend the right starting package before any build commitment.",
  },
] as const;

export const AI_BUSINESS_SYSTEMS_SERVICE_FAQ_SECTION = {
  eyebrow: "FAQ",
  title: "Common questions about practical AI assistants.",
  titleLead: "Common questions about",
  titleAccent: "practical AI assistants.",
  description:
    "Use cases, integrations, data handling, implementation timelines, and ongoing support—covered before you book a call.",
} as const;

export const AI_BUSINESS_SYSTEMS_SERVICE_CTA = {
  title: "Build your first practical AI assistant.",
  titleLead: "Build your first",
  titleAccent: "practical AI assistant.",
  description:
    "Book a discovery session and we'll recommend the right AI package for your current stage, with a clear plan and next steps.",
  primaryLabel: "Build My First AI",
  primaryHref: "/book-appointment",
  secondaryLabel: "Explore AI Solutions",
  secondaryHref: "#ai-solutions",
} as const;
