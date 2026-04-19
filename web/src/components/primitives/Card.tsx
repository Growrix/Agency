import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "surface" | "inset" | "outline" | "dark";

const variants: Record<Variant, string> = {
  surface:
    "bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-1)]",
  inset: "bg-[var(--color-inset)]/70 border border-[var(--color-border)]",
  outline: "bg-transparent border border-[var(--color-border)]",
  dark: "bg-[var(--color-contrast)] text-[var(--color-contrast-text)] border border-white/10",
};

export function Card({
  children,
  variant = "surface",
  className,
  hoverable,
  as: Tag = "div",
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  hoverable?: boolean;
  as?: React.ElementType;
}) {
  return (
    <Tag
      className={cn(
        "rounded-[16px] p-6 transition-[transform,box-shadow,border-color,background-color] duration-300 ease-[var(--ease-signal)] will-change-transform",
        variants[variant],
        hoverable &&
          "hover:-translate-y-1 hover:shadow-[var(--shadow-2)] hover:border-[var(--color-border-strong)]",
        className
      )}
    >
      {children}
    </Tag>
  );
}
