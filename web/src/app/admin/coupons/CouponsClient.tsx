"use client";

import { Dialog } from "@headlessui/react";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { PencilSquareIcon, PlusIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { cn } from "@/lib/utils";

type CouponItem = {
  id: string;
  code: string;
  description?: string;
  discount_type: "percent";
  discount_value: number;
  min_subtotal_cents?: number;
  max_uses?: number;
  times_used: number;
  per_user_limit?: number;
  expires_at?: string;
  active: boolean;
  created_at: string;
  updated_at: string;
};

type FormState = {
  code: string;
  description: string;
  discount_value: string;
  min_subtotal_dollars: string;
  max_uses: string;
  per_user_limit: string;
  expires_at: string;
  active: boolean;
};

const EMPTY_FORM: FormState = {
  code: "",
  description: "",
  discount_value: "10",
  min_subtotal_dollars: "",
  max_uses: "",
  per_user_limit: "",
  expires_at: "",
  active: true,
};

const ACTIVE_FILTERS = [
  { value: "", label: "All" },
  { value: "true", label: "Active" },
  { value: "false", label: "Inactive" },
];

function formatDateTime(value: string | undefined) {
  if (!value) return "—";
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleString();
}

function formatMoney(cents: number | undefined) {
  if (typeof cents !== "number" || cents <= 0) return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

function toIsoOrUndefined(value: string): string | undefined {
  if (!value.trim()) return undefined;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed.toISOString();
}

export function CouponsClient() {
  const [items, setItems] = useState<CouponItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const [activeFilter, setActiveFilter] = useState("");
  const [query, setQuery] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  const fetchList = useCallback(async () => {
    setLoading(true);
    setError(null);
    const url = new URL("/api/v1/admin/coupons", window.location.origin);
    if (activeFilter) url.searchParams.set("active", activeFilter);
    if (query.trim()) url.searchParams.set("q", query.trim());

    try {
      const response = await fetch(url.toString(), { credentials: "same-origin" });
      const payload = (await response.json().catch(() => null)) as
        | { data?: { items: CouponItem[]; total: number }; error?: { message?: string } }
        | null;
      if (!response.ok || !payload?.data) {
        throw new Error(payload?.error?.message ?? "Unable to load coupons.");
      }
      setItems(payload.data.items);
      setTotal(payload.data.total);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to load coupons.");
    } finally {
      setLoading(false);
    }
  }, [activeFilter, query]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchList();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchList]);

  function openCreate() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  }

  function openEdit(item: CouponItem) {
    setEditingId(item.id);
    setForm({
      code: item.code,
      description: item.description ?? "",
      discount_value: String(item.discount_value),
      min_subtotal_dollars:
        typeof item.min_subtotal_cents === "number" && item.min_subtotal_cents > 0
          ? (item.min_subtotal_cents / 100).toFixed(2)
          : "",
      max_uses: typeof item.max_uses === "number" ? String(item.max_uses) : "",
      per_user_limit:
        typeof item.per_user_limit === "number" ? String(item.per_user_limit) : "",
      expires_at: item.expires_at ? item.expires_at.slice(0, 16) : "",
      active: item.active,
    });
    setModalOpen(true);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setNotice(null);

    const parsedDiscount = Number(form.discount_value);
    if (!Number.isFinite(parsedDiscount) || parsedDiscount < 1 || parsedDiscount > 100) {
      setError("Discount value must be between 1 and 100.");
      setSubmitting(false);
      return;
    }

    const minSubtotalDollars = Number(form.min_subtotal_dollars);
    const minSubtotalCents = Number.isFinite(minSubtotalDollars) && minSubtotalDollars > 0
      ? Math.round(minSubtotalDollars * 100)
      : undefined;
    const maxUses = form.max_uses.trim() ? Number(form.max_uses) : undefined;
    const perUserLimit = form.per_user_limit.trim() ? Number(form.per_user_limit) : undefined;

    const payload = {
      code: form.code.trim(),
      description: form.description.trim() || undefined,
      discount_type: "percent" as const,
      discount_value: Math.floor(parsedDiscount),
      min_subtotal_cents: minSubtotalCents,
      max_uses: maxUses,
      per_user_limit: perUserLimit,
      expires_at: toIsoOrUndefined(form.expires_at),
      active: form.active,
    };

    try {
      const url = editingId
        ? `/api/v1/admin/coupons/${editingId}`
        : "/api/v1/admin/coupons";
      const method = editingId ? "PATCH" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(payload),
      });
      const responseBody = (await response.json().catch(() => null)) as
        | { data?: CouponItem; error?: { message?: string } }
        | null;
      if (!response.ok || !responseBody?.data) {
        throw new Error(responseBody?.error?.message ?? "Unable to save coupon.");
      }

      setModalOpen(false);
      setNotice(editingId ? "Coupon updated." : "Coupon created.");
      await fetchList();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to save coupon.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeactivate(id: string, code: string) {
    if (!window.confirm(`Deactivate coupon ${code}?`)) return;
    setError(null);
    try {
      const response = await fetch(`/api/v1/admin/coupons/${id}`, {
        method: "DELETE",
        credentials: "same-origin",
      });
      const payload = (await response.json().catch(() => null)) as
        | { data?: CouponItem; error?: { message?: string } }
        | null;
      if (!response.ok) {
        throw new Error(payload?.error?.message ?? "Unable to deactivate coupon.");
      }
      setNotice(`Coupon ${code} deactivated.`);
      await fetchList();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to deactivate coupon.");
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Admin</p>
          <h1 className="mt-1 font-display text-3xl tracking-tight">Coupons</h1>
          <p className="mt-2 max-w-2xl text-sm text-text-muted">
            Percent-only discount codes. Codes are matched case-insensitively at checkout. Deactivating
            a coupon prevents new use immediately without deleting the record.
          </p>
        </div>
        <Button type="button" size="sm" onClick={openCreate}>
          <PlusIcon className="size-4" />
          New coupon
        </Button>
      </header>

      <Card>
        <div className="flex flex-wrap items-center gap-3 border-b border-border/55 px-4 py-3">
          <div className="flex items-center gap-2">
            <label className="text-xs text-text-muted" htmlFor="coupons-active">
              Status
            </label>
            <select
              id="coupons-active"
              value={activeFilter}
              onChange={(event) => setActiveFilter(event.target.value)}
              className="rounded-sm border border-border bg-surface px-2 py-1.5 text-sm"
            >
              {ACTIVE_FILTERS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-1 items-center gap-2 min-w-60">
            <label className="text-xs text-text-muted" htmlFor="coupons-query">
              Search
            </label>
            <input
              id="coupons-query"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="code or description"
              className="flex-1 rounded-sm border border-border bg-surface px-2 py-1.5 text-sm"
            />
          </div>
          <Button type="button" variant="outline" size="sm" onClick={() => void fetchList()}>
            Refresh
          </Button>
          <p className="text-xs text-text-muted">{total} coupons</p>
        </div>

        {error ? (
          <p role="alert" className="px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        ) : null}
        {notice ? <p className="px-4 py-3 text-sm text-success">{notice}</p> : null}

        {loading ? (
          <p className="px-4 py-6 text-sm text-text-muted">Loading…</p>
        ) : items.length === 0 ? (
          <p className="px-4 py-6 text-sm text-text-muted">No coupons match the current filters.</p>
        ) : (
          <ul className="divide-y divide-border/40">
            {items.map((item) => (
              <li key={item.id} className="flex flex-wrap items-start justify-between gap-3 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-semibold text-text">{item.code}</span>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
                        item.active ? "bg-success/15 text-success" : "bg-inset/50 text-text-muted",
                      )}
                    >
                      {item.active ? "active" : "inactive"}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-primary/15 px-2 py-0.5 text-[11px] font-medium text-primary">
                      {item.discount_value}% off
                    </span>
                  </div>
                  {item.description ? (
                    <p className="mt-1 text-sm text-text-muted">{item.description}</p>
                  ) : null}
                  <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-text-muted sm:grid-cols-4">
                    <span>
                      Min subtotal: <span className="text-text">{formatMoney(item.min_subtotal_cents)}</span>
                    </span>
                    <span>
                      Uses:{" "}
                      <span className="text-text">
                        {item.times_used}
                        {typeof item.max_uses === "number" ? ` / ${item.max_uses}` : ""}
                      </span>
                    </span>
                    <span>
                      Per user:{" "}
                      <span className="text-text">
                        {typeof item.per_user_limit === "number" ? item.per_user_limit : "—"}
                      </span>
                    </span>
                    <span>
                      Expires: <span className="text-text">{formatDateTime(item.expires_at)}</span>
                    </span>
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => openEdit(item)}
                    aria-label={`Edit ${item.code}`}
                  >
                    <PencilSquareIcon className="size-4" />
                    Edit
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => void handleDeactivate(item.id, item.code)}
                    disabled={!item.active}
                    aria-label={`Deactivate ${item.code}`}
                  >
                    <TrashIcon className="size-4" />
                    Deactivate
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-overlay/60" aria-hidden />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-lg rounded-md border border-border bg-surface p-5 shadow-(--shadow-3)">
            <div className="flex items-center justify-between gap-3">
              <Dialog.Title className="font-display text-lg">
                {editingId ? "Edit coupon" : "New coupon"}
              </Dialog.Title>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="inline-flex size-7 items-center justify-center rounded-full text-text-muted hover:bg-inset hover:text-text"
                aria-label="Close"
              >
                <XMarkIcon className="size-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                  Code *
                </span>
                <input
                  className="signal-input mt-1"
                  value={form.code}
                  onChange={(event) => setForm({ ...form, code: event.target.value.toUpperCase() })}
                  required
                  disabled={Boolean(editingId)}
                  placeholder="WELCOME10"
                />
                {editingId ? (
                  <p className="mt-1 text-[11px] text-text-muted">Code cannot be changed once created.</p>
                ) : null}
              </label>

              <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                  Description
                </span>
                <input
                  className="signal-input mt-1"
                  value={form.description}
                  onChange={(event) => setForm({ ...form, description: event.target.value })}
                  placeholder="Launch discount"
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                    Discount % *
                  </span>
                  <input
                    className="signal-input mt-1"
                    type="number"
                    min={1}
                    max={100}
                    step={1}
                    value={form.discount_value}
                    onChange={(event) => setForm({ ...form, discount_value: event.target.value })}
                    required
                  />
                </label>
                <label className="block">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                    Min subtotal (USD)
                  </span>
                  <input
                    className="signal-input mt-1"
                    type="number"
                    min={0}
                    step={0.01}
                    value={form.min_subtotal_dollars}
                    onChange={(event) => setForm({ ...form, min_subtotal_dollars: event.target.value })}
                    placeholder="Optional"
                  />
                </label>
                <label className="block">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                    Max uses (total)
                  </span>
                  <input
                    className="signal-input mt-1"
                    type="number"
                    min={0}
                    step={1}
                    value={form.max_uses}
                    onChange={(event) => setForm({ ...form, max_uses: event.target.value })}
                    placeholder="Optional"
                  />
                </label>
                <label className="block">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                    Per-user limit
                  </span>
                  <input
                    className="signal-input mt-1"
                    type="number"
                    min={0}
                    step={1}
                    value={form.per_user_limit}
                    onChange={(event) => setForm({ ...form, per_user_limit: event.target.value })}
                    placeholder="Optional"
                  />
                </label>
              </div>

              <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                  Expires at
                </span>
                <input
                  className="signal-input mt-1"
                  type="datetime-local"
                  value={form.expires_at}
                  onChange={(event) => setForm({ ...form, expires_at: event.target.value })}
                />
              </label>

              <label className="flex items-center gap-2 text-sm text-text">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(event) => setForm({ ...form, active: event.target.checked })}
                  className="size-4 rounded-sm border-border"
                />
                Active
              </label>

              {error ? <p className="text-sm text-destructive">{error}</p> : null}

              <div className="flex items-center justify-end gap-2 pt-1">
                <Button type="button" variant="ghost" size="sm" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" disabled={submitting}>
                  {submitting ? "Saving…" : editingId ? "Save changes" : "Create coupon"}
                </Button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </main>
  );
}
