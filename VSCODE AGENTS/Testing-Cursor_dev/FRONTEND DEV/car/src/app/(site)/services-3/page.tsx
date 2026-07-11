import { BaselineFilePage } from "@/components/site/baseline-file-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Services 3",
  pathname: "/services-3",
  description: "Baseline services style 3 page parity.",
});

export default function Services3Page() {
  return <BaselineFilePage fileName="services-3.html" />;
}
