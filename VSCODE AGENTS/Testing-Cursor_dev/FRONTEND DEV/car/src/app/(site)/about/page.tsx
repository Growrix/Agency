import { BaselineFilePage } from "@/components/site/baseline-file-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About",
  pathname: "/about",
  description: "Baseline about page parity.",
});

export default function AboutPage() {
  return <BaselineFilePage fileName="about.html" />;
}
