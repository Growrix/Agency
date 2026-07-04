"use client";

import { useCallback, useEffect, useState } from "react";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { Button } from "@/components/primitives/Button";

type WishlistButtonProps = {
  productSlug: string;
  productName?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "ghost" | "outline" | "destructive";
  fullWidth?: boolean;
  iconOnly?: boolean;
  className?: string;
};

async function fetchStatus(): Promise<Set<string> | null> {
  try {
    const response = await fetch("/api/v1/me/wishlist", { credentials: "same-origin" });
    if (response.status === 401 || response.status === 403) {
      return null;
    }
    if (!response.ok) return null;
    const payload = (await response.json()) as { data?: { items?: Array<{ product_slug: string }> } };
    return new Set((payload.data?.items ?? []).map((item) => item.product_slug));
  } catch {
    return null;
  }
}

export function WishlistButton({
  productSlug,
  productName,
  size = "md",
  variant = "ghost",
  fullWidth,
  iconOnly,
  className,
}: WishlistButtonProps) {
  const [saved, setSaved] = useState(false);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    void (async () => {
      const set = await fetchStatus();
      if (!active) return;
      if (set === null) {
        setAuthenticated(false);
        return;
      }
      setAuthenticated(true);
      setSaved(set.has(productSlug));
    })();
    return () => {
      active = false;
    };
  }, [productSlug]);

  const toggle = useCallback(async () => {
    if (authenticated === false) {
      window.location.assign(`/sign-in?redirect=/digital-products/${encodeURIComponent(productSlug)}`);
      return;
    }
    setBusy(true);
    try {
      if (saved) {
        const response = await fetch(
          `/api/v1/me/wishlist?product_slug=${encodeURIComponent(productSlug)}`,
          { method: "DELETE", credentials: "same-origin" },
        );
        if (response.ok) setSaved(false);
      } else {
        const response = await fetch("/api/v1/me/wishlist", {
          method: "POST",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product_slug: productSlug }),
        });
        if (response.ok) setSaved(true);
      }
    } finally {
      setBusy(false);
    }
  }, [authenticated, productSlug, saved]);

  const Icon = saved ? HeartSolid : HeartOutline;
  const label = saved ? "Saved" : "Save for later";

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={busy}
      aria-label={productName ? `${saved ? "Remove" : "Save"} ${productName} to wishlist` : label}
      aria-pressed={saved}
      onClick={() => void toggle()}
      className={className}
    >
      <Icon className="size-4" aria-hidden />
      {iconOnly ? null : label}
    </Button>
  );
}
