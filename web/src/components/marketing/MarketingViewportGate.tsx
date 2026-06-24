"use client";

import { useSyncExternalStore, type ReactNode } from "react";

const DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";

function subscribe(onStoreChange: () => void) {
  const mediaQueryList = window.matchMedia(DESKTOP_MEDIA_QUERY);
  mediaQueryList.addEventListener("change", onStoreChange);
  return () => mediaQueryList.removeEventListener("change", onStoreChange);
}

function getDesktopSnapshot() {
  return window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

type MarketingViewportGateProps = {
  mobile: ReactNode | null;
  desktop: ReactNode;
};

export function MarketingViewportGate({ mobile, desktop }: MarketingViewportGateProps) {
  const isDesktop = useSyncExternalStore(subscribe, getDesktopSnapshot, getServerSnapshot);
  return isDesktop ? desktop : mobile;
}
