"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { Card } from "@/components/primitives/Card";
import { Button } from "@/components/primitives/Button";
import { motion } from "@/components/motion/Motion";

type SidebarProps = {
  categories: { category: string; count: number }[];
  tags: { tag: string; count: number }[];
  initialSearch?: string;
};

export function BlogSidebar({ categories, tags, initialSearch = "" }: SidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(initialSearch);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const activeCategory = searchParams.get("category");
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

  function setCategory(c: string | null) {
    const next = new URLSearchParams(searchParams.toString());
    if (c) next.set("category", c);
    else next.delete("category");
    applyFilter(next);
  }

  function setTag(t: string | null) {
    const next = new URLSearchParams(searchParams.toString());
    if (t) next.set("tag", t);
    else next.delete("tag");
    applyFilter(next);
  }

  function onSubscribe(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  }

  return (
    <aside className="space-y-6">
      {/* Search */}
      <Card>
        <h3 className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">
          Search field notes
        </h3>
        <form onSubmit={onSearch} className="mt-3 flex items-center gap-2">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles…"
              aria-label="Search articles"
              className="w-full rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface)] pl-9 pr-3 py-2 text-sm placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>
          <Button type="submit" size="sm">Go</Button>
        </form>
      </Card>

      {/* Categories */}
      <Card>
        <h3 className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">
          Categories
        </h3>
        <ul className="mt-3 space-y-1.5">
          <li>
            <button
              onClick={() => setCategory(null)}
              className={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors ${
                !activeCategory
                  ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-medium"
                  : "hover:bg-[var(--color-inset)]"
              }`}
            >
              <span>All articles</span>
            </button>
          </li>
          {categories.map((c) => (
            <li key={c.category}>
              <button
                onClick={() => setCategory(c.category)}
                className={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors ${
                  activeCategory === c.category
                    ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-medium"
                    : "hover:bg-[var(--color-inset)]"
                }`}
              >
                <span>{c.category}</span>
                <span className="font-mono text-xs text-[var(--color-text-muted)]">{c.count}</span>
              </button>
            </li>
          ))}
        </ul>
      </Card>

      {/* Tags */}
      <Card>
        <h3 className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">
          Tags
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => {
            const active = activeTag === t.tag;
            return (
              <button
                key={t.tag}
                onClick={() => setTag(active ? null : t.tag)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors ${
                  active
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-surface)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)]"
                }`}
              >
                <span>{t.tag}</span>
                <span className={`font-mono text-[10px] ${active ? "opacity-80" : "text-[var(--color-text-muted)]"}`}>
                  {t.count}
                </span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Subscribe */}
      <Card variant="dark">
        <div className="flex items-center gap-2">
          <SparklesIcon className="size-4 text-[var(--color-secondary)]" />
          <h3 className="font-mono text-[11px] uppercase tracking-wider text-white/70">
            Field notes, monthly
          </h3>
        </div>
        <p className="mt-2 text-sm leading-6 text-white/80">
          One short email a month with the studio&apos;s best writing on shipping software.
        </p>
        {subscribed ? (
          <motion.p
            initial={{ opacity: 0, scale: 0.92, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 24, mass: 0.6 }}
            className="mt-4 rounded-[10px] bg-white/10 px-3 py-2.5 text-sm text-white"
          >
            You&apos;re on the list. Talk soon.
          </motion.p>
        ) : (
          <form onSubmit={onSubscribe} className="mt-4 space-y-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@studio.com"
              aria-label="Email address for newsletter"
              className="w-full rounded-[10px] border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-[var(--color-secondary)]"
            />
            <Button type="submit" variant="secondary" fullWidth size="sm">
              Subscribe
            </Button>
          </form>
        )}
      </Card>

      {/* Studio blurb */}
      <Card variant="inset">
        <h3 className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">
          About the studio
        </h3>
        <p className="mt-3 text-sm leading-6 text-[var(--color-text)]">
          Signal Atelier is a small product studio shipping SaaS apps, websites, MCP servers, and automation for ambitious teams.
        </p>
        <Link
          href="/about"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)]"
        >
          Read the studio story →
        </Link>
      </Card>
    </aside>
  );
}
