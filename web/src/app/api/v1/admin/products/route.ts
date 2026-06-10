import { NextRequest } from "next/server";
import { ApiError, createRequestContext, errorResponse, successResponse } from "@/server/core/api";
import { requireAdminUser } from "@/server/auth/guards";
import { deleteManagedProduct, listManagedProducts, upsertManagedProduct } from "@/server/domain/catalog";
import { recordAuditLog } from "@/server/logging/observability";

export const dynamic = "force-dynamic";

function asProductValidationError(error: unknown) {
  if (!(error instanceof Error)) {
    return null;
  }

  if (error.message.startsWith("INVALID_PRODUCT_SLUG_FORMAT:")) {
    return new ApiError("FIELD_VALIDATION_FAILED", 400, error.message.replace("INVALID_PRODUCT_SLUG_FORMAT:", "").trim());
  }

  if (error.message.startsWith("RESERVED_PRODUCT_SLUG:")) {
    return new ApiError("FIELD_VALIDATION_FAILED", 400, error.message.replace("RESERVED_PRODUCT_SLUG:", "").trim());
  }

  if (error.message.startsWith("DUPLICATE_PRODUCT_SLUG:")) {
    return new ApiError("CONFLICT", 409, error.message.replace("DUPLICATE_PRODUCT_SLUG:", "").trim());
  }

  return null;
}

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
      category: typeof body.category === "string" ? body.category : "HTML Templates",
      categorySlug: typeof body.categorySlug === "string" ? body.categorySlug : "html-templates",
      type: typeof body.type === "string" ? body.type : "Email Templates",
      typeSlug: typeof body.typeSlug === "string" ? body.typeSlug : "email-templates",
      industry: typeof body.industry === "string" ? body.industry : "Digital Products",
      industrySlug: typeof body.industrySlug === "string" ? body.industrySlug : "digital-products",
      tag: typeof body.tag === "string" ? body.tag : undefined,
      published: typeof body.published === "boolean" ? body.published : true,
      rating: typeof body.rating === "number" ? body.rating : undefined,
      reviewCount: typeof body.reviewCount === "string" ? body.reviewCount : undefined,
      salesCount: typeof body.salesCount === "string" ? body.salesCount : undefined,
      teaser: typeof body.teaser === "string" ? body.teaser : "",
      summary: typeof body.summary === "string" ? body.summary : "",
      audience: typeof body.audience === "string" ? body.audience : "",
      features: Array.isArray(body.features) ? body.features.filter((item): item is string => typeof item === "string") : undefined,
      variants: Array.isArray(body.variants)
        ? body.variants
            .filter(
              (item): item is {
                slug: string;
                tier_name: "Standard" | "Premium" | "Done-For-You";
                title: string;
                price: string;
                fulfillment_type: "digital_download" | "hybrid_support" | "done_for_you_service";
                includes: string[];
                comparison_points?: string[];
                recommended?: boolean;
              } =>
                Boolean(item) &&
                typeof item === "object" &&
                typeof item.slug === "string" &&
                (item.tier_name === "Standard" || item.tier_name === "Premium" || item.tier_name === "Done-For-You") &&
                typeof item.title === "string" &&
                typeof item.price === "string" &&
                (item.fulfillment_type === "digital_download" ||
                  item.fulfillment_type === "hybrid_support" ||
                  item.fulfillment_type === "done_for_you_service") &&
                Array.isArray(item.includes) &&
                item.includes.every((entry: unknown) => typeof entry === "string") &&
                (!Array.isArray(item.comparison_points) ||
                  item.comparison_points.every((entry: unknown) => typeof entry === "string")) &&
                (typeof item.recommended === "boolean" || typeof item.recommended === "undefined"),
            )
            .map((variant) => ({
              ...variant,
              includes: variant.includes.filter(Boolean),
              comparison_points: variant.comparison_points?.filter(Boolean),
            }))
        : undefined,
      faqs: Array.isArray(body.faqs)
        ? body.faqs
            .filter(
              (item): item is { question: string; answer: string } =>
                Boolean(item) && typeof item === "object" && typeof item.question === "string" && typeof item.answer === "string",
            )
            .map((faq) => ({ question: faq.question, answer: faq.answer }))
        : undefined,
      related_product_slugs: Array.isArray(body.related_product_slugs)
        ? body.related_product_slugs.filter((item): item is string => typeof item === "string")
        : undefined,
      related_service_slugs: Array.isArray(body.related_service_slugs)
        ? body.related_service_slugs.filter((item): item is string => typeof item === "string")
        : undefined,
      customization_upsells: Array.isArray(body.customization_upsells)
        ? body.customization_upsells
            .filter(
              (item): item is { title: string; description: string; cta_label: string; cta_href: string } =>
                Boolean(item) &&
                typeof item === "object" &&
                typeof item.title === "string" &&
                typeof item.description === "string" &&
                typeof item.cta_label === "string" &&
                typeof item.cta_href === "string",
            )
            .map((upsell) => ({
              title: upsell.title,
              description: upsell.description,
              cta_label: upsell.cta_label,
              cta_href: upsell.cta_href,
            }))
        : undefined,
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
      inScope: Array.isArray(body.inScope) ? body.inScope.filter((item): item is string => typeof item === "string") : undefined,
      outOfScope: Array.isArray(body.outOfScope) ? body.outOfScope.filter((item): item is string => typeof item === "string") : undefined,
      enhancementPlan: Array.isArray(body.enhancementPlan)
        ? body.enhancementPlan.filter((item): item is string => typeof item === "string")
        : undefined,
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
      gallery: Array.isArray(body.gallery)
        ? body.gallery.filter(
            (item): item is { src: string; alt: string } =>
              Boolean(item) && typeof item === "object" && typeof item.src === "string" && typeof item.alt === "string",
          )
        : undefined,
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
    const validationError = asProductValidationError(error);
    if (validationError) {
      return errorResponse(validationError);
    }

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