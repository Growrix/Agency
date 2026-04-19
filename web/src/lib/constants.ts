// Navigation and route constants derived from Shared Contracts and Frontend Architecture

export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Shop", href: "/shop" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "AI Concierge", href: "/ai-concierge" },
] as const;

export const SERVICES = [
  {
    title: "SaaS Applications",
    href: "/services/saas-applications",
    description: "Full-stack SaaS builds from product strategy to launch.",
    icon: "rocket",
  },
  {
    title: "Websites",
    href: "/services/websites",
    description: "High-conversion, design-forward websites that perform.",
    icon: "globe",
  },
  {
    title: "MCP Servers",
    href: "/services/mcp-servers",
    description: "Model Context Protocol servers for AI agent integrations.",
    icon: "server",
  },
  {
    title: "Automation",
    href: "/services/automation",
    description: "Workflow automation that delivers measurable operational leverage.",
    icon: "bolt",
  },
] as const;

export const FOOTER_GROUPS = {
  services: {
    title: "Services",
    links: [
      { label: "SaaS Applications", href: "/services/saas-applications" },
      { label: "Websites", href: "/services/websites" },
      { label: "MCP Servers", href: "/services/mcp-servers" },
      { label: "Automation", href: "/services/automation" },
    ],
  },
  shop: {
    title: "Shop",
    links: [
      { label: "Templates", href: "/shop?category=templates" },
      { label: "MCP Servers", href: "/shop?category=mcp-servers" },
      { label: "Ready Websites", href: "/shop?category=ready-websites" },
      { label: "Mobile Apps", href: "/shop?category=mobile-apps" },
    ],
  },
  insights: {
    title: "Insights",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "SaaS Articles", href: "/blog?category=SaaS+Applications" },
      { label: "MCP Guides", href: "/blog?category=MCP+Servers" },
      { label: "Automation Notes", href: "/blog?category=Automation" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "AI Concierge", href: "/ai-concierge" },
      { label: "Book Appointment", href: "/book-appointment" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
  },
} as const;

export const SITE_CONFIG = {
  name: "Agency",
  tagline: "We Build Standout Digital Products",
  description:
    "Premium web development agency building SaaS applications, websites, MCP servers, automation systems, and ready-to-buy digital products.",
  whatsappUrl: "https://wa.me/1234567890",
  email: "hello@agency.dev",
  bookingUrl: "/book-appointment",
} as const;
