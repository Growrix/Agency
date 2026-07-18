import {
  PuzzlePieceIcon,
  ShieldCheckIcon,
  EyeIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { AUTOMATION_WHY_BUILD_SECTION } from "@/lib/automation-service-content";
import { cn } from "@/lib/utils";
import styles from "./AutomationPage.module.css";

const WHY_ICONS = [PuzzlePieceIcon, ShieldCheckIcon, EyeIcon, CalendarDaysIcon];

type WhyCard = (typeof AUTOMATION_WHY_BUILD_SECTION.cards)[number];

function WhyCard({ card, index }: { card: WhyCard; index: number }) {
  const Icon = WHY_ICONS[index % WHY_ICONS.length];
  return (
    <RevealItem className="h-full">
      <article className={styles.whyCard}>
        <div className={styles.whyIcon}>
          <Icon className="size-5" />
        </div>
        <h3 className={styles.whyTitle}>{card.title}</h3>
        <p className={styles.whyDescription}>{card.description}</p>
      </article>
    </RevealItem>
  );
}

function AutomationWhyBuildDesktop() {
  return (
    <>
      <div className={cn("mx-auto max-w-2xl text-center", styles.sectionHeaderCenter)}>
        <SectionHeading
          eyebrow={AUTOMATION_WHY_BUILD_SECTION.eyebrow}
          title={AUTOMATION_WHY_BUILD_SECTION.title}
          titleLead={AUTOMATION_WHY_BUILD_SECTION.titleLead}
          titleAccent={AUTOMATION_WHY_BUILD_SECTION.titleAccent}
          description={AUTOMATION_WHY_BUILD_SECTION.description}
          align="center"
        />
      </div>
      <RevealGroup className={styles.whyGrid} stagger={0.07}>
        {AUTOMATION_WHY_BUILD_SECTION.cards.map((card, index) => (
          <WhyCard key={card.title} card={card} index={index} />
        ))}
      </RevealGroup>
    </>
  );
}

function AutomationWhyBuildMobile() {
  return (
    <div>
      <MobileMarketingSectionHeader
        eyebrow={AUTOMATION_WHY_BUILD_SECTION.eyebrow}
        titleLead={AUTOMATION_WHY_BUILD_SECTION.titleLead}
        titleAccent={AUTOMATION_WHY_BUILD_SECTION.titleAccent}
        description={AUTOMATION_WHY_BUILD_SECTION.description}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />
      <div className={styles.whyGrid}>
        {AUTOMATION_WHY_BUILD_SECTION.cards.map((card, index) => (
          <WhyCard key={card.title} card={card} index={index} />
        ))}
      </div>
    </div>
  );
}

export function AutomationWhyBuild() {
  return (
    <MarketingViewportGate
      mobile={<AutomationWhyBuildMobile />}
      desktop={<AutomationWhyBuildDesktop />}
    />
  );
}
