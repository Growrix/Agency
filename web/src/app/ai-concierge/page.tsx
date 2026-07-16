import type { Metadata } from "next";
import { Suspense } from "react";
import { ConciergeChat } from "@/components/ai/ConciergeChat";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbListSchema, buildWebPageSchema } from "@/lib/seo-structured-data";

export const metadata: Metadata = buildPageMetadata({
  title: "AI Assistant",
  description: "Get instant, business-aware answers about Growrix OS services, pricing, and timelines.",
  path: "/ai-concierge",
});

type AIConciergePageProps = {
  searchParams?: Promise<{ q?: string | string[] }>;
};

export default async function AIConciergePage({ searchParams }: AIConciergePageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const query = Array.isArray(resolvedSearchParams?.q)
    ? resolvedSearchParams.q[0]
    : resolvedSearchParams?.q;

  return (
    <>
      <JsonLd
        data={[
          buildWebPageSchema({
            name: "AI Assistant",
            description: "Get instant, business-aware answers about Growrix OS services, pricing, and timelines.",
            path: "/ai-concierge",
          }),
          buildBreadcrumbListSchema([
            { name: "Home", path: "/" },
            { name: "AI Assistant", path: "/ai-concierge" },
          ]),
        ]}
      />
      <Suspense fallback={null}>
        <ConciergeChat initialPrompt={query} />
      </Suspense>
    </>
  );
}
