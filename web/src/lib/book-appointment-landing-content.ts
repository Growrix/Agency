export const BOOK_APPOINTMENT_HERO = {
  eyebrow: "Book a call",
  title: "Plan your next step with a focused discovery session.",
  description:
    "A 30-minute conversation to clarify goals, scope, timeline, and the right path forward for websites, SaaS products, mobile apps, automation, technical SEO, or AI business systems.",
  proofPoints: [
    "30-minute discovery sessions",
    "Under 2 business hour confirmation",
    "No commitment required",
  ],
  primaryCta: "Reserve a slot",
  primaryHref: "#booking",
  secondaryCta: "Send a written inquiry",
  secondaryHref: "/contact",
} as const;

export const BOOK_APPOINTMENT_HERO_PANEL = {
  heading: "Discovery call overview",
  duration: { label: "Duration", value: "30 minutes" },
  confirmation: { label: "Confirmation", value: "Within 2 business hours" },
  bestForEyebrow: "Best for",
  bestFor: [
    "Scope clarification",
    "Timeline planning",
    "Service fit",
    "Launch priorities",
  ],
  bringEyebrow: "Helpful to share",
  bring: [
    "Business goals",
    "Current site or product",
    "Target launch date",
    "Known integrations",
  ],
  servicesEyebrow: "Services covered",
  services: [
    "Websites",
    "SaaS Applications",
    "Mobile Apps",
    "Automation",
    "Technical SEO",
    "AI Business Systems",
  ],
} as const;

export const BOOK_APPOINTMENT_FORM = {
  eyebrow: "Schedule",
  title: "Choose a time and share your project context.",
  description:
    "Select a preferred slot and tell us what you're planning. We'll confirm the session and follow up with clear next steps.",
  trustHeading: "What happens after you book?",
  trustCopy:
    "Your request is reviewed by GrowrixOS. We'll confirm the session or suggest a better time within 2 business hours.",
  timezoneLabel: "Your timezone",
  slotPreviewLabel: "Selected slot",
  slotPreviewEmpty: "Pick a date and time to preview your discovery call request.",
  slotPreviewMeta: "30 minute discovery call",
  notesPlaceholder:
    "Tell us about the project, business goal, current site or product, blockers, and target launch date.",
} as const;

export const BOOK_APPOINTMENT_SERVICE_OPTIONS = [
  "Websites",
  "SaaS Applications",
  "Mobile Apps",
  "Automation",
  "Technical SEO",
  "AI Business Systems",
  "HTML Business Profiles",
  "Not sure yet",
] as const;

export const BOOK_APPOINTMENT_ALTERNATIVES = {
  eyebrow: "Other routes",
  title: "Prefer a different starting point?",
  cards: [
    {
      title: "WhatsApp",
      description: "Fastest path for quick questions during business hours.",
      href: "whatsapp",
      cta: "Open WhatsApp",
    },
    {
      title: "Written inquiry",
      description: "Send a structured brief if your scope is still taking shape.",
      href: "/contact",
      cta: "Go to contact",
    },
    {
      title: "Instant answers",
      description: "Use AI GrowrixOS to qualify the project before the call.",
      href: "concierge",
      cta: "Open concierge",
    },
  ],
} as const;
