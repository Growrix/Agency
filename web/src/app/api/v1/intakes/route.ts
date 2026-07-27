import { NextRequest } from "next/server";
import { ApiError, createRequestContext, errorResponse, successResponse } from "@/server/core/api";
import { requireAuthenticatedUser } from "@/server/auth/guards";
import { getRuntimeConfig } from "@/server/config/runtime";
import { createClientIntake, parseCreateIntakePayload } from "@/server/domain/intakes";
import { assertNoBotTrap, assertRateLimit } from "@/server/security/rate-limit";

export const dynamic = "force-dynamic";

function parseJsonField(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || !value.trim()) {
    return {};
  }
  try {
    return JSON.parse(value) as unknown;
  } catch {
    return {};
  }
}

export async function POST(request: NextRequest) {
  const context = createRequestContext(request);

  try {
    const user = await requireAuthenticatedUser(request);
    assertRateLimit({
      scope: "client-intake",
      identifier: user.id,
      limit: getRuntimeConfig().abuseProtection.contactLimitPerMinute,
    });

    const contentType = request.headers.get("content-type") ?? "";
    let payload: Record<string, unknown> = {};
    let files: File[] = [];

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      assertNoBotTrap(formData.get("website"));
      payload = {
        business_name: formData.get("business_name"),
        industry: formData.get("industry"),
        target_audience: formData.get("target_audience"),
        brand_voice: formData.get("brand_voice"),
        business_description: formData.get("business_description"),
        goals: parseJsonField(formData.get("goals")),
        competitors: parseJsonField(formData.get("competitors")),
        reference_sites: parseJsonField(formData.get("reference_sites")),
        drive_links: parseJsonField(formData.get("drive_links")),
        budget_range: formData.get("budget_range"),
        timeline: formData.get("timeline"),
        must_have_features: parseJsonField(formData.get("must_have_features")),
        is_free_demo: formData.get("is_free_demo"),
      };
      files = formData.getAll("files").filter((entry): entry is File => entry instanceof File);
    } else {
      const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
      assertNoBotTrap(body.website);
      payload = body;
    }

    const parsed = parseCreateIntakePayload(payload);
    const record = await createClientIntake({
      user,
      ...parsed,
      files,
      requestId: context.requestId,
      ip: context.ip,
    });

    return successResponse({
      intake_id: record.id,
      submission_number: record.submission_number,
      status: record.status,
      is_free_demo: record.is_free_demo,
      project_id: record.project_id ?? null,
    });
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to submit intake."),
    );
  }
}
