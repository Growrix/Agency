"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "@/components/primitives/Badge";
import { Button, LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";

type AdminDashboardView = "overview" | "activity" | "catalog" | "pipeline";

type ServiceRecord = {
  id: string;
  slug: string;
  title: string;
  description: string;
  short_description: string;
  service_type: string;
  pricing_model: "contact" | "tiered" | "fixed";
  delivery_timeline: string;
  pillars: string[];
};

type ProductRecord = {
  slug: string;
  name: string;
  price: string;
  category: string;
  categorySlug: string;
  type: string;
  typeSlug: string;
  industry: string;
  industrySlug: string;
  tag?: string;
  published?: boolean;
  teaser: string;
  summary: string;
  audience: string;
  previewVariant: "mcp" | "marketing" | "dashboard" | "automation" | "mobile" | "booking";
  includes: string[];
  stack: string[];
  highlights: Array<{ label: string; value: string }>;
  image: { src: string; alt: string } | null;
};

type PortfolioRecord = {
  slug: string;
  name: string;
  industry: string;
  service: string;
  summary: string;
  metric: string;
  accent: string;
  hero_image: { src: string; alt: string } | null;
  detail: {
    client: string;
    year: string;
    duration: string;
    team: string;
    challenge: string[];
    strategy: string[];
    build: Array<{ label: string; value: string }>;
    results: Array<{ value: string; label: string; hint?: string }>;
    gallery: Array<{ src: string; alt: string }>;
  } | null;
};

type InquiryRecord = { id: string; visitor_name: string; visitor_email: string; service?: string; status: string; created_at: string };
type AppointmentRecord = { id: string; visitor_name: string; visitor_email: string; service_interested_in: string; preferred_datetime: string; status: string };
type OrderRecord = { id: string; order_number: string; customer_name: string; customer_email: string; total_cents: number; payment_status: string; fulfillment_status: string };

type DashboardSummary = {
  totals: {
    inquiries: number;
    appointments: number;
    orders: number;
    concierge_sessions: number;
  };
  latest_events: Array<{ id: string; event_name: string; created_at: string }>;
  latest_logs: Array<{ id: string; action: string; level: string; created_at: string }>;
};

function formatJson(value: unknown) {
  return JSON.stringify(value, null, 2);
}

function buildNewService(): ServiceRecord {
  return {
    id: crypto.randomUUID(),
    slug: "new-service",
    title: "New Service",
    description: "Describe the service.",
    short_description: "Short summary",
    service_type: "websites",
    pricing_model: "contact",
    delivery_timeline: "2-6 weeks",
    pillars: ["Strategy", "Build"],
  };
}

function buildNewProduct(): ProductRecord {
  return {
    slug: "new-product",
    name: "New Product",
    price: "$500",
    category: "Templates",
    categorySlug: "templates",
    type: "Marketing Site",
    typeSlug: "marketing-site",
    industry: "General",
    industrySlug: "general",
    teaser: "Short teaser",
    summary: "Product summary",
    audience: "Founders and teams",
    previewVariant: "marketing",
    includes: ["Feature one", "Feature two"],
    stack: ["Next.js", "TypeScript"],
    highlights: [{ label: "Pages", value: "10" }],
    image: null,
    published: true,
  };
}

function buildNewPortfolio(): PortfolioRecord {
  return {
    slug: "new-project",
    name: "New Project",
    industry: "General",
    service: "websites",
    summary: "Project summary",
    metric: "+20% conversion",
    accent: "from-slate-500 to-slate-700",
    hero_image: null,
    detail: {
      client: "Client Name",
      year: "2026",
      duration: "6 weeks",
      team: "Strategy, design, engineering",
      challenge: ["Challenge"],
      strategy: ["Strategy"],
      build: [{ label: "Frontend", value: "Next.js" }],
      results: [{ value: "+20%", label: "Conversion" }],
      gallery: [],
    },
  };
}

export function AdminDashboard({ view = "overview" }: { view?: AdminDashboardView }) {
  const pathname = usePathname();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [products, setProducts] = useState<ProductRecord[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioRecord[]>([]);
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [serviceEditor, setServiceEditor] = useState<string>(formatJson(buildNewService()));
  const [productEditor, setProductEditor] = useState<string>(formatJson(buildNewProduct()));
  const [portfolioEditor, setPortfolioEditor] = useState<string>(formatJson(buildNewPortfolio()));
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const [analyticsResponse, servicesResponse, productsResponse, portfolioResponse, inquiriesResponse, appointmentsResponse, ordersResponse] = await Promise.all([
          fetch("/api/v1/admin/analytics", { credentials: "same-origin" }),
          fetch("/api/v1/admin/services", { credentials: "same-origin" }),
          fetch("/api/v1/admin/products", { credentials: "same-origin" }),
          fetch("/api/v1/admin/portfolio", { credentials: "same-origin" }),
          fetch("/api/v1/admin/inquiries", { credentials: "same-origin" }),
          fetch("/api/v1/admin/appointments", { credentials: "same-origin" }),
          fetch("/api/v1/admin/orders", { credentials: "same-origin" }),
        ]);

        if (![analyticsResponse, servicesResponse, productsResponse, portfolioResponse, inquiriesResponse, appointmentsResponse, ordersResponse].every((response) => response.ok)) {
          throw new Error("Could not load the admin workspace.");
        }

        const payload = (await analyticsResponse.json()) as { data: DashboardSummary };
        const servicesPayload = (await servicesResponse.json()) as { data: ServiceRecord[] };
        const productsPayload = (await productsResponse.json()) as { data: ProductRecord[] };
        const portfolioPayload = (await portfolioResponse.json()) as { data: PortfolioRecord[] };
        const inquiriesPayload = (await inquiriesResponse.json()) as { data: InquiryRecord[] };
        const appointmentsPayload = (await appointmentsResponse.json()) as { data: AppointmentRecord[] };
        const ordersPayload = (await ordersResponse.json()) as { data: OrderRecord[] };

        if (active) {
          setSummary(payload.data);
          setServices(servicesPayload.data);
          setProducts(productsPayload.data);
          setPortfolio(portfolioPayload.data);
          setInquiries(inquiriesPayload.data);
          setAppointments(appointmentsPayload.data);
          setOrders(ordersPayload.data);
        }
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : "Could not load admin analytics.");
        }
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, []);

  const saveEditor = async (endpoint: string, payloadText: string, onSuccess: () => Promise<void>) => {
    setError(null);
    setNotice(null);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payloadText,
      });

      const payload = (await response.json().catch(() => null)) as { error?: { message?: string } } | null;
      if (!response.ok) {
        throw new Error(payload?.error?.message ?? "Save failed.");
      }

      await onSuccess();
      setNotice("Saved.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Save failed.");
    }
  };

  const deleteRecord = async (endpoint: string, query: string) => {
    setError(null);
    setNotice(null);
    try {
      const response = await fetch(`${endpoint}?${query}`, { method: "DELETE" });
      const payload = (await response.json().catch(() => null)) as { error?: { message?: string } } | null;
      if (!response.ok) {
        throw new Error(payload?.error?.message ?? "Delete failed.");
      }

      window.location.reload();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Delete failed.");
    }
  };

  const onLogout = async () => {
    await fetch("/api/v1/auth/logout", { method: "POST" });
    window.location.assign("/admin/login");
  };

  return (
    <Section className="py-8 sm:py-10">
      <Container width="shell">
        <div className="grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="lg:self-start">
            <Card className="space-y-5 lg:sticky lg:top-6 lg:h-fit">
              <div>
                <Badge tone="secondary" dot>Admin workspace</Badge>
                <h1 className="mt-3 font-display text-3xl tracking-tight">Operational dashboard</h1>
                <p className="mt-3 text-sm leading-6 text-text-muted">
                  Secure operations for inquiries, appointments, orders, analytics, and managed catalog data.
                </p>
              </div>

              <div className="grid gap-2">
                {[
                  { href: "/admin", label: "Overview", key: "overview" },
                  { href: "/admin/activity", label: "Activity", key: "activity" },
                  { href: "/admin/catalog", label: "Catalog management", key: "catalog" },
                  { href: "/admin/pipeline", label: "Pipeline", key: "pipeline" },
                ].map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      className={`rounded-md border px-3 py-2 text-sm transition-colors ${isActive ? "border-border-strong bg-surface text-text" : "border-border text-text-muted hover:border-border-strong hover:text-text"}`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              <div className="grid gap-2">
                <LinkButton href="/" variant="outline" size="sm">Back to main site</LinkButton>
                <Button type="button" variant="ghost" onClick={onLogout}>Log out</Button>
              </div>
            </Card>
          </aside>

          <div className="space-y-6">
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            {notice ? <p className="text-sm text-primary">{notice}</p> : null}

            {view === "overview" ? (
              <section className="space-y-4">
                <h2 className="font-display text-2xl tracking-tight">Overview</h2>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    { label: "Inquiries", value: summary?.totals.inquiries ?? 0 },
                    { label: "Appointments", value: summary?.totals.appointments ?? 0 },
                    { label: "Orders", value: summary?.totals.orders ?? 0 },
                    { label: "Concierge sessions", value: summary?.totals.concierge_sessions ?? 0 },
                  ].map((card) => (
                    <Card key={card.label}>
                      <p className="text-sm text-text-muted">{card.label}</p>
                      <p className="mt-3 font-display text-4xl tracking-tight">{card.value}</p>
                    </Card>
                  ))}
                </div>
              </section>
            ) : null}

            {view === "activity" ? (
              <section className="grid gap-6 xl:grid-cols-2">
                <Card>
                  <h3 className="font-display text-2xl tracking-tight">Latest analytics events</h3>
                  <div className="mt-5 space-y-3 text-sm text-text-muted">
                    {summary?.latest_events.length ? summary.latest_events.map((event) => (
                      <div key={event.id} className="rounded-[14px] border border-border bg-surface px-4 py-3">
                        <div className="font-medium text-text">{event.event_name}</div>
                        <div>{new Date(event.created_at).toLocaleString()}</div>
                      </div>
                    )) : <div className="rounded-[14px] border border-border bg-surface px-4 py-3">No analytics events yet.</div>}
                  </div>
                </Card>

                <Card>
                  <h3 className="font-display text-2xl tracking-tight">Latest audit entries</h3>
                  <div className="mt-5 space-y-3 text-sm text-text-muted">
                    {summary?.latest_logs.length ? summary.latest_logs.map((log) => (
                      <div key={log.id} className="rounded-[14px] border border-border bg-surface px-4 py-3">
                        <div className="font-medium text-text">{log.action}</div>
                        <div>{log.level.toUpperCase()} · {new Date(log.created_at).toLocaleString()}</div>
                      </div>
                    )) : <div className="rounded-[14px] border border-border bg-surface px-4 py-3">No audit entries yet.</div>}
                  </div>
                </Card>
              </section>
            ) : null}

            {view === "catalog" ? (
              <section className="grid gap-6 xl:grid-cols-3">
              <Card>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-2xl tracking-tight">Manage services</h3>
                  <Button type="button" variant="outline" onClick={() => setServiceEditor(formatJson(buildNewService()))}>New</Button>
                </div>
                <div className="mt-5 space-y-3">
                  {services.map((service) => (
                    <div key={service.id} className="rounded-[14px] border border-border bg-surface px-4 py-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-medium text-text">{service.title}</div>
                          <div className="text-xs text-text-muted">{service.slug}</div>
                        </div>
                        <div className="flex gap-2">
                          <Button type="button" variant="outline" onClick={() => setServiceEditor(formatJson(service))}>Edit</Button>
                          <Button type="button" variant="ghost" onClick={() => deleteRecord("/api/v1/admin/services", `id=${encodeURIComponent(service.id)}`)}>Delete</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <textarea value={serviceEditor} onChange={(event) => setServiceEditor(event.target.value)} className="signal-input mt-5 min-h-72 font-mono text-xs" />
                <Button type="button" className="mt-4" onClick={() => saveEditor("/api/v1/admin/services", serviceEditor, async () => setServices((await (await fetch("/api/v1/admin/services")).json()).data))}>Save service</Button>
              </Card>

              <Card>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-2xl tracking-tight">Manage products</h3>
                  <Button type="button" variant="outline" onClick={() => setProductEditor(formatJson(buildNewProduct()))}>New</Button>
                </div>
                <div className="mt-5 space-y-3">
                  {products.map((product) => (
                    <div key={product.slug} className="rounded-[14px] border border-border bg-surface px-4 py-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-medium text-text">{product.name}</div>
                          <div className="text-xs text-text-muted">{product.slug}</div>
                        </div>
                        <div className="flex gap-2">
                          <Button type="button" variant="outline" onClick={() => setProductEditor(formatJson(product))}>Edit</Button>
                          <Button type="button" variant="ghost" onClick={() => deleteRecord("/api/v1/admin/products", `slug=${encodeURIComponent(product.slug)}`)}>Delete</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <textarea value={productEditor} onChange={(event) => setProductEditor(event.target.value)} className="signal-input mt-5 min-h-72 font-mono text-xs" />
                <Button type="button" className="mt-4" onClick={() => saveEditor("/api/v1/admin/products", productEditor, async () => setProducts((await (await fetch("/api/v1/admin/products")).json()).data))}>Save product</Button>
              </Card>

              <Card>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-2xl tracking-tight">Manage portfolio</h3>
                  <Button type="button" variant="outline" onClick={() => setPortfolioEditor(formatJson(buildNewPortfolio()))}>New</Button>
                </div>
                <div className="mt-5 space-y-3">
                  {portfolio.map((project) => (
                    <div key={project.slug} className="rounded-[14px] border border-border bg-surface px-4 py-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-medium text-text">{project.name}</div>
                          <div className="text-xs text-text-muted">{project.slug}</div>
                        </div>
                        <div className="flex gap-2">
                          <Button type="button" variant="outline" onClick={() => setPortfolioEditor(formatJson(project))}>Edit</Button>
                          <Button type="button" variant="ghost" onClick={() => deleteRecord("/api/v1/admin/portfolio", `slug=${encodeURIComponent(project.slug)}`)}>Delete</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <textarea value={portfolioEditor} onChange={(event) => setPortfolioEditor(event.target.value)} className="signal-input mt-5 min-h-72 font-mono text-xs" />
                <Button type="button" className="mt-4" onClick={() => saveEditor("/api/v1/admin/portfolio", portfolioEditor, async () => setPortfolio((await (await fetch("/api/v1/admin/portfolio")).json()).data))}>Save project</Button>
              </Card>
              </section>
            ) : null}

            {view === "pipeline" ? (
              <section className="grid gap-6 xl:grid-cols-3">
              <Card>
                <h3 className="font-display text-2xl tracking-tight">Recent inquiries</h3>
                <div className="mt-5 space-y-3 text-sm text-text-muted">
                  {inquiries.slice(0, 8).map((inquiry) => (
                    <div key={inquiry.id} className="rounded-[14px] border border-border bg-surface px-4 py-3">
                      <div className="font-medium text-text">{inquiry.visitor_name}</div>
                      <div>{inquiry.visitor_email}</div>
                      <div>{inquiry.status.toUpperCase()}</div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="font-display text-2xl tracking-tight">Recent appointments</h3>
                <div className="mt-5 space-y-3 text-sm text-text-muted">
                  {appointments.slice(0, 8).map((appointment) => (
                    <div key={appointment.id} className="rounded-[14px] border border-border bg-surface px-4 py-3">
                      <div className="font-medium text-text">{appointment.visitor_name}</div>
                      <div>{appointment.service_interested_in}</div>
                      <div>{new Date(appointment.preferred_datetime).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="font-display text-2xl tracking-tight">Recent orders</h3>
                <div className="mt-5 space-y-3 text-sm text-text-muted">
                  {orders.slice(0, 8).map((order) => (
                    <div key={order.id} className="rounded-[14px] border border-border bg-surface px-4 py-3">
                      <div className="font-medium text-text">{order.order_number}</div>
                      <div>{order.customer_email}</div>
                      <div>{order.payment_status.toUpperCase()} · {order.fulfillment_status.toUpperCase()}</div>
                    </div>
                  ))}
                </div>
              </Card>
              </section>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
