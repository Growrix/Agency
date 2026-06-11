"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRightIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { getCheckoutHref, getProductHref, type ShopProduct } from "@/lib/shop";
import { cn } from "@/lib/utils";

const DESKTOP_VIEWPORT_WIDTH = 1440;
const DESKTOP_VIEWPORT_HEIGHT = 900;

function HtmlPreviewDesktopFrame({
  previewUrl,
  productName,
  className,
}: {
  previewUrl: string;
  productName: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const updateScale = () => {
      const nextScale = container.clientWidth / DESKTOP_VIEWPORT_WIDTH;
      setScale(nextScale > 0 ? nextScale : 1);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const scaledHeight = DESKTOP_VIEWPORT_HEIGHT * scale;

  return (
    <div
      ref={containerRef}
      className={cn("shop-product-html-preview-card__frame w-full overflow-hidden bg-[#0a0a0a]", className)}
      style={{ height: scaledHeight }}
    >
      <div
        className="shop-product-html-preview-card__frame-inner"
        style={{
          width: DESKTOP_VIEWPORT_WIDTH,
          height: DESKTOP_VIEWPORT_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <iframe
          src={previewUrl}
          title={`${productName} desktop preview`}
          width={DESKTOP_VIEWPORT_WIDTH}
          height={DESKTOP_VIEWPORT_HEIGHT}
          className="block border-0 bg-white"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
  );
}

export function ShopProductHtmlPreviewCard({ product }: { product: ShopProduct }) {
  const previewUrl = product.embeddedPreviewUrl ?? product.livePreviewUrl;
  const hasExternalPreview = Boolean(previewUrl);

  return (
    <Card hoverable className="shop-product-html-preview-card group flex h-full flex-col overflow-hidden p-0">
      <div className="shop-product-html-preview-card__preview relative min-h-[280px] bg-inset">
        {previewUrl ? (
          <HtmlPreviewDesktopFrame previewUrl={previewUrl} productName={product.name} />
        ) : (
          <div className="flex min-h-[280px] items-center justify-center px-4 text-sm text-text-muted">
            Preview unavailable
          </div>
        )}
        {product.tag ? (
          <div className="absolute left-3 top-3 z-10 rounded-full bg-primary px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white shadow">
            {product.tag}
          </div>
        ) : null}
      </div>

      <div className="shop-product-html-preview-card__body flex flex-1 flex-col gap-2 p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
          {product.category} &middot; {product.type}
        </p>

        <h3 className="line-clamp-2 font-display text-base font-semibold leading-snug tracking-tight text-text">
          <Link href={getProductHref(product)} className="hover:text-primary">
            {product.name}
          </Link>
        </h3>

        <p className="font-display text-2xl font-bold tracking-tight text-text">{product.price}</p>

        <div className="mt-auto flex items-center gap-2 pt-3">
          <LinkButton
            href={getCheckoutHref(product)}
            variant="outline"
            size="sm"
            aria-label={`Add ${product.name} to cart`}
            className="shrink-0 px-3"
          >
            <ShoppingBagIcon className="size-4" />
          </LinkButton>
          <LinkButton
            href={previewUrl ?? getProductHref(product)}
            variant="outline"
            size="sm"
            fullWidth
            target={hasExternalPreview ? "_blank" : undefined}
            rel={hasExternalPreview ? "noreferrer" : undefined}
          >
            Live Preview <ArrowUpRightIcon className="size-3.5" />
          </LinkButton>
        </div>
        <Link href={getProductHref(product)} className="text-sm font-medium text-primary hover:underline">
          View details
        </Link>
      </div>
    </Card>
  );
}
