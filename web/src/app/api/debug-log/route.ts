export const runtime = "edge";

/**
 * Temporary same-origin proxy for the session debug log server.
 * The browser can't POST directly to the debug server's port due to CORS,
 * so the page sends logs here and the server handler forwards them.
 */
export async function POST(request: Request) {
  let body: string;
  try {
    body = await request.text();
  } catch {
    return new Response(null, { status: 204 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2000);

  try {
    await fetch("http://127.0.0.1:7328/ingest/c06a946b-05ea-438d-ba8c-a4945e7e61e9", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "eb0f0e",
      },
      body,
      signal: controller.signal,
    });
  } catch {
    // no-op: debug logging must never block the page response
  } finally {
    clearTimeout(timeout);
  }

  return new Response(null, { status: 204 });
}
