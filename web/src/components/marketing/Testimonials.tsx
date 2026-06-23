"use client";

import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { TestimonialsDesktop } from "@/components/marketing/TestimonialsDesktop";
import { TestimonialsMobile } from "@/components/marketing/TestimonialsMobile";
import { Container, Section } from "@/components/primitives/Container";
import { homeSection } from "@/lib/homepage-composition";

export function Testimonials() {
  const shell = homeSection("testimonials");

  return (
    <Section {...shell}>
      <Container>
        <MarketingViewportGate mobile={<TestimonialsMobile />} desktop={<TestimonialsDesktop />} />
      </Container>
    </Section>
  );
}
