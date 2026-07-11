import { BaselineFilePage } from "@/components/site/baseline-file-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Homepage 2",
  pathname: "/homepage-2",
  description: "Baseline homepage-2 page parity.",
});

export default function Homepage2Page() {
  return <BaselineFilePage fileName="homepage-2.html" />;
}
