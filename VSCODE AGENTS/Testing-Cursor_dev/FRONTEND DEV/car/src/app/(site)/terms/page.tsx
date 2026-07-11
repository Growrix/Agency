import { BaselineFilePage } from "@/components/site/baseline-file-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Terms",
  pathname: "/terms",
  description: "Baseline terms page parity.",
});

export default function TermsPage() {
  return <BaselineFilePage fileName="terms.html" />;
}
