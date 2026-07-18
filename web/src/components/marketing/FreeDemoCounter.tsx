"use client";

import { useEffect, useState } from "react";
import { CountUp } from "@/components/motion/Motion";
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
};

const POLL_MS = 5000;

export function FreeDemoCounter({ className, compact = false }: Props) {
  const [state, setState] = useState<FreeDemoCampaignView | null>(null);
  const [error, setError] = useState(false);

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
        "rounded-md border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-text",
        className,
      )}
      aria-live="polite"
    >
      <p className="font-medium text-text">
        <CountUp value={claimedLabel} /> founders claimed · <CountUp value={remainingLabel} /> spots left
      </p>
      {state.claimedCount > 0 ? (
        <p className="mt-1 text-text-muted">Join {state.claimedCount} founders who already claimed their spot.</p>
      ) : (
        <p className="mt-1 text-text-muted">Be among the first to claim your free strategy demo.</p>
      )}
    </div>
  );
}
