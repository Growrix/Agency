"use client";

import { useState, type FormEvent } from "react";
import { ClerkSignInPanel } from "@/components/auth/ClerkSignInPanel";
import { Button } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";
import { isClerkConfiguredClient } from "@/lib/clerk-client";

type CustomerAuthPanelProps = {
  nextPath?: string;
};

type Mode = "signin" | "register";

function LegacyCustomerAuthPanel({ nextPath = "/dashboard" }: CustomerAuthPanelProps) {
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
          <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Customer access</p>
          <h1 className="mt-3 font-display text-4xl tracking-tight">
            {isRegister ? "Create your account" : "Sign in to your dashboard"}
          </h1>
          <p className="mt-3 text-sm leading-6 text-text-muted">
            Access downloads, orders, appointments, and support from one customer portal.
          </p>

          <div className="mt-6 flex gap-2">
            <Button type="button" size="sm" variant={mode === "signin" ? "primary" : "ghost"} onClick={() => setMode("signin")}>
              Sign in
            </Button>
            <Button type="button" size="sm" variant={mode === "register" ? "primary" : "ghost"} onClick={() => setMode("register")}>
              Register
            </Button>
          </div>

          <form onSubmit={onSubmit} className="mt-8 space-y-4" aria-busy={status === "submitting"}>
            {isRegister ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">First name</span>
                  <input type="text" name="firstName" className="signal-input mt-1.5" />
                </label>
                <label className="block">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Last name</span>
                  <input type="text" name="lastName" className="signal-input mt-1.5" />
                </label>
              </div>
            ) : null}
            <label className="block">
              <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Email</span>
              <input type="email" name="email" required className="signal-input mt-1.5" placeholder="you@company.com" />
            </label>
            <label className="block">
              <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Password</span>
              <input type="password" name="password" required className="signal-input mt-1.5" placeholder="••••••••" />
            </label>
            {status === "error" ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
            <Button type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? "Working..." : isRegister ? "Create account" : "Sign in"}
            </Button>
          </form>
        </Card>
      </Container>
    </Section>
  );
}

export function CustomerAuthPanel({ nextPath = "/dashboard" }: CustomerAuthPanelProps) {
  if (isClerkConfiguredClient()) {
    return (
      <ClerkSignInPanel
        redirectUrl={nextPath}
        title="Sign in to your dashboard"
        description="Access downloads, orders, appointments, and support from one customer portal."
      />
    );
  }

  return <LegacyCustomerAuthPanel nextPath={nextPath} />;
}
