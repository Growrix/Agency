import { BaselineFilePage } from "@/components/site/baseline-file-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Homepage 3",
  pathname: "/homepage-3",
  description: "Baseline homepage-3 page parity.",
});

export default function Homepage3Page() {
  return <BaselineFilePage fileName="homepage-3.html" />;
}
