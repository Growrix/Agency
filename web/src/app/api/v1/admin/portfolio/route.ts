import { NextRequest } from "next/server";
import { ApiError, createRequestContext, errorResponse, successResponse } from "@/server/core/api";
import { requireAdminUser } from "@/server/auth/guards";
import {
  deleteManagedPortfolioProject,
  listManagedPortfolioProjects,
  upsertManagedPortfolioProject,
} from "@/server/domain/catalog";
import { recordAuditLog } from "@/server/logging/observability";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await requireAdminUser(request);
    return successResponse(await listManagedPortfolioProjects());
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load portfolio projects."));
  }
}

export async function POST(request: NextRequest) {
  const context = createRequestContext(request);

  try {
    const admin = await requireAdminUser(request);
    const body = (await request.json()) as Record<string, unknown>;
    const record = await upsertManagedPortfolioProject({
      slug: typeof body.slug === "string" ? body.slug : "",
      name: typeof body.name === "string" ? body.name : "",
      livePreviewUrl: typeof body.livePreviewUrl === "string" ? body.livePreviewUrl : undefined,
      embeddedPreviewUrl: typeof body.embeddedPreviewUrl === "string" ? body.embeddedPreviewUrl : undefined,
      industry: typeof body.industry === "string" ? body.industry : "",
      service: typeof body.service === "string" ? body.service : "",
      summary: typeof body.summary === "string" ? body.summary : "",
      metric: typeof body.metric === "string" ? body.metric : "",
      accent: typeof body.accent === "string" ? body.accent : "from-slate-500 to-slate-700",
      hero_image:
        body.hero_image &&
        typeof body.hero_image === "object" &&
        typeof (body.hero_image as { src?: unknown }).src === "string" &&
        typeof (body.hero_image as { alt?: unknown }).alt === "string"
          ? { src: (body.hero_image as { src: string }).src, alt: (body.hero_image as { alt: string }).alt }
          : null,
      detail:
        body.detail && typeof body.detail === "object"
          ? (body.detail as {
              client: string;
              year: string;
              duration: string;
              team: string;
              challenge: string[];
              strategy: string[];
              build: { label: string; value: string }[];
              results: { value: string; label: string; hint?: string }[];
              gallery: { src: string; alt: string }[];
            })
          : null,
    });

    await recordAuditLog({
      level: "info",
      action: "admin.portfolio_saved",
      request_id: context.requestId,
      ip: context.ip,
      actor_email: admin.email,
      metadata: { project_slug: record.slug },
    });

    return successResponse(record);
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to save portfolio project."));
  }
}

export async function DELETE(request: NextRequest) {
  const context = createRequestContext(request);

  try {
    const admin = await requireAdminUser(request);
    const projectSlug = new URL(request.url).searchParams.get("slug");
    if (!projectSlug) {
      throw new ApiError("MISSING_REQUIRED_FIELD", 400, "Portfolio slug is required.");
    }

    await deleteManagedPortfolioProject(projectSlug);
    await recordAuditLog({
      level: "warning",
      action: "admin.portfolio_deleted",
      request_id: context.requestId,
      ip: context.ip,
      actor_email: admin.email,
      metadata: { project_slug: projectSlug },
    });

    return successResponse({ deleted: true, slug: projectSlug });
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to delete portfolio project."));
  }
}