"use client";

import { useEffect } from "react";
import { Button, LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    void fetch("/api/v1/observability/errors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        route: typeof window !== "undefined" ? window.location.pathname : null,
      }),
    }).catch(() => undefined);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <Section className="py-20 sm:py-28">
          <Container width="reading">
            <Card>
              <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Application error</p>
              <h1 className="mt-3 font-display text-4xl tracking-tight">Something went wrong.</h1>
              <p className="mt-4 text-sm leading-6 text-text-muted">
                The error has been recorded for follow-up. You can retry the current route or move back to a known page.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button type="button" onClick={() => reset()}>Try again</Button>
                <LinkButton href="/" variant="outline">Back to home</LinkButton>
              </div>
            </Card>
          </Container>
        </Section>
      </body>
    </html>
  );
}