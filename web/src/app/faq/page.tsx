import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { buildFaqPageSchema } from "@/lib/seo-structured-data";
import { FaqPageClient } from "./FaqPageClient";
import { FAQ_CATEGORIES, FAQ_QUESTIONS, FAQ_QUICK } from "@/lib/faq-content";
import { listSanityFaqItems } from "@/server/sanity/marketing";

export const metadata: Metadata = buildPageMetadata({
  title: "FAQ — Growrix OS",
  description:
    "Answers about Growrix OS services, digital products, delivery timelines, pricing, support, and how to start a project.",
  path: "/faq",
});

export default async function FAQPage() {
  const cmsItems = await listSanityFaqItems().catch(() => []);
  const questions = cmsItems.length > 0 ? cmsItems : FAQ_QUESTIONS;
  const quick = cmsItems.filter((item) => item.featured).slice(0, 3);
  const faqSchema = buildFaqPageSchema(
    questions.map(({ question, answer }) => ({ question, answer })),
  );

  return (
    <>
      {faqSchema ? <JsonLd data={faqSchema} /> : null}
      <FaqPageClient
        categories={FAQ_CATEGORIES.map(({ id, label }) => ({ id, label }))}
        questions={questions.map(({ category, question, answer }) => ({ category, question, answer }))}
        quick={quick.length > 0 ? quick.map(({ question, answer }) => ({ question, answer })) : FAQ_QUICK}
      />
    </>
  );
}
