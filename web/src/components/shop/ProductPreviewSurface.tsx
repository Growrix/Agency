import type { PreviewVariant } from "@/lib/shop";

function BrowserShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-white/10 bg-[#0a0d12] text-white shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/4 px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">Preview environment</span>
      </div>
      <div className="bg-grid-strong bg-[#0d1117] p-4">{children}</div>
    </div>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[14px] border border-white/10 bg-white/4 px-4 py-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">{label}</p>
      <p className="mt-2 font-display text-lg tracking-tight text-white">{value}</p>
    </div>
  );
}

function MarketingPreview() {
  return (
    <BrowserShell>
      <div className="rounded-[18px] border border-white/10 bg-linear-to-br from-[#111722] via-[#10151f] to-[#0f1118] p-6">
        <div className="flex items-center justify-between gap-4 text-[11px] font-mono uppercase tracking-[0.2em] text-white/45">
          <span>Atelier theme</span>
          <span>Launch ready</span>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
          <div>
            <div className="h-3 w-28 rounded-full bg-primary/80" />
            <div className="mt-5 max-w-lg space-y-3">
              <div className="h-8 w-full rounded-full bg-white/90" />
              <div className="h-8 w-5/6 rounded-full bg-white/85" />
              <div className="h-8 w-2/3 rounded-full bg-white/75" />
            </div>
            <div className="mt-6 h-4 w-full max-w-xl rounded-full bg-white/15" />
            <div className="mt-3 h-4 w-4/5 rounded-full bg-white/12" />
            <div className="mt-8 flex gap-3">
              <div className="h-11 w-36 rounded-full bg-primary" />
              <div className="h-11 w-32 rounded-full border border-white/15 bg-white/5" />
            </div>
          </div>
          <div className="grid gap-4">
            <div className="rounded-[18px] border border-white/10 bg-white/5 p-4">
              <div className="aspect-4/3 rounded-[14px] bg-linear-to-br from-primary/30 via-accent/20 to-secondary/25" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[16px] border border-white/10 bg-white/4 p-4">
                <div className="h-3 w-16 rounded-full bg-white/30" />
                <div className="mt-4 h-16 rounded-[14px] bg-white/6" />
              </div>
              <div className="rounded-[16px] border border-white/10 bg-white/4 p-4">
                <div className="h-3 w-20 rounded-full bg-white/30" />
                <div className="mt-4 h-16 rounded-[14px] bg-white/6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserShell>
  );
}

function DashboardPreview() {
  return (
    <BrowserShell>
      <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
        <div className="rounded-[18px] border border-white/10 bg-white/4 p-4">
          <div className="h-9 w-full rounded-[14px] bg-primary/20" />
          <div className="mt-6 space-y-3">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="h-10 rounded-[14px] bg-white/6" />
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <StatPill label="MRR" value="$84k" />
            <StatPill label="Queue health" value="94%" />
            <StatPill label="Open alerts" value="07" />
          </div>
          <div className="rounded-[18px] border border-white/10 bg-white/4 p-5">
            <div className="flex items-center justify-between gap-4">
              <div className="h-3 w-28 rounded-full bg-white/28" />
              <div className="h-8 w-24 rounded-full bg-primary/25" />
            </div>
            <div className="mt-6 grid h-52 grid-cols-12 items-end gap-2">
              {[52, 74, 44, 83, 61, 91, 58, 88, 49, 77, 66, 95].map((value, index) => (
                <div key={index} className="rounded-t-[10px] bg-linear-to-t from-primary via-accent to-secondary" style={{ height: `${value}%` }} />
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[18px] border border-white/10 bg-white/4 p-4">
              <div className="h-3 w-24 rounded-full bg-white/28" />
              <div className="mt-4 space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="h-14 rounded-[14px] bg-white/6" />
                ))}
              </div>
            </div>
            <div className="rounded-[18px] border border-white/10 bg-white/4 p-4">
              <div className="h-3 w-28 rounded-full bg-white/28" />
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="h-20 rounded-[14px] bg-white/6" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserShell>
  );
}

function McpPreview() {
  return (
    <BrowserShell>
      <div className="grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
        <div className="rounded-[18px] border border-white/10 bg-white/4 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">Tool graph</p>
              <p className="mt-2 font-display text-xl tracking-tight text-white">Internal MCP runtime</p>
            </div>
            <div className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
              8 tools live
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {["crm_lookup", "list_invoices", "inventory_sync", "route_ticket"].map((tool) => (
              <div key={tool} className="rounded-[16px] border border-white/10 bg-black/25 p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">{tool}</p>
                <div className="mt-4 h-2 rounded-full bg-white/8">
                  <div className="h-full w-3/4 rounded-full bg-linear-to-r from-primary to-accent" />
                </div>
                <div className="mt-4 h-12 rounded-sm bg-white/5" />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-[18px] border border-white/10 bg-black/25 p-4 font-mono text-[11px] text-white/72">
            <div className="text-primary">$ tool trace --latest</div>
            <div className="mt-3">auth.session verified</div>
            <div>tool.crm_lookup completed</div>
            <div>trace.latency 148ms</div>
            <div>response shipped to host</div>
          </div>
          <StatPill label="Median latency" value="148ms" />
          <StatPill label="Audit coverage" value="100%" />
        </div>
      </div>
    </BrowserShell>
  );
}

function AutomationPreview() {
  return (
    <BrowserShell>
      <div className="rounded-[18px] border border-white/10 bg-white/4 p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">Automation map</p>
            <p className="mt-2 font-display text-xl tracking-tight text-white">Inquiry to CRM flow</p>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
            12 automations
          </div>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center">
          {[
            { title: "Lead captured", note: "Form + enrichment" },
            { title: "Routing logic", note: "Owner + priority" },
            { title: "CRM synced", note: "Slack + follow-up" },
          ].map((step, index) => (
            <>
              <div key={step.title} className="rounded-[16px] border border-white/10 bg-black/25 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">0{index + 1}</p>
                <p className="mt-2 font-display text-lg tracking-tight text-white">{step.title}</p>
                <p className="mt-2 text-sm text-white/58">{step.note}</p>
              </div>
              {index < 2 ? <div key={`${step.title}-connector`} className="hidden h-px w-12 bg-primary/45 lg:block" /> : null}
            </>
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <StatPill label="Exception paths" value="03" />
          <StatPill label="Owner handoffs" value="05" />
          <StatPill label="Review SLA" value="2m" />
        </div>
      </div>
    </BrowserShell>
  );
}

function MobilePreview() {
  return (
    <BrowserShell>
      <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div className="mx-auto w-55 rounded-[32px] border border-white/10 bg-black/35 p-3 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
          <div className="overflow-hidden rounded-[24px] border border-white/10 bg-linear-to-b from-[#16202a] via-[#10151f] to-[#0f1218] p-4">
            <div className="mx-auto h-1.5 w-20 rounded-full bg-white/15" />
            <div className="mt-6 h-20 rounded-[18px] bg-linear-to-br from-primary/30 via-accent/20 to-secondary/20" />
            <div className="mt-5 h-4 w-24 rounded-full bg-white/70" />
            <div className="mt-3 h-3 w-full rounded-full bg-white/12" />
            <div className="mt-2 h-3 w-5/6 rounded-full bg-white/10" />
            <div className="mt-5 grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="h-16 rounded-[16px] bg-white/6" />
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-[18px] border border-white/10 bg-white/4 p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">Launch layout</p>
            <div className="mt-4 space-y-3">
              <div className="h-10 w-3/4 rounded-full bg-white/85" />
              <div className="h-4 w-full rounded-full bg-white/12" />
              <div className="h-4 w-5/6 rounded-full bg-white/10" />
              <div className="h-12 w-40 rounded-full bg-primary" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <StatPill label="Layouts" value="11" />
            <StatPill label="CTA modes" value="08" />
            <StatPill label="Tuned breakpoints" value="06" />
          </div>
        </div>
      </div>
    </BrowserShell>
  );
}

function BookingPreview() {
  return (
    <BrowserShell>
      <div className="grid gap-4 lg:grid-cols-[1fr_.9fr]">
        <div className="rounded-[18px] border border-white/10 bg-white/4 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">Booking journey</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {[
              { title: "Choose service", note: "Scope + duration" },
              { title: "Pick schedule", note: "Timezone aware" },
              { title: "Confirm + pay", note: "Stripe linked" },
            ].map((item, index) => (
              <div key={item.title} className="rounded-[16px] border border-white/10 bg-black/25 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">0{index + 1}</p>
                <p className="mt-2 font-display text-lg tracking-tight text-white">{item.title}</p>
                <p className="mt-2 text-sm text-white/58">{item.note}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-[16px] border border-white/10 bg-black/25 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="h-4 w-40 rounded-full bg-white/75" />
              <div className="h-8 w-24 rounded-full bg-primary/25" />
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="h-24 rounded-[16px] bg-white/6" />
              <div className="h-24 rounded-[16px] bg-white/6" />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <StatPill label="Checkout states" value="07" />
          <StatPill label="Admin views" value="05" />
          <div className="rounded-[18px] border border-white/10 bg-black/25 p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">Stripe panel</p>
            <div className="mt-4 space-y-3">
              {["Deposit", "Balance", "Confirmation"].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-[14px] bg-white/5 px-4 py-3">
                  <span className="text-sm text-white/68">{item}</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">Ready</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BrowserShell>
  );
}

export function ProductPreviewSurface({ variant }: { variant: PreviewVariant }) {
  switch (variant) {
    case "mcp":
      return <McpPreview />;
    case "marketing":
      return <MarketingPreview />;
    case "dashboard":
      return <DashboardPreview />;
    case "automation":
      return <AutomationPreview />;
    case "mobile":
      return <MobilePreview />;
    case "booking":
      return <BookingPreview />;
    default:
      return <MarketingPreview />;
  }
}