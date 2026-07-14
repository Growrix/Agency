import type { Metadata } from "next";
import { buildPageMetadata, NOINDEX_ROBOTS } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Complete Account · Growrix OS",
    description: "Finish setting up your Growrix OS account to access your dashboard, orders, and downloads.",
    path: "/complete-account",
  }),
  robots: NOINDEX_ROBOTS,
};

export default function CompleteAccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
