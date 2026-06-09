export type ProductParentCategorySlug =
  | "business-professional"
  | "email-templates"
  | "documents-reports"
  | "ecommerce-marketing"
  | "education-info-products"
  | "tools-utilities";

export type ProductTypeDefinition = {
  slug: string;
  label: string;
  parentCategorySlug: ProductParentCategorySlug;
  description: string;
  sourcePatterns: string[];
};

export const PRODUCT_PARENT_CATEGORY_LABELS: Record<ProductParentCategorySlug, string> = {
  "business-professional": "Business & Professional",
  "email-templates": "Email Templates",
  "documents-reports": "Documents & Reports",
  "ecommerce-marketing": "E-Commerce & Marketing",
  "education-info-products": "Education & Info Products",
  "tools-utilities": "Tools & Utilities",
};

export const PRODUCT_TYPE_DEFINITIONS: ProductTypeDefinition[] = [
  {
    slug: "business-profile-pages",
    label: "Business Profile Pages",
    parentCategorySlug: "business-professional",
    description: "One-page HTML sites for freelancers, consultants, and local businesses.",
    sourcePatterns: ["biz-profile-", "business-profile-"],
  },
  {
    slug: "digital-business-cards",
    label: "Digital Business Cards",
    parentCategorySlug: "business-professional",
    description: "Interactive vCards with social links, QR codes, and contact actions.",
    sourcePatterns: ["biz-card-", "business-card-"],
  },
  {
    slug: "agency-landing-pages",
    label: "Agency Landing Pages",
    parentCategorySlug: "business-professional",
    description: "Conversion-focused landing pages for agencies and creative teams.",
    sourcePatterns: ["agency-landing-"],
  },
  {
    slug: "restaurant-menu-pages",
    label: "Restaurant Menu Pages",
    parentCategorySlug: "business-professional",
    description: "Mobile-first restaurant menu pages with pricing and section hierarchy.",
    sourcePatterns: ["restaurant-menu-"],
  },
  {
    slug: "newsletter-templates",
    label: "Newsletter Templates",
    parentCategorySlug: "email-templates",
    description: "Reusable newsletter layouts for updates, digests, and promotions.",
    sourcePatterns: ["newsletter-"],
  },
  {
    slug: "transactional-email-templates",
    label: "Transactional Email Templates",
    parentCategorySlug: "email-templates",
    description: "Order, onboarding, and system notification email templates.",
    sourcePatterns: ["transactional-"],
  },
  {
    slug: "promotional-email-blasts",
    label: "Promotional Email Blasts",
    parentCategorySlug: "email-templates",
    description: "Campaign-oriented email templates for launches and seasonal offers.",
    sourcePatterns: ["promo-blast-"],
  },
  {
    slug: "cold-outreach-templates",
    label: "Cold Outreach Templates",
    parentCategorySlug: "email-templates",
    description: "B2B outreach templates with concise, response-focused structures.",
    sourcePatterns: ["cold-outreach-"],
  },
  {
    slug: "html-invoice-templates",
    label: "HTML Invoice Templates",
    parentCategorySlug: "documents-reports",
    description: "Branded invoice templates with printable and client-friendly layouts.",
    sourcePatterns: ["invoice-"],
  },
  {
    slug: "proposal-templates",
    label: "Proposal Templates",
    parentCategorySlug: "documents-reports",
    description: "Client-facing proposal templates with pricing and scope sections.",
    sourcePatterns: ["proposal-"],
  },
  {
    slug: "html-resumes-cv",
    label: "HTML Resumes / CV",
    parentCategorySlug: "documents-reports",
    description: "Structured resume and CV templates with print-ready formatting.",
    sourcePatterns: ["resume-"],
  },
  {
    slug: "annual-report-pages",
    label: "Annual Report Pages",
    parentCategorySlug: "documents-reports",
    description: "Data-rich report templates for yearly summaries and metrics.",
    sourcePatterns: ["annual-report-"],
  },
  {
    slug: "product-launch-pages",
    label: "Product Launch Pages",
    parentCategorySlug: "ecommerce-marketing",
    description: "Pre-launch and release pages with countdowns and CTA modules.",
    sourcePatterns: ["product-launch-"],
  },
  {
    slug: "link-in-bio-pages",
    label: "Link-in-Bio Pages",
    parentCategorySlug: "ecommerce-marketing",
    description: "Creator-style link hub pages for social profile traffic.",
    sourcePatterns: ["link-in-bio-"],
  },
  {
    slug: "affiliate-landing-pages",
    label: "Affiliate Landing Pages",
    parentCategorySlug: "ecommerce-marketing",
    description: "Review and comparison pages with affiliate-ready CTA sections.",
    sourcePatterns: ["affiliate-landing-"],
  },
  {
    slug: "app-promo-pages",
    label: "App Promo Pages",
    parentCategorySlug: "ecommerce-marketing",
    description: "Mobile app promotion pages with screenshot and download blocks.",
    sourcePatterns: ["app-promo-"],
  },
  {
    slug: "course-landing-pages",
    label: "Course Landing Pages",
    parentCategorySlug: "education-info-products",
    description: "Course sales pages with syllabus, social proof, and enroll CTAs.",
    sourcePatterns: ["course-landing-"],
  },
  {
    slug: "lead-magnet-download-pages",
    label: "Lead Magnet Download Pages",
    parentCategorySlug: "education-info-products",
    description: "Gated download pages for checklists, guides, and PDF assets.",
    sourcePatterns: ["lead-magnet-"],
  },
  {
    slug: "event-webinar-pages",
    label: "Event / Webinar Pages",
    parentCategorySlug: "education-info-products",
    description: "Registration and event information pages with speaker sections.",
    sourcePatterns: ["event-webinar-"],
  },
  {
    slug: "portfolio-templates",
    label: "Portfolio Templates",
    parentCategorySlug: "education-info-products",
    description: "Portfolio-style templates for designers, photographers, and makers.",
    sourcePatterns: ["portfolio-"],
  },
  {
    slug: "calculators",
    label: "Calculators",
    parentCategorySlug: "tools-utilities",
    description: "Interactive calculator templates for pricing and ROI workflows.",
    sourcePatterns: ["calculator-"],
  },
  {
    slug: "checklists-trackers",
    label: "Checklists & Trackers",
    parentCategorySlug: "tools-utilities",
    description: "Checklist and tracker templates with local state persistence.",
    sourcePatterns: ["checklist-tracker-"],
  },
  {
    slug: "faq-knowledge-base-pages",
    label: "FAQ / Knowledge Base Pages",
    parentCategorySlug: "tools-utilities",
    description: "Help-center and FAQ templates with quick-scan support structure.",
    sourcePatterns: ["faq-kb-"],
  },
  {
    slug: "coming-soon-maintenance-pages",
    label: "Coming Soon / Maintenance Pages",
    parentCategorySlug: "tools-utilities",
    description: "Placeholder templates for launches, maintenance windows, and waits.",
    sourcePatterns: ["coming-soon-"],
  },
];

const PRODUCT_TYPE_BY_SLUG = new Map(PRODUCT_TYPE_DEFINITIONS.map((item) => [item.slug, item] as const));

export function getProductTypeDefinition(slug: string) {
  return PRODUCT_TYPE_BY_SLUG.get(slug) ?? null;
}

export function isCanonicalProductTypeSlug(slug: string) {
  return PRODUCT_TYPE_BY_SLUG.has(slug);
}

export function inferProductTypeByFilename(fileName: string) {
  const normalized = fileName.toLowerCase();
  return PRODUCT_TYPE_DEFINITIONS.find((item) => item.sourcePatterns.some((prefix) => normalized.startsWith(prefix))) ?? null;
}
