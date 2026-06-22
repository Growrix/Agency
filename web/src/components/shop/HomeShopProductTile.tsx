"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { Card } from "@/components/primitives/Card";
import { getProductImage } from "@/lib/site-images";
import { getProductHref, type ShopProduct } from "@/lib/shop";

/** Compact tile for the homepage shop viewport — keeps cards small enough to fit without scrolling. */
export function HomeShopProductTile({ product }: { product: ShopProduct }) {
  const image = product.image ?? getProductImage(product.name);

  return (
    <Card hoverable className="group flex h-full flex-col overflow-hidden p-0">
      <div className="relative aspect-[5/3] overflow-hidden bg-inset">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1280px) 20vw, (min-width: 768px) 25vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-inset to-surface" aria-hidden />
        )}
        {product.tag ? (
          <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white">
            {product.tag}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-2.5 sm:p-3">
        <p className="truncate font-mono text-[9px] uppercase tracking-[0.16em] text-text-muted">
          {product.category}
        </p>
        <h3 className="line-clamp-2 font-display text-[13px] font-semibold leading-snug tracking-tight">
          <Link href={getProductHref(product)} className="hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <p className="font-display text-base font-bold tracking-tight">{product.price}</p>
          <Link
            href={getProductHref(product)}
            className="inline-flex items-center gap-0.5 text-[11px] font-medium text-primary hover:underline"
          >
            View <ArrowUpRightIcon className="size-3" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
