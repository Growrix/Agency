import Link from "next/link";
import Image from "next/image";
import { ShoppingBagIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { getProductImage } from "@/lib/site-images";
import { getCheckoutHref, type ShopProduct } from "@/lib/shop";
import { cn } from "@/lib/utils";

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          viewBox="0 0 16 16"
          className={cn("size-3.5", star <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-border text-border")}
          aria-hidden
        >
          <path d="M8 1.5l1.76 3.57 3.94.57-2.85 2.78.67 3.93L8 10.35l-3.52 1.99.67-3.93L2.3 5.63l3.94-.57z" />
        </svg>
      ))}
    </span>
  );
}

export function ShopProductCard({ product }: { product: ShopProduct }) {
  const image = product.image ?? getProductImage(product.name);

  return (
    <Card hoverable className="group flex h-full flex-col overflow-hidden p-0">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-inset">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 bg-inset" />
        )}
        {product.tag ? (
          <div className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white shadow">
            {product.tag}
          </div>
        ) : null}
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* Category + type line */}
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
          {product.category} &middot; {product.type}
        </p>

        {/* Name */}
        <h3 className="line-clamp-2 font-display text-base font-semibold leading-snug tracking-tight text-text">
          <Link href={`/shop/${product.slug}`} className="hover:text-primary">
            {product.name}
          </Link>
        </h3>

        {/* Price */}
        <p className="font-display text-2xl font-bold tracking-tight text-text">{product.price}</p>

        {/* Star rating row */}
        {product.rating ? (
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <StarRating rating={product.rating} />
            <span className="font-medium text-text">{product.rating}</span>
            {product.reviewCount ? <span>({product.reviewCount})</span> : null}
            {product.salesCount ? (
              <>
                <span aria-hidden className="select-none">·</span>
                <span>{product.salesCount} sales</span>
              </>
            ) : null}
          </div>
        ) : null}

        {/* CTAs */}
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
            href={product.livePreviewUrl ?? `/shop/${product.slug}`}
            variant="outline"
            size="sm"
            fullWidth
            target={product.livePreviewUrl ? "_blank" : undefined}
            rel={product.livePreviewUrl ? "noreferrer" : undefined}
          >
            Live Preview <ArrowUpRightIcon className="size-3.5" />
          </LinkButton>
        </div>
        <Link href={`/shop/${product.slug}`} className="text-sm font-medium text-primary hover:underline">
          View details
        </Link>
      </div>
    </Card>
  );
}