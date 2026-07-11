import { BaselineFilePage } from "@/components/site/baseline-file-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Services",
  pathname: "/services",
  description: "Baseline services page parity.",
});

export default function ServicesPage() {
  return <BaselineFilePage fileName="services.html" />;
}
