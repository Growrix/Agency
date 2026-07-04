"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button, LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";

type WishlistItem = {
  id: string;
  product_slug: string;
  created_at: string;
};

type ProductBrief = {
  slug: string;
  name: string;
  price?: string;
  teaser?: string;
  image?: { src: string; alt: string } | null;
};

type WishlistEntry = WishlistItem & {
  product?: ProductBrief;
};

async function fetchWishlist(): Promise<WishlistItem[]> {
  const response = await fetch("/api/v1/me/wishlist", { credentials: "same-origin" });
  if (!response.ok) {
    throw new Error("Unable to load wishlist.");
  }
  const payload = (await response.json()) as { data?: { items?: WishlistItem[] } };
  return payload.data?.items ?? [];
}

async function fetchProduct(slug: string): Promise<ProductBrief | undefined> {
  try {
    const response = await fetch(`/api/v1/shop/products/${encodeURIComponent(slug)}`);
    if (!response.ok) return undefined;
    const payload = (await response.json()) as { data?: ProductBrief };
    return payload.data;
  } catch {
    return undefined;
  }
}

export function WishlistSurface() {
  const [entries, setEntries] = useState<WishlistEntry[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    void (async () => {
      try {
        const items = await fetchWishlist();
        if (!active) return;
        setEntries(items.map((item) => ({ ...item })));
        const enriched = await Promise.all(
          items.map(async (item) => ({ ...item, product: await fetchProduct(item.product_slug) })),
        );
        if (active) setEntries(enriched);
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : "Unable to load wishlist.");
        }
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const empty = entries !== null && entries.length === 0;

  const remove = async (slug: string) => {
    setBusy(slug);
    try {
      const response = await fetch(
        `/api/v1/me/wishlist?product_slug=${encodeURIComponent(slug)}`,
        { method: "DELETE", credentials: "same-origin" },
      );
      if (!response.ok) throw new Error("Unable to remove item.");
      setEntries((current) => (current ?? []).filter((item) => item.product_slug !== slug));
    } catch (removeError) {
      setError(removeError instanceof Error ? removeError.message : "Unable to remove item.");
    } finally {
      setBusy(null);
    }
  };

  const total = useMemo(() => entries?.length ?? 0, [entries]);

  return (
    <div className="space-y-4 p-4 sm:p-5 lg:p-6">
      <section className="dashboard-hero-surface relative overflow-hidden rounded-md border border-primary/25 p-6 lg:p-7">
        <div className="dashboard-hero-glow pointer-events-none absolute inset-y-0 right-0 hidden w-2/5 lg:block" aria-hidden />
        <div className="relative">
          <p className="text-xs uppercase tracking-[0.18em] text-primary">Wishlist</p>
          <h1 className="mt-2 font-display text-4xl leading-tight tracking-tight">Saved for later</h1>
          <p className="mt-3 max-w-2xl text-base text-text-muted">
            {total > 0
              ? `${total} product${total === 1 ? "" : "s"} saved.`
              : "Save products you want to revisit — they'll appear here."}
          </p>
        </div>
      </section>

      {error ? (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {entries === null ? (
        <Card className="rounded-sm border-border/65 p-6 text-sm text-text-muted">Loading wishlist…</Card>
      ) : empty ? (
        <Card className="rounded-sm border-border/65 p-6">
          <div className="flex flex-col items-start gap-4">
            <div className="rounded-full border border-primary/25 bg-primary/10 p-3">
              <HeartIcon className="size-6 text-primary" />
            </div>
            <div>
              <p className="font-display text-lg tracking-tight">No saved products yet</p>
              <p className="mt-1 text-sm text-text-muted">Browse the catalog and tap the heart on any product to add it here.</p>
            </div>
            <LinkButton href="/digital-products" size="sm">Browse catalog</LinkButton>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {entries.map((entry) => (
            <Card key={entry.id} className="rounded-sm border-border/65 p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-text-muted">{entry.product?.price ?? ""}</p>
                  <p className="mt-1 font-display text-lg tracking-tight truncate">
                    {entry.product?.name ?? entry.product_slug}
                  </p>
                  {entry.product?.teaser ? (
                    <p className="mt-2 text-sm text-text-muted line-clamp-3">{entry.product.teaser}</p>
                  ) : null}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  aria-label="Remove from wishlist"
                  disabled={busy === entry.product_slug}
                  onClick={() => void remove(entry.product_slug)}
                >
                  <TrashIcon className="size-4" />
                </Button>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Link
                  href={`/digital-products/${entry.product_slug}`}
                  className="inline-flex items-center rounded-md border border-border/60 px-3 py-1.5 text-xs font-medium text-text hover:border-primary/60"
                >
                  View product
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
