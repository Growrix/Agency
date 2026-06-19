"use client";

import Link from "next/link";
import { ArrowUpRightIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { WebsiteTemplateHtmlMobilePreviewFrame } from "@/components/shop/WebsiteTemplateHtmlMobilePreviewFrame";
import { useDeferredPreview } from "@/components/shop/useDeferredPreview";
import { cn } from "@/lib/utils";
import { getCheckoutHref, getProductHref, type ShopCatalogCardVariant, type ShopProduct } from "@/lib/shop";
import {
  getWebsiteTemplateHtmlPreviewByProductSlug,
  getWebsiteTemplateHtmlPreviewUrl,
  WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG,
} from "@/lib/website-templates-html-preview";

const MOBILE_CARD_PREVIEW_MAX_HEIGHT = 340;
const COMPACT_MOBILE_CARD_PREVIEW_MAX_HEIGHT = 168;

export function ShopProductHtmlMobilePreviewCard({
  product,
  variant = "default",
}: {
  product: ShopProduct;
  variant?: ShopCatalogCardVariant;
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
  const { ref: previewRef, shouldRender: shouldRenderPreview } = useDeferredPreview<HTMLDivElement>();

  return (
    <Card hoverable className="shop-product-html-mobile-preview-card group flex h-full min-w-0 flex-col overflow-hidden p-0">
      <div
        ref={previewRef}
        className={cn(
          "shop-product-html-mobile-preview-card__preview relative flex w-full max-w-full items-start justify-center overflow-hidden bg-[#0a0a0a]",
          isCompact && "min-h-[150px] px-1.5 py-2",
          !isCompact && isCatalogWide && "min-h-[300px] px-3 py-5 sm:min-h-[340px]",
          !isCompact && !isCatalogWide && "min-h-[260px] px-2 py-4 sm:min-h-[300px]",
        )}
      >
        {previewUrl ? (
          shouldRenderPreview ? (
            <WebsiteTemplateHtmlMobilePreviewFrame
              previewUrl={previewUrl}
              title={`${product.name} mobile preview`}
              maxFrameHeight={
                isCompact
                  ? COMPACT_MOBILE_CARD_PREVIEW_MAX_HEIGHT
                  : isCatalogWide
                    ? MOBILE_CARD_PREVIEW_MAX_HEIGHT + 20
                    : MOBILE_CARD_PREVIEW_MAX_HEIGHT
              }
              showViewportLabel={false}
              iframeLoading="lazy"
              className="w-full max-w-full"
            />
          ) : (
            <div className="flex h-full min-h-[inherit] w-full items-center justify-center px-4 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
              Loading preview…
            </div>
          )
        ) : (
          <div className="flex h-full min-h-[inherit] w-full items-center justify-center px-4 text-sm text-text-muted">
            Preview unavailable
          </div>
        )}
        {product.tag ? (
          <div
            className={cn(
              "absolute left-3 top-3 z-10 rounded-full bg-primary font-mono uppercase tracking-[0.18em] text-white shadow",
              isCompact ? "px-2 py-0.5 text-[8px]" : "px-2.5 py-0.5 text-[10px]",
            )}
          >
            {product.tag}
          </div>
        ) : null}
      </div>

      <div
        className={cn(
          "shop-product-html-mobile-preview-card__body flex flex-1 flex-col gap-2",
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
