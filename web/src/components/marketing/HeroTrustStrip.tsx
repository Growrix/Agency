import { HERO_TRUST_PILLS } from "@/lib/home-conversion-content";
import { cn } from "@/lib/utils";

export function HeroTrustStrip({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-2 sm:gap-2.5",
        className,
      )}
      aria-label="Platform highlights"
    >
      {HERO_TRUST_PILLS.map((pill) => (
        <span
          key={pill}
          className="inline-flex items-center rounded-full border border-border bg-surface/80 px-3 py-1.5 text-[11px] font-medium text-text-muted backdrop-blur-sm sm:text-xs"
        >
          {pill}
        </span>
      ))}
    </div>
  );
}
