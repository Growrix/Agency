"use client";

import { usePathname } from "next/navigation";
import { SiteTopChrome } from "@/components/shell/SiteTopChrome";
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

  return (
    <>
      {!isAdminSurface && <SiteTopChrome key={pathname} />}
      <main id="main" className={isAdminSurface ? "flex-1" : "flex-1 pb-24 lg:pb-0"}>
        <RouteTransition>{children}</RouteTransition>
      </main>
      {!isAdminSurface && <Footer />}
      {!isAdminSurface && <MobileBottomNav />}
      {!isAdminSurface && <ChatLauncher />}
      {!isAdminSurface && <ConciergeModal />}
    </>
  );
}