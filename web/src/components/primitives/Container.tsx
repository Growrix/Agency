import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Width = "shell" | "content" | "reading" | "dense" | "full";
type SectionSize = "hero" | "standard" | "compact" | "dense" | "none";
type SectionLayout = "content" | "viewport";

const widths: Record<Width, string> = {
  shell: "max-w-[1440px]",
  content: "max-w-[1200px]",
  reading: "max-w-[960px]",
  dense: "max-w-[768px]",
  full: "max-w-none",
};

const sectionSizeClass: Record<SectionSize, string> = {
  hero: "pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16",
  standard: "py-12 sm:py-16 lg:py-24",
  compact: "py-8 sm:py-12",
  dense: "py-6 sm:py-8",
  none: "py-0",
};

const sectionLayoutClass: Record<SectionLayout, string> = {
  content: "",
  viewport: "lg:flex lg:min-h-[calc(100dvh-var(--site-chrome-height))] lg:flex-col lg:justify-center",
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
  size = "standard",
  layout = "content",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "inset" | "dark";
  size?: SectionSize;
  layout?: SectionLayout;
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
        sectionSizeClass[size],
        sectionLayoutClass[layout],
        toneClass,
        className
      )}
    >
      {children}
    </section>
  );
}
