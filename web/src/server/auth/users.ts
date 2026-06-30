import "server-only";

import { compare, hash } from "bcryptjs";
import { ApiError } from "@/server/core/api";
import { isClerkConfigured, isLegacyTestAuthEnabled } from "@/server/auth/clerk-config";
import { getRuntimeConfig, requireRuntimeValue } from "@/server/config/runtime";
import type { UserRecord } from "@/server/data/schema";
import { readDatabase, writeDatabase } from "@/server/data/store";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getNow() {
  return new Date().toISOString();
}

export async function ensureSeedAdminUser() {
  if (isClerkConfigured()) {
    return null;
  }

  const runtime = getRuntimeConfig();
  const adminEmail = runtime.auth.adminEmail;
  const adminPassword = runtime.auth.adminPassword;

  if (!adminEmail || !adminPassword) {
    return null;
  }

  const database = await readDatabase();
  const existing = database.users.find((user) => user.email.toLowerCase() === adminEmail.toLowerCase());
  if (existing) {
    return existing;
  }

  const now = getNow();
  const adminUser: UserRecord = {
    id: crypto.randomUUID(),
    email: adminEmail,
    password_hash: await hash(adminPassword, 12),
    role: "admin",
    created_at: now,
    updated_at: now,
  };

  await writeDatabase((next) => ({
    ...next,
    users: [adminUser, ...next.users],
  }));

  return adminUser;
}

export function validatePasswordStrength(password: string) {
  if (password.length < 8) {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, "Password must be at least 8 characters.");
  }

  if (!/[A-Z]/.test(password)) {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, "Password must include an uppercase letter.");
  }

  if (!/[a-z]/.test(password)) {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, "Password must include a lowercase letter.");
  }

  if (!/\d/.test(password)) {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, "Password must include a number.");
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, "Password must include a special character.");
  }
}

export function validateEmailAddress(email: string) {
  if (!EMAIL_REGEX.test(email)) {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, "A valid email address is required.");
  }
}

export async function createUser(input: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: UserRecord["role"];
}) {
  if (isClerkConfigured()) {
    throw new ApiError("METHOD_NOT_ALLOWED", 405, "Registration is handled by Clerk sign-up.");
  }

  if (!isLegacyTestAuthEnabled()) {
    throw new ApiError("SERVICE_UNAVAILABLE", 503, "Local registration is disabled. Use Clerk sign-up.");
  }

  const normalizedEmail = input.email.trim().toLowerCase();
  validateEmailAddress(normalizedEmail);
  validatePasswordStrength(input.password);

  await ensureSeedAdminUser();
  const database = await readDatabase();
  if (database.users.some((user) => user.email === normalizedEmail)) {
    throw new ApiError("CONFLICT", 409, "An account with that email already exists.");
  }

  const now = getNow();
  const user: UserRecord = {
    id: crypto.randomUUID(),
    email: normalizedEmail,
    password_hash: await hash(input.password, 12),
    role: input.role ?? "subscriber",
    first_name: input.firstName?.trim() || undefined,
    last_name: input.lastName?.trim() || undefined,
    created_at: now,
    updated_at: now,
  };

  await writeDatabase((next) => ({
    ...next,
    users: [user, ...next.users],
  }));

  return user;
}

export async function authenticateUser(email: string, password: string) {
  if (isClerkConfigured()) {
    return null;
  }

  if (!isLegacyTestAuthEnabled()) {
    return null;
  }

  await ensureSeedAdminUser();
  const database = await readDatabase();
  const normalizedEmail = email.trim().toLowerCase();
  const user = database.users.find((entry) => entry.email.toLowerCase() === normalizedEmail);
  const runtime = getRuntimeConfig();

  if (!user || !user.password_hash || user.password_hash === "clerk-auth") {
    const configuredAdminEmail = runtime.auth.adminEmail?.trim().toLowerCase();
    const configuredAdminPassword = runtime.auth.adminPassword;

    if (
      configuredAdminEmail &&
      configuredAdminPassword &&
      normalizedEmail === configuredAdminEmail &&
      password === configuredAdminPassword
    ) {
      const now = getNow();
      const fallbackAdmin: UserRecord = {
        id: user?.id ?? crypto.randomUUID(),
        email: configuredAdminEmail,
        password_hash: "env-admin",
        role: "admin",
        first_name: user?.first_name,
        last_name: user?.last_name,
        created_at: user?.created_at ?? now,
        updated_at: now,
      };

      await writeDatabase((next) => {
        const withoutMatch = next.users.filter((entry) => entry.email.toLowerCase() !== normalizedEmail);
        return {
          ...next,
          users: [fallbackAdmin, ...withoutMatch],
        };
      });

      return fallbackAdmin;
    }

    return null;
  }

  if (user.password_hash === "env-admin") {
    return user;
  }

  const matches = await compare(password, user.password_hash);
  return matches ? user : null;
}

export async function getUserById(userId: string) {
  const database = await readDatabase();
  return database.users.find((user) => user.id === userId) ?? null;
}

export async function updateUserProfile(
  userId: string,
  updates: { firstName?: string; lastName?: string; phone?: string; marketingOptIn?: boolean }
): Promise<UserRecord> {
  let updatedUser: UserRecord | null = null;

  await writeDatabase((next) => ({
    ...next,
    users: next.users.map((user) => {
      if (user.id !== userId) {
        return user;
      }

      updatedUser = {
        ...user,
        first_name: updates.firstName !== undefined ? updates.firstName.trim() || undefined : user.first_name,
        last_name: updates.lastName !== undefined ? updates.lastName.trim() || undefined : user.last_name,
        phone: updates.phone !== undefined ? updates.phone.trim() || undefined : user.phone,
        marketing_opt_in:
          updates.marketingOptIn !== undefined ? updates.marketingOptIn : user.marketing_opt_in,
        updated_at: getNow(),
      };

      return updatedUser;
    }),
  }));

  if (!updatedUser) {
    throw new ApiError("NOT_FOUND", 404, "User not found.");
  }

  return updatedUser;
}

export function getRequiredAdminCredentialsConfigured() {
  if (isClerkConfigured()) {
    return;
  }

  const runtime = getRuntimeConfig();
  requireRuntimeValue(runtime.auth.jwtSecret, "AUTH_JWT_SECRET");

  if (runtime.auth.adminEmail || runtime.auth.adminPassword) {
    requireRuntimeValue(runtime.auth.adminEmail, "ADMIN_EMAIL");
    requireRuntimeValue(runtime.auth.adminPassword, "ADMIN_PASSWORD");
  }
}
