import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { PricingPageClient } from "@/app/pricing/PricingPageClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Pricing — Websites, SaaS & Custom Builds",
  description:
    "Transparent ranges for website templates, ready-to-launch sites, and custom website, SaaS, and mobile app development.",
  path: "/pricing",
});

export default function PricingPage() {
  return <PricingPageClient />;
}
