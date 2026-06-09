import type { Metadata } from "next";
import { PricingPageClient } from "@/app/pricing/PricingPageClient";

export const metadata: Metadata = {
  title: "Pricing | Websites, Ready Websites, SaaS, and Launch Systems",
  description:
    "Review pricing ranges, flexible payment options, and support coverage for websites, ready websites, SaaS applications, and launch systems.",
};

export default function PricingPage() {
  return <PricingPageClient />;
}

