import { BaselineFilePage } from "@/components/site/baseline-file-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Shop",
  pathname: "/shop",
  description: "Baseline shop page parity.",
});

export default function ShopPage() {
  return <BaselineFilePage fileName="shop.html" />;
}
