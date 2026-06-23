"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRightIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { PreviewPosterPlaceholder } from "@/components/shop/PreviewPosterPlaceholder";
import { WebsiteTemplateHtmlMobilePreviewFrame } from "@/components/shop/WebsiteTemplateHtmlMobilePreviewFrame";
import { useDeferredPreview } from "@/components/shop/useDeferredPreview";
import type { ShopPreviewLoadMode } from "@/components/shop/ShopProductHtmlPreviewCard";
import { getCheckoutHref, getProductHref, type ShopProduct } from "@/lib/shop";
import {
  getWebsiteTemplateHtmlPreviewByProductSlug,
  getWebsiteTemplateHtmlPreviewUrl,
  WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG,
} from "@/lib/website-templates-html-preview";

const ROW_PREVIEW_MAX_HEIGHT = 120;

type ShopProductHomeMobileRowCardProps = {
  product: ShopProduct;
  previewLoadMode?: ShopPreviewLoadMode;
  loadPriority?: boolean;
  previewBadgeLabel?: string;
};

export function ShopProductHomeMobileRowCard({
  product,
  previewLoadMode = "auto",
  loadPriority = false,
  previewBadgeLabel = "Preview",
}: ShopProductHomeMobileRowCardProps) {
  const websiteTemplatePreview =
    product.categorySlug === WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG
      ? getWebsiteTemplateHtmlPreviewByProductSlug(product.slug)
      : null;
  const previewUrl = websiteTemplatePreview
    ? getWebsiteTemplateHtmlPreviewUrl(websiteTemplatePreview.slug)
    : (product.embeddedPreviewUrl ?? product.livePreviewUrl);
  const hasExternalPreview = Boolean(previewUrl);
  const usePosterFirst = previewLoadMode === "poster-first";
  const requiresClickToLoad = usePosterFirst;
  const [liveActivated, setLiveActivated] = useState(!requiresClickToLoad);
  const { ref: previewRef, shouldRender: shouldRenderPreview } = useDeferredPreview<HTMLDivElement>({
    priority: loadPriority,
    rootMargin: requiresClickToLoad ? "0px 0px" : undefined,
  });
  const shouldMountIframe = requiresClickToLoad ? liveActivated : shouldRenderPreview;

  return (
    <article className="home-mobile-marketing__product-row">
      <div ref={previewRef} className="home-mobile-marketing__product-row-preview">
        {previewUrl ? (
          shouldMountIframe ? (
            <WebsiteTemplateHtmlMobilePreviewFrame
              previewUrl={previewUrl}
              title={`${product.name} preview`}
              maxFrameHeight={ROW_PREVIEW_MAX_HEIGHT}
              showViewportLabel={false}
              iframeLoading="lazy"
              className="home-mobile-marketing__product-row-frame"
            />
          ) : requiresClickToLoad ? (
            <PreviewPosterPlaceholder title={product.name} onActivate={() => setLiveActivated(true)} />
          ) : (
            <div className="home-mobile-marketing__product-row-loading">Loading preview…</div>
          )
        ) : (
          <div className="home-mobile-marketing__product-row-loading">Preview unavailable</div>
        )}
        <span className="home-mobile-marketing__product-row-badge">{previewBadgeLabel}</span>
      </div>

      <div className="home-mobile-marketing__product-row-body">
        <p className="home-mobile-marketing__product-row-label">
          {product.category} &middot; {product.type}
        </p>
        <h3 className="home-mobile-marketing__product-row-title">
          <Link href={getProductHref(product)}>{product.name}</Link>
        </h3>
        <p className="home-mobile-marketing__product-row-price">{product.price}</p>
        <div className="home-mobile-marketing__product-row-actions">
          <LinkButton
            href={getCheckoutHref(product)}
            variant="outline"
            aria-label={`Add ${product.name} to cart`}
            className="home-mobile-marketing__product-row-cart"
          >
            <ShoppingBagIcon className="home-mobile-marketing__product-row-action-icon" aria-hidden />
          </LinkButton>
          <LinkButton
            href={previewUrl ?? getProductHref(product)}
            variant="outline"
            className="home-mobile-marketing__product-row-preview-cta"
            target={hasExternalPreview ? "_blank" : undefined}
            rel={hasExternalPreview ? "noreferrer" : undefined}
          >
            Live Preview <ArrowUpRightIcon className="home-mobile-marketing__product-row-action-icon" aria-hidden />
          </LinkButton>
        </div>
        <Link href={getProductHref(product)} className="home-mobile-marketing__product-row-details">
          View details <ArrowUpRightIcon className="home-mobile-marketing__product-row-details-icon" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
