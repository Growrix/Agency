export type FoundationMode = "attached" | "mock-fallback";

export type ApiSuccess<T> = {
  ok: true;
  requestId: string;
  data: T;
};

export type ApiError = {
  ok: false;
  requestId: string;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
};

export type ApiEnvelope<T> = ApiSuccess<T> | ApiError;

export type SurfacePayload<T> = {
  mode: FoundationMode;
  payload: T;
};

export type SiteConfigDto = {
  brand: {
    name: string;
    supportEmail: string;
  };
  navigation: Array<{
    label: string;
    href: string;
  }>;
  footer: {
    attribution: {
      enabled: boolean;
      text: string;
      linkText: string;
      url: string;
    };
  };
};

export type ContentPageDto = {
  slug: string;
  title: string;
  description: string;
  updatedAt: string;
  sections: Array<{
    id: string;
    kind: "hero" | "value" | "proof" | "conversion" | "footer";
    title: string;
    body: string;
  }>;
};

export type CollectionRecord = {
  id: string;
  title: string;
  summary: string;
};

export type SessionDto = {
  authenticated: boolean;
  user: null | {
    id: string;
    email: string;
    roles: string[];
  };
  mode: "anonymous_fallback" | "configured";
};

export type HealthDto = {
  status: string;
  runtime: {
    environment: string;
    siteUrl: string;
    contentSource: string;
  };
  adapters: Record<string, boolean>;
  readiness: {
    ready: boolean;
    missing: string[];
  };
};

export type ContactLeadPayload = {
  name: string;
  email: string;
  message: string;
  phone?: string;
  website?: string;
};

export type FormSubmissionAccepted = {
  accepted: true;
  formId: string;
  lead: {
    name: string;
    email: string;
    message: string;
    phone: string | null;
  };
  persistence: {
    mode: string;
    leadId: string | null;
  };
  email: {
    delivered: boolean;
    reason: string | null;
  };
  notifications: {
    leadAccepted: {
      delivered: boolean;
      reason: string | null;
    };
    emailFailed: {
      delivered: boolean;
      reason: string | null;
    } | null;
  };
};

export type UploadIntentDto = {
  enabled: boolean;
  reason?: string;
  filename: string;
  contentType: string;
  objectKey?: string;
  uploadUrl?: string;
  assetUrl?: string | null;
  method?: string;
};

export type PreviewEnableDto = {
  enabled: boolean;
  redirectTo: string;
};

export type RevalidateDto = {
  accepted: boolean;
  ignored?: boolean;
  reason?: string;
  event?: string;
  revalidatedPaths?: string[];
};
