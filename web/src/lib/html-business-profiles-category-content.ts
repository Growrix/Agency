import type { AccordionItem } from "@/components/sections/Accordion";
import type { Step } from "@/components/sections/ProcessSteps";
import { HTML_BUSINESS_PROFILE_SHOP_CATEGORY } from "@/lib/html-business-profiles";
import { getProductHref } from "@/lib/shop";

export const HTML_BUSINESS_PROFILES_CATEGORY_PATH =
  `/digital-products/category/${HTML_BUSINESS_PROFILE_SHOP_CATEGORY.slug}` as const;

export const HTML_BUSINESS_PROFILES_DIGITAL_PRODUCTS_PATH = "/digital-products" as const;

export const HTML_BUSINESS_PROFILES_CATEGORY_ANCHORS = {
  profiles: "profiles",
  pricing: "pricing",
  customization: "customization",
  faq: "faq",
} as const;

export const HTML_BUSINESS_PROFILES_CATEGORY_METADATA = {
  title: HTML_BUSINESS_PROFILE_SHOP_CATEGORY.label,
  description:
    "Category-specific HTML business profile websites ready in 24 hours. Preview live mobile profiles and launch a professional online presence fast.",
} as const;

export const HTML_BUSINESS_PROFILES_CATEGORY_FEATURED_LIMIT = 8;

type CategoryHeroProduct = {
  slug: string;
  name: string;
  type: string;
  price: string;
  embeddedPreviewUrl?: string;
  livePreviewUrl?: string;
};

export const HTML_BUSINESS_PROFILES_CATEGORY_HERO = {
  eyebrow: HTML_BUSINESS_PROFILE_SHOP_CATEGORY.label,
  title: "Professional Business Profile Websites Ready in 24 Hours",
  titleLead: "Professional business profile websites",
  titleAccent: "ready in 24 hours.",
  description:
    "Choose a category-specific HTML business profile, customize it if needed, and launch a professional online presence without a full website project.",
  primaryCta: "Browse Business Profiles",
  secondaryCta: "View Live Examples",
  previewLabel: "Live mobile profile preview",
  backLabel: "All digital products",
  backHref: HTML_BUSINESS_PROFILES_DIGITAL_PRODUCTS_PATH,
  stats: [
    { value: "50+", label: "Business Profiles" },
    { value: "24h", label: "Response Time" },
    { value: "4", label: "Service Levels" },
    { value: "100%", label: "Mobile Responsive" },
  ],
} as const;

export const HTML_BUSINESS_PROFILES_CATEGORY_HERO_FALLBACK_SLIDES = [
  { slug: "", name: "Cafe Business Profile", type: "Cafe", price: "$19" },
  { slug: "", name: "Law Firm Business Profile", type: "Law Firm", price: "$19" },
  { slug: "", name: "Agency Business Profile", type: "Agency", price: "$19" },
  { slug: "", name: "Cleaning Business Profile", type: "Cleaning", price: "$19" },
] as const;

export function buildHtmlBusinessProfilesCategoryHeroSlides(products: CategoryHeroProduct[]) {
  const carouselProfiles =
    products.length > 0 ? products : [...HTML_BUSINESS_PROFILES_CATEGORY_HERO_FALLBACK_SLIDES];

  return carouselProfiles.map((profile) => ({
    name: profile.name,
    type: profile.type,
    price: profile.price,
    href: profile.slug ? getProductHref(profile) : HTML_BUSINESS_PROFILES_CATEGORY_PATH,
    previewUrl:
      "embeddedPreviewUrl" in profile
        ? (profile.embeddedPreviewUrl ?? ("livePreviewUrl" in profile ? profile.livePreviewUrl : undefined))
        : undefined,
  }));
}

export function getHtmlBusinessProfilesCategoryAnchorHref(
  anchor: keyof typeof HTML_BUSINESS_PROFILES_CATEGORY_ANCHORS,
) {
  return `${HTML_BUSINESS_PROFILES_CATEGORY_PATH}#${HTML_BUSINESS_PROFILES_CATEGORY_ANCHORS[anchor]}`;
}

function categoryContactHref(intent: string) {
  return `/contact?intent=${intent}&category=${HTML_BUSINESS_PROFILE_SHOP_CATEGORY.slug}`;
}

export const HTML_BUSINESS_PROFILES_CATEGORY_CATALOG_SECTION = {
  eyebrow: "Featured profiles",
  title: "Browse Popular HTML Business Profiles",
  titleLead: "Browse popular",
  titleAccent: "HTML business profiles.",
  description: "Business profile templates built for real businesses.",
  viewAllCta: "View All Business Profiles",
} as const;

export const HTML_BUSINESS_PROFILES_CATEGORY_PRICING_SECTION = {
  eyebrow: "Pricing",
  title: "Choose a profile. Customize it. Launch faster.",
  titleLead: "Choose a profile.",
  titleAccent: "Customize it. Launch faster.",
} as const;

export const HTML_BUSINESS_PROFILES_CATEGORY_PRICING_TIERS = [
  {
    title: "Template Only",
    investment: "$19",
    description: "For developers, agencies, and DIY users.",
    bestFor: ["HTML files", "Responsive design", "Documentation", "Commercial usage"],
    cta: { label: "Download Template", href: HTML_BUSINESS_PROFILES_CATEGORY_PATH },
  },
  {
    title: "Branded Setup",
    investment: "$49",
    description: "You provide logo, colors, and content. We customize and deliver.",
    bestFor: ["Branding setup", "Content insertion", "Basic customization", "Delivery ready"],
    cta: { label: "Request Branding", href: categoryContactHref("customize_template") },
    featured: true,
  },
  {
    title: "Business Launch",
    investment: "$299-$799",
    description: "Done-for-you launch support for businesses that want everything prepared.",
    bestFor: [
      "Full content setup",
      "Contact forms",
      "Images",
      "SEO basics",
      "Deployment support",
      "Launch assistance",
    ],
    cta: { label: "Request Quote", href: categoryContactHref("done-for-you") },
  },
] as const;

export const HTML_BUSINESS_PROFILES_CATEGORY_WHY_SECTION = {
  eyebrow: "Why business profiles",
  title: "Why Choose a Business Profile Instead of a Full Website?",
  titleLead: "Why choose a business profile",
  titleAccent: "instead of a full website?",
  description:
    "Not every business needs a custom website from day one. Launch with a professional business profile now, establish your online presence quickly, and expand when your business is ready.",
  cards: [
    {
      title: "Launch Faster",
      description:
        "Launch faster and start showing up online sooner. Go live in days with pre-structured profiles built for real business categories.",
      result:
        "Start promoting your business sooner and stop losing opportunities while waiting for a website to be built.",
    },
    {
      title: "Lower Cost",
      description:
        "Get a professional presence without the agency price tag. Start from $19 and invest in upgrades only when your business needs them.",
      result: "Preserve budget for marketing, operations, and growth while still looking credible online.",
    },
    {
      title: "Easy Upgrade Path",
      description:
        "Your profile can evolve into a branded website, lead platform, booking system, customer portal, or full SaaS product over time.",
      result:
        "Build once, grow gradually, and avoid restarting your online presence every time your business reaches a new stage.",
    },
  ],
} as const;

export const HTML_BUSINESS_PROFILES_CATEGORY_INCLUDED_SECTION = {
  eyebrow: "What's included",
  title: "Every profile includes",
  titleLead: "Every profile",
  titleAccent: "includes",
  items: [
    "Mobile responsive",
    "Clean HTML structure",
    "SEO-friendly layout",
    "Fast loading",
    "Commercial license",
    "Easy content editing",
    "Upgrade-ready architecture",
  ],
} as const;

export const HTML_BUSINESS_PROFILES_CATEGORY_CUSTOMIZATION_SECTION = {
  eyebrow: "Customization options",
  title: "Need changes? We can customize any profile.",
  titleLead: "Need changes?",
  titleAccent: "We can customize any profile.",
  groups: [
    { category: "Branding", items: ["Logo", "Colors", "Fonts"] },
    { category: "Content Setup", items: ["Pages", "Business Information", "Images"] },
    { category: "Integrations", items: ["Forms", "Booking Systems", "Maps", "Analytics"] },
    {
      category: "Expansion",
      items: ["Additional Pages", "Blog", "Service Pages", "Full Website Upgrade"],
    },
  ],
} as const;

export const HTML_BUSINESS_PROFILES_CATEGORY_UPGRADE_SECTION = {
  eyebrow: "Upgrade path",
  title: "Start small. Grow later.",
  titleLead: "Start small.",
  titleAccent: "Grow later.",
  steps: [
    "Template",
    "Branded Profile",
    "Business Launch",
    "Full Website",
    "Custom SaaS / Portal",
  ],
} as const;

export function buildHtmlBusinessProfilesUpgradeSteps(): Step[] {
  return HTML_BUSINESS_PROFILES_CATEGORY_UPGRADE_SECTION.steps.map((title, index) => ({
    number: String(index + 1).padStart(2, "0"),
    title,
    description: "",
  }));
}

export const HTML_BUSINESS_PROFILES_CATEGORY_CONSULTATION_CTA = {
  title: "Need More Than a Business Profile?",
  titleLead: "Need more than",
  titleAccent: "a business profile?",
  description:
    "If you need custom functionality, booking systems, automation, or a complete website, let's discuss your project.",
  responseNote: "Average response time: under 24 business hours.",
  primaryCta: "Book Consultation",
  primaryHref: "/book-appointment",
  secondaryCta: "Browse Profiles",
  secondaryHref: HTML_BUSINESS_PROFILES_CATEGORY_PATH,
} as const;

export const HTML_BUSINESS_PROFILES_CATEGORY_FAQ_SECTION = {
  eyebrow: "FAQ",
  title: "HTML Business Profiles questions, answered.",
  titleLead: "HTML business profile questions,",
  titleAccent: "answered.",
} as const;

export const HTML_BUSINESS_PROFILES_CATEGORY_FAQ: AccordionItem[] = [
  {
    question: "Can I preview profiles before purchasing?",
    answer:
      "Yes. Every profile includes a live preview so you can review the layout, style, and content flow before buying.",
  },
  {
    question: "Are these connected to checkout?",
    answer: "Yes. Each profile links directly to a product page and checkout flow.",
  },
  {
    question: "Can you customize the template?",
    answer: "Yes. We offer branding setup, content population, and integration add-ons.",
  },
  {
    question: "Do you provide hosting?",
    answer: "Hosting and deployment support are available under Business Launch packages.",
  },
  {
    question: "Can this become a full website later?",
    answer: "Yes. Every profile is built as a foundation you can expand into a full website.",
  },
  {
    question: "How quickly can you deliver?",
    answer: "Most customization projects begin within 24 business hours after requirements are confirmed.",
  },
];

export const HTML_BUSINESS_PROFILES_CATEGORY_FINAL_CTA = {
  eyebrow: "Next step",
  titleLead: "Ready to launch",
  titleAccent: "your business profile?",
  description: "Browse templates, pick a tier, or book a consultation to map the right path.",
  primaryLabel: "Browse Business Profiles",
  primaryHref: getHtmlBusinessProfilesCategoryAnchorHref("profiles"),
  secondaryLabel: "Book Strategy Call",
  secondaryHref: "/book-appointment",
} as const;
