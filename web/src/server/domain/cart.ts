import "server-only";

import type { CartItemRecord } from "@/server/data/schema";
import { readDatabase, writeDatabase } from "@/server/data/store";

export type CartItemInput = {
  product_slug: string;
  product_name: string;
  product_variant_slug?: string;
  product_tier_name?: string;
  fulfillment_type?: string;
  quantity: number;
  unit_price_cents: number;
};

export type CartView = {
  items: CartItemRecord[];
  subtotal_cents: number;
  item_count: number;
};

function getNow() {
  return new Date().toISOString();
}

function normalizeKeyPart(value: string | undefined) {
  return value?.trim() || "";
}

function matchKey(record: CartItemRecord, key: CartItemInput | Partial<CartItemRecord>) {
  return (
    record.product_slug === key.product_slug &&
    normalizeKeyPart(record.product_variant_slug) === normalizeKeyPart(key.product_variant_slug) &&
    normalizeKeyPart(record.product_tier_name) === normalizeKeyPart(key.product_tier_name)
  );
}

function projectView(records: CartItemRecord[]): CartView {
  const subtotal_cents = records.reduce(
    (sum, item) => sum + item.unit_price_cents * item.quantity,
    0,
  );
  const item_count = records.reduce((sum, item) => sum + item.quantity, 0);
  return { items: records, subtotal_cents, item_count };
}

function sanitizeQuantity(value: unknown): number {
  if (typeof value !== "number") return 0;
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.floor(value));
}

function buildRecord(userId: string, input: CartItemInput, existing?: CartItemRecord): CartItemRecord {
  return {
    id: existing?.id ?? crypto.randomUUID(),
    user_id: userId,
    product_slug: input.product_slug,
    product_name: input.product_name,
    product_variant_slug: input.product_variant_slug?.trim() || undefined,
    product_tier_name: input.product_tier_name?.trim() || undefined,
    fulfillment_type: input.fulfillment_type?.trim() || undefined,
    quantity: input.quantity,
    unit_price_cents: input.unit_price_cents,
    updated_at: getNow(),
  };
}

export async function getCartForUser(userId: string): Promise<CartView> {
  const database = await readDatabase();
  const items = database.cart_items
    .filter((item) => item.user_id === userId)
    .sort((a, b) => (a.updated_at > b.updated_at ? -1 : 1));
  return projectView(items);
}

export async function addCartItem(userId: string, input: CartItemInput): Promise<CartView> {
  const normalizedQuantity = Math.max(1, Math.floor(input.quantity));

  await writeDatabase((next) => {
    const existing = next.cart_items.find(
      (item) => item.user_id === userId && matchKey(item, input),
    );

    if (existing) {
      return {
        ...next,
        cart_items: next.cart_items.map((item) =>
          item.id === existing.id
            ? buildRecord(userId, {
                ...input,
                quantity: existing.quantity + normalizedQuantity,
              }, existing)
            : item,
        ),
      };
    }

    return {
      ...next,
      cart_items: [
        buildRecord(userId, { ...input, quantity: normalizedQuantity }),
        ...next.cart_items,
      ],
    };
  });

  return getCartForUser(userId);
}

export async function updateCartQuantity(
  userId: string,
  key: { product_slug: string; product_variant_slug?: string; product_tier_name?: string },
  quantity: number,
): Promise<CartView> {
  const normalized = sanitizeQuantity(quantity);

  await writeDatabase((next) => {
    if (normalized <= 0) {
      return {
        ...next,
        cart_items: next.cart_items.filter(
          (item) => !(item.user_id === userId && matchKey(item, key)),
        ),
      };
    }

    let found = false;
    const cart_items = next.cart_items.map((item) => {
      if (item.user_id === userId && matchKey(item, key)) {
        found = true;
        return { ...item, quantity: normalized, updated_at: getNow() };
      }
      return item;
    });

    if (!found) {
      return next;
    }

    return { ...next, cart_items };
  });

  return getCartForUser(userId);
}

export async function removeCartItem(
  userId: string,
  key: { product_slug: string; product_variant_slug?: string; product_tier_name?: string },
): Promise<CartView> {
  await writeDatabase((next) => ({
    ...next,
    cart_items: next.cart_items.filter(
      (item) => !(item.user_id === userId && matchKey(item, key)),
    ),
  }));

  return getCartForUser(userId);
}

export async function clearCart(userId: string): Promise<CartView> {
  await writeDatabase((next) => ({
    ...next,
    cart_items: next.cart_items.filter((item) => item.user_id !== userId),
  }));

  return getCartForUser(userId);
}

export async function replaceCart(
  userId: string,
  inputs: CartItemInput[],
): Promise<CartView> {
  const sanitized = inputs
    .map((input) => ({
      ...input,
      quantity: Math.max(0, Math.floor(input.quantity)),
    }))
    .filter((input) => input.quantity > 0);

  await writeDatabase((next) => {
    const others = next.cart_items.filter((item) => item.user_id !== userId);
    const records = sanitized.map((input) => buildRecord(userId, input));
    return { ...next, cart_items: [...records, ...others] };
  });

  return getCartForUser(userId);
}

export async function mergeLocalIntoServer(
  userId: string,
  localInputs: CartItemInput[],
): Promise<CartView> {
  if (localInputs.length === 0) {
    return getCartForUser(userId);
  }

  await writeDatabase((next) => {
    const otherUsers = next.cart_items.filter((item) => item.user_id !== userId);
    const serverItems = next.cart_items.filter((item) => item.user_id === userId);

    const merged = new Map<string, CartItemRecord>();
    for (const item of serverItems) {
      const key = `${item.product_slug}::${normalizeKeyPart(item.product_variant_slug)}::${normalizeKeyPart(item.product_tier_name)}`;
      merged.set(key, item);
    }

    for (const input of localInputs) {
      const normalizedQuantity = Math.max(1, Math.floor(input.quantity));
      const keyString = `${input.product_slug}::${normalizeKeyPart(input.product_variant_slug)}::${normalizeKeyPart(input.product_tier_name)}`;
      const existing = merged.get(keyString);
      merged.set(
        keyString,
        buildRecord(
          userId,
          {
            ...input,
            quantity: existing ? Math.max(existing.quantity, normalizedQuantity) : normalizedQuantity,
          },
          existing,
        ),
      );
    }

    return { ...next, cart_items: [...merged.values(), ...otherUsers] };
  });

  return getCartForUser(userId);
}
