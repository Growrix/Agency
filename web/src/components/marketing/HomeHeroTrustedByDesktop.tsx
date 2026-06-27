"use client";

import { HomeHeroTrustedBy } from "@/components/marketing/HomeHeroTrustedBy";
import { cn } from "@/lib/utils";

type HomeHeroTrustedByDesktopProps = {
  className?: string;
  animated?: boolean;
};

export function HomeHeroTrustedByDesktop({ className, animated = true }: HomeHeroTrustedByDesktopProps) {
  return <HomeHeroTrustedBy variant="desktop" animated={animated} className={cn(className)} />;
}
