"use client";

import { Dialog } from "@headlessui/react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import {
  EnvelopeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Button, LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { BillingAddressFieldset, EMPTY_BILLING_ADDRESS, type BillingAddressValues } from "@/components/checkout/BillingAddressFieldset";
import { CartOrderSummary } from "@/components/checkout/CartOrderSummary";
import { CheckoutOrderSummary } from "@/components/checkout/CheckoutOrderSummary";
import { CheckoutRecommendations } from "@/components/checkout/CheckoutRecommendations";
import { CheckoutSteps, type CheckoutStepId } from "@/components/checkout/CheckoutSteps";
import { DiscountCodeField, type AppliedCoupon } from "@/components/checkout/DiscountCodeField";
import { parsePriceStringToCents, resolveSelectedVariant } from "@/components/checkout/checkout-utils";
import { formatUsdFromCents, rehydrateCartStore, useCartStore } from "@/lib/cart-store";
import { isClerkConfiguredClient } from "@/lib/clerk-client";
import { isQuoteBasedCommerceItem } from "@/lib/commerce-pricing";
import { getCheckoutHref, type CheckoutSelection } from "@/lib/shop";
import type { PublicShopProductRecord } from "@/server/domain/catalog";
import type { ProductUpsellRecord } from "@/server/data/schema";
import { cn } from "@/lib/utils";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CHECKOUT_DRAFT_STORAGE_PREFIX = "growrix:checkout:draft:";

type CheckoutDraftSnapshot = {
  customer_name?: string;
  customer_email?: string;
  notes?: string;
  create_account_on_checkout?: boolean;
  billing?: Partial<BillingAddressValues>;
  selected_upsells?: string[];
};

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

type CheckoutCreatedOrder = {
  id?: string;
  order_number?: string;
};

function createCheckoutIdempotencyKey() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `checkout-${crypto.randomUUID()}`;
  }

  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 10);
  return `checkout-${timestamp}-${random}`;
}

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
  const clerkConfigured = isClerkConfiguredClient();
  const formRef = useRef<HTMLFormElement | null>(null);
  const signInModalTriggerRef = useRef<HTMLButtonElement | null>(null);
  const submitLockRef = useRef(false);
  const idempotencyKeyRef = useRef<string | null>(null);
  const [draftHydrated, setDraftHydrated] = useState(false);

  const checkoutSearchParams = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("status");
    params.delete("order");
    return params;
  }, [searchParams]);

  const checkoutReturnUrl = useMemo(() => {
    const serialized = checkoutSearchParams.toString();
    return serialized.length > 0 ? `/checkout?${serialized}` : "/checkout";
  }, [checkoutSearchParams]);

  const signInHref = useMemo(
    () => `/sign-in?next=${encodeURIComponent(checkoutReturnUrl)}`,
    [checkoutReturnUrl],
  );

  const draftScope = useMemo(() => {
    if (isCartMode) {
      return "cart";
    }

    const productScope = product?.slug ?? "unknown-product";
    const variantScope = selection?.variantSlug ?? "default-variant";
    const tierScope = selection?.tierName ?? "default-tier";
    const fulfillmentScope = selection?.fulfillmentType ?? "default-fulfillment";

    return `${productScope}::${variantScope}::${tierScope}::${fulfillmentScope}`;
  }, [
    isCartMode,
    product?.slug,
    selection?.fulfillmentType,
    selection?.tierName,
    selection?.variantSlug,
  ]);

  const draftStorageKey = useMemo(() => {
    return `${CHECKOUT_DRAFT_STORAGE_PREFIX}${encodeURIComponent(draftScope)}`;
  }, [draftScope]);

  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [cartHydrated, setCartHydrated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Checkout could not start. Please try again.");
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<CheckoutCreatedOrder | null>(null);
  const [viewer, setViewer] = useState<CheckoutViewer | null>(null);
  const [viewerLoaded, setViewerLoaded] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerNameTouched, setCustomerNameTouched] = useState(false);
  const [customerEmailTouched, setCustomerEmailTouched] = useState(false);
  const [createAccountOnCheckout, setCreateAccountOnCheckout] = useState(false);

  const [billing, setBilling] = useState<BillingAddressValues>(EMPTY_BILLING_ADDRESS);

  const [selectedUpsells, setSelectedUpsells] = useState<Set<string>>(() => new Set());
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [notes, setNotes] = useState("");

  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const removeProductItems = useCartStore((state) => state.removeProductItems);

  const selectedTierLabel = selection?.tierName?.trim();

  useEffect(() => {
    void rehydrateCartStore().finally(() => setCartHydrated(true));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let cancelled = false;

    const applyDraft = async () => {
      await Promise.resolve();
      if (cancelled) return;

      setDraftHydrated(false);

      try {
        const raw = window.localStorage.getItem(draftStorageKey);
        if (!raw) {
          return;
        }

        const snapshot = JSON.parse(raw) as CheckoutDraftSnapshot;
        if (typeof snapshot.customer_name === "string") {
          setCustomerName(snapshot.customer_name);
        }
        if (typeof snapshot.customer_email === "string") {
          setCustomerEmail(snapshot.customer_email);
        }
        if (typeof snapshot.notes === "string") {
          setNotes(snapshot.notes);
        }
        if (typeof snapshot.create_account_on_checkout === "boolean") {
          setCreateAccountOnCheckout(snapshot.create_account_on_checkout);
        }
        if (snapshot.billing && typeof snapshot.billing === "object") {
          setBilling({
            ...EMPTY_BILLING_ADDRESS,
            ...snapshot.billing,
          });
        }
        if (Array.isArray(snapshot.selected_upsells)) {
          setSelectedUpsells(new Set(snapshot.selected_upsells.filter((value) => typeof value === "string")));
        }
      } catch {
        // Ignore malformed draft payloads and continue with empty form defaults.
      } finally {
        if (!cancelled) {
          setDraftHydrated(true);
        }
      }
    };

    void applyDraft();

    return () => {
      cancelled = true;
    };
  }, [draftStorageKey]);

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

  useLayoutEffect(() => {
    if (typeof window === "undefined" || !draftHydrated) return;

    const snapshot: CheckoutDraftSnapshot = {
      customer_name: customerName,
      customer_email: customerEmail,
      notes,
      create_account_on_checkout: createAccountOnCheckout,
      billing,
      selected_upsells: Array.from(selectedUpsells),
    };

    try {
      window.localStorage.setItem(draftStorageKey, JSON.stringify(snapshot));
    } catch {
      // Ignore localStorage quota/security exceptions to avoid blocking checkout.
    }
  }, [
    billing,
    createAccountOnCheckout,
    customerEmail,
    customerName,
    draftHydrated,
    draftStorageKey,
    notes,
    selectedUpsells,
  ]);

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

  const productPricingContext = {
    fulfillmentType: selection?.fulfillmentType ?? selectedVariant?.fulfillment_type,
    variantSlug: selection?.variantSlug ?? selectedVariant?.slug,
    tierName: selection?.tierName ?? selectedVariant?.tier_name,
    priceLabel: selectedVariant?.price ?? product?.price,
  };
  const isQuoteBasedProduct = isQuoteBasedCommerceItem(productPricingContext);
  const productCents = isQuoteBasedProduct
    ? 0
    : parsePriceStringToCents(selectedVariant?.price ?? product?.price);
  const upsellsCents = upsells
    .filter((upsell) => selectedUpsells.has(upsell.title))
    .reduce((sum, upsell) => sum + parsePriceStringToCents(upsell.price), 0);
  const cartCents = activeCartItems.reduce((sum, item) => {
    if (
      isQuoteBasedCommerceItem({
        fulfillmentType: item.fulfillment_type,
        variantSlug: item.variant_slug,
        tierName: item.tier_name,
      })
    ) {
      return sum;
    }

    return sum + item.unit_price_cents * item.quantity;
  }, 0);
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
  if (status === "success" || submitState === "success") {
    activeStep = "confirmation";
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

  function clearDraft() {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(draftStorageKey);
    } catch {
      // Ignore localStorage exceptions to avoid blocking order placement.
    }
  }

  function getMissingBillingFields(values: BillingAddressValues) {
    const missing: string[] = [];
    if (!values.country) missing.push("country");
    if (!values.address_line1.trim()) missing.push("address");
    if (!values.city.trim()) missing.push("city");
    if (!values.region.trim()) missing.push("state/region");
    if (!values.postal_code.trim()) missing.push("zip/postal code");
    return missing;
  }

  function focusFirstInvalidField() {
    const field = formRef.current?.querySelector<HTMLElement>(
      '[aria-invalid="true"], select:invalid, input:invalid, textarea:invalid',
    );
    field?.focus();
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitState === "submitting" || submitState === "success" || submitLockRef.current) {
      return;
    }

    setCustomerNameTouched(true);
    setCustomerEmailTouched(true);
    setValidationMessage(null);
    setErrorMessage("Checkout could not start. Please try again.");

    if (!formValid) {
      const missingBillingFields = getMissingBillingFields(billing);
      const chunks: string[] = [];

      if (!contactValid) {
        chunks.push("a valid full name and email address");
      }

      if (missingBillingFields.length > 0) {
        chunks.push(`billing fields: ${missingBillingFields.join(", ")}`);
      }

      setSubmitState("error");
      setErrorMessage("Please complete all required fields before placing your order.");
      setValidationMessage(`Please complete ${chunks.join(" and ")}.`);
      focusFirstInvalidField();
      return;
    }

    let activeViewer = viewer;
    if (!activeViewer) {
      const refreshedViewer = await fetchCheckoutViewer();
      setViewer(refreshedViewer);
      setViewerLoaded(true);
      if (refreshedViewer) {
        activeViewer = refreshedViewer;
      }
    }

    if (!activeViewer) {
      if (clerkConfigured) {
        signInModalTriggerRef.current?.click();
        return;
      }

      window.location.assign(signInHref);
      return;
    }

    setSubmitState("submitting");
    submitLockRef.current = true;

    if (!idempotencyKeyRef.current) {
      idempotencyKeyRef.current = createCheckoutIdempotencyKey();
    }

    const idempotencyKey = idempotencyKeyRef.current;

    const hasCartItems = activeCartItems.length > 0;

    try {
      const response = await fetch("/api/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-idempotency-key": idempotencyKey,
        },
        body: JSON.stringify({
          customer_name: customerName.trim(),
          customer_email: customerEmail.trim(),
          notes,
          product_slug: hasCartItems ? undefined : product?.slug,
          product_variant_slug: selection?.variantSlug,
          product_tier_name: selection?.tierName,
          fulfillment_type: selection?.fulfillmentType,
          items: hasCartItems ? activeCartItems : undefined,
          payment_method_preference: "invoice",
          applied_coupon_code: appliedCoupon?.code ?? null,
          selected_upsells: Array.from(selectedUpsells),
          billing_address: billing,
          create_account_on_checkout: createAccountOnCheckout,
          idempotency_key: idempotencyKey,
        }),
      });

      const payload = (await response.json().catch(() => null)) as {
        data?: {
          checkout_url?: string | null;
          integration_ready?: boolean;
          order?: CheckoutCreatedOrder;
        };
        error?: { message?: string };
      } | null;

      if (!response.ok) {
        setErrorMessage(payload?.error?.message ?? "Checkout could not start. Please try again.");
        setSubmitState("error");
        submitLockRef.current = false;
        return;
      }

      const resolvedOrder = payload?.data?.order ?? null;

      setSubmitState("success");
      setCreatedOrder(resolvedOrder);
      setConfirmationOpen(true);

      if (hasCartItems) clearCart();
      else if (product?.slug) removeProductItems(product.slug);

      clearDraft();
    } catch {
      setSubmitState("error");
      submitLockRef.current = false;
    }
  };

  if (status === "success") {
    return (
      <div className="space-y-4">
        <CheckoutSteps active="confirmation" hrefOverrides={stepHrefOverrides} />
        <div className="rounded-md border border-success/20 bg-success/5 p-5 text-sm leading-6 text-text-muted">
          Order confirmed successfully. {selectedTierLabel ? `Tier: ${selectedTierLabel}. ` : ""}
          {orderId ? `Order reference: ${orderId}. ` : ""}Our team will contact you with fulfillment updates.
        </div>
      </div>
    );
  }

  if (status === "cancelled") {
    return (
      <div className="space-y-4">
        <CheckoutSteps active="information" hrefOverrides={stepHrefOverrides} />
        <div className="rounded-md border border-border bg-surface p-5 text-sm leading-6 text-text-muted">
          Checkout was cancelled before order placement.{" "}
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
          id="checkout-order-form"
          ref={formRef}
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
                  {clerkConfigured ? (
                    <>
                      <SignInButton mode="modal" forceRedirectUrl={checkoutReturnUrl}>
                        <button type="button" className="font-medium text-primary hover:underline">
                          Sign in
                        </button>
                      </SignInButton>
                      <span>{" "}or{" "}</span>
                      <SignUpButton mode="modal" forceRedirectUrl={checkoutReturnUrl}>
                        <button type="button" className="font-medium text-primary hover:underline">
                          Sign up
                        </button>
                      </SignUpButton>
                    </>
                  ) : (
                    <a href={signInHref} className="font-medium text-primary hover:underline">
                      Sign in
                    </a>
                  )}
                </p>
              ) : null}
            </header>

            {!viewer && clerkConfigured ? (
              <SignInButton mode="modal" forceRedirectUrl={checkoutReturnUrl}>
                <button
                  ref={signInModalTriggerRef}
                  type="button"
                  className="sr-only"
                  tabIndex={-1}
                  aria-hidden
                >
                  Open sign in dialog
                </button>
              </SignInButton>
            ) : null}

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

          <section aria-labelledby="checkout-details-heading" className="space-y-4">
            <header>
              <h2
                id="checkout-details-heading"
                className="flex items-baseline gap-2 font-display text-lg tracking-tight"
              >
                <span className="text-text-muted">2.</span>
                Order details
              </h2>
            </header>

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
              <span>
                {summarySubtotalCents > 0
                  ? "Order totals are locked at submission and confirmed by email."
                  : "Done-For-You orders are submitted without payment. We will confirm final pricing after discovery."}
              </span>
              {summarySubtotalCents > 0 ? (
                <DiscountCodeField
                  applied={appliedCoupon}
                  onApply={(coupon) => setAppliedCoupon(coupon)}
                  onClear={() => setAppliedCoupon(null)}
                  subtotalCents={summarySubtotalCents}
                  userEmail={customerEmail || viewer?.email}
                />
              ) : null}
            </div>

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

            <div className="flex items-stretch justify-end gap-3">
              <Button
                type="submit"
                size="lg"
                disabled={submitState === "submitting" || submitState === "success"}
                className="w-full sm:w-auto lg:hidden"
              >
                {submitState === "submitting" ? "Placing order..." : "Place order"}
              </Button>
            </div>

            {validationMessage ? (
              <p className="text-xs text-destructive" role="alert">
                {validationMessage}
              </p>
            ) : null}
          </section>

          {activeCartItems.length > 0 ? (
            <Card variant="inset" className="p-4">
              <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                Cart summary
              </p>
              <ul className="mt-2 space-y-2 text-sm text-text-muted">
                {activeCartItems.map((item) => {
                  const quoteItem = isQuoteBasedCommerceItem({
                    fulfillmentType: item.fulfillment_type,
                    variantSlug: item.variant_slug,
                    tierName: item.tier_name,
                  });
                  return (
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
                      {quoteItem
                        ? "Quoted after discovery"
                        : formatUsdFromCents(item.unit_price_cents * item.quantity)}
                    </span>
                  </li>
                  );
                })}
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

        <Card variant="inset" className="mt-4 hidden p-4 lg:block">
          <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
            Ready to submit?
          </p>
          <p className="mt-2 text-sm text-text-muted">
            No upfront payment is required. Place your order now and we will follow up with fulfillment.
          </p>
          <Button
            type="submit"
            form="checkout-order-form"
            size="lg"
            disabled={submitState === "submitting" || submitState === "success"}
            className="mt-4 w-full"
          >
            {submitState === "submitting" ? "Placing order..." : "Place order"}
          </Button>

          {validationMessage ? (
            <p className="mt-2 text-xs text-destructive" role="alert">
              {validationMessage}
            </p>
          ) : null}

        </Card>
      </aside>

      <Dialog
        open={confirmationOpen}
        onClose={() => undefined}
        className="relative z-70"
      >
        <div className="fixed inset-0 bg-black/60" aria-hidden />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-md border border-border bg-surface p-5 shadow-(--shadow-3)">
            <Dialog.Title className="font-display text-lg text-text">Order placed</Dialog.Title>
            <p className="mt-2 text-sm text-text-muted">
              {createdOrder?.order_number
                ? `Order ${createdOrder.order_number} has been placed. Our team will follow up with fulfillment details.`
                : "Your order has been placed. Our team will follow up with fulfillment details."}
            </p>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <LinkButton href="/dashboard" fullWidth>
                Dashboard
              </LinkButton>
              <LinkButton
                href={createdOrder?.id ? `/dashboard/orders/${encodeURIComponent(createdOrder.id)}` : "/dashboard/orders"}
                variant="outline"
                fullWidth
              >
                View order
              </LinkButton>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
