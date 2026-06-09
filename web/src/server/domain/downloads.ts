import "server-only";

import { ApiError } from "@/server/core/api";
import type { DownloadRecord, LicenseRecord, OrderRecord } from "@/server/data/schema";
import { readDatabase, writeDatabase } from "@/server/data/store";

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

export async function createAuthorizedDownloadUrl(downloadId: string, userEmail: string, allowAdmin = false) {
  const now = new Date();
  let resolvedUrl: string | null = null;
  let updatedDownload: DownloadRecord | null = null;

  await writeDatabase((next) => ({
    ...next,
    downloads: next.downloads.map((entry) => {
      if (entry.id !== downloadId) {
        return entry;
      }

      if (!allowAdmin && entry.user_email !== userEmail.toLowerCase()) {
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

      resolvedUrl = entry.asset_path;
      updatedDownload = {
        ...entry,
        download_count: entry.download_count + 1,
        last_downloaded_at: now.toISOString(),
      };

      return updatedDownload;
    }),
  }));

  if (!updatedDownload || !resolvedUrl) {
    throw new ApiError("NOT_FOUND", 404, "Download not found.");
  }

  return {
    download: updatedDownload,
    download_url: resolvedUrl,
  };
}