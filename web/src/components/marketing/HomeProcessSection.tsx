"use client";

import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { ProcessStepsMobile } from "@/components/marketing/ProcessStepsMobile";
import { Container, Section } from "@/components/primitives/Container";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { HOME_OPERATING_SYSTEM_COPY } from "@/lib/home-conversion-content";
import { PROCESS_STEPS } from "@/lib/content";
import { homeSection } from "@/lib/homepage-composition";
import { HERO_TITLE_CLASS } from "@/lib/typography";

export function HomeProcessSection() {
  const shell = homeSection("process");

  return (
    <Section {...shell}>
      <Container>
        <MarketingViewportGate
          mobile={<ProcessStepsMobile steps={PROCESS_STEPS} />}
          desktop={
            <>
              <SectionHeading
                eyebrow={HOME_OPERATING_SYSTEM_COPY.eyebrow}
                title={HOME_OPERATING_SYSTEM_COPY.title}
                description={HOME_OPERATING_SYSTEM_COPY.description}
                titleClassName={HERO_TITLE_CLASS}
              />
              <div className="mt-8 sm:mt-10">
                <ProcessSteps steps={PROCESS_STEPS} />
              </div>
            </>
          }
        />
      </Container>
    </Section>
  );
}
