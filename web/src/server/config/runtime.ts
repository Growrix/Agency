import "server-only";

import { resolveAppBaseUrl } from "@/lib/site";

type RuntimeConfig = {
  appBaseUrl: string;
  contact: {
    /** First configured recipient; kept for legacy call sites (e.g. replyTo addresses). */
    toEmail?: string;
    /** All configured recipients (CONTACT_TO_EMAIL is comma-separated). */
    toEmails: string[];
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
  clerk: {
    publishableKey?: string;
    secretKey?: string;
    webhookSigningSecret?: string;
    signInUrl?: string;
    signUpUrl?: string;
    signInFallbackRedirectUrl?: string;
    signUpFallbackRedirectUrl?: string;
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
    leadEventLimitPerMinute: number;
    couponValidateLimitPerMinute: number;
  };
  notifications: {
    larkWebhookUrl?: string;
    larkSigningSecret?: string;
    hotLeadThreshold: number;
  };
  cta: {
    whatsappHref: string;
  };
};

const DEFAULT_FALLBACK_FROM_EMAIL = "Growrix OS <onboarding@resend.dev>";

let cachedRuntimeConfig: RuntimeConfig | null = null;

function parseNumber(value: string | undefined, fallback: number) {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function parseRecipientList(value: string | undefined): string[] {
  if (!value) {
    return [];
  }

  const seen = new Set<string>();
  const recipients: string[] = [];

  for (const raw of value.split(",")) {
    const trimmed = raw.trim();
    if (!trimmed) continue;
    const key = trimmed.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    recipients.push(trimmed);
  }

  return recipients;
}

const KNOWN_VERIFIED_SENDER_HOSTS = new Set(["growrixos.com", "resend.dev"]);
let resendSenderDomainWarned = false;

function extractEmailHost(value: string | undefined): string | null {
  if (!value) return null;
  const angleMatch = value.match(/<\s*([^<>\s]+@[^<>\s]+)\s*>/);
  const raw = (angleMatch ? angleMatch[1] : value).trim();
  const at = raw.lastIndexOf("@");
  if (at < 0 || at === raw.length - 1) return null;
  return raw.slice(at + 1).toLowerCase();
}

function maybeWarnUnverifiedResendSender(fromEmail: string | undefined) {
  if (resendSenderDomainWarned || !fromEmail) {
    return;
  }
  const host = extractEmailHost(fromEmail);
  if (!host || KNOWN_VERIFIED_SENDER_HOSTS.has(host)) {
    return;
  }
  resendSenderDomainWarned = true;
  console.warn(
    `[runtime] CONTACT_FROM_EMAIL host "${host}" is not in the known-verified Resend sender list. ` +
      `Verify DKIM/SPF/return-path for this domain in Resend or expect delivery to fall back to the onboarding sender.`,
  );
}

export function getRuntimeConfig(): RuntimeConfig {
  if (cachedRuntimeConfig) {
    return cachedRuntimeConfig;
  }

  const toEmails = parseRecipientList(process.env.CONTACT_TO_EMAIL);

  cachedRuntimeConfig = {
    appBaseUrl: resolveAppBaseUrl(),
    contact: {
      toEmail: toEmails[0],
      toEmails,
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
    clerk: {
      publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      secretKey: process.env.CLERK_SECRET_KEY,
      webhookSigningSecret: process.env.CLERK_WEBHOOK_SIGNING_SECRET,
      signInUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL ?? "/sign-in",
      signUpUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL ?? "/sign-up",
      signInFallbackRedirectUrl: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL ?? "/dashboard",
      signUpFallbackRedirectUrl: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL ?? "/dashboard",
    },
    supabase: {
      url: process.env.SUPABASE_URL,
      anonKey: process.env.SUPABASE_ANON_KEY,
      secretKey: process.env.SUPABASE_SECRET_KEY,
      serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY,
    },
    notifications: {
      larkWebhookUrl: process.env.LARK_WEBHOOK_URL?.trim() || undefined,
      larkSigningSecret: process.env.LARK_SIGNING_SECRET?.trim() || undefined,
      hotLeadThreshold: parseNumber(process.env.LEAD_HOT_THRESHOLD, 30),
    },
    cta: {
      whatsappHref: process.env.NEXT_PUBLIC_WHATSAPP_HREF?.trim() || "https://wa.me/8801986925425",
    },
    abuseProtection: {
      contactLimitPerMinute: parseNumber(process.env.RATE_LIMIT_CONTACT_PER_MINUTE, 6),
      conciergeLimitPerMinute: parseNumber(process.env.RATE_LIMIT_CONCIERGE_PER_MINUTE, 12),
      bookingLimitPerMinute: parseNumber(process.env.RATE_LIMIT_BOOKING_PER_MINUTE, 6),
      authLimitPerMinute: parseNumber(process.env.RATE_LIMIT_AUTH_PER_MINUTE, 10),
      leadEventLimitPerMinute: parseNumber(process.env.RATE_LIMIT_LEAD_EVENT_PER_MINUTE, 60),
      couponValidateLimitPerMinute: parseNumber(process.env.RATE_LIMIT_COUPON_VALIDATE_PER_MINUTE, 20),
    },
  };

  maybeWarnUnverifiedResendSender(cachedRuntimeConfig.contact.fromEmail);

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
    resendSenderDomainWarned = false;
  }
}
