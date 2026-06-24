import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Motion";
import { MarketingAccentTitle } from "@/components/marketing/MarketingAccentTitle";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary",
        className
      )}
    >
      <span className="h-px w-6 bg-primary/50" aria-hidden />
      {children}
    </span>
  );
}

import { SECTION_TITLE_CLASS } from "@/lib/typography";

const DEFAULT_TITLE_CLASS = SECTION_TITLE_CLASS;

export function SectionHeading({
  eyebrow,
  title,
  titleLead,
  titleAccent,
  description,
  align = "left",
  className,
  titleClassName,
  as: Tag = "h2",
}: {
  eyebrow?: ReactNode;
  title?: ReactNode;
  titleLead?: string;
  titleAccent?: string;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  as?: React.ElementType;
}) {
  const resolvedTitle =
    titleLead && titleAccent ? (
      <MarketingAccentTitle lead={titleLead} accent={titleAccent} />
    ) : (
      title
    );

  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal className="mb-4" delay={0}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={eyebrow ? 0.07 : 0}>
        <Tag className={cn(titleClassName ?? DEFAULT_TITLE_CLASS)}>
          {resolvedTitle}
        </Tag>
      </Reveal>
      {description && (
        <Reveal delay={eyebrow ? 0.14 : 0.07}>
          <p className="mt-5 text-[17px] leading-7 text-text-muted text-pretty">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
