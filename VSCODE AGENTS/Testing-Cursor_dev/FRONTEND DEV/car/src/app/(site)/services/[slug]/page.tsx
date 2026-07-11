import { BaselineFilePage } from "@/components/site/baseline-file-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Service Detail",
  pathname: "/services/[slug]",
  description: "Baseline service single page parity.",
});

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ServiceSlugPage({ params }: PageProps) {
  await params;
  return <BaselineFilePage fileName="service-single.html" />;
}
