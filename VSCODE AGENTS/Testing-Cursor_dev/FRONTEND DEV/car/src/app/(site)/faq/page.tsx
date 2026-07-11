import { BaselineFilePage } from "@/components/site/baseline-file-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "FAQ",
  pathname: "/faq",
  description: "Baseline FAQ page parity.",
});

export default function FaqPage() {
  return <BaselineFilePage fileName="faq.html" />;
}
