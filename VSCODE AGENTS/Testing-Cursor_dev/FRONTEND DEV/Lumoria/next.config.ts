import type { NextConfig } from "next";

const htmlAliasTargets = [
  "/about",
  "/blog",
  "/career-listing",
  "/contact-us",
  "/core-values",
  "/faq",
  "/listings/designing-tomorrows-cities",
  "/our-awards",
  "/our-history",
  "/our-process",
  "/our-services",
  "/our-team",
  "/portfolio-style-2",
  "/portfolio-style1",
  "/pricing-plan",
  "/sustainable-construction-for-long-term-living",
  "/urban-development-for-the-next-generation",
  "/wdt-careers/project-assistant",
  "/wdt-services/custom-construction",
  "/with-left-sidebar",
  "/with-right-sidebar",
];

const nextConfig: NextConfig = {
  turbopack: {
    root: "F:/PROJECTS/testing/FRONTEND DEV/Lumoria",
  },
  async rewrites() {
    return [
      {
        source: "/wp-content/:path*",
        destination: "/lumoria-assets/wp-content/:path*",
      },
      {
        source: "/wp-includes/:path*",
        destination: "/lumoria-assets/wp-includes/:path*",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      ...htmlAliasTargets.map((target) => ({
        source: `${target}.html`,
        destination: target,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
