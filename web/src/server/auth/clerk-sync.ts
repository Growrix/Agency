import "server-only";

import { clerkClient } from "@clerk/nextjs/server";
import type { UserRecord } from "@/server/data/schema";
import { readDatabase, writeDatabase } from "@/server/data/store";
import { isClerkConfigured } from "@/server/auth/clerk-config";

function getNow() {
  return new Date().toISOString();
}

export function resolveRoleFromClerkMetadata(
  metadata: Record<string, unknown> | undefined
): UserRecord["role"] {
  if (typeof metadata?.role === "string") {
    const role = metadata.role.trim().toLowerCase();
    if (role === "admin" || role === "customer" || role === "subscriber") {
      return role;
    }
  }

  return "subscriber";
}

/**
 * Writes role into Clerk publicMetadata (SSOT). Callers must update the local
 * mirror only after this succeeds — never leave the mirror ahead of Clerk.
 */
export async function updateClerkPublicRole(
  clerkUserId: string,
  role: UserRecord["role"],
): Promise<void> {
  if (!isClerkConfigured()) {
    throw new Error("Clerk is not configured; cannot update publicMetadata.role.");
  }

  const client = await clerkClient();
  const existing = await client.users.getUser(clerkUserId);
  const previousMetadata = (existing.publicMetadata ?? {}) as Record<string, unknown>;

  await client.users.updateUserMetadata(clerkUserId, {
    publicMetadata: {
      ...previousMetadata,
      role,
    },
  });
}

export async function getUserByClerkId(clerkUserId: string) {
  const database = await readDatabase();
  return (
    database.users.find((user) => user.clerk_user_id === clerkUserId && !user.deleted_at) ?? null
  );
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
    // Prefer active (non-deleted) mirrors so soft-deleted rows do not silently win.
    const existingByClerk =
      next.users.find((user) => user.clerk_user_id === input.clerkUserId && !user.deleted_at) ??
      next.users.find((user) => user.clerk_user_id === input.clerkUserId);
    const existingByEmail =
      next.users.find((user) => user.email.toLowerCase() === normalizedEmail && !user.deleted_at) ??
      next.users.find((user) => user.email.toLowerCase() === normalizedEmail);
    const existing = existingByClerk ?? existingByEmail;

    // Never inherit privileged roles from a soft-deleted mirror. Re-provisioned users
    // must get an explicit role from Clerk metadata (input.role) or default to subscriber.
    const role =
      input.role ??
      (existing && !existing.deleted_at ? existing.role : undefined) ??
      resolveRoleFromClerkMetadata(undefined);

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
      // Upsert means the user exists in Clerk again, so clear any prior soft-delete marker.
      deleted_at: undefined,
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
    role: resolveRoleFromClerkMetadata(metadata),
  });
}

export async function softDeleteClerkUser(clerkUserId: string) {
  const now = getNow();

  await writeDatabase((next) => ({
    ...next,
    users: next.users.map((user) =>
      user.clerk_user_id === clerkUserId
        ? { ...user, deleted_at: now, updated_at: now }
        : user,
    ),
  }));

  return { clerkUserId, deleted_at: now };
}
