"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import {
  EnvelopeIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Button, LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { BillingAddressFieldset, EMPTY_BILLING_ADDRESS, type BillingAddressValues } from "@/components/checkout/BillingAddressFieldset";
import { CardDetailsPanel } from "@/components/checkout/CardDetailsPanel";
import { CartOrderSummary } from "@/components/checkout/CartOrderSummary";
import { CheckoutOrderSummary } from "@/components/checkout/CheckoutOrderSummary";
import { CheckoutRecommendations } from "@/components/checkout/CheckoutRecommendations";
import { CheckoutSteps, type CheckoutStepId } from "@/components/checkout/CheckoutSteps";
import { DiscountCodeField, type AppliedCoupon } from "@/components/checkout/DiscountCodeField";
import { PaymentMethodTabs, type PaymentMethodId } from "@/components/checkout/PaymentMethodTabs";
import { parsePriceStringToCents, resolveSelectedVariant } from "@/components/checkout/checkout-utils";
import { formatUsdFromCents, rehydrateCartStore, useCartStore } from "@/lib/cart-store";
import { getCheckoutHref, type CheckoutSelection } from "@/lib/shop";
import type { PublicShopProductRecord } from "@/server/domain/catalog";
import type { ProductUpsellRecord } from "@/server/data/schema";
import { cn } from "@/lib/utils";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type CheckoutExperienceProps = {
  product?: PublicShopProductRecord | null;
  status?: string;
  orderId?: string;
  selection?: CheckoutSelection;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

type CheckoutViewer = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
};

async function fetchCheckoutViewer(): Promise<CheckoutViewer | null> {
  try {
    const response = await fetch("/api/v1/me", { credentials: "same-origin" });
    if (!response.ok) return null;
    const payload = (await response.json().catch(() => null)) as {
      data?: { user?: CheckoutViewer };
    } | null;
    return payload?.data?.user ?? null;
  } catch {
    return null;
  }
}

export function CheckoutExperience({ product, status, orderId, selection }: CheckoutExperienceProps) {
  const searchParams = useSearchParams();
  const isCartMode = searchParams.get("cart") === "1";

  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [cartHydrated, setCartHydrated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Checkout could not start. Please try again.");
  const [fallbackMessage, setFallbackMessage] = useState<string | null>(null);
  const [viewer, setViewer] = useState<CheckoutViewer | null>(null);
  const [viewerLoaded, setViewerLoaded] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerNameTouched, setCustomerNameTouched] = useState(false);
  const [customerEmailTouched, setCustomerEmailTouched] = useState(false);
  const [createAccountOnCheckout, setCreateAccountOnCheckout] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>("card");
  const [billing, setBilling] = useState<BillingAddressValues>(EMPTY_BILLING_ADDRESS);

  const [selectedUpsells, setSelectedUpsells] = useState<Set<string>>(() => new Set());
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [notes, setNotes] = useState("");

  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const selectedTierLabel = selection?.tierName?.trim();

  useEffect(() => {
    void rehydrateCartStore().finally(() => setCartHydrated(true));
  }, []);

  useEffect(() => {
    let cancelled = false;
    void fetchCheckoutViewer().then((value) => {
      if (cancelled) return;
      setViewer(value);
      setViewerLoaded(true);
      if (value) {
        const composed = [value.first_name, value.last_name].filter(Boolean).join(" ").trim();
        if (composed) setCustomerName(composed);
        if (value.email) setCustomerEmail(value.email);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const activeCartItems = useMemo(() => {
    if (!isCartMode || !cartHydrated) return [];
    return cartItems;
  }, [cartHydrated, cartItems, isCartMode]);

  const stepHrefOverrides = useMemo<Partial<Record<CheckoutStepId, string>>>(() => {
    const overrides: Partial<Record<CheckoutStepId, string>> = {
      cart: "/cart",
    };
    if (product) {
      overrides.information = getCheckoutHref(product.slug, selection);
    } else if (isCartMode) {
      overrides.information = "/checkout?cart=1";
    } else {
      overrides.information = "/checkout";
    }
    overrides.payment = orderId
      ? `/checkout/payment?order=${encodeURIComponent(orderId)}`
      : "/checkout/payment";
    overrides.confirmation = orderId
      ? `/success?order=${encodeURIComponent(orderId)}`
      : "/success";
    return overrides;
  }, [isCartMode, orderId, product, selection]);

  const upsells = useMemo<ProductUpsellRecord[]>(
    () => product?.customization_upsells ?? [],
    [product?.customization_upsells],
  );

  const selectedVariant = useMemo(
    () => (product ? resolveSelectedVariant(product, selection ?? {}) : null),
    [product, selection],
  );

  const productCents = parsePriceStringToCents(selectedVariant?.price ?? product?.price);
  const upsellsCents = upsells
    .filter((upsell) => selectedUpsells.has(upsell.title))
    .reduce((sum, upsell) => sum + parsePriceStringToCents(upsell.price), 0);
  const cartCents = activeCartItems.reduce(
    (sum, item) => sum + item.unit_price_cents * item.quantity,
    0,
  );
  const summarySubtotalCents = product ? productCents + upsellsCents : cartCents;
  const discountCents = appliedCoupon
    ? Math.min(appliedCoupon.discount_cents, summarySubtotalCents)
    : 0;

  const nameError =
    customerNameTouched && customerName.trim().length === 0
      ? "Full name is required."
      : null;
  const emailError =
    customerEmailTouched && !EMAIL_REGEX.test(customerEmail.trim())
      ? "Enter a valid email address."
      : null;

  const contactValid =
    customerName.trim().length > 0 && EMAIL_REGEX.test(customerEmail.trim());
  const billingValid =
    billing.country !== "" &&
    billing.address_line1.trim().length > 0 &&
    billing.city.trim().length > 0 &&
    billing.region.trim().length > 0 &&
    billing.postal_code.trim().length > 0;

  const formValid = contactValid && billingValid;

  let activeStep: CheckoutStepId = "information";
  if (status === "success") {
    activeStep = "confirmation";
  } else if (submitState === "submitting") {
    activeStep = "payment";
  } else if (!viewerLoaded || !viewer) {
    activeStep = "information";
  } else if (isCartMode && !cartHydrated) {
    activeStep = "cart";
  }

  function toggleUpsell(title: string) {
    setSelectedUpsells((prev) => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCustomerNameTouched(true);
    setCustomerEmailTouched(true);

    if (!formValid) return;

    setSubmitState("submitting");
    setErrorMessage("Checkout could not start. Please try again.");
    setFallbackMessage(null);

    if (!viewer) {
      const next = `${window.location.pathname}${window.location.search}`;
      window.location.assign(`/sign-in?next=${encodeURIComponent(next)}`);
      return;
    }

    const hasCartItems = activeCartItems.length > 0;

    try {
      const response = await fetch("/api/v1/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: customerName.trim(),
          customer_email: customerEmail.trim(),
          notes,
          product_slug: hasCartItems ? undefined : product?.slug,
          product_variant_slug: selection?.variantSlug,
          product_tier_name: selection?.tierName,
          fulfillment_type: selection?.fulfillmentType,
          items: hasCartItems ? activeCartItems : undefined,
          payment_method_preference: paymentMethod,
          applied_coupon_code: appliedCoupon?.code ?? null,
          selected_upsells: Array.from(selectedUpsells),
          billing_address: billing,
          create_account_on_checkout: createAccountOnCheckout,
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

      const orderRef = payload?.data?.order?.order_number ?? "";

      if (payload?.data?.checkout_url) {
        if (hasCartItems) clearCart();
        const params = new URLSearchParams({ checkout: payload.data.checkout_url });
        if (orderRef) params.set("order", orderRef);
        window.location.assign(`/checkout/payment?${params.toString()}`);
        return;
      }

      setFallbackMessage(
        orderRef
          ? `Order ${orderRef} was saved. Stripe is not configured yet, so the team will follow up manually.`
          : "Order draft saved. Stripe is not configured yet, so the team will follow up manually.",
      );
      setSubmitState("success");
      if (hasCartItems) {
        clearCart();
      }
    } catch {
      setSubmitState("error");
    }
  };

  if (status === "success") {
    return (
      <div className="space-y-4">
        <CheckoutSteps active="confirmation" hrefOverrides={stepHrefOverrides} />
        <div className="rounded-md border border-success/20 bg-success/5 p-5 text-sm leading-6 text-text-muted">
          Payment flow returned successfully. {selectedTierLabel ? `Tier: ${selectedTierLabel}. ` : ""}
          {orderId ? `Order reference: ${orderId}. ` : ""}Stripe webhook confirmation may still be
          processing.
        </div>
      </div>
    );
  }

  if (status === "cancelled") {
    return (
      <div className="space-y-4">
        <CheckoutSteps active="information" hrefOverrides={stepHrefOverrides} />
        <div className="rounded-md border border-border bg-surface p-5 text-sm leading-6 text-text-muted">
          Checkout was cancelled before payment.{" "}
          {selectedTierLabel ? `Tier ${selectedTierLabel} is still selected. ` : ""}Your order draft
          is still available for follow-up if you restart the flow.
        </div>
      </div>
    );
  }

  // If cart mode is requested but the client cart is still hydrating, show a small
  // placeholder to avoid flashing the "no product" empty state.
  if (!product && isCartMode && !cartHydrated) {
    return (
      <div className="space-y-4">
        <CheckoutSteps active="information" hrefOverrides={stepHrefOverrides} />
        <p className="rounded-md border border-border/60 bg-surface p-5 text-sm text-text-muted">
          Loading your cart…
        </p>
      </div>
    );
  }

  // True empty state: no product query AND no cart-driven checkout in play.
  const hasCartItemsToCheckout = isCartMode && cartHydrated && activeCartItems.length > 0;
  if (!product && !hasCartItemsToCheckout) {
    return (
      <div className="space-y-4">
        <CheckoutSteps active="cart" hrefOverrides={stepHrefOverrides} />
        <div className="rounded-md border border-border/60 bg-surface p-5 text-sm text-text-muted">
          {isCartMode
            ? "Your cart is empty. Browse the catalog to add a product before continuing to checkout."
            : "Choose a product from the catalog to create an order and continue into checkout."}
        </div>
        <div className="flex flex-wrap gap-3">
          <LinkButton href="/digital-products" size="lg">Go to digital products</LinkButton>
          <LinkButton href="/contact" variant="outline" size="lg">Request invoice</LinkButton>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
      <div className="min-w-0 space-y-6">
        <CheckoutSteps active={activeStep} hrefOverrides={stepHrefOverrides} />

        <form
          key={viewer?.id ?? "anon"}
          onSubmit={onSubmit}
          className="space-y-6"
          aria-busy={submitState === "submitting"}
          noValidate
        >
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

          <section aria-labelledby="checkout-contact-heading" className="space-y-4">
            <header className="flex flex-wrap items-baseline justify-between gap-2">
              <h2
                id="checkout-contact-heading"
                className="flex items-baseline gap-2 font-display text-lg tracking-tight"
              >
                <span className="text-text-muted">1.</span>
                Contact information
              </h2>
              {!viewer ? (
                <p className="text-xs text-text-muted">
                  Already have an account?{" "}
                  <a
                    href={`/sign-in?next=${encodeURIComponent(
                      typeof window !== "undefined"
                        ? `${window.location.pathname}${window.location.search}`
                        : "/checkout",
                    )}`}
                    className="font-medium text-primary hover:underline"
                  >
                    Sign in
                  </a>
                </p>
              ) : null}
            </header>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                  Email address *
                </span>
                <div className="relative mt-1">
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(event) => setCustomerEmail(event.target.value)}
                    onBlur={() => setCustomerEmailTouched(true)}
                    aria-invalid={emailError ? "true" : undefined}
                    aria-describedby={emailError ? "customer-email-error" : undefined}
                    className="signal-input pr-10"
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                  <EnvelopeIcon
                    className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-text-muted"
                    aria-hidden
                  />
                </div>
                {emailError ? (
                  <p id="customer-email-error" className="mt-1 text-xs text-destructive">
                    {emailError}
                  </p>
                ) : null}
              </label>

              <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                  Full name *
                </span>
                <div className="relative mt-1">
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)}
                    onBlur={() => setCustomerNameTouched(true)}
                    aria-invalid={nameError ? "true" : undefined}
                    aria-describedby={nameError ? "customer-name-error" : undefined}
                    className="signal-input pr-10"
                    placeholder="John Doe"
                    autoComplete="name"
                  />
                  <UserIcon
                    className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-text-muted"
                    aria-hidden
                  />
                </div>
                {nameError ? (
                  <p id="customer-name-error" className="mt-1 text-xs text-destructive">
                    {nameError}
                  </p>
                ) : null}
              </label>
            </div>

            {!viewer ? (
              <label className="flex items-center gap-2 text-sm text-text-muted">
                <input
                  type="checkbox"
                  checked={createAccountOnCheckout}
                  onChange={(event) => setCreateAccountOnCheckout(event.target.checked)}
                  className="size-4 rounded-sm border-border"
                />
                Create an account for faster checkout
              </label>
            ) : null}
          </section>

          <section aria-labelledby="checkout-payment-heading" className="space-y-4">
            <header>
              <h2
                id="checkout-payment-heading"
                className="flex items-baseline gap-2 font-display text-lg tracking-tight"
              >
                <span className="text-text-muted">2.</span>
                Payment method
              </h2>
            </header>

            <PaymentMethodTabs value={paymentMethod} onChange={setPaymentMethod} />

            {paymentMethod === "card" ? <CardDetailsPanel /> : null}

            {paymentMethod === "stripe" ? (
              <div className="flex items-start gap-3 rounded-md border border-border/60 bg-surface p-4 text-sm">
                <ShieldCheckIcon className="mt-0.5 size-5 text-primary" aria-hidden />
                <p className="text-text-muted">
                  Stripe hosted checkout will collect your card details on a secure page.
                </p>
              </div>
            ) : null}

            <BillingAddressFieldset values={billing} onChange={setBilling} />

            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                Order notes
              </span>
              <textarea
                rows={3}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                className="signal-input mt-1 min-h-24 resize-y py-3"
                placeholder="Anything we should know before fulfillment starts?"
              />
            </label>

            <div className="flex items-center justify-between gap-3 rounded-sm bg-inset/30 px-3 py-2 text-xs text-text-muted">
              <span className="flex items-center gap-2">
                <LockClosedIcon className="size-3.5 text-primary" aria-hidden />
                Your payment information is secure and encrypted
              </span>
              <DiscountCodeField
                applied={appliedCoupon}
                onApply={(coupon) => setAppliedCoupon(coupon)}
                onClear={() => setAppliedCoupon(null)}
                subtotalCents={summarySubtotalCents}
                userEmail={customerEmail || viewer?.email}
              />
            </div>

            {fallbackMessage ? (
              <p className="rounded-md border border-border bg-surface px-4 py-3 text-sm text-text-muted">
                {fallbackMessage}
              </p>
            ) : null}

            <p
              role="status"
              aria-live="polite"
              className={cn(
                "text-sm",
                submitState === "error" ? "text-destructive" : "sr-only",
              )}
            >
              {submitState === "error" ? errorMessage : ""}
            </p>

            <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
              <LinkButton href="/contact" variant="outline" size="md" className="w-full sm:w-auto">
                Need an invoice instead
              </LinkButton>
              <Button
                type="submit"
                size="lg"
                disabled={submitState === "submitting" || !viewerLoaded || (viewer ? !formValid : false)}
                className="w-full sm:w-auto"
              >
                {submitState === "submitting"
                  ? "Starting checkout…"
                  : !viewerLoaded
                    ? "Continue to payment"
                    : viewer
                      ? "Continue to payment"
                      : "Continue to sign in"}
              </Button>
            </div>
          </section>

          {activeCartItems.length > 0 ? (
            <Card variant="inset" className="p-4">
              <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                Cart summary
              </p>
              <ul className="mt-2 space-y-2 text-sm text-text-muted">
                {activeCartItems.map((item) => (
                  <li
                    key={`${item.product_slug}::${item.variant_slug ?? "base"}`}
                    className="flex items-start justify-between gap-3"
                  >
                    <span>
                      {item.product_name}
                      {item.tier_name ? ` · ${item.tier_name}` : ""}
                      {` × ${item.quantity}`}
                    </span>
                    <span className="shrink-0 text-text">
                      {formatUsdFromCents(item.unit_price_cents * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          ) : null}
        </form>

        <CheckoutRecommendations upsells={upsells} />
      </div>

      <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
        {product ? (
          <CheckoutOrderSummary
            product={product}
            selection={selection ?? {}}
            upsells={upsells}
            selectedUpsells={selectedUpsells}
            onToggleUpsell={toggleUpsell}
            discountCode={appliedCoupon?.code ?? null}
            discountCents={discountCents}
          />
        ) : (
          <CartOrderSummary
            items={activeCartItems}
            discountCode={appliedCoupon?.code ?? null}
            discountCents={discountCents}
          />
        )}
      </aside>
    </div>
  );
}
