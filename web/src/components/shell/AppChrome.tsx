"use client";

import { usePathname } from "next/navigation";
import { SiteTopChrome } from "@/components/shell/SiteTopChrome";
import { TopChromeVisibilityProvider } from "@/components/shell/TopChromeVisibilityProvider";
import { Footer } from "@/components/shell/Footer";
import { MobileBottomNav } from "@/components/shell/MobileBottomNav";
import { ChatLauncher } from "@/components/shell/ChatLauncher";
import { ConciergeModal } from "@/components/ai/ConciergeModal";
import { RouteTransition } from "@/components/motion/Motion";

type AppChromeProps = {
  children: React.ReactNode;
};

export function AppChrome({ children }: AppChromeProps) {
  const pathname = usePathname();
  const isAdminSurface = pathname.startsWith("/admin");

  if (isAdminSurface) {
    return (
      <>
        <main id="main" className="flex-1">
          <RouteTransition>{children}</RouteTransition>
        </main>
      </>
    );
  }

  return (
    <TopChromeVisibilityProvider>
      <SiteTopChrome key={pathname} />
      <main id="main" className="flex-1 pb-24 lg:pb-0">
        <RouteTransition>{children}</RouteTransition>
      </main>
      <Footer />
      <MobileBottomNav />
      <ChatLauncher />
      <ConciergeModal />
    </TopChromeVisibilityProvider>
  );
}