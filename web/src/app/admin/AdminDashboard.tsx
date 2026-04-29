"use client";

import { ChartBarSquareIcon, ClipboardDocumentListIcon, QueueListIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DashboardShell, type DashboardNavItem } from "@/components/dashboard/DashboardShell";
import { Button, LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";

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
  livePreviewUrl?: string;
  embeddedPreviewUrl?: string;
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
  livePreviewUrl?: string;
  embeddedPreviewUrl?: string;
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

function createClientId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function buildNewService(): ServiceRecord {
  return {
    id: createClientId(),
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
    livePreviewUrl: "https://demo.example.com",
    embeddedPreviewUrl: "https://demo.example.com",
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
    livePreviewUrl: "https://project.example.com",
    embeddedPreviewUrl: "https://project.example.com",
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

type LoadedAdminState = {
  summary: DashboardSummary;
  services: ServiceRecord[];
  products: ProductRecord[];
  portfolio: PortfolioRecord[];
  inquiries: InquiryRecord[];
  appointments: AppointmentRecord[];
  orders: OrderRecord[];
};

async function loadAdminState(): Promise<LoadedAdminState> {
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

  return {
    summary: payload.data,
    services: servicesPayload.data,
    products: productsPayload.data,
    portfolio: portfolioPayload.data,
    inquiries: inquiriesPayload.data,
    appointments: appointmentsPayload.data,
    orders: ordersPayload.data,
  };
}

const viewMeta: Record<AdminDashboardView, { title: string; description: string }> = {
  overview: {
    title: "Operational Snapshot",
    description: "Real-time volume and health of customer-facing touchpoints.",
  },
  activity: {
    title: "Activity Stream",
    description: "Recent analytics and audit events across the platform.",
  },
  catalog: {
    title: "Catalog Studio",
    description: "Manage services, products, and portfolio records in one workspace.",
  },
  pipeline: {
    title: "Pipeline Monitor",
    description: "Latest inquiries, appointments, and order movement.",
  },
};

const navItems: DashboardNavItem[] = [
  { href: "/admin", label: "Overview", icon: <Squares2X2Icon className="h-4 w-4" /> },
  { href: "/admin/activity", label: "Activity", icon: <ChartBarSquareIcon className="h-4 w-4" /> },
  { href: "/admin/catalog", label: "Catalog", icon: <ClipboardDocumentListIcon className="h-4 w-4" /> },
  { href: "/admin/pipeline", label: "Pipeline", icon: <QueueListIcon className="h-4 w-4" /> },
];

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
  const [loading, setLoading] = useState(true);

  const currentMeta = useMemo(() => viewMeta[view], [view]);

  const refreshState = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const loaded = await loadAdminState();
      setSummary(loaded.summary);
      setServices(loaded.services);
      setProducts(loaded.products);
      setPortfolio(loaded.portfolio);
      setInquiries(loaded.inquiries);
      setAppointments(loaded.appointments);
      setOrders(loaded.orders);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load admin analytics.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    loadAdminState()
      .then((loaded) => {
        if (!active) {
          return;
        }
        setSummary(loaded.summary);
        setServices(loaded.services);
        setProducts(loaded.products);
        setPortfolio(loaded.portfolio);
        setInquiries(loaded.inquiries);
        setAppointments(loaded.appointments);
        setOrders(loaded.orders);
        setLoading(false);
      })
      .catch((loadError) => {
        if (!active) {
          return;
        }
        setError(loadError instanceof Error ? loadError.message : "Could not load admin analytics.");
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const saveEditor = async (endpoint: string, payloadText: string) => {
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

      await refreshState();
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

      await refreshState();
      setNotice("Deleted.");
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Delete failed.");
    }
  };

  const onLogout = async () => {
    await fetch("/api/v1/auth/logout", { method: "POST" });
    window.location.assign("/admin/login");
  };

  return (
    <DashboardShell
      title="Admin Dashboard"
      currentPath={pathname}
      navItems={navItems}
      utilityActions={
        <>
          <LinkButton href="/" variant="outline" size="sm">
            Back to main site
          </LinkButton>
          <Button type="button" variant="ghost" onClick={onLogout}>
            Log out
          </Button>
        </>
      }
    >
      <div className="h-full flex flex-col overflow-y-auto">
        <div className="flex-1 px-6 py-6 sm:px-8 sm:py-8">
          {/* Page header */}
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">{view.toUpperCase()}</p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">{currentMeta.title}</h2>
            <p className="mt-1.5 text-sm text-text-muted max-w-2xl">{currentMeta.description}</p>

            {error ? (
              <div className="mt-3 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            ) : null}
            {notice ? (
              <div className="mt-3 rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary">
                {notice}
              </div>
            ) : null}
          </div>

          {/* Content */}
          {loading ? (
            <div className="text-sm text-text-muted">Loading dashboard data...</div>
          ) : null}

          {!loading && view === "overview" ? (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
                {[
                  { label: "Inquiries", value: summary?.totals.inquiries ?? 0 },
                  { label: "Appointments", value: summary?.totals.appointments ?? 0 },
                  { label: "Orders", value: summary?.totals.orders ?? 0 },
                  { label: "Concierge Sessions", value: summary?.totals.concierge_sessions ?? 0 },
                ].map((card) => (
                  <Card
                    key={card.label}
                    className="rounded-sm border-border bg-surface p-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">{card.label}</p>
                    <p className="mt-3 font-display text-3xl tracking-tight">{card.value}</p>
                  </Card>
                ))}
              </div>

              <div className="grid gap-5 xl:grid-cols-2">
                <Card className="rounded-sm border-border p-5">
                  <h3 className="font-display text-lg font-semibold tracking-tight">Latest Analytics Events</h3>
                  <div className="mt-4 space-y-3 text-sm text-text-muted">
                    {summary?.latest_events.length ? (
                      summary.latest_events.slice(0, 6).map((event) => (
                        <div key={event.id} className="rounded-md border border-border/50 bg-surface px-3 py-2">
                          <div className="font-medium text-text">{event.event_name}</div>
                          <div className="text-xs">{new Date(event.created_at).toLocaleString()}</div>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-md border border-border/50 bg-surface px-3 py-2">No analytics events yet.</div>
                    )}
                  </div>
                </Card>

                <Card className="rounded-sm border-border p-5">
                  <h3 className="font-display text-lg font-semibold tracking-tight">Latest Audit Entries</h3>
                  <div className="mt-4 space-y-3 text-sm text-text-muted">
                    {summary?.latest_logs.length ? (
                      summary.latest_logs.slice(0, 6).map((log) => (
                        <div key={log.id} className="rounded-md border border-border/50 bg-surface px-3 py-2">
                          <div className="font-medium text-text">{log.action}</div>
                          <div className="text-xs">
                            {log.level.toUpperCase()} - {new Date(log.created_at).toLocaleString()}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-md border border-border/50 bg-surface px-3 py-2">No audit entries yet.</div>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          ) : null}

          {!loading && view === "activity" ? (
            <div className="grid gap-5 xl:grid-cols-2">
              <Card className="rounded-sm border-border p-5">
                <h3 className="font-display text-lg font-semibold tracking-tight">Analytics Stream</h3>
                <div className="mt-4 space-y-3 text-sm text-text-muted">
                  {summary?.latest_events.length ? (
                    summary.latest_events.map((event) => (
                      <div key={event.id} className="rounded-md border border-border/50 bg-surface px-3 py-2">
                        <div className="font-medium text-text">{event.event_name}</div>
                        <div className="text-xs">{new Date(event.created_at).toLocaleString()}</div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-md border border-border/50 bg-surface px-3 py-2">No analytics events yet.</div>
                  )}
                </div>
              </Card>

              <Card className="rounded-sm border-border p-5">
                <h3 className="font-display text-lg font-semibold tracking-tight">Audit Stream</h3>
                <div className="mt-4 space-y-3 text-sm text-text-muted">
                  {summary?.latest_logs.length ? (
                    summary.latest_logs.map((log) => (
                      <div key={log.id} className="rounded-md border border-border/50 bg-surface px-3 py-2">
                        <div className="font-medium text-text">{log.action}</div>
                        <div className="text-xs">
                          {log.level.toUpperCase()} - {new Date(log.created_at).toLocaleString()}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-md border border-border/50 bg-surface px-3 py-2">No audit entries yet.</div>
                  )}
                </div>
              </Card>
            </div>
          ) : null}

          {!loading && view === "catalog" ? (
            <div className="grid gap-5 2xl:grid-cols-3">
              <Card className="rounded-sm border-border p-5 flex flex-col">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <h3 className="font-display text-lg font-semibold tracking-tight">Manage Services</h3>
                  <Button type="button" variant="outline" size="sm" onClick={() => setServiceEditor(formatJson(buildNewService()))}>
                    New
                  </Button>
                </div>
                <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
                  {services.map((service) => (
                    <div key={service.id} className="rounded-md border border-border/50 bg-surface px-3 py-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="font-medium text-text text-sm">{service.title}</div>
                          <div className="text-xs text-text-muted">{service.slug}</div>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <Button type="button" size="sm" variant="outline" onClick={() => setServiceEditor(formatJson(service))}>
                            Edit
                          </Button>
                          <Button type="button" size="sm" variant="ghost" onClick={() => void deleteRecord("/api/v1/admin/services", `id=${encodeURIComponent(service.id)}`)}>
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <textarea value={serviceEditor} onChange={(event) => setServiceEditor(event.target.value)} className="signal-input mt-4 min-h-48 font-mono text-xs" />
                <Button type="button" size="sm" className="mt-3" onClick={() => void saveEditor("/api/v1/admin/services", serviceEditor)}>
                  Save service
                </Button>
              </Card>

              <Card className="rounded-sm border-border p-5 flex flex-col">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <h3 className="font-display text-lg font-semibold tracking-tight">Manage Products</h3>
                  <Button type="button" variant="outline" size="sm" onClick={() => setProductEditor(formatJson(buildNewProduct()))}>
                    New
                  </Button>
                </div>
                <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
                  {products.map((product) => (
                    <div key={product.slug} className="rounded-md border border-border/50 bg-surface px-3 py-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="font-medium text-text text-sm">{product.name}</div>
                          <div className="text-xs text-text-muted">{product.slug}</div>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <Button type="button" size="sm" variant="outline" onClick={() => setProductEditor(formatJson(product))}>
                            Edit
                          </Button>
                          <Button type="button" size="sm" variant="ghost" onClick={() => void deleteRecord("/api/v1/admin/products", `slug=${encodeURIComponent(product.slug)}`)}>
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <textarea value={productEditor} onChange={(event) => setProductEditor(event.target.value)} className="signal-input mt-4 min-h-48 font-mono text-xs" />
                <Button type="button" size="sm" className="mt-3" onClick={() => void saveEditor("/api/v1/admin/products", productEditor)}>
                  Save product
                </Button>
              </Card>

              <Card className="rounded-sm border-border p-5 flex flex-col">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <h3 className="font-display text-lg font-semibold tracking-tight">Manage Portfolio</h3>
                  <Button type="button" variant="outline" size="sm" onClick={() => setPortfolioEditor(formatJson(buildNewPortfolio()))}>
                    New
                  </Button>
                </div>
                <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
                  {portfolio.map((project) => (
                    <div key={project.slug} className="rounded-md border border-border/50 bg-surface px-3 py-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="font-medium text-text text-sm">{project.name}</div>
                          <div className="text-xs text-text-muted">{project.slug}</div>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <Button type="button" size="sm" variant="outline" onClick={() => setPortfolioEditor(formatJson(project))}>
                            Edit
                          </Button>
                          <Button type="button" size="sm" variant="ghost" onClick={() => void deleteRecord("/api/v1/admin/portfolio", `slug=${encodeURIComponent(project.slug)}`)}>
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <textarea value={portfolioEditor} onChange={(event) => setPortfolioEditor(event.target.value)} className="signal-input mt-4 min-h-48 font-mono text-xs" />
                <Button type="button" size="sm" className="mt-3" onClick={() => void saveEditor("/api/v1/admin/portfolio", portfolioEditor)}>
                  Save project
                </Button>
              </Card>
            </div>
          ) : null}

          {!loading && view === "pipeline" ? (
            <div className="grid gap-5 2xl:grid-cols-3">
              <Card className="rounded-sm border-border p-5">
                <h3 className="font-display text-lg font-semibold tracking-tight">Recent Inquiries</h3>
                <div className="mt-4 space-y-2 text-sm text-text-muted max-h-96 overflow-y-auto">
                  {inquiries.slice(0, 12).map((inquiry) => (
                    <div key={inquiry.id} className="rounded-md border border-border/50 bg-surface px-3 py-2">
                      <div className="font-medium text-text text-sm">{inquiry.visitor_name}</div>
                      <div className="text-xs">{inquiry.visitor_email}</div>
                      <div className="text-xs">{inquiry.status.toUpperCase()}</div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="rounded-sm border-border p-5">
                <h3 className="font-display text-lg font-semibold tracking-tight">Recent Appointments</h3>
                <div className="mt-4 space-y-2 text-sm text-text-muted max-h-96 overflow-y-auto">
                  {appointments.slice(0, 12).map((appointment) => (
                    <div key={appointment.id} className="rounded-md border border-border/50 bg-surface px-3 py-2">
                      <div className="font-medium text-text text-sm">{appointment.visitor_name}</div>
                      <div className="text-xs">{appointment.service_interested_in}</div>
                      <div className="text-xs">{new Date(appointment.preferred_datetime).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="rounded-sm border-border p-5">
                <h3 className="font-display text-lg font-semibold tracking-tight">Recent Orders</h3>
                <div className="mt-4 space-y-2 text-sm text-text-muted max-h-96 overflow-y-auto">
                  {orders.slice(0, 12).map((order) => (
                    <div key={order.id} className="rounded-md border border-border/50 bg-surface px-3 py-2">
                      <div className="font-medium text-text text-sm">{order.order_number}</div>
                      <div className="text-xs">{order.customer_email}</div>
                      <div className="text-xs">
                        {order.payment_status.toUpperCase()} - {order.fulfillment_status.toUpperCase()}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ) : null}
        </div>
      </div>
    </DashboardShell>
  );
}
