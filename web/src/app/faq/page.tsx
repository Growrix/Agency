import { FaqPageClient } from "./FaqPageClient";
import { FAQ_CATEGORIES, FAQ_QUESTIONS, FAQ_QUICK } from "@/lib/faq-content";
import { listSanityFaqItems } from "@/server/sanity/marketing";

export default async function FAQPage() {
  const cmsItems = await listSanityFaqItems().catch(() => []);
  const questions = cmsItems.length > 0 ? cmsItems : FAQ_QUESTIONS;
  const quick = cmsItems.filter((item) => item.featured).slice(0, 3);

  return (
    <FaqPageClient
      categories={FAQ_CATEGORIES.map(({ id, label }) => ({ id, label }))}
      questions={questions.map(({ category, question, answer }) => ({ category, question, answer }))}
      quick={quick.length > 0 ? quick.map(({ question, answer }) => ({ question, answer })) : FAQ_QUICK}
    />
  );
}
