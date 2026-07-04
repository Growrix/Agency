"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/primitives/Card";

type ReportPeriod = "7d" | "30d" | "90d" | "all";

type RevenueBucket = {
  period: ReportPeriod;
  order_count: number;
  paid_count: number;
  refunded_count: number;
  gross_cents: number;
  refunded_cents: number;
  net_cents: number;
  discount_cents: number;
};

type OrderStatusCounts = {
  pending: number;
  succeeded: number;
  failed: number;
  refunded: number;
};

type BestSeller = {
  product_slug: string;
  product_name: string;
  order_count: number;
  quantity: number;
  gross_cents: number;
};

type CouponUsage = {
  code: string;
  order_count: number;
  discount_cents: number;
};

type ReportsSummary = {
  totals_by_period: RevenueBucket[];
  status_counts: OrderStatusCounts;
  best_sellers: BestSeller[];
  coupon_usage: CouponUsage[];
  recent_paid_orders: Array<{
    id: string;
    order_number: string;
    customer_email: string;
    total_cents: number;
    created_at: string;
  }>;
  generated_at: string;
};

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

function money(cents: number) {
  return currency.format(cents / 100);
}

function periodLabel(period: ReportPeriod) {
  switch (period) {
    case "7d":
      return "Last 7 days";
    case "30d":
      return "Last 30 days";
    case "90d":
      return "Last 90 days";
    case "all":
      return "All time";
  }
}

export function ReportsClient() {
  const [summary, setSummary] = useState<ReportsSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const response = await fetch("/api/v1/admin/reports", { credentials: "same-origin" });
        if (!response.ok) throw new Error("Unable to load reports.");
        const payload = (await response.json()) as { data: ReportsSummary };
        if (!cancelled) setSummary(payload.data);
      } catch (loadError) {
        if (!cancelled) setError(loadError instanceof Error ? loadError.message : "Unable to load reports.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">REPORTS</p>
        <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">Business intelligence</h2>
        <p className="mt-1.5 text-sm text-text-muted max-w-2xl">
          Revenue, best-sellers, and coupon usage aggregated from paid orders.
        </p>
      </div>

      {error ? (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {loading ? <p className="text-sm text-text-muted">Loading reports…</p> : null}

      {summary ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {summary.totals_by_period.map((bucket) => (
              <Card key={bucket.period} className="rounded-sm border-border bg-surface p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
                  {periodLabel(bucket.period)}
                </p>
                <p className="mt-3 font-display text-3xl tracking-tight">{money(bucket.net_cents)}</p>
                <div className="mt-3 space-y-1 text-xs text-text-muted">
                  <div className="flex justify-between">
                    <span>Paid orders</span>
                    <span className="font-medium text-text">{bucket.paid_count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Refunded</span>
                    <span className="font-medium text-text">{bucket.refunded_count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gross</span>
                    <span className="font-medium text-text">{money(bucket.gross_cents)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discounts applied</span>
                    <span className="font-medium text-text">{money(bucket.discount_cents)}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            <Card className="rounded-sm border-border p-5">
              <h3 className="font-display text-lg font-semibold tracking-tight">Order status distribution</h3>
              <div className="mt-4 space-y-2 text-sm text-text-muted">
                {(["succeeded", "pending", "failed", "refunded"] as const).map((status) => (
                  <div
                    key={status}
                    className="flex items-center justify-between rounded-md border border-border/50 bg-surface px-3 py-2"
                  >
                    <span className="font-medium text-text capitalize">{status}</span>
                    <span>{summary.status_counts[status]}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="rounded-sm border-border p-5">
              <h3 className="font-display text-lg font-semibold tracking-tight">Coupon usage</h3>
              <div className="mt-4 space-y-2 text-sm text-text-muted">
                {summary.coupon_usage.length === 0 ? (
                  <div className="rounded-md border border-border/50 bg-surface px-3 py-2">No coupons redeemed yet.</div>
                ) : (
                  summary.coupon_usage.map((row) => (
                    <div
                      key={row.code}
                      className="flex items-center justify-between rounded-md border border-border/50 bg-surface px-3 py-2"
                    >
                      <span className="font-medium text-text">{row.code}</span>
                      <span>
                        {row.order_count} order{row.order_count === 1 ? "" : "s"} · {money(row.discount_cents)} off
                      </span>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>

          <Card className="rounded-sm border-border p-5">
            <h3 className="font-display text-lg font-semibold tracking-tight">Best-sellers by revenue</h3>
            <div className="mt-4 overflow-x-auto">
              {summary.best_sellers.length === 0 ? (
                <p className="text-sm text-text-muted">No sales yet.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead className="text-left text-xs uppercase tracking-wider text-text-muted">
                    <tr>
                      <th className="pb-2 pr-4">Product</th>
                      <th className="pb-2 pr-4">Orders</th>
                      <th className="pb-2 pr-4">Units</th>
                      <th className="pb-2">Gross</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {summary.best_sellers.map((row) => (
                      <tr key={row.product_slug}>
                        <td className="py-2 pr-4">
                          <div className="font-medium text-text">{row.product_name}</div>
                          <div className="text-xs text-text-muted">{row.product_slug}</div>
                        </td>
                        <td className="py-2 pr-4 text-text-muted">{row.order_count}</td>
                        <td className="py-2 pr-4 text-text-muted">{row.quantity}</td>
                        <td className="py-2 font-medium text-text">{money(row.gross_cents)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </Card>

          <Card className="rounded-sm border-border p-5">
            <h3 className="font-display text-lg font-semibold tracking-tight">Recent paid orders</h3>
            <div className="mt-4 space-y-2 text-sm text-text-muted">
              {summary.recent_paid_orders.length === 0 ? (
                <div className="rounded-md border border-border/50 bg-surface px-3 py-2">No paid orders yet.</div>
              ) : (
                summary.recent_paid_orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between rounded-md border border-border/50 bg-surface px-3 py-2"
                  >
                    <div>
                      <div className="font-medium text-text">{order.order_number}</div>
                      <div className="text-xs">{order.customer_email}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-text">{money(order.total_cents)}</div>
                      <div className="text-xs">{new Date(order.created_at).toLocaleString()}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          <p className="text-xs text-text-muted">Generated {new Date(summary.generated_at).toLocaleString()}</p>
        </>
      ) : null}
    </div>
  );
}
