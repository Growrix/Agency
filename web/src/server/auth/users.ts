import "server-only";

import { compare, hash } from "bcryptjs";
import { ApiError } from "@/server/core/api";
import { getRuntimeConfig, requireRuntimeValue } from "@/server/config/runtime";
import type { UserRecord } from "@/server/data/schema";
import { readDatabase, writeDatabase } from "@/server/data/store";
import {
  getSupabaseAdminClient,
  getSupabaseAuthClient,
  isSupabaseAuthConfigured,
} from "@/server/supabase/client";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getNow() {
  return new Date().toISOString();
}

export async function ensureSeedAdminUser() {
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

  if (isSupabaseAuthConfigured()) {
    const supabaseAdmin = getSupabaseAdminClient();
    const { data: listedUsers, error: listError } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 500 });
    if (listError) {
      throw new ApiError("SERVICE_UNAVAILABLE", 503, "Unable to check Supabase users.");
    }

    let authUserId = listedUsers.users.find((user) => user.email?.toLowerCase() === adminEmail.toLowerCase())?.id;
    if (!authUserId) {
      const { data: createdUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: adminEmail,
        password: adminPassword,
        email_confirm: true,
        user_metadata: { role: "admin" },
      });

      if (createError || !createdUser.user) {
        throw new ApiError("SERVICE_UNAVAILABLE", 503, "Unable to seed Supabase admin account.");
      }

      authUserId = createdUser.user.id;
    }

    const now = getNow();
    const adminUser: UserRecord = {
      id: authUserId,
      email: adminEmail.toLowerCase(),
      password_hash: "supabase-auth",
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
  const normalizedEmail = input.email.trim().toLowerCase();
  validateEmailAddress(normalizedEmail);
  validatePasswordStrength(input.password);

  await ensureSeedAdminUser();
  const database = await readDatabase();
  if (database.users.some((user) => user.email === normalizedEmail)) {
    throw new ApiError("CONFLICT", 409, "An account with that email already exists.");
  }

  const now = getNow();
  let userId = crypto.randomUUID();
  let passwordHash = await hash(input.password, 12);

  if (isSupabaseAuthConfigured()) {
    const supabaseAdmin = getSupabaseAdminClient();
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: normalizedEmail,
      password: input.password,
      email_confirm: true,
      user_metadata: {
        first_name: input.firstName?.trim() || null,
        last_name: input.lastName?.trim() || null,
        role: input.role ?? "subscriber",
      },
    });

    if (error || !data.user) {
      if (error?.status === 422 || error?.message.toLowerCase().includes("already")) {
        throw new ApiError("CONFLICT", 409, "An account with that email already exists.");
      }
      throw new ApiError("SERVICE_UNAVAILABLE", 503, "Unable to register account in Supabase auth.");
    }

    userId = data.user.id;
    passwordHash = "supabase-auth";
  }

  const user: UserRecord = {
    id: userId,
    email: normalizedEmail,
    password_hash: passwordHash,
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
  await ensureSeedAdminUser();
  const database = await readDatabase();
  const normalizedEmail = email.trim().toLowerCase();
  const user = database.users.find((entry) => entry.email.toLowerCase() === normalizedEmail);

  if (isSupabaseAuthConfigured()) {
    const supabaseAuth = getSupabaseAuthClient();
    const { data, error } = await supabaseAuth.auth.signInWithPassword({ email: normalizedEmail, password });
    if (error || !data.user) {
      return null;
    }

    const now = getNow();
    const existingRole = user?.role;
    const metadataRole =
      typeof data.user.user_metadata?.role === "string"
        ? (data.user.user_metadata.role as UserRecord["role"])
        : undefined;
    const role =
      existingRole ??
      metadataRole ??
      (getRuntimeConfig().auth.adminEmail?.toLowerCase() === normalizedEmail ? "admin" : "subscriber");

    const syncedUser: UserRecord = {
      id: data.user.id,
      email: normalizedEmail,
      password_hash: "supabase-auth",
      role,
      first_name:
        typeof data.user.user_metadata?.first_name === "string"
          ? data.user.user_metadata.first_name
          : user?.first_name,
      last_name:
        typeof data.user.user_metadata?.last_name === "string"
          ? data.user.user_metadata.last_name
          : user?.last_name,
      created_at: user?.created_at ?? now,
      updated_at: now,
    };

    await writeDatabase((next) => {
      const withoutMatch = next.users.filter((entry) => entry.email.toLowerCase() !== normalizedEmail);
      return {
        ...next,
        users: [syncedUser, ...withoutMatch],
      };
    });

    return syncedUser;
  }

  if (!user || !user.password_hash) {
    return null;
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
  updates: { firstName?: string; lastName?: string }
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
        first_name: updates.firstName?.trim() || undefined,
        last_name: updates.lastName?.trim() || undefined,
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
  const runtime = getRuntimeConfig();
  requireRuntimeValue(runtime.auth.jwtSecret, "AUTH_JWT_SECRET");

  if (runtime.auth.adminEmail || runtime.auth.adminPassword) {
    requireRuntimeValue(runtime.auth.adminEmail, "ADMIN_EMAIL");
    requireRuntimeValue(runtime.auth.adminPassword, "ADMIN_PASSWORD");
  }
}
