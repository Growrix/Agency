import { BaselineFilePage } from "@/components/site/baseline-file-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Car List",
  pathname: "/car-list",
  description: "Baseline alternate car list page parity.",
});

export default function CarListPage() {
  return <BaselineFilePage fileName="car-list.html" />;
}
