"use client";

import Link from "next/link";
import { ArrowUpRightIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { WebsiteTemplateHtmlDesktopPreviewFrame } from "@/components/shop/WebsiteTemplateHtmlDesktopPreviewFrame";
import { useDeferredPreview } from "@/components/shop/useDeferredPreview";
import { getCheckoutHref, getProductHref, type ShopProduct } from "@/lib/shop";

export function ShopProductHtmlPreviewCard({
  product,
  variant = "default",
}: {
  product: ShopProduct;
  variant?: "default" | "catalog-wide";
}) {
  const previewUrl = product.embeddedPreviewUrl ?? product.livePreviewUrl;
  const hasExternalPreview = Boolean(previewUrl);
  const isCatalogWide = variant === "catalog-wide";
  const { ref: previewRef, shouldRender: shouldRenderPreview } = useDeferredPreview<HTMLDivElement>();

  return (
    <Card hoverable className="shop-product-html-preview-card group flex h-full min-w-0 flex-col overflow-hidden p-0">
      <div
        ref={previewRef}
        className={
          isCatalogWide
            ? "shop-product-html-preview-card__preview relative aspect-16/10 min-h-[240px] w-full max-w-full overflow-hidden bg-[#0a0a0a] sm:min-h-[280px]"
            : "shop-product-html-preview-card__preview relative aspect-16/10 min-h-[200px] w-full max-w-full overflow-hidden bg-[#0a0a0a]"
        }
      >
        {previewUrl ? (
          shouldRenderPreview ? (
            <WebsiteTemplateHtmlDesktopPreviewFrame
              previewUrl={previewUrl}
              title={`${product.name} desktop preview`}
              fit="cover"
              className="absolute inset-0 h-full w-full"
              frameClassName={isCatalogWide ? "shop-product-html-preview-card__frame h-full" : "shop-product-html-preview-card__frame"}
              iframeLoading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center px-4 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
              Loading preview…
            </div>
          )
        ) : (
          <div className="flex h-full min-h-[200px] items-center justify-center px-4 text-sm text-text-muted">
            Preview unavailable
          </div>
        )}
        {product.tag ? (
          <div className="absolute left-3 top-3 z-10 rounded-full bg-primary px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white shadow">
            {product.tag}
          </div>
        ) : null}
      </div>

      <div className={`shop-product-html-preview-card__body flex flex-1 flex-col gap-2 ${isCatalogWide ? "p-5" : "p-4"}`}>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
          {product.category} &middot; {product.type}
        </p>

        <h3
          className={
            isCatalogWide
              ? "line-clamp-2 font-display text-lg font-semibold leading-snug tracking-tight text-text"
              : "line-clamp-2 font-display text-base font-semibold leading-snug tracking-tight text-text"
          }
        >
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
