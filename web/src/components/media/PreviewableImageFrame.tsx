"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type PreviewableImageFrameProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
};

export function PreviewableImageFrame({ src, alt, sizes, className }: PreviewableImageFrameProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group relative aspect-16/10 min-w-0 bg-inset text-left ${className ?? ""}`}
        aria-label="Open image preview"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          priority
        />
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/65 to-transparent p-4 text-white/80">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em]">Click to preview</p>
        </div>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[120] bg-black/90 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={() => setOpen(false)}
        >
          <div className="mx-auto flex h-full max-w-6xl flex-col gap-4" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md border border-white/30 px-3 py-1.5 text-xs uppercase tracking-wider text-white hover:bg-white/10"
              >
                Close
              </button>
            </div>
            <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl border border-white/20 bg-[#070b12]">
              <Image src={src} alt={alt} fill priority sizes="100vw" className="object-contain" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
