"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { routeConfig } from "@/data/routes";
import { useAuth } from "@/state/AuthContext";
import { useCart } from "@/state/CartContext";
import { useSiteShell } from "@/state/SiteShellContext";
import { useUtility } from "@/state/UtilityContext";

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.11 4.18 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2h2l2.4 12.49a2 2 0 0 0 2 1.51h9.72a2 2 0 0 0 2-1.64L22 7H6" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
    </svg>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const {
    languages,
    currencies,
    t,
    selectedLanguage,
    selectedCurrency,
    setLanguage,
    setCurrency,
  } = useUtility();
  const { brandName, navigation } = useSiteShell();
  const [brandLead, ...brandRest] = brandName.split(" ");

  return (
    <header className="sticky top-0 z-40 motion-header-enter">
      <div className="bg-[#111] text-white text-[12px]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
          <div className="flex items-center gap-2 font-medium">
            <span className="text-[#ff3b3b]">
              <PhoneIcon />
            </span>
            <span>{t("nav.hotline")}: {siteConfig.hotline}</span>
          </div>
          <div className="hidden items-center gap-4 md:flex">
            {isAuthenticated ? (
              <>
                <Link href={routeConfig.account} className="flex items-center gap-2 transition-colors hover:text-[#ff3b3b]">
                  <span className="text-[#ff3b3b]">👤</span>
                  <span>{t("nav.account")}</span>
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="flex items-center gap-2 transition-colors hover:text-[#ff3b3b]"
                >
                  <span className="text-[#ff3b3b]">↩</span>
                  <span>{t("nav.logout")}</span>
                </button>
              </>
            ) : (
              <Link href={routeConfig.login} className="flex items-center gap-2 transition-colors hover:text-[#ff3b3b]">
                <span className="text-[#ff3b3b]">🔒</span>
                <span>{t("nav.loginRegister")}</span>
              </Link>
            )}
            <span className="text-white/30">|</span>
            <label className="sr-only" htmlFor="language-select">Language</label>
            <select
              id="language-select"
              value={selectedLanguage}
              onChange={(event) => setLanguage(event.target.value)}
              className="rounded-sm border border-white/30 bg-transparent px-2 py-1 text-[12px]"
            >
              {languages.map((language) => (
                <option key={language.code} value={language.code} className="text-[#111]">
                  {language.label}
                </option>
              ))}
            </select>
            <span className="text-white/30">|</span>
            <label className="sr-only" htmlFor="currency-select">Currency</label>
            <select
              id="currency-select"
              value={selectedCurrency}
              onChange={(event) => setCurrency(event.target.value)}
              className="rounded-sm border border-white/30 bg-transparent px-2 py-1 text-[12px]"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency} className="text-[#111]">
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-[0_1px_0_rgba(0,0,0,0.05)]">
        <div className="mx-auto flex max-w-7xl items-center px-4 py-5 sm:px-6 lg:px-10">
          <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
            <span className="text-[38px] font-black tracking-tight text-[#2b2b2b]">
              {brandLead}
              {brandRest.length > 0 ? <span className="text-[#ff3434]"> {brandRest.join(" ")}</span> : null}
            </span>
          </Link>

          <nav className="ml-10 hidden flex-1 items-center justify-center gap-7 text-[14px] font-semibold lg:flex">
            {navigation.map((item) => (
              <Link key={`${item.href}-${item.label}`} href={item.href} className="transition-colors hover:text-[#ff3434]">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <Link
              href={routeConfig.search}
              aria-label="Search"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ddd] text-[#444] transition hover:border-[#ff3434] hover:text-[#ff3434]"
            >
              <SearchIcon />
            </Link>
            <Link href={routeConfig.cart} className="hidden h-22 w-24 flex-col items-center justify-center bg-[#ff3434] text-center text-white sm:flex">
              <span className="leading-none">
                <CartIcon />
              </span>
              <span className="mt-1 text-[13px] font-bold">{t("nav.myCart")}</span>
              <span className="text-[12px]">{itemCount} {itemCount === 1 ? t("nav.itemSingular") : t("nav.itemPlural")}</span>
            </Link>
            <button
              type="button"
              aria-label="Toggle mobile navigation"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-[#ddd] text-[#333] lg:hidden"
            >
              <MenuIcon open={mobileOpen} />
            </button>
          </div>
        </div>

        <nav
          className={`overflow-hidden border-t border-[#eee] bg-white transition-all duration-300 lg:hidden ${
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
            {navigation.map((item) => (
              <Link
                key={`${item.href}-${item.label}-mobile`}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-[#f1f1f1] py-3 text-[13px] font-semibold text-[#333] transition-colors last:border-b-0 hover:text-[#ff3434]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={routeConfig.search}
              onClick={() => setMobileOpen(false)}
              className="border-b border-[#f1f1f1] py-3 text-[13px] font-semibold text-[#333] transition-colors hover:text-[#ff3434]"
            >
              {t("nav.search")}
            </Link>
            <Link
              href={routeConfig.cart}
              onClick={() => setMobileOpen(false)}
              className="border-b border-[#f1f1f1] py-3 text-[13px] font-semibold text-[#333] transition-colors hover:text-[#ff3434]"
            >
              {t("nav.myCart")} ({itemCount})
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  href={routeConfig.account}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-[#f1f1f1] py-3 text-[13px] font-semibold text-[#333] transition-colors hover:text-[#ff3434]"
                >
                  {t("nav.account")}
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="py-3 text-left text-[13px] font-semibold text-[#333] transition-colors hover:text-[#ff3434]"
                >
                  {t("nav.logout")}
                </button>
              </>
            ) : (
              <Link
                href={routeConfig.login}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-[13px] font-semibold text-[#333] transition-colors hover:text-[#ff3434]"
              >
                {t("nav.loginRegister")}
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
