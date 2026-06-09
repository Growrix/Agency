import { cn } from "@/lib/utils";

export function getTierCardContainerClass(featured: boolean) {
  return cn(
    "flex h-full flex-col rounded-2xl border p-5",
    featured
      ? "contrast-surface bg-contrast text-contrast-text border-white/15 ring-1 ring-primary/40 shadow-(--shadow-2)"
      : "border-border bg-surface shadow-[var(--shadow-1)]"
  );
}

export function getTierCardMutedTextClass(featured: boolean) {
  return featured ? "text-white/70" : "text-text-muted";
}

export function getTierCardBadgeClass(featured: boolean) {
  return featured
    ? "rounded-full border border-primary/35 bg-primary/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary"
    : "rounded-full border border-primary/30 bg-primary/12 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary";
}

export function getTierCardCheckClass() {
  return "text-primary";
}
