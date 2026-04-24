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

const nextConfig: NextConfig = {
  allowedDevOrigins,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
          {
            key: "Content-Security-Policy",
            value:
              `default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; connect-src ${connectSrc}; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://wa.me;`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
