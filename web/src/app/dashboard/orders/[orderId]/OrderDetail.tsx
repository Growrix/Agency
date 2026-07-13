"use client";

import { useEffect, useState } from "react";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { QuotePricingPanel } from "@/components/checkout/QuotePricingPanel";
import {
  formatOrderMoneyDisplay,
  isQuoteBasedCommerceItem,
  isQuoteBasedOrder,
} from "@/lib/commerce-pricing";

type OrderItem = {
  product_slug: string;
  product_name: string;
  product_variant_slug?: string;
  product_tier_name?: string;
  fulfillment_type?: string;
  quantity: number;
  unit_price_cents: number;
  total_cents: number;
};

type OrderRecord = {
  id: string;
  order_number: string;
  customer_email: string;
  customer_name?: string;
  customer_phone?: string;
  payment_status: string;
  fulfillment_status: string;
  subtotal_cents: number;
  tax_cents: number;
  discount_cents: number;
  total_cents: number;
  currency: string;
  stripe_checkout_session_id?: string;
  stripe_payment_intent_id?: string;
  items: OrderItem[];
  delivery_urls?: string[];
  notes?: string;
  applied_coupon_code?: string;
  applied_discount_cents?: number;
  invoice_url?: string;
  selected_fulfillment_type?: string;
  selected_variant_slug?: string;
  selected_tier_name?: string;
  created_at: string;
  completed_at?: string;
  refunded_at?: string;
};

const FULFILLMENT_TIMELINE: Array<{ key: string; label: string }> = [
  { key: "pending", label: "Order received" },
  { key: "intake_pending", label: "Intake" },
  { key: "fulfilling", label: "Building" },
  { key: "qa_review", label: "QA review" },
  { key: "delivered", label: "Delivered" },
];

function formatMoney(cents: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format(
      cents / 100,
    );
  } catch {
    return `${(cents / 100).toFixed(2)} ${currency.toUpperCase()}`;
  }
}

function formatDateTime(value: string | undefined) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

function statusBadgeClass(status: string) {
  switch (status) {
    case "succeeded":
    case "delivered":
      return "bg-success/15 text-success";
    case "fulfilling":
    case "qa_review":
    case "intake_pending":
      return "bg-primary/15 text-primary";
    case "pending":
      return "bg-warning/15 text-warning";
    case "failed":
    case "refunded":
    case "archived":
      return "bg-destructive/15 text-destructive";
    default:
      return "bg-inset/40 text-text-muted";
  }
}

export function OrderDetail({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [draftNotes, setDraftNotes] = useState("");
  const [actionState, setActionState] = useState<"idle" | "saving">("idle");
  const [actionMessage, setActionMessage] = useState<{ kind: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(() => {
      void (async () => {
        setLoading(true);
        setError(null);
        setOrder(null);
        setDraftNotes("");

        try {
          const response = await fetch(`/api/v1/me/orders/${orderId}`, { credentials: "same-origin" });
          const payload = (await response.json().catch(() => null)) as
            | { data?: OrderRecord; error?: { message?: string } }
            | null;
          if (cancelled) return;
          if (!response.ok || !payload?.data) {
            setError(payload?.error?.message ?? "Unable to load order.");
            return;
          }
          setOrder(payload.data);
          setDraftNotes(payload.data.notes ?? "");
        } catch (err) {
          if (!cancelled) {
            setError(err instanceof Error ? err.message : "Unable to load order.");
          }
        } finally {
          if (!cancelled) setLoading(false);
        }
      })();
    }, 0);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [orderId]);

  async function updateOrder(body: { notes?: string; cancel?: boolean }, successMessage: string) {
    setActionState("saving");
    setActionMessage(null);

    try {
      const response = await fetch(`/api/v1/me/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(body),
      });

      const payload = (await response.json().catch(() => null)) as
        | { data?: OrderRecord; error?: { message?: string } }
        | null;

      if (!response.ok || !payload?.data) {
        setActionMessage({
          kind: "error",
          text: payload?.error?.message ?? "Order update failed.",
        });
        return;
      }

      setOrder(payload.data);
      setDraftNotes(payload.data.notes ?? "");
      setActionMessage({ kind: "success", text: successMessage });
    } catch {
      setActionMessage({ kind: "error", text: "Order update failed." });
    } finally {
      setActionState("idle");
    }
  }

  const canCancelOrder =
    order !== null && !["delivered", "archived"].includes(order.fulfillment_status);

  function handleSaveNotes() {
    if (!order) {
      return;
    }

    const currentNotes = (order.notes ?? "").trim();
    const nextNotes = draftNotes.trim();
    if (currentNotes === nextNotes) {
      setActionMessage({ kind: "success", text: "No changes to save." });
      return;
    }

    void updateOrder({ notes: draftNotes }, "Order notes updated.");
  }

  function handleCancelOrder() {
    if (!canCancelOrder || !order) {
      return;
    }

    if (!window.confirm(`Cancel order ${order.order_number}?`)) {
      return;
    }

    void updateOrder(
      {
        cancel: true,
        notes: draftNotes,
      },
      "Order cancelled successfully.",
    );
  }

  const timelineIndex = order
    ? FULFILLMENT_TIMELINE.findIndex((step) => step.key === order.fulfillment_status)
    : -1;
  const quoteBasedOrder = order
    ? isQuoteBasedOrder({
        selected_fulfillment_type: order.selected_fulfillment_type,
        selected_variant_slug: order.selected_variant_slug,
        selected_tier_name: order.selected_tier_name,
        items: order.items,
      })
    : false;

  return (
    <div className="space-y-5 p-4 sm:p-5 lg:p-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Order</p>
          <h1 className="mt-1 font-display text-2xl tracking-tight">
            {order ? order.order_number : orderId}
          </h1>
        </div>
        <div className="flex gap-2">
          <LinkButton href="/dashboard/orders" variant="outline" size="sm">
            Back to orders
          </LinkButton>
          <LinkButton href="/dashboard/support" variant="outline" size="sm">
            Contact support
          </LinkButton>
        </div>
      </header>

      {loading ? (
        <Card>
          <p className="text-sm text-text-muted">Loading...</p>
        </Card>
      ) : null}

      {error ? (
        <Card>
          <p className="text-sm text-destructive">{error}</p>
        </Card>
      ) : null}

      {order ? (
        <>
          <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
            <Card>
              <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Items</p>
              <div className="mt-3 overflow-hidden rounded-sm border border-border/60">
                <table className="w-full text-sm">
                  <thead className="bg-inset/30 text-left text-xs uppercase text-text-muted">
                    <tr>
                      <th className="px-3 py-2">Product</th>
                      <th className="px-3 py-2">Qty</th>
                      <th className="px-3 py-2 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {order.items.map((item, index) => {
                      const quoteItem = isQuoteBasedCommerceItem({
                        fulfillmentType: item.fulfillment_type,
                        variantSlug: item.product_variant_slug,
                        tierName: item.product_tier_name,
                      });
                      return (
                      <tr key={`${item.product_slug}-${index}`}>
                        <td className="px-3 py-2">
                          <div className="text-text">{item.product_name}</div>
                          <div className="text-xs text-text-muted">
                            {[item.product_tier_name, item.product_variant_slug, item.fulfillment_type]
                              .filter(Boolean)
                              .join(" · ")}
                          </div>
                        </td>
                        <td className="px-3 py-2">{item.quantity}</td>
                        <td className="px-3 py-2 text-right text-text">
                          {formatOrderMoneyDisplay(
                            item.total_cents,
                            order.currency,
                            quoteItem,
                          )}
                        </td>
                      </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {quoteBasedOrder ? (
                <QuotePricingPanel className="mt-4" compact />
              ) : (
                <dl className="mt-4 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-text-muted">Subtotal</dt>
                    <dd>{formatMoney(order.subtotal_cents, order.currency)}</dd>
                  </div>
                  {order.tax_cents > 0 ? (
                    <div className="flex justify-between">
                      <dt className="text-text-muted">Tax</dt>
                      <dd>{formatMoney(order.tax_cents, order.currency)}</dd>
                    </div>
                  ) : null}
                  {order.discount_cents > 0 ? (
                    <div className="flex justify-between">
                      <dt className="text-text-muted">Discount</dt>
                      <dd>−{formatMoney(order.discount_cents, order.currency)}</dd>
                    </div>
                  ) : null}
                  <div className="flex justify-between font-semibold text-text">
                    <dt>Total</dt>
                    <dd>{formatMoney(order.total_cents, order.currency)}</dd>
                  </div>
                </dl>
              )}
            </Card>

            <div className="space-y-4">
              <Card>
                <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Status</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className={`rounded-sm px-2 py-0.5 ${statusBadgeClass(order.payment_status)}`}>
                    payment · {order.payment_status}
                  </span>
                  <span className={`rounded-sm px-2 py-0.5 ${statusBadgeClass(order.fulfillment_status)}`}>
                    fulfillment · {order.fulfillment_status}
                  </span>
                </div>
                <ol className="mt-4 space-y-2 text-sm">
                  {FULFILLMENT_TIMELINE.map((step, index) => {
                    const reached = timelineIndex >= 0 && index <= timelineIndex;
                    return (
                      <li key={step.key} className="flex items-center gap-2">
                        <span
                          className={`inline-block h-2 w-2 rounded-full ${reached ? "bg-primary" : "bg-border"}`}
                          aria-hidden
                        />
                        <span className={reached ? "text-text" : "text-text-muted"}>{step.label}</span>
                      </li>
                    );
                  })}
                </ol>
                <div className="mt-4 grid gap-1 text-xs text-text-muted">
                  <p>Created: {formatDateTime(order.created_at)}</p>
                  <p>Completed: {formatDateTime(order.completed_at)}</p>
                  {order.refunded_at ? <p>Refunded: {formatDateTime(order.refunded_at)}</p> : null}
                </div>

                <div className="mt-4 space-y-2 border-t border-border/60 pt-4">
                  <label className="block text-sm">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                      Update order notes
                    </span>
                    <textarea
                      rows={3}
                      value={draftNotes}
                      onChange={(event) => setDraftNotes(event.target.value)}
                      className="signal-input mt-1 min-h-24"
                      placeholder="Add instructions or update your request details."
                    />
                  </label>

                  {actionMessage ? (
                    <p
                      className={`text-xs ${
                        actionMessage.kind === "error" ? "text-destructive" : "text-primary"
                      }`}
                    >
                      {actionMessage.text}
                    </p>
                  ) : null}

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      className="inline-flex h-9 items-center rounded-sm border border-border/60 px-3 text-sm text-text hover:border-primary/30"
                      onClick={handleSaveNotes}
                      disabled={actionState === "saving"}
                    >
                      {actionState === "saving" ? "Saving..." : "Save update"}
                    </button>
                    {canCancelOrder ? (
                      <button
                        type="button"
                        className="inline-flex h-9 items-center rounded-sm bg-destructive px-3 text-sm text-surface hover:opacity-90"
                        onClick={handleCancelOrder}
                        disabled={actionState === "saving"}
                      >
                        Cancel order
                      </button>
                    ) : (
                      <span className="text-xs text-text-muted">Cancellation is unavailable for this order status.</span>
                    )}
                  </div>
                </div>
              </Card>

              {order.delivery_urls && order.delivery_urls.length > 0 ? (
                <Card>
                  <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Downloads</p>
                  <ul className="mt-3 space-y-1 text-sm">
                    {order.delivery_urls.map((url, index) => (
                      <li key={`${url}-${index}`}>
                        <a
                          href={url}
                          className="break-all text-primary underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {url}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Card>
              ) : null}

              {order.invoice_url ? (
                <Card>
                  <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Receipt</p>
                  <p className="mt-2 text-sm text-text-muted">
                    Your itemized payment receipt is hosted by Stripe. Download or print it any
                    time for accounting.
                  </p>
                  <a
                    href={order.invoice_url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    View / download receipt →
                  </a>
                </Card>
              ) : null}

              {order.applied_coupon_code ? (
                <Card>
                  <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Discount applied</p>
                  <p className="mt-2 text-sm">
                    <span className="font-mono">{order.applied_coupon_code}</span>
                    {typeof order.applied_discount_cents === "number" && order.applied_discount_cents > 0 ? (
                      <span className="ml-2 text-success">
                        -${(order.applied_discount_cents / 100).toFixed(2)}
                      </span>
                    ) : null}
                  </p>
                </Card>
              ) : null}

              {order.notes ? (
                <Card>
                  <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Order notes</p>
                  <p className="mt-2 whitespace-pre-wrap text-sm text-text-muted">{order.notes}</p>
                </Card>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
