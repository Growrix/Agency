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
import { cn } from "@/lib/utils";
import { useConciergeStore } from "@/lib/concierge-store";

const ITEMS = [
  { label: "Home", href: "/", icon: HomeIcon, active: HomeFilled },
  { label: "Services", href: "/services", icon: Squares2X2Icon, active: SquaresFilled },
  { label: "Shop", href: "/shop", icon: ShoppingBagIcon, active: ShopFilled },
  { label: "Portfolio", href: "/portfolio", icon: BriefcaseIcon, active: BriefFilled },
  { label: "Chat", href: "/ai-concierge", icon: ChatBubbleLeftRightIcon, active: ChatFilled },
];

export function MobileBottomNav() {
  const openConcierge = useConciergeStore((state) => state.open);
  const isConciergeOpen = useConciergeStore((state) => state.isOpen);
  const pathname = usePathname();

  if (isConciergeOpen) {
    return null;
  }

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface pb-[max(env(safe-area-inset-bottom),_8px)] backdrop-blur-md lg:hidden"
      aria-label="Primary mobile navigation"
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
                    "flex w-full flex-col items-center justify-center gap-1 py-3 text-[11px] font-medium",
                    isActive ? "text-primary" : "text-text"
                  )}
                >
                  <Icon className="size-5" aria-hidden />
                  {item.label}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 py-3 text-[11px] font-medium",
                    isActive ? "text-primary" : "text-text"
                  )}
                >
                  <Icon className="size-5" aria-hidden />
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
