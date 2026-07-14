import "server-only";

import { Resend } from "resend";
import { getRuntimeConfig } from "@/server/config/runtime";
import type { InvoiceRecord, OrderRecord, ServiceRequestRecord } from "@/server/data/schema";
import {
  buildBrandedEmailHtml,
  buildDetailRow,
  buildDetailsTable,
  buildEmailButton,
  buildHighlightedCallout,
  EMAIL_BRAND,
  escapeHtml,
  formatEmailDate,
  formatMoneyCents,
  getTransactionalFromEmail,
} from "@/server/domain/email-layout";
import { recordAuditLog } from "@/server/logging/observability";

type EmailResult = { delivered: boolean; skipped?: boolean };

const EMAIL_DELIVERY_TIMEOUT_MS = 5_000;
const TEAM_CONTACT_CALLOUT = "Our team will contact you soon for further procedures.";

function getResendClient() {
  const runtime = getRuntimeConfig();
  const fromEmail = getTransactionalFromEmail();
  if (!runtime.contact.resendApiKey || !fromEmail) {
    return null;
  }

  return {
    runtime,
    fromEmail,
    client: new Resend(runtime.contact.resendApiKey),
  };
}

async function withTimeout<T>(promise: Promise<T>, fallback: T): Promise<T> {
  return await Promise.race([
    promise,
    new Promise<T>((resolve) => {
      setTimeout(() => resolve(fallback), EMAIL_DELIVERY_TIMEOUT_MS);
    }),
  ]);
}

async function sendTransactionalEmail(input: {
  to: string[];
  subject: string;
  html: string;
  text?: string;
}): Promise<EmailResult> {
  const resolved = getResendClient();
  if (!resolved) {
    return { delivered: false, skipped: true };
  }

  const { runtime, fromEmail, client } = resolved;
  const send = withTimeout(
    client.emails.send({
      from: fromEmail,
      to: input.to,
      replyTo: runtime.contact.toEmail,
      subject: input.subject,
      html: input.html,
      ...(input.text ? { text: input.text } : {}),
    }),
    { error: { name: "EmailTimeout", message: "Send timed out" } } as unknown as Awaited<ReturnType<typeof client.emails.send>>,
  );

  const result = await send;
  return { delivered: !result.error };
}

function buildOrderItemsHtml(order: OrderRecord): string {
  const rows = order.items
    .map((item) => {
      const tier = item.product_tier_name ? ` — ${escapeHtml(item.product_tier_name)}` : "";
      const variant = item.product_variant_slug
        ? ` <small style="opacity:0.7">(${escapeHtml(item.product_variant_slug)})</small>`
        : "";
      return `<tr>
        <td style="padding:10px 12px;border-bottom:1px solid ${EMAIL_BRAND.border};font-size:14px;color:${EMAIL_BRAND.text};">${escapeHtml(item.product_name)}${tier}${variant}</td>
        <td style="padding:10px 12px;border-bottom:1px solid ${EMAIL_BRAND.border};font-size:14px;color:${EMAIL_BRAND.text};text-align:right;">${item.quantity}</td>
        <td style="padding:10px 12px;border-bottom:1px solid ${EMAIL_BRAND.border};font-size:14px;color:${EMAIL_BRAND.text};text-align:right;font-weight:600;">${formatMoneyCents(item.total_cents, order.currency)}</td>
      </tr>`;
    })
    .join("");

  return `<table cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;margin-top:16px;">
    <thead>
      <tr style="background:#f9fafb">
        <th style="padding:10px 12px;text-align:left;border-bottom:1px solid ${EMAIL_BRAND.border};font-size:12px;text-transform:uppercase;letter-spacing:0.04em;color:${EMAIL_BRAND.textMuted};">Item</th>
        <th style="padding:10px 12px;text-align:right;border-bottom:1px solid ${EMAIL_BRAND.border};font-size:12px;text-transform:uppercase;letter-spacing:0.04em;color:${EMAIL_BRAND.textMuted};">Qty</th>
        <th style="padding:10px 12px;text-align:right;border-bottom:1px solid ${EMAIL_BRAND.border};font-size:12px;text-transform:uppercase;letter-spacing:0.04em;color:${EMAIL_BRAND.textMuted};">Total</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>`;
}

export async function sendPurchaseConfirmationEmail(order: OrderRecord): Promise<EmailResult> {
  const resolved = getResendClient();
  if (!resolved) {
    return { delivered: false, skipped: true };
  }

  const { runtime } = resolved;
  const dashboardUrl = `${runtime.appBaseUrl}/dashboard/orders/${order.id}`;
  const subject = `Order confirmed: ${order.order_number}`;
  const bodyHtml = `
    <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:${EMAIL_BRAND.text};">
      Thanks for your purchase, <strong>${escapeHtml(order.customer_name)}</strong>! We&apos;ve received your payment for order
      <strong>${escapeHtml(order.order_number)}</strong>.
    </p>
    ${buildHighlightedCallout(TEAM_CONTACT_CALLOUT)}
    ${buildOrderItemsHtml(order)}
    <p style="margin:18px 0 0 0;font-size:15px;color:${EMAIL_BRAND.text};"><strong>Total paid:</strong> ${formatMoneyCents(order.total_cents, order.currency)}</p>
    ${buildEmailButton(dashboardUrl, "View order in dashboard")}
    <p style="margin:24px 0 0 0;font-size:13px;line-height:1.6;color:${EMAIL_BRAND.textMuted};">
      Reply to this email if anything looks off and we&apos;ll fix it fast.
    </p>
  `;

  const html = buildBrandedEmailHtml({
    preheader: `Payment received for order ${order.order_number}. ${TEAM_CONTACT_CALLOUT}`,
    title: "Order confirmed",
    bodyHtml,
  });

  return sendTransactionalEmail({
    to: [order.customer_email],
    subject,
    html,
    text: [
      `Thanks for your purchase, ${order.customer_name}!`,
      `Order: ${order.order_number}`,
      TEAM_CONTACT_CALLOUT,
      `Total paid: ${formatMoneyCents(order.total_cents, order.currency)}`,
      `View your order: ${dashboardUrl}`,
    ].join("\n"),
  });
}

export async function sendDownloadReadyEmail(order: OrderRecord): Promise<EmailResult> {
  const resolved = getResendClient();
  if (!resolved) {
    return { delivered: false, skipped: true };
  }

  const { runtime } = resolved;
  const downloadsUrl = `${runtime.appBaseUrl}/dashboard/downloads`;
  const subject = `Your download is ready: ${order.order_number}`;
  const bodyHtml = `
    <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:${EMAIL_BRAND.text};">
      Your files are ready, <strong>${escapeHtml(order.customer_name)}</strong>. Order
      <strong>${escapeHtml(order.order_number)}</strong> has been delivered.
    </p>
    <p style="margin:0;font-size:14px;line-height:1.6;color:${EMAIL_BRAND.textMuted};">
      Sign in to your dashboard to access secure, owner-only download links.
    </p>
    ${buildEmailButton(downloadsUrl, "Open my downloads")}
    <p style="margin:24px 0 0 0;font-size:13px;line-height:1.6;color:${EMAIL_BRAND.textMuted};">
      Download links are authorized to your account and may expire. Reply to this email if you need help.
    </p>
  `;

  const html = buildBrandedEmailHtml({
    preheader: `Downloads are ready for order ${order.order_number}.`,
    title: "Your downloads are ready",
    bodyHtml,
  });

  return sendTransactionalEmail({
    to: [order.customer_email],
    subject,
    html,
  });
}

export async function sendServiceRequestConfirmationEmail(record: ServiceRequestRecord): Promise<EmailResult> {
  const resolved = getResendClient();
  if (!resolved) {
    return { delivered: false, skipped: true };
  }

  const { runtime } = resolved;
  const supportUrl = `${runtime.appBaseUrl}/dashboard/support`;
  const subject = `We received your request: ${record.request_number}`;
  const productLine = record.product_name
    ? buildDetailRow("Product", `${escapeHtml(record.product_name)}${record.variant_tier_name ? ` — ${escapeHtml(record.variant_tier_name)}` : ""}`)
    : "";
  const budgetLine = record.budget ? buildDetailRow("Budget", escapeHtml(record.budget)) : "";
  const timelineLine = record.timeline ? buildDetailRow("Timeline", escapeHtml(record.timeline)) : "";

  const bodyHtml = `
    <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:${EMAIL_BRAND.text};">
      Thanks, <strong>${escapeHtml(record.customer_name)}</strong>. We&apos;ve received your service request
      <strong>${escapeHtml(record.request_number)}</strong>.
    </p>
    ${buildHighlightedCallout(TEAM_CONTACT_CALLOUT)}
    ${buildDetailsTable(`${productLine}${budgetLine}${timelineLine}`)}
    <div style="margin:18px 0 0 0;padding:14px 16px;background:#f9fafb;border:1px solid ${EMAIL_BRAND.border};border-radius:10px;white-space:pre-wrap;font-size:14px;line-height:1.6;color:${EMAIL_BRAND.text};">${escapeHtml(record.brief)}</div>
    ${buildEmailButton(supportUrl, "Track this request")}
  `;

  const html = buildBrandedEmailHtml({
    preheader: `Service request ${record.request_number} received.`,
    title: "Request received",
    bodyHtml,
  });

  return sendTransactionalEmail({
    to: [record.customer_email],
    subject,
    html,
  });
}

export async function sendInvoicePaymentEmail(invoice: InvoiceRecord, order: OrderRecord): Promise<EmailResult> {
  const resolved = getResendClient();
  if (!resolved) {
    return { delivered: false, skipped: true };
  }

  const { runtime } = resolved;
  const dashboardUrl = `${runtime.appBaseUrl}/dashboard/orders/${order.id}`;
  const catalogUrl = `${runtime.appBaseUrl}/digital-products`;
  const contactUrl = `${runtime.appBaseUrl}/contact`;
  const subject = `Invoice ${invoice.invoice_number} for order ${order.order_number}`;
  const bodyHtml = `
    <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:${EMAIL_BRAND.text};">
      Hi <strong>${escapeHtml(order.customer_name)}</strong>, your invoice is ready for order
      <strong>${escapeHtml(order.order_number)}</strong>.
    </p>
    ${buildHighlightedCallout(TEAM_CONTACT_CALLOUT)}
    ${buildDetailsTable(
      [
        buildDetailRow("Invoice number", escapeHtml(invoice.invoice_number)),
        buildDetailRow("Order number", escapeHtml(order.order_number)),
        buildDetailRow("Amount due", formatMoneyCents(invoice.amount_cents, invoice.currency)),
        buildDetailRow("Payment method", escapeHtml(invoice.payment_method.replace(/_/g, " "))),
        buildDetailRow("Due date", escapeHtml(formatEmailDate(invoice.due_at))),
      ].join(""),
    )}
    <div style="margin:20px 0 0 0;padding:16px;background:#f9fafb;border:1px solid ${EMAIL_BRAND.border};border-radius:10px;">
      <p style="margin:0 0 8px 0;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${EMAIL_BRAND.textMuted};">Payment instructions</p>
      <p style="margin:0;font-size:14px;line-height:1.7;color:${EMAIL_BRAND.text};white-space:pre-wrap;">${escapeHtml(invoice.payment_instructions)}</p>
    </div>
    ${buildOrderItemsHtml(order)}
    ${buildEmailButton(dashboardUrl, "Open order dashboard")}
    <p style="margin:24px 0 0 0;font-size:13px;line-height:1.6;color:${EMAIL_BRAND.textMuted};">
      Need help completing payment? Reply to this email and our team will assist you.
    </p>
  `;

  const html = buildBrandedEmailHtml({
    preheader: `Invoice ${invoice.invoice_number} is ready. ${TEAM_CONTACT_CALLOUT}`,
    title: "Payment invoice ready",
    bodyHtml,
  });

  return sendTransactionalEmail({
    to: [invoice.customer_email],
    subject,
    html,
    text: [
      `Invoice ${invoice.invoice_number} for order ${order.order_number}`,
      TEAM_CONTACT_CALLOUT,
      `Amount due: ${formatMoneyCents(invoice.amount_cents, invoice.currency)}`,
      `Due date: ${formatEmailDate(invoice.due_at)}`,
      invoice.payment_instructions,
      `Open order dashboard: ${dashboardUrl}`,
      `Browse products: ${catalogUrl}`,
      `Contact us: ${contactUrl}`,
    ].join("\n"),
  });
}

export async function sendOrderCancellationEmail(order: OrderRecord): Promise<EmailResult> {
  const resolved = getResendClient();
  if (!resolved) {
    return { delivered: false, skipped: true };
  }

  const { runtime } = resolved;
  const catalogUrl = `${runtime.appBaseUrl}/digital-products`;
  const contactUrl = `${runtime.appBaseUrl}/contact`;
  const dashboardUrl = `${runtime.appBaseUrl}/dashboard/orders/${order.id}`;
  const subject = `Order cancelled: ${order.order_number}`;

  const bodyHtml = `
    <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:${EMAIL_BRAND.text};">
      Hi <strong>${escapeHtml(order.customer_name)}</strong>, your order
      <strong>${escapeHtml(order.order_number)}</strong> has been cancelled as requested.
    </p>
    <div style="margin:0 0 16px 0;padding:14px 16px;background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;">
      <p style="margin:0;font-size:14px;line-height:1.7;color:#9a3412;">
        We&apos;re sorry to see this order go. If your plans changed, you can still explore our catalog or book a quick consultation and we&apos;ll help you choose the right product or service.
      </p>
    </div>
    ${buildDetailsTable(
      [
        buildDetailRow("Order number", escapeHtml(order.order_number)),
        buildDetailRow("Status", "Cancelled"),
        buildDetailRow("Original total", formatMoneyCents(order.total_cents, order.currency)),
      ].join(""),
    )}
    ${buildEmailButton(catalogUrl, "Browse products")}
    <p style="margin:16px 0 0 0;font-size:14px;line-height:1.6;color:${EMAIL_BRAND.textMuted};">
      Prefer to talk it through? <a href="${contactUrl}" style="color:${EMAIL_BRAND.primaryDark};text-decoration:none;font-weight:600;">Consult with our team</a>
      or review your order history in the <a href="${dashboardUrl}" style="color:${EMAIL_BRAND.primaryDark};text-decoration:none;font-weight:600;">dashboard</a>.
    </p>
  `;

  const html = buildBrandedEmailHtml({
    preheader: `Order ${order.order_number} was cancelled. Browse products or consult with our team anytime.`,
    title: "Order cancelled",
    bodyHtml,
  });

  return sendTransactionalEmail({
    to: [order.customer_email],
    subject,
    html,
    text: [
      `Hi ${order.customer_name},`,
      `Your order ${order.order_number} has been cancelled as requested.`,
      "We're sorry to see this order go. If your plans changed, browse our catalog or consult with our team:",
      `Browse products: ${catalogUrl}`,
      `Consult with us: ${contactUrl}`,
      `Order dashboard: ${dashboardUrl}`,
    ].join("\n"),
  });
}

export async function safeSendPurchaseConfirmationEmail(order: OrderRecord): Promise<EmailResult> {
  try {
    return await sendPurchaseConfirmationEmail(order);
  } catch (error) {
    await recordAuditLog({
      level: "warning",
      action: "order.email_purchase_failed",
      actor_email: order.customer_email,
      metadata: {
        order_id: order.id,
        message: error instanceof Error ? error.message : "Unknown error",
      },
    });
    return { delivered: false };
  }
}

export async function safeSendDownloadReadyEmail(order: OrderRecord): Promise<EmailResult> {
  try {
    return await sendDownloadReadyEmail(order);
  } catch (error) {
    await recordAuditLog({
      level: "warning",
      action: "order.email_download_failed",
      actor_email: order.customer_email,
      metadata: {
        order_id: order.id,
        message: error instanceof Error ? error.message : "Unknown error",
      },
    });
    return { delivered: false };
  }
}

export async function safeSendServiceRequestConfirmationEmail(
  record: ServiceRequestRecord,
): Promise<EmailResult> {
  try {
    return await sendServiceRequestConfirmationEmail(record);
  } catch (error) {
    await recordAuditLog({
      level: "warning",
      action: "service_request.email_confirmation_failed",
      actor_email: record.customer_email,
      metadata: {
        service_request_id: record.id,
        message: error instanceof Error ? error.message : "Unknown error",
      },
    });
    return { delivered: false };
  }
}

export async function safeSendInvoicePaymentEmail(
  invoice: InvoiceRecord,
  order: OrderRecord,
): Promise<EmailResult> {
  try {
    return await sendInvoicePaymentEmail(invoice, order);
  } catch (error) {
    await recordAuditLog({
      level: "warning",
      action: "invoice.email_send_failed",
      actor_email: invoice.customer_email,
      metadata: {
        invoice_id: invoice.id,
        order_id: order.id,
        message: error instanceof Error ? error.message : "Unknown error",
      },
    });
    return { delivered: false };
  }
}

export async function safeSendOrderCancellationEmail(order: OrderRecord): Promise<EmailResult> {
  try {
    return await sendOrderCancellationEmail(order);
  } catch (error) {
    await recordAuditLog({
      level: "warning",
      action: "order.email_cancellation_failed",
      actor_email: order.customer_email,
      metadata: {
        order_id: order.id,
        message: error instanceof Error ? error.message : "Unknown error",
      },
    });
    return { delivered: false };
  }
}
