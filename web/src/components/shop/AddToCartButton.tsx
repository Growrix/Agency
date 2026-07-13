"use client";

import { useMemo, useState } from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/primitives/Button";
import { LinkButton } from "@/components/primitives/Button";
import { parseUsdPriceToCents, useCartStore, useCartUiStore } from "@/lib/cart-store";
import { formatPriceLabelForDisplay } from "@/lib/commerce-pricing";
import { getCheckoutHref } from "@/lib/shop";
import { cn } from "@/lib/utils";

type CartPlanOption = {
  slug: string;
  title: string;
  tierName?: string;
  fulfillmentType?: string;
  price: string;
  redirectHref?: string;
};

type AddToCartButtonProps = {
  productSlug: string;
  productName: string;
  productImageSrc?: string;
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
  planOptions?: CartPlanOption[];
  forcePlanSelection?: boolean;
};

function normalizePlanText(value: string | undefined) {
  return value?.trim() ?? "";
}

export function AddToCartButton({
  productSlug,
  productName,
  productImageSrc,
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
  planOptions,
  forcePlanSelection = false,
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartUiStore((state) => state.open);
  const [modalOpen, setModalOpen] = useState(false);

  const choices = useMemo<CartPlanOption[]>(() => {
    if (!planOptions || planOptions.length === 0) {
      return [
        {
          slug: variantSlug ?? "default",
          title: tierName ?? "Standard",
          tierName,
          fulfillmentType,
          price: productPrice,
        },
      ];
    }

    return planOptions;
  }, [fulfillmentType, planOptions, productPrice, tierName, variantSlug]);

  const [selectedPlanSlug, setSelectedPlanSlug] = useState(choices[0]?.slug ?? "default");
  const selectedPlan = choices.find((entry) => entry.slug === selectedPlanSlug) ?? choices[0];

  function addWithSelectedPlan() {
    if (!selectedPlan) {
      return;
    }

    addItem({
      product_slug: productSlug,
      product_name: productName,
      product_image_src: productImageSrc,
      variant_slug: selectedPlan.slug,
      tier_name: normalizePlanText(selectedPlan.tierName) || selectedPlan.title,
      fulfillment_type: selectedPlan.fulfillmentType,
      quantity,
      unit_price_cents: parseUsdPriceToCents(selectedPlan.price || productPrice),
    });
  }

  function proceedWithSelectedPlan() {
    if (!selectedPlan) {
      return;
    }

    addWithSelectedPlan();

    if (selectedPlan.redirectHref) {
      window.location.assign(selectedPlan.redirectHref);
      return;
    }

    window.location.assign(
      getCheckoutHref(productSlug, {
        variantSlug: selectedPlan.slug,
        tierName: selectedPlan.tierName ?? selectedPlan.title,
        fulfillmentType: selectedPlan.fulfillmentType,
      }),
    );
  }

  const requiresModal = forcePlanSelection && choices.length > 0;

  return (
    <>
      <Button
        type="button"
        variant={variant}
        size={size}
        className={className}
        fullWidth={fullWidth}
        aria-label={ariaLabel ?? `Add ${productName} to cart`}
        onClick={() => {
          if (requiresModal) {
            setModalOpen(true);
            return;
          }

          addItem({
            product_slug: productSlug,
            product_name: productName,
            product_image_src: productImageSrc,
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

      {requiresModal && modalOpen ? (
        <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true" aria-label="Choose a purchase plan">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-surface p-5 shadow-(--shadow-3)">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">Choose your plan</p>
                <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight text-text">{productName}</h3>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-full border border-border px-2.5 py-1 text-xs text-text-muted hover:border-primary/40 hover:text-text"
              >
                Close
              </button>
            </div>

            <div className="space-y-2">
              {choices.map((entry) => {
                const selected = entry.slug === selectedPlanSlug;
                return (
                  <button
                    key={entry.slug}
                    type="button"
                    onClick={() => setSelectedPlanSlug(entry.slug)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left transition-colors",
                      selected
                        ? "border-primary/60 bg-primary/10"
                        : "border-border bg-inset/25 hover:border-primary/40",
                    )}
                  >
                    <span>
                      <span className="block text-sm font-semibold text-text">{entry.title}</span>
                      {entry.fulfillmentType ? (
                        <span className="mt-0.5 block text-xs text-text-muted">{entry.fulfillmentType.replace(/_/g, " ")}</span>
                      ) : null}
                    </span>
                    <span className="font-display text-xl tracking-tight text-text">
                      {formatPriceLabelForDisplay(entry.price, {
                        fulfillmentType: entry.fulfillmentType,
                        variantSlug: entry.slug,
                        tierName: entry.tierName ?? entry.title,
                      })}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  addWithSelectedPlan();
                  setModalOpen(false);
                  openCart();
                }}
              >
                Add only
              </Button>
              <Button type="button" onClick={() => proceedWithSelectedPlan()}>
                Continue
              </Button>
            </div>

            <div className="mt-3 text-center text-xs text-text-muted">
              <LinkButton href="/cart" variant="ghost" size="sm" onClick={() => setModalOpen(false)}>
                View cart first
              </LinkButton>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
