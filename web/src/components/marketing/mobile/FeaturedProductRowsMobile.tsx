"use client";

import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { ShopProductHomeMobileRowCard } from "@/components/shop/ShopProductHomeMobileRowCard";
import type { ShopProduct } from "@/lib/shop";

type FeaturedProductRowsMobileProps = {
  products: ShopProduct[];
  previewLayout?: "profile-mobile" | "split-desktop";
};

export function FeaturedProductRowsMobile({
  products,
  previewLayout,
}: FeaturedProductRowsMobileProps) {
  return (
    <RevealGroup className="home-mobile-marketing__stack">
      {products.map((product, index) => (
        <RevealItem key={product.slug}>
          <ShopProductHomeMobileRowCard
            product={product}
            loadPriority={index === 0}
            previewLayout={previewLayout}
          />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
