import {
  BoltIcon,
  CodeBracketSquareIcon,
  DevicePhoneMobileIcon,
  MagnifyingGlassCircleIcon,
  SparklesIcon,
  WindowIcon,
} from "@heroicons/react/24/outline";
import { Card } from "@/components/primitives/Card";
import { ABOUT_HERO_PANEL } from "@/lib/about-landing-content";

const BUILD_ICONS = [
  WindowIcon,
  CodeBracketSquareIcon,
  DevicePhoneMobileIcon,
  BoltIcon,
  MagnifyingGlassCircleIcon,
  SparklesIcon,
];

export function AboutHeroPanel() {
  return (
    <div className="relative min-w-0 w-full lg:max-w-md lg:ml-auto">
      <div
        className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-primary/8 blur-3xl"
        aria-hidden
      />
      <Card className="relative w-full overflow-hidden border-border bg-surface p-4 sm:p-5">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.18]" aria-hidden />
        <h2 className="relative font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
          {ABOUT_HERO_PANEL.heading}
        </h2>
        <ul className="relative mt-3 space-y-1.5">
          {ABOUT_HERO_PANEL.items.map((item, index) => {
            const Icon = BUILD_ICONS[index] ?? SparklesIcon;
            return (
              <li key={item} className="flex items-center gap-2.5 rounded-md border border-border/80 bg-background/40 px-2.5 py-2">
                <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-primary">
                  <Icon className="size-3.5" aria-hidden />
                </span>
                <span className="text-sm font-medium tracking-tight text-text">{item}</span>
              </li>
            );
          })}
        </ul>
        <p className="relative mt-4 text-xs leading-5 text-text-muted">{ABOUT_HERO_PANEL.footerNote}</p>
      </Card>
    </div>
  );
}
