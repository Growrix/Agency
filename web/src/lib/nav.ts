import { WEBSITE_TEMPLATE_PREVIEW } from "@/lib/preview-terminology";

export const PRIMARY_NAV = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Websites", href: "/services/websites", description: "Design-forward marketing sites built for conversion." },
      { label: "SaaS Applications", href: "/services/saas-applications", description: "Product strategy + engineering for new and rebuilt SaaS." },
      { label: "Mobile Apps", href: "/services/mobile-apps", description: "App launch sites, companion apps, and store-ready mobile experiences." },
      { label: "Automation", href: "/services/automation", description: "Operational systems that remove repetitive work." },
      { label: "Technical SEO", href: "/services/technical-seo", description: "One-time search, analytics, and Core Web Vitals setup." },
      { label: "AI Business Systems", href: "/services/ai-business-systems", description: "Practical AI implementation for assistants, knowledge systems, and operational workflows." },
    ],
  },
  {
    label: "Digital Products",
    href: "/digital-products",
    children: [
      { label: "All Digital Products", href: "/digital-products", description: "Browse the full digital product catalog." },
      { label: "HTML Business Profiles", href: "/digital-products/category/html-business-profiles", description: "Category-based templates with self-serve and done-for-you upgrade paths." },
      { label: WEBSITE_TEMPLATE_PREVIEW.categoryNavLabel, href: "/digital-products/category/website-templates-html-preview", description: WEBSITE_TEMPLATE_PREVIEW.categoryNavDescription },
      { label: "Bundles", href: "/digital-products/bundles", description: "Curated packs for agencies and founders." },
      { label: "Free Starters", href: "/digital-products/free", description: "Lead magnets and free launch-ready starters." },
    ],
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_NAV = {
  Services: [
    { label: "Websites", href: "/services/websites" },
    { label: "SaaS Applications", href: "/services/saas-applications" },
    { label: "Mobile Apps", href: "/services/mobile-apps" },
    { label: "Automation", href: "/services/automation" },
    { label: "Technical SEO", href: "/services/technical-seo" },
    { label: "AI Business Systems", href: "/services/ai-business-systems" },
  ],
  "Digital Products": [
    { label: "All Digital Products", href: "/digital-products" },
    { label: "Bundles", href: "/digital-products/bundles" },
    { label: "Free Starters", href: "/digital-products/free" },
    { label: "HTML Business Profiles", href: "/digital-products/category/html-business-profiles" },
    { label: WEBSITE_TEMPLATE_PREVIEW.categoryNavLabel, href: "/digital-products/category/website-templates-html-preview" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  Support: [
    { label: "FAQ", href: "/faq" },
    { label: "AI Growrix OS", href: "/ai-concierge" },
    { label: "Book Appointment", href: "/book-appointment" },
    { label: "WhatsApp", href: "https://wa.me/8801986925425" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Refund Policy", href: "/refund-policy" },
  ],
};

export const WHATSAPP_HREF = "https://wa.me/8801986925425";

/** Secondary links surfaced in the mobile header menu (not duplicated in PRIMARY_NAV). */
export const MOBILE_NAV_SUPPORT_LINKS = [
  { label: "FAQ", href: "/faq" },
  { label: "Book Appointment", href: "/book-appointment" },
  { label: "SEO Service", href: "/additional-services" },
  { label: "Live Chat", href: "/live-chat" },
] as const;

export const MOBILE_NAV_LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Refund Policy", href: "/refund-policy" },
] as const;
