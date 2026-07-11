import { BaselineFilePage } from "@/components/site/baseline-file-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Homepage 6",
  pathname: "/homepage-6",
  description: "Baseline homepage-6 page parity.",
});

export default function Homepage6Page() {
  return <BaselineFilePage fileName="homepage-6.html" />;
}
