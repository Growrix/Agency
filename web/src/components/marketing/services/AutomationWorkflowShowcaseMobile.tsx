import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import type { AutomationWorkflowExample } from "@/lib/automation-service-content";
import { AUTOMATION_WORKFLOW_SHOWCASE_SECTION } from "@/lib/automation-service-content";
import { cn } from "@/lib/utils";

type AutomationWorkflowShowcaseMobileProps = {
  workflows?: readonly AutomationWorkflowExample[];
};

export function AutomationWorkflowShowcaseMobile({
  workflows = AUTOMATION_WORKFLOW_SHOWCASE_SECTION.workflows,
}: AutomationWorkflowShowcaseMobileProps) {
  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={AUTOMATION_WORKFLOW_SHOWCASE_SECTION.eyebrow}
        titleLead={AUTOMATION_WORKFLOW_SHOWCASE_SECTION.titleLead}
        titleAccent={AUTOMATION_WORKFLOW_SHOWCASE_SECTION.titleAccent}
        description={AUTOMATION_WORKFLOW_SHOWCASE_SECTION.description}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <div className="home-mobile-marketing__stack">
        {workflows.map((workflow) => (
          <article key={workflow.title} className="home-mobile-marketing__workflow-card">
            <h3 className="home-mobile-marketing__workflow-card-title">{workflow.title}</h3>

            <ol className="home-mobile-marketing__workflow-steps" aria-label={`${workflow.title} steps`}>
              {workflow.steps.map((step, index) => {
                const isLast = index === workflow.steps.length - 1;
                const isAiStep = /ai/i.test(step);

                return (
                  <li key={`${step}-${index}`} className="home-mobile-marketing__workflow-step">
                    <div
                      className={cn(
                        "home-mobile-marketing__workflow-step-node",
                        isAiStep && "home-mobile-marketing__workflow-step-node--ai",
                      )}
                    >
                      {step}
                    </div>
                    {!isLast ? (
                      <span className="home-mobile-marketing__workflow-step-connector" aria-hidden>
                        <ArrowDownIcon className="home-mobile-marketing__workflow-step-arrow" />
                      </span>
                    ) : null}
                  </li>
                );
              })}
            </ol>

            <p className="home-mobile-marketing__workflow-outcome">
              <span className="home-mobile-marketing__workflow-outcome-label">Outcome</span>
              {workflow.outcome}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
