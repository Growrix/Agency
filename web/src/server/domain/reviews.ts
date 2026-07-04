import "server-only";

import { ApiError } from "@/server/core/api";
import type { ProductReviewRecord, ProductReviewStatus } from "@/server/data/schema";
import { readDatabase, writeDatabase } from "@/server/data/store";
import { recordAuditLog } from "@/server/logging/observability";

const MAX_REVIEW_BODY_LENGTH = 4_000;
const MAX_REVIEW_TITLE_LENGTH = 140;

export type CreateReviewInput = {
  product_slug: string;
  reviewer_email: string;
  reviewer_name: string;
  rating: number;
  title?: string;
  body: string;
  user_id?: string;
};

export type ReviewsSummary = {
  count: number;
  average_rating: number;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
};

export type PublicReviewsResponse = {
  reviews: Array<
    Pick<
      ProductReviewRecord,
      "id" | "product_slug" | "reviewer_name" | "rating" | "title" | "body" | "verified_purchase" | "created_at"
    >
  >;
  summary: ReviewsSummary;
};

function now() {
  return new Date().toISOString();
}

function ensureRating(value: number): 1 | 2 | 3 | 4 | 5 {
  if (!Number.isFinite(value)) {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, "Rating must be a number between 1 and 5.");
  }
  const rounded = Math.round(value);
  if (rounded < 1 || rounded > 5) {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, "Rating must be between 1 and 5.");
  }
  return rounded as 1 | 2 | 3 | 4 | 5;
}

function trim(value: string) {
  return value.trim();
}

function summarize(records: ProductReviewRecord[]): ReviewsSummary {
  const distribution: ReviewsSummary["distribution"] = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let total = 0;
  for (const record of records) {
    distribution[record.rating] += 1;
    total += record.rating;
  }
  const count = records.length;
  const average_rating = count > 0 ? Math.round((total / count) * 10) / 10 : 0;
  return { count, average_rating, distribution };
}

export async function listApprovedReviewsForProduct(productSlug: string): Promise<PublicReviewsResponse> {
  const database = await readDatabase();
  const approved = database.product_reviews
    .filter((review) => review.product_slug === productSlug && review.status === "approved")
    .sort((a, b) => (a.created_at > b.created_at ? -1 : 1));

  return {
    reviews: approved.map((review) => ({
      id: review.id,
      product_slug: review.product_slug,
      reviewer_name: review.reviewer_name,
      rating: review.rating,
      title: review.title,
      body: review.body,
      verified_purchase: review.verified_purchase,
      created_at: review.created_at,
    })),
    summary: summarize(approved),
  };
}

export async function listAllReviews(status?: ProductReviewStatus): Promise<ProductReviewRecord[]> {
  const database = await readDatabase();
  const filtered = status
    ? database.product_reviews.filter((review) => review.status === status)
    : database.product_reviews;
  return [...filtered].sort((a, b) => (a.created_at > b.created_at ? -1 : 1));
}

async function isVerifiedPurchase(reviewerEmail: string, productSlug: string): Promise<{ verified: boolean; orderId?: string }> {
  const database = await readDatabase();
  const email = reviewerEmail.trim().toLowerCase();
  const match = database.orders.find(
    (order) =>
      order.customer_email.trim().toLowerCase() === email &&
      order.payment_status === "succeeded" &&
      order.items.some((item) => item.product_slug === productSlug),
  );
  return match ? { verified: true, orderId: match.id } : { verified: false };
}

export async function createReview(input: CreateReviewInput): Promise<ProductReviewRecord> {
  const rating = ensureRating(input.rating);
  const productSlug = trim(input.product_slug);
  const reviewerEmail = trim(input.reviewer_email);
  const reviewerName = trim(input.reviewer_name);
  const body = trim(input.body);
  const title = input.title ? trim(input.title) : undefined;

  if (!productSlug) throw new ApiError("MISSING_REQUIRED_FIELD", 400, "product_slug is required.");
  if (!reviewerEmail) throw new ApiError("MISSING_REQUIRED_FIELD", 400, "reviewer_email is required.");
  if (!reviewerName) throw new ApiError("MISSING_REQUIRED_FIELD", 400, "reviewer_name is required.");
  if (!body) throw new ApiError("MISSING_REQUIRED_FIELD", 400, "body is required.");
  if (body.length > MAX_REVIEW_BODY_LENGTH) {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, `body cannot exceed ${MAX_REVIEW_BODY_LENGTH} characters.`);
  }
  if (title && title.length > MAX_REVIEW_TITLE_LENGTH) {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, `title cannot exceed ${MAX_REVIEW_TITLE_LENGTH} characters.`);
  }

  const verification = await isVerifiedPurchase(reviewerEmail, productSlug);
  if (!verification.verified) {
    throw new ApiError(
      "FORBIDDEN",
      403,
      "Only verified purchasers can leave a review for this product.",
    );
  }

  const database = await readDatabase();
  const duplicate = database.product_reviews.find(
    (review) =>
      review.product_slug === productSlug &&
      review.reviewer_email.trim().toLowerCase() === reviewerEmail.toLowerCase(),
  );
  if (duplicate) {
    throw new ApiError("CONFLICT", 409, "You have already reviewed this product.");
  }

  const record: ProductReviewRecord = {
    id: crypto.randomUUID(),
    product_slug: productSlug,
    order_id: verification.orderId,
    user_id: input.user_id,
    reviewer_email: reviewerEmail,
    reviewer_name: reviewerName,
    rating,
    title,
    body,
    verified_purchase: true,
    status: "pending",
    created_at: now(),
    updated_at: now(),
  };

  await writeDatabase((next) => ({
    ...next,
    product_reviews: [record, ...next.product_reviews],
  }));

  await recordAuditLog({
    level: "info",
    action: "review.submitted",
    actor_email: reviewerEmail,
    metadata: { product_slug: productSlug, rating },
  });

  return record;
}

export async function moderateReview(
  reviewId: string,
  patch: { status: ProductReviewStatus; moderator_notes?: string },
  actorEmail: string,
): Promise<ProductReviewRecord | null> {
  let touched = false;

  await writeDatabase((next) => ({
    ...next,
    product_reviews: next.product_reviews.map((review) => {
      if (review.id !== reviewId) return review;
      touched = true;
      return {
        ...review,
        status: patch.status,
        moderator_notes: patch.moderator_notes?.trim() || review.moderator_notes,
        updated_at: now(),
      };
    }),
  }));

  if (!touched) return null;

  const database = await readDatabase();
  const updated = database.product_reviews.find((review) => review.id === reviewId) ?? null;

  if (updated) {
    await recordAuditLog({
      level: "info",
      action: `review.${patch.status}`,
      actor_email: actorEmail,
      metadata: { review_id: reviewId, product_slug: updated.product_slug },
    });
  }

  return updated;
}

export async function deleteReview(reviewId: string, actorEmail: string): Promise<void> {
  await writeDatabase((next) => ({
    ...next,
    product_reviews: next.product_reviews.filter((review) => review.id !== reviewId),
  }));

  await recordAuditLog({
    level: "info",
    action: "review.deleted",
    actor_email: actorEmail,
    metadata: { review_id: reviewId },
  });
}
