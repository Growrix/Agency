import { SectionHeading } from "@/components/primitives/SectionHeading";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { ServiceFaqMobile } from "@/components/marketing/services/ServiceFaqMobile";
import { Accordion, type AccordionItem } from "@/components/sections/Accordion";
import { AUTOMATION_SERVICE_FAQ_SECTION } from "@/lib/automation-service-content";
import { cn } from "@/lib/utils";
import styles from "./AutomationPage.module.css";

function splitItems(items: AccordionItem[]) {
  const half = Math.ceil(items.length / 2);
  return [items.slice(0, half), items.slice(half)];
}

function AutomationFAQDesktop({ items }: { items: AccordionItem[] }) {
  const [left, right] = splitItems(items);
  return (
    <>
      <div className={cn("mx-auto max-w-2xl text-center", styles.sectionHeaderCenter)}>
        <SectionHeading
          eyebrow={AUTOMATION_SERVICE_FAQ_SECTION.eyebrow}
          title={AUTOMATION_SERVICE_FAQ_SECTION.title}
          titleLead={AUTOMATION_SERVICE_FAQ_SECTION.titleLead}
          titleAccent={AUTOMATION_SERVICE_FAQ_SECTION.titleAccent}
          description={AUTOMATION_SERVICE_FAQ_SECTION.description}
          align="center"
        />
      </div>
      <div className={styles.faqGrid}>
        <Accordion items={left} className={styles.faqColumn} />
        <Accordion items={right} className={styles.faqColumn} />
      </div>
    </>
  );
}

export function AutomationFAQ({ items }: { items: AccordionItem[] }) {
  return (
    <MarketingViewportGate
      mobile={
        <ServiceFaqMobile
          eyebrow={AUTOMATION_SERVICE_FAQ_SECTION.eyebrow}
          title={AUTOMATION_SERVICE_FAQ_SECTION.title}
          titleLead={AUTOMATION_SERVICE_FAQ_SECTION.titleLead}
          titleAccent={AUTOMATION_SERVICE_FAQ_SECTION.titleAccent}
          description={AUTOMATION_SERVICE_FAQ_SECTION.description}
          items={items}
        />
      }
      desktop={<AutomationFAQDesktop items={items} />}
    />
  );
}
