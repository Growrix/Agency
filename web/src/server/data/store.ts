import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { DEFAULT_DATABASE, type DatabaseSchema } from "@/server/data/schema";
import { getSupabaseAdminClient, isSupabaseDatabaseConfigured } from "@/server/supabase/client";

const SUPABASE_APP_STATE_ID = "primary";
const SUPABASE_CACHE_TTL_MS = 1500;

let writeQueue = Promise.resolve();
let cachedSupabaseDatabase: DatabaseSchema | null = null;
let cachedSupabaseDatabaseAt = 0;
let inflightSupabaseRead: Promise<DatabaseSchema> | null = null;

function canFallbackToFileStore() {
  const appEnv = process.env.APP_ENV?.trim().toLowerCase();
  const runtimeEnv = appEnv || process.env.NODE_ENV;
  return runtimeEnv !== "production" || process.env.ALLOW_SUPABASE_FILE_FALLBACK === "1";
}

function getDataDirectory() {
  return process.env.AGENCY_DATA_DIRECTORY?.trim() || path.join(process.cwd(), ".data");
}

function getDatabasePath() {
  return path.join(getDataDirectory(), "agency-db.json");
}

async function ensureDataDirectory() {
  await mkdir(getDataDirectory(), { recursive: true });
}

function cloneDefaultDatabase(): DatabaseSchema {
  return {
    inquiries: [...DEFAULT_DATABASE.inquiries],
    appointments: [...DEFAULT_DATABASE.appointments],
    conversations: [...DEFAULT_DATABASE.conversations],
    orders: [...DEFAULT_DATABASE.orders],
    users: [...DEFAULT_DATABASE.users],
    services: [...DEFAULT_DATABASE.services],
    portfolio_projects: [...DEFAULT_DATABASE.portfolio_projects],
    products: [...DEFAULT_DATABASE.products],
    analytics_events: [...DEFAULT_DATABASE.analytics_events],
    audit_logs: [...DEFAULT_DATABASE.audit_logs],
    newsletter_subscribers: [...DEFAULT_DATABASE.newsletter_subscribers],
    leads: [...DEFAULT_DATABASE.leads],
    lead_events: [...DEFAULT_DATABASE.lead_events],
    service_requests: [...DEFAULT_DATABASE.service_requests],
    notifications: [...DEFAULT_DATABASE.notifications],
    downloads: [...DEFAULT_DATABASE.downloads],
    licenses: [...DEFAULT_DATABASE.licenses],
    submission_notes: [...DEFAULT_DATABASE.submission_notes],
    customer_notifications: [...DEFAULT_DATABASE.customer_notifications],
    cart_items: [...DEFAULT_DATABASE.cart_items],
    coupons: [...DEFAULT_DATABASE.coupons],
    wishlist_items: [...DEFAULT_DATABASE.wishlist_items],
    product_reviews: [...DEFAULT_DATABASE.product_reviews],
    invoices: [...DEFAULT_DATABASE.invoices],
    jobs: [...DEFAULT_DATABASE.jobs],
    admin_email_templates: {
      order_created: {
        subject: DEFAULT_DATABASE.admin_email_templates.order_created.subject,
        text: DEFAULT_DATABASE.admin_email_templates.order_created.text,
        html: DEFAULT_DATABASE.admin_email_templates.order_created.html,
      },
    },
    client_intake_submissions: [...DEFAULT_DATABASE.client_intake_submissions],
    projects: [...DEFAULT_DATABASE.projects],
    project_updates: [...DEFAULT_DATABASE.project_updates],
    project_assets: [...DEFAULT_DATABASE.project_assets],
    free_demo_campaigns: [...DEFAULT_DATABASE.free_demo_campaigns],
  };
}

function cloneDatabase(database: DatabaseSchema): DatabaseSchema {
  return structuredClone(database);
}

function getCachedSupabaseDatabase({ allowStale = false }: { allowStale?: boolean } = {}) {
  if (!cachedSupabaseDatabase) {
    return null;
  }

  if (!allowStale && Date.now() - cachedSupabaseDatabaseAt > SUPABASE_CACHE_TTL_MS) {
    return null;
  }

  return cloneDatabase(cachedSupabaseDatabase);
}

function setCachedSupabaseDatabase(database: DatabaseSchema) {
  cachedSupabaseDatabase = cloneDatabase(database);
  cachedSupabaseDatabaseAt = Date.now();
}

export function resetStoreCacheForTests() {
  cachedSupabaseDatabase = null;
  cachedSupabaseDatabaseAt = 0;
  inflightSupabaseRead = null;
}

/**
 * Drops the in-memory Supabase snapshot so the next readDatabase() call refetches.
 * Use after a write that bypasses writeDatabase() (e.g. an atomic Postgres RPC),
 * so this warm Lambda instance doesn't keep serving a stale cached value for up
 * to SUPABASE_CACHE_TTL_MS.
 */
export function invalidateSupabaseDatabaseCache() {
  cachedSupabaseDatabase = null;
  cachedSupabaseDatabaseAt = 0;
}

export async function readDatabase(): Promise<DatabaseSchema> {
  if (isSupabaseDatabaseConfigured()) {
    try {
      return await readDatabaseFromSupabaseCached();
    } catch (error) {
      const staleDatabase = getCachedSupabaseDatabase({ allowStale: true });
      if (staleDatabase) {
        return staleDatabase;
      }

      if (!canFallbackToFileStore()) {
        throw new Error(
          `Supabase persistence is unavailable and file fallback is disabled in production: ${
            error instanceof Error ? error.message : "unknown"
          }`
        );
      }
      return readDatabaseFromFile();
    }
  }

  return readDatabaseFromFile();
}

async function readDatabaseFromFile(): Promise<DatabaseSchema> {
  await ensureDataDirectory();

  try {
    const content = await readFile(getDatabasePath(), "utf8");
    return { ...cloneDefaultDatabase(), ...(JSON.parse(content) as Partial<DatabaseSchema>) };
  } catch {
    return cloneDefaultDatabase();
  }
}

export async function writeDatabase(updater: (database: DatabaseSchema) => DatabaseSchema | Promise<DatabaseSchema>) {
  if (isSupabaseDatabaseConfigured()) {
    writeQueue = writeQueue.catch(() => undefined).then(async () => {
      try {
        await writeDatabaseToSupabaseWithCas(updater);
      } catch (error) {
        if (!canFallbackToFileStore()) {
          throw new Error(
            `Supabase persistence write failed and file fallback is disabled in production: ${
              error instanceof Error ? error.message : "unknown"
            }`
          );
        }
        // We are already inside the write queue chain; write directly to file to avoid
        // recursively re-entering the queued writer and deadlocking on the same promise.
        const current = await readDatabaseFromFile();
        const next = await updater(current);
        await writeFile(getDatabasePath(), JSON.stringify(next, null, 2), "utf8");
        setCachedSupabaseDatabase(next);
      }
    });

    await writeQueue;
    return;
  }

  await writeDatabaseToFile(updater);
}

async function writeDatabaseToFile(updater: (database: DatabaseSchema) => DatabaseSchema | Promise<DatabaseSchema>) {
  await ensureDataDirectory();

  writeQueue = writeQueue.catch(() => undefined).then(async () => {
    const current = await readDatabaseFromFile();
    const next = await updater(current);
    await writeFile(getDatabasePath(), JSON.stringify(next, null, 2), "utf8");
  });

  await writeQueue;
}

export async function withDatabase<T>(selector: (database: DatabaseSchema) => T | Promise<T>) {
  const database = await readDatabase();
  return selector(database);
}

async function readDatabaseFromSupabaseCached(): Promise<DatabaseSchema> {
  const cached = getCachedSupabaseDatabase();
  if (cached) {
    return cached;
  }

  if (!inflightSupabaseRead) {
    inflightSupabaseRead = (async () => {
      const database = await readDatabaseFromSupabase();
      setCachedSupabaseDatabase(database);
      return cloneDatabase(database);
    })().finally(() => {
      inflightSupabaseRead = null;
    });
  }

  return cloneDatabase(await inflightSupabaseRead);
}

async function readDatabaseFromSupabase(): Promise<DatabaseSchema> {
  const { database } = await readDatabaseFromSupabaseWithVersion();
  return database;
}

/**
 * Always hits Supabase directly (never the short-lived cache) and returns the
 * row's updated_at alongside its payload, so a caller can later write back
 * only if nobody else has touched the row since — see writeDatabaseToSupabaseWithCas.
 * Using the cache here would let a write's "have things changed?" check compare
 * against data that was already stale when this process read it.
 */
async function readDatabaseFromSupabaseWithVersion(): Promise<{ database: DatabaseSchema; updatedAt: string }> {
  const client = getSupabaseAdminClient();
  const { data, error } = await client
    .from("app_state")
    .select("payload, updated_at")
    .eq("id", SUPABASE_APP_STATE_ID)
    .maybeSingle<{ payload: Partial<DatabaseSchema> | null; updated_at: string | null }>();

  if (error) {
    throw new Error(`Supabase app_state read failed: ${error.message}`);
  }

  if (!data?.payload || !data.updated_at) {
    const initial = cloneDefaultDatabase();
    const updatedAt = await writeDatabaseToSupabase(initial);
    return { database: initial, updatedAt };
  }

  return { database: { ...cloneDefaultDatabase(), ...data.payload }, updatedAt: data.updated_at };
}

/** Unconditional upsert — only for bootstrapping the row on its first-ever read. */
async function writeDatabaseToSupabase(database: DatabaseSchema): Promise<string> {
  const client = getSupabaseAdminClient();
  const updatedAt = new Date().toISOString();
  const { error } = await client.from("app_state").upsert(
    {
      id: SUPABASE_APP_STATE_ID,
      payload: database,
      updated_at: updatedAt,
    },
    { onConflict: "id" }
  );

  if (error) {
    throw new Error(`Supabase app_state write failed: ${error.message}`);
  }

  setCachedSupabaseDatabase(database);
  return updatedAt;
}

const WRITE_CAS_MAX_ATTEMPTS = 5;

/**
 * Writes only if the row's updated_at still matches what was just read (optimistic
 * concurrency). A plain upsert here would silently overwrite anything another
 * concurrent request wrote in between — that's exactly how the free-demo claim
 * counter lost real increments: two requests each read the row, one of their
 * "nothing changed" writes (e.g. ensureFreeDemoCampaign's no-op, or a later
 * audit-log/record write) landed after the other's real increment and blindly
 * replaced the whole payload with its own older snapshot. On a conflict, re-read
 * and retry the updater against the current row instead of clobbering it.
 */
async function writeDatabaseToSupabaseWithCas(
  updater: (database: DatabaseSchema) => DatabaseSchema | Promise<DatabaseSchema>
) {
  const client = getSupabaseAdminClient();

  for (let attempt = 1; attempt <= WRITE_CAS_MAX_ATTEMPTS; attempt += 1) {
    const { database: current, updatedAt: expectedUpdatedAt } = await readDatabaseFromSupabaseWithVersion();
    const next = await updater(current);
    const nextUpdatedAt = new Date().toISOString();

    const { data, error } = await client
      .from("app_state")
      .update({ payload: next, updated_at: nextUpdatedAt })
      .eq("id", SUPABASE_APP_STATE_ID)
      .eq("updated_at", expectedUpdatedAt)
      .select("updated_at");

    if (error) {
      throw new Error(`Supabase app_state write failed: ${error.message}`);
    }

    if (data && data.length > 0) {
      setCachedSupabaseDatabase(next);
      return;
    }

    console.warn(`[store] app_state write conflict, retrying (attempt ${attempt}/${WRITE_CAS_MAX_ATTEMPTS})`);
  }

  throw new Error("Supabase app_state write failed: too many concurrent writers (CAS retries exhausted)");
}
