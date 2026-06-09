"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";

type CustomerAuthPanelProps = {
  nextPath?: string;
};

type Mode = "signin" | "register";

export function CustomerAuthPanel({ nextPath = "/dashboard" }: CustomerAuthPanelProps) {
  const [mode, setMode] = useState<Mode>("signin");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("Authentication failed.");

  const isRegister = mode === "register";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("Authentication failed.");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const endpoint = isRegister ? "/api/v1/auth/register" : "/api/v1/auth/login";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: { message?: string } } | null;
        setErrorMessage(payload?.error?.message ?? "Authentication failed.");
        setStatus("error");
        return;
      }

      window.location.assign(nextPath);
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section className="py-16 sm:py-24">
      <Container width="reading">
        <Card>
          <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Customer portal</p>
          <h1 className="mt-3 font-display text-4xl tracking-tight">Access your dashboard</h1>
          <p className="mt-3 text-sm leading-6 text-text-muted">
            Sign in to view downloads, order history, and appointments, or create an account with the same email you used at checkout.
          </p>

          <div className="mt-6 flex gap-2">
            <Button type="button" variant={isRegister ? "outline" : "primary"} size="sm" onClick={() => setMode("signin")}>
              Sign in
            </Button>
            <Button type="button" variant={isRegister ? "primary" : "outline"} size="sm" onClick={() => setMode("register")}>
              Create account
            </Button>
          </div>

          <form onSubmit={onSubmit} className="mt-8 space-y-4" aria-busy={status === "submitting"}>
            {isRegister ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.18em] text-text-muted">First name</span>
                  <input name="first_name" required className="signal-input mt-1.5" placeholder="First name" />
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.18em] text-text-muted">Last name</span>
                  <input name="last_name" required className="signal-input mt-1.5" placeholder="Last name" />
                </label>
              </div>
            ) : null}
            <label className="block">
              <span className="text-xs uppercase tracking-[0.18em] text-text-muted">Email</span>
              <input type="email" name="email" required className="signal-input mt-1.5" placeholder="you@company.com" />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-[0.18em] text-text-muted">Password</span>
              <input type="password" name="password" required className="signal-input mt-1.5" placeholder="••••••••" />
            </label>
            {isRegister ? (
              <p className="text-sm text-text-muted">
                Passwords must be at least 8 characters and include uppercase, lowercase, number, and special character.
              </p>
            ) : null}
            {status === "error" ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
            <Button type="submit" disabled={status === "submitting"}>
              {status === "submitting"
                ? (isRegister ? "Creating account..." : "Signing in...")
                : (isRegister ? "Create account" : "Sign in")}
            </Button>
          </form>
        </Card>
      </Container>
    </Section>
  );
}