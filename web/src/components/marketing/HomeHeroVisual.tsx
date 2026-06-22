"use client";

import Link from "next/link";
import {
  ArrowUpRightIcon,
  BoltIcon,
  DevicePhoneMobileIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

export type HomeHeroVisualProps = {
  templateName?: string;
  templateType?: string;
  templatePrice?: string;
  templateHref?: string;
};

const FLOATING_CHIPS = [
  { label: "HTML Profiles", icon: DevicePhoneMobileIcon, className: "left-0 top-6 signal-float" },
  { label: "AI Systems", icon: SparklesIcon, className: "right-2 top-16 signal-float [animation-delay:600ms]" },
  { label: "Live Preview", icon: BoltIcon, className: "bottom-16 left-4 signal-float [animation-delay:1200ms]" },
] as const;

export function HomeHeroVisual({
  templateName = "Website Template",
  templateType = "Production-ready",
  templatePrice = "$149",
  templateHref = "/digital-products/category/website-templates-html-preview",
}: HomeHeroVisualProps) {
  return (
    <div className="relative mx-auto w-full max-w-[440px] lg:max-w-none lg:mx-0">
      <div
        className="signal-drift-1 pointer-events-none absolute -left-8 top-8 h-36 w-36 rounded-full bg-primary/25 blur-3xl"
        aria-hidden
      />
      <div
        className="signal-drift-2 pointer-events-none absolute -right-6 bottom-10 h-32 w-32 rounded-full bg-secondary/20 blur-3xl"
        aria-hidden
      />

      {FLOATING_CHIPS.map((chip, index) => {
        const Icon = chip.icon;
        return (
          <div
            key={chip.label}
            className={cn(
              "signal-spring-in absolute z-20 hidden rounded-full border border-border/80 bg-surface/90 px-3 py-1.5 text-[11px] font-medium text-text shadow-(--shadow-2) backdrop-blur-sm sm:inline-flex sm:items-center sm:gap-1.5",
              chip.className,
            )}
            style={{ animationDelay: `${320 + index * 120}ms` }}
          >
            <Icon className="size-3.5 text-primary" aria-hidden />
            {chip.label}
          </div>
        );
      })}

      <div
        className="signal-spring-in relative overflow-hidden rounded-2xl border border-border bg-surface shadow-(--shadow-3)"
        style={{ animationDelay: "180ms" }}
      >
        <div className="flex items-center gap-2 border-b border-border bg-inset/60 px-4 py-3">
          <span className="size-2.5 rounded-full bg-destructive/80" aria-hidden />
          <span className="size-2.5 rounded-full bg-warning/80" aria-hidden />
          <span className="size-2.5 rounded-full bg-success/80" aria-hidden />
          <span className="ml-2 truncate font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
            growrixos.com/preview
          </span>
        </div>

        <div className="relative aspect-4/3 overflow-hidden bg-[#070b12]">
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_0%,rgba(45,212,191,0.22),transparent_55%),radial-gradient(ellipse_60%_50%_at_100%_100%,rgba(232,137,90,0.18),transparent_50%)]"
            aria-hidden
          />
          <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />

          <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">{templateType}</p>
              <p className="mt-2 font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
                {templateName}
              </p>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                {["Hero", "Proof", "CTA"].map((block) => (
                  <div
                    key={block}
                    className="rounded-lg border border-white/10 bg-white/5 px-2 py-3 text-center font-mono text-[9px] uppercase tracking-wider text-white/50"
                  >
                    {block}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-white/45">From</p>
                  <p className="font-display text-lg font-bold tracking-tight text-white">{templatePrice}</p>
                </div>
                <Link
                  href={templateHref}
                  className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-surface transition-transform hover:-translate-y-px"
                >
                  Preview
                  <ArrowUpRightIcon className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="signal-spring-in mt-4 grid grid-cols-3 gap-2 sm:gap-3"
        style={{ animationDelay: "420ms" }}
      >
        {[
          { value: "100+", label: "Templates" },
          { value: "24h", label: "Profile launch" },
          { value: "3", label: "Build paths" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-surface/80 px-3 py-3 text-center backdrop-blur-sm"
          >
            <p className="font-display text-lg font-bold tracking-tight text-text sm:text-xl">{stat.value}</p>
            <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
