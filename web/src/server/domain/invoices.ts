import "server-only";

import { ApiError } from "@/server/core/api";
import type { InvoiceRecord, OrderRecord, PaymentMethodType } from "@/server/data/schema";
import { readDatabase, writeDatabase } from "@/server/data/store";
import { safeSendInvoicePaymentEmail } from "@/server/domain/commerce-emails";
import { dispatchNotification } from "@/server/domain/notifications";
import { markOrderPaid } from "@/server/domain/orders";
import { recordAnalyticsEvent, recordAuditLog } from "@/server/logging/observability";

const SUPPORTED_METHODS: PaymentMethodType[] = ["card", "paypal", "stripe", "bank_transfer", "invoice"];

function normalizeMethod(method: PaymentMethodType | undefined): PaymentMethodType {
  if (!method) {
    return "invoice";
  }

  if (!SUPPORTED_METHODS.includes(method)) {
    return "invoice";
  }

  return method;
}

function buildInvoiceNumber() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const suffix = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `INV-${date}-${suffix}`;
}

function defaultPaymentInstructions(method: PaymentMethodType): string {
  switch (method) {
    case "bank_transfer":
      return "Pay via bank transfer and include your invoice number in the transfer reference. Reply with transfer proof for faster reconciliation.";
    case "paypal":
      return "Reply to this invoice email if you want a PayPal payment request link issued by the support team.";
    case "card":
    case "stripe":
      return "Card payment is available when Stripe checkout is enabled. Contact support if you need a manual card invoice link.";
    case "invoice":
    default:
      return "Complete payment using your preferred method (bank transfer, PayPal, or card request) and include this invoice number in your reply.";
  }
}

export async function getInvoiceById(invoiceId: string): Promise<InvoiceRecord | null> {
  const database = await readDatabase();
  return database.invoices.find((invoice) => invoice.id === invoiceId) ?? null;
}

export async function getInvoiceByOrder(orderId: string): Promise<InvoiceRecord | null> {
  const database = await readDatabase();
  return database.invoices.find((invoice) => invoice.order_id === orderId) ?? null;
}

export async function createInvoice(input: {
  order: OrderRecord;
  paymentMethod?: PaymentMethodType;
  paymentInstructions?: string;
  actorEmail?: string;
}): Promise<InvoiceRecord> {
  const existing = await getInvoiceByOrder(input.order.id);
  if (existing) {
    return existing;
  }

  const method = normalizeMethod(input.paymentMethod ?? input.order.payment_method_preference);
  const now = new Date().toISOString();
  const dueAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();

  const invoice: InvoiceRecord = {
    id: crypto.randomUUID(),
    order_id: input.order.id,
    invoice_number: buildInvoiceNumber(),
    customer_email: input.order.customer_email,
    amount_cents: input.order.total_cents,
    currency: input.order.currency,
    payment_method: method,
    payment_instructions: input.paymentInstructions?.trim() || defaultPaymentInstructions(method),
    status: "draft",
    due_at: dueAt,
    created_at: now,
    updated_at: now,
  };

  await writeDatabase((database) => ({
    ...database,
    invoices: [invoice, ...database.invoices],
    orders: database.orders.map((order) =>
      order.id === input.order.id
        ? {
            ...order,
            invoice_id: invoice.id,
            payment_method_preference: method,
          }
        : order,
    ),
  }));

  await recordAuditLog({
    level: "info",
    action: "invoice.created",
    actor_email: input.actorEmail,
    metadata: {
      invoice_id: invoice.id,
      invoice_number: invoice.invoice_number,
      order_id: input.order.id,
      payment_method: method,
      amount_cents: invoice.amount_cents,
    },
  });

  return invoice;
}

export async function sendInvoiceEmail(invoiceId: string, actorEmail?: string): Promise<{ invoice: InvoiceRecord; delivered: boolean }> {
  const existing = await getInvoiceById(invoiceId);
  if (!existing) {
    throw new ApiError("NOT_FOUND", 404, "Invoice not found.");
  }

  const database = await readDatabase();
  const order = database.orders.find((item) => item.id === existing.order_id);
  if (!order) {
    throw new ApiError("NOT_FOUND", 404, "Related order not found for invoice.");
  }

  const emailResult = await safeSendInvoicePaymentEmail(existing, order);
  const now = new Date().toISOString();

  let updatedInvoice: InvoiceRecord = existing;
  await writeDatabase((next) => ({
    ...next,
    invoices: next.invoices.map((invoice) => {
      if (invoice.id !== existing.id) {
        return invoice;
      }

      updatedInvoice = {
        ...invoice,
        status: invoice.status === "paid" ? "paid" : "sent",
        sent_at: now,
        updated_at: now,
      };
      return updatedInvoice;
    }),
  }));

  await recordAuditLog({
    level: "info",
    action: "invoice.sent",
    actor_email: actorEmail,
    metadata: {
      invoice_id: updatedInvoice.id,
      invoice_number: updatedInvoice.invoice_number,
      order_id: updatedInvoice.order_id,
      delivered: emailResult.delivered,
      skipped: Boolean(emailResult.skipped),
    },
  });

  await recordAnalyticsEvent({
    event_name: "invoice_sent",
    route: "/api/v1/admin/orders/[orderId]/invoice/send",
    source: "invoice",
    actor_email: actorEmail,
    metadata: {
      invoice_id: updatedInvoice.id,
      order_id: updatedInvoice.order_id,
      payment_method: updatedInvoice.payment_method,
      delivered: emailResult.delivered,
      skipped: Boolean(emailResult.skipped),
    },
  });

  try {
    await dispatchNotification({
      kind: "invoice_sent",
      title: `Invoice sent: ${updatedInvoice.invoice_number}`,
      payload: {
        invoice_id: updatedInvoice.id,
        invoice_number: updatedInvoice.invoice_number,
        order_id: updatedInvoice.order_id,
        customer_email: updatedInvoice.customer_email,
        amount_cents: updatedInvoice.amount_cents,
        delivered: emailResult.delivered,
      },
      relatedOrderId: updatedInvoice.order_id,
    });
  } catch {
    // Best effort notification dispatch.
  }

  return {
    invoice: updatedInvoice,
    delivered: emailResult.delivered,
  };
}

export async function sendOrCreateInvoiceForOrder(
  orderId: string,
  options?: {
    paymentMethod?: PaymentMethodType;
    paymentInstructions?: string;
    actorEmail?: string;
  },
): Promise<{ invoice: InvoiceRecord; delivered: boolean }> {
  const database = await readDatabase();
  const order = database.orders.find((item) => item.id === orderId);
  if (!order) {
    throw new ApiError("NOT_FOUND", 404, "Order not found.");
  }

  const invoice = await createInvoice({
    order,
    paymentMethod: options?.paymentMethod,
    paymentInstructions: options?.paymentInstructions,
    actorEmail: options?.actorEmail,
  });

  return await sendInvoiceEmail(invoice.id, options?.actorEmail);
}

export async function markInvoicePaid(
  invoiceId: string,
  options?: {
    actorEmail?: string;
    notes?: string;
  },
): Promise<{ invoice: InvoiceRecord; order: OrderRecord }> {
  const existing = await getInvoiceById(invoiceId);
  if (!existing) {
    throw new ApiError("NOT_FOUND", 404, "Invoice not found.");
  }

  const now = new Date().toISOString();
  let updatedInvoice: InvoiceRecord = existing;
  await writeDatabase((database) => ({
    ...database,
    invoices: database.invoices.map((invoice) => {
      if (invoice.id !== invoiceId) {
        return invoice;
      }

      updatedInvoice = {
        ...invoice,
        status: "paid",
        paid_at: now,
        notes: options?.notes?.trim() || invoice.notes,
        updated_at: now,
      };

      return updatedInvoice;
    }),
  }));

  const paidOrder = await markOrderPaid(updatedInvoice.order_id);
  if (!paidOrder) {
    throw new ApiError("NOT_FOUND", 404, "Order not found for invoice.");
  }

  await recordAuditLog({
    level: "info",
    action: "invoice.paid",
    actor_email: options?.actorEmail,
    metadata: {
      invoice_id: updatedInvoice.id,
      invoice_number: updatedInvoice.invoice_number,
      order_id: updatedInvoice.order_id,
    },
  });

  await recordAnalyticsEvent({
    event_name: "invoice_paid",
    route: "/api/v1/admin/orders/[orderId]/invoice/paid",
    source: "invoice",
    actor_email: options?.actorEmail,
    metadata: {
      invoice_id: updatedInvoice.id,
      order_id: updatedInvoice.order_id,
      amount_cents: updatedInvoice.amount_cents,
    },
  });

  try {
    await dispatchNotification({
      kind: "invoice_paid",
      title: `Invoice paid: ${updatedInvoice.invoice_number}`,
      payload: {
        invoice_id: updatedInvoice.id,
        invoice_number: updatedInvoice.invoice_number,
        order_id: updatedInvoice.order_id,
        customer_email: updatedInvoice.customer_email,
        amount_cents: updatedInvoice.amount_cents,
      },
      relatedOrderId: updatedInvoice.order_id,
    });
  } catch {
    // Best effort notification dispatch.
  }

  return {
    invoice: updatedInvoice,
    order: paidOrder,
  };
}

export async function markInvoicePaidForOrder(
  orderId: string,
  options?: {
    actorEmail?: string;
    notes?: string;
  },
): Promise<{ invoice: InvoiceRecord; order: OrderRecord }> {
  const invoice = await getInvoiceByOrder(orderId);
  if (!invoice) {
    throw new ApiError("NOT_FOUND", 404, "Invoice not found for order.");
  }

  return await markInvoicePaid(invoice.id, options);
}
