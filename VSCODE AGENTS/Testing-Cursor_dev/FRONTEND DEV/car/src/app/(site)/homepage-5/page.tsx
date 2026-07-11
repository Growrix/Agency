import { BaselineFilePage } from "@/components/site/baseline-file-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Homepage 5",
  pathname: "/homepage-5",
  description: "Baseline homepage-5 page parity.",
});

export default function Homepage5Page() {
  return <BaselineFilePage fileName="homepage-5.html" />;
}
