"use client";

import { PlayCircleIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

type PreviewPosterPlaceholderProps = {
  title: string;
  subtitle?: string;
  onActivate: () => void;
  className?: string;
};

export function PreviewPosterPlaceholder({
  title,
  subtitle = "Click to load website preview",
  onActivate,
  className,
}: PreviewPosterPlaceholderProps) {
  return (
    <button
      type="button"
      onClick={onActivate}
      className={cn(
        "group absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-3 bg-[#0a0a0a] px-4 text-center transition-colors hover:bg-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        className,
      )}
      aria-label={`Load website preview for ${title}`}
    >
      <span className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 transition group-hover:border-primary/50 group-hover:text-primary">
        <PlayCircleIcon className="size-6" aria-hidden />
      </span>
      <span className="font-display text-sm font-semibold tracking-tight text-white/90">{title}</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">{subtitle}</span>
    </button>
  );
}
