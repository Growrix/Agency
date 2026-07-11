import { BaselineFilePage } from "@/components/site/baseline-file-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Home",
  pathname: "/",
  description: "Baseline index page parity.",
});

export default function HomePage() {
  return <BaselineFilePage fileName="index.html" />;
}
