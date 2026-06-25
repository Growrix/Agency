import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type HomeHeroDesktopMonitorFrameProps = {
  children: ReactNode;
  className?: string;
  screenClassName?: string;
  /** Rendered inside the live-preview screen (e.g. mobile phone overlay). */
  screenOverlay?: ReactNode;
};

export function HomeHeroDesktopMonitorFrame({
  children,
  className,
  screenClassName,
  screenOverlay,
}: HomeHeroDesktopMonitorFrameProps) {
  return (
    <div className={cn("relative mx-auto w-full", className)}>
      <div className="home-hero-desktop__monitor-shell rounded-[1.35rem] border border-border/70 bg-linear-to-b from-surface/95 to-surface/70 p-2.5 shadow-(--shadow-3) backdrop-blur-sm">
        <div className="flex items-center gap-1.5 border-b border-border/40 px-2.5 py-2">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" aria-hidden />
          <span className="size-2.5 rounded-full bg-[#febc2e]" aria-hidden />
          <span className="size-2.5 rounded-full bg-[#28c840]" aria-hidden />
          <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.16em] text-text-muted">
            Live preview
          </span>
        </div>
        <div
          className={cn(
            "relative flex flex-col overflow-hidden rounded-lg border border-border/60 bg-[#0a0a0a]",
            screenClassName,
          )}
        >
          {children}
          {screenOverlay}
        </div>
      </div>

      <div
        className="mx-auto mt-0 h-6 w-[16%] min-w-14 rounded-b-md border border-t-0 border-border/70 bg-linear-to-b from-surface/80 to-border/40"
        aria-hidden
      />
      <div
        className="mx-auto -mt-px h-2 w-[34%] min-w-20 rounded-full bg-border/55 shadow-sm"
        aria-hidden
      />
    </div>
  );
}
