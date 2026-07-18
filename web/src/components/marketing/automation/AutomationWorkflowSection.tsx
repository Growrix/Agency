import {
  CursorArrowRaysIcon,
  ServerIcon,
  SparklesIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { AUTOMATION_WORKFLOW_SHOWCASE_SECTION } from "@/lib/automation-service-content";
import { cn } from "@/lib/utils";
import styles from "./AutomationPage.module.css";

const STEP_ICONS = [
  CursorArrowRaysIcon,
  ServerIcon,
  SparklesIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
];

type Workflow = (typeof AUTOMATION_WORKFLOW_SHOWCASE_SECTION.workflows)[number];

function WorkflowNodeCircle({
  index,
  isAi,
}: {
  index: number;
  isAi: boolean;
}) {
  const Icon = STEP_ICONS[index % STEP_ICONS.length];
  return (
    <div
      className={cn(
        styles.workflowNodeCircle,
        isAi && styles.workflowNodeCircleAi,
      )}
    >
      <Icon className="size-4" />
    </div>
  );
}

function WorkflowCard({ workflow }: { workflow: Workflow }) {
  return (
    <RevealItem className="h-full">
      <article className={styles.workflowCard}>
        <h3 className={styles.workflowCardTitle}>{workflow.title}</h3>
        <div className={styles.workflowTimeline}>
          {workflow.steps.map((step, idx) => {
            const isAi = /ai/i.test(step);
            return (
              <div key={`${step}-${idx}`} className={styles.workflowNode}>
                <WorkflowNodeCircle index={idx} isAi={isAi} />
                <span className={styles.workflowNodeLabel}>{step}</span>
              </div>
            );
          })}
        </div>
        <div className={styles.workflowOutcome}>
          <span className={styles.workflowOutcomeLabel}>Outcome</span>
          <p className={styles.workflowOutcomeText}>{workflow.outcome}</p>
        </div>
      </article>
    </RevealItem>
  );
}

function AutomationWorkflowDesktop() {
  return (
    <>
      <div className={cn("mx-auto max-w-2xl text-center", styles.sectionHeaderCenter)}>
        <SectionHeading
          eyebrow={AUTOMATION_WORKFLOW_SHOWCASE_SECTION.eyebrow}
          title={AUTOMATION_WORKFLOW_SHOWCASE_SECTION.title}
          titleLead={AUTOMATION_WORKFLOW_SHOWCASE_SECTION.titleLead}
          titleAccent={AUTOMATION_WORKFLOW_SHOWCASE_SECTION.titleAccent}
          description={AUTOMATION_WORKFLOW_SHOWCASE_SECTION.description}
          align="center"
        />
      </div>
      <RevealGroup className={styles.workflowCards} stagger={0.08}>
        {AUTOMATION_WORKFLOW_SHOWCASE_SECTION.workflows.map((workflow) => (
          <WorkflowCard key={workflow.title} workflow={workflow} />
        ))}
      </RevealGroup>
    </>
  );
}

function AutomationWorkflowMobile() {
  return (
    <div>
      <MobileMarketingSectionHeader
        eyebrow={AUTOMATION_WORKFLOW_SHOWCASE_SECTION.eyebrow}
        titleLead={AUTOMATION_WORKFLOW_SHOWCASE_SECTION.titleLead}
        titleAccent={AUTOMATION_WORKFLOW_SHOWCASE_SECTION.titleAccent}
        description={AUTOMATION_WORKFLOW_SHOWCASE_SECTION.description}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />
      <div className={styles.workflowCardsMobile}>
        {AUTOMATION_WORKFLOW_SHOWCASE_SECTION.workflows.map((workflow) => (
          <article key={workflow.title} className={styles.workflowCardMobile}>
            <h3 className={styles.workflowCardTitleMobile}>{workflow.title}</h3>
            <div className={styles.workflowTimelineMobile}>
              {workflow.steps.map((step, idx) => {
                const isAi = /ai/i.test(step);
                const Icon = STEP_ICONS[idx % STEP_ICONS.length];
                return (
                  <div key={`${step}-${idx}`} className={styles.workflowNodeMobile}>
                    <span
                      className={cn(
                        styles.workflowNodeMobileCircle,
                        isAi && styles.workflowNodeMobileCircleAi,
                      )}
                    >
                      <Icon className="size-4" />
                    </span>
                    <span className={styles.workflowNodeMobileText}>{step}</span>
                  </div>
                );
              })}
            </div>
            <div className={styles.workflowOutcomeMobile}>
              <span className={styles.workflowOutcomeLabel}>Outcome</span>
              <p className={styles.workflowOutcomeText}>{workflow.outcome}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function AutomationWorkflowSection() {
  return (
    <MarketingViewportGate
      mobile={<AutomationWorkflowMobile />}
      desktop={<AutomationWorkflowDesktop />}
    />
  );
}
