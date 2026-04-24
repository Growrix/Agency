import "server-only";

type RuntimeConfig = {
  appBaseUrl: string;
  contact: {
    toEmail?: string;
    fromEmail?: string;
    fallbackFromEmail: string;
    resendApiKey?: string;
  };
  openAi: {
    apiKey?: string;
    model: string;
  };
  stripe: {
    secretKey?: string;
    webhookSecret?: string;
  };
  auth: {
    jwtSecret?: string;
    adminEmail?: string;
    adminPassword?: string;
  };
  supabase: {
    url?: string;
    anonKey?: string;
    secretKey?: string;
    serviceRoleKey?: string;
  };
  abuseProtection: {
    contactLimitPerMinute: number;
    conciergeLimitPerMinute: number;
    bookingLimitPerMinute: number;
    authLimitPerMinute: number;
  };
};

const DEFAULT_FALLBACK_FROM_EMAIL = "Growrix <onboarding@resend.dev>";

let cachedRuntimeConfig: RuntimeConfig | null = null;

function parseNumber(value: string | undefined, fallback: number) {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function parseBaseUrl(value: string | undefined) {
  if (!value) {
    return "http://localhost:5000";
  }

  try {
    return new URL(value).toString().replace(/\/$/, "");
  } catch {
    return "http://localhost:5000";
  }
}

export function getRuntimeConfig(): RuntimeConfig {
  if (cachedRuntimeConfig) {
    return cachedRuntimeConfig;
  }

  cachedRuntimeConfig = {
    appBaseUrl: parseBaseUrl(process.env.NEXT_PUBLIC_SITE_URL),
    contact: {
      toEmail: process.env.CONTACT_TO_EMAIL,
      fromEmail: process.env.CONTACT_FROM_EMAIL,
      fallbackFromEmail: process.env.CONTACT_FROM_FALLBACK_EMAIL ?? DEFAULT_FALLBACK_FROM_EMAIL,
      resendApiKey: process.env.RESEND_API_KEY,
    },
    openAi: {
      apiKey: process.env.OPENAI_API_KEY,
      model: process.env.OPENAI_MODEL?.trim() || "o3-mini",
    },
    stripe: {
      secretKey: process.env.STRIPE_SECRET_KEY,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    },
    auth: {
      jwtSecret: process.env.AUTH_JWT_SECRET,
      adminEmail: process.env.ADMIN_EMAIL,
      adminPassword: process.env.ADMIN_PASSWORD,
    },
    supabase: {
      url: process.env.SUPABASE_URL,
      anonKey: process.env.SUPABASE_ANON_KEY,
      secretKey: process.env.SUPABASE_SECRET_KEY,
      serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY,
    },
    abuseProtection: {
      contactLimitPerMinute: parseNumber(process.env.RATE_LIMIT_CONTACT_PER_MINUTE, 6),
      conciergeLimitPerMinute: parseNumber(process.env.RATE_LIMIT_CONCIERGE_PER_MINUTE, 12),
      bookingLimitPerMinute: parseNumber(process.env.RATE_LIMIT_BOOKING_PER_MINUTE, 6),
      authLimitPerMinute: parseNumber(process.env.RATE_LIMIT_AUTH_PER_MINUTE, 10),
    },
  };

  return cachedRuntimeConfig;
}

export function requireRuntimeValue(value: string | undefined, key: string) {
  if (!value) {
    throw new Error(`${key} is missing.`);
  }

  return value;
}

export function resetRuntimeConfigForTests() {
  if (process.env.NODE_ENV === "test") {
    cachedRuntimeConfig = null;
  }
}
