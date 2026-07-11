"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { footerColumns, paymentBrands, socialLinks } from "@/data/site";
import { useSiteShell } from "@/state/SiteShellContext";
import { useUtility } from "@/state/UtilityContext";

function SocialIcon({ label }: { label: string }) {
  if (label === "Facebook") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.6-1.6h1.7V4.8c-.3 0-1.3-.1-2.5-.1-2.4 0-4 1.5-4 4.2V11H7.5v3h2.8v8h3.2Z" />
      </svg>
    );
  }
  if (label === "Twitter") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22 5.9c-.7.3-1.4.5-2.2.6.8-.5 1.4-1.2 1.7-2.1-.8.4-1.6.8-2.5.9A3.8 3.8 0 0 0 12.4 8c0 .3 0 .6.1.9A10.8 10.8 0 0 1 4.6 5c-.4.6-.6 1.2-.6 2 0 1.3.7 2.4 1.7 3.1-.6 0-1.2-.2-1.7-.5v.1c0 1.8 1.3 3.4 3.1 3.7-.3.1-.7.2-1 .2l-.7-.1a3.8 3.8 0 0 0 3.5 2.6A7.7 7.7 0 0 1 3 18a11 11 0 0 0 6 1.8c7.2 0 11.2-6 11.2-11.1v-.5c.8-.6 1.4-1.3 1.9-2.2Z" />
      </svg>
    );
  }
  if (label === "LinkedIn") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.9 8.6H3.6V20h3.3V8.6Zm.2-3.5a1.9 1.9 0 1 0-3.8 0 1.9 1.9 0 0 0 3.8 0ZM20.4 13.4c0-3.2-1.7-4.8-4-4.8-1.8 0-2.6 1-3 1.7V8.6h-3.2V20h3.3v-5.7c0-1.5.3-3 2.2-3 1.8 0 1.8 1.7 1.8 3V20H21v-6.6Z" />
      </svg>
    );
  }
  if (label === "Pinterest") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 3a9 9 0 0 0-3.3 17.4c0-.7 0-1.8.3-2.5l1.3-5.3s-.3-.7-.3-1.6c0-1.5.9-2.7 2-2.7.9 0 1.4.7 1.4 1.6 0 1-.6 2.4-.9 3.8-.3 1.1.6 2 1.7 2 2.1 0 3.4-2.6 3.4-5.7 0-2.4-1.6-4.1-4.6-4.1-3.4 0-5.6 2.5-5.6 5.4 0 1 .3 1.8.8 2.4.2.3.2.4.1.8l-.3 1.1c-.1.4-.5.5-.9.4-1.6-.7-2.3-2.6-2.3-4.7 0-3.5 2.9-7.7 8.8-7.7 4.7 0 7.8 3.4 7.8 7 0 4.8-2.7 8.3-6.6 8.3-1.3 0-2.5-.7-2.9-1.4l-.8 3a10 10 0 0 1-1.2 2.5A9 9 0 1 0 12 3Z" />
      </svg>
    );
  }
  if (label === "YouTube") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23 12s0-3-1-4.4c-.6-.8-1.3-1-2.1-1.1C16.7 6.2 12 6.2 12 6.2h0s-4.7 0-7.9.3c-.8 0-1.5.3-2.1 1.1C1 9 1 12 1 12s0 3 1 4.4c.6.8 1.4 1 2.3 1.1 1.7.2 7.7.3 7.7.3s4.7 0 7.9-.3c.8-.1 1.5-.3 2.1-1.1 1-1.4 1-4.4 1-4.4ZM9.8 15.5v-7l6 3.5-6 3.5Z" />
      </svg>
    );
  }

  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1.2 5.2c1.9 0 3.2.8 3.2.8l-.8 1.4s-1-.6-2.3-.6c-1 0-1.5.5-1.5 1 0 .6.7.9 1.7 1.2 1.6.5 3.4 1.2 3.4 3.4 0 2-1.6 3.4-4.1 3.4-2.3 0-3.9-1.1-3.9-1.1l.9-1.5s1.3.9 3 1c1.2 0 1.9-.5 1.9-1.2 0-.8-.8-1.1-1.9-1.4-1.6-.5-3.1-1.2-3.1-3.2 0-1.8 1.5-3.2 3.6-3.2Z" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { footerAttribution, supportEmail } = useSiteShell();
  const { t } = useUtility();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="mt-16 text-white motion-footer-enter">
      <div className="bg-[#0d0d0d] bg-[url('https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center">
        <div className="bg-black/85">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              {footerColumns.map((column) => (
                <div key={column.titleKey}>
                  <h3 className="mb-5 text-[18px] font-bold uppercase tracking-wide text-white">{t(column.titleKey)}</h3>
                  <ul className="space-y-4 text-[14px] leading-6 text-white/85">
                    {column.links.map((item) => (
                      <li key={item.label} className="flex gap-3">
                        <span className="text-[#ff3434]">•</span>
                        <Link href={item.href} className="transition-colors hover:text-[#ff3434]">
                          {item.label.includes("@") ? supportEmail : item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#8f1f22] bg-[linear-gradient(90deg,#6f1116_0%,#9d2327_50%,#6f1116_100%)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:px-10">
          <div className="flex items-center gap-4 text-[15px] font-bold uppercase tracking-wide">
            <span>{t("footer.followUs")}</span>
            <div className="flex gap-2">
              {socialLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex h-8 w-8 items-center justify-center rounded-sm border border-white/40 bg-white text-black transition duration-300 hover:-translate-y-0.5 hover:border-[#ff3434] hover:bg-[#ff3434] hover:text-white"
                >
                  <SocialIcon label={item.label} />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-3 text-[15px] font-bold uppercase tracking-wide lg:flex-row lg:items-center lg:justify-center">
            <span>{t("footer.newsletterTitle")}</span>
            <form onSubmit={handleSubmit} className="w-full max-w-105">
              <div className="flex overflow-hidden rounded-sm bg-white">
                <input
                  aria-label="Email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={t("newsletter.placeholder")}
                  className="h-12 flex-1 px-4 text-[#1f1f1f] outline-none"
                />
                <button type="submit" className="h-12 bg-[#ff3434] px-5 text-[13px] font-bold text-white">
                  {t("newsletter.cta")}
                </button>
              </div>
              {subscribed ? <p className="mt-2 text-[12px] uppercase text-white/80">{t("footer.newsletterThanks")}</p> : null}
            </form>
          </div>

          <div className="flex flex-wrap items-center gap-2 lg:justify-end">
            {paymentBrands.map((brand) => (
              <div key={brand} className="flex h-8 min-w-16 items-center justify-center rounded-sm bg-white px-2 text-[11px] font-bold text-[#1f1f1f]">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#111] px-4 py-5 text-[13px] text-white/85 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <p>
            {footerAttribution.text}{" "}
            {footerAttribution.enabled ? (
              <Link href={footerAttribution.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                {footerAttribution.linkText}
              </Link>
            ) : null}
          </p>
          <p>{t("footer.replicationNote")}</p>
        </div>
      </div>
    </footer>
  );
}
