"use client";

import Link from "next/link";
import Image from "next/image";
import { productPath } from "@/data/routes";
import { type Product } from "@/data/catalog";
import { useUtility } from "@/state/UtilityContext";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { formatPrice } = useUtility();

  return (
    <article data-motion-card className="group relative border border-[#e6e6e6] bg-white p-4 shadow-[0_1px_0_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl motion-lift">
      {product.discountLabel ? (
        <div className="absolute left-0 top-0 z-10 bg-[#ff3434] px-3 py-1 text-[12px] font-bold text-white">
          {product.discountLabel}
        </div>
      ) : null}
      {product.badge ? (
        <div className="absolute right-0 top-0 z-10 bg-[#2d7bf4] px-3 py-1 text-[12px] font-bold text-white">
          {product.badge}
        </div>
      ) : null}

      <Link href={productPath(product.slug)} className="block">
        <div className="relative mx-auto h-52 w-full overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <Link href={productPath(product.slug)} className="mt-3 block min-h-10 text-center text-[13px] font-medium uppercase leading-5 text-[#222] hover:text-[#ff3434]">
        {product.title}
      </Link>

      <div className="mt-1 flex justify-center gap-1 text-[#ffb400]">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={`${product.slug}-${index}`}>{index < product.rating ? "★" : "☆"}</span>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-center gap-3 text-[15px] font-bold">
        <span className="text-[#ff3434]">{formatPrice(product.price)}</span>
        {product.oldPrice ? (
          <span className="text-[#999] line-through">{formatPrice(product.oldPrice)}</span>
        ) : null}
      </div>
    </article>
  );
}
