import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AdminPageProps = {
  children: ReactNode;
  className?: string;
};

export function AdminPage({ children, className }: AdminPageProps) {
  return (
    <div className={cn("admin-page space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8", className)}>
      {children}
    </div>
  );
}

type AdminPageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  meta?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  meta,
  actions,
  className,
}: AdminPageHeaderProps) {
  return (
    <header className={cn("flex flex-wrap items-end justify-between gap-3", className)}>
      <div className="min-w-0 max-w-3xl">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">{eyebrow}</p>
        ) : null}
        <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
        {description ? <p className="mt-1.5 text-sm text-text-muted">{description}</p> : null}
      </div>
      {(meta || actions) && (
        <div className="flex flex-wrap items-center gap-3">
          {meta}
          {actions}
        </div>
      )}
    </header>
  );
}

type AdminPageAlertProps = {
  tone?: "error" | "success" | "info";
  children: ReactNode;
  className?: string;
};

export function AdminPageAlert({ tone = "info", children, className }: AdminPageAlertProps) {
  const toneClass =
    tone === "error"
      ? "border-destructive/30 bg-destructive/10 text-destructive"
      : tone === "success"
        ? "border-success/30 bg-success/10 text-success"
        : "border-primary/30 bg-primary/10 text-primary";

  return (
    <div
      role={tone === "error" ? "alert" : undefined}
      className={cn("rounded-md border px-3 py-2 text-sm", toneClass, className)}
    >
      {children}
    </div>
  );
}
