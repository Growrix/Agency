import { NextResponse } from "next/server";
import type { ApiEnvelope, ApiError, ApiSuccess, FoundationMode, SurfacePayload } from "@/lib/foundation/types";

const defaultFoundationBaseUrl = "http://localhost:3000";

export function getFoundationBaseUrl() {
  return process.env.FOUNDATION_BASE_URL?.replace(/\/$/, "") ?? defaultFoundationBaseUrl;
}

function createRequestId() {
  return `template-${Date.now().toString(36)}`;
}

export function successEnvelope<T>(data: T): ApiSuccess<T> {
  return {
    ok: true,
    requestId: createRequestId(),
    data,
  };
}

export function errorEnvelope(
  code: string,
  message: string,
  details?: Record<string, unknown>,
): ApiError {
  return {
    ok: false,
    requestId: createRequestId(),
    error: {
      code,
      message,
      details,
    },
  };
}

export async function resolveSurface<T>(
  endpointPath: string,
  fallbackPayload: T,
  init?: RequestInit,
): Promise<SurfacePayload<T>> {
  const foundationBaseUrl = getFoundationBaseUrl();

  try {
    const response = await fetch(`${foundationBaseUrl}${endpointPath}`, {
      cache: "no-store",
      ...init,
    });

    if (!response.ok) {
      return {
        mode: "mock-fallback",
        payload: fallbackPayload,
      };
    }

    const envelope = (await response.json()) as ApiEnvelope<T>;

    if (!envelope.ok) {
      return {
        mode: "mock-fallback",
        payload: fallbackPayload,
      };
    }

    return {
      mode: "attached",
      payload: envelope.data,
    };
  } catch {
    return {
      mode: "mock-fallback",
      payload: fallbackPayload,
    };
  }
}

export async function proxyMutation(
  endpointPath: string,
  fallbackBody: ApiSuccess<unknown> | ApiError,
  fallbackStatus: number,
  init: RequestInit,
) {
  const foundationBaseUrl = getFoundationBaseUrl();

  try {
    const response = await fetch(`${foundationBaseUrl}${endpointPath}`, {
      cache: "no-store",
      ...init,
    });

    const contentType = response.headers.get("content-type") ?? "application/json";
    const responseBody = await response.text();

    return new NextResponse(responseBody, {
      status: response.status,
      headers: {
        "content-type": contentType,
      },
    });
  } catch {
    return NextResponse.json(fallbackBody, {
      status: fallbackStatus,
      headers: {
        "x-template-mode": "mock-fallback",
      },
    });
  }
}

export function responseWithMode<T>(
  mode: FoundationMode,
  payload: T,
  status = 200,
) {
  return NextResponse.json(successEnvelope({ mode, payload }), {
    status,
    headers: {
      "x-template-mode": mode,
    },
  });
}
