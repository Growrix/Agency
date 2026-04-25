"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { PRIMARY_NAV } from "@/lib/nav";
import { LinkButton } from "@/components/primitives/Button";
import { ThemeToggle, ThemeToggleButton } from "@/components/shell/ThemeToggle";
import { AnimatePresence, motion } from "@/components/motion/Motion";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useConciergeStore } from "@/lib/concierge-store";

export function Header() {
  const openConcierge = useConciergeStore((state) => state.open);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduced = useReducedMotion();

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
          ? "border-b border-border bg-surface/85 backdrop-blur"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-shell items-center gap-2 px-4 sm:px-8 lg:h-18 lg:gap-6 lg:px-12">
        <Link href="/" className="group flex min-w-0 flex-1 items-center gap-2.5 lg:flex-none lg:shrink-0">
          <Image
            src="/website logo 01-01.svg"
            alt="Growrix logo"
            width={180}
            height={44}
            priority
            unoptimized
            className="h-8 w-auto object-contain sm:h-9"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-4">
          {PRIMARY_NAV.map((item) =>
            item.children ? (
              <Popover key={item.label} className="relative">
                {({ close }) => (
                  <>
                    <PopoverButton className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors hover:text-primary data-open:text-primary">
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
                      <PopoverPanel className="absolute left-0 top-full mt-2 w-105 rounded-[16px] border border-border bg-surface p-2 shadow-(--shadow-3)">
                        {item.children.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            onClick={() => close()}
                            className="block rounded-sm px-4 py-3 transition-colors hover:bg-inset"
                          >
                            <div className="font-medium text-[15px]">{c.label}</div>
                            <div className="text-sm leading-snug text-text-muted">{c.description}</div>
                          </Link>
                        ))}
                      </PopoverPanel>
                    </Transition>
                  </>
                )}
              </Popover>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="px-3 py-2 text-sm font-medium transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1 lg:gap-2">
          <button
            type="button"
            onClick={() => openConcierge()}
            className="hidden size-10 items-center justify-center rounded-full transition-colors hover:bg-inset lg:inline-flex"
            aria-label="Open chat"
          >
            <ChatBubbleLeftRightIcon className="size-5" aria-hidden />
          </button>
          <Link
            href="/shop"
            className="hidden size-10 items-center justify-center rounded-full transition-colors hover:bg-inset lg:inline-flex"
            aria-label="Open cart"
          >
            <ShoppingBagIcon className="size-5" aria-hidden />
          </Link>
          <ThemeToggleButton className="lg:hidden" />
          <ThemeToggle className="hidden lg:inline-flex" />
          <Link
            href="/book-appointment"
            className="inline-flex size-10 items-center justify-center rounded-full bg-primary text-surface shadow-(--shadow-1) transition-[background-color,transform] duration-200 ease-signal hover:-translate-y-px hover:bg-primary-hover active:translate-y-0 active:scale-[0.97] sm:hidden"
            aria-label="Book appointment"
            title="Book appointment"
          >
            <CalendarDaysIcon className="size-5" aria-hidden />
          </Link>
          <LinkButton href="/book-appointment" size="sm" className="ml-1 hidden lg:inline-flex">
            Book Appointment
          </LinkButton>
          <button
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-inset lg:hidden"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <XMarkIcon className="size-5" /> : <Bars3Icon className="size-5" />}
          </button>
        </div>
      </div>

      {(() => {
        const menuContent = (
          <nav className="mx-auto flex max-w-shell flex-col px-5 py-4 sm:px-8">
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
                  <div className="mb-2 ml-1 space-y-1 border-l border-border pl-3">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-1.5 text-sm text-text-muted"
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
        );
        // Reduced motion: render plain DOM, no AnimatePresence/motion.
        if (reduced) {
          return mobileOpen ? (
            <div className="border-t border-border bg-surface lg:hidden">
              {menuContent}
            </div>
          ) : null;
        }
        return (
          <AnimatePresence initial={false}>
            {mobileOpen && (
              <motion.div
                key="mobile-menu"
                className="overflow-hidden border-t border-border bg-surface lg:hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                {menuContent}
              </motion.div>
            )}
          </AnimatePresence>
        );
      })()}
    </header>
  );
}
