import { BaselineFilePage } from "@/components/site/baseline-file-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Homepage 4",
  pathname: "/homepage-4",
  description: "Baseline homepage-4 page parity.",
});

export default function Homepage4Page() {
  return <BaselineFilePage fileName="homepage-4.html" />;
}
