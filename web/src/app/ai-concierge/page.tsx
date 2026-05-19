import type { Metadata } from "next";
import { Suspense } from "react";
import { ConciergeChat } from "@/components/ai/ConciergeChat";

export const metadata: Metadata = {
  title: "AI Growrix OS",
  description: "Get instant, business-aware answers about Growrix OS services, pricing, and timelines.",
};

type AIConciergePageProps = {
  searchParams?: Promise<{ q?: string | string[] }>;
};

export default async function AIConciergePage({ searchParams }: AIConciergePageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const query = Array.isArray(resolvedSearchParams?.q)
    ? resolvedSearchParams.q[0]
    : resolvedSearchParams?.q;

  return (
    <Suspense fallback={null}>
      <ConciergeChat initialPrompt={query} />
    </Suspense>
  );
}
