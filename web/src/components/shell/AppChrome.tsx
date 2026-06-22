"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { SiteTopChrome } from "@/components/shell/SiteTopChrome";
import { TopChromeVisibilityProvider } from "@/components/shell/TopChromeVisibilityProvider";
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
  const isStandaloneProfile =
    pathname === "/Business-profile" ||
    pathname === "/business-profile" ||
    pathname === "/businessprofile";

  if (isAdminSurface || isStandaloneProfile) {
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
