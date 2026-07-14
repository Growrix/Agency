import type { ReactNode } from "react";
import {
  DASHBOARD_EYEBROW_CLASS,
  DASHBOARD_PAGE_LEAD_CLASS,
  DASHBOARD_PAGE_TITLE_CLASS,
  DASHBOARD_STAT_LABEL_CLASS,
  DASHBOARD_STAT_VALUE_CLASS,
} from "@/lib/dashboard-typography";
import { cn } from "@/lib/utils";

export type DashboardStat = {
  label: string;
  value: ReactNode;
  icon: ReactNode;
};

type DashboardHeroBandProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  stats?: DashboardStat[];
  className?: string;
};

export function DashboardHeroBand({
  eyebrow = "Portal summary",
  title,
  description,
  stats,
  className,
}: DashboardHeroBandProps) {
  return (
    <section
      className={cn(
        "dashboard-hero-surface relative overflow-hidden rounded-md border border-primary/25 p-4 sm:p-6 lg:p-7",
        className,
      )}
    >
      <div
        className="dashboard-hero-glow pointer-events-none absolute inset-y-0 right-0 hidden w-2/5 lg:block"
        aria-hidden
      />

      <div
        className={cn(
          "relative grid gap-4",
          stats && stats.length > 0 ? "xl:grid-cols-[1.1fr_1fr] xl:items-end" : undefined,
        )}
      >
        <div className="min-w-0">
          <p className={DASHBOARD_EYEBROW_CLASS}>{eyebrow}</p>
          <h2 className={DASHBOARD_PAGE_TITLE_CLASS}>{title}</h2>
          {description ? <p className={DASHBOARD_PAGE_LEAD_CLASS}>{description}</p> : null}
        </div>

        {stats && stats.length > 0 ? (
          <div className="grid min-w-0 grid-cols-2 gap-2.5 sm:gap-3 xl:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="dashboard-stat-tile">
                <div className="flex min-w-0 items-center gap-2 text-primary">
                  <span className="inline-flex shrink-0 items-center justify-center [&_svg]:size-4 sm:[&_svg]:size-5">
                    {stat.icon}
                  </span>
                  <span className={DASHBOARD_STAT_VALUE_CLASS} title={typeof stat.value === "string" ? stat.value : undefined}>
                    {stat.value}
                  </span>
                </div>
                <p className={DASHBOARD_STAT_LABEL_CLASS}>{stat.label}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
