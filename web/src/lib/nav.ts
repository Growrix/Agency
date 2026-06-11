export const PRIMARY_NAV = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "SaaS Applications", href: "/services/saas-applications", description: "Product strategy + engineering for new and rebuilt SaaS." },
      { label: "Websites", href: "/services/websites", description: "Design-forward marketing sites built for conversion." },
      { label: "Template Customization", href: "/services/template-customization", description: "Done-For-You setup for purchased templates — branding, deploy, and integrations." },
      { label: "MCP Servers", href: "/services/mcp-servers", description: "Production-ready Model Context Protocol servers for agents." },
      { label: "Automation", href: "/services/automation", description: "Operational systems that remove repetitive work." },
      { label: "SEO Service", href: "/additional-services", description: "One-time Technical SEO, analytics, and setup services." },
    ],
  },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "All Products", href: "/products", description: "Browse the full digital product catalog." },
      { label: "HTML Business Profiles", href: "/products/category/html-business-profiles", description: "Category-based templates with self-serve and done-for-you upgrade paths." },
      { label: "Website Templates", href: "/products/category/website-templates", description: "Ready website and SaaS templates for faster launches." },
      { label: "Website Templates HTML Preview", href: "/products/category/website-templates-html-preview", description: "Preview-first website templates page with embedded HTML rendering." },
      { label: "Bundles", href: "/products/bundles", description: "Curated packs for agencies and founders." },
      { label: "Free Starters", href: "/products/free", description: "Lead magnets and free launch-ready starters." },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions/for-startups",
    children: [
      { label: "For Startups", href: "/solutions/for-startups", description: "SaaS templates and MVP support for early-stage founders." },
      { label: "For Local Businesses", href: "/solutions/for-local-businesses", description: "HTML profiles and Done-For-You setup for local operators." },
      { label: "For Agencies", href: "/solutions/for-agencies", description: "Bundles and delivery systems for agency client work." },
      { label: "For SaaS Founders", href: "/solutions/for-saas-founders", description: "Starters, SEO kits, and technical implementation." },
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
    { label: "SaaS Applications", href: "/services/saas-applications" },
    { label: "Websites", href: "/services/websites" },
    { label: "Template Customization", href: "/services/template-customization" },
    { label: "MCP Servers", href: "/services/mcp-servers" },
    { label: "Automation", href: "/services/automation" },
    { label: "SEO Service", href: "/additional-services" },
  ],
  Products: [
    { label: "All Products", href: "/products" },
    { label: "Bundles", href: "/products/bundles" },
    { label: "Free Starters", href: "/products/free" },
    { label: "HTML Business Profiles", href: "/products/category/html-business-profiles" },
    { label: "Website Templates", href: "/products/category/website-templates" },
    { label: "Website Templates HTML Preview", href: "/products/category/website-templates-html-preview" },
  ],
  Solutions: [
    { label: "For Startups", href: "/solutions/for-startups" },
    { label: "For Local Businesses", href: "/solutions/for-local-businesses" },
    { label: "For Agencies", href: "/solutions/for-agencies" },
    { label: "For SaaS Founders", href: "/solutions/for-saas-founders" },
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
  ],
};

export const WHATSAPP_HREF = "https://wa.me/8801986925425";
