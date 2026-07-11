import { BaselineFilePage } from "@/components/site/baseline-file-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Services 2",
  pathname: "/services-2",
  description: "Baseline services style 2 page parity.",
});

export default function Services2Page() {
  return <BaselineFilePage fileName="services-2.html" />;
}
