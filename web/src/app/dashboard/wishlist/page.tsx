import type { Metadata } from "next";
import { WishlistSurface } from "./WishlistSurface";

export const metadata: Metadata = {
  title: "Wishlist · Dashboard",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function DashboardWishlistPage() {
  return <WishlistSurface />;
}
