import type { ComponentType, SVGProps } from "react";
import Link from "next/link";
import {
  BoltIcon,
  CodeBracketSquareIcon,
  DevicePhoneMobileIcon,
  MagnifyingGlassCircleIcon,
  SparklesIcon,
  WindowIcon,
} from "@heroicons/react/24/outline";
import { Card } from "@/components/primitives/Card";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import type { ServiceEcosystemLink } from "@/lib/services-landing-content";
import { SERVICES_HERO_ECOSYSTEM } from "@/lib/services-landing-content";
import { cn } from "@/lib/utils";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const EXTENSION_ICONS: Record<string, IconComponent> = {
  "technical-seo": MagnifyingGlassCircleIcon,
  automation: BoltIcon,
  "ai-business-systems": SparklesIcon,
  "mobile-apps": DevicePhoneMobileIcon,
  "saas-applications": CodeBracketSquareIcon,
};

function ServiceChip({
  href,
  label,
  icon: Icon,
  featured,
  ariaLabel,
}: {
  href: string;
  label: string;
  icon: IconComponent;
  featured?: boolean;
  ariaLabel?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel ?? label}
      className={cn(
        "group flex items-center gap-2 rounded-md border px-2 py-1.5 transition-[border-color,background-color] duration-300 ease-linear sm:gap-2.5 sm:px-2.5",
        featured
          ? "border-primary/30 bg-primary/10 hover:border-primary/45"
          : "border-border/80 bg-background/40 hover:border-border hover:bg-background/70",
      )}
    >
      <span
        className={cn(
          "inline-flex size-7 shrink-0 items-center justify-center rounded-md border sm:size-8",
          featured ? "border-primary/30 bg-background text-primary" : "border-border bg-surface text-primary",
        )}
      >
        <Icon className="size-3.5 sm:size-4" aria-hidden />
      </span>
      <span
        className={cn(
          "min-w-0 flex-1 text-xs font-medium leading-4 tracking-tight sm:text-sm sm:leading-5",
          featured ? "text-primary" : "text-text group-hover:text-primary",
        )}
      >
        {label}
      </span>
    </Link>
  );
}

export function ServicesHeroEcosystem({ links }: { links: ServiceEcosystemLink[] }) {
  const { hub } = SERVICES_HERO_ECOSYSTEM;

  return (
    <div className="relative min-w-0 w-full lg:max-w-md lg:ml-auto">
      <div
        className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-primary/8 blur-3xl"
        aria-hidden
      />
      <Card className="relative w-full overflow-hidden border-border bg-surface p-3 sm:p-4">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.18]" aria-hidden />

        <p className="relative font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
          Service ecosystem
        </p>

        <div className="relative mt-2.5 space-y-1.5">
          <ServiceChip
            href={hub.href}
            label={hub.label}
            icon={WindowIcon}
            featured
            ariaLabel={`${hub.label} — launch foundation`}
          />

          <div className="h-px bg-border/80" aria-hidden />

          <ul className="grid gap-1 sm:grid-cols-2" aria-label="Related services">
            {links.map((link) => {
              const Icon = EXTENSION_ICONS[link.toSlug] ?? SparklesIcon;
              return (
                <li key={link.toSlug} className="min-w-0">
                  <ServiceChip
                    href={`/services/${link.toSlug}`}
                    label={link.label}
                    icon={Icon}
                    ariaLabel={link.hint ? `${link.label} — ${link.hint}` : link.label}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </Card>
    </div>
  );
}

export function ServiceEcosystemGrid({
  combinations,
}: {
  combinations: readonly { title: string; description: string }[];
}) {
  return (
    <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
      {combinations.map((combo) => (
        <RevealItem key={combo.title} className="h-full min-w-0">
          <Card hoverable className="h-full p-5 sm:p-6">
            <h3 className="font-display text-lg tracking-tight sm:text-xl">{combo.title}</h3>
            <p className="mt-2 text-sm leading-6 text-text-muted">{combo.description}</p>
          </Card>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
