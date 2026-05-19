"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";

type AdminLoginFormProps = {
  nextPath?: string;
};

export function AdminLoginForm({ nextPath }: AdminLoginFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("Sign-in failed.");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("Sign-in failed.");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: { message?: string } } | null;
        setErrorMessage(payload?.error?.message ?? "Sign-in failed.");
        setStatus("error");
        return;
      }

      window.location.assign(nextPath || "/admin");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section className="py-16 sm:py-24">
      <Container width="reading">
        <Card>
          <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Protected access</p>
          <h1 className="mt-3 font-display text-4xl tracking-tight">Admin sign in</h1>
          <p className="mt-3 text-sm leading-6 text-text-muted">
            Use the configured admin credentials from the environment to access inquiries, appointments, orders, and analytics.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4" aria-busy={status === "submitting"}>
            <label className="block">
              <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Email</span>
              <input type="email" name="email" required className="signal-input mt-1.5" placeholder="admin@company.com" />
            </label>
            <label className="block">
              <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Password</span>
              <input type="password" name="password" required className="signal-input mt-1.5" placeholder="••••••••" />
            </label>
            {status === "error" ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
            <Button type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </Card>
      </Container>
    </Section>
  );
}