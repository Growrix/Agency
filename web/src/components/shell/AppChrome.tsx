"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/shell/Header";
import { Footer } from "@/components/shell/Footer";
import { MobileBottomNav } from "@/components/shell/MobileBottomNav";
import { UtilityRibbon } from "@/components/shell/UtilityRibbon";
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
      {!isAdminSurface && <UtilityRibbon />}
      {!isAdminSurface && <Header />}
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