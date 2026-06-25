import type { Step } from "@/components/sections/ProcessSteps";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";

type ProcessStepsDesktopProps = {
  steps: Step[];
};

export function ProcessStepsDesktop({ steps }: ProcessStepsDesktopProps) {
  return (
    <RevealGroup as="ol" className="home-desktop-marketing__process-track" stagger={0.06}>
      {steps.map((step, index) => (
        <RevealItem as="li" key={step.title} className="home-desktop-marketing__process-step">
          {index < steps.length - 1 ? (
            <span className="home-desktop-marketing__process-connector" aria-hidden />
          ) : null}
          <div className="home-desktop-marketing__process-step-inner">
            <span className="home-desktop-marketing__process-number">{step.number}</span>
            <h3 className="home-desktop-marketing__process-title">{step.title}</h3>
            <p className="home-desktop-marketing__process-desc">{step.description}</p>
            {step.meta ? <p className="home-desktop-marketing__process-meta">{step.meta}</p> : null}
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
