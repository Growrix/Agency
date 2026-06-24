import type { Step } from "@/components/sections/ProcessSteps";
import type { Stat } from "@/components/sections/StatBlock";

export const WEBSITES_SERVICE_STATS: Stat[] = [
  { value: "50+", label: "Websites delivered", hint: "Marketing sites, launches, and hubs" },
  { value: "3 days", label: "Typical start window", hint: "From brief to active project kickoff" },
  { value: "24h", label: "Average response time", hint: "Sales and project inquiries" },
  { value: "3 paths", label: "Delivery models", hint: "Templates, ready sites, or custom build" },
];

export const WEBSITES_SERVICE_HERO = {
  headline: "Websites built to convert, not just look good.",
  headlineLead: "Websites built to",
  headlineAccent: "convert, not just look good.",
  description:
    "Launch a high-performance website designed to generate enquiries, support sales conversations, and grow your business.",
  secondaryCta: "View website portfolio",
  secondaryHref: "/portfolio",
} as const;

export const WEBSITES_FEATURED_TEMPLATES_COPY = {
  eyebrow: "Featured templates",
  title: "Production-ready templates with live desktop preview",
  titleLead: "Production-ready templates with",
  titleAccent: "live desktop preview",
  description:
    "Deliver flawless experiences across every device—preview, purchase, and launch from proven website systems.",
} as const;

export const WEBSITES_ENGAGEMENT_SECTION = {
  eyebrow: "Engagement models",
  title: "Pick the surface area that matches the work.",
  titleLead: "Pick the surface area",
  titleAccent: "that matches the work.",
} as const;

export const WEBSITES_OUTCOMES_SECTION = {
  eyebrow: "What we deliver",
  title: "Solutions designed around business outcomes.",
  titleLead: "Solutions designed around",
  titleAccent: "business outcomes.",
  description:
    "Every website and system we build is designed to solve a specific business problem, improve customer experience, and support growth.",
  builds: [
    {
      title: "Lead Generation Websites",
      description: "Turn website traffic into qualified enquiries and sales conversations.",
      icon: "lead-generation",
    },
    {
      title: "Product Launch Websites",
      description: "Launch new products, offers, and services with confidence.",
      icon: "product-launch",
    },
    {
      title: "Client Portals",
      description: "Create smoother client experiences while reducing manual administration.",
      icon: "client-portals",
    },
    {
      title: "Landing Pages",
      description: "Improve campaign performance and maximize conversion rates.",
      icon: "landing-pages",
    },
    {
      title: "Internal Business Systems",
      description: "Streamline operations and reduce repetitive work.",
      icon: "internal-systems",
    },
    {
      title: "Resource & Content Hubs",
      description: "Build authority, improve SEO visibility, and educate your audience.",
      icon: "content-hubs",
    },
  ],
} as const;

export const WEBSITES_WHY_CHOOSE_SECTION = {
  eyebrow: "Why clients choose GrowrixOS",
  title: "Built for performance, growth, and long-term scalability.",
  titleLead: "Built for performance, growth, and",
  titleAccent: "long-term scalability.",
  description:
    "Every project is designed around outcomes that help businesses grow, convert, and operate more efficiently.",
  cards: [
    {
      title: "Conversion Frameworks",
      description: "Built around lead generation, customer actions, and measurable business goals.",
      icon: "conversion-frameworks",
    },
    {
      title: "Modern Infrastructure",
      description: "Fast, secure, scalable foundations designed for long-term growth.",
      icon: "modern-infrastructure",
    },
    {
      title: "Performance by Default",
      description: "Optimized for speed, responsiveness, and user experience from day one.",
      icon: "performance-default",
    },
    {
      title: "Mobile-First UX",
      description: "Designed around how modern users browse, research, and make decisions.",
      icon: "mobile-first-ux",
    },
  ],
} as const;

export const WEBSITES_PROOF_SECTION = {
  eyebrow: "Featured proof",
  title: "Recent work in this practice.",
  titleLead: "Recent work",
  titleAccent: "in this practice.",
} as const;

export const WEBSITES_SERVICE_FAQ_SECTION = {
  eyebrow: "FAQ",
  title: "Common website project questions, answered.",
  titleLead: "Common website project questions,",
  titleAccent: "answered.",
  description:
    "Timelines, ownership, platforms, support, and pricing—covered before you book a call.",
} as const;

export const WEBSITES_LAUNCH_PROCESS_SECTION = {
  eyebrow: "Our process",
  title: "How we take you from idea to launch.",
  titleLead: "How we take you from",
  titleAccent: "idea to launch.",
  description:
    "A clear process designed to reduce uncertainty, improve collaboration, and keep projects moving forward.",
  steps: [
    {
      number: "01",
      title: "Discovery",
      description: "Clarify business goals, users, requirements, and opportunities.",
    },
    {
      number: "02",
      title: "Planning",
      description: "Structure content, architecture, user journeys, and project scope.",
    },
    {
      number: "03",
      title: "Design & Build",
      description: "Create and develop a high-performance website aligned with your objectives.",
    },
    {
      number: "04",
      title: "Launch & Improve",
      description: "Deploy, monitor, optimize, and support continued growth.",
    },
  ] satisfies Step[],
} as const;

export const WEBSITES_SERVICE_FAQ = [
  {
    question: "How long does a website project take?",
    answer:
      "Template and ready-website paths can launch in days to a few weeks when content is ready. Custom marketing sites typically land in 4–10 weeks depending on scope, content, and approvals.",
  },
  {
    question: "What platforms do you build on?",
    answer:
      "We default to Next.js, React, and TypeScript with Tailwind CSS for performance and maintainability. CMS integrations include Sanity, Contentful, and Payload depending on your editorial needs.",
  },
  {
    question: "Can you redesign an existing website?",
    answer:
      "Yes. We audit your current site, identify conversion and performance gaps, and scope a redesign that preserves what works while improving lead flow, speed, and brand clarity.",
  },
  {
    question: "Do I own the website after launch?",
    answer:
      "Yes. You receive full ownership of the delivered site, assets, and documentation. Hosting and domain remain in your accounts unless we agree to managed setup as part of the engagement.",
  },
  {
    question: "Can you help with website content?",
    answer:
      "Yes. Content support is available as an add-on or collaborative pass—we can structure pages, refine messaging, and align copy to conversion goals alongside your team.",
  },
  {
    question: "Is hosting included?",
    answer:
      "Hosting is not bundled by default. We deploy to your preferred platform—commonly Vercel, Netlify, or your existing infrastructure—and provide a clear handoff with environment documentation.",
  },
  {
    question: "Can I edit the website myself?",
    answer:
      "Yes. We integrate headless CMS or editor-friendly workflows when you need self-serve updates. Template and ready-website buyers also receive guidance for safe, repeatable edits.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We verify analytics, performance, and critical flows post-launch. Ongoing optimization, support retainers, and growth experiments are available if you want continued partnership.",
  },
  {
    question: "Do you offer ongoing support?",
    answer:
      "Yes. Shop products include setup guidance and support options. Custom engagements can include maintenance, content updates, and conversion improvements on a retainer or sprint basis.",
  },
  {
    question: "Can I start with a template and upgrade later?",
    answer:
      "Absolutely. Many clients launch on a template or ready website first, then expand into custom pages, integrations, or a full rebuild as the business grows.",
  },
  {
    question: "How do website projects begin?",
    answer:
      "Start with a 30-minute strategy call or send a brief through our contact form. We respond within one business day with recommended path, timeline range, and next steps.",
  },
  {
    question: "How much does a typical project cost?",
    answer:
      "Templates start from $500, ready websites from $1k, and custom builds are scoped after discovery. We share transparent ranges upfront so you can choose the path that fits budget and urgency.",
  },
] as const;

export const WEBSITES_SERVICE_CTA = {
  title: "Let's map your next website.",
  titleLead: "Let's map your next",
  titleAccent: "website.",
  description:
    "Book a 30-minute strategy session and leave with a clear roadmap, scope, and next steps for your project.",
  primaryLabel: "Plan My Website",
  primaryHref: "/book-appointment",
  secondaryLabel: "View Templates",
  secondaryHref: "/digital-products/category/website-templates-html-preview",
} as const;
