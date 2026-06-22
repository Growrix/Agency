"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { SiteTopChrome } from "@/components/shell/SiteTopChrome";
import { Footer } from "@/components/shell/Footer";
import { MobileBottomNav } from "@/components/shell/MobileBottomNav";
import { RouteTransition } from "@/components/motion/Motion";

const ChatLauncher = dynamic(
  () => import("@/components/shell/ChatLauncher").then((mod) => mod.ChatLauncher),
  { ssr: false },
);

const ConciergeModal = dynamic(
  () => import("@/components/ai/ConciergeModal").then((mod) => mod.ConciergeModal),
  { ssr: false },
);

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
