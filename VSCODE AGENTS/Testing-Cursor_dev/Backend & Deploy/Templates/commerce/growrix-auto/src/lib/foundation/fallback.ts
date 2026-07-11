import { brandConfig } from "@/data/brand";
import type {
  CollectionRecord,
  ContactLeadPayload,
  ContentPageDto,
  FormSubmissionAccepted,
  HealthDto,
  PreviewEnableDto,
  RevalidateDto,
  SessionDto,
  SiteConfigDto,
  UploadIntentDto,
} from "@/lib/foundation/types";

const fallbackNavigation = [
  { label: "HOME", href: "/" },
  { label: "SHOP", href: "/shop" },
  { label: "DEALS", href: "/daily-deals" },
  { label: "UNDER $100", href: "/#under-100" },
  { label: "NEW ARRIVALS", href: "/#new-arrivals" },
  { label: "BLOG", href: "/blog" },
  { label: "ABOUT US", href: "/about-us" },
  { label: "CONTACT US", href: "/contact-us" },
];

export const fallbackSiteConfig: SiteConfigDto = {
  brand: {
    name: brandConfig.siteName,
    supportEmail: brandConfig.supportEmail,
  },
  navigation: fallbackNavigation,
  footer: {
    attribution: {
      enabled: true,
      text: "Built and Maintained by",
      linkText: "Growrix OS",
      url: "https://www.growrixos.com",
    },
  },
};

export const fallbackPageBySlug: Record<string, ContentPageDto> = {
  home: {
    slug: "home",
    title: `${brandConfig.siteName} Home`,
    description: "Fallback shell for the imported homepage while Foundation Core is offline.",
    updatedAt: new Date("2026-05-17T00:00:00.000Z").toISOString(),
    sections: [
      {
        id: "hero-shell",
        kind: "hero",
        title: "Complete automotive storefront flows",
        body: "The imported storefront remains fully navigable in standalone mode while preserving attach compatibility.",
      },
      {
        id: "value-shell",
        kind: "value",
        title: "Attach through normalized facades",
        body: "Session, content, forms, media, preview, and health surfaces stay available through template-local routes.",
      },
      {
        id: "proof-shell",
        kind: "proof",
        title: "Mock fallback remains runnable",
        body: "If Foundation Core is offline, template-local fixtures keep conversion flows testable without runtime failures.",
      },
    ],
  },
};

export const fallbackCollections: Record<string, CollectionRecord[]> = {
  services: [
    {
      id: "service-attach",
      title: "Foundation Attach",
      summary: "Template-local facade wiring for runtime integration surfaces.",
    },
    {
      id: "service-commerce",
      title: "Commerce Runtime",
      summary: "Product, cart, checkout, and account route graph preserved from imported source.",
    },
  ],
};

export const fallbackSession: SessionDto = {
  authenticated: false,
  user: null,
  mode: "anonymous_fallback",
};

export const fallbackHealth: HealthDto = {
  status: "api-ready-with-fallbacks",
  runtime: {
    environment: process.env.NODE_ENV ?? "development",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    contentSource: "template-local-fallback",
  },
  adapters: {
    auth: false,
    content: false,
    forms: true,
    media: false,
    preview: false,
  },
  readiness: {
    ready: false,
    missing: ["foundation-runtime-offline"],
  },
};

export function buildFallbackContactSubmission(formId: string, payload: ContactLeadPayload): FormSubmissionAccepted {
  return {
    accepted: true,
    formId,
    lead: {
      name: payload.name,
      email: payload.email,
      message: payload.message,
      phone: payload.phone ?? null,
    },
    persistence: {
      mode: "mock-fallback",
      leadId: null,
    },
    email: {
      delivered: false,
      reason: "fallback-mode",
    },
    notifications: {
      leadAccepted: {
        delivered: false,
        reason: "fallback-mode",
      },
      emailFailed: null,
    },
  };
}

export function buildFallbackUploadIntent(filename: string, contentType: string): UploadIntentDto {
  return {
    enabled: false,
    reason: "Storage adapter is not configured in fallback mode.",
    filename,
    contentType,
  };
}

export function buildFallbackPreview(redirectTo: string): PreviewEnableDto {
  return {
    enabled: false,
    redirectTo,
  };
}

export const fallbackRevalidate: RevalidateDto = {
  accepted: false,
  ignored: true,
  reason: "Foundation runtime is offline, revalidation is skipped in fallback mode.",
};
