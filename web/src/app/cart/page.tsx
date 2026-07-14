import type { Metadata } from "next";
import { buildPageMetadata, NOINDEX_ROBOTS } from "@/lib/seo-metadata";
import { CartPage } from "./CartPage";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Your cart · Growrix",
    description: "Review the items in your cart before continuing to checkout.",
    path: "/cart",
  }),
  robots: NOINDEX_ROBOTS,
};

export default function CartRoute() {
  return <CartPage />;
}
