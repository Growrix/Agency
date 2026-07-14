import "server-only";

import { getRuntimeConfig } from "@/server/config/runtime";

export const EMAIL_BRAND = {
  name: "Growrix OS",
  primary: "#2dd4bf",
  primaryDark: "#14b8a6",
  secondary: "#e8895a",
  background: "#f4f6f8",
  surface: "#ffffff",
  text: "#111827",
  textMuted: "#6b7280",
  border: "#e5e7eb",
  highlightBg: "#ecfdf5",
  highlightBorder: "#99f6e4",
  highlightText: "#0f766e",
  footerText: "#9ca3af",
} as const;

const DISPLAY_SENDER_NAME = EMAIL_BRAND.name;

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function formatMoneyCents(cents: number, currency: string = "USD"): string {
  const value = (cents / 100).toFixed(2);
  return `${currency} ${value}`;
}

export function formatEmailDate(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(parsed);
}

export function resolveTransactionalFromEmail(fromEmail?: string, fallbackFromEmail?: string): string | undefined {
  const candidate = fromEmail ?? fallbackFromEmail;
  if (!candidate) {
    return undefined;
  }

  const angleMatch = candidate.match(/^(.+?)\s*<([^>]+)>$/);
  if (angleMatch) {
    return `${DISPLAY_SENDER_NAME} <${angleMatch[2].trim()}>`;
  }

  return `${DISPLAY_SENDER_NAME} <${candidate.trim()}>`;
}

export function getTransactionalFromEmail(): string | undefined {
  const runtime = getRuntimeConfig();
  return resolveTransactionalFromEmail(runtime.contact.fromEmail, runtime.contact.fallbackFromEmail);
}

type BrandedEmailOptions = {
  preheader?: string;
  title: string;
  bodyHtml: string;
  logoUrl?: string;
};

export function buildHighlightedCallout(message: string): string {
  return `
    <div style="margin:20px 0;padding:14px 16px;background:${EMAIL_BRAND.highlightBg};border:1px solid ${EMAIL_BRAND.highlightBorder};border-radius:10px;">
      <p style="margin:0;font-size:14px;line-height:1.6;color:${EMAIL_BRAND.highlightText};font-weight:600;">
        ${escapeHtml(message)}
      </p>
    </div>
  `;
}

export function buildEmailButton(href: string, label: string): string {
  return `
    <table role="presentation" cellspacing="0" cellpadding="0" style="margin:24px 0 0 0;">
      <tr>
        <td style="border-radius:8px;background:${EMAIL_BRAND.primaryDark};">
          <a href="${href}" style="display:inline-block;padding:12px 20px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:8px;">
            ${escapeHtml(label)}
          </a>
        </td>
      </tr>
    </table>
  `;
}

export function buildBrandedEmailHtml(options: BrandedEmailOptions): string {
  const runtime = getRuntimeConfig();
  const logoUrl = options.logoUrl ?? `${runtime.appBaseUrl}/images/og/growrix-os-share.png`;
  const preheader = options.preheader
    ? `<span style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">${escapeHtml(options.preheader)}</span>`
    : "";

  return `
    ${preheader}
    <div style="margin:0;padding:24px 12px;background:${EMAIL_BRAND.background};font-family:Arial,Helvetica,sans-serif;color:${EMAIL_BRAND.text};">
      <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;max-width:640px;margin:0 auto;background:${EMAIL_BRAND.surface};border:1px solid ${EMAIL_BRAND.border};border-radius:16px;overflow:hidden;">
        <tr>
          <td style="padding:24px 28px;background:#0a0a0a;border-bottom:3px solid ${EMAIL_BRAND.primary};">
            <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;">
              <tr>
                <td>
                  <img src="${logoUrl}" alt="${escapeHtml(EMAIL_BRAND.name)}" width="140" height="36" style="display:block;height:32px;width:auto;max-width:140px;" />
                </td>
                <td style="text-align:right;vertical-align:middle;">
                  <span style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#9aa3b0;">${escapeHtml(EMAIL_BRAND.name)}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:28px;">
            <h1 style="margin:0 0 16px 0;font-size:22px;line-height:1.3;color:${EMAIL_BRAND.text};">${escapeHtml(options.title)}</h1>
            ${options.bodyHtml}
          </td>
        </tr>
        <tr>
          <td style="padding:20px 28px;background:#fafafa;border-top:1px solid ${EMAIL_BRAND.border};">
            <p style="margin:0 0 8px 0;font-size:12px;line-height:1.6;color:${EMAIL_BRAND.textMuted};">
              You are receiving this email because you placed an order or requested support from ${escapeHtml(EMAIL_BRAND.name)}.
            </p>
            <p style="margin:0;font-size:12px;line-height:1.6;color:${EMAIL_BRAND.footerText};">
              © ${new Date().getFullYear()} ${escapeHtml(EMAIL_BRAND.name)} · <a href="${runtime.appBaseUrl}" style="color:${EMAIL_BRAND.primaryDark};text-decoration:none;">Visit website</a>
            </p>
          </td>
        </tr>
      </table>
    </div>
  `;
}

export function buildDetailRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid ${EMAIL_BRAND.border};font-size:13px;color:${EMAIL_BRAND.textMuted};width:38%;">${escapeHtml(label)}</td>
      <td style="padding:10px 0;border-bottom:1px solid ${EMAIL_BRAND.border};font-size:14px;color:${EMAIL_BRAND.text};font-weight:600;text-align:right;">${value}</td>
    </tr>
  `;
}

export function buildDetailsTable(rowsHtml: string): string {
  return `
    <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;margin:16px 0 0 0;border-collapse:collapse;">
      ${rowsHtml}
    </table>
  `;
}
