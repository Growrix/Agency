import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";
import {
  resolveRoleFromClerkMetadata,
  softDeleteClerkUser,
  upsertUserFromClerk,
} from "@/server/auth/clerk-sync";
import { getRuntimeConfig } from "@/server/config/runtime";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const signingSecret = getRuntimeConfig().clerk.webhookSigningSecret;

  if (!signingSecret) {
    console.error("[webhooks/clerk] CLERK_WEBHOOK_SIGNING_SECRET is not configured");
    return NextResponse.json({ error: "Webhook signing secret is not configured." }, { status: 503 });
  }

  let event;

  try {
    event = await verifyWebhook(request, { signingSecret });
  } catch (error) {
    console.error("[webhooks/clerk] invalid signature", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 401 });
  }

  switch (event.type) {
    case "user.created":
    case "user.updated": {
      const primaryEmail = event.data.email_addresses?.find(
        (entry) => entry.id === event.data.primary_email_address_id
      )?.email_address;

      if (!primaryEmail) {
        console.error("[webhooks/clerk] missing primary email", {
          type: event.type,
          clerkUserId: event.data.id,
        });
        break;
      }

      const metadata = event.data.public_metadata as Record<string, unknown> | undefined;
      // Always apply resolved role (defaults to subscriber) so removing admin from
      // Clerk publicMetadata demotes the local mirror instead of preserving admin.
      const role = resolveRoleFromClerkMetadata(metadata);

      try {
        await upsertUserFromClerk({
          clerkUserId: event.data.id,
          email: primaryEmail,
          firstName: event.data.first_name ?? undefined,
          lastName: event.data.last_name ?? undefined,
          role,
        });
        console.info("[webhooks/clerk] mirrored user", {
          type: event.type,
          clerkUserId: event.data.id,
          email: primaryEmail,
          role,
        });
      } catch (error) {
        console.error("[webhooks/clerk] upsert failed", {
          type: event.type,
          clerkUserId: event.data.id,
          email: primaryEmail,
          role,
          error: error instanceof Error ? error.message : error,
        });
        throw error;
      }
      break;
    }
    case "user.deleted":
      try {
        await softDeleteClerkUser(event.data.id ?? "");
        console.info("[webhooks/clerk] soft-deleted user", { clerkUserId: event.data.id });
      } catch (error) {
        console.error("[webhooks/clerk] soft-delete failed", {
          clerkUserId: event.data.id,
          error: error instanceof Error ? error.message : error,
        });
        throw error;
      }
      break;
    default:
      console.info("[webhooks/clerk] ignored event", { type: event.type });
      break;
  }

  return NextResponse.json({ success: true });
}
