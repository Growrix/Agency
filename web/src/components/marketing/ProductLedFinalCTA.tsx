import { CTABand } from "@/components/sections/CTABand";
import { WHATSAPP_HREF } from "@/lib/nav";

export function ProductLedFinalCTA({
  eyebrow = "Start with a product or a conversation",
  title = "Browse ready-made assets or book a free consultation.",
  description = "Pick a digital product for instant delivery, request Done-For-You setup, or scope a custom build — we will route you to the right next step.",
  primaryLabel = "Browse Products",
  primaryHref = "/products",
  secondaryLabel = "Book a Free Consultation",
  secondaryHref = "/book-appointment",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <CTABand
      eyebrow={eyebrow}
      title={title}
      description={description}
      primary={{ label: primaryLabel, href: primaryHref }}
      secondary={{ label: secondaryLabel, href: secondaryHref ?? WHATSAPP_HREF }}
    />
  );
}
