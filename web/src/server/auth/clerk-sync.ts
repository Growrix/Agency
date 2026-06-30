import "server-only";

import { clerkClient } from "@clerk/nextjs/server";
import type { UserRecord } from "@/server/data/schema";
import { readDatabase, writeDatabase } from "@/server/data/store";
import { getRuntimeConfig } from "@/server/config/runtime";
import { isClerkConfigured } from "@/server/auth/clerk-config";

function getNow() {
  return new Date().toISOString();
}

function resolveRoleFromClerkMetadata(
  metadata: Record<string, unknown> | undefined,
  email: string
): UserRecord["role"] {
  const configuredAdminEmail = getRuntimeConfig().auth.adminEmail?.trim().toLowerCase();
  if (typeof metadata?.role === "string") {
    const role = metadata.role as UserRecord["role"];
    if (role === "admin" || role === "customer" || role === "subscriber") {
      return role;
    }
  }

  if (configuredAdminEmail && configuredAdminEmail === email.toLowerCase()) {
    return "admin";
  }

  return "subscriber";
}

export async function getUserByClerkId(clerkUserId: string) {
  const database = await readDatabase();
  return database.users.find((user) => user.clerk_user_id === clerkUserId) ?? null;
}

export async function upsertUserFromClerk(input: {
  clerkUserId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: UserRecord["role"];
}) {
  const normalizedEmail = input.email.trim().toLowerCase();
  const now = getNow();
  let upserted: UserRecord | null = null;

  await writeDatabase((next) => {
    const existingByClerk = next.users.find((user) => user.clerk_user_id === input.clerkUserId);
    const existingByEmail = next.users.find((user) => user.email.toLowerCase() === normalizedEmail);
    const existing = existingByClerk ?? existingByEmail;
    const role = input.role ?? existing?.role ?? resolveRoleFromClerkMetadata(undefined, normalizedEmail);

    const record: UserRecord = {
      id: existing?.id ?? crypto.randomUUID(),
      clerk_user_id: input.clerkUserId,
      email: normalizedEmail,
      password_hash: "clerk-auth",
      role,
      first_name: input.firstName?.trim() || existing?.first_name,
      last_name: input.lastName?.trim() || existing?.last_name,
      phone: existing?.phone,
      marketing_opt_in: existing?.marketing_opt_in,
      signup_completed_at: existing?.signup_completed_at,
      signup_intent_source: existing?.signup_intent_source,
      created_at: existing?.created_at ?? now,
      updated_at: now,
    };

    upserted = record;

    const withoutMatch = next.users.filter(
      (user) => user.clerk_user_id !== input.clerkUserId && user.email.toLowerCase() !== normalizedEmail
    );

    return {
      ...next,
      users: [record, ...withoutMatch],
    };
  });

  return upserted!;
}

export async function syncClerkUser(clerkUserId: string) {
  if (!isClerkConfigured()) {
    return null;
  }

  const client = await clerkClient();
  const clerkUser = await client.users.getUser(clerkUserId);
  const primaryEmail = clerkUser.emailAddresses.find(
    (entry) => entry.id === clerkUser.primaryEmailAddressId
  )?.emailAddress;

  if (!primaryEmail) {
    return null;
  }

  const metadata = clerkUser.publicMetadata as Record<string, unknown> | undefined;

  return upsertUserFromClerk({
    clerkUserId,
    email: primaryEmail,
    firstName: clerkUser.firstName ?? undefined,
    lastName: clerkUser.lastName ?? undefined,
    role: resolveRoleFromClerkMetadata(metadata, primaryEmail),
  });
}

export async function softDeleteClerkUser(clerkUserId: string) {
  const now = getNow();

  await writeDatabase((next) => ({
    ...next,
    users: next.users.filter((user) => user.clerk_user_id !== clerkUserId),
  }));

  return { clerkUserId, deleted_at: now };
}
