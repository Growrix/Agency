import { BaselineFilePage } from "@/components/site/baseline-file-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Car Detail",
  pathname: "/listing/[slug]",
  description: "Baseline car single page parity.",
});

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ListingSlugPage({ params }: PageProps) {
  await params;
  return <BaselineFilePage fileName="car-single.html" />;
}
