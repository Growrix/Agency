import { starterFallback } from "@/lib/mock-data";

type PageDto = {
  title: string;
  description: string;
  sections: Array<{
    id: string;
    kind: string;
    title: string;
    body: string;
  }>;
};

type ApiEnvelope<T> = {
  ok: boolean;
  data: T;
};

const foundationBaseUrl =
  process.env.FOUNDATION_BASE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

export async function getHomeSurface() {
  const [pageEnvelope, healthEnvelope, sessionEnvelope] = await Promise.all([
    fetchEnvelope<PageDto>(`${foundationBaseUrl}/api/content/pages/home`),
    fetchEnvelope<{ status: string }>(`${foundationBaseUrl}/api/health`),
    fetchEnvelope<{ mode: string }>(`${foundationBaseUrl}/api/auth/session`),
  ]);

  const attached = pageEnvelope.ok && healthEnvelope.ok && sessionEnvelope.ok;

  if (!attached) {
    return {
      mode: "mock-fallback",
      foundationBaseUrl,
      page: starterFallback.page,
      healthStatus: starterFallback.healthStatus,
      authMode: starterFallback.authMode,
    };
  }

  return {
    mode: "attached",
    foundationBaseUrl,
    page: pageEnvelope.data,
    healthStatus: healthEnvelope.data.status,
    authMode: sessionEnvelope.data.mode,
  };
}

async function fetchEnvelope<T>(url: string): Promise<{ ok: true; data: T } | { ok: false }> {
  try {
    const response = await fetch(url, { next: { revalidate: 60 } });

    if (!response.ok) {
      return { ok: false };
    }

    const payload = (await response.json()) as ApiEnvelope<T>;

    if (!payload.ok) {
      return { ok: false };
    }

    return {
      ok: true,
      data: payload.data,
    };
  } catch {
    return { ok: false };
  }
}