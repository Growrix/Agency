"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { CountUp, motion } from "@/components/motion/Motion";
import { useFreeDemoStore } from "@/lib/free-demo-store";
import { cn } from "@/lib/utils";

export type FreeDemoCampaignView = {
  isActive: boolean;
  totalSlots: number;
  claimedCount: number;
  remaining: number;
};

type Props = {
  className?: string;
  compact?: boolean;
  withRing?: boolean;
  /** Tighter padding / smaller ring for above-the-fold offer layouts. */
  dense?: boolean;
};

const POLL_MS = 5000;

export function FreeDemoCounter({ className, compact = false, withRing = false, dense = false }: Props) {
  const [state, setState] = useState<FreeDemoCampaignView | null>(null);
  const [error, setError] = useState(false);
  const reduced = useReducedMotion();
  const lastClaimedAt = useFreeDemoStore((store) => store.lastClaimedAt);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/v1/campaigns/free-demo", { cache: "no-store" });
        const payload = (await response.json().catch(() => null)) as { data?: FreeDemoCampaignView } | null;
        if (!response.ok || !payload?.data) {
          if (!cancelled) setError(true);
          return;
        }
        if (!cancelled) {
          setState(payload.data);
          setError(false);
        }
      } catch {
        if (!cancelled) setError(true);
      }
    }

    void load();
    const timer = window.setInterval(() => void load(), POLL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [lastClaimedAt]);

  if (error && !state) {
    return <p className={cn("text-sm text-text-muted", className)}>Limited launch spots available.</p>;
  }

  if (!state) {
    return (
      <p className={cn("text-sm text-text-muted", className)} aria-live="polite">
        Loading spots…
      </p>
    );
  }

  const claimedLabel = `${state.claimedCount}/${state.totalSlots}`;
  const remainingLabel = `${state.remaining}`;
  const claimedRatio = state.totalSlots > 0 ? state.claimedCount / state.totalSlots : 0;
  const ringRadius = dense ? 20 : 26;
  const ringSize = dense ? 48 : 64;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference * (1 - claimedRatio);

  if (compact) {
    return (
      <p className={cn("text-sm text-text-muted tabular-nums", className)} aria-live="polite">
        <CountUp value={claimedLabel} /> claimed · <CountUp value={remainingLabel} /> remaining
      </p>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-md border border-primary/25 bg-primary/10 text-sm text-text",
        dense ? "px-3 py-2" : "gap-4 px-4 py-3",
        className,
      )}
      aria-live="polite"
    >
      <span
        aria-hidden
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary",
          dense ? "h-8 w-8" : "h-10 w-10",
        )}
      >
        <svg viewBox="0 0 24 24" fill="none" className={dense ? "h-4 w-4" : "h-5 w-5"} stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 11a4 4 0 1 0-8 0 4 4 0 0 0 8 0Z" />
          <path d="M2 21v-1a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5v1" />
        </svg>
      </span>
      <div className="min-w-0 flex-1">
        <p className={cn("font-medium text-text tabular-nums", dense && "text-[13px] leading-snug")}>
          <CountUp value={claimedLabel} /> founders claimed · <CountUp value={remainingLabel} /> spots left
        </p>
        {!dense ? (
          state.claimedCount > 0 ? (
            <p className="mt-1 text-text-muted">Join {state.claimedCount} founders who already claimed their spot.</p>
          ) : (
            <p className="mt-1 text-text-muted">Be among the first to claim your free strategy demo.</p>
          )
        ) : (
          <p className="mt-0.5 text-[11px] text-text-muted">Be among the first to claim your free strategy demo.</p>
        )}
      </div>
      {withRing ? (
        <span
          aria-hidden
          className="relative flex shrink-0 items-center justify-center"
          style={{ width: ringSize, height: ringSize }}
          role="presentation"
        >
          <svg viewBox={`0 0 ${ringSize} ${ringSize}`} className="-rotate-90" width={ringSize} height={ringSize}>
            <circle
              cx={ringSize / 2}
              cy={ringSize / 2}
              r={ringRadius}
              fill="none"
              stroke="var(--color-border)"
              strokeWidth={dense ? 4 : 5}
            />
            <motion.circle
              cx={ringSize / 2}
              cy={ringSize / 2}
              r={ringRadius}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth={dense ? 4 : 5}
              strokeLinecap="round"
              strokeDasharray={ringCircumference}
              initial={reduced ? false : { strokeDashoffset: ringCircumference }}
              animate={{ strokeDashoffset: ringOffset }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
          <span className="absolute flex flex-col items-center leading-none">
            <span className={cn("font-semibold tabular-nums text-text", dense ? "text-sm" : "text-base")}>
              {state.remaining}
            </span>
            <span className="text-[8px] uppercase tracking-wider text-text-muted">left</span>
          </span>
        </span>
      ) : null}
    </div>
  );
}
