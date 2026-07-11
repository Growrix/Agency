"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { PreviewPosterPlaceholder } from "@/components/shop/PreviewPosterPlaceholder";
import { WebsiteTemplateHtmlDesktopPreviewFrame } from "@/components/shop/WebsiteTemplateHtmlDesktopPreviewFrame";
import { WebsiteTemplateHtmlMobilePreviewFrame } from "@/components/shop/WebsiteTemplateHtmlMobilePreviewFrame";
import { useDeferredPreview } from "@/components/shop/useDeferredPreview";
import type { ShopPreviewLoadMode } from "@/components/shop/ShopProductHtmlPreviewCard";
import { WEBSITE_TEMPLATE_PREVIEW } from "@/lib/preview-terminology";
import { getProductHref, type ShopProduct } from "@/lib/shop";
import {
  getHtmlBusinessProfilePreviewUrl,
  HTML_BUSINESS_PROFILE_SHOP_CATEGORY,
} from "@/lib/html-business-profiles";
import { SHOP_PROFILE_MOBILE_PREVIEW_MAX_HEIGHT } from "@/lib/shop-mobile-preview";
import { cn } from "@/lib/utils";
import {
  getWebsiteTemplateHtmlPreviewByProductSlug,
  getWebsiteTemplateHtmlPreviewUrl,
  WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG,
} from "@/lib/website-templates-html-preview";

type ShopProductHomeMobileRowCardProps = {
  product: ShopProduct;
  previewLoadMode?: ShopPreviewLoadMode;
  loadPriority?: boolean;
  previewBadgeLabel?: string;
  /** Profile marketplace rows use a compact phone frame; catalog rows use a 50/50 desktop preview split. */
  previewLayout?: "profile-mobile" | "split-desktop";
};

function resolveMobileRowPreviewUrl(product: ShopProduct): string | undefined {
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

export function ShopProductHomeMobileRowCard({
  product,
  previewLoadMode = "auto",
  loadPriority = false,
  previewBadgeLabel = "Preview",
  previewLayout = "split-desktop",
}: ShopProductHomeMobileRowCardProps) {
  const previewUrl = resolveMobileRowPreviewUrl(product);
  const isProfile = product.categorySlug === HTML_BUSINESS_PROFILE_SHOP_CATEGORY.slug;
  const useProfileMobileLayout = previewLayout === "profile-mobile" || isProfile;
  const hasExternalPreview = Boolean(previewUrl);
  const isEager = previewLoadMode === "eager";
  const usePosterFirst = previewLoadMode === "poster-first";
  const requiresClickToLoad = usePosterFirst;
  const [liveActivated, setLiveActivated] = useState(!requiresClickToLoad);
  const { ref: previewRef, shouldRender: shouldRenderPreview } = useDeferredPreview<HTMLDivElement>({
    priority: loadPriority,
    rootMargin: requiresClickToLoad ? "0px 0px" : undefined,
    disabled: isEager,
  });
  const shouldMountIframe = requiresClickToLoad
    ? liveActivated
    : isEager || shouldRenderPreview;
  const iframeLoading = isEager ? "eager" : "lazy";

  return (
    <article
      className={cn(
        "home-mobile-marketing__product-row",
        useProfileMobileLayout && "home-mobile-marketing__product-row--profile-mobile",
        !useProfileMobileLayout && "home-mobile-marketing__product-row--split-desktop",
      )}
    >
      <div ref={previewRef} className="home-mobile-marketing__product-row-preview">
        {previewUrl ? (
          shouldMountIframe ? (
            useProfileMobileLayout ? (
              <WebsiteTemplateHtmlMobilePreviewFrame
                previewUrl={previewUrl}
                title={`${product.name} preview`}
                maxFrameHeight={SHOP_PROFILE_MOBILE_PREVIEW_MAX_HEIGHT}
                contentAlign="start"
                showViewportLabel={false}
                iframeLoading={iframeLoading}
                className="home-mobile-marketing__product-row-frame home-mobile-marketing__product-row-frame--profile"
              />
            ) : (
              <WebsiteTemplateHtmlDesktopPreviewFrame
                previewUrl={previewUrl}
                title={`${product.name} preview`}
                fit="contain"
                measureDocumentHeight={false}
                verticalAlign="top"
                className="home-mobile-marketing__product-row-frame home-mobile-marketing__product-row-frame--fit-width"
                iframeLoading={iframeLoading}
              />
            )
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
        <p className="home-mobile-marketing__product-row-label">{product.category}</p>
        <p className="home-mobile-marketing__product-row-label home-mobile-marketing__product-row-label--sub">
          {product.type}
        </p>
        <h3 className="home-mobile-marketing__product-row-title">
          <Link href={getProductHref(product)}>{product.name}</Link>
        </h3>
        <p className="home-mobile-marketing__product-row-price">{product.price}</p>
        <div className="home-mobile-marketing__product-row-actions">
          <AddToCartButton
            productSlug={product.slug}
            productName={product.name}
            productImageSrc={product.image?.src}
            productPrice={product.price}
            variant="outline"
            className="home-mobile-marketing__product-row-cart"
            ariaLabel={`Add ${product.name} to cart`}
            iconOnly
          />
          <LinkButton
            href={previewUrl ?? getProductHref(product)}
            variant="outline"
            className="home-mobile-marketing__product-row-preview-cta"
            target={hasExternalPreview ? "_blank" : undefined}
            rel={hasExternalPreview ? "noreferrer" : undefined}
          >
            {WEBSITE_TEMPLATE_PREVIEW.previewCta} <ArrowUpRightIcon className="home-mobile-marketing__product-row-action-icon" aria-hidden />
          </LinkButton>
        </div>
        <Link href={getProductHref(product)} className="home-mobile-marketing__product-row-details">
          View details <ArrowUpRightIcon className="home-mobile-marketing__product-row-details-icon" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
