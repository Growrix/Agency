import type { Metadata } from "next";
import { CouponsClient } from "./CouponsClient";

export const metadata: Metadata = {
  title: "Coupons · Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminCouponsPage() {
  return <CouponsClient />;
}
