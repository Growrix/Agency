import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "surface" | "inset" | "outline" | "dark";

const variants: Record<Variant, string> = {
  surface:
    "bg-surface border border-border shadow-[var(--shadow-1)]",
  inset: "bg-inset/70 border border-border",
  outline: "bg-transparent border border-border",
  dark: "contrast-surface bg-contrast text-contrast-text border border-white/10",
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
        "rounded-[16px] p-6 transition-[transform,box-shadow,border-color,background-color] duration-300 ease-signal will-change-transform",
        variants[variant],
        hoverable &&
          "hover:-translate-y-1 hover:shadow-(--shadow-2) hover:border-border-strong",
        className
      )}
    >
      {children}
    </Tag>
  );
}
