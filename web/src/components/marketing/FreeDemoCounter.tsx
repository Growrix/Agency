"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { CountUp, motion } from "@/components/motion/Motion";
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
};

const POLL_MS = 5000;

export function FreeDemoCounter({ className, compact = false, withRing = false }: Props) {
  const [state, setState] = useState<FreeDemoCampaignView | null>(null);
  const [error, setError] = useState(false);
  const reduced = useReducedMotion();

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
  }, []);

  if (error && !state) {
    return <p className={cn("text-sm text-text-muted", className)}>Limited launch spots available.</p>;
  }

  if (!state) {
    return <p className={cn("text-sm text-text-muted", className)} aria-live="polite">Loading spots…</p>;
  }

  const claimedLabel = `${state.claimedCount}/${state.totalSlots}`;
  const remainingLabel = `${state.remaining}`;
  const claimedRatio = state.totalSlots > 0 ? state.claimedCount / state.totalSlots : 0;
  const ringRadius = 26;
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
        "flex items-center gap-4 rounded-md border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-text",
        className,
      )}
      aria-live="polite"
    >
      <span
        aria-hidden
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 11a4 4 0 1 0-8 0 4 4 0 0 0 8 0Z" />
          <path d="M2 21v-1a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5v1" />
        </svg>
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-text tabular-nums">
          <CountUp value={claimedLabel} /> founders claimed · <CountUp value={remainingLabel} /> spots left
        </p>
        {state.claimedCount > 0 ? (
          <p className="mt-1 text-text-muted">Join {state.claimedCount} founders who already claimed their spot.</p>
        ) : (
          <p className="mt-1 text-text-muted">Be among the first to claim your free strategy demo.</p>
        )}
      </div>
      {withRing ? (
        <span
          aria-hidden
          className="relative flex h-16 w-16 shrink-0 items-center justify-center"
          role="presentation"
        >
          <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
            <circle cx="32" cy="32" r={ringRadius} fill="none" stroke="var(--color-border)" strokeWidth={5} />
            <motion.circle
              cx="32"
              cy="32"
              r={ringRadius}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth={5}
              strokeLinecap="round"
              strokeDasharray={ringCircumference}
              initial={reduced ? false : { strokeDashoffset: ringCircumference }}
              animate={{ strokeDashoffset: ringOffset }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
          <span className="absolute flex flex-col items-center leading-none">
            <span className="text-base font-semibold tabular-nums text-text">{state.remaining}</span>
            <span className="text-[9px] uppercase tracking-wider text-text-muted">left</span>
          </span>
        </span>
      ) : null}
    </div>
  );
}
