"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRightIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { PreviewPosterPlaceholder } from "@/components/shop/PreviewPosterPlaceholder";
import { WebsiteTemplateHtmlDesktopPreviewFrame } from "@/components/shop/WebsiteTemplateHtmlDesktopPreviewFrame";
import { useDeferredPreview } from "@/components/shop/useDeferredPreview";
import { cn } from "@/lib/utils";
import { getCheckoutHref, getProductHref, type ShopCatalogCardVariant, type ShopProduct } from "@/lib/shop";
import {
  getWebsiteTemplateHtmlPreviewByProductSlug,
  getWebsiteTemplateHtmlPreviewUrl,
  WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG,
} from "@/lib/website-templates-html-preview";

export type ShopPreviewLoadMode = "auto" | "poster-first";

export function ShopProductHtmlPreviewCard({
  product,
  variant = "default",
  previewLoadMode = "auto",
  autoLoadLive = true,
  loadPriority = false,
}: {
  product: ShopProduct;
  variant?: ShopCatalogCardVariant;
  previewLoadMode?: ShopPreviewLoadMode;
  autoLoadLive?: boolean;
  loadPriority?: boolean;
}) {
  const websiteTemplatePreview = product.categorySlug === WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG
    ? getWebsiteTemplateHtmlPreviewByProductSlug(product.slug)
    : null;
  const previewUrl = websiteTemplatePreview
    ? getWebsiteTemplateHtmlPreviewUrl(websiteTemplatePreview.slug)
    : (product.embeddedPreviewUrl ?? product.livePreviewUrl);
  const hasExternalPreview = Boolean(previewUrl);
  const isCatalogWide = variant === "catalog-wide";
  const isCompact = variant === "compact";
  const usePosterFirst = previewLoadMode === "poster-first";
  const requiresClickToLoad = usePosterFirst && !autoLoadLive;
  const [liveActivated, setLiveActivated] = useState(!requiresClickToLoad);
  const { ref: previewRef, shouldRender: shouldRenderPreview } = useDeferredPreview<HTMLDivElement>({
    priority: loadPriority,
    rootMargin: requiresClickToLoad ? "0px 0px" : undefined,
  });
  const shouldMountIframe = requiresClickToLoad
    ? liveActivated
    : shouldRenderPreview;

  return (
    <Card hoverable className="shop-product-html-preview-card group flex h-full min-w-0 flex-col overflow-hidden p-0">
      <div
        ref={previewRef}
        className={cn(
          "shop-product-html-preview-card__preview relative w-full max-w-full overflow-hidden bg-[#0a0a0a]",
          isCompact && "aspect-[16/10] min-h-[120px]",
          !isCompact && isCatalogWide && "relative aspect-16/10 min-h-[240px] sm:min-h-[280px]",
          !isCompact && !isCatalogWide && "relative aspect-16/10 min-h-[200px]",
        )}
      >
        {previewUrl ? (
          shouldMountIframe ? (
            <WebsiteTemplateHtmlDesktopPreviewFrame
              previewUrl={previewUrl}
              title={`${product.name} desktop preview`}
              fit="cover"
              className="absolute inset-0 h-full w-full"
              frameClassName={isCatalogWide ? "shop-product-html-preview-card__frame h-full" : "shop-product-html-preview-card__frame"}
              iframeLoading="lazy"
            />
          ) : requiresClickToLoad ? (
            <PreviewPosterPlaceholder title={product.name} onActivate={() => setLiveActivated(true)} />
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

      <div
        className={cn(
          "shop-product-html-preview-card__body flex flex-1 flex-col gap-2",
          isCompact ? "gap-1 p-2.5" : isCatalogWide ? "p-5" : "p-4",
        )}
      >
        {!isCompact ? (
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
            {product.category} &middot; {product.type}
          </p>
        ) : (
          <p className="truncate font-mono text-[9px] uppercase tracking-[0.16em] text-text-muted">{product.category}</p>
        )}

        <h3
          className={cn(
            "line-clamp-2 font-display font-semibold leading-snug tracking-tight text-text",
            isCompact ? "text-[13px]" : isCatalogWide ? "text-lg" : "text-base",
          )}
        >
          <Link href={getProductHref(product)} className="hover:text-primary">
            {product.name}
          </Link>
        </h3>

        <p className={cn("font-display font-bold tracking-tight text-text", isCompact ? "text-base" : "text-2xl")}>
          {product.price}
        </p>

        {isCompact ? (
          <Link
            href={getProductHref(product)}
            className="mt-auto inline-flex items-center gap-0.5 pt-1 text-[11px] font-medium text-primary hover:underline"
          >
            View <ArrowUpRightIcon className="size-3" />
          </Link>
        ) : (
          <>
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
          </>
        )}
      </div>
    </Card>
  );
}
