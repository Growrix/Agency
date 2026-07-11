"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { fetchSiteConfigSurface } from "@/lib/foundation/client";
import { fallbackSiteConfig } from "@/lib/foundation/fallback";
import type { FoundationMode } from "@/lib/foundation/types";

type SiteShellState = {
  mode: FoundationMode;
  brandName: string;
  supportEmail: string;
  navigation: Array<{ label: string; href: string }>;
  footerAttribution: {
    enabled: boolean;
    text: string;
    linkText: string;
    url: string;
  };
};

const defaultState: SiteShellState = {
  mode: "mock-fallback",
  brandName: fallbackSiteConfig.brand.name,
  supportEmail: fallbackSiteConfig.brand.supportEmail,
  navigation: fallbackSiteConfig.navigation,
  footerAttribution: fallbackSiteConfig.footer.attribution,
};

const SiteShellContext = createContext<SiteShellState>(defaultState);

export function SiteShellProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SiteShellState>(defaultState);

  useEffect(() => {
    let mounted = true;

    fetchSiteConfigSurface()
      .then((surface) => {
        if (!mounted) return;

        setState({
          mode: surface.mode,
          brandName: surface.payload.brand.name,
          supportEmail: surface.payload.brand.supportEmail,
          navigation: surface.payload.navigation,
          footerAttribution: surface.payload.footer.attribution,
        });
      })
      .catch(() => {
        if (!mounted) return;
        setState(defaultState);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo(() => state, [state]);

  return <SiteShellContext.Provider value={value}>{children}</SiteShellContext.Provider>;
}

export function useSiteShell() {
  return useContext(SiteShellContext);
}
