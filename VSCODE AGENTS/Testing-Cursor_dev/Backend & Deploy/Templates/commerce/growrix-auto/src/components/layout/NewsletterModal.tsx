"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { socialLinks } from "@/data/site";
import { useUtility } from "@/state/UtilityContext";

const newsletterDismissKey = "growrix-newsletter-dismissed";

export default function NewsletterModal() {
  const { t } = useUtility();
  const [open, setOpen] = useState(false);
  const [doNotShow, setDoNotShow] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(newsletterDismissKey) === "true";
  });
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (doNotShow) return;

    const dismissed = window.localStorage.getItem(newsletterDismissKey) === "true";
    if (dismissed) return;

    const timer = window.setTimeout(() => {
      setOpen(true);
    }, 3000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [doNotShow]);

  const closeModal = () => {
    if (doNotShow) {
      window.localStorage.setItem(newsletterDismissKey, "true");
    }

    setOpen(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-3 pt-4 backdrop-blur-sm md:p-6 md:pt-8">
      <div className="relative w-full max-w-5xl max-h-[calc(100vh-2rem)] overflow-y-auto rounded-sm bg-white shadow-2xl md:max-h-[calc(100vh-4rem)]">
        <button
          aria-label="Close newsletter modal"
          onClick={closeModal}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#111] text-white"
        >
          ×
        </button>
        <div className="grid gap-8 px-6 py-10 md:grid-cols-2 md:px-10 md:py-12">
          <div className="pt-4">
            <h2 className="text-[40px] font-black uppercase leading-none text-[#111]">{t("newsletter.title")}</h2>
            <label className="mt-5 flex items-center gap-3 text-[15px] text-[#333]">
              <input
                type="checkbox"
                checked={doNotShow}
                onChange={(event) => setDoNotShow(event.target.checked)}
                className="h-4 w-4"
              />
              {t("newsletter.doNotShow")}
            </label>
            <p className="mt-8 max-w-xl text-[16px] leading-8 text-[#555]">
              {t("newsletter.description")}
            </p>
            <form onSubmit={handleSubmit} className="mt-10 max-w-xl">
              <div className="flex overflow-hidden rounded-sm shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={t("newsletter.placeholder")}
                  className="h-14 flex-1 px-4 text-[#1f1f1f] outline-none"
                />
                <button type="submit" className="h-14 bg-[#ff3434] px-6 text-[15px] font-bold text-white">
                  {t("newsletter.cta")}
                </button>
              </div>
              {subscribed ? <p className="mt-3 text-[14px] font-semibold text-[#1d7a34]">{t("newsletter.subscribed")}</p> : null}
            </form>
            <div className="mt-8 flex gap-3 text-[#1c1c1c]">
              {socialLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center border border-[#ddd] bg-white text-[13px] font-bold transition-colors hover:border-[#ff3434] hover:text-[#ff3434]"
                >
                  {item.label.slice(0, 2).toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-80 w-full max-w-120">
              <div className="absolute left-0 top-10 h-56 w-56 rounded-full bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=700&q=80')] bg-cover bg-center shadow-xl" />
              <div className="absolute right-8 top-6 h-64 w-64 rounded-full bg-[url('https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=700&q=80')] bg-cover bg-center shadow-xl" />
              <div className="absolute bottom-0 left-8 h-32 w-32 rounded-full bg-[url('https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=500&q=80')] bg-cover bg-center shadow-xl" />
              <div className="absolute bottom-2 right-4 h-44 w-44 rounded-full bg-[url('https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=700&q=80')] bg-cover bg-center shadow-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
