import { BaselineFilePage } from "@/components/site/baseline-file-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Blog Post",
  pathname: "/blog/[slug]",
  description: "Baseline blog single page parity.",
});

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogSlugPage({ params }: PageProps) {
  await params;
  return <BaselineFilePage fileName="blog-single.html" />;
}
