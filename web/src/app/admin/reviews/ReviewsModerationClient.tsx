"use client";

import { useCallback, useEffect, useState } from "react";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { Button } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";

type ReviewStatus = "pending" | "approved" | "rejected";

type ReviewRecord = {
  id: string;
  product_slug: string;
  reviewer_email: string;
  reviewer_name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title?: string;
  body: string;
  verified_purchase: boolean;
  status: ReviewStatus;
  moderator_notes?: string;
  created_at: string;
};

const FILTERS: Array<{ value: ReviewStatus | "all"; label: string }> = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "all", label: "All" },
];

function StarRow({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rated ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <StarSolid
          key={star}
          className={`size-4 ${star <= value ? "text-primary" : "text-border"}`}
          aria-hidden
        />
      ))}
    </div>
  );
}

export function ReviewsModerationClient() {
  const [reviews, setReviews] = useState<ReviewRecord[]>([]);
  const [filter, setFilter] = useState<ReviewStatus | "all">("pending");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const query = filter === "all" ? "" : `?status=${filter}`;
      const response = await fetch(`/api/v1/admin/reviews${query}`, { credentials: "same-origin" });
      if (!response.ok) throw new Error("Unable to load reviews.");
      const payload = (await response.json()) as { data: ReviewRecord[] };
      setReviews(payload.data);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load reviews.");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    const handle = setTimeout(() => {
      void load();
    }, 0);
    return () => clearTimeout(handle);
  }, [load]);

  const moderate = async (id: string, status: ReviewStatus) => {
    setBusy(id);
    try {
      const response = await fetch(`/api/v1/admin/reviews/${encodeURIComponent(id)}`, {
        method: "PATCH",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error("Moderation failed.");
      await load();
    } catch (moderateError) {
      setError(moderateError instanceof Error ? moderateError.message : "Moderation failed.");
    } finally {
      setBusy(null);
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Delete this review? This action cannot be undone.")) return;
    setBusy(id);
    try {
      const response = await fetch(`/api/v1/admin/reviews/${encodeURIComponent(id)}`, {
        method: "DELETE",
        credentials: "same-origin",
      });
      if (!response.ok) throw new Error("Delete failed.");
      await load();
    } catch (removeError) {
      setError(removeError instanceof Error ? removeError.message : "Delete failed.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="space-y-5 p-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">REVIEWS</p>
        <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">Moderation queue</h2>
        <p className="mt-1.5 text-sm text-text-muted max-w-2xl">
          Approve or reject verified-purchase reviews before they appear on product pages.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((option) => (
          <Button
            key={option.value}
            type="button"
            size="sm"
            variant={filter === option.value ? "primary" : "outline"}
            onClick={() => setFilter(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>

      {error ? (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {loading ? <p className="text-sm text-text-muted">Loading reviews…</p> : null}

      {!loading && reviews.length === 0 ? (
        <Card className="rounded-sm border-border p-6 text-sm text-text-muted">No reviews in this bucket.</Card>
      ) : null}

      <div className="space-y-3">
        {reviews.map((review) => (
          <Card key={review.id} className="rounded-sm border-border p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <StarRow value={review.rating} />
                  <span className="text-xs uppercase tracking-wider text-text-muted">{review.status}</span>
                  {review.verified_purchase ? (
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                      Verified
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-xs text-text-muted">
                  {review.product_slug} · {review.reviewer_email} · {new Date(review.created_at).toLocaleString()}
                </p>
                {review.title ? (
                  <h3 className="mt-2 font-display text-base tracking-tight">{review.title}</h3>
                ) : null}
                <p className="mt-1 whitespace-pre-line text-sm text-text">{review.body}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {review.status !== "approved" ? (
                  <Button
                    type="button"
                    size="sm"
                    variant="primary"
                    disabled={busy === review.id}
                    onClick={() => void moderate(review.id, "approved")}
                  >
                    Approve
                  </Button>
                ) : null}
                {review.status !== "rejected" ? (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={busy === review.id}
                    onClick={() => void moderate(review.id, "rejected")}
                  >
                    Reject
                  </Button>
                ) : null}
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  disabled={busy === review.id}
                  onClick={() => void remove(review.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
