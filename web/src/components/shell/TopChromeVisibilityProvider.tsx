"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useTopChromeVisibility } from "@/lib/use-scroll-direction";

type TopChromeVisibilityContextValue = {
  visible: boolean;
  ready: boolean;
};

const TopChromeVisibilityContext = createContext<TopChromeVisibilityContextValue>({
  visible: true,
  ready: false,
});

export function TopChromeVisibilityProvider({ children }: { children: ReactNode }) {
  const { visible, ready } = useTopChromeVisibility();

  return (
    <TopChromeVisibilityContext.Provider value={{ visible, ready }}>
      <div data-scroll-listener-ready={ready ? "true" : "false"} hidden aria-hidden />
      {children}
    </TopChromeVisibilityContext.Provider>
  );
}

export function useTopChromeVisibilityState() {
  return useContext(TopChromeVisibilityContext).visible;
}
