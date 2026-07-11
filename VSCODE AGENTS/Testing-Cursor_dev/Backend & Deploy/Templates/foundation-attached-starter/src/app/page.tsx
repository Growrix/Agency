import { getHomeSurface } from "@/lib/foundation-api";

export default async function Home() {
  const surface = await getHomeSurface();

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10 sm:px-8 lg:px-10">
      <section className="starter-panel grid gap-6 rounded-[32px] p-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          <span className="starter-kicker">
            {surface.mode === "attached" ? "foundation attached" : "mock fallback mode"}
          </span>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            {surface.page.sections[0]?.title ?? surface.page.title}
          </h1>
          <p className="max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">
            {surface.page.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <a className="starter-button starter-button--primary" href={surface.foundationBaseUrl}>
              Foundation runtime
            </a>
            <a className="starter-button" href={`${surface.foundationBaseUrl}/api/health`}>
              Health envelope
            </a>
          </div>
        </div>

        <div className="rounded-[28px] border border-black/10 bg-white/70 p-6 shadow-[0_24px_80px_rgba(6,22,48,0.08)]">
          <p className="starter-kicker">Attach status</p>
          <div className="mt-5 space-y-3 text-sm">
            <StatusRow label="Mode" value={surface.mode} />
            <StatusRow label="Foundation URL" value={surface.foundationBaseUrl} />
            <StatusRow label="Health status" value={surface.healthStatus} />
            <StatusRow label="Auth mode" value={surface.authMode} />
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <article className="starter-panel rounded-[28px] p-7">
          <h2 className="text-2xl font-semibold">Section payload</h2>
          <div className="mt-5 grid gap-4">
            {surface.page.sections.map((section) => (
              <div key={section.id} className="rounded-2xl border border-black/10 bg-white/70 p-4">
                <p className="starter-kicker">{section.kind}</p>
                <h3 className="mt-2 text-lg font-semibold">{section.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{section.body}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="starter-panel rounded-[28px] p-7">
          <h2 className="text-2xl font-semibold">Starter behavior</h2>
          <ul className="mt-5 grid gap-4 text-sm leading-6 text-[var(--muted)]">
            <li className="rounded-2xl border border-black/10 bg-white/70 p-4">
              Uses the Foundation Core content and health APIs when reachable.
            </li>
            <li className="rounded-2xl border border-black/10 bg-white/70 p-4">
              Falls back to local typed mock data when the foundation runtime is offline.
            </li>
            <li className="rounded-2xl border border-black/10 bg-white/70 p-4">
              Provides a clean starting point for screenshot-driven template work without DS runtime coupling.
            </li>
          </ul>
        </article>
      </section>
    </main>
  );
}

function StatusRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-black/10 bg-[var(--surface-soft)] px-4 py-3">
      <span className="text-[var(--muted)]">{label}</span>
      <span className="text-right font-medium text-[var(--foreground)]">{value}</span>
    </div>
  );
}
