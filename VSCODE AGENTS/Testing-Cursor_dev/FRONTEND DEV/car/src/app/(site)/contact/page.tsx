import { BaselineFilePage } from "@/components/site/baseline-file-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  pathname: "/contact",
  description: "Baseline contact page parity.",
});

export default function ContactPage() {
  return <BaselineFilePage fileName="contact.html" />;
}
