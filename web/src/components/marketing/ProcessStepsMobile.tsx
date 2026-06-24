import {
  CodeBracketSquareIcon,
  MagnifyingGlassIcon,
  RocketLaunchIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { HOME_OPERATING_SYSTEM_COPY } from "@/lib/home-conversion-content";
import type { Step } from "@/components/sections/ProcessSteps";

const PROCESS_ICONS = [MagnifyingGlassIcon, ShareIcon, CodeBracketSquareIcon, RocketLaunchIcon];

type ProcessStepsMobileProps = {
  steps: Step[];
  eyebrow?: string;
  title?: string;
  titleLead?: string;
  titleAccent?: string;
  description?: string;
};

export function ProcessStepsMobile({
  steps,
  eyebrow,
  title,
  titleLead,
  titleAccent,
  description,
}: ProcessStepsMobileProps) {
  const headerEyebrow = eyebrow ?? HOME_OPERATING_SYSTEM_COPY.eyebrow;
  const headerTitleLead = titleLead ?? HOME_OPERATING_SYSTEM_COPY.titleLead;
  const headerTitleAccent = titleAccent ?? HOME_OPERATING_SYSTEM_COPY.titleAccent;
  const headerTitle = title;
  const headerDescription = description ?? HOME_OPERATING_SYSTEM_COPY.description;
  const useAccentTitle = !headerTitle && Boolean(headerTitleLead && headerTitleAccent);

  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={headerEyebrow}
        titleLead={useAccentTitle ? headerTitleLead : undefined}
        titleAccent={useAccentTitle ? headerTitleAccent : undefined}
        title={useAccentTitle ? undefined : headerTitle}
        description={headerDescription}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <ol className="home-mobile-marketing__process-steps">
        {steps.map((step, index) => {
          const Icon = PROCESS_ICONS[index] ?? MagnifyingGlassIcon;
          return (
            <li key={step.title} className="home-mobile-marketing__process-step">
              <span className="home-mobile-marketing__process-step-icon" aria-hidden>
                <Icon className="home-mobile-marketing__process-step-icon-glyph" />
              </span>
              <div>
                <span className="home-mobile-marketing__process-step-index">{index + 1}</span>
                <p className="home-mobile-marketing__process-step-label">Step {step.number}</p>
                <h3 className="home-mobile-marketing__process-step-title">{step.title}</h3>
                <p className="home-mobile-marketing__process-step-description">{step.description}</p>
                {step.meta ? <p className="home-mobile-marketing__process-step-meta">{step.meta}</p> : null}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
