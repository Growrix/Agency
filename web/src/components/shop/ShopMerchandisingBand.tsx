"use client";

import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { ShopProductCatalogCard } from "@/components/shop/ShopProductCatalogCard";
import type { PublicShopProductRecord } from "@/server/domain/catalog";
import { cn } from "@/lib/utils";

export type ShopMerchandisingBandCopy = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  seeAllHref?: string;
  seeAllLabel?: string;
  badgeLabel?: string;
  gridColumns?: 2 | 3 | 4;
};

export type ShopMerchandisingBandProps = {
  copy: ShopMerchandisingBandCopy;
  products: PublicShopProductRecord[];
  layout: "grid" | "carousel";
  eagerPreviewCount?: number;
  className?: string;
};

export function ShopMerchandisingBand({
  copy,
  products,
  layout,
  eagerPreviewCount = 4,
  className,
}: ShopMerchandisingBandProps) {
  if (products.length === 0) {
    return null;
  }

  const gridModifier =
    copy.gridColumns === 2
      ? "shop-merch-band__grid--cols-2"
      : copy.gridColumns === 4
        ? "shop-merch-band__grid--cols-4"
        : "shop-merch-band__grid--cols-3";

  return (
    <section
      className={cn("shop-merch-band", className)}
      aria-labelledby={`shop-merch-${copy.id}-title`}
    >
      <div className="shop-merch-band__header">
        <div className="shop-merch-band__heading">
          <p className="shop-merch-band__eyebrow">{copy.eyebrow}</p>
          <h2 id={`shop-merch-${copy.id}-title`} className="shop-merch-band__title">
            {copy.title}
          </h2>
          {copy.description ? <p className="shop-merch-band__description">{copy.description}</p> : null}
        </div>
        {copy.seeAllHref && copy.seeAllLabel ? (
          <Link href={copy.seeAllHref} className="shop-merch-band__see-all">
            {copy.seeAllLabel}
            <ArrowUpRightIcon className="size-3.5" aria-hidden />
          </Link>
        ) : null}
      </div>

      {layout === "carousel" ? (
        <div
          className="shop-merch-band__carousel"
          role="region"
          aria-label={copy.title}
          tabIndex={0}
        >
          {products.map((product, index) => (
            <div key={product.slug} className="shop-merch-band__carousel-item">
              {copy.badgeLabel ? (
                <span className="shop-merch-band__badge">{copy.badgeLabel}</span>
              ) : null}
              <ShopProductCatalogCard
                product={product}
                previewLoadMode={index < eagerPreviewCount ? "eager" : "auto"}
                loadPriority={index === 0}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className={cn("shop-merch-band__grid", gridModifier)}>
          {products.map((product, index) => (
            <div key={product.slug} className="shop-merch-band__grid-item">
              {copy.badgeLabel ? (
                <span className="shop-merch-band__badge">{copy.badgeLabel}</span>
              ) : null}
              <ShopProductCatalogCard
                product={product}
                previewLoadMode={index < eagerPreviewCount ? "eager" : "auto"}
                loadPriority={index < 2}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
