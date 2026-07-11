import { BaselineFilePage } from "@/components/site/baseline-file-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Careers",
  pathname: "/careers",
  description: "Baseline careers page parity.",
});

export default function CareersPage() {
  return <BaselineFilePage fileName="careers.html" />;
}
