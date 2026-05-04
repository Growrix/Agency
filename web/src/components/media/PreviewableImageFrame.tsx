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
  const [naturalSize, setNaturalSize] = useState<{ width: number; height: number } | null>(null);

  const openPreview = () => {
    setNaturalSize(null);
    setOpen(true);
  };

  const closePreview = () => {
    setOpen(false);
    setNaturalSize(null);
  };

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const probe = new window.Image();
    probe.onload = () => {
      setNaturalSize({
        width: Math.max(1, probe.naturalWidth || 1),
        height: Math.max(1, probe.naturalHeight || 1),
      });
    };
    probe.onerror = () => setNaturalSize({ width: 1440, height: 2400 });
    probe.src = src;
  }, [open, src]);

  return (
    <>
      <button
        type="button"
        onClick={openPreview}
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
          className="fixed inset-0 z-120 bg-black/90 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={closePreview}
        >
          <div className="mx-auto flex h-full max-w-6xl flex-col gap-4" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={closePreview}
                className="rounded-md border border-white/30 px-3 py-1.5 text-xs uppercase tracking-wider text-white hover:bg-white/10"
              >
                Close
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-auto rounded-xl border border-white/20 bg-[#070b12]">
              <div className="flex min-h-full min-w-full items-start justify-center p-3 sm:p-6">
                {naturalSize ? (
                  <Image
                    src={src}
                    alt={alt}
                    width={naturalSize.width}
                    height={naturalSize.height}
                    priority
                    sizes="100vw"
                    className="h-auto w-auto max-w-none"
                  />
                ) : (
                  <div className="my-auto rounded-md border border-white/20 px-3 py-2 text-xs uppercase tracking-wider text-white/70">
                    Loading image...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
