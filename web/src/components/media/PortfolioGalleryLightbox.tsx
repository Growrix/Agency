"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

type GalleryImage = {
  src: string;
  alt: string;
};

type PortfolioGalleryLightboxProps = {
  images: GalleryImage[];
};

export function PortfolioGalleryLightbox({ images }: PortfolioGalleryLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [naturalSize, setNaturalSize] = useState<{ width: number; height: number } | null>(null);

  const close = () => {
    setActiveIndex(null);
    setNaturalSize(null);
  };

  const openAt = (index: number) => {
    setNaturalSize(null);
    setActiveIndex(index);
  };

  const move = useCallback((direction: -1 | 1) => {
    setNaturalSize(null);
    setActiveIndex((index) => {
      if (index === null) return 0;
      const next = index + direction;
      if (next < 0) return images.length - 1;
      if (next >= images.length) return 0;
      return next;
    });
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
      if (event.key === "ArrowRight" && images.length > 1) {
        move(1);
      }
      if (event.key === "ArrowLeft" && images.length > 1) {
        move(-1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, images.length, move]);

  useEffect(() => {
    if (activeIndex === null) return;

    const source = images[activeIndex]?.src;
    if (!source) {
      return;
    }

    const probe = new window.Image();
    probe.onload = () => {
      setNaturalSize({
        width: Math.max(1, probe.naturalWidth || 1),
        height: Math.max(1, probe.naturalHeight || 1),
      });
    };
    probe.onerror = () => setNaturalSize({ width: 1440, height: 2400 });
    probe.src = source;
  }, [activeIndex, images]);

  return (
    <>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {images.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            onClick={() => openAt(index)}
            className="group relative aspect-16/10 rounded-[20px] overflow-hidden border border-border bg-inset text-left"
            aria-label={`Open screen ${index + 1} preview`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-contain bg-[#070b12] transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/5 to-transparent" aria-hidden />
            <div className="absolute inset-0 flex items-end justify-between p-6 text-white">
              <p className="font-mono text-xs uppercase tracking-wider opacity-85">Screen {String(index + 1).padStart(2, "0")}</p>
              <p className="font-mono text-[11px] uppercase tracking-wider opacity-70">Click to preview</p>
            </div>
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[120] bg-black/90 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={close}
        >
          <div className="mx-auto flex h-full max-w-6xl flex-col gap-4" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between text-white">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/80">
                Screen {String(activeIndex + 1).padStart(2, "0")}
              </p>
              <button
                type="button"
                onClick={close}
                className="rounded-md border border-white/30 px-3 py-1.5 text-xs uppercase tracking-wider hover:bg-white/10"
              >
                Close
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-auto rounded-xl border border-white/20 bg-[#070b12]">
              <div className="flex min-h-full min-w-full items-start justify-center p-3 sm:p-6">
                {naturalSize ? (
                  <Image
                    src={images[activeIndex].src}
                    alt={images[activeIndex].alt}
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

            {images.length > 1 && (
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => move(-1)}
                  className="rounded-md border border-white/30 px-3 py-1.5 text-xs uppercase tracking-wider text-white hover:bg-white/10"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => move(1)}
                  className="rounded-md border border-white/30 px-3 py-1.5 text-xs uppercase tracking-wider text-white hover:bg-white/10"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
