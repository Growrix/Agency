import "server-only";

import { createHash } from "node:crypto";
import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { ApiError } from "@/server/core/api";
import { getRuntimeConfig, requireRuntimeValue } from "@/server/config/runtime";
import type { DownloadRecord, LicenseRecord, OrderRecord } from "@/server/data/schema";
import { readDatabase, writeDatabase } from "@/server/data/store";
import { recordAuditLog } from "@/server/logging/observability";

const DOWNLOAD_GRANT_TTL_SECONDS = 15 * 60;

type DownloadGrantPayload = JWTPayload & {
  sub: string;
  email: string;
  admin: boolean;
};

type DownloadRequestContext = {
  ip?: string | null;
  userAgent?: string | null;
  grantId?: string | null;
};

function hashAuditValue(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  return createHash("sha256").update(value).digest("hex");
}

function getDownloadGrantSecret() {
  const secret = requireRuntimeValue(getRuntimeConfig().auth.jwtSecret, "AUTH_JWT_SECRET");
  return new TextEncoder().encode(secret);
}

async function issueDownloadGrantToken(downloadId: string, userEmail: string, allowAdmin: boolean) {
  return new SignJWT({ email: userEmail.toLowerCase(), admin: allowAdmin })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${DOWNLOAD_GRANT_TTL_SECONDS}s`)
    .setJti(crypto.randomUUID())
    .setSubject(downloadId)
    .sign(getDownloadGrantSecret());
}

export async function verifyDownloadGrantToken(token: string) {
  const verified = await jwtVerify(token, getDownloadGrantSecret());
  return verified.payload as DownloadGrantPayload;
}

function getNow() {
  return new Date().toISOString();
}

function deriveFileLabel(assetPath: string) {
  try {
    const resolved = new URL(assetPath, "https://growrixos.local");
    const lastSegment = resolved.pathname.split("/").filter(Boolean).pop();
    return lastSegment ? decodeURIComponent(lastSegment) : "download";
  } catch {
    return "download";
  }
}

function buildLicenseKey(order: OrderRecord) {
  const orderToken = order.order_number.replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(-12);
  const randomToken = crypto.randomUUID().replace(/-/g, "").toUpperCase().slice(0, 12);
  return `GRX-${orderToken}-${randomToken}`;
}

function deriveLicenseType(order: OrderRecord): LicenseRecord["license_type"] {
  const fulfillmentType = order.selected_fulfillment_type;
  if (fulfillmentType === "done_for_you_service" || fulfillmentType === "done-for-you") {
    return "agency";
  }

  if (fulfillmentType === "hybrid_support") {
    return "team";
  }

  return "single_site";
}

function normalizeAssetPath(assetPath: string) {
  const trimmed = assetPath.trim();
  if (!trimmed) {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, "Delivery URL cannot be empty.");
  }

  return trimmed;
}

export async function syncOrderEntitlements(order: OrderRecord) {
  const now = getNow();
  const issuedDownloads: DownloadRecord[] = [];
  let issuedLicense: LicenseRecord | null = null;

  await writeDatabase((next) => {
    const nextDownloads = [...next.downloads];
    const nextLicenses = [...next.licenses];

    if (order.payment_status === "succeeded") {
      const existingLicense = nextLicenses.find((entry) => entry.order_id === order.id);
      if (!existingLicense) {
        issuedLicense = {
          id: crypto.randomUUID(),
          order_id: order.id,
          user_email: order.customer_email,
          product_slug: order.items[0]?.product_slug ?? "unknown-product",
          variant_slug: order.selected_variant_slug,
          license_key: buildLicenseKey(order),
          license_type: deriveLicenseType(order),
          status: "active",
          issued_at: now,
        };
        nextLicenses.unshift(issuedLicense);
      }
    }

    if (order.payment_status === "succeeded" && order.fulfillment_status === "delivered") {
      for (const rawAssetPath of order.delivery_urls) {
        const assetPath = normalizeAssetPath(rawAssetPath);
        const existingDownload = nextDownloads.find(
          (entry) => entry.order_id === order.id && entry.asset_path === assetPath,
        );

        if (existingDownload) {
          continue;
        }

        const downloadRecord: DownloadRecord = {
          id: crypto.randomUUID(),
          order_id: order.id,
          user_email: order.customer_email,
          product_slug: order.items[0]?.product_slug ?? "unknown-product",
          variant_slug: order.selected_variant_slug,
          asset_path: assetPath,
          file_label: deriveFileLabel(assetPath),
          max_downloads: 10,
          download_count: 0,
          status: "issued",
          created_at: now,
        };

        issuedDownloads.push(downloadRecord);
        nextDownloads.unshift(downloadRecord);
      }
    }

    return {
      ...next,
      downloads: nextDownloads,
      licenses: nextLicenses,
    };
  });

  return {
    downloads: issuedDownloads,
    license: issuedLicense,
  };
}

export async function listDownloadsByEmail(email: string) {
  const database = await readDatabase();
  return database.downloads.filter((entry) => entry.user_email === email.toLowerCase());
}

export async function listDownloadsByOrderId(orderId: string) {
  const database = await readDatabase();
  return database.downloads.filter((entry) => entry.order_id === orderId);
}

export async function listLicensesByEmail(email: string) {
  const database = await readDatabase();
  return database.licenses.filter((entry) => entry.user_email === email.toLowerCase());
}

export async function getDownloadById(downloadId: string) {
  const database = await readDatabase();
  return database.downloads.find((entry) => entry.id === downloadId) ?? null;
}

export async function createAuthorizedDownloadUrl(
  downloadId: string,
  userEmail: string,
  appBaseUrl: string,
  allowAdmin = false,
  requestContext?: DownloadRequestContext,
) {
  const now = Date.now();
  const normalizedEmail = userEmail.toLowerCase();
  const database = await readDatabase();
  const download = database.downloads.find((entry) => entry.id === downloadId) ?? null;

  if (!download) {
    throw new ApiError("NOT_FOUND", 404, "Download not found.");
  }

  if (!allowAdmin && download.user_email !== normalizedEmail) {
    throw new ApiError("FORBIDDEN", 403, "You do not have access to this download.");
  }

  if (download.status !== "issued") {
    throw new ApiError("CONFLICT", 409, "This download is no longer available.");
  }

  if (download.expires_at && new Date(download.expires_at).getTime() <= now) {
    throw new ApiError("CONFLICT", 409, "This download link has expired.");
  }

  if (download.download_count >= download.max_downloads) {
    throw new ApiError("CONFLICT", 409, "Download limit reached for this file.");
  }

  const grantToken = await issueDownloadGrantToken(downloadId, userEmail, allowAdmin);
  const base = new URL(appBaseUrl);
  const deliveryUrl = new URL(`/api/v1/downloads/${encodeURIComponent(downloadId)}/deliver`, base);
  deliveryUrl.searchParams.set("grant", grantToken);

  await recordAuditLog({
    level: "info",
    action: "download.grant_issued",
    actor_email: normalizedEmail,
    metadata: {
      download_id: download.id,
      order_id: download.order_id,
      product_slug: download.product_slug,
      admin_grant: allowAdmin,
      expires_in_seconds: DOWNLOAD_GRANT_TTL_SECONDS,
      request_ip_hash: hashAuditValue(requestContext?.ip),
      request_user_agent_hash: hashAuditValue(requestContext?.userAgent),
    },
  }).catch(() => undefined);

  return {
    download,
    download_url: deliveryUrl.toString(),
    expires_in_seconds: DOWNLOAD_GRANT_TTL_SECONDS,
  };
}

export async function consumeAuthorizedDownload(
  downloadId: string,
  userEmail: string,
  allowAdmin = false,
  requestContext?: DownloadRequestContext,
) {
  const now = new Date();
  const normalizedEmail = userEmail.toLowerCase();

  await writeDatabase((next) => ({
    ...next,
    downloads: next.downloads.map((entry) => {
      if (entry.id !== downloadId) {
        return entry;
      }

      if (!allowAdmin && entry.user_email !== normalizedEmail) {
        throw new ApiError("FORBIDDEN", 403, "You do not have access to this download.");
      }

      if (entry.status !== "issued") {
        throw new ApiError("CONFLICT", 409, "This download is no longer available.");
      }

      if (entry.expires_at && new Date(entry.expires_at).getTime() <= now.getTime()) {
        throw new ApiError("CONFLICT", 409, "This download link has expired.");
      }

      if (entry.download_count >= entry.max_downloads) {
        throw new ApiError("CONFLICT", 409, "Download limit reached for this file.");
      }

      const updatedDownload: DownloadRecord = {
        ...entry,
        download_count: entry.download_count + 1,
        last_downloaded_at: now.toISOString(),
      };

      return updatedDownload;
    }),
  }));

  const database = await readDatabase();
  const consumedDownload = database.downloads.find((entry) => entry.id === downloadId) ?? null;

  if (!consumedDownload) {
    throw new ApiError("NOT_FOUND", 404, "Download not found.");
  }

  await recordAuditLog({
    level: "info",
    action: "download.grant_redeemed",
    actor_email: normalizedEmail,
    metadata: {
      download_id: consumedDownload.id,
      order_id: consumedDownload.order_id,
      product_slug: consumedDownload.product_slug,
      admin_grant: allowAdmin,
      download_count: consumedDownload.download_count,
      max_downloads: consumedDownload.max_downloads,
      grant_id: requestContext?.grantId ?? null,
      request_ip_hash: hashAuditValue(requestContext?.ip),
      request_user_agent_hash: hashAuditValue(requestContext?.userAgent),
    },
  }).catch(() => undefined);

  return {
    download: consumedDownload,
    asset_url: consumedDownload.asset_path,
  };
}