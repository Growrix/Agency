"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { primaryNav } from "@/data/site-content";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-(--lumoria-color-border) bg-(--lumoria-color-surface)/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-(--lumoria-container-max-width) items-center justify-between px-6 py-4">
        <Link href="/" className="font-(family-name:--lumoria-font-heading) text-2xl font-bold text-(--lumoria-color-secondary)">
          Lumoria
        </Link>

        <button
          type="button"
          className="rounded-full border border-(--lumoria-color-border) px-4 py-2 text-sm font-semibold text-(--lumoria-color-secondary) md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="lumoria-mobile-nav"
        >
          Menu
        </button>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Primary">
          {primaryNav.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-primary text-white"
                    : "text-(--lumoria-color-secondary) hover:bg-(--lumoria-color-tertiary)"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {open ? (
        <nav
          id="lumoria-mobile-nav"
          className="mx-auto flex w-full max-w-(--lumoria-container-max-width) flex-col gap-2 px-6 pb-5 md:hidden"
          aria-label="Mobile primary"
        >
          {primaryNav.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  active
                    ? "bg-primary text-white"
                    : "border border-(--lumoria-color-border) bg-(--lumoria-color-surface) text-(--lumoria-color-secondary)"
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      ) : null}
    </header>
  );
}
