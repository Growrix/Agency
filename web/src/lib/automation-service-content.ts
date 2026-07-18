import type { Step } from "@/components/sections/ProcessSteps";
import type { Stat } from "@/components/sections/StatBlock";

export type AutomationWorkflowExample = {
  title: string;
  steps: string[];
  outcome: string;
};

export const AUTOMATION_SERVICE_STATS: Stat[] = [
  { value: "50+", label: "Digital assets built", hint: "Products, workflows, and internal systems" },
  { value: "3", label: "Service packages", hint: "Starter, Business, or Partner" },
  { value: "24h", label: "Average response time", hint: "Discovery and scoping inquiries" },
  { value: "Multi-tool", label: "Workflow-first systems", hint: "n8n, Zapier, Make, and custom APIs" },
];

export const AUTOMATION_SERVICE_HERO = {
  headline: "Operational systems that remove repetitive work — measurably.",
  headlineLead: "Operational systems that remove",
  headlineAccent: "repetitive work — measurably.",
  description:
    "We map workflows, identify bottlenecks, and build automation systems that reduce manual effort, improve consistency, and create operational speed.",
  secondaryCta: "View automation examples",
  secondaryHref: "#workflow-examples",
} as const;

export const AUTOMATION_WORKFLOW_SHOWCASE_SECTION = {
  id: "workflow-examples",
  eyebrow: "Workflow examples",
  title: "Examples of automation systems we can build.",
  titleLead: "Examples of automation systems",
  titleAccent: "we can build.",
  description:
    "Practical workflows designed to eliminate manual work, reduce delays, and improve operational efficiency.",
  workflows: [
    {
      title: "Lead Capture & Qualification",
      steps: [
        "Website Form",
        "CRM",
        "AI Qualification",
        "Sales Pipeline",
        "Slack Notification",
        "Follow-Up Task",
      ],
      outcome: "Respond faster and prioritize qualified opportunities automatically.",
    },
    {
      title: "Content Production Workflow",
      steps: [
        "Content Request",
        "AI Draft",
        "Human Review",
        "CMS Publish",
        "Social Distribution",
        "Performance Tracking",
      ],
      outcome: "Reduce content production time while maintaining quality control.",
    },
    {
      title: "Client Onboarding Automation",
      steps: [
        "Client Payment",
        "Project Creation",
        "Welcome Sequence",
        "Task Assignment",
        "Document Collection",
        "Progress Tracking",
      ],
      outcome: "Deliver a consistent onboarding experience without repetitive admin work.",
    },
    {
      title: "Support Ticket Workflow",
      steps: [
        "Support Request",
        "Categorization",
        "Priority Assignment",
        "Team Routing",
        "Resolution Tracking",
        "Customer Update",
      ],
      outcome: "Improve response times and reduce operational bottlenecks.",
    },
  ] satisfies AutomationWorkflowExample[],
} as const;

export const AUTOMATION_TYPES_SECTION = {
  eyebrow: "Automation types",
  title: "Automation systems designed around business operations.",
  titleLead: "Automation systems designed",
  titleAccent: "around business operations.",
  description:
    "From lead management to AI workflows, we build practical systems that improve efficiency and reduce manual effort.",
  items: [
    {
      title: "Lead Management",
      description: "Capture, enrich, score, and route leads automatically.",
    },
    {
      title: "CRM Automation",
      description: "Keep customer records updated and synchronized.",
    },
    {
      title: "Client Onboarding",
      description: "Automate repetitive setup processes and communications.",
    },
    {
      title: "AI Workflows",
      description: "Classification, summarization, content generation, and decision support.",
    },
    {
      title: "Reporting Systems",
      description: "Generate reports and dashboards automatically.",
    },
    {
      title: "Internal Operations",
      description: "Replace spreadsheets and repetitive admin work with structured workflows.",
    },
  ],
} as const;

export const AUTOMATION_OUTCOMES_SECTION = {
  eyebrow: "What we deliver",
  title: "Automation systems that create measurable operational gains.",
  titleLead: "Automation systems that create",
  titleAccent: "measurable operational gains.",
  description:
    "Every workflow is designed to save time, reduce errors, and improve visibility across your business.",
  builds: [
    {
      title: "Faster Lead Response",
      description: "Reduce response times from hours to minutes.",
    },
    {
      title: "Reduced Manual Work",
      description: "Eliminate repetitive operational tasks.",
    },
    {
      title: "Better Visibility",
      description: "Track workflows and business activity in real time.",
    },
    {
      title: "Consistent Processes",
      description: "Standardize execution across teams.",
    },
    {
      title: "AI-Assisted Operations",
      description: "Use AI where it creates measurable value.",
    },
    {
      title: "Scalable Systems",
      description: "Support growth without increasing administrative overhead.",
    },
  ],
} as const;

export const AUTOMATION_WHY_BUILD_SECTION = {
  eyebrow: "Why businesses automate with GrowrixOS",
  title: "Built around reliability, visibility, and operational improvement.",
  titleLead: "Built around reliability, visibility, and",
  titleAccent: "operational improvement.",
  description: "Automation should simplify operations, not create new complexity.",
  cards: [
    {
      title: "Automation Before AI",
      description: "Fix the workflow before introducing AI.",
    },
    {
      title: "Human Oversight",
      description: "Critical decisions always include review points where needed.",
    },
    {
      title: "Observable Systems",
      description: "Every workflow can be monitored, tracked, and improved.",
    },
    {
      title: "Predictable Operations",
      description: "Reduce delays, bottlenecks, and operational uncertainty.",
    },
  ],
} as const;

export const AUTOMATION_PROCESS_SECTION = {
  eyebrow: "Our process",
  title: "How we transform manual processes into scalable systems.",
  titleLead: "How we transform manual processes",
  titleAccent: "into scalable systems.",
  description:
    "A structured approach designed to identify opportunities, reduce risk, and deliver measurable operational improvements.",
  steps: [
    {
      number: "01",
      title: "Workflow Discovery",
      description: "Map current processes, bottlenecks, and manual effort.",
    },
    {
      number: "02",
      title: "System Design",
      description: "Define automation opportunities, logic, and workflow architecture.",
    },
    {
      number: "03",
      title: "Build & Integrate",
      description: "Implement automations, integrations, and AI-enhanced workflows.",
    },
    {
      number: "04",
      title: "Monitor & Optimize",
      description: "Measure results, refine workflows, and expand automation opportunities.",
    },
  ] satisfies Step[],
} as const;

export const AUTOMATION_ENGAGEMENT_SECTION = {
  eyebrow: "Pricing",
  title: "Choose Your Automation Path",
  titleLead: "Choose Your",
  titleAccent: "Automation Path",
  description:
    "Whether you're automating your first workflow, connecting multiple business processes, or looking for an ongoing automation partner, choose the option that matches your current stage.",
  trustNote:
    "Need something different? Every business operates differently. Discovery sessions help define scope, tooling, and the most suitable automation path.",
  tiers: [
    {
      name: "Automation Starter",
      iconKey: "workflow-audit",
      price: "From $499",
      description:
        "Automate a single workflow to eliminate repetitive tasks and save time. Ideal for businesses taking their first step into automation.",
      features: [
        "Discovery call",
        "One workflow automation",
        "Up to 2 integrations",
        "Basic testing",
        "Documentation",
        "Deployment",
      ],
      cta: { label: "Start Small", href: "/book-appointment" },
    },
    {
      name: "Business Automation",
      iconKey: "automation-build",
      price: "From $1,499",
      description:
        "Build connected automations that streamline operations and save hours every week. Ideal for businesses ready to automate sales, operations, customer communication, and internal workflows.",
      features: [
        "Discovery workshop",
        "Multiple workflow automations",
        "CRM integrations",
        "Email automation",
        "WhatsApp automation",
        "AI integrations (where applicable)",
        "Workflow testing",
        "Deployment",
        "Team handover",
      ],
      cta: { label: "Build My Automation", href: "/book-appointment" },
      featured: true,
      badge: "Most Popular",
    },
    {
      name: "Automation Partner",
      iconKey: "optimization-partner",
      price: "From $399",
      cadence: "/month",
      description:
        "Continuous improvements, monitoring, and new automation development for growing businesses. Starting from $399/month depending on scope.",
      features: [
        "Monthly workflow improvements",
        "New automations",
        "Monitoring",
        "Bug fixes",
        "Priority support",
        "Strategy sessions",
      ],
      cta: { label: "Become a Partner", href: "/book-appointment" },
    },
  ],
} as const;

export const AUTOMATION_SERVICE_FAQ = [
  {
    question: "What automation platforms do you use?",
    answer:
      "We choose the platform that fits volume, complexity, and ownership needs—commonly n8n, Zapier, Make, or custom Node services with direct API integrations.",
  },
  {
    question: "Do you build workflows with n8n?",
    answer:
      "Yes. n8n is a strong fit for self-hosted, observable workflows with complex branching, retries, and custom logic when you need more control than no-code alone.",
  },
  {
    question: "Do you work with Zapier and Make?",
    answer:
      "Yes. For lighter integrations and fast rollout, Zapier and Make are often the right starting point. We document handoff paths if you later need to migrate to n8n or custom services.",
  },
  {
    question: "Can AI be integrated safely?",
    answer:
      "Yes. AI steps are scoped with clear inputs, outputs, and human review where decisions matter. We avoid black-box automation on sensitive business logic.",
  },
  {
    question: "What happens if a workflow fails?",
    answer:
      "Every workflow includes explicit retry, escalation, and human handoff paths. Failures are logged and alert the right owner—they do not silently disappear.",
  },
  {
    question: "How do you handle sensitive business data?",
    answer:
      "We map data boundaries during discovery, use least-privilege credentials, and prefer tools and hosting models that match your compliance and retention requirements.",
  },
  {
    question: "Can you automate existing systems?",
    answer:
      "Yes. Most engagements connect systems you already use—CRMs, forms, billing, support tools, and internal databases—without replacing your core stack.",
  },
  {
    question: "Do I need technical knowledge?",
    answer:
      "No. You bring process knowledge and approval criteria; we handle architecture, implementation, and documentation so your team can operate the system confidently.",
  },
  {
    question: "How long does implementation take?",
    answer:
      "Discovery and initial scoping often complete in one to two weeks. Focused builds typically land in two to six weeks depending on integration count, exception logic, and approval cycles.",
  },
  {
    question: "Can workflows be expanded later?",
    answer:
      "Yes. We design modular workflows so you can add steps, integrations, or AI enhancements after the first system proves value—without rebuilding from scratch.",
  },
] as const;

export const AUTOMATION_SERVICE_FAQ_SECTION = {
  eyebrow: "FAQ",
  title: "Common automation questions, answered.",
  titleLead: "Common automation questions,",
  titleAccent: "answered.",
  description:
    "Platforms, failures, data handling, implementation timelines, and expansion—covered before you book a call.",
} as const;

export const AUTOMATION_SERVICE_CTA = {
  title: "Let's find where your business is losing time.",
  titleLead: "Let's find where your business",
  titleAccent: "is losing time.",
  description:
    "Book a discovery call and we'll recommend the right automation package for your current stage, goals, and everyday workflows.",
  primaryLabel: "Build My Automation",
  primaryHref: "/book-appointment",
  secondaryLabel: "View Automation Examples",
  secondaryHref: "#workflow-examples",
} as const;
