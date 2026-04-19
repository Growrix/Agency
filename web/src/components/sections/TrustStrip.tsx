import { cn } from "@/lib/utils";

export function TrustStrip({ items, className }: { items: string[]; className?: string }) {
  const doubled = [...items, ...items];
  return (
    <div className={cn("marquee-pause marquee-mask relative overflow-hidden border-y border-[var(--color-border)] bg-[var(--color-surface)] py-6", className)}>
      <div className="flex w-max animate-marquee gap-12 px-6">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-display text-lg tracking-tight text-[var(--color-text-muted)] whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
