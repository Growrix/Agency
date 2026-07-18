import Link from "next/link";
import {
  ArrowRightIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { BoltIcon } from "@heroicons/react/24/solid";
import { MarketingSplitHero } from "@/components/marketing/MarketingSplitHero";
import { MarketingHeroTitle } from "@/components/marketing/MarketingHeroTitle";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { ServiceDetailHeroMobile } from "@/components/marketing/services/ServiceDetailHeroMobile";
import { AUTOMATION_SERVICE_HERO } from "@/lib/automation-service-content";
import { cn } from "@/lib/utils";
import styles from "./AutomationPage.module.css";

const TRUST_LOGOS = ["Linear", "Ghost", "Webflow", "Vercel"];

type AutomationService = {
  delivery_timeline: string;
  short_description: string;
  pillars: string[];
};

type AutomationCopy = {
  eyebrow: string;
  primaryCta: string;
  secondaryCta: string;
  secondaryHref: string;
  description: string;
};

function AutomationHeroPanel({ service }: { service: AutomationService }) {
  return (
    <div className={styles.heroPanel}>
      <div className={styles.heroPanelGlow} aria-hidden />
      <div className="mb-5 flex items-center justify-between">
        <div className={styles.heroIconWrap}>
          <BoltIcon className="size-6" />
        </div>
        <Badge tone="secondary">{service.delivery_timeline}</Badge>
      </div>
      <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
        Engagement style
      </p>
      <p className="mt-1 font-display text-2xl tracking-tight">
        {service.short_description}
      </p>
      <ul className={styles.heroPillars}>
        {service.pillars.map((pillar) => (
          <li key={pillar} className={styles.heroPillar}>
            <CheckIcon className={styles.heroPillarIcon} aria-hidden />
            {pillar}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AutomationHeroTrust() {
  return (
    <div className={styles.heroTrust}>
      <span className={styles.heroTrustLabel}>Trusted by teams at</span>
      <div className={styles.heroTrustLogos}>
        {TRUST_LOGOS.map((logo) => (
          <span key={logo} className={styles.heroTrustLogo}>
            {logo}
          </span>
        ))}
      </div>
    </div>
  );
}

function AutomationHeroDesktop({
  service,
  copy,
}: {
  service: AutomationService;
  copy: AutomationCopy;
}) {
  return (
    <MarketingSplitHero
      prefix={
        <Link
          href="/services"
          className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-primary"
        >
          ← All services
        </Link>
      }
      copy={
        <div className={styles.heroCopy}>
          <div className="signal-rise" style={{ animationDelay: "0ms" }}>
            <Badge tone="primary" dot className={styles.heroEyebrow}>
              {copy.eyebrow}
            </Badge>
          </div>
          <div className="signal-rise mt-5" style={{ animationDelay: "140ms" }}>
            <MarketingHeroTitle
              className={cn(styles.heroTitle, styles.heroTitleAccent)}
              titleLead={AUTOMATION_SERVICE_HERO.headlineLead}
              titleAccent={AUTOMATION_SERVICE_HERO.headlineAccent}
            />
          </div>
          <p
            className="mt-6 text-lg text-text-muted leading-7 signal-rise"
            style={{ animationDelay: "210ms" }}
          >
            {copy.description}
          </p>
          <div
            className="mt-8 flex flex-wrap gap-3 signal-rise"
            style={{ animationDelay: "280ms" }}
          >
            <LinkButton href="/book-appointment" size="lg">
              {copy.primaryCta} <ArrowRightIcon className="size-4" />
            </LinkButton>
            <LinkButton href={copy.secondaryHref} variant="outline" size="lg">
              {copy.secondaryCta}
            </LinkButton>
          </div>
          <div className="signal-rise" style={{ animationDelay: "350ms" }}>
            <AutomationHeroTrust />
          </div>
        </div>
      }
      panel={<AutomationHeroPanel service={service} />}
    />
  );
}

export function AutomationHero({
  service,
  copy,
}: {
  service: AutomationService;
  copy: AutomationCopy;
}) {
  return (
    <MarketingViewportGate
      mobile={
        <ServiceDetailHeroMobile
          eyebrow={copy.eyebrow}
          headlineLead={AUTOMATION_SERVICE_HERO.headlineLead}
          headlineAccent={AUTOMATION_SERVICE_HERO.headlineAccent}
          description={copy.description}
          primaryCta={copy.primaryCta}
          secondaryCta={copy.secondaryCta}
          secondaryHref={copy.secondaryHref}
          deliveryTimeline={service.delivery_timeline}
          engagementSummary={service.short_description}
          pillars={service.pillars}
          icon={BoltIcon}
        />
      }
      desktop={<AutomationHeroDesktop service={service} copy={copy} />}
    />
  );
}
