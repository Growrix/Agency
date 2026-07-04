import "server-only";

import type { WishlistItemRecord } from "@/server/data/schema";
import { readDatabase, writeDatabase } from "@/server/data/store";

export type WishlistView = {
  items: WishlistItemRecord[];
  count: number;
};

function projectView(records: WishlistItemRecord[]): WishlistView {
  return { items: records, count: records.length };
}

export async function getWishlistForUser(userId: string): Promise<WishlistView> {
  const database = await readDatabase();
  const items = database.wishlist_items
    .filter((item) => item.user_id === userId)
    .sort((a, b) => (a.created_at > b.created_at ? -1 : 1));
  return projectView(items);
}

export async function addWishlistItem(userId: string, productSlug: string): Promise<WishlistView> {
  const slug = productSlug.trim();
  if (!slug) {
    return getWishlistForUser(userId);
  }

  await writeDatabase((next) => {
    const alreadyExists = next.wishlist_items.some(
      (item) => item.user_id === userId && item.product_slug === slug,
    );

    if (alreadyExists) {
      return next;
    }

    const record: WishlistItemRecord = {
      id: crypto.randomUUID(),
      user_id: userId,
      product_slug: slug,
      created_at: new Date().toISOString(),
    };

    return { ...next, wishlist_items: [record, ...next.wishlist_items] };
  });

  return getWishlistForUser(userId);
}

export async function removeWishlistItem(userId: string, productSlug: string): Promise<WishlistView> {
  const slug = productSlug.trim();

  await writeDatabase((next) => ({
    ...next,
    wishlist_items: next.wishlist_items.filter(
      (item) => !(item.user_id === userId && item.product_slug === slug),
    ),
  }));

  return getWishlistForUser(userId);
}

export async function clearWishlist(userId: string): Promise<WishlistView> {
  await writeDatabase((next) => ({
    ...next,
    wishlist_items: next.wishlist_items.filter((item) => item.user_id !== userId),
  }));

  return getWishlistForUser(userId);
}
