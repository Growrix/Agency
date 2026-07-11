import { NextResponse } from "next/server";

import { buildFallbackContactSubmission } from "@/lib/foundation/fallback";
import {
  errorEnvelope,
  getFoundationBaseUrl,
  successEnvelope,
} from "@/lib/foundation/server";
import type { ApiEnvelope, ContactLeadPayload, FormSubmissionAccepted } from "@/lib/foundation/types";

export async function POST(
  request: Request,
  context: { params: Promise<{ formId: string }> },
) {
  const { formId } = await context.params;

  let payload: ContactLeadPayload;

  try {
    payload = (await request.json()) as ContactLeadPayload;
  } catch {
    return NextResponse.json(
      errorEnvelope("VALIDATION_ERROR", "Invalid JSON payload."),
      {
        status: 400,
      },
    );
  }

  const foundationBaseUrl = getFoundationBaseUrl();

  try {
    const response = await fetch(`${foundationBaseUrl}/api/forms/${formId}/submit`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const envelope = (await response.json()) as ApiEnvelope<FormSubmissionAccepted>;

    if (!envelope.ok) {
      return NextResponse.json(envelope, {
        status: response.status,
        headers: {
          "x-template-mode": "attached",
        },
      });
    }

    return NextResponse.json(envelope, {
      status: response.status,
      headers: {
        "x-template-mode": "attached",
      },
    });
  } catch {
    const fallbackSubmission = buildFallbackContactSubmission(formId, payload);

    return NextResponse.json(successEnvelope(fallbackSubmission), {
      status: 202,
      headers: {
        "x-template-mode": "mock-fallback",
      },
    });
  }
}
