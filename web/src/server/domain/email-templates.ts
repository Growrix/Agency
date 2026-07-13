import "server-only";

import {
  DEFAULT_ADMIN_EMAIL_TEMPLATE_SETTINGS,
  type OrderCreatedEmailTemplateRecord,
  type OrderRecord,
} from "@/server/data/schema";
import { readDatabase, writeDatabase } from "@/server/data/store";
import { escapeHtml } from "@/server/domain/team-notifications";

const MAX_TEMPLATE_LENGTH = 20_000;

export const ORDER_EMAIL_TEMPLATE_VARIABLES = [
  "order_number",
  "customer_name",
  "customer_email",
  "customer_phone",
  "total_amount",
  "currency",
  "item_count",
  "items_text",
  "items_html",
  "notes",
] as const;

export type OrderEmailTemplateVariable = (typeof ORDER_EMAIL_TEMPLATE_VARIABLES)[number];

function normalizeTemplateString(value: unknown, fallback: string) {
  if (typeof value !== "string") {
    return fallback;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return fallback;
  }

  return trimmed.slice(0, MAX_TEMPLATE_LENGTH);
}

function normalizeTemplate(
  value: unknown,
  fallback: OrderCreatedEmailTemplateRecord,
): OrderCreatedEmailTemplateRecord {
  if (!value || typeof value !== "object") {
    return fallback;
  }

  const candidate = value as Partial<OrderCreatedEmailTemplateRecord>;
  return {
    subject: normalizeTemplateString(candidate.subject, fallback.subject),
    text: normalizeTemplateString(candidate.text, fallback.text),
    html: normalizeTemplateString(candidate.html, fallback.html),
  };
}

function renderTemplate(template: string, variables: Record<string, string>) {
  return template.replace(/{{\s*([a-z0-9_]+)\s*}}/gi, (_full, key: string) => {
    const normalized = key.toLowerCase();
    return Object.prototype.hasOwnProperty.call(variables, normalized)
      ? variables[normalized] ?? ""
      : "";
  });
}

export async function getOrderCreatedEmailTemplate(): Promise<OrderCreatedEmailTemplateRecord> {
  const database = await readDatabase();
  return normalizeTemplate(
    database.admin_email_templates?.order_created,
    DEFAULT_ADMIN_EMAIL_TEMPLATE_SETTINGS.order_created,
  );
}

export async function updateOrderCreatedEmailTemplate(
  input: Partial<OrderCreatedEmailTemplateRecord>,
): Promise<OrderCreatedEmailTemplateRecord> {
  const current = await getOrderCreatedEmailTemplate();
  const next: OrderCreatedEmailTemplateRecord = {
    subject: normalizeTemplateString(input.subject, current.subject),
    text: normalizeTemplateString(input.text, current.text),
    html: normalizeTemplateString(input.html, current.html),
  };

  await writeDatabase((database) => ({
    ...database,
    admin_email_templates: {
      order_created: next,
    },
  }));

  return next;
}

function formatItemsForText(order: OrderRecord) {
  if (order.items.length === 0) {
    return "- (no line items)";
  }

  return order.items
    .map((item) => {
      const tier = item.product_tier_name ? ` (${item.product_tier_name})` : "";
      const amount = (item.total_cents / 100).toFixed(2);
      return `- ${item.product_name}${tier} x${item.quantity} - ${amount} ${order.currency.toUpperCase()}`;
    })
    .join("\n");
}

function formatItemsForHtml(order: OrderRecord) {
  if (order.items.length === 0) {
    return "<li>(no line items)</li>";
  }

  return order.items
    .map((item) => {
      const tier = item.product_tier_name ? ` (${escapeHtml(item.product_tier_name)})` : "";
      const amount = (item.total_cents / 100).toFixed(2);
      return `<li>${escapeHtml(item.product_name)}${tier} x${item.quantity} - ${amount} ${escapeHtml(order.currency.toUpperCase())}</li>`;
    })
    .join("");
}

export async function buildOrderCreatedTeamEmail(order: OrderRecord) {
  const template = await getOrderCreatedEmailTemplate().catch(
    () => DEFAULT_ADMIN_EMAIL_TEMPLATE_SETTINGS.order_created,
  );

  const textVariables: Record<OrderEmailTemplateVariable, string> = {
    order_number: order.order_number,
    customer_name: order.customer_name || "N/A",
    customer_email: order.customer_email || "N/A",
    customer_phone: order.customer_phone || "N/A",
    total_amount: (order.total_cents / 100).toFixed(2),
    currency: order.currency.toUpperCase(),
    item_count: String(order.items.length),
    items_text: formatItemsForText(order),
    items_html: formatItemsForHtml(order),
    notes: order.notes?.trim() || "N/A",
  };

  const htmlVariables: Record<OrderEmailTemplateVariable, string> = {
    order_number: escapeHtml(textVariables.order_number),
    customer_name: escapeHtml(textVariables.customer_name),
    customer_email: escapeHtml(textVariables.customer_email),
    customer_phone: escapeHtml(textVariables.customer_phone),
    total_amount: escapeHtml(textVariables.total_amount),
    currency: escapeHtml(textVariables.currency),
    item_count: escapeHtml(textVariables.item_count),
    items_text: escapeHtml(textVariables.items_text),
    items_html: textVariables.items_html,
    notes: escapeHtml(textVariables.notes),
  };

  return {
    subject: renderTemplate(template.subject, textVariables),
    text: renderTemplate(template.text, textVariables),
    html: renderTemplate(template.html, htmlVariables),
  };
}
