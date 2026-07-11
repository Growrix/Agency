import "server-only";

import { Resend } from "resend";
import { getRuntimeConfig } from "@/server/config/runtime";
import type { InvoiceRecord, OrderRecord, ServiceRequestRecord } from "@/server/data/schema";
import { recordAuditLog } from "@/server/logging/observability";

type EmailResult = { delivered: boolean; skipped?: boolean };

const EMAIL_DELIVERY_TIMEOUT_MS = 5_000;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatMoneyCents(cents: number, currency: string = "USD"): string {
  const value = (cents / 100).toFixed(2);
  return `${currency} ${value}`;
}

function getResendClient() {
  const runtime = getRuntimeConfig();
  if (!runtime.contact.resendApiKey || !runtime.contact.fromEmail) {
    return null;
  }

  return {
    runtime,
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

function buildOrderItemsHtml(order: OrderRecord): string {
  const rows = order.items
    .map((item) => {
      const tier = item.product_tier_name ? ` — ${escapeHtml(item.product_tier_name)}` : "";
      const variant = item.product_variant_slug ? ` <small style="opacity:0.7">(${escapeHtml(item.product_variant_slug)})</small>` : "";
      return `<tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb">${escapeHtml(item.product_name)}${tier}${variant}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right">${item.quantity}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right">${formatMoneyCents(item.total_cents, order.currency)}</td>
      </tr>`;
    })
    .join("");

  return `<table cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;font-family:sans-serif;font-size:14px">
    <thead>
      <tr style="background:#f9fafb">
        <th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e5e7eb">Item</th>
        <th style="padding:8px 12px;text-align:right;border-bottom:1px solid #e5e7eb">Qty</th>
        <th style="padding:8px 12px;text-align:right;border-bottom:1px solid #e5e7eb">Total</th>
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

  const { runtime, client } = resolved;
  const dashboardUrl = `${runtime.appBaseUrl}/dashboard/orders`;
  const subject = `Order confirmed: ${order.order_number}`;
  const html = `
    <div style="font-family:sans-serif;font-size:14px;color:#111827">
      <h2 style="margin:0 0 12px 0">Thanks for your purchase, ${escapeHtml(order.customer_name)}!</h2>
      <p style="margin:0 0 16px 0">We've received your payment for order <strong>${escapeHtml(order.order_number)}</strong>. You can review your order and access downloads anytime from your dashboard.</p>
      ${buildOrderItemsHtml(order)}
      <p style="margin:16px 0 0 0"><strong>Total:</strong> ${formatMoneyCents(order.total_cents, order.currency)}</p>
      <p style="margin:24px 0 0 0">
        <a href="${dashboardUrl}" style="display:inline-block;padding:10px 16px;background:#111827;color:#ffffff;text-decoration:none;border-radius:6px">View order in dashboard</a>
      </p>
      <p style="margin:24px 0 0 0;color:#6b7280">Reply to this email if anything looks off and we'll fix it fast.</p>
    </div>
  `;

  const send = withTimeout(
    client.emails.send({
      from: runtime.contact.fromEmail!,
      to: [order.customer_email],
      replyTo: runtime.contact.toEmail,
      subject,
      html,
    }),
    { error: { name: "EmailTimeout", message: "Send timed out" } } as unknown as Awaited<ReturnType<typeof client.emails.send>>,
  );

  const result = await send;
  return { delivered: !result.error };
}

export async function sendDownloadReadyEmail(order: OrderRecord): Promise<EmailResult> {
  const resolved = getResendClient();
  if (!resolved) {
    return { delivered: false, skipped: true };
  }

  const { runtime, client } = resolved;
  const downloadsUrl = `${runtime.appBaseUrl}/dashboard/downloads`;
  const subject = `Your download is ready: ${order.order_number}`;
  const html = `
    <div style="font-family:sans-serif;font-size:14px;color:#111827">
      <h2 style="margin:0 0 12px 0">Your files are ready, ${escapeHtml(order.customer_name)}.</h2>
      <p style="margin:0 0 16px 0">Order <strong>${escapeHtml(order.order_number)}</strong> has been delivered. Sign in to your dashboard to access your downloads with secure, owner-only links.</p>
      <p style="margin:24px 0 0 0">
        <a href="${downloadsUrl}" style="display:inline-block;padding:10px 16px;background:#111827;color:#ffffff;text-decoration:none;border-radius:6px">Open my downloads</a>
      </p>
      <p style="margin:24px 0 0 0;color:#6b7280">Download links are authorized to your account and may expire. If you run into trouble, just reply to this email.</p>
    </div>
  `;

  const send = withTimeout(
    client.emails.send({
      from: runtime.contact.fromEmail!,
      to: [order.customer_email],
      replyTo: runtime.contact.toEmail,
      subject,
      html,
    }),
    { error: { name: "EmailTimeout", message: "Send timed out" } } as unknown as Awaited<ReturnType<typeof client.emails.send>>,
  );

  const result = await send;
  return { delivered: !result.error };
}

export async function sendServiceRequestConfirmationEmail(record: ServiceRequestRecord): Promise<EmailResult> {
  const resolved = getResendClient();
  if (!resolved) {
    return { delivered: false, skipped: true };
  }

  const { runtime, client } = resolved;
  const supportUrl = `${runtime.appBaseUrl}/dashboard/support`;
  const subject = `We received your request: ${record.request_number}`;
  const productLine = record.product_name
    ? `<p style="margin:0 0 8px 0"><strong>Product:</strong> ${escapeHtml(record.product_name)}${record.variant_tier_name ? ` — ${escapeHtml(record.variant_tier_name)}` : ""}</p>`
    : "";
  const budgetLine = record.budget ? `<p style="margin:0 0 8px 0"><strong>Budget:</strong> ${escapeHtml(record.budget)}</p>` : "";
  const timelineLine = record.timeline ? `<p style="margin:0 0 8px 0"><strong>Timeline:</strong> ${escapeHtml(record.timeline)}</p>` : "";

  const html = `
    <div style="font-family:sans-serif;font-size:14px;color:#111827">
      <h2 style="margin:0 0 12px 0">Thanks, ${escapeHtml(record.customer_name)}.</h2>
      <p style="margin:0 0 16px 0">We've received your service request <strong>${escapeHtml(record.request_number)}</strong>. Our team will review the brief and respond within one business day.</p>
      ${productLine}${budgetLine}${timelineLine}
      <div style="margin:16px 0;padding:12px;background:#f9fafb;border-radius:6px;white-space:pre-wrap">${escapeHtml(record.brief)}</div>
      <p style="margin:24px 0 0 0">
        <a href="${supportUrl}" style="display:inline-block;padding:10px 16px;background:#111827;color:#ffffff;text-decoration:none;border-radius:6px">Track this request</a>
      </p>
    </div>
  `;

  const send = withTimeout(
    client.emails.send({
      from: runtime.contact.fromEmail!,
      to: [record.customer_email],
      replyTo: runtime.contact.toEmail,
      subject,
      html,
    }),
    { error: { name: "EmailTimeout", message: "Send timed out" } } as unknown as Awaited<ReturnType<typeof client.emails.send>>,
  );

  const result = await send;
  return { delivered: !result.error };
}

export async function sendInvoicePaymentEmail(invoice: InvoiceRecord, order: OrderRecord): Promise<EmailResult> {
  const resolved = getResendClient();
  if (!resolved) {
    return { delivered: false, skipped: true };
  }

  const { runtime, client } = resolved;
  const dashboardUrl = `${runtime.appBaseUrl}/dashboard/orders/${order.id}`;
  const subject = `Invoice ${invoice.invoice_number} for order ${order.order_number}`;
  const html = `
    <div style="font-family:sans-serif;font-size:14px;color:#111827">
      <h2 style="margin:0 0 12px 0">Payment invoice ready</h2>
      <p style="margin:0 0 10px 0">Invoice <strong>${escapeHtml(invoice.invoice_number)}</strong> is now available for order <strong>${escapeHtml(order.order_number)}</strong>.</p>
      <p style="margin:0 0 10px 0"><strong>Amount due:</strong> ${formatMoneyCents(invoice.amount_cents, invoice.currency)}</p>
      <p style="margin:0 0 10px 0"><strong>Payment method:</strong> ${escapeHtml(invoice.payment_method)}</p>
      <p style="margin:0 0 10px 0"><strong>Due date:</strong> ${escapeHtml(invoice.due_at)}</p>
      <div style="margin:16px 0;padding:12px;background:#f9fafb;border-radius:6px;white-space:pre-wrap">${escapeHtml(invoice.payment_instructions)}</div>
      <p style="margin:24px 0 0 0">
        <a href="${dashboardUrl}" style="display:inline-block;padding:10px 16px;background:#111827;color:#ffffff;text-decoration:none;border-radius:6px">Open order dashboard</a>
      </p>
    </div>
  `;

  const send = withTimeout(
    client.emails.send({
      from: runtime.contact.fromEmail!,
      to: [invoice.customer_email],
      replyTo: runtime.contact.toEmail,
      subject,
      html,
    }),
    { error: { name: "EmailTimeout", message: "Send timed out" } } as unknown as Awaited<ReturnType<typeof client.emails.send>>,
  );

  const result = await send;
  return { delivered: !result.error };
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
