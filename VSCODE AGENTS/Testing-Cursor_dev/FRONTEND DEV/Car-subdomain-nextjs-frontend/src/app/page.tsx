import type { Metadata } from "next";
import { CanonicalHtmlPage } from "@/components/site/canonical-html-page";
import { getParsedHtmlPage } from "@/lib/source-html";

export function generateMetadata(): Metadata {
  const page = getParsedHtmlPage("index.html");
  return {
    title: page.title,
    description: page.description,
  };
}

export default function Page() {
  return <CanonicalHtmlPage fileName="index.html" />;
}
