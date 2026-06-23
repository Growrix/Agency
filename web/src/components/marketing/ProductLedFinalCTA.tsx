"use client";

import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { ProductLedFinalCTAMobile } from "@/components/marketing/ProductLedFinalCTAMobile";
import { CTABand } from "@/components/sections/CTABand";
import { WHATSAPP_HREF } from "@/lib/nav";
import { homeSection } from "@/lib/homepage-composition";
import { HERO_TITLE_CLASS } from "@/lib/typography";

export function ProductLedFinalCTA({
  eyebrow = "Start with a product or a conversation",
  title = "Browse ready-made assets or book a free consultation.",
  description = "Pick a digital product for instant delivery, request Done-For-You setup, or scope a custom build — we will route you to the right next step.",
  primaryLabel = "Browse Digital Products",
  primaryHref = "/digital-products",
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
  const shell = homeSection("final-cta");

  return (
    <MarketingViewportGate
      mobile={
        <ProductLedFinalCTAMobile
          eyebrow={eyebrow}
          title={title}
          description={description}
          primaryLabel={primaryLabel}
          primaryHref={primaryHref}
          secondaryLabel={secondaryLabel}
          secondaryHref={secondaryHref}
        />
      }
      desktop={
        <CTABand
          {...shell}
          eyebrow={eyebrow}
          title={title}
          description={description}
          primary={{ label: primaryLabel, href: primaryHref }}
          secondary={{ label: secondaryLabel, href: secondaryHref ?? WHATSAPP_HREF }}
          titleClassName={HERO_TITLE_CLASS}
        />
      }
    />
  );
}
