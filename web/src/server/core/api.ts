import "server-only";

import { NextRequest, NextResponse } from "next/server";

export type ApiErrorCode =
  | "INVALID_REQUEST"
  | "MISSING_REQUIRED_FIELD"
  | "FIELD_VALIDATION_FAILED"
  | "NOT_FOUND"
  | "CONFLICT"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "RATE_LIMIT_EXCEEDED"
  | "SERVICE_UNAVAILABLE"
  | "INTERNAL_ERROR";

export type RequestContext = {
  ip: string;
  requestId: string;
  userAgent: string | null;
};

export class ApiError extends Error {
  readonly code: ApiErrorCode;
  readonly status: number;
  readonly details?: Record<string, unknown>;

  constructor(code: ApiErrorCode, status: number, message: string, details?: Record<string, unknown>) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export function createRequestContext(request: NextRequest | Request): RequestContext {
  const headers = request.headers;
  const forwardedFor = headers.get("x-forwarded-for");
  const realIp = headers.get("x-real-ip");

  return {
    ip: forwardedFor?.split(",")[0]?.trim() || realIp || "127.0.0.1",
    requestId: crypto.randomUUID(),
    userAgent: headers.get("user-agent"),
  };
}

export function successResponse<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(
    {
      success: true,
      data,
      timestamp: new Date().toISOString(),
      request_id: crypto.randomUUID(),
    },
    init
  );
}

export function paginatedResponse<T>(
  data: T[],
  pagination: { total: number; page: number; page_size: number; total_pages: number },
  init?: ResponseInit
) {
  return NextResponse.json(
    {
      success: true,
      data,
      pagination,
      timestamp: new Date().toISOString(),
      request_id: crypto.randomUUID(),
    },
    init
  );
}

export function errorResponse(error: ApiError | Error, init?: ResponseInit) {
  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: error.code,
          message: error.message,
          details: error.details ?? null,
        },
        timestamp: new Date().toISOString(),
        request_id: crypto.randomUUID(),
      },
      { status: error.status, ...init }
    );
  }

  return NextResponse.json(
    {
      success: false,
      error: {
        code: "INTERNAL_ERROR",
        message: error.message || "Unexpected server error.",
        details: null,
      },
      timestamp: new Date().toISOString(),
      request_id: crypto.randomUUID(),
    },
    { status: 500, ...init }
  );
}
