import { BaselineFilePage } from "@/components/site/baseline-file-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Testimonials",
  pathname: "/testimonials",
  description: "Baseline testimonials page parity.",
});

export default function TestimonialsPage() {
  return <BaselineFilePage fileName="testimonials.html" />;
}
