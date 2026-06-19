import os from "node:os";
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
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["@heroicons/react", "framer-motion"],
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
        source: "/previews/website-templates-html/:path*",
        destination: "/previews/html-template-websites/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
      {
        source: "/Favicon.svg",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
      {
        source: "/Favicon.png",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store" },
        ],
      },
      {
        source: "/admin/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store" },
        ],
      },
      {
        source: "/dashboard/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store" },
        ],
      },
      {
        source: "/checkout/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store" },
        ],
      },
      {
        source: "/success/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store" },
        ],
      },
      {
        source: "/previews/html-template-websites/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
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
        source: "/previews/website-templates-html/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
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
        source: "/previews/html-business-profiles/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
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
        source: "/api/html-business-profiles/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
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
        source: "/api/website-templates-html-preview/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
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
        source: "/((?!api/html-business-profiles|api/website-templates-html-preview|previews/html-template-websites|previews/website-templates-html|previews/html-business-profiles).*)",
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
