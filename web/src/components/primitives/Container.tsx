import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Width = "shell" | "content" | "reading" | "dense" | "full";

const widths: Record<Width, string> = {
  shell: "max-w-[1440px]",
  content: "max-w-[1200px]",
  reading: "max-w-[960px]",
  dense: "max-w-[768px]",
  full: "max-w-none",
};

export function Container({
  children,
  width = "content",
  className,
}: {
  children: ReactNode;
  width?: Width;
  className?: string;
}) {
  return (
    <div className={cn(
      "mx-auto w-full",
      width === "full" ? "px-4 sm:px-6 lg:px-8" : "px-5 sm:px-8 lg:px-12",
      widths[width],
      className,
    )}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "inset" | "dark";
}) {
  const toneClass =
    tone === "inset"
      ? "bg-inset"
      : tone === "dark"
        ? "contrast-surface bg-contrast text-contrast-text"
        : "";
  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-20 lg:py-24",
        toneClass,
        className
      )}
    >
      {children}
    </section>
  );
}
