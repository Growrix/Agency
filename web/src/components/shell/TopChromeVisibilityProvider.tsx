"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useScrollChromeVisibility } from "@/lib/use-scroll-direction";

type ScrollChromeVisibilityContextValue = {
  topVisible: boolean;
  bottomNavVisible: boolean;
  ready: boolean;
};

const ScrollChromeVisibilityContext = createContext<ScrollChromeVisibilityContextValue>({
  topVisible: true,
  bottomNavVisible: false,
  ready: false,
});

export function TopChromeVisibilityProvider({ children }: { children: ReactNode }) {
  const { topVisible, bottomNavVisible, ready } = useScrollChromeVisibility();

  return (
    <ScrollChromeVisibilityContext.Provider value={{ topVisible, bottomNavVisible, ready }}>
      <div data-scroll-listener-ready={ready ? "true" : "false"} hidden aria-hidden />
      {children}
    </ScrollChromeVisibilityContext.Provider>
  );
}

export function useTopChromeVisibilityState() {
  return useContext(ScrollChromeVisibilityContext).topVisible;
}

export function useMobileBottomNavVisibilityState() {
  return useContext(ScrollChromeVisibilityContext).bottomNavVisible;
}
