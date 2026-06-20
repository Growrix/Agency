import { Section } from "@/components/primitives/Container";
import { cn } from "@/lib/utils";
import type { HomeSectionTone } from "@/lib/homepage-composition";

export function TrustStrip({
  items,
  className,
  tone = "default",
}: {
  items: string[];
  className?: string;
  tone?: HomeSectionTone;
}) {
  const doubled = [...items, ...items];
  return (
    <Section
      size="compact"
      tone={tone}
      className={cn("marquee-pause marquee-mask relative overflow-hidden border-y border-border", className)}
    >
      <div className="flex w-max animate-marquee gap-12 px-6">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-display text-lg tracking-tight text-text-muted whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
    </Section>
  );
}
