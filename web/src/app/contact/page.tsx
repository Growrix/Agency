import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbListSchema, buildContactPageSchema } from "@/lib/seo-structured-data";
import { ContactPageClient } from "./ContactPageClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact — Plan Your Project",
  description:
    "Start a project conversation with GrowrixOS. Share your website, SaaS, mobile, automation, technical SEO, or AI business system goals — we respond within 2 business hours.",
  path: "/contact",
});

export default function ContactPage() {
  const contactStructuredData = [
    buildContactPageSchema({
      name: "Contact — Plan Your Project",
      description:
        "Start a project conversation with GrowrixOS. Share your website, SaaS, mobile, automation, technical SEO, or AI business system goals — we respond within 2 business hours.",
      path: "/contact",
    }),
    buildBreadcrumbListSchema([
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
    ]),
  ];

  return (
    <>
      <JsonLd data={contactStructuredData} />
      <ContactPageClient />
    </>
  );
}
