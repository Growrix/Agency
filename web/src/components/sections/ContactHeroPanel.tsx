import { CheckIcon, ClockIcon } from "@heroicons/react/24/outline";
import { Card } from "@/components/primitives/Card";
import { CONTACT_HERO_PANEL } from "@/lib/contact-landing-content";

export function ContactHeroPanel() {
  return (
    <div className="relative min-w-0 w-full lg:max-w-md lg:ml-auto">
      <div
        className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-primary/8 blur-3xl"
        aria-hidden
      />
      <Card className="relative w-full overflow-hidden border-border bg-surface p-4 sm:p-5">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.18]" aria-hidden />
        <h2 className="relative font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
          {CONTACT_HERO_PANEL.heading}
        </h2>

        <dl className="relative mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-md border border-border/80 bg-background/40 px-3 py-2.5">
            <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
              {CONTACT_HERO_PANEL.responseTime.label}
            </dt>
            <dd className="mt-1 flex items-start gap-1.5 text-sm font-medium tracking-tight text-text">
              <ClockIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              {CONTACT_HERO_PANEL.responseTime.value}
            </dd>
          </div>
          <div className="rounded-md border border-border/80 bg-background/40 px-3 py-2.5">
            <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
              {CONTACT_HERO_PANEL.discoveryCalls.label}
            </dt>
            <dd className="mt-1 font-display text-lg tracking-tight text-text">
              {CONTACT_HERO_PANEL.discoveryCalls.value}
            </dd>
          </div>
        </dl>

        <div className="relative my-4 h-px bg-border/80" aria-hidden />

        <p className="relative font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
          {CONTACT_HERO_PANEL.servicesEyebrow}
        </p>
        <ul className="relative mt-2 grid grid-cols-2 gap-1.5">
          {CONTACT_HERO_PANEL.services.map((item) => (
            <li key={item} className="flex items-center gap-1.5 rounded-md border border-border/80 bg-background/40 px-2 py-1.5 text-xs font-medium tracking-tight text-text">
              <CheckIcon className="size-3.5 shrink-0 text-primary" aria-hidden />
              {item}
            </li>
          ))}
        </ul>

        <div className="relative my-4 h-px bg-border/80" aria-hidden />

        <p className="relative font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
          {CONTACT_HERO_PANEL.projectTypesEyebrow}
        </p>
        <ul className="relative mt-2 grid grid-cols-2 gap-1.5">
          {CONTACT_HERO_PANEL.projectTypes.map((item) => (
            <li key={item} className="flex items-center gap-1.5 rounded-md border border-border/80 bg-background/40 px-2 py-1.5 text-xs font-medium tracking-tight text-text">
              <CheckIcon className="size-3.5 shrink-0 text-primary" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
