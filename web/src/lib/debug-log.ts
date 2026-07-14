type DebugLogData = Record<string, unknown> | null | undefined;

/**
 * Temporary runtime debug helper. Sends a lightweight JSON log to the session
 * debug server via navigator.sendBeacon, which avoids CORS/response handling
 * issues that can block a regular fetch from the browser.
 */
export function sendDebugLog(
  location: string,
  message: string,
  data: DebugLogData,
  hypothesisId: string,
) {
  if (typeof navigator === "undefined" || !navigator.sendBeacon) {
    return;
  }

  try {
    const payload = {
      sessionId: "eb0f0e",
      id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      timestamp: Date.now(),
      location,
      message,
      data: data ?? {},
      runId: "debug-run",
      hypothesisId,
    };

    navigator.sendBeacon(
      "/api/debug-log",
      new Blob([JSON.stringify(payload)], { type: "application/json" }),
    );
  } catch {
    /* no-op: debug logging must never break the app */
  }

  // Mirror to the browser console as a fallback when the network log path is blocked.
  console.log(`[DEBUG ${hypothesisId}] ${location} | ${message}`, data ?? {});
}
