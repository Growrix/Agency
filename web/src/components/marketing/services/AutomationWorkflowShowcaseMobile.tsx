import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { AUTOMATION_WORKFLOW_STEP_ICONS } from "@/components/marketing/automation/automation-visual-icons";
import type { AutomationWorkflowExample } from "@/lib/automation-service-content";
import { AUTOMATION_WORKFLOW_SHOWCASE_SECTION } from "@/lib/automation-service-content";
import { cn } from "@/lib/utils";

type AutomationWorkflowShowcaseMobileProps = {
  workflows?: readonly AutomationWorkflowExample[];
};

function WorkflowStepIcon({ index, isAi }: { index: number; isAi: boolean }) {
  const Icon = AUTOMATION_WORKFLOW_STEP_ICONS[index % AUTOMATION_WORKFLOW_STEP_ICONS.length];
  return (
    <span
      className={cn(
        "home-mobile-marketing__workflow-timeline-circle",
        isAi && "home-mobile-marketing__workflow-timeline-circle--ai",
      )}
      aria-hidden
    >
      <Icon className="home-mobile-marketing__workflow-timeline-circle-glyph" />
    </span>
  );
}

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
          <article
            key={workflow.title}
            className="home-mobile-marketing__workflow-card home-mobile-marketing__workflow-card--showcase"
          >
            <h3 className="home-mobile-marketing__workflow-card-title">{workflow.title}</h3>

            <div
              className="home-mobile-marketing__workflow-timeline"
              role="list"
              aria-label={`${workflow.title} steps`}
            >
              {workflow.steps.map((step, index) => {
                const isAi = /ai/i.test(step);
                return (
                  <div
                    key={`${step}-${index}`}
                    className="home-mobile-marketing__workflow-timeline-node"
                    role="listitem"
                  >
                    <WorkflowStepIcon index={index} isAi={isAi} />
                    <span className="home-mobile-marketing__workflow-timeline-label">{step}</span>
                  </div>
                );
              })}
            </div>

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
