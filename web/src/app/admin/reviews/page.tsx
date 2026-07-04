import type { Metadata } from "next";
import { ReviewsModerationClient } from "./ReviewsModerationClient";

export const metadata: Metadata = {
  title: "Reviews · Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminReviewsPage() {
  return <ReviewsModerationClient />;
}
