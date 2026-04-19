"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { PRIMARY_NAV } from "@/lib/nav";
import { LinkButton } from "@/components/primitives/Button";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[var(--color-surface)]/85 backdrop-blur border-b border-[var(--color-border)]"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-[1440px] items-center gap-6 px-5 sm:px-8 lg:px-12 h-16 lg:h-18">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="relative inline-flex size-8 items-center justify-center rounded-[10px] bg-[var(--color-primary)] text-[var(--color-surface)]">
            <span className="absolute inset-0 rounded-[10px] bg-[var(--color-secondary)]/40 mix-blend-multiply" aria-hidden />
            <span className="relative font-display font-bold">S</span>
          </span>
          <span className="font-display text-lg tracking-tight">Signal Atelier</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-4">
          {PRIMARY_NAV.map((item) =>
            item.children ? (
              <Popover key={item.label} className="relative">
                <PopoverButton className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium hover:text-[var(--color-primary)] transition-colors data-[open]:text-[var(--color-primary)]">
                  {item.label}
                  <ChevronDownIcon className="size-3.5" aria-hidden />
                </PopoverButton>
                <Transition
                  enter="transition duration-150"
                  enterFrom="opacity-0 -translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <PopoverPanel className="absolute left-0 top-full mt-2 w-[420px] rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface)] p-2 shadow-[var(--shadow-3)]">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block rounded-[12px] px-4 py-3 hover:bg-[var(--color-inset)] transition-colors"
                      >
                        <div className="font-medium text-[15px]">{c.label}</div>
                        <div className="text-sm text-[var(--color-text-muted)] leading-snug">{c.description}</div>
                      </Link>
                    ))}
                  </PopoverPanel>
                </Transition>
              </Popover>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="px-3 py-2 text-sm font-medium hover:text-[var(--color-primary)] transition-colors"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <Link
            href="/ai-concierge"
            className="hidden sm:inline-flex size-10 items-center justify-center rounded-full hover:bg-[var(--color-inset)] transition-colors"
            aria-label="Open chat"
          >
            <ChatBubbleLeftRightIcon className="size-5" aria-hidden />
          </Link>
          <Link
            href="/shop"
            className="inline-flex size-10 items-center justify-center rounded-full hover:bg-[var(--color-inset)] transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBagIcon className="size-5" aria-hidden />
          </Link>
          <LinkButton href="/book-appointment" size="sm" className="hidden sm:inline-flex ml-1">
            Book Appointment
          </LinkButton>
          <button
            className="lg:hidden inline-flex size-10 items-center justify-center rounded-full hover:bg-[var(--color-inset)]"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <XMarkIcon className="size-5" /> : <Bars3Icon className="size-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-[var(--color-border)] bg-[var(--color-surface)]">
          <nav className="mx-auto max-w-[1440px] px-5 sm:px-8 py-4 flex flex-col">
            {PRIMARY_NAV.map((item) => (
              <div key={item.label} className="py-1">
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 text-base font-medium"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-3 mb-2 border-l border-[var(--color-border)] ml-1 space-y-1">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-1.5 text-sm text-[var(--color-text-muted)]"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="block py-2 text-base font-medium">
              Contact
            </Link>
            <Link href="/faq" onClick={() => setMobileOpen(false)} className="block py-2 text-base font-medium">
              FAQ
            </Link>
            <LinkButton href="/book-appointment" className="mt-3" fullWidth>
              Book Appointment
            </LinkButton>
          </nav>
        </div>
      )}
    </header>
  );
}
