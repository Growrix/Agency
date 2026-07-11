import type { ReactNode } from "react";
import { CommerceProvider } from "@/components/commerce/shop-provider";
import { PageShell } from "@/components/site/page-shell";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <CommerceProvider>
      <PageShell>{children}</PageShell>
    </CommerceProvider>
  );
}
