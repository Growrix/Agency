"use client";

import Link from "next/link";
import { ArrowUpRightIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { WebsiteTemplateHtmlDesktopPreviewFrame } from "@/components/shop/WebsiteTemplateHtmlDesktopPreviewFrame";
import { getCheckoutHref, getProductHref, type ShopProduct } from "@/lib/shop";

export function ShopProductHtmlPreviewCard({ product }: { product: ShopProduct }) {
  const previewUrl = product.embeddedPreviewUrl ?? product.livePreviewUrl;
  const hasExternalPreview = Boolean(previewUrl);

  return (
    <Card hoverable className="shop-product-html-preview-card group flex h-full flex-col overflow-hidden p-0">
      <div className="shop-product-html-preview-card__preview relative aspect-16/10 w-full overflow-hidden bg-[#0a0a0a]">
        {previewUrl ? (
          <WebsiteTemplateHtmlDesktopPreviewFrame
            previewUrl={previewUrl}
            title={`${product.name} desktop preview`}
            fit="cover"
            className="absolute inset-0 h-full w-full"
            frameClassName="shop-product-html-preview-card__frame"
          />
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
