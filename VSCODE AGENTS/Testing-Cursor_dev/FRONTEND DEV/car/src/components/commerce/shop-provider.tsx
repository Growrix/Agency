"use client";

import type { ReactNode } from "react";
import { ShopProvider } from "@/components/commerce/shop-state";

export function CommerceProvider({ children }: { children: ReactNode }) {
  return <ShopProvider>{children}</ShopProvider>;
}
