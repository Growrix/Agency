"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRightIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { PreviewPosterPlaceholder } from "@/components/shop/PreviewPosterPlaceholder";
import { WebsiteTemplateHtmlDesktopPreviewFrame } from "@/components/shop/WebsiteTemplateHtmlDesktopPreviewFrame";
import { WebsiteTemplateHtmlMobilePreviewFrame } from "@/components/shop/WebsiteTemplateHtmlMobilePreviewFrame";
import { useDeferredPreview } from "@/components/shop/useDeferredPreview";
import { getCheckoutHref, getProductHref, type ShopProduct } from "@/lib/shop";
import {
  getWebsiteTemplateHtmlPreviewByProductSlug,
  getWebsiteTemplateHtmlPreviewUrl,
  WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG,
} from "@/lib/website-templates-html-preview";
import { HTML_BUSINESS_PROFILE_SHOP_CATEGORY } from "@/lib/html-business-profiles";

type ShopProductHomeCatalogMobileCardProps = {
  product: ShopProduct;
  loadPriority?: boolean;
};

export function ShopProductHomeCatalogMobileCard({
  product,
  loadPriority = false,
}: ShopProductHomeCatalogMobileCardProps) {
  const websiteTemplatePreview =
    product.categorySlug === WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG
      ? getWebsiteTemplateHtmlPreviewByProductSlug(product.slug)
      : null;
  const previewUrl = websiteTemplatePreview
    ? getWebsiteTemplateHtmlPreviewUrl(websiteTemplatePreview.slug)
    : (product.embeddedPreviewUrl ?? product.livePreviewUrl);
  const isProfile = product.categorySlug === HTML_BUSINESS_PROFILE_SHOP_CATEGORY.slug;
  const [liveActivated, setLiveActivated] = useState(false);
  const { ref: previewRef, shouldRender: shouldRenderPreview } = useDeferredPreview<HTMLDivElement>({
    priority: loadPriority,
  });
  const shouldMountIframe = shouldRenderPreview || liveActivated;

  return (
    <article className="home-mobile-marketing__catalog-card">
      <div ref={previewRef} className="home-mobile-marketing__catalog-card-preview">
        {previewUrl ? (
          shouldMountIframe ? (
            isProfile ? (
              <WebsiteTemplateHtmlMobilePreviewFrame
                previewUrl={previewUrl}
                title={`${product.name} preview`}
                maxFrameHeight={120}
                showViewportLabel={false}
                iframeLoading="lazy"
                className="h-full w-full"
              />
            ) : (
              <WebsiteTemplateHtmlDesktopPreviewFrame
                previewUrl={previewUrl}
                title={`${product.name} preview`}
                fit="cover"
                className="absolute inset-0 h-full w-full"
                frameClassName="h-full"
                iframeLoading="lazy"
              />
            )
          ) : (
            <PreviewPosterPlaceholder title={product.name} onActivate={() => setLiveActivated(true)} />
          )
        ) : (
          <div className="home-mobile-marketing__product-row-loading">Preview unavailable</div>
        )}
      </div>

      <div className="home-mobile-marketing__catalog-card-body">
        <p className="home-mobile-marketing__catalog-card-label">{product.category}</p>
        <h3 className="home-mobile-marketing__catalog-card-title">
          <Link href={getProductHref(product)}>{product.name}</Link>
        </h3>
        <p className="home-mobile-marketing__catalog-card-price">{product.price}</p>
        <div className="home-mobile-marketing__catalog-card-actions">
          <LinkButton
            href={getCheckoutHref(product)}
            variant="outline"
            aria-label={`Add ${product.name} to cart`}
            className="home-mobile-marketing__product-row-cart"
          >
            <ShoppingBagIcon className="home-mobile-marketing__product-row-action-icon" aria-hidden />
          </LinkButton>
          <Link
            href={getProductHref(product)}
            className="home-mobile-marketing__catalog-card-view"
          >
            View <ArrowUpRightIcon className="size-3" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
