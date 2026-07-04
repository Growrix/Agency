import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { getAuthenticatedUser } from "@/server/auth/guards";
import { createReview, listApprovedReviewsForProduct } from "@/server/domain/reviews";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ productSlug: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { productSlug } = await params;
    const response = await listApprovedReviewsForProduct(productSlug);
    return successResponse(response);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load reviews."),
    );
  }
}

export async function POST(request: NextRequest, { params }: Params) {
  try {
    const { productSlug } = await params;
    const user = await getAuthenticatedUser(request);
    if (!user) {
      throw new ApiError("UNAUTHORIZED", 401, "Sign in to submit a review.");
    }

    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const rating = typeof body.rating === "number" ? body.rating : Number(body.rating);
    const title = typeof body.title === "string" ? body.title : undefined;
    const reviewBody = typeof body.body === "string" ? body.body : "";
    const reviewerName =
      [user.firstName, user.lastName].filter(Boolean).join(" ").trim() || user.email;

    const record = await createReview({
      product_slug: productSlug,
      reviewer_email: user.email,
      reviewer_name: reviewerName,
      rating,
      title,
      body: reviewBody,
      user_id: user.id,
    });

    return successResponse({ review: record });
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to submit review."),
    );
  }
}
