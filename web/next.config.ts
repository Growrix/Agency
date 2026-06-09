import os from "node:os";
import path from "node:path";
import type { NextConfig } from "next";

function getLocalIpv4Origins() {
  const interfaces = os.networkInterfaces();
  const addresses = new Set<string>();

  for (const entries of Object.values(interfaces)) {
    for (const entry of entries ?? []) {
      if (entry.family !== "IPv4" || entry.internal) {
        continue;
      }

      addresses.add(entry.address);
    }
  }

  return [...addresses];
}

const isDevelopment = process.env.NODE_ENV !== "production";
const allowedDevOrigins = [
  "*.replit.dev",
  "*.worf.replit.dev",
  "localhost",
  "127.0.0.1",
  ...getLocalIpv4Origins(),
  "growrixos.com",
  "www.growrixos.com",
];

const connectSrc = ["'self'", "https:", ...(isDevelopment ? ["http:", "ws:", "wss:"] : [])].join(" ");
const defaultCsp =
  `default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; ` +
  `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; ` +
  `connect-src ${connectSrc}; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://wa.me;`;

const htmlPreviewCsp =
  `default-src 'self' data: https: http: 'unsafe-inline' 'unsafe-eval'; img-src * data: blob:; ` +
  `script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http:; style-src 'self' 'unsafe-inline' https: http:; ` +
  `font-src 'self' data: https: http:; connect-src ${connectSrc}; frame-ancestors 'self'; base-uri 'self'; ` +
  `form-action 'self' https://wa.me;`;

const nextConfig: NextConfig = {
  allowedDevOrigins,
  outputFileTracingRoot: path.join(__dirname, ".."),
  outputFileTracingIncludes: {
    "/api/html-business-profiles/[templateSlug]/route": ["../Shop/business-professional/business-profile-pages/**/*"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/shop",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/shop/:slug",
        destination: "/products/:slug",
        permanent: true,
      },
      {
        source: "/services/html-business-profiles",
        destination: "/products/category/html-business-profiles",
        permanent: true,
      },
      {
        source: "/html-business-profiles",
        destination: "/products/category/html-business-profiles",
        permanent: true,
      },
      {
        source: "/products/category/saas-templates",
        destination: "/products/category/website-templates",
        permanent: true,
      },
      {
        source: "/products/category/ready-websites",
        destination: "/products/category/website-templates",
        permanent: true,
      },
      {
        source: "/products/category/business-cards",
        destination: "/products/category/digital-business-cards",
        permanent: true,
      },
      {
        source: "/products/category/faq",
        destination: "/products/category/faq-knowledge-base-pages",
        permanent: true,
      },
      {
        source: "/products/category/checklist-tracker",
        destination: "/products/category/checklists-trackers",
        permanent: true,
      },
      {
        source: "/products/category/annual-report",
        destination: "/products/category/annual-report-pages",
        permanent: true,
      },
      {
        source: "/products/category/resume",
        destination: "/products/category/html-resumes-cv",
        permanent: true,
      },
      {
        source: "/products/category/proposal",
        destination: "/products/category/proposal-templates",
        permanent: true,
      },
      {
        source: "/products/category/invoice",
        destination: "/products/category/html-invoice-templates",
        permanent: true,
      },
      {
        source: "/products/category/restaurant-menu",
        destination: "/products/category/restaurant-menu-pages",
        permanent: true,
      },
      {
        source: "/products/category/app-promo",
        destination: "/products/category/app-promo-pages",
        permanent: true,
      },
      {
        source: "/products/category/affiliate-landing",
        destination: "/products/category/affiliate-landing-pages",
        permanent: true,
      },
      {
        source: "/products/category/course-landing",
        destination: "/products/category/course-landing-pages",
        permanent: true,
      },
      {
        source: "/products/category/event-webinar",
        destination: "/products/category/event-webinar-pages",
        permanent: true,
      },
      {
        source: "/products/category/lead-magnet",
        destination: "/products/category/lead-magnet-download-pages",
        permanent: true,
      },
      {
        source: "/products/category/portfolio",
        destination: "/products/category/portfolio-templates",
        permanent: true,
      },
      {
        source: "/products/category/product-launch",
        destination: "/products/category/product-launch-pages",
        permanent: true,
      },
      {
        source: "/products/category/link-in-bio",
        destination: "/products/category/link-in-bio-pages",
        permanent: true,
      },
      {
        source: "/products/category/coming-soon",
        destination: "/products/category/coming-soon-maintenance-pages",
        permanent: true,
      },
      {
        source: "/products/category/cold-outreach",
        destination: "/products/category/cold-outreach-templates",
        permanent: true,
      },
      {
        source: "/products/category/promo-blast",
        destination: "/products/category/promotional-email-blasts",
        permanent: true,
      },
      {
        source: "/products/category/transactional",
        destination: "/products/category/transactional-email-templates",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/html-business-profiles/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
          { key: "Content-Security-Policy", value: htmlPreviewCsp },
        ],
      },
      {
        source: "/((?!api/html-business-profiles).*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
          { key: "Content-Security-Policy", value: defaultCsp },
        ],
      },
    ];
  },
};

export default nextConfig;
