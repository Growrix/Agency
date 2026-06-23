"use client";

import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { ThreePathExplainerDesktop } from "@/components/marketing/ThreePathExplainerDesktop";
import { ThreePathExplainerMobile } from "@/components/marketing/ThreePathExplainerMobile";
import { Container, Section } from "@/components/primitives/Container";
import { homeSection } from "@/lib/homepage-composition";

export function ThreePathExplainer() {
  const shell = homeSection("three-path");

  return (
    <Section {...shell}>
      <Container>
        <MarketingViewportGate
          mobile={<ThreePathExplainerMobile />}
          desktop={<ThreePathExplainerDesktop />}
        />
      </Container>
    </Section>
  );
}
