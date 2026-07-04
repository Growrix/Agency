import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAdminUser } from "@/server/auth/guards";
import { deleteReview, moderateReview } from "@/server/domain/reviews";
import type { ProductReviewStatus } from "@/server/data/schema";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ reviewId: string }> };

const ALLOWED_STATUSES: ProductReviewStatus[] = ["pending", "approved", "rejected"];

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const admin = await requireAdminUser(request);
    const { reviewId } = await params;
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const statusValue = typeof body.status === "string" ? (body.status as ProductReviewStatus) : undefined;
    if (!statusValue || !ALLOWED_STATUSES.includes(statusValue)) {
      throw new ApiError("FIELD_VALIDATION_FAILED", 400, "status must be one of pending, approved, rejected.");
    }
    const notes = typeof body.moderator_notes === "string" ? body.moderator_notes : undefined;
    const updated = await moderateReview(reviewId, { status: statusValue, moderator_notes: notes }, admin.email);
    if (!updated) {
      throw new ApiError("NOT_FOUND", 404, "Review not found.");
    }
    return successResponse(updated);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to moderate review."),
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const admin = await requireAdminUser(request);
    const { reviewId } = await params;
    await deleteReview(reviewId, admin.email);
    return successResponse({ id: reviewId, deleted: true });
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to delete review."),
    );
  }
}
