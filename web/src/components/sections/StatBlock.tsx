import { cn } from "@/lib/utils";
import { CountUp } from "@/components/motion/Motion";

export type Stat = { value: string; label: string; hint?: string };

export function StatBlock({ stats, className, dense }: { stats: Stat[]; className?: string; dense?: boolean }) {
  return (
    <dl
      className={cn(
        "grid gap-px rounded-[16px] border border-border bg-border overflow-hidden",
        dense ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      {stats.map((s) => (
        <div key={s.label} className="bg-surface p-5">
          <dt className="font-mono text-xs uppercase tracking-wider text-text-muted">
            {s.label}
          </dt>
          <dd className="mt-2 font-display text-3xl sm:text-4xl tracking-tight tabular-nums">
            <CountUp value={s.value} />
          </dd>
          {s.hint && (
            <p className="mt-1 text-xs text-text-muted">{s.hint}</p>
          )}
        </div>
      ))}
    </dl>
  );
}
