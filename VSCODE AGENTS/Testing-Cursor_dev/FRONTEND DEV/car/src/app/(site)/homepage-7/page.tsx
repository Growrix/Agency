import { BaselineFilePage } from "@/components/site/baseline-file-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Homepage 7",
  pathname: "/homepage-7",
  description: "Baseline homepage-7 page parity.",
});

export default function Homepage7Page() {
  return <BaselineFilePage fileName="homepage-7.html" />;
}
