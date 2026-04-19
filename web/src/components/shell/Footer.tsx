import Link from "next/link";
import { FOOTER_NAV } from "@/lib/nav";
import { Container } from "@/components/primitives/Container";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <Container width="shell">
        <div className="grid gap-10 py-16 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="size-8 rounded-[10px] bg-[var(--color-primary)] text-[var(--color-surface)] inline-flex items-center justify-center font-display font-bold">
                G
              </span>
              <span className="font-display text-lg tracking-tight">Growrix OS</span>
            </Link>
            <p className="mt-4 max-w-sm text-[var(--color-text-muted)] leading-7">
              A product-minded studio building SaaS applications, websites, MCP servers, and automation systems for ambitious teams.
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
              Average response time
            </p>
            <p className="mt-1 font-display text-2xl tracking-tight">Under 2 business hours</p>
          </div>

          {Object.entries(FOOTER_NAV).map(([group, items]) => (
            <div key={group}>
              <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
                {group}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {items.map((it) => (
                  <li key={it.label}>
                    <Link
                      href={it.href}
                      className="text-sm hover:text-[var(--color-primary)] transition-colors"
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-[var(--color-border)] py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} Growrix OS. All rights reserved.
          </p>
          <p className="text-xs text-[var(--color-text-muted)] font-mono">
            Built deliberately. Shipped with care.
          </p>
        </div>
      </Container>
    </footer>
  );
}
