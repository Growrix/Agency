import {
  BoltIcon,
  ClockIcon,
  EyeIcon,
  CheckCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { AUTOMATION_OUTCOMES_SECTION } from "@/lib/automation-service-content";
import { cn } from "@/lib/utils";
import styles from "./AutomationPage.module.css";

const builds = AUTOMATION_OUTCOMES_SECTION.builds;

const METRICS = [
  { ...builds[0], icon: BoltIcon },
  { ...builds[1], icon: ClockIcon },
  { ...builds[2], icon: EyeIcon },
  {
    title: "Consistency & Scale",
    description:
      "Standardize execution across teams and support growth without increasing administrative overhead.",
    icon: CheckCircleIcon,
  },
  { ...builds[4], icon: SparklesIcon },
];

function MetricCard({ metric }: { metric: (typeof METRICS)[number] }) {
  const Icon = metric.icon;
  return (
    <RevealItem className="h-full">
      <article className={styles.metricCard}>
        <div className={styles.metricIcon}>
          <Icon className="size-6" />
        </div>
        <h3 className={styles.metricLabel}>{metric.title}</h3>
        <p className={styles.metricDescription}>{metric.description}</p>
      </article>
    </RevealItem>
  );
}

function AutomationOutcomesDesktop() {
  return (
    <>
      <div className={cn("mx-auto max-w-2xl text-center", styles.sectionHeaderCenter)}>
        <SectionHeading
          eyebrow={AUTOMATION_OUTCOMES_SECTION.eyebrow}
          title={AUTOMATION_OUTCOMES_SECTION.title}
          titleLead={AUTOMATION_OUTCOMES_SECTION.titleLead}
          titleAccent={AUTOMATION_OUTCOMES_SECTION.titleAccent}
          description={AUTOMATION_OUTCOMES_SECTION.description}
          align="center"
        />
      </div>
      <RevealGroup className={styles.metricsGrid} stagger={0.06}>
        {METRICS.map((metric) => (
          <MetricCard key={metric.title} metric={metric} />
        ))}
      </RevealGroup>
    </>
  );
}

function AutomationOutcomesMobile() {
  return (
    <div>
      <MobileMarketingSectionHeader
        eyebrow={AUTOMATION_OUTCOMES_SECTION.eyebrow}
        titleLead={AUTOMATION_OUTCOMES_SECTION.titleLead}
        titleAccent={AUTOMATION_OUTCOMES_SECTION.titleAccent}
        description={AUTOMATION_OUTCOMES_SECTION.description}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />
      <div className={styles.metricsGrid}>
        {METRICS.map((metric) => (
          <MetricCard key={metric.title} metric={metric} />
        ))}
      </div>
    </div>
  );
}

export function AutomationOutcomesMetrics() {
  return (
    <MarketingViewportGate
      mobile={<AutomationOutcomesMobile />}
      desktop={<AutomationOutcomesDesktop />}
    />
  );
}
