import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { ContactPageClient } from "./ContactPageClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact GrowrixOS | Plan Your Project",
  description:
    "Start a project conversation with GrowrixOS. Share your website, SaaS, mobile, automation, technical SEO, or AI business system goals — we respond within 2 business hours.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactPageClient />;
}
