"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { CheckBadgeIcon, StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { Button } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";

type ReviewsSummary = {
  count: number;
  average_rating: number;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
};

type PublicReview = {
  id: string;
  reviewer_name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title?: string;
  body: string;
  verified_purchase: boolean;
  created_at: string;
};

type ReviewsResponse = {
  reviews: PublicReview[];
  summary: ReviewsSummary;
};

type ProductReviewsProps = {
  productSlug: string;
};

function StarRow({ value, size = 4 }: { value: number; size?: number }) {
  const sizeClass = `size-${size}`;
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rated ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const Icon = star <= value ? StarSolid : StarOutline;
        return <Icon key={star} className={`${sizeClass} text-primary`} aria-hidden />;
      })}
    </div>
  );
}

function StarInput({ value, onChange }: { value: number; onChange: (next: number) => void }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const active = star <= value;
        const Icon = active ? StarSolid : StarOutline;
        return (
          <button
            key={star}
            type="button"
            aria-label={`Rate ${star} star${star === 1 ? "" : "s"}`}
            className="rounded p-1 text-primary hover:bg-primary/10"
            onClick={() => onChange(star)}
          >
            <Icon className="size-6" />
          </button>
        );
      })}
    </div>
  );
}

async function fetchReviews(productSlug: string): Promise<ReviewsResponse> {
  const response = await fetch(
    `/api/v1/shop/products/${encodeURIComponent(productSlug)}/reviews`,
    { credentials: "same-origin" },
  );
  if (!response.ok) throw new Error("Unable to load reviews.");
  const payload = (await response.json()) as { data: ReviewsResponse };
  return payload.data;
}

export function ProductReviews({ productSlug }: ProductReviewsProps) {
  const [data, setData] = useState<ReviewsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const value = await fetchReviews(productSlug);
        if (!cancelled) setData(value);
      } catch (loadError) {
        if (!cancelled) setError(loadError instanceof Error ? loadError.message : "Unable to load reviews.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [productSlug]);

  const summary = data?.summary;
  const reviews = data?.reviews ?? [];

  const barWidths = useMemo(() => {
    if (!summary || summary.count === 0) {
      return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as Record<1 | 2 | 3 | 4 | 5, number>;
    }
    return {
      1: Math.round((summary.distribution[1] / summary.count) * 100),
      2: Math.round((summary.distribution[2] / summary.count) * 100),
      3: Math.round((summary.distribution[3] / summary.count) * 100),
      4: Math.round((summary.distribution[4] / summary.count) * 100),
      5: Math.round((summary.distribution[5] / summary.count) * 100),
    } as Record<1 | 2 | 3 | 4 | 5, number>;
  }, [summary]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setNotice(null);
    setSubmitting(true);
    try {
      const response = await fetch(
        `/api/v1/shop/products/${encodeURIComponent(productSlug)}/reviews`,
        {
          method: "POST",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rating, title, body }),
        },
      );

      if (response.status === 401) {
        window.location.assign(`/sign-in?redirect=/digital-products/${encodeURIComponent(productSlug)}`);
        return;
      }

      const payload = (await response.json().catch(() => null)) as { error?: { message?: string } } | null;
      if (!response.ok) {
        throw new Error(payload?.error?.message ?? "Unable to submit review.");
      }

      setNotice("Thanks — your review is awaiting moderation.");
      setRating(5);
      setTitle("");
      setBody("");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-semibold tracking-tight">Customer reviews</h2>
        {summary ? (
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <StarRow value={Math.round(summary.average_rating)} size={5} />
            <div className="text-sm text-text-muted">
              <span className="font-semibold text-text">{summary.average_rating.toFixed(1)}</span>
              {" out of 5 · "}
              {summary.count} review{summary.count === 1 ? "" : "s"}
            </div>
          </div>
        ) : (
          <p className="mt-2 text-sm text-text-muted">Loading reviews…</p>
        )}
      </div>

      {summary && summary.count > 0 ? (
        <div className="space-y-1">
          {([5, 4, 3, 2, 1] as const).map((star) => (
            <div key={star} className="flex items-center gap-3 text-xs text-text-muted">
              <span className="w-4 text-right">{star}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-inset/50">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${barWidths[star]}%` }}
                  aria-hidden
                />
              </div>
              <span className="w-8 text-right">{summary.distribution[star]}</span>
            </div>
          ))}
        </div>
      ) : null}

      {error ? (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {reviews.length === 0 ? (
        <Card className="rounded-sm border-border/60 p-5 text-sm text-text-muted">
          No reviews yet. Verified purchasers can leave the first one.
        </Card>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <Card key={review.id} className="rounded-sm border-border/60 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <StarRow value={review.rating} />
                    {review.verified_purchase ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                        <CheckBadgeIcon className="size-3" aria-hidden />
                        Verified
                      </span>
                    ) : null}
                  </div>
                  {review.title ? (
                    <h3 className="mt-2 font-display text-base tracking-tight">{review.title}</h3>
                  ) : null}
                  <p className="mt-1 text-sm text-text-muted">
                    by {review.reviewer_name} · {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-text">{review.body}</p>
            </Card>
          ))}
        </div>
      )}

      <Card className="rounded-sm border-border/60 p-5">
        <h3 className="font-display text-lg tracking-tight">Write a review</h3>
        <p className="mt-1 text-sm text-text-muted">
          You must be signed in and have purchased this product to review it.
        </p>

        {notice ? (
          <div className="mt-3 rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary">
            {notice}
          </div>
        ) : null}

        <form className="mt-4 space-y-3" onSubmit={submit}>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-text-muted">Rating</label>
            <div className="mt-1">
              <StarInput value={rating} onChange={setRating} />
            </div>
          </div>
          <div>
            <label htmlFor="review-title" className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Title (optional)
            </label>
            <input
              id="review-title"
              type="text"
              value={title}
              maxLength={140}
              onChange={(event) => setTitle(event.target.value)}
              className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary/60"
            />
          </div>
          <div>
            <label htmlFor="review-body" className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Your review
            </label>
            <textarea
              id="review-body"
              value={body}
              maxLength={4000}
              rows={4}
              required
              onChange={(event) => setBody(event.target.value)}
              className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary/60"
            />
          </div>
          <Button type="submit" disabled={submitting || body.trim().length === 0}>
            {submitting ? "Submitting…" : "Submit review"}
          </Button>
        </form>
      </Card>
    </section>
  );
}
