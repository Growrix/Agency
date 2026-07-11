import { NextResponse } from "next/server";

const emailRegex = /.+@.+\..+/;

type FormKind = "contact" | "appointment" | "career" | "newsletter" | "quote" | "listing_inquiry";

type FormPayload = {
  kind: FormKind;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  service?: string;
  date?: string;
  time?: string;
  vehicle?: string;
};

function validate(payload: FormPayload) {
  const errors: string[] = [];

  if (!payload.kind) {
    errors.push("Form type is required.");
  }

  const email = payload.email?.trim() ?? "";
  if (!emailRegex.test(email)) {
    errors.push("Valid email is required.");
  }

  if (!payload.name?.trim()) {
    errors.push("Name is required.");
  }

  if (payload.kind === "appointment") {
    if (!payload.service?.trim()) {
      errors.push("Service is required.");
    }
    if (!payload.date?.trim()) {
      errors.push("Date is required.");
    }
    if (!payload.time?.trim()) {
      errors.push("Time is required.");
    }
  }

  if (payload.kind === "listing_inquiry" && !payload.vehicle?.trim()) {
    errors.push("Vehicle reference is required.");
  }

  return errors;
}

export async function POST(request: Request) {
  const payload = (await request.json()) as FormPayload;
  const errors = validate(payload);

  if (errors.length > 0) {
    return NextResponse.json(
      {
        ok: false,
        status: "validation_error",
        errors,
      },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    status: "not_configured",
    message:
      "Submission captured in frontend mode. Delivery integration is not configured yet. Connect email/CRM/webhook provider to move this to production candidate.",
  });
}
