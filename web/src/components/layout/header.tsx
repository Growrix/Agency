"use client";

import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { Container, LinkButton } from "@/components/ui/container";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Utility Ribbon */}
      <div className="bg-foreground text-background text-xs py-2 hidden sm:block">
        <Container size="2xl" className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="opacity-80">Avg. response time: &lt; 2 hours</span>
            <span className="opacity-40">|</span>
            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 opacity-80 transition-opacity"
            >
              WhatsApp us
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="opacity-80">Free project consultation</span>
          </div>
        </Container>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all",
          scrolled
            ? "bg-surface/95 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-surface border-b border-transparent",
        )}
      >
        <Container size="2xl" className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-xl font-bold tracking-tight text-foreground"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {SITE_CONFIG.name}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-muted hover:text-foreground transition-colors rounded-[var(--radius-sm)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              className="p-2 text-muted hover:text-foreground transition-colors rounded-[var(--radius-sm)]"
              aria-label="Open chat"
            >
              <ChatBubbleLeftRightIcon className="h-5 w-5" />
            </button>
            <button
              className="p-2 text-muted hover:text-foreground transition-colors rounded-[var(--radius-sm)]"
              aria-label="Open cart"
            >
              <ShoppingCartIcon className="h-5 w-5" />
            </button>
            <LinkButton href={SITE_CONFIG.bookingUrl} size="sm">
              Book Appointment
            </LinkButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-muted hover:text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </Container>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-surface">
            <Container className="py-4">
              <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-3 text-base font-medium text-foreground hover:bg-inset rounded-[var(--radius-sm)] transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className="my-2 border-border" />
                <Link
                  href="/contact"
                  className="px-3 py-3 text-base font-medium text-muted hover:text-foreground transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href="/faq"
                  className="px-3 py-3 text-base font-medium text-muted hover:text-foreground transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  FAQ
                </Link>
                <div className="pt-2">
                  <LinkButton href={SITE_CONFIG.bookingUrl} className="w-full">
                    Book Appointment
                  </LinkButton>
                </div>
              </nav>
            </Container>
          </div>
        )}
      </header>
    </>
  );
}
