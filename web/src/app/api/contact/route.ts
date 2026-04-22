import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const DEFAULT_FALLBACK_FROM_EMAIL = "Growrix <onboarding@resend.dev>";

export async function POST(req: NextRequest) {
  const body = await req.json() as {
    name?: string;
    email?: string;
    company?: string;
    service?: string;
    budget?: string;
    urgency?: string;
    message?: string;
  };

  const { name, email, company, service, budget, urgency, message } = body;

  // Basic validation
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!toEmail || !fromEmail) {
    console.error("CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL env var is missing.");
    return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
  }

  const html = `
    <h2>New Inquiry from Growrix Website</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      <tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
      ${company ? `<tr><td><strong>Company</strong></td><td>${escapeHtml(company)}</td></tr>` : ""}
      ${service ? `<tr><td><strong>Service interest</strong></td><td>${escapeHtml(service)}</td></tr>` : ""}
      ${budget ? `<tr><td><strong>Budget</strong></td><td>${escapeHtml(budget)}</td></tr>` : ""}
      ${urgency ? `<tr><td><strong>Urgency</strong></td><td>${escapeHtml(urgency)}</td></tr>` : ""}
      <tr><td><strong>Message</strong></td><td style="white-space:pre-wrap">${escapeHtml(message)}</td></tr>
    </table>
  `;

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    replyTo: email,
    subject: `New inquiry from ${name}${service ? ` — ${service}` : ""}`,
    html,
  });

  if (error && isUnverifiedDomainError(error)) {
    const fallbackFromEmail = process.env.CONTACT_FROM_FALLBACK_EMAIL ?? DEFAULT_FALLBACK_FROM_EMAIL;
    const retry = await resend.emails.send({
      from: fallbackFromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `New inquiry from ${name}${service ? ` — ${service}` : ""}`,
      html,
      headers: {
        "X-Original-From": fromEmail,
      },
    });

    if (!retry.error) {
      return NextResponse.json({ success: true, fallbackSenderUsed: true });
    }

    console.error("Resend fallback error:", retry.error);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isUnverifiedDomainError(error: { message?: string } | null | undefined): boolean {
  if (!error?.message) {
    return false;
  }

  return error.message.toLowerCase().includes("domain is not verified");
}
