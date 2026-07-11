import { BaselineFilePage } from "@/components/site/baseline-file-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Car Listing",
  pathname: "/listing",
  description: "Baseline car listing page parity.",
});

export default function ListingPage() {
  return <BaselineFilePage fileName="car-listing.html" />;
}
