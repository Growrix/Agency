"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  Squares2X2Icon,
  ShoppingBagIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeFilled,
  Squares2X2Icon as SquaresFilled,
  ShoppingBagIcon as ShopFilled,
  BriefcaseIcon as BriefFilled,
  ChatBubbleLeftRightIcon as ChatFilled,
} from "@heroicons/react/24/solid";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useConciergeStore } from "@/lib/concierge-store";
import { useTopChromeVisibility } from "@/lib/use-scroll-direction";

const ITEMS = [
  { label: "Home", href: "/", icon: HomeIcon, active: HomeFilled },
  { label: "Services", href: "/services", icon: Squares2X2Icon, active: SquaresFilled },
  { label: "Digital Products", href: "/digital-products", icon: ShoppingBagIcon, active: ShopFilled },
  { label: "Portfolio", href: "/portfolio", icon: BriefcaseIcon, active: BriefFilled },
  { label: "Chat", href: "/ai-concierge", icon: ChatBubbleLeftRightIcon, active: ChatFilled },
];

export function MobileBottomNav() {
  const openConcierge = useConciergeStore((state) => state.open);
  const isConciergeOpen = useConciergeStore((state) => state.isOpen);
  const pathname = usePathname();
  const navVisible = useTopChromeVisibility();
  const reduced = useReducedMotion();

  if (isConciergeOpen) {
    return null;
  }

  return (
    <nav
      data-testid="mobile-bottom-nav"
      data-nav-visible={navVisible ? "true" : "false"}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface backdrop-blur-md lg:hidden",
        !reduced && "transition-transform duration-300 ease-signal",
        !navVisible && "translate-y-full pointer-events-none"
      )}
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 8px)" }}
      aria-label="Primary mobile navigation"
      aria-hidden={!navVisible}
    >
      <ul className="grid grid-cols-5">
        {ITEMS.map((item) => {
          const isActive = item.href === "/ai-concierge"
            ? isConciergeOpen
            : pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = isActive ? item.active : item.icon;
          return (
            <li key={item.label}>
              {item.href === "/ai-concierge" ? (
                <button
                  type="button"
                  onClick={() => openConcierge()}
                  className={cn(
                    "flex w-full flex-col items-center justify-center gap-1 px-1 py-3 text-[10px] font-medium leading-tight",
                    isActive ? "text-primary" : "text-text"
                  )}
                >
                  <Icon className="size-5 shrink-0" aria-hidden />
                  {item.label}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 px-1 py-3 text-[10px] font-medium leading-tight",
                    isActive ? "text-primary" : "text-text"
                  )}
                >
                  <Icon className="size-5 shrink-0" aria-hidden />
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
