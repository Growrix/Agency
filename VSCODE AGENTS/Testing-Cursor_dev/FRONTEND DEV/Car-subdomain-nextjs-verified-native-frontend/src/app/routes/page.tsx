import Link from "next/link";
import { sitePages } from "@/data/site-pages";

export default function RoutesPage() {
  return (
    <main className="min-h-screen bg-background-page px-6 py-12 text-text-body">
      <div className="mx-auto max-w-container">
        <h1 className="font-heading text-4xl text-text-inverse">Velocare Route Index</h1>
        <p className="mt-3 text-sm text-text-muted">
          This index maps the owned public routes for the Velocare frontend experience.
        </p>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {sitePages.map((page) => (
            <li key={`${page.canonicalPath}-${page.screenshot}`}>
              <Link
                href={page.canonicalPath}
                className="block rounded-lg border border-white/10 bg-background-surface px-4 py-3 transition-colors hover:bg-background-elevated"
              >
                <div className="font-heading text-lg text-text-inverse">{page.title}</div>
                <div className="text-xs text-text-muted">Canonical: {page.canonicalPath}</div>
                <div className="text-xs text-text-muted">Legacy Alias: {page.htmlPath}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
