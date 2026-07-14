import type { Metadata } from "next";
import { buildPageMetadata, NOINDEX_ROBOTS } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Live Chat · Growrix OS",
    description: "Start a live chat session with Growrix OS about your website, SaaS, automation, or technical SEO project.",
    path: "/live-chat",
  }),
  robots: NOINDEX_ROBOTS,
};

export default function LiveChatLayout({ children }: { children: React.ReactNode }) {
  return children;
}
