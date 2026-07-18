import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  CodeBracketSquareIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { AUTOMATION_PROCESS_SECTION } from "@/lib/automation-service-content";
import { cn } from "@/lib/utils";
import styles from "./AutomationPage.module.css";

const PROCESS_ICONS = [
  MagnifyingGlassIcon,
  PencilSquareIcon,
  CodeBracketSquareIcon,
  ChartBarIcon,
];

type ProcessStep = (typeof AUTOMATION_PROCESS_SECTION.steps)[number];

function ProcessStepDesktop({ step, index }: { step: ProcessStep; index: number }) {
  const Icon = PROCESS_ICONS[index % PROCESS_ICONS.length];
  return (
    <RevealItem className={styles.processStep}>
      <div className={styles.processNumber}>
        <Icon className="size-5" />
      </div>
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">
        Step {step.number}
      </span>
      <h3 className={styles.processTitle}>{step.title}</h3>
      <p className={styles.processDescription}>{step.description}</p>
    </RevealItem>
  );
}

function AutomationProcessDesktop() {
  return (
    <>
      <div className={cn("mx-auto max-w-2xl text-center", styles.sectionHeaderCenter)}>
        <SectionHeading
          eyebrow={AUTOMATION_PROCESS_SECTION.eyebrow}
          title={AUTOMATION_PROCESS_SECTION.title}
          titleLead={AUTOMATION_PROCESS_SECTION.titleLead}
          titleAccent={AUTOMATION_PROCESS_SECTION.titleAccent}
          description={AUTOMATION_PROCESS_SECTION.description}
          align="center"
        />
      </div>
      <RevealGroup as="ol" className={styles.processTimeline} stagger={0.08}>
        {AUTOMATION_PROCESS_SECTION.steps.map((step, index) => (
          <ProcessStepDesktop key={step.title} step={step} index={index} />
        ))}
      </RevealGroup>
    </>
  );
}

function AutomationProcessMobile() {
  return (
    <div>
      <MobileMarketingSectionHeader
        eyebrow={AUTOMATION_PROCESS_SECTION.eyebrow}
        titleLead={AUTOMATION_PROCESS_SECTION.titleLead}
        titleAccent={AUTOMATION_PROCESS_SECTION.titleAccent}
        description={AUTOMATION_PROCESS_SECTION.description}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />
      <ol className={styles.processTimelineMobile}>
        {AUTOMATION_PROCESS_SECTION.steps.map((step) => (
          <li key={step.title} className={styles.processStepMobile}>
            <span className={styles.processNumberMobile}>{step.number}</span>
            <h3 className={styles.processTitle}>{step.title}</h3>
            <p className={styles.processDescription}>{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function AutomationProcess() {
  return (
    <MarketingViewportGate
      mobile={<AutomationProcessMobile />}
      desktop={<AutomationProcessDesktop />}
    />
  );
}
