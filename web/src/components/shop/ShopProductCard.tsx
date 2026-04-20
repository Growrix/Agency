import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { Card } from "@/components/primitives/Card";
import { getProductImage } from "@/lib/site-images";
import type { ShopProduct } from "@/lib/shop";

export function ShopProductCard({ product }: { product: ShopProduct }) {
  const image = getProductImage(product.name);

  return (
    <Card hoverable className="flex h-full flex-col">
      <div className="relative -mx-6 -mt-6 mb-5 h-40 overflow-hidden rounded-t-[16px] border-b border-border">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/65">{product.category}</p>
            <p className="mt-2 font-display text-xl tracking-tight text-white">{product.name}</p>
          </div>
          {product.tag ? <Badge tone="secondary">{product.tag}</Badge> : null}
        </div>
      </div>

      <p className="text-sm leading-6 text-text-muted">{product.teaser}</p>
      <div className="mt-auto flex items-center justify-between gap-4 pt-5">
        <span className="font-display text-xl">{product.price}</span>
        <Link
          href={`/shop/${product.slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-all hover:gap-2"
        >
          Preview <ArrowUpRightIcon className="size-4" />
        </Link>
      </div>
    </Card>
  );
}