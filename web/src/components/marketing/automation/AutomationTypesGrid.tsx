import { SectionHeading } from "@/components/primitives/SectionHeading";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { AutomationTypesMobile } from "@/components/marketing/services/AutomationTypesMobile";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { AUTOMATION_TYPES_SECTION } from "@/lib/automation-service-content";
import { cn } from "@/lib/utils";
import { AUTOMATION_TYPE_ICONS } from "./automation-visual-icons";
import styles from "./AutomationPage.module.css";

type TypeItem = (typeof AUTOMATION_TYPES_SECTION.items)[number];

function TypeCard({ item, index }: { item: TypeItem; index: number }) {
  const { icon: Icon, tone } = AUTOMATION_TYPE_ICONS[index % AUTOMATION_TYPE_ICONS.length];
  const toneClass =
    tone === "purple"
      ? styles.typeIconPurple
      : tone === "blue"
        ? styles.typeIconBlue
        : tone === "green"
          ? styles.typeIconGreen
          : tone === "cyan"
            ? styles.typeIconCyan
            : tone === "orange"
              ? styles.typeIconOrange
              : styles.typeIconGray;

  return (
    <RevealItem className="h-full">
      <article className={styles.typeCard}>
        <div className={cn(styles.typeIcon, toneClass)}>
          <Icon className="size-5" />
        </div>
        <h3 className={styles.typeTitle}>{item.title}</h3>
        <p className={styles.typeDescription}>{item.description}</p>
      </article>
    </RevealItem>
  );
}

function AutomationTypesDesktop() {
  return (
    <>
      <div className={cn("mx-auto max-w-2xl text-center", styles.sectionHeaderCenter)}>
        <SectionHeading
          eyebrow={AUTOMATION_TYPES_SECTION.eyebrow}
          title={AUTOMATION_TYPES_SECTION.title}
          titleLead={AUTOMATION_TYPES_SECTION.titleLead}
          titleAccent={AUTOMATION_TYPES_SECTION.titleAccent}
          description={AUTOMATION_TYPES_SECTION.description}
          align="center"
        />
      </div>
      <RevealGroup className={styles.typesGrid} stagger={0.06}>
        {AUTOMATION_TYPES_SECTION.items.map((item, index) => (
          <TypeCard key={item.title} item={item} index={index} />
        ))}
      </RevealGroup>
    </>
  );
}

export function AutomationTypesGrid() {
  return (
    <MarketingViewportGate
      mobile={<AutomationTypesMobile />}
      desktop={<AutomationTypesDesktop />}
    />
  );
}
