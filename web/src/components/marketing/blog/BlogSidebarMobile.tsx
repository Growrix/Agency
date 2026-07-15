"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/primitives/Button";
import { MobileFilterChips } from "@/components/marketing/MobileFilterChips";
import { motion } from "@/components/motion/Motion";

type BlogSidebarMobileProps = {
  categories: { category: string; count: number }[];
  tags: { tag: string; count: number }[];
  initialSearch?: string;
};

export function BlogSidebarMobile({ categories, tags, initialSearch = "" }: BlogSidebarMobileProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(initialSearch);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [subscribeError, setSubscribeError] = useState("");

  const activeCategory = searchParams.get("category") ?? "all";
  const activeTag = searchParams.get("tag");

  function applyFilter(next: URLSearchParams) {
    const qs = next.toString();
    router.push(qs ? `/blog?${qs}` : "/blog", { scroll: false });
  }

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const next = new URLSearchParams(searchParams.toString());
    if (search.trim()) next.set("q", search.trim());
    else next.delete("q");
    applyFilter(next);
  }

  function setCategory(c: string) {
    const next = new URLSearchParams(searchParams.toString());
    if (c === "all") next.delete("category");
    else next.set("category", c);
    applyFilter(next);
  }

  function setTag(t: string | null) {
    const next = new URLSearchParams(searchParams.toString());
    if (t) next.set("tag", t);
    else next.delete("tag");
    applyFilter(next);
  }

  async function onSubscribe(e: FormEvent) {
    e.preventDefault();
    if (!email.trim() || subscribing) return;
    setSubscribeError("");
    setSubscribing(true);
    try {
      const res = await fetch("/api/v1/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const payload = (await res.json()) as { success?: boolean; error?: { message?: string } };
      if (!res.ok || !payload.success) {
        setSubscribeError(payload.error?.message ?? "Something went wrong. Please try again.");
        return;
      }
      setSubscribed(true);
      setEmail("");
    } catch {
      setSubscribeError("Network error. Please try again.");
    } finally {
      setSubscribing(false);
    }
  }

  const categoryChips = [
    { label: "All articles", value: "all" },
    ...categories.map((c) => ({ label: `${c.category} (${c.count})`, value: c.category })),
  ];

  return (
    <div className="blog-sidebar-mobile">
      <form onSubmit={onSearch} className="blog-sidebar-mobile__search">
        <div className="blog-sidebar-mobile__search-field">
          <MagnifyingGlassIcon className="blog-sidebar-mobile__search-icon" aria-hidden />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles…"
            aria-label="Search articles"
            className="blog-sidebar-mobile__search-input"
          />
        </div>
        <Button type="submit" size="sm">
          Go
        </Button>
      </form>

      <MobileFilterChips items={categoryChips} active={activeCategory} onSelect={setCategory} />

      {tags.length > 0 ? (
        <div className="blog-sidebar-mobile__tags">
          <p className="blog-sidebar-mobile__label">Tags</p>
          <div className="mobile-filter-chips">
            <div className="mobile-filter-chips__scroll">
              {tags.map((t) => {
                const active = activeTag === t.tag;
                return (
                  <button
                    key={t.tag}
                    type="button"
                    onClick={() => setTag(active ? null : t.tag)}
                    aria-pressed={active}
                    className={`mobile-filter-chips__chip${active ? " mobile-filter-chips__chip--active" : ""}`}
                  >
                    {t.tag} ({t.count})
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}

      <div className="blog-sidebar-mobile__subscribe">
        <div className="blog-sidebar-mobile__subscribe-head">
          <SparklesIcon className="size-4 text-secondary" aria-hidden />
          <p className="blog-sidebar-mobile__label">Field notes, monthly</p>
        </div>
        <p className="blog-sidebar-mobile__subscribe-copy">
          One short email a month with the studio&apos;s best writing on shipping software.
        </p>
        {subscribed ? (
          <motion.p
            initial={{ opacity: 0, scale: 0.92, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="blog-sidebar-mobile__subscribe-success"
          >
            You&apos;re on the list. Talk soon.
          </motion.p>
        ) : (
          <form onSubmit={onSubscribe} className="blog-sidebar-mobile__subscribe-form">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@studio.com"
              aria-label="Email address for newsletter"
              className="blog-sidebar-mobile__subscribe-input"
            />
            {subscribeError ? <p className="blog-sidebar-mobile__subscribe-error">{subscribeError}</p> : null}
            <Button type="submit" variant="secondary" fullWidth size="sm" disabled={subscribing}>
              {subscribing ? "Subscribing…" : "Subscribe"}
            </Button>
          </form>
        )}
      </div>

      <div className="blog-sidebar-mobile__about">
        <p className="blog-sidebar-mobile__label">About the studio</p>
        <p className="blog-sidebar-mobile__about-copy">
          Growrix OS is a small product studio shipping SaaS apps, websites, and automation for ambitious teams.
        </p>
        <Link href="/about" className="blog-sidebar-mobile__about-link">
          Read the studio story →
        </Link>
      </div>
    </div>
  );
}
