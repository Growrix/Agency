export const CONTACT_HERO = {
  eyebrow: "Contact",
  title: "Let's plan the fastest path from idea to launch.",
  description:
    "Whether you're launching a website, SaaS platform, mobile app, automation system, AI implementation, or technical SEO project, we'll help identify the right approach and next steps.",
  proofPoints: [
    "Under 2 business hour response time",
    "Conversations stay private",
    "Discovery-first approach",
  ],
} as const;

export const CONTACT_HERO_PANEL = {
  heading: "What to expect",
  responseTime: { label: "Response time", value: "Under 2 business hours" },
  discoveryCalls: { label: "Discovery calls", value: "30 minutes" },
  servicesEyebrow: "Services supported",
  services: [
    "Websites",
    "SaaS Applications",
    "Mobile Apps",
    "Automation",
    "Technical SEO",
    "AI Business Systems",
  ],
  projectTypesEyebrow: "Project types",
  projectTypes: [
    "New Projects",
    "Existing Systems",
    "Product Improvements",
    "Launch Planning",
  ],
} as const;

export const CONTACT_CHANNELS = {
  eyebrow: "Channels",
  title: "Pick the route that fits.",
  items: [
    {
      name: "Project Inquiry",
      description:
        "Best for websites, SaaS products, mobile apps, automation projects, AI systems, and technical SEO engagements.",
      action: "Use the form below",
      href: "#form",
      recommended: true,
    },
    {
      name: "WhatsApp",
      description: "Best for quick questions, timelines, pricing clarification, and project discussions.",
      action: "Open WhatsApp",
      href: "whatsapp",
    },
    {
      name: "Instant Answers",
      description: "Best for instant guidance about services, products, timelines, and project planning.",
      action: "Ask AI GrowrixOS",
      href: "concierge",
    },
    {
      name: "Book A Call",
      description: "Best for discovery sessions, project planning, and decision-making conversations.",
      action: "Book appointment",
      href: "/book-appointment",
    },
  ],
} as const;

export const CONTACT_PROCESS = {
  eyebrow: "Process",
  title: "What happens after you get in touch.",
  description: "A simple process designed to quickly identify the right next step.",
  steps: [
    {
      number: "01",
      title: "Submit Inquiry",
      description: "Tell us about your goals, project, or challenge.",
    },
    {
      number: "02",
      title: "Receive Response",
      description: "You'll receive a reply within 2 business hours.",
    },
    {
      number: "03",
      title: "Discovery Conversation",
      description: "If needed, we'll schedule a short discussion to clarify scope and priorities.",
    },
    {
      number: "04",
      title: "Written Recommendation",
      description: "We'll recommend the most suitable path, timeline, and approach.",
    },
    {
      number: "05",
      title: "Proposal & Next Steps",
      description: "If we're a good fit, you'll receive a clear scope and recommended next steps.",
    },
  ],
} as const;

export const CONTACT_ROUTES = {
  eyebrow: "Starting points",
  title: "Choose the route that matches your goal.",
  cards: [
    {
      title: "I Need A Website",
      description: "Business websites, marketing sites, landing pages, and online visibility.",
      cta: { label: "Explore Website Services", href: "/services/websites" },
    },
    {
      title: "I Need A Product",
      description: "SaaS applications, mobile products, and customer platforms.",
      cta: { label: "Explore Product Services", href: "/services/saas-applications" },
    },
    {
      title: "I Need Better Operations",
      description: "Automation systems, workflows, and AI business systems.",
      cta: { label: "Explore Operations Services", href: "/services/automation" },
    },
    {
      title: "I Need More Visibility",
      description: "Technical SEO, analytics, and search foundations.",
      cta: { label: "Explore Technical SEO", href: "/services/technical-seo" },
    },
  ],
} as const;

export const CONTACT_FORM = {
  eyebrow: "Inquiry form",
  title: "Tell us what you're planning.",
  description:
    "Share your project, business goals, timeline, or challenge. We'll recommend the most suitable next step.",
  trustHeading: "What happens to your information?",
  trustCopy:
    "Your message is encrypted in transit and only reviewed by GrowrixOS. We do not share inquiry information with third parties.",
  projectFitHeading: "Projects we commonly help with",
  projectFitItems: [
    "Website launches",
    "SaaS products",
    "Mobile apps",
    "Automation systems",
    "AI implementations",
    "Technical SEO foundations",
    "Product redesigns",
    "Growth-focused improvements",
  ],
  messagePlaceholder: "Tell us about the project, business goal, or problem you're trying to solve.",
} as const;

export const CONTACT_SERVICE_INTERESTS = [
  { value: "websites", label: "Websites" },
  { value: "saas_applications", label: "SaaS Applications" },
  { value: "mobile_apps", label: "Mobile Apps" },
  { value: "automation", label: "Automation" },
  { value: "technical_seo", label: "Technical SEO" },
  { value: "ai_business_systems", label: "AI Business Systems" },
  { value: "not_sure_yet", label: "Not Sure Yet" },
] as const;

export const CONTACT_BUDGET_BANDS = [
  "$15 - $49",
  "$49 - $149",
  "$149 - $399",
  "$299 - $1,500",
  "$1,500 - $8,000",
  "$8,000+",
  "Not sure yet",
] as const;

export const CONTACT_URGENCY = ["Exploring", "Within 30 days", "Within 90 days", "ASAP"] as const;

export const CONTACT_EXPLORE = {
  title: "Still exploring your options?",
  description: "Learn more about our services, work, and delivery approach before starting a conversation.",
  cards: [
    {
      title: "Portfolio",
      description: "Explore completed projects and outcomes.",
      href: "/portfolio",
    },
    {
      title: "Services",
      description: "See how we help businesses launch and grow.",
      href: "/services",
    },
    {
      title: "Digital Products",
      description: "Browse ready-made solutions and starter systems.",
      href: "/digital-products",
    },
    {
      title: "Field Notes",
      description: "Read practical insights on products, systems, automation, and growth.",
      href: "/blog",
    },
  ],
} as const;

export const CONTACT_FAQ = {
  eyebrow: "FAQ",
  title: "Questions before you write.",
  items: [
    {
      question: "How do projects typically start?",
      answer:
        "Most engagements begin with a short discovery conversation or written scoping pass. We summarize the problem, propose scope, and share a written plan within 48 hours. Nothing moves forward until the plan reads correctly to you.",
    },
    {
      question: "What is your typical timeline?",
      answer:
        "Custom websites usually land in 4–10 weeks. Ready websites can move faster when content is clear. SaaS products run 8–24 weeks depending on integrations. Automation and AI business systems are scoped based on workflow complexity.",
    },
    {
      question: "Do you handle content, copywriting, and assets?",
      answer:
        "Yes. Hero rewrites, FAQ updates, case study positioning, and launch-supporting content can be handled as part of the build or as a focused content pass.",
    },
    {
      question: "How do payments work?",
      answer:
        "For international clients, we can offer delivery-first payment with no advance on qualifying projects. We also support flexible milestone or custom arrangements when the scope makes sense.",
    },
    {
      question: "Can you improve an existing website or product?",
      answer:
        "Yes. Many inquiries are for redesigns, performance improvements, SEO foundations, or product upgrades on existing systems — not just net-new builds.",
    },
    {
      question: "Can multiple services be combined?",
      answer:
        "Yes. Websites, SaaS, mobile, automation, technical SEO, and AI business systems are often combined into one delivery plan when they support the same business outcome.",
    },
    {
      question: "Do I need a discovery call?",
      answer:
        "Not always. Clear, well-scoped inquiries can often be answered in writing first. Discovery calls are recommended when scope, integrations, or timeline trade-offs need a live conversation.",
    },
    {
      question: "How quickly can projects begin?",
      answer:
        "Digital products and smaller website engagements can often start within days. Custom builds typically begin after discovery, written scope approval, and scheduling alignment.",
    },
    {
      question: "Do you work internationally?",
      answer:
        "Yes. We work with clients globally and can adapt communication, payment, and delivery workflows to match your timezone and business requirements.",
    },
    {
      question: "What happens after I submit an inquiry?",
      answer:
        "You'll receive a reply within 2 business hours. If needed, we'll schedule a short discovery conversation, then follow up with a written recommendation and clear next steps.",
    },
  ],
} as const;
