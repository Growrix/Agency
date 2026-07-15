import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { PricingPageClient } from "@/app/pricing/PricingPageClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Investment Guide — Digital Products, Services & Custom Builds",
  description:
    "Choose the right investment path for your goals—digital products, Done-For-You setup, custom builds, and typical service ranges from GrowrixOS.",
  path: "/pricing",
});

export default function PricingPage() {
  return <PricingPageClient />;
}
