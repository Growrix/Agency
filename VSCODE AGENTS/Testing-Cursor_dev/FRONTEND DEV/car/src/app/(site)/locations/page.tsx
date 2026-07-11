import { BaselineFilePage } from "@/components/site/baseline-file-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Locations",
  pathname: "/locations",
  description: "Baseline locations page parity.",
});

export default function LocationsPage() {
  return <BaselineFilePage fileName="locations.html" />;
}
