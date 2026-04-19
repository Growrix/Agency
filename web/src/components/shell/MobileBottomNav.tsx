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

const ITEMS = [
  { label: "Home", href: "/", icon: HomeIcon, active: HomeFilled },
  { label: "Services", href: "/services", icon: Squares2X2Icon, active: SquaresFilled },
  { label: "Shop", href: "/shop", icon: ShoppingBagIcon, active: ShopFilled },
  { label: "Portfolio", href: "/portfolio", icon: BriefcaseIcon, active: BriefFilled },
  { label: "Chat", href: "/ai-concierge", icon: ChatBubbleLeftRightIcon, active: ChatFilled },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur pb-[env(safe-area-inset-bottom)]"
      aria-label="Primary mobile navigation"
    >
      <ul className="grid grid-cols-5">
        {ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = isActive ? item.active : item.icon;
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium",
                  isActive ? "text-[var(--color-primary)]" : "text-[var(--color-text-muted)]"
                )}
              >
                <Icon className="size-5" aria-hidden />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
