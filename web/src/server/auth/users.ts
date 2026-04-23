import "server-only";

import { compare, hash } from "bcryptjs";
import { getRuntimeConfig, requireRuntimeValue } from "@/server/config/runtime";
import type { UserRecord } from "@/server/data/schema";
import { readDatabase, writeDatabase } from "@/server/data/store";

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

  const now = getNow();
  const adminUser: UserRecord = {
    id: crypto.randomUUID(),
    email: adminEmail,
    password_hash: await hash(adminPassword, 10),
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

export async function authenticateAdminUser(email: string, password: string) {
  await ensureSeedAdminUser();
  const database = await readDatabase();
  const user = database.users.find((entry) => entry.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    return null;
  }

  const matches = await compare(password, user.password_hash);
  return matches ? user : null;
}

export async function getUserById(userId: string) {
  const database = await readDatabase();
  return database.users.find((user) => user.id === userId) ?? null;
}

export function getRequiredAdminCredentialsConfigured() {
  const runtime = getRuntimeConfig();
  requireRuntimeValue(runtime.auth.adminEmail, "ADMIN_EMAIL");
  requireRuntimeValue(runtime.auth.adminPassword, "ADMIN_PASSWORD");
  requireRuntimeValue(runtime.auth.jwtSecret, "AUTH_JWT_SECRET");
}
