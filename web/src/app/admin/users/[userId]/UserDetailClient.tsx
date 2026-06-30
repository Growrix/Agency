"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";

type UserDetail = {
  id: string;
  email: string;
  role: "public" | "subscriber" | "customer" | "admin";
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  marketing_opt_in: boolean;
  signup_completed_at: string | null;
  signup_intent_source: string | null;
  clerk_user_id: string | null;
  created_at: string;
  updated_at: string;
};

const MUTABLE_ROLES: Array<UserDetail["role"]> = ["subscriber", "customer", "admin"];

function displayName(user: UserDetail) {
  const composed = [user.first_name, user.last_name].filter(Boolean).join(" ").trim();
  return composed || user.email;
}

function formatDateTime(value: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

export function UserDetailClient({ userId }: { userId: string }) {
  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/v1/admin/users/${userId}`, {
        credentials: "same-origin",
      });
      const payload = (await response.json().catch(() => null)) as
        | { data?: UserDetail; error?: { message?: string } }
        | null;
      if (!response.ok || !payload?.data) {
        throw new Error(payload?.error?.message ?? "Unable to load user.");
      }
      setUser(payload.data);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to load user.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchUser();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchUser]);

  async function patch(body: Record<string, unknown>, successMessage: string) {
    setBusy(true);
    setNotice(null);
    setError(null);
    try {
      const response = await fetch(`/api/v1/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(body),
      });
      const payload = (await response.json().catch(() => null)) as
        | { data?: UserDetail; error?: { message?: string } }
        | null;
      if (!response.ok || !payload?.data) {
        throw new Error(payload?.error?.message ?? "Unable to update user.");
      }
      setUser(payload.data);
      setNotice(successMessage);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to update user.");
    } finally {
      setBusy(false);
    }
  }

  async function handleRoleChange(role: UserDetail["role"]) {
    if (!user) return;
    if (role === user.role) return;
    if (!window.confirm(`Change role from ${user.role} to ${role}?`)) return;
    await patch({ role }, `Role updated to ${role}.`);
  }

  async function handleRevoke() {
    if (!user?.signup_completed_at) return;
    if (
      !window.confirm(
        "Revoke admission? This user will be redirected to /complete-account on their next visit.",
      )
    ) {
      return;
    }
    await patch({ signup_completed_at: null }, "Admission revoked.");
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/admin/users" className="text-sm text-text-muted hover:text-primary">
        ← All users
      </Link>

      {loading ? (
        <p className="mt-4 text-sm text-text-muted">Loading…</p>
      ) : !user ? (
        <p className="mt-4 text-sm text-destructive">{error ?? "User not found."}</p>
      ) : (
        <div className="mt-6 space-y-6">
          <Card>
            <header>
              <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">User</p>
              <h1 className="mt-1 font-display text-2xl tracking-tight">{displayName(user)}</h1>
              <p className="mt-1 text-sm text-text-muted">{user.email}</p>
            </header>

            <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Role</dt>
                <dd className="mt-1 font-medium">{user.role}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Source</dt>
                <dd className="mt-1 font-medium">
                  {user.clerk_user_id ? "Clerk" : "Legacy"}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Phone</dt>
                <dd className="mt-1 font-medium">{user.phone ?? "—"}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Marketing</dt>
                <dd className="mt-1 font-medium">{user.marketing_opt_in ? "Opted in" : "—"}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Signup completed</dt>
                <dd className="mt-1 font-medium">{formatDateTime(user.signup_completed_at)}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Intent source</dt>
                <dd className="mt-1 font-medium">{user.signup_intent_source ?? "—"}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Created</dt>
                <dd className="mt-1 font-medium">{formatDateTime(user.created_at)}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Updated</dt>
                <dd className="mt-1 font-medium">{formatDateTime(user.updated_at)}</dd>
              </div>
            </dl>
          </Card>

          <Card>
            <h2 className="font-display text-lg tracking-tight">Role assignment</h2>
            <p className="mt-1 text-sm text-text-muted">
              Promoting to admin grants the user the operator surfaces under <code>/admin</code>.
              Admins bypass the sign-up completion gate.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {MUTABLE_ROLES.map((option) => (
                <Button
                  key={option}
                  type="button"
                  size="sm"
                  variant={option === user.role ? "primary" : "outline"}
                  disabled={busy || option === user.role}
                  onClick={() => void handleRoleChange(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="font-display text-lg tracking-tight">Sign-up admission</h2>
            <p className="mt-1 text-sm text-text-muted">
              Revoking admission clears <code>signup_completed_at</code>. The user keeps their
              Clerk session but is sent through the <code>/complete-account</code> flow before
              they can read or write any dashboard data again.
            </p>
            <div className="mt-4">
              <Button
                type="button"
                size="sm"
                variant="destructive"
                disabled={busy || !user.signup_completed_at}
                onClick={() => void handleRevoke()}
              >
                Revoke admission
              </Button>
            </div>
          </Card>

          {notice ? <p className="text-sm text-success">{notice}</p> : null}
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </div>
      )}
    </main>
  );
}
