import { NextResponse } from "next/server";

import { buildFallbackPreview } from "@/lib/foundation/fallback";
import {
  errorEnvelope,
  getFoundationBaseUrl,
  successEnvelope,
} from "@/lib/foundation/server";
import type { ApiEnvelope, PreviewEnableDto } from "@/lib/foundation/types";

type PreviewPayload = {
  token?: string;
  redirectTo?: string;
};

export async function POST(request: Request) {
  let payload: PreviewPayload;

  try {
    payload = (await request.json()) as PreviewPayload;
  } catch {
    return NextResponse.json(
      errorEnvelope("VALIDATION_ERROR", "Invalid JSON payload."),
      { status: 400 },
    );
  }

  const redirectTo = payload.redirectTo?.trim() || "/preview";
  const token = payload.token?.trim();
  const foundationBaseUrl = getFoundationBaseUrl();

  try {
    const response = await fetch(`${foundationBaseUrl}/api/preview/enable`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ token, redirectTo }),
      cache: "no-store",
    });

    const envelope = (await response.json()) as ApiEnvelope<PreviewEnableDto>;

    return NextResponse.json(envelope, {
      status: response.status,
      headers: {
        "x-template-mode": "attached",
      },
    });
  } catch {
    return NextResponse.json(successEnvelope(buildFallbackPreview(redirectTo)), {
      status: 202,
      headers: {
        "x-template-mode": "mock-fallback",
      },
    });
  }
}
