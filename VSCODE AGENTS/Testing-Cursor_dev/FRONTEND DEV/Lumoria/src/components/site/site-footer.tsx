import Link from "next/link";
import { footerColumns } from "@/data/site-content";

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-(--lumoria-color-secondary) text-(--lumoria-color-inverse)">
      <div className="mx-auto grid w-full max-w-(--lumoria-container-max-width) gap-10 px-6 py-14 md:grid-cols-4">
        <section>
          <h2 className="font-(family-name:--lumoria-font-heading) text-2xl text-white">
            Lumoria
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/80">
            Architecture and interior studio delivering premium residential,
            commercial, and civic design systems.
          </p>
        </section>

        {footerColumns.map((column) => (
          <section key={column.heading}>
            <h3 className="font-(family-name:--lumoria-font-heading) text-lg text-white">
              {column.heading}
            </h3>
            <ul className="mt-4 space-y-2">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto w-full max-w-(--lumoria-container-max-width) px-6 py-5 text-xs text-white/70">
          Copyright 2026 Lumoria. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
