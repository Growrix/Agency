import { cn } from "@/lib/utils";

export function TrustStrip({ items, className }: { items: string[]; className?: string }) {
  const doubled = [...items, ...items];
  return (
    <div className={cn("relative overflow-hidden border-y border-[var(--color-border)] bg-[var(--color-surface)] py-6", className)}>
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--color-bg)] to-transparent z-10" aria-hidden />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--color-bg)] to-transparent z-10" aria-hidden />
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
