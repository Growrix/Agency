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
        const current = await readDatabaseFromSupabaseCached();
        const next = await updater(current);
        await writeDatabaseToSupabase(next);
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
  const client = getSupabaseAdminClient();
  const { data, error } = await client
    .from("app_state")
    .select("payload")
    .eq("id", SUPABASE_APP_STATE_ID)
    .maybeSingle<{ payload: Partial<DatabaseSchema> | null }>();

  if (error) {
    throw new Error(`Supabase app_state read failed: ${error.message}`);
  }

  if (!data?.payload) {
    const initial = cloneDefaultDatabase();
    await writeDatabaseToSupabase(initial);
    return initial;
  }

  return { ...cloneDefaultDatabase(), ...data.payload };
}

async function writeDatabaseToSupabase(database: DatabaseSchema) {
  const client = getSupabaseAdminClient();
  const { error } = await client.from("app_state").upsert(
    {
      id: SUPABASE_APP_STATE_ID,
      payload: database,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );

  if (error) {
    throw new Error(`Supabase app_state write failed: ${error.message}`);
  }

  setCachedSupabaseDatabase(database);
}
