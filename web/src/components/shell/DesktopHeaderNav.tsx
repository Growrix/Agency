"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { PRIMARY_NAV } from "@/lib/nav";
import { cn } from "@/lib/utils";

type NavChild = { label: string; href: string; description?: string };

function DesktopNavDropdown({
  label,
  items,
  isOpen,
  onOpenChange,
}: {
  label: string;
  items: NavChild[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeIfOutside = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }
      if (rootRef.current?.contains(target)) {
        return;
      }
      onOpenChange(false);
    };

    document.addEventListener("pointerdown", closeIfOutside, true);
    return () => document.removeEventListener("pointerdown", closeIfOutside, true);
  }, [isOpen, onOpenChange]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className={cn(
          "inline-flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
          isOpen && "text-primary",
        )}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => onOpenChange(!isOpen)}
      >
        {label}
        <ChevronDownIcon className="size-3.5" aria-hidden />
      </button>
      {isOpen ? (
        <div
          id={menuId}
          role="menu"
          className="absolute left-0 top-full z-50 mt-2 w-80 rounded-md border border-border bg-surface p-2 shadow-(--shadow-3)"
        >
          {items.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              role="menuitem"
              className="block rounded-sm px-4 py-3 transition-colors hover:bg-inset"
              onClick={() => onOpenChange(false)}
            >
              <div className="font-medium text-[15px]">{child.label}</div>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function DesktopHeaderNav() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    if (!openMenu) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openMenu]);

  return (
    <nav className="ml-4 hidden items-center gap-1 lg:flex" aria-label="Primary">
      {PRIMARY_NAV.map((item) =>
        item.children ? (
          <DesktopNavDropdown
            key={item.label}
            label={item.label}
            items={item.children}
            isOpen={openMenu === item.label}
            onOpenChange={(open) => setOpenMenu(open ? item.label : null)}
          />
        ) : (
          <Link
            key={item.label}
            href={item.href}
            className="px-3 py-2 text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setOpenMenu(null)}
          >
            {item.label}
          </Link>
        ),
      )}
    </nav>
  );
}
