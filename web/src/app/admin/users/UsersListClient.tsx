"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { cn } from "@/lib/utils";

type UserListItem = {
  id: string;
  email: string;
  role: "public" | "subscriber" | "customer" | "admin";
  first_name: string | null;
  last_name: string | null;
  signup_completed_at: string | null;
  clerk_user_id: string | null;
  updated_at: string;
  created_at: string;
};

type ListEnvelope = {
  data: {
    items: UserListItem[];
    total: number;
    limit: number;
    offset: number;
  };
};

const ROLE_FILTERS = [
  { value: "", label: "All" },
  { value: "admin", label: "Admin" },
  { value: "customer", label: "Customer" },
  { value: "subscriber", label: "Subscriber" },
];

const COMPLETION_FILTERS = [
  { value: "", label: "Any" },
  { value: "completed", label: "Completed" },
  { value: "incomplete", label: "Incomplete" },
];

function roleBadgeClass(role: UserListItem["role"]) {
  switch (role) {
    case "admin":
      return "bg-destructive/15 text-destructive";
    case "customer":
      return "bg-success/15 text-success";
    case "subscriber":
      return "bg-primary/15 text-primary";
    default:
      return "bg-inset/40 text-text-muted";
  }
}

function formatDateTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

function displayName(user: UserListItem) {
  const composed = [user.first_name, user.last_name].filter(Boolean).join(" ").trim();
  return composed || user.email;
}

export function UsersListClient() {
  const [role, setRole] = useState("");
  const [completion, setCompletion] = useState("");
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<UserListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchList = useCallback(async () => {
    setLoading(true);
    setError(null);
    const url = new URL("/api/v1/admin/users", window.location.origin);
    if (role) url.searchParams.set("role", role);
    if (completion) url.searchParams.set("completion", completion);
    if (query.trim()) url.searchParams.set("q", query.trim());
    url.searchParams.set("limit", "200");

    try {
      const response = await fetch(url.toString(), { credentials: "same-origin" });
      const payload = (await response.json().catch(() => null)) as
        | (ListEnvelope & { error?: { message?: string } })
        | null;
      if (!response.ok || !payload?.data) {
        throw new Error(payload?.error?.message ?? "Unable to load users.");
      }
      setItems(payload.data.items);
      setTotal(payload.data.total);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to load users.");
    } finally {
      setLoading(false);
    }
  }, [completion, query, role]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchList();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchList]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Admin</p>
          <h1 className="mt-1 font-display text-3xl tracking-tight">Users</h1>
          <p className="mt-2 text-sm text-text-muted">
            Role assignment + sign-up completion state. Revoking admission forces the user back
            through <code className="rounded-sm bg-inset/30 px-1 py-0.5 text-xs">/complete-account</code>{" "}
            on their next visit.
          </p>
        </div>
        <p className="text-xs text-text-muted">{total} users</p>
      </header>

      <Card>
        <div className="flex flex-wrap items-center gap-3 border-b border-border/55 px-4 py-3">
          <div className="flex items-center gap-2">
            <label className="text-xs text-text-muted" htmlFor="users-role">Role</label>
            <select
              id="users-role"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="rounded-sm border border-border bg-surface px-2 py-1.5 text-sm"
            >
              {ROLE_FILTERS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-text-muted" htmlFor="users-completion">Completion</label>
            <select
              id="users-completion"
              value={completion}
              onChange={(event) => setCompletion(event.target.value)}
              className="rounded-sm border border-border bg-surface px-2 py-1.5 text-sm"
            >
              {COMPLETION_FILTERS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-1 items-center gap-2 min-w-50">
            <label className="text-xs text-text-muted" htmlFor="users-query">Search</label>
            <input
              id="users-query"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="email, name, Clerk id"
              className="flex-1 rounded-sm border border-border bg-surface px-2 py-1.5 text-sm"
            />
          </div>
          <Button type="button" variant="outline" size="sm" onClick={() => void fetchList()}>
            Refresh
          </Button>
        </div>

        {error ? (
          <p role="alert" className="px-4 py-3 text-sm text-destructive">{error}</p>
        ) : null}

        {loading ? (
          <p className="px-4 py-6 text-sm text-text-muted">Loading…</p>
        ) : items.length === 0 ? (
          <p className="px-4 py-6 text-sm text-text-muted">No users match the current filters.</p>
        ) : (
          <ul className="divide-y divide-border/40">
            {items.map((user) => (
              <li key={user.id}>
                <Link
                  href={`/admin/users/${user.id}`}
                  className="block px-4 py-3 transition-colors hover:bg-inset/40"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
                            roleBadgeClass(user.role),
                          )}
                        >
                          {user.role}
                        </span>
                        {user.clerk_user_id ? (
                          <span className="font-mono text-[10px] text-text-muted">Clerk</span>
                        ) : (
                          <span className="font-mono text-[10px] text-text-muted">Legacy</span>
                        )}
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
                            user.signup_completed_at
                              ? "bg-success/10 text-success"
                              : "bg-warning/15 text-warning",
                          )}
                        >
                          {user.signup_completed_at ? "completed" : "incomplete"}
                        </span>
                      </div>
                      <p className="mt-1 truncate font-medium text-text">{displayName(user)}</p>
                      <p className="mt-0.5 truncate text-xs text-text-muted">{user.email}</p>
                    </div>
                    <p className="font-mono text-[11px] text-text-muted">{formatDateTime(user.updated_at)}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </main>
  );
}
