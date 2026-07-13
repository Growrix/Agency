"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";

type OrderRecord = {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  payment_status: string;
  fulfillment_status: string;
  total_cents: number;
  currency: string;
  created_at: string;
};

type OrdersEnvelope = {
  data?: OrderRecord[];
  error?: {
    message?: string;
  };
};

const FULFILLMENT_FILTERS = [
  { value: "", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "fulfilled", label: "Fulfilled" },
] as const;

const PAYMENT_FILTERS = [
  { value: "", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "succeeded", label: "Succeeded" },
  { value: "failed", label: "Failed" },
  { value: "refunded", label: "Refunded" },
] as const;

function formatDateTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

function formatAmount(totalCents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    maximumFractionDigits: 2,
  }).format(totalCents / 100);
}

function toAdminFulfillmentState(status: string): "pending" | "fulfilled" {
  return status === "delivered" || status === "archived" ? "fulfilled" : "pending";
}

export function AdminOrdersClient() {
  const [query, setQuery] = useState("");
  const [fulfillment, setFulfillment] = useState("");
  const [payment, setPayment] = useState("");
  const [items, setItems] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [busyOrderId, setBusyOrderId] = useState<string | null>(null);
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);

    const url = new URL("/api/v1/admin/orders", window.location.origin);
    if (query.trim()) url.searchParams.set("q", query.trim());
    if (fulfillment) url.searchParams.set("fulfillment", fulfillment);
    if (payment) url.searchParams.set("payment", payment);
    url.searchParams.set("limit", "250");

    try {
      const response = await fetch(url.toString(), { credentials: "same-origin" });
      const payload = (await response.json().catch(() => null)) as OrdersEnvelope | null;
      if (!response.ok || !payload?.data) {
        throw new Error(payload?.error?.message ?? "Unable to load orders.");
      }

      setItems(payload.data);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to load orders.");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [fulfillment, payment, query]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchOrders();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchOrders]);

  const counts = useMemo(() => {
    let pending = 0;
    let fulfilled = 0;

    for (const item of items) {
      if (toAdminFulfillmentState(item.fulfillment_status) === "fulfilled") {
        fulfilled += 1;
      } else {
        pending += 1;
      }
    }

    return { pending, fulfilled };
  }, [items]);

  async function patchOrderStatus(orderId: string, status: "pending" | "delivered") {
    setBusyOrderId(orderId);
    setFeedback(null);
    setError(null);

    try {
      const response = await fetch(`/api/v1/admin/submissions/order/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ status }),
      });
      const payload = (await response.json().catch(() => null)) as {
        error?: { message?: string };
      } | null;
      if (!response.ok) {
        throw new Error(payload?.error?.message ?? "Unable to update order status.");
      }

      setFeedback(`Order moved to ${status === "pending" ? "pending" : "fulfilled"}.`);
      await fetchOrders();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to update order status.");
    } finally {
      setBusyOrderId(null);
    }
  }

  async function addInternalNote(orderId: string) {
    const noteBody = noteDrafts[orderId]?.trim();
    if (!noteBody) return;

    setBusyOrderId(orderId);
    setFeedback(null);
    setError(null);

    try {
      const response = await fetch(`/api/v1/admin/submissions/order/${orderId}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          body: noteBody,
          customer_visible: false,
          email_customer: false,
        }),
      });
      const payload = (await response.json().catch(() => null)) as {
        error?: { message?: string };
      } | null;

      if (!response.ok) {
        throw new Error(payload?.error?.message ?? "Unable to add note.");
      }

      setNoteDrafts((prev) => ({ ...prev, [orderId]: "" }));
      setFeedback("Internal note saved.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to add note.");
    } finally {
      setBusyOrderId(null);
    }
  }

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-4 py-12">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Admin</p>
          <h1 className="mt-1 font-display text-3xl tracking-tight">Orders</h1>
          <p className="mt-2 text-sm text-text-muted">
            Track all orders, search and filter quickly, mark fulfillment state, and capture internal notes.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-text-muted">
          <span>{items.length} loaded</span>
          <span>·</span>
          <span>{counts.pending} pending</span>
          <span>·</span>
          <span>{counts.fulfilled} fulfilled</span>
        </div>
      </header>

      <Card>
        <div className="grid gap-3 p-4 md:grid-cols-[minmax(0,1fr)_180px_180px_auto] md:items-end">
          <label className="block text-sm">
            <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Search</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="signal-input mt-1"
              placeholder="Order number, customer, email, product"
            />
          </label>

          <label className="block text-sm">
            <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Fulfillment</span>
            <select
              value={fulfillment}
              onChange={(event) => setFulfillment(event.target.value)}
              className="signal-input mt-1"
            >
              {FULFILLMENT_FILTERS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm">
            <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Payment</span>
            <select
              value={payment}
              onChange={(event) => setPayment(event.target.value)}
              className="signal-input mt-1"
            >
              {PAYMENT_FILTERS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <Button type="button" variant="outline" size="sm" onClick={() => void fetchOrders()}>
            Refresh
          </Button>
        </div>
      </Card>

      {error ? (
        <Card>
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        </Card>
      ) : null}

      {feedback ? (
        <Card>
          <p className="text-sm text-primary">{feedback}</p>
        </Card>
      ) : null}

      <div className="space-y-3">
        {loading ? (
          <Card>
            <p className="text-sm text-text-muted">Loading orders...</p>
          </Card>
        ) : items.length === 0 ? (
          <Card>
            <p className="text-sm text-text-muted">No orders match these filters.</p>
          </Card>
        ) : (
          items.map((order) => {
            const adminState = toAdminFulfillmentState(order.fulfillment_status);
            const noteValue = noteDrafts[order.id] ?? "";
            const isBusy = busyOrderId === order.id;

            return (
              <Card key={order.id} className="space-y-3 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">
                      {order.order_number}
                    </p>
                    <p className="mt-1 text-base font-semibold text-text">{order.customer_name || order.customer_email}</p>
                    <p className="text-sm text-text-muted">{order.customer_email}</p>
                    <p className="mt-1 text-xs text-text-muted">Created {formatDateTime(order.created_at)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl tracking-tight text-text">
                      {formatAmount(order.total_cents, order.currency || "USD")}
                    </p>
                    <p className="mt-1 text-xs text-text-muted">Payment: {order.payment_status}</p>
                    <p className="text-xs text-text-muted">Fulfillment: {order.fulfillment_status}</p>
                    <span
                      className={`mt-2 inline-flex rounded-sm px-2 py-0.5 text-[11px] font-medium ${
                        adminState === "fulfilled"
                          ? "bg-success/15 text-success"
                          : "bg-warning/15 text-warning"
                      }`}
                    >
                      {adminState}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant={adminState === "pending" ? "primary" : "outline"}
                    disabled={isBusy}
                    onClick={() => void patchOrderStatus(order.id, "pending")}
                  >
                    Mark pending
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant={adminState === "fulfilled" ? "primary" : "outline"}
                    disabled={isBusy}
                    onClick={() => void patchOrderStatus(order.id, "delivered")}
                  >
                    Mark fulfilled
                  </Button>
                  <LinkButton href={`/admin/submissions/order/${order.id}`} variant="ghost" size="sm">
                    Open full details
                  </LinkButton>
                </div>

                <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
                  <label className="block text-sm">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Add internal note</span>
                    <textarea
                      rows={2}
                      value={noteValue}
                      onChange={(event) =>
                        setNoteDrafts((prev) => ({
                          ...prev,
                          [order.id]: event.target.value,
                        }))
                      }
                      className="signal-input mt-1 min-h-20"
                      placeholder="Order operations note"
                    />
                  </label>
                  <Button
                    type="button"
                    size="sm"
                    disabled={isBusy || noteValue.trim().length === 0}
                    onClick={() => void addInternalNote(order.id)}
                  >
                    Save note
                  </Button>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </main>
  );
}
