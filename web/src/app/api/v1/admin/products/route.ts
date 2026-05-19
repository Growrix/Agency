import { NextRequest } from "next/server";
import { ApiError, createRequestContext, errorResponse, successResponse } from "@/server/core/api";
import { requireAdminUser } from "@/server/auth/guards";
import { deleteManagedProduct, listManagedProducts, upsertManagedProduct } from "@/server/domain/catalog";
import { recordAuditLog } from "@/server/logging/observability";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await requireAdminUser(request);
    return successResponse(await listManagedProducts());
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load products."));
  }
}

export async function POST(request: NextRequest) {
  const context = createRequestContext(request);

  try {
    const admin = await requireAdminUser(request);
    const body = (await request.json()) as Record<string, unknown>;
    const record = await upsertManagedProduct({
      slug: typeof body.slug === "string" ? body.slug : "",
      name: typeof body.name === "string" ? body.name : "",
      price: typeof body.price === "string" ? body.price : "$0",
      livePreviewUrl: typeof body.livePreviewUrl === "string" ? body.livePreviewUrl : undefined,
      embeddedPreviewUrl: typeof body.embeddedPreviewUrl === "string" ? body.embeddedPreviewUrl : undefined,
      category: typeof body.category === "string" ? body.category : "Templates",
      categorySlug: typeof body.categorySlug === "string" ? body.categorySlug : "templates",
      type: typeof body.type === "string" ? body.type : "Marketing Site",
      typeSlug: typeof body.typeSlug === "string" ? body.typeSlug : "marketing-site",
      industry: typeof body.industry === "string" ? body.industry : "General",
      industrySlug: typeof body.industrySlug === "string" ? body.industrySlug : "general",
      tag: typeof body.tag === "string" ? body.tag : undefined,
      published: typeof body.published === "boolean" ? body.published : true,
      rating: typeof body.rating === "number" ? body.rating : undefined,
      reviewCount: typeof body.reviewCount === "string" ? body.reviewCount : undefined,
      salesCount: typeof body.salesCount === "string" ? body.salesCount : undefined,
      teaser: typeof body.teaser === "string" ? body.teaser : "",
      summary: typeof body.summary === "string" ? body.summary : "",
      audience: typeof body.audience === "string" ? body.audience : "",
      previewVariant:
        body.previewVariant === "mcp" ||
        body.previewVariant === "marketing" ||
        body.previewVariant === "dashboard" ||
        body.previewVariant === "automation" ||
        body.previewVariant === "mobile" ||
        body.previewVariant === "booking"
          ? body.previewVariant
          : "marketing",
      includes: Array.isArray(body.includes) ? body.includes.filter((item): item is string => typeof item === "string") : [],
      stack: Array.isArray(body.stack) ? body.stack.filter((item): item is string => typeof item === "string") : [],
      highlights: Array.isArray(body.highlights)
        ? body.highlights.filter(
            (item): item is { label: string; value: string } =>
              Boolean(item) && typeof item === "object" && typeof item.label === "string" && typeof item.value === "string"
          )
        : [],
      image:
        body.image &&
        typeof body.image === "object" &&
        typeof (body.image as { src?: unknown }).src === "string" &&
        typeof (body.image as { alt?: unknown }).alt === "string"
          ? { src: (body.image as { src: string }).src, alt: (body.image as { alt: string }).alt }
          : null,
    });

    await recordAuditLog({
      level: "info",
      action: "admin.product_saved",
      request_id: context.requestId,
      ip: context.ip,
      actor_email: admin.email,
      metadata: { product_slug: record.slug },
    });

    return successResponse(record);
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to save product."));
  }
}

export async function DELETE(request: NextRequest) {
  const context = createRequestContext(request);

  try {
    const admin = await requireAdminUser(request);
    const productSlug = new URL(request.url).searchParams.get("slug");
    if (!productSlug) {
      throw new ApiError("MISSING_REQUIRED_FIELD", 400, "Product slug is required.");
    }

    await deleteManagedProduct(productSlug);
    await recordAuditLog({
      level: "warning",
      action: "admin.product_deleted",
      request_id: context.requestId,
      ip: context.ip,
      actor_email: admin.email,
      metadata: { product_slug: productSlug },
    });

    return successResponse({ deleted: true, slug: productSlug });
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to delete product."));
  }
}