import { BaselineFilePage } from "@/components/site/baseline-file-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Homepage 8",
  pathname: "/homepage-8",
  description: "Baseline homepage-8 page parity.",
});

export default function Homepage8Page() {
  return <BaselineFilePage fileName="homepage-8.html" />;
}
