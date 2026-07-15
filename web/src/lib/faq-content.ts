export const FAQ_HERO = {
  eyebrow: "FAQ",
  title: "Answers before you ask.",
  titleLead: "Answers",
  titleAccent: "before you ask.",
  description:
    "Search by keyword or browse by category. Most questions here are about websites, SaaS builds, ready websites, and payment terms.",
} as const;

export const FAQ_CATEGORIES = [
  { id: "services", label: "Services" },
  { id: "pricing", label: "Pricing" },
  { id: "shop", label: "Shop" },
  { id: "booking", label: "Booking" },
  { id: "support", label: "Support" },
  { id: "technical", label: "Technical" },
] as const;

export type FaqQuestion = {
  category: string;
  question: string;
  answer: string;
  featured?: boolean;
};

export const FAQ_QUESTIONS: FaqQuestion[] = [
  {
    category: "services",
    question: "What services do you offer?",
    answer:
      "Premium websites, HTML business profiles, SaaS applications, mobile apps, automation, technical SEO, and AI business systems. Agent integrations and API-based workflows are scoped when they support the main build.",
  },
  {
    category: "services",
    question: "How do projects typically start?",
    answer:
      "A 30-minute discovery call, followed by a written plan within 48 hours. Nothing is signed until the plan reads correctly to you.",
  },
  {
    category: "services",
    question: "Will I own the code and assets?",
    answer: "Yes. On project completion, code, design files, and infrastructure ownership transfer to you.",
  },
  {
    category: "pricing",
    question: "Do you require an advance payment?",
    answer:
      "For qualifying international clients, we can offer delivery-first payment with no advance on the first 100 projects.",
  },
  {
    category: "pricing",
    question: "Can we choose a payment arrangement?",
    answer: "Yes. We are flexible and can tailor milestones, installments, or custom arrangements to the scope.",
  },
  {
    category: "pricing",
    question: "Can we pay monthly?",
    answer: "Yes. Larger scopes can be split into agreed installments, and ongoing partnerships can be structured monthly.",
  },
  {
    category: "shop",
    question: "What comes with a digital product purchase?",
    answer:
      "Template files or starter kits for self-serve tiers, expanded packages for Premium, and implementation support for Done-For-You. Delivered work includes setup guidance plus 1 year of support and maintenance.",
  },
  {
    category: "shop",
    question: "Do shop products include support?",
    answer:
      "Yes. Website templates, HTML business profiles, and digital products include setup guidance plus 1 year of support and maintenance.",
  },
  {
    category: "shop",
    question: "How do updates work?",
    answer:
      "Support and maintenance are included for the first year. After that, you can continue with an ongoing package or keep the delivered version as-is.",
  },
  {
    category: "booking",
    question: "How long is the discovery call?",
    answer: "30 minutes by default. We can extend to 60 minutes for complex projects on request.",
  },
  {
    category: "booking",
    question: "What time zones do you cover?",
    answer: "Primary CET hours, with availability for North American mornings and South Asian afternoons.",
  },
  {
    category: "booking",
    question: "Do you sign NDAs?",
    answer: "Yes — happy to sign a mutual NDA before the discovery call when needed.",
  },
  {
    category: "support",
    question: "Do you support after launch?",
    answer:
      "Yes. Every delivered site includes 1 year of free support and maintenance, and longer-term retainers are available after that.",
  },
  {
    category: "support",
    question: "What's your response time?",
    answer: "Inquiries: under 2 business hours. Retainer support: SLA-backed and defined per engagement.",
  },
  {
    category: "support",
    question: "Can you fix work from another team?",
    answer: "Yes. We frequently audit and rebuild on top of existing engagements with a clear assessment first.",
  },
  {
    category: "technical",
    question: "What stack do you prefer?",
    answer:
      "Next.js, React, TypeScript, Tailwind, and headless CMS setups like Strapi or Sanity are our defaults for websites. For products, we layer in the backend and infra that fit the roadmap.",
  },
  {
    category: "technical",
    question: "How do you handle data and privacy?",
    answer: "We follow GDPR-style baselines: minimal collection, encrypted at rest, scoped access, and clear retention.",
  },
];

export const FAQ_QUICK: Array<Pick<FaqQuestion, "question" | "answer">> = [
  {
    question: "How fast can we launch a website?",
    answer:
      "Digital products and done-for-you setup can move fastest. Custom websites usually land in 4-10 weeks depending on content and approvals.",
  },
  {
    question: "Do you work with our team?",
    answer: "Yes — we frequently embed alongside in-house teams as a product pod.",
  },
  {
    question: "How do payments work?",
    answer: "Flexible terms are available, and qualifying international clients can use a no-advance delivery-first model.",
  },
];
