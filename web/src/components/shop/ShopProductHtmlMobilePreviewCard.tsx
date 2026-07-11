"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { PreviewPosterPlaceholder } from "@/components/shop/PreviewPosterPlaceholder";
import { WebsiteTemplateHtmlMobilePreviewFrame } from "@/components/shop/WebsiteTemplateHtmlMobilePreviewFrame";
import { useDeferredPreview } from "@/components/shop/useDeferredPreview";
import type { ShopPreviewLoadMode } from "@/components/shop/ShopProductHtmlPreviewCard";
import { SHOP_PROFILE_MOBILE_PREVIEW_MAX_HEIGHT } from "@/lib/shop-mobile-preview";
import { WEBSITE_TEMPLATE_PREVIEW } from "@/lib/preview-terminology";
import { cn } from "@/lib/utils";
import { getProductHref, type ShopCatalogCardVariant, type ShopProduct } from "@/lib/shop";
import {
  getHtmlBusinessProfilePreviewUrl,
  HTML_BUSINESS_PROFILE_SHOP_CATEGORY,
} from "@/lib/html-business-profiles";
import {
  getWebsiteTemplateHtmlPreviewByProductSlug,
  getWebsiteTemplateHtmlPreviewUrl,
  WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG,
} from "@/lib/website-templates-html-preview";

const MOBILE_CARD_PREVIEW_MAX_HEIGHT = 340;
const COMPACT_MOBILE_CARD_PREVIEW_MAX_HEIGHT = SHOP_PROFILE_MOBILE_PREVIEW_MAX_HEIGHT;

function resolveMobilePreviewCardUrl(product: ShopProduct): string | undefined {
  const websiteTemplatePreview =
    product.categorySlug === WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG
      ? getWebsiteTemplateHtmlPreviewByProductSlug(product.slug)
      : null;

  if (websiteTemplatePreview) {
    return getWebsiteTemplateHtmlPreviewUrl(websiteTemplatePreview.slug);
  }

  const directUrl = product.embeddedPreviewUrl ?? product.livePreviewUrl;
  if (directUrl) {
    return directUrl;
  }

  if (product.categorySlug === HTML_BUSINESS_PROFILE_SHOP_CATEGORY.slug) {
    return getHtmlBusinessProfilePreviewUrl(product.slug);
  }

  return undefined;
}

export function ShopProductHtmlMobilePreviewCard({
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
  const previewUrl = resolveMobilePreviewCardUrl(product);
  const hasExternalPreview = Boolean(previewUrl);
  const isCatalogWide = variant === "catalog-wide";
  const isCompact = variant === "compact";
  const isEager = previewLoadMode === "eager";
  const usePosterFirst = previewLoadMode === "poster-first";
  const requiresClickToLoad = usePosterFirst && !autoLoadLive;
  const [liveActivated, setLiveActivated] = useState(!requiresClickToLoad);
  const { ref: previewRef, shouldRender: shouldRenderPreview } = useDeferredPreview<HTMLDivElement>({
    priority: loadPriority,
    rootMargin: requiresClickToLoad ? "0px 0px" : undefined,
    disabled: isEager,
  });
  const shouldMountIframe = requiresClickToLoad
    ? liveActivated
    : isEager || shouldRenderPreview;
  const mobileCardPreviewMaxHeight = isCompact
    ? COMPACT_MOBILE_CARD_PREVIEW_MAX_HEIGHT
    : isCatalogWide
      ? MOBILE_CARD_PREVIEW_MAX_HEIGHT + 20
      : MOBILE_CARD_PREVIEW_MAX_HEIGHT;

  return (
    <Card hoverable className="shop-product-html-mobile-preview-card group flex h-full min-w-0 flex-col overflow-hidden p-0">
      <div
        ref={previewRef}
        className={cn(
          "shop-product-html-mobile-preview-card__preview relative flex w-full max-w-full items-start justify-center overflow-hidden bg-inset",
          isCompact && "min-h-[150px] px-1.5 py-2",
          !isCompact && isCatalogWide && "min-h-[300px] px-3 py-5 sm:min-h-[340px]",
          !isCompact && !isCatalogWide && "min-h-[260px] px-2 py-4 sm:min-h-[300px]",
        )}
      >
        {previewUrl ? (
          shouldMountIframe ? (
            <WebsiteTemplateHtmlMobilePreviewFrame
              previewUrl={previewUrl}
              title={`${product.name} mobile preview`}
              maxFrameHeight={mobileCardPreviewMaxHeight}
              showViewportLabel={false}
              iframeLoading={isEager ? "eager" : "lazy"}
              className="w-full max-w-full"
            />
          ) : requiresClickToLoad ? (
            <PreviewPosterPlaceholder title={product.name} onActivate={() => setLiveActivated(true)} />
          ) : (
            <div className="flex h-full min-h-[inherit] w-full items-center justify-center px-4 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
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
              "absolute left-3 top-3 z-10 rounded-full bg-primary font-mono uppercase tracking-[0.18em] text-surface shadow",
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
              <AddToCartButton
                productSlug={product.slug}
                productName={product.name}
                productImageSrc={product.image?.src}
                productPrice={product.price}
                size="sm"
                variant="outline"
                className="shrink-0 px-3"
                iconOnly
              />
              <LinkButton
                href={previewUrl ?? getProductHref(product)}
                variant="outline"
                size="sm"
                fullWidth
                target={hasExternalPreview ? "_blank" : undefined}
                rel={hasExternalPreview ? "noreferrer" : undefined}
              >
                {WEBSITE_TEMPLATE_PREVIEW.previewCta} <ArrowUpRightIcon className="size-3.5" />
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
