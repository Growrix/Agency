"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  RectangleStackIcon,
  ShoppingBagIcon,
  SwatchIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  RectangleStackIcon as RectangleStackIconSolid,
  ShoppingBagIcon as ShoppingBagIconSolid,
  SwatchIcon as SwatchIconSolid,
  ChatBubbleLeftIcon as ChatBubbleLeftIconSolid,
} from "@heroicons/react/24/solid";

const items = [
  {
    label: "Home",
    href: "/",
    icon: HomeIcon,
    activeIcon: HomeIconSolid,
  },
  {
    label: "Services",
    href: "/services",
    icon: RectangleStackIcon,
    activeIcon: RectangleStackIconSolid,
  },
  {
    label: "Shop",
    href: "/shop",
    icon: ShoppingBagIcon,
    activeIcon: ShoppingBagIconSolid,
  },
  {
    label: "Portfolio",
    href: "/portfolio",
    icon: SwatchIcon,
    activeIcon: SwatchIconSolid,
  },
  {
    label: "Chat",
    href: "/ai-concierge",
    icon: ChatBubbleLeftIcon,
    activeIcon: ChatBubbleLeftIconSolid,
  },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-surface/95 backdrop-blur-md border-t border-border"
      aria-label="Mobile bottom navigation"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {items.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = isActive ? item.activeIcon : item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 min-w-[56px] py-1 rounded-lg transition-colors",
                isActive ? "text-primary" : "text-muted hover:text-foreground",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[11px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
