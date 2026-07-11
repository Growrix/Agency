import { BaselineFilePage } from "@/components/site/baseline-file-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Blog",
  pathname: "/blog",
  description: "Baseline blog page parity.",
});

export default function BlogPage() {
  return <BaselineFilePage fileName="blog.html" />;
}
