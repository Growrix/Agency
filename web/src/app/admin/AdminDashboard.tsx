"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AdminPage, AdminPageAlert, AdminPageHeader } from "@/components/admin/AdminPage";
import {
  CatalogServiceForm,
  type CatalogServiceFormValues,
} from "@/components/admin/CatalogServiceForm";
import {
  CatalogProductForm,
  type CatalogProductFormValues,
} from "@/components/admin/CatalogProductForm";
import {
  CatalogPortfolioForm,
  type CatalogPortfolioFormValues,
} from "@/components/admin/CatalogPortfolioForm";
import { Button } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { resolveAdminSectionMeta } from "@/lib/admin-nav";

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
  previewVariant: "marketing" | "dashboard" | "automation" | "mobile" | "booking";
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

const STRUCTURED_PRODUCT_FIELDS = new Set([
  "slug",
  "name",
  "price",
  "livePreviewUrl",
  "embeddedPreviewUrl",
  "category",
  "categorySlug",
  "type",
  "typeSlug",
  "industry",
  "industrySlug",
  "teaser",
  "summary",
  "audience",
  "published",
  "includes",
  "stack",
  "highlights",
  "previewVariant",
]);

const STRUCTURED_PORTFOLIO_FIELDS = new Set([
  "slug",
  "name",
  "livePreviewUrl",
  "embeddedPreviewUrl",
  "industry",
  "service",
  "summary",
  "metric",
  "accent",
]);

function productToFormValues(record: ProductRecord): CatalogProductFormValues {
  const advanced: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(record)) {
    if (!STRUCTURED_PRODUCT_FIELDS.has(key)) advanced[key] = value;
  }
  return {
    slug: record.slug,
    name: record.name,
    price: record.price,
    livePreviewUrl: record.livePreviewUrl,
    embeddedPreviewUrl: record.embeddedPreviewUrl,
    category: record.category,
    categorySlug: record.categorySlug,
    type: record.type,
    typeSlug: record.typeSlug,
    industry: record.industry,
    industrySlug: record.industrySlug,
    teaser: record.teaser,
    summary: record.summary,
    audience: record.audience,
    published: record.published,
    includes: record.includes ?? [],
    stack: record.stack ?? [],
    highlights: record.highlights ?? [],
    previewVariant: record.previewVariant,
    advancedJson: Object.keys(advanced).length > 0 ? formatJson(advanced) : "",
  };
}

function portfolioToFormValues(record: PortfolioRecord): CatalogPortfolioFormValues {
  const advanced: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(record)) {
    if (!STRUCTURED_PORTFOLIO_FIELDS.has(key)) advanced[key] = value;
  }
  return {
    slug: record.slug,
    name: record.name,
    livePreviewUrl: record.livePreviewUrl,
    embeddedPreviewUrl: record.embeddedPreviewUrl,
    industry: record.industry,
    service: record.service,
    summary: record.summary,
    metric: record.metric,
    accent: record.accent,
    advancedJson: Object.keys(advanced).length > 0 ? formatJson(advanced) : "",
  };
}

function mergeAdvancedJson<T extends Record<string, unknown>>(structured: T, advancedJson: string): T {
  if (!advancedJson.trim()) return structured;
  try {
    const parsed = JSON.parse(advancedJson) as Record<string, unknown>;
    return { ...parsed, ...structured } as T;
  } catch {
    return structured;
  }
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
    price: "$15",
    livePreviewUrl: "https://demo.example.com",
    embeddedPreviewUrl: "https://demo.example.com",
    category: "HTML Templates",
    categorySlug: "html-templates",
    type: "Email Templates",
    typeSlug: "email-templates",
    industry: "Digital Products",
    industrySlug: "digital-products",
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

const VIEW_PATH: Record<AdminDashboardView, string> = {
  overview: "/admin",
  activity: "/admin/activity",
  catalog: "/admin/catalog",
  pipeline: "/admin/pipeline",
};

export function AdminDashboard({ view = "overview" }: { view?: AdminDashboardView }) {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [products, setProducts] = useState<ProductRecord[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioRecord[]>([]);
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [editingService, setEditingService] = useState<ServiceRecord>(buildNewService());
  const [editingProduct, setEditingProduct] = useState<ProductRecord>(buildNewProduct());
  const [editingPortfolio, setEditingPortfolio] = useState<PortfolioRecord>(buildNewPortfolio());
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const currentMeta = useMemo(() => resolveAdminSectionMeta(VIEW_PATH[view]), [view]);

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

  return (
    <AdminPage>
      <AdminPageHeader
        eyebrow={currentMeta.eyebrow ?? view}
        title={currentMeta.title}
        description={currentMeta.description}
      />

      {error ? <AdminPageAlert tone="error">{error}</AdminPageAlert> : null}
      {notice ? <AdminPageAlert tone="info">{notice}</AdminPageAlert> : null}

      {loading ? <p className="text-sm text-text-muted">Loading dashboard data...</p> : null}

      {!loading && view === "overview" ? (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
            {[
              { label: "Inquiries", value: summary?.totals.inquiries ?? 0 },
              { label: "Appointments", value: summary?.totals.appointments ?? 0 },
              { label: "Orders", value: summary?.totals.orders ?? 0 },
              { label: "Concierge Sessions", value: summary?.totals.concierge_sessions ?? 0 },
            ].map((card) => (
              <Card key={card.label} className="rounded-sm border-border bg-surface p-4">
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
          <Card className="flex flex-col rounded-sm border-border p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-display text-lg font-semibold tracking-tight">Manage Services</h3>
              <Button type="button" variant="outline" size="sm" onClick={() => setEditingService(buildNewService())}>
                New
              </Button>
            </div>
            <div className="mt-4 max-h-80 flex-1 space-y-2 overflow-y-auto">
              {services.map((service) => (
                <div key={service.id} className="rounded-md border border-border/50 bg-surface px-3 py-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-text">{service.title}</div>
                      <div className="text-xs text-text-muted">{service.slug}</div>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <Button type="button" size="sm" variant="outline" onClick={() => setEditingService(service)}>
                        Edit
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => void deleteRecord("/api/v1/admin/services", `id=${encodeURIComponent(service.id)}`)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <CatalogServiceForm
                key={editingService.id}
                initial={editingService satisfies CatalogServiceFormValues}
                onSubmit={(values) => saveEditor("/api/v1/admin/services", formatJson(values))}
              />
            </div>
          </Card>

          <Card className="flex flex-col rounded-sm border-border p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-display text-lg font-semibold tracking-tight">Manage Products</h3>
              <Button type="button" variant="outline" size="sm" onClick={() => setEditingProduct(buildNewProduct())}>
                New
              </Button>
            </div>
            <div className="mt-4 max-h-80 flex-1 space-y-2 overflow-y-auto">
              {products.map((product) => (
                <div key={product.slug} className="rounded-md border border-border/50 bg-surface px-3 py-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-text">{product.name}</div>
                      <div className="text-xs text-text-muted">{product.slug}</div>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <Button type="button" size="sm" variant="outline" onClick={() => setEditingProduct(product)}>
                        Edit
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => void deleteRecord("/api/v1/admin/products", `slug=${encodeURIComponent(product.slug)}`)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <CatalogProductForm
                key={editingProduct.slug}
                initial={productToFormValues(editingProduct)}
                onSubmit={(values) => {
                  const { advancedJson, ...structured } = values;
                  const merged = mergeAdvancedJson(structured, advancedJson);
                  return saveEditor("/api/v1/admin/products", formatJson(merged));
                }}
              />
            </div>
          </Card>

          <Card className="flex flex-col rounded-sm border-border p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-display text-lg font-semibold tracking-tight">Manage Portfolio</h3>
              <Button type="button" variant="outline" size="sm" onClick={() => setEditingPortfolio(buildNewPortfolio())}>
                New
              </Button>
            </div>
            <div className="mt-4 max-h-80 flex-1 space-y-2 overflow-y-auto">
              {portfolio.map((project) => (
                <div key={project.slug} className="rounded-md border border-border/50 bg-surface px-3 py-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-text">{project.name}</div>
                      <div className="text-xs text-text-muted">{project.slug}</div>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <Button type="button" size="sm" variant="outline" onClick={() => setEditingPortfolio(project)}>
                        Edit
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => void deleteRecord("/api/v1/admin/portfolio", `slug=${encodeURIComponent(project.slug)}`)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <CatalogPortfolioForm
                key={editingPortfolio.slug}
                initial={portfolioToFormValues(editingPortfolio)}
                onSubmit={(values) => {
                  const { advancedJson, ...structured } = values;
                  const merged = mergeAdvancedJson(structured, advancedJson);
                  return saveEditor("/api/v1/admin/portfolio", formatJson(merged));
                }}
              />
            </div>
          </Card>
        </div>
      ) : null}

      {!loading && view === "pipeline" ? (
        <div className="grid gap-5 2xl:grid-cols-3">
          <Card className="rounded-sm border-border p-5">
            <h3 className="font-display text-lg font-semibold tracking-tight">Recent Inquiries</h3>
            <div className="mt-4 max-h-96 space-y-2 overflow-y-auto text-sm text-text-muted">
              {inquiries.slice(0, 12).map((inquiry) => (
                <div key={inquiry.id} className="rounded-md border border-border/50 bg-surface px-3 py-2">
                  <div className="text-sm font-medium text-text">{inquiry.visitor_name}</div>
                  <div className="text-xs">{inquiry.visitor_email}</div>
                  <div className="text-xs">{inquiry.status.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="rounded-sm border-border p-5">
            <h3 className="font-display text-lg font-semibold tracking-tight">Recent Appointments</h3>
            <div className="mt-4 max-h-96 space-y-2 overflow-y-auto text-sm text-text-muted">
              {appointments.slice(0, 12).map((appointment) => (
                <div key={appointment.id} className="rounded-md border border-border/50 bg-surface px-3 py-2">
                  <div className="text-sm font-medium text-text">{appointment.visitor_name}</div>
                  <div className="text-xs">{appointment.service_interested_in}</div>
                  <div className="text-xs">{new Date(appointment.preferred_datetime).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="rounded-sm border-border p-5">
            <h3 className="font-display text-lg font-semibold tracking-tight">Recent Orders</h3>
            <div className="mt-4 max-h-96 space-y-2 overflow-y-auto text-sm text-text-muted">
              {orders.slice(0, 12).map((order) => (
                <div key={order.id} className="rounded-md border border-border/50 bg-surface px-3 py-2">
                  <div className="text-sm font-medium text-text">{order.order_number}</div>
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
    </AdminPage>
  );
}
