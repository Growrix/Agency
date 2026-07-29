/**
 * Resolves a post-auth redirect path from Clerk/app query params.
 * Clerk middleware uses `redirect_url`; app links use `next`.
 */
export function resolveAuthRedirectPath(input: {
  next?: string | string[];
  redirect_url?: string | string[];
  fallback?: string;
}): string {
  const fallback = input.fallback ?? "/auth/after-sign-in";
  const candidates = [input.next, input.redirect_url];

  for (const candidate of candidates) {
    const raw = Array.isArray(candidate) ? candidate[0] : candidate;
    if (!raw) continue;

    let path = raw.trim();
    try {
      if (path.startsWith("http://") || path.startsWith("https://")) {
        path = new URL(path).pathname + new URL(path).search;
      }
    } catch {
      continue;
    }

    if (path.startsWith("/") && !path.startsWith("//")) {
      return path;
    }
  }

  return fallback;
}
