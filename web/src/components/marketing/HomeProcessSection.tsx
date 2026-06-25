"use client";

import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { ProcessStepsDesktop } from "@/components/marketing/desktop/ProcessStepsDesktop";
import { ProcessStepsMobile } from "@/components/marketing/ProcessStepsMobile";
import { Container, Section } from "@/components/primitives/Container";
import { SectionHeading } from "@/components/primitives/SectionHeading";
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
            <div className="home-desktop-marketing__operating-system">
              <div className="home-desktop-marketing__operating-system-header">
                <SectionHeading
                  eyebrow={HOME_OPERATING_SYSTEM_COPY.eyebrow}
                  title={HOME_OPERATING_SYSTEM_COPY.title}
                  titleLead={HOME_OPERATING_SYSTEM_COPY.titleLead}
                  titleAccent={HOME_OPERATING_SYSTEM_COPY.titleAccent}
                  description={HOME_OPERATING_SYSTEM_COPY.description}
                  titleClassName={HERO_TITLE_CLASS}
                  className="home-desktop-marketing__operating-system-heading"
                />
              </div>
              <ProcessStepsDesktop steps={PROCESS_STEPS} />
            </div>
          }
        />
      </Container>
    </Section>
  );
}
