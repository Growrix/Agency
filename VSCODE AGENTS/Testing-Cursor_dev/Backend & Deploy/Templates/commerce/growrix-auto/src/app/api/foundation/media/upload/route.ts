import { NextResponse } from "next/server";

import { buildFallbackUploadIntent } from "@/lib/foundation/fallback";
import {
  errorEnvelope,
  getFoundationBaseUrl,
  successEnvelope,
} from "@/lib/foundation/server";
import type { ApiEnvelope, UploadIntentDto } from "@/lib/foundation/types";

type UploadPayload = {
  filename?: string;
  contentType?: string;
};

export async function POST(request: Request) {
  let payload: UploadPayload;

  try {
    payload = (await request.json()) as UploadPayload;
  } catch {
    return NextResponse.json(
      errorEnvelope("VALIDATION_ERROR", "Invalid JSON payload."),
      { status: 400 },
    );
  }

  const filename = payload.filename?.trim();
  const contentType = payload.contentType?.trim();

  if (!filename || !contentType) {
    return NextResponse.json(
      errorEnvelope("VALIDATION_ERROR", "filename and contentType are required."),
      { status: 400 },
    );
  }

  const foundationBaseUrl = getFoundationBaseUrl();

  try {
    const response = await fetch(`${foundationBaseUrl}/api/media/upload`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ filename, contentType }),
      cache: "no-store",
    });

    const envelope = (await response.json()) as ApiEnvelope<UploadIntentDto>;

    return NextResponse.json(envelope, {
      status: response.status,
      headers: {
        "x-template-mode": "attached",
      },
    });
  } catch {
    return NextResponse.json(
      successEnvelope(buildFallbackUploadIntent(filename, contentType)),
      {
        status: 503,
        headers: {
          "x-template-mode": "mock-fallback",
        },
      },
    );
  }
}
