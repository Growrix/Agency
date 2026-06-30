import type { Metadata } from "next";
import { CartPage } from "./CartPage";

export const metadata: Metadata = {
  title: "Your cart · Growrix",
  description: "Review the items in your cart before continuing to checkout.",
};

export default function CartRoute() {
  return <CartPage />;
}
