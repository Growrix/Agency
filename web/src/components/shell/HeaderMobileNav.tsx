"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { PublicAuthControls } from "@/components/shell/PublicAuthControls";
import { CONTAINER_X_CLASS } from "@/components/primitives/Container";
import {
  MOBILE_NAV_LEGAL_LINKS,
  MOBILE_NAV_SUPPORT_LINKS,
  PRIMARY_NAV,
  WHATSAPP_HREF,
} from "@/lib/nav";
import { cn } from "@/lib/utils";

type HeaderMobileNavProps = {
  onClose: () => void;
  onOpenConcierge: () => void;
};

type NavChild = {
  label: string;
  href: string;
  description?: string;
};

function CollapsibleNavGroup({
  label,
  href,
  items,
  isOpen,
  onToggle,
  onClose,
}: {
  label: string;
  href: string;
  items: NavChild[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const panelId = `mobile-nav-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="site-mobile-nav__group">
      <div className="site-mobile-nav__group-row">
        <Link href={href} onClick={onClose} className="site-mobile-nav__link site-mobile-nav__link--parent">
          {label}
        </Link>
        <button
          type="button"
          className="site-mobile-nav__toggle"
          aria-expanded={isOpen}
          aria-controls={panelId}
          aria-label={`${isOpen ? "Collapse" : "Expand"} ${label} submenu`}
          onClick={onToggle}
        >
          <ChevronDownIcon className={cn("site-mobile-nav__chevron", isOpen && "site-mobile-nav__chevron--open")} aria-hidden />
        </button>
      </div>
      <div
        id={panelId}
        className={cn("site-mobile-nav__submenu", isOpen && "site-mobile-nav__submenu--open")}
        aria-hidden={!isOpen}
      >
        <ul className="site-mobile-nav__submenu-list">
          {items.map((child) => (
            <li key={child.href}>
              <Link href={child.href} onClick={onClose} className="site-mobile-nav__sublink">
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function HeaderMobileNav({ onClose, onOpenConcierge }: HeaderMobileNavProps) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = useCallback((label: string) => {
    setOpenGroups((current) => ({ ...current, [label]: !current[label] }));
  }, []);

  return (
    <nav id="mobile-navigation" aria-label="Mobile navigation" className={cn("site-mobile-nav", CONTAINER_X_CLASS)}>
      <div className="site-mobile-nav__primary">
        {PRIMARY_NAV.map((item) =>
          item.children ? (
            <CollapsibleNavGroup
              key={item.label}
              label={item.label}
              href={item.href}
              items={item.children}
              isOpen={Boolean(openGroups[item.label])}
              onToggle={() => toggleGroup(item.label)}
              onClose={onClose}
            />
          ) : (
            <Link key={item.label} href={item.href} onClick={onClose} className="site-mobile-nav__link">
              {item.label}
            </Link>
          ),
        )}
      </div>

      <div className="site-mobile-nav__divider" aria-hidden />

      <div className="site-mobile-nav__secondary">
        <p className="site-mobile-nav__section-label">Support</p>
        {MOBILE_NAV_SUPPORT_LINKS.map((item) => (
          <Link key={item.href} href={item.href} onClick={onClose} className="site-mobile-nav__link site-mobile-nav__link--secondary">
            {item.label}
          </Link>
        ))}
        <button
          type="button"
          onClick={() => {
            onClose();
            onOpenConcierge();
          }}
          className="site-mobile-nav__link site-mobile-nav__link--secondary site-mobile-nav__button"
        >
          AI Growrix OS
        </button>
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noreferrer"
          onClick={onClose}
          className="site-mobile-nav__link site-mobile-nav__link--secondary"
        >
          WhatsApp
        </a>
      </div>

      <div className="site-mobile-nav__divider" aria-hidden />

      <div className="site-mobile-nav__legal">
        {MOBILE_NAV_LEGAL_LINKS.map((item) => (
          <Link key={item.href} href={item.href} onClick={onClose} className="site-mobile-nav__legal-link">
            {item.label}
          </Link>
        ))}
      </div>

      <div className="site-mobile-nav__cta">
        <PublicAuthControls variant="mobileNav" onNavigate={onClose} />
      </div>
    </nav>
  );
}
