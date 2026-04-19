import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
  as?: "div" | "article" | "li";
}

const paddingStyles = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  children,
  className,
  hover = false,
  padding = "md",
  as: Tag = "div",
}: CardProps) {
  return (
    <Tag
      className={cn(
        "bg-surface border border-border rounded-[var(--radius-lg)] shadow-[var(--shadow-card)]",
        paddingStyles[padding],
        hover &&
          "transition-shadow duration-[var(--duration-standard)] ease-[var(--ease-out)] hover:shadow-[var(--shadow-hover)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
