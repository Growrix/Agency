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
};

export function ProcessStepsMobile({ steps }: ProcessStepsMobileProps) {
  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={HOME_OPERATING_SYSTEM_COPY.eyebrow}
        titleLead={HOME_OPERATING_SYSTEM_COPY.titleLead}
        titleAccent={HOME_OPERATING_SYSTEM_COPY.titleAccent}
        description={HOME_OPERATING_SYSTEM_COPY.description}
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
