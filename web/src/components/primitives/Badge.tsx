import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "primary" | "secondary" | "accent" | "success" | "warning";

const tones: Record<Tone, string> = {
  neutral: "bg-[var(--color-inset)] text-[var(--color-text)] border-[var(--color-border)]",
  primary: "bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/25",
  secondary: "bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] border-[var(--color-secondary)]/25",
  accent: "bg-[var(--color-accent)]/10 text-[var(--color-accent)] border-[var(--color-accent)]/25",
  success: "bg-[var(--color-success)]/10 text-[var(--color-success)] border-[var(--color-success)]/25",
  warning: "bg-[var(--color-warning)]/10 text-[var(--color-warning)] border-[var(--color-warning)]/25",
};

export function Badge({
  children,
  tone = "neutral",
  className,
  dot,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-wider",
        tones[tone],
        className
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
