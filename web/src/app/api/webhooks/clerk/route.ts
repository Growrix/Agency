import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";
import { softDeleteClerkUser, upsertUserFromClerk } from "@/server/auth/clerk-sync";
import { getRuntimeConfig } from "@/server/config/runtime";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const signingSecret = getRuntimeConfig().clerk.webhookSigningSecret;

  if (!signingSecret) {
    return NextResponse.json({ error: "Webhook signing secret is not configured." }, { status: 503 });
  }

  let event;

  try {
    event = await verifyWebhook(request, { signingSecret });
  } catch {
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 401 });
  }

  switch (event.type) {
    case "user.created":
    case "user.updated": {
      const primaryEmail = event.data.email_addresses?.find(
        (entry) => entry.id === event.data.primary_email_address_id
      )?.email_address;

      if (!primaryEmail) {
        break;
      }

      const metadata = event.data.public_metadata as Record<string, unknown> | undefined;
      const role =
        typeof metadata?.role === "string" &&
        (metadata.role === "admin" || metadata.role === "customer" || metadata.role === "subscriber")
          ? metadata.role
          : undefined;

      await upsertUserFromClerk({
        clerkUserId: event.data.id,
        email: primaryEmail,
        firstName: event.data.first_name ?? undefined,
        lastName: event.data.last_name ?? undefined,
        role,
      });
      break;
    }
    case "user.deleted":
      await softDeleteClerkUser(event.data.id ?? "");
      break;
    default:
      break;
  }

  return NextResponse.json({ success: true });
}
