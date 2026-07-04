import "server-only";

import { readDatabase } from "@/server/data/store";
import type { OrderRecord } from "@/server/data/schema";

export type ReportPeriod = "7d" | "30d" | "90d" | "all";

export type RevenueBucket = {
  period: ReportPeriod;
  order_count: number;
  paid_count: number;
  refunded_count: number;
  gross_cents: number;
  refunded_cents: number;
  net_cents: number;
  discount_cents: number;
};

export type OrderStatusCounts = {
  pending: number;
  succeeded: number;
  failed: number;
  refunded: number;
};

export type BestSeller = {
  product_slug: string;
  product_name: string;
  order_count: number;
  quantity: number;
  gross_cents: number;
};

export type CouponUsage = {
  code: string;
  order_count: number;
  discount_cents: number;
};

export type ReportsSummary = {
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

function daysAgo(days: number): Date {
  const cutoff = new Date();
  cutoff.setUTCHours(0, 0, 0, 0);
  cutoff.setUTCDate(cutoff.getUTCDate() - days);
  return cutoff;
}

function inPeriod(order: OrderRecord, period: ReportPeriod): boolean {
  if (period === "all") return true;
  const days = period === "7d" ? 7 : period === "30d" ? 30 : 90;
  const cutoff = daysAgo(days).getTime();
  return new Date(order.created_at).getTime() >= cutoff;
}

function bucketFor(orders: OrderRecord[], period: ReportPeriod): RevenueBucket {
  const filtered = orders.filter((order) => inPeriod(order, period));
  let paid_count = 0;
  let refunded_count = 0;
  let gross_cents = 0;
  let refunded_cents = 0;
  let discount_cents = 0;
  for (const order of filtered) {
    if (order.payment_status === "succeeded") {
      paid_count += 1;
      gross_cents += order.total_cents;
    } else if (order.payment_status === "refunded") {
      refunded_count += 1;
      refunded_cents += order.total_cents;
    }
    discount_cents += order.applied_discount_cents ?? order.discount_cents ?? 0;
  }
  return {
    period,
    order_count: filtered.length,
    paid_count,
    refunded_count,
    gross_cents,
    refunded_cents,
    net_cents: gross_cents - refunded_cents,
    discount_cents,
  };
}

function statusCounts(orders: OrderRecord[]): OrderStatusCounts {
  const counts: OrderStatusCounts = { pending: 0, succeeded: 0, failed: 0, refunded: 0 };
  for (const order of orders) {
    counts[order.payment_status] += 1;
  }
  return counts;
}

function bestSellers(orders: OrderRecord[], limit = 10): BestSeller[] {
  const map = new Map<string, BestSeller>();
  for (const order of orders) {
    if (order.payment_status !== "succeeded") continue;
    for (const item of order.items) {
      const existing = map.get(item.product_slug);
      if (existing) {
        existing.order_count += 1;
        existing.quantity += item.quantity;
        existing.gross_cents += item.total_cents;
      } else {
        map.set(item.product_slug, {
          product_slug: item.product_slug,
          product_name: item.product_name,
          order_count: 1,
          quantity: item.quantity,
          gross_cents: item.total_cents,
        });
      }
    }
  }
  return [...map.values()].sort((a, b) => b.gross_cents - a.gross_cents).slice(0, limit);
}

function couponUsage(orders: OrderRecord[]): CouponUsage[] {
  const map = new Map<string, CouponUsage>();
  for (const order of orders) {
    const code = order.applied_coupon_code;
    if (!code) continue;
    const discount = order.applied_discount_cents ?? order.discount_cents ?? 0;
    const existing = map.get(code);
    if (existing) {
      existing.order_count += 1;
      existing.discount_cents += discount;
    } else {
      map.set(code, { code, order_count: 1, discount_cents: discount });
    }
  }
  return [...map.values()].sort((a, b) => b.order_count - a.order_count);
}

export async function generateReportsSummary(): Promise<ReportsSummary> {
  const database = await readDatabase();
  const orders = database.orders;

  const paidOrders = orders
    .filter((order) => order.payment_status === "succeeded")
    .sort((a, b) => (a.created_at > b.created_at ? -1 : 1))
    .slice(0, 10)
    .map((order) => ({
      id: order.id,
      order_number: order.order_number,
      customer_email: order.customer_email,
      total_cents: order.total_cents,
      created_at: order.created_at,
    }));

  return {
    totals_by_period: [
      bucketFor(orders, "7d"),
      bucketFor(orders, "30d"),
      bucketFor(orders, "90d"),
      bucketFor(orders, "all"),
    ],
    status_counts: statusCounts(orders),
    best_sellers: bestSellers(orders),
    coupon_usage: couponUsage(orders),
    recent_paid_orders: paidOrders,
    generated_at: new Date().toISOString(),
  };
}
