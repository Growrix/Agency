import {
  buildFallbackContactSubmission,
  fallbackPageBySlug,
  fallbackSiteConfig,
} from "@/lib/foundation/fallback";
import type {
  ApiEnvelope,
  ContactLeadPayload,
  ContentPageDto,
  FormSubmissionAccepted,
  FoundationMode,
  SiteConfigDto,
  SurfacePayload,
} from "@/lib/foundation/types";

type FormSubmitResult = {
  accepted: boolean;
  message: string;
  mode: FoundationMode;
};

async function fetchSurface<T>(path: string, fallbackPayload: T): Promise<SurfacePayload<T>> {
  try {
    const response = await fetch(path, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return {
        mode: "mock-fallback",
        payload: fallbackPayload,
      };
    }

    const envelope = (await response.json()) as ApiEnvelope<SurfacePayload<T>>;

    if (!envelope.ok) {
      return {
        mode: "mock-fallback",
        payload: fallbackPayload,
      };
    }

    return envelope.data;
  } catch {
    return {
      mode: "mock-fallback",
      payload: fallbackPayload,
    };
  }
}

export async function fetchSiteConfigSurface() {
  return fetchSurface<SiteConfigDto>(
    "/api/foundation/content/site-config",
    fallbackSiteConfig,
  );
}

export async function fetchHomePageSurface() {
  return fetchSurface<ContentPageDto>(
    "/api/foundation/content/pages/home",
    fallbackPageBySlug.home,
  );
}

export async function submitContactForm(payload: ContactLeadPayload): Promise<FormSubmitResult> {
  try {
    const response = await fetch("/api/foundation/forms/contact/submit", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const modeHeader = response.headers.get("x-template-mode");
    const mode: FoundationMode = modeHeader === "attached" ? "attached" : "mock-fallback";
    const envelope = (await response.json()) as ApiEnvelope<FormSubmissionAccepted>;

    if (!response.ok || !envelope.ok) {
      return {
        accepted: false,
        message: envelope.ok
          ? "Unable to submit your message."
          : envelope.error.message,
        mode,
      };
    }

    return {
      accepted: envelope.data.accepted,
      message: envelope.data.accepted
        ? "Message submitted successfully."
        : "Unable to submit your message.",
      mode,
    };
  } catch {
    buildFallbackContactSubmission("contact", payload);

    return {
      accepted: true,
      message: "Message submitted in fallback mode.",
      mode: "mock-fallback",
    };
  }
}
