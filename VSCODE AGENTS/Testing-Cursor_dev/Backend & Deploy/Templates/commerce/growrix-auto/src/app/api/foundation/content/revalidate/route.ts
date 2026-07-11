import { fallbackRevalidate } from "@/lib/foundation/fallback";
import { errorEnvelope, proxyMutation, successEnvelope } from "@/lib/foundation/server";

export async function POST(request: Request) {
  const body = await request.text();

  return proxyMutation(
    "/api/content/revalidate",
    successEnvelope(fallbackRevalidate),
    202,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-foundation-signature": request.headers.get("x-foundation-signature") ?? "",
      },
      body,
    },
  );
}

export async function GET() {
  return Response.json(
    errorEnvelope(
      "METHOD_NOT_ALLOWED",
      "Use POST to trigger revalidation.",
    ),
    { status: 405 },
  );
}
