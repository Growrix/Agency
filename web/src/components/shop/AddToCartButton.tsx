"use client";

import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/primitives/Button";
import { parseUsdPriceToCents, useCartStore, useCartUiStore } from "@/lib/cart-store";

type AddToCartButtonProps = {
  productSlug: string;
  productName: string;
  productPrice: string;
  variantSlug?: string;
  tierName?: string;
  fulfillmentType?: string;
  quantity?: number;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "ghost" | "outline" | "destructive";
  className?: string;
  fullWidth?: boolean;
  ariaLabel?: string;
  iconOnly?: boolean;
  label?: string;
};

export function AddToCartButton({
  productSlug,
  productName,
  productPrice,
  variantSlug,
  tierName,
  fulfillmentType,
  quantity = 1,
  size = "md",
  variant = "outline",
  className,
  fullWidth,
  ariaLabel,
  iconOnly = false,
  label = "Add to Cart",
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartUiStore((state) => state.open);

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      fullWidth={fullWidth}
      aria-label={ariaLabel ?? `Add ${productName} to cart`}
      onClick={() => {
        addItem({
          product_slug: productSlug,
          product_name: productName,
          variant_slug: variantSlug,
          tier_name: tierName,
          fulfillment_type: fulfillmentType,
          quantity,
          unit_price_cents: parseUsdPriceToCents(productPrice),
        });
        openCart();
      }}
    >
      <ShoppingBagIcon className="size-4" aria-hidden />
      {iconOnly ? null : label}
    </Button>
  );
}
