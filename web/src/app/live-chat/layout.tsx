import type { Metadata } from "next";
import { buildPageMetadata, NOINDEX_ROBOTS } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Live Chat",
    description:
      "Start a live chat with Growrix OS about your website, SaaS, automation, or technical SEO project. Get quick answers before booking a call.",
    path: "/live-chat",
  }),
  robots: NOINDEX_ROBOTS,
};

export default function LiveChatLayout({ children }: { children: React.ReactNode }) {
  return children;
}
