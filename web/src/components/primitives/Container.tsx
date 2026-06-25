import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Width = "shell" | "content" | "reading" | "dense" | "full";
export type SectionSize = "hero" | "standard" | "compact" | "dense" | "none";
export type SectionLayout = "content" | "viewport";
export type SectionSpacing = "default" | "split";

/** Shared horizontal inset — matches header and hero alignment. */
export const CONTAINER_X_CLASS = "px-4 sm:px-8 lg:px-12";

const widths: Record<Width, string> = {
  shell: "max-w-shell",
  content: "max-w-shell",
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

const sectionSplitSizeClass: Partial<Record<SectionSize, string>> = {
  standard: "py-12 sm:py-16 lg:py-12",
  compact: "py-8 sm:py-8",
};

function resolveSectionPadding(size: SectionSize, spacing: SectionSpacing, layout: SectionLayout): string {
  if (layout === "viewport" && size === "hero") {
    return "py-0";
  }
  if (spacing === "split" && sectionSplitSizeClass[size]) {
    return sectionSplitSizeClass[size]!;
  }
  return sectionSizeClass[size];
}

const sectionLayoutClass: Record<SectionLayout, string> = {
  content: "",
  viewport: "hero-viewport-band",
};

export function Container({
  children,
  width = "shell",
  className,
}: {
  children: ReactNode;
  width?: Width;
  className?: string;
}) {
  return (
    <div className={cn(
      "mx-auto w-full",
      width === "full" ? "px-4 sm:px-6 lg:px-8" : CONTAINER_X_CLASS,
      widths[width],
      className,
    )}>
      {children}
    </div>
  );
}

export const Section = forwardRef<
  HTMLElement,
  {
    children: ReactNode;
    className?: string;
    id?: string;
    tone?: "default" | "inset" | "dark";
    size?: SectionSize;
    layout?: SectionLayout;
    spacing?: SectionSpacing;
    "aria-labelledby"?: string;
  }
>(function Section(
  {
    children,
    className,
    id,
    tone = "default",
    size = "standard",
    layout = "content",
    spacing = "default",
    "aria-labelledby": ariaLabelledBy,
  },
  ref,
) {
  const toneClass =
    tone === "inset"
      ? "bg-inset"
      : tone === "dark"
        ? "contrast-surface bg-contrast text-contrast-text"
        : "";
  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        resolveSectionPadding(size, spacing, layout),
        sectionLayoutClass[layout],
        toneClass,
        className
      )}
    >
      {children}
    </section>
  );
});
