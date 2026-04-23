import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getRuntimeConfig, requireRuntimeValue } from "@/server/config/runtime";

let adminClient: SupabaseClient | null = null;
let authClient: SupabaseClient | null = null;

export function isSupabaseDatabaseConfigured() {
  const runtime = getRuntimeConfig();
  return Boolean(runtime.supabase.url && runtime.supabase.serviceRoleKey);
}

export function isSupabaseAuthConfigured() {
  const runtime = getRuntimeConfig();
  return Boolean(runtime.supabase.url && runtime.supabase.anonKey && runtime.supabase.serviceRoleKey);
}

export function getSupabaseAdminClient() {
  if (adminClient) {
    return adminClient;
  }

  const runtime = getRuntimeConfig();
  const url = requireRuntimeValue(runtime.supabase.url, "SUPABASE_URL");
  const serviceRoleKey = requireRuntimeValue(runtime.supabase.serviceRoleKey, "SUPABASE_SERVICE_ROLE_KEY");

  adminClient = createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return adminClient;
}

export function getSupabaseAuthClient() {
  if (authClient) {
    return authClient;
  }

  const runtime = getRuntimeConfig();
  const url = requireRuntimeValue(runtime.supabase.url, "SUPABASE_URL");
  const anonKey = requireRuntimeValue(runtime.supabase.anonKey, "SUPABASE_ANON_KEY");

  authClient = createClient(url, anonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return authClient;
}