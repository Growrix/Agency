"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Button, LinkButton } from "@/components/primitives/Button";
import { formatUsdFromCents, rehydrateCartStore, useCartStore } from "@/lib/cart-store";
import type { CheckoutSelection } from "@/lib/shop";
import type { PublicShopProductRecord } from "@/server/domain/catalog";

type CheckoutExperienceProps = {
  product?: PublicShopProductRecord | null;
  status?: string;
  orderId?: string;
  selection?: CheckoutSelection;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

export function CheckoutExperience({ product, status, orderId, selection }: CheckoutExperienceProps) {
  const searchParams = useSearchParams();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [cartHydrated, setCartHydrated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Checkout could not start. Please try again.");
  const [fallbackMessage, setFallbackMessage] = useState<string | null>(null);
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const selectedTierLabel = selection?.tierName?.trim();
  const isCartMode = searchParams.get("cart") === "1";

  useEffect(() => {
    void rehydrateCartStore().finally(() => setCartHydrated(true));
  }, []);

  const activeCartItems = useMemo(() => {
    if (!isCartMode || !cartHydrated) {
      return [];
    }

    return cartItems;
  }, [cartHydrated, cartItems, isCartMode]);

  const activeCartSubtotal = activeCartItems.reduce((sum, item) => sum + item.unit_price_cents * item.quantity, 0);

  if (status === "success") {
    return (
      <div className="rounded-md border border-success/20 bg-success/5 p-5 text-sm leading-6 text-text-muted">
        Payment flow returned successfully. {selectedTierLabel ? `Tier: ${selectedTierLabel}. ` : ""}{orderId ? `Order reference: ${orderId}. ` : ""}Stripe webhook confirmation may still be processing.
      </div>
    );
  }

  if (status === "cancelled") {
    return (
      <div className="rounded-md border border-border bg-surface p-5 text-sm leading-6 text-text-muted">
        Checkout was cancelled before payment. {selectedTierLabel ? `Tier ${selectedTierLabel} is still selected. ` : ""}Your order draft is still available for follow-up if you restart the flow.
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-wrap gap-3">
        <LinkButton href="/digital-products" size="lg">Go to digital products</LinkButton>
        <LinkButton href="/contact" variant="outline" size="lg">Request invoice</LinkButton>
      </div>
    );
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState("submitting");
    setErrorMessage("Checkout could not start. Please try again.");
    setFallbackMessage(null);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const hasCartItems = activeCartItems.length > 0;

    try {
      const response = await fetch("/api/v1/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          product_slug: hasCartItems ? undefined : product?.slug,
          product_variant_slug: selection?.variantSlug,
          product_tier_name: selection?.tierName,
          fulfillment_type: selection?.fulfillmentType,
          items: hasCartItems ? activeCartItems : undefined,
        }),
      });

      const payload = (await response.json().catch(() => null)) as {
        data?: { checkout_url?: string | null; integration_ready?: boolean; order?: { order_number: string } };
        error?: { message?: string };
      } | null;

      if (!response.ok) {
        setErrorMessage(payload?.error?.message ?? "Checkout could not start. Please try again.");
        setSubmitState("error");
        return;
      }

      if (payload?.data?.checkout_url) {
        window.location.assign(payload.data.checkout_url);
        return;
      }

      setFallbackMessage(
        payload?.data?.order?.order_number
          ? `Order ${payload.data.order.order_number} was saved. Stripe is not configured yet, so the team will follow up manually.`
          : "Order draft saved. Stripe is not configured yet, so the team will follow up manually."
      );
      setSubmitState("success");
      if (hasCartItems) {
        clearCart();
      }
      form.reset();
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4" aria-busy={submitState === "submitting"}>
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Full name *</span>
          <input name="customer_name" required className="signal-input mt-1.5" placeholder="Your name" />
        </label>
        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Email *</span>
          <input type="email" name="customer_email" required className="signal-input mt-1.5" placeholder="you@company.com" />
        </label>
      </div>
      <label className="block">
        <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Phone</span>
        <input name="customer_phone" className="signal-input mt-1.5" placeholder="Optional" />
      </label>
      <label className="block">
        <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Order notes</span>
        <textarea name="notes" rows={4} className="signal-input mt-1.5 min-h-28 resize-y py-3" placeholder="Anything we should know before fulfillment starts?" />
      </label>
      {activeCartItems.length > 0 ? (
        <div className="rounded-[14px] border border-border bg-surface px-4 py-3">
          <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Cart summary</p>
          <ul className="mt-2 space-y-2 text-sm text-text-muted">
            {activeCartItems.map((item) => (
              <li key={`${item.product_slug}::${item.variant_slug ?? "base"}`} className="flex items-start justify-between gap-3">
                <span>
                  {item.product_name}
                  {item.tier_name ? ` · ${item.tier_name}` : ""}
                  {` x${item.quantity}`}
                </span>
                <span className="shrink-0 text-text">{formatUsdFromCents(item.unit_price_cents * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 flex items-center justify-between text-sm">
            <span className="text-text-muted">Subtotal</span>
            <span className="font-semibold text-text">{formatUsdFromCents(activeCartSubtotal)}</span>
          </p>
        </div>
      ) : null}
      {fallbackMessage ? (
        <p className="rounded-[14px] border border-border bg-surface px-4 py-3 text-sm text-text-muted">{fallbackMessage}</p>
      ) : null}
      {submitState === "error" ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
      {selection?.tierName || selection?.variantSlug || selection?.fulfillmentType ? (
        <p className="text-sm text-text-muted">
          Selected package: {selection?.tierName ?? "Base"}
          {selection?.variantSlug ? ` · ${selection.variantSlug}` : ""}
          {selection?.fulfillmentType ? ` · ${selection.fulfillmentType}` : ""}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={submitState === "submitting"} size="lg">
          {submitState === "submitting" ? "Starting checkout..." : "Continue to payment"}
        </Button>
        <LinkButton href="/contact" variant="outline" size="lg">Need an invoice instead</LinkButton>
      </div>
    </form>
  );
}