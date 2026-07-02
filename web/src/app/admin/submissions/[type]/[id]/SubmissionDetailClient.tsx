"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Button, LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";

type SubmissionNote = {
  id: string;
  submission_type: string;
  submission_id: string;
  author_email?: string;
  author_role: string;
  body: string;
  customer_visible: boolean;
  email_customer: boolean;
  created_at: string;
};

type SubmissionDetail = {
  type: string;
  record: Record<string, unknown> & {
    id?: string;
    visitor_name?: string;
    visitor_email?: string;
    customer_name?: string;
    customer_email?: string;
    email?: string;
    status?: string;
    fulfillment_status?: string;
    assigned_to_user_id?: string;
  };
  notes: SubmissionNote[];
};

type DetailEnvelope = { data: SubmissionDetail; error?: { message?: string } };

function formatDateTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

function getCurrentStatus(detail: SubmissionDetail) {
  if (detail.type === "order") {
    return (detail.record.fulfillment_status as string) ?? "";
  }
  return (detail.record.status as string) ?? "";
}

function getOwnerEmail(detail: SubmissionDetail) {
  const r = detail.record;
  return r.visitor_email || r.customer_email || r.email || "";
}

function getOwnerName(detail: SubmissionDetail) {
  const r = detail.record;
  return r.visitor_name || r.customer_name || r.email || "";
}

function getStatusOptions(type: string): string[] {
  switch (type) {
    case "inquiry":
      return ["new", "read", "responded", "closed", "spam"];
    case "appointment":
      return ["inquiry", "confirmed", "completed", "cancelled", "no_show"];
    case "service_request":
    case "support_thread":
      return ["new", "scoping", "in_progress", "qa_review", "delivered", "cancelled"];
    case "order":
      return ["pending", "intake_pending", "fulfilling", "qa_review", "delivered", "archived"];
    default:
      return [];
  }
}

export function SubmissionDetailClient({ type, id }: { type: string; id: string }) {
  const [detail, setDetail] = useState<SubmissionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [noteBody, setNoteBody] = useState("");
  const [customerVisible, setCustomerVisible] = useState(false);
  const [emailCustomer, setEmailCustomer] = useState(false);
  const [statusValue, setStatusValue] = useState("");
  const [assigneeValue, setAssigneeValue] = useState("");
  const [orderPaymentStatus, setOrderPaymentStatus] = useState("");
  const [orderFulfillmentStatus, setOrderFulfillmentStatus] = useState("");
  const [orderDeliveryUrls, setOrderDeliveryUrls] = useState("");
  const [orderInternalNotes, setOrderInternalNotes] = useState("");
  const [actionState, setActionState] = useState<"idle" | "submitting">("idle");
  const [feedback, setFeedback] = useState<string | null>(null);

  const fetchDetail = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/v1/admin/submissions/${type}/${id}`, {
        credentials: "same-origin",
      });
      const payload = (await response.json().catch(() => null)) as DetailEnvelope | null;
      if (!response.ok || !payload?.data) {
        setError(payload?.error?.message ?? "Unable to load submission.");
        return;
      }
      setDetail(payload.data);
      setStatusValue(getCurrentStatus(payload.data));
      setAssigneeValue((payload.data.record.assigned_to_user_id as string) ?? "");

      if (payload.data.type === "order") {
        const orderRecord = payload.data.record as Record<string, unknown>;
        setOrderPaymentStatus((orderRecord.payment_status as string) ?? "");
        setOrderFulfillmentStatus((orderRecord.fulfillment_status as string) ?? "");
        const deliveryUrls = Array.isArray(orderRecord.delivery_urls)
          ? (orderRecord.delivery_urls as unknown[]).filter((entry): entry is string => typeof entry === "string")
          : [];
        setOrderDeliveryUrls(deliveryUrls.join("\n"));
        setOrderInternalNotes((orderRecord.notes as string) ?? "");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load submission.");
    } finally {
      setLoading(false);
    }
  }, [type, id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchDetail();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchDetail]);

  async function handleNoteSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!noteBody.trim()) return;
    setActionState("submitting");
    setFeedback(null);

    try {
      const response = await fetch(`/api/v1/admin/submissions/${type}/${id}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          body: noteBody,
          customer_visible: customerVisible,
          email_customer: emailCustomer && customerVisible,
        }),
      });
      const payload = (await response.json().catch(() => null)) as { error?: { message?: string } } | null;
      if (!response.ok) {
        setFeedback(payload?.error?.message ?? "Could not add note.");
        return;
      }
      setNoteBody("");
      setCustomerVisible(false);
      setEmailCustomer(false);
      await fetchDetail();
    } finally {
      setActionState("idle");
    }
  }

  async function handlePatch(body: { status?: string; assigned_to_user_id?: string | null }) {
    setActionState("submitting");
    setFeedback(null);
    try {
      const response = await fetch(`/api/v1/admin/submissions/${type}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(body),
      });
      const payload = (await response.json().catch(() => null)) as { error?: { message?: string } } | null;
      if (!response.ok) {
        setFeedback(payload?.error?.message ?? "Update failed.");
        return;
      }
      await fetchDetail();
    } finally {
      setActionState("idle");
    }
  }

  async function handleOrderSave() {
    if (!detail || detail.type !== "order") return;
    const orderId = (detail.record.id as string) ?? id;
    setActionState("submitting");
    setFeedback(null);

    const deliveryUrls = orderDeliveryUrls
      .split("\n")
      .map((entry) => entry.trim())
      .filter(Boolean);

    try {
      const response = await fetch(`/api/v1/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          payment_status: orderPaymentStatus || undefined,
          fulfillment_status: orderFulfillmentStatus || undefined,
          delivery_urls: deliveryUrls,
          notes: orderInternalNotes,
        }),
      });
      const payload = (await response.json().catch(() => null)) as { error?: { message?: string } } | null;
      if (!response.ok) {
        setFeedback(payload?.error?.message ?? "Order update failed.");
        return;
      }
      setFeedback("Order updated.");
      await fetchDetail();
    } finally {
      setActionState("idle");
    }
  }

  async function handleOrderRefund() {
    if (!detail || detail.type !== "order") return;
    const orderId = (detail.record.id as string) ?? id;
    const orderNumber = (detail.record.order_number as string) ?? orderId;
    if (
      !window.confirm(
        `Issue refund for order ${orderNumber}? This calls Stripe's refunds API and cannot be undone.`,
      )
    ) {
      return;
    }
    setActionState("submitting");
    setFeedback(null);
    try {
      const response = await fetch(`/api/v1/admin/orders/${orderId}/refund`, {
        method: "POST",
        credentials: "same-origin",
      });
      const payload = (await response.json().catch(() => null)) as {
        data?: { stripe_refund_id?: string };
        error?: { message?: string };
      } | null;
      if (!response.ok) {
        setFeedback(payload?.error?.message ?? "Refund failed.");
        return;
      }
      setFeedback(
        payload?.data?.stripe_refund_id
          ? `Refund issued (${payload.data.stripe_refund_id}).`
          : "Refund issued.",
      );
      await fetchDetail();
    } finally {
      setActionState("idle");
    }
  }

  const statusOptions = getStatusOptions(type);

  return (
    <div className="space-y-5 p-4 sm:p-5 lg:p-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-text-muted">{type} · {id}</p>
          <h1 className="mt-1 font-display text-2xl tracking-tight">
            {detail ? getOwnerName(detail) : "Submission"}
          </h1>
          {detail ? <p className="text-sm text-text-muted">{getOwnerEmail(detail)}</p> : null}
        </div>
        <LinkButton href="/admin/submissions" variant="outline" size="sm">
          Back to inbox
        </LinkButton>
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

      {detail ? (
        <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <Card>
            <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Source record</p>
            <dl className="mt-3 space-y-2 text-sm">
              {Object.entries(detail.record)
                .filter(([key, value]) => key !== "items" && value !== undefined && value !== null && value !== "")
                .map(([key, value]) => (
                  <div key={key} className="grid grid-cols-[160px_1fr] gap-2">
                    <dt className="text-text-muted">{key}</dt>
                    <dd className="break-words text-text">
                      {typeof value === "object" ? JSON.stringify(value) : String(value)}
                    </dd>
                  </div>
                ))}
            </dl>
          </Card>

          <div className="space-y-4">
            <Card>
              <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Actions</p>
              <div className="mt-3 space-y-3">
                {statusOptions.length > 0 ? (
                  <label className="block text-sm">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Status</span>
                    <div className="mt-1 flex items-center gap-2">
                      <select
                        className="signal-input flex-1"
                        value={statusValue}
                        onChange={(event) => setStatusValue(event.target.value)}
                      >
                        {statusOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <Button
                        type="button"
                        size="sm"
                        disabled={actionState === "submitting" || statusValue === getCurrentStatus(detail)}
                        onClick={() => void handlePatch({ status: statusValue })}
                      >
                        Save
                      </Button>
                    </div>
                  </label>
                ) : null}

                {type !== "newsletter" && type !== "order" ? (
                  <label className="block text-sm">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Assigned to (user id)</span>
                    <div className="mt-1 flex items-center gap-2">
                      <input
                        className="signal-input flex-1"
                        value={assigneeValue}
                        onChange={(event) => setAssigneeValue(event.target.value)}
                        placeholder="(unassigned)"
                      />
                      <Button
                        type="button"
                        size="sm"
                        disabled={actionState === "submitting"}
                        onClick={() =>
                          void handlePatch({
                            assigned_to_user_id: assigneeValue.trim() === "" ? null : assigneeValue.trim(),
                          })
                        }
                      >
                        Save
                      </Button>
                    </div>
                  </label>
                ) : null}
              </div>
            </Card>

            {detail.type === "order" ? (
              <Card>
                <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Order workflow</p>
                <div className="mt-3 space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Payment status</span>
                      <select
                        className="signal-input mt-1"
                        value={orderPaymentStatus}
                        onChange={(event) => setOrderPaymentStatus(event.target.value)}
                      >
                        <option value="">(unchanged)</option>
                        <option value="pending">pending</option>
                        <option value="succeeded">succeeded</option>
                        <option value="failed">failed</option>
                        <option value="refunded">refunded</option>
                      </select>
                    </label>
                    <label className="block">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Fulfillment status</span>
                      <select
                        className="signal-input mt-1"
                        value={orderFulfillmentStatus}
                        onChange={(event) => setOrderFulfillmentStatus(event.target.value)}
                      >
                        <option value="">(unchanged)</option>
                        <option value="pending">pending</option>
                        <option value="intake_pending">intake_pending</option>
                        <option value="fulfilling">fulfilling</option>
                        <option value="qa_review">qa_review</option>
                        <option value="delivered">delivered</option>
                        <option value="archived">archived</option>
                      </select>
                    </label>
                  </div>

                  <label className="block">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                      Delivery URLs (one per line)
                    </span>
                    <textarea
                      className="signal-input mt-1 min-h-20"
                      value={orderDeliveryUrls}
                      onChange={(event) => setOrderDeliveryUrls(event.target.value)}
                      placeholder="https://downloads.example.com/private/template.zip"
                    />
                  </label>

                  <label className="block">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Internal notes</span>
                    <textarea
                      className="signal-input mt-1 min-h-20"
                      value={orderInternalNotes}
                      onChange={(event) => setOrderInternalNotes(event.target.value)}
                      placeholder="Operational context for this order."
                    />
                  </label>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    {orderPaymentStatus === "succeeded" && !(detail.record.refunded_at as string | undefined) ? (
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        disabled={actionState === "submitting"}
                        onClick={() => void handleOrderRefund()}
                      >
                        Issue refund
                      </Button>
                    ) : (detail.record.refunded_at as string | undefined) ? (
                      <p className="text-xs text-text-muted">
                        Refunded on {formatDateTime((detail.record.refunded_at as string) ?? "")}
                      </p>
                    ) : (
                      <span />
                    )}
                    <Button
                      type="button"
                      size="sm"
                      disabled={actionState === "submitting"}
                      onClick={() => void handleOrderSave()}
                    >
                      Save order
                    </Button>
                  </div>
                </div>
              </Card>
            ) : null}

            <Card>
              <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Notes thread</p>
              <ul className="mt-3 space-y-2">
                {detail.notes.map((note) => (
                  <li
                    key={note.id}
                    className="rounded-sm border border-border/60 bg-inset/30 px-3 py-2 text-sm"
                  >
                    <div className="flex items-center justify-between gap-2 text-xs text-text-muted">
                      <span>
                        {note.author_role}
                        {note.author_email ? ` · ${note.author_email}` : ""}
                      </span>
                      <span>{formatDateTime(note.created_at)}</span>
                    </div>
                    <p className="mt-1 whitespace-pre-wrap">{note.body}</p>
                    <div className="mt-1 flex flex-wrap gap-2 text-[11px] text-text-muted">
                      {note.customer_visible ? (
                        <span className="rounded-sm bg-primary/15 px-2 py-0.5 text-primary">customer-visible</span>
                      ) : (
                        <span className="rounded-sm bg-inset/50 px-2 py-0.5">internal</span>
                      )}
                      {note.email_customer ? (
                        <span className="rounded-sm bg-warning/15 px-2 py-0.5 text-warning">emailed</span>
                      ) : null}
                    </div>
                  </li>
                ))}
                {detail.notes.length === 0 ? (
                  <li className="text-sm text-text-muted">No notes yet.</li>
                ) : null}
              </ul>

              <form onSubmit={handleNoteSubmit} className="mt-4 space-y-2">
                <textarea
                  className="signal-input min-h-24"
                  rows={4}
                  value={noteBody}
                  onChange={(event) => setNoteBody(event.target.value)}
                  placeholder="Add a note..."
                  required
                />
                <label className="flex items-center gap-2 text-xs text-text-muted">
                  <input
                    type="checkbox"
                    checked={customerVisible}
                    onChange={(event) => setCustomerVisible(event.target.checked)}
                  />
                  Customer-visible
                </label>
                <label className="flex items-center gap-2 text-xs text-text-muted">
                  <input
                    type="checkbox"
                    checked={emailCustomer}
                    onChange={(event) => setEmailCustomer(event.target.checked)}
                    disabled={!customerVisible}
                  />
                  Email this update to the customer
                </label>
                {feedback ? <p className="text-xs text-destructive">{feedback}</p> : null}
                <Button type="submit" size="sm" disabled={actionState === "submitting" || !noteBody.trim()}>
                  {actionState === "submitting" ? "Saving..." : "Add note"}
                </Button>
              </form>
            </Card>

            <p className="text-xs text-text-muted">
              <Link href="/admin/submissions" className="underline">All submissions</Link>
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
