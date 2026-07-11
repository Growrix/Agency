import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background-page px-6 py-16 text-text-body">
      <div className="mx-auto max-w-container text-center">
        <p className="text-sm uppercase tracking-[0.18em] text-text-muted">404</p>
        <h1 className="mt-3 font-heading text-4xl text-text-inverse">Page not found</h1>
        <p className="mx-auto mt-4 max-w-2xl text-text-muted">
          The page you are looking for is unavailable. Return to the main Velocare experience or use the route index.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg border border-white/10 bg-background-surface px-5 py-3 font-medium text-text-inverse transition-colors hover:bg-background-elevated"
          >
            Go to Home
          </Link>
          <Link
            href="/routes"
            className="rounded-lg border border-white/10 px-5 py-3 font-medium text-text-inverse transition-colors hover:bg-background-surface"
          >
            Open Route Index
          </Link>
        </div>
      </div>
    </main>
  );
}
