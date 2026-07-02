"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  ArrowRightIcon,
  BookOpenIcon,
  BoltIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  ChevronRightIcon,
  ClockIcon,
  CubeTransparentIcon,
  FunnelIcon,
  ClipboardDocumentListIcon,
  CubeIcon,
  LifebuoyIcon,
  MagnifyingGlassIcon,
  PaperClipIcon,
  PlayIcon,
  ServerStackIcon,
  TagIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { AppointmentRescheduleModal } from "@/components/dashboard/AppointmentRescheduleModal";
import { DownloadDetailModal } from "@/components/dashboard/DownloadDetailModal";
import { Button, LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";

type CustomerDashboardView = "overview" | "products" | "downloads" | "orders" | "appointments" | "support";

type Viewer = {
  id: string;
  email: string;
  role: string;
  first_name: string | null;
  last_name: string | null;
};

type DashboardOrder = {
  id: string;
  order_number: string;
  customer_email: string;
  payment_status: string;
  fulfillment_status: string;
  total_cents: number;
  currency: string;
  selected_variant_slug?: string;
  selected_tier_name?: string;
  selected_fulfillment_type?: string;
  created_at: string;
  completed_at?: string;
  items: Array<{
    product_slug: string;
    product_name: string;
    quantity: number;
  }>;
};

type DashboardDownload = {
  id: string;
  order_id: string;
  product_slug: string;
  file_label?: string;
  download_count: number;
  max_downloads: number;
  status: string;
  created_at: string;
  last_downloaded_at?: string;
};

type DashboardLicense = {
  id: string;
  order_id: string;
  product_slug: string;
  license_key: string;
  license_type: string;
  status: string;
  issued_at: string;
  expires_at?: string;
};

type DashboardAppointment = {
  id: string;
  visitor_name: string;
  visitor_email: string;
  service_interested_in: string;
  preferred_datetime: string;
  status: string;
};

type Envelope<T> = { data: T };

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function formatDateTime(value: string | undefined) {
  if (!value) {
    return "Not available";
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleString();
}

function formatShortDate(value: string | undefined) {
  if (!value) {
    return "Not available";
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime())
    ? value
    : parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function buildFullName(user: Viewer | null) {
  if (!user) {
    return "Customer";
  }

  const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ").trim();
  return fullName || user.email;
}

async function loadJson<T>(url: string) {
  const response = await fetch(url, { credentials: "same-origin" });
  const payload = (await response.json().catch(() => null)) as Envelope<T> & {
    error?: { message?: string };
  } | null;

  if (!response.ok || !payload) {
    throw new Error(payload?.error?.message ?? `Unable to load ${url}.`);
  }

  return payload.data;
}

export function CustomerDashboard({ view = "overview" }: { view?: CustomerDashboardView }) {
  const [user, setUser] = useState<Viewer | null>(null);
  const [orders, setOrders] = useState<DashboardOrder[]>([]);
  const [downloads, setDownloads] = useState<DashboardDownload[]>([]);
  const [licenses, setLicenses] = useState<DashboardLicense[]>([]);
  const [appointments, setAppointments] = useState<DashboardAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [activeDownloadId, setActiveDownloadId] = useState<string | null>(null);
  const [supportStatus, setSupportStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [supportMessage, setSupportMessage] = useState<string | null>(null);
  const [rescheduleAppointment, setRescheduleAppointment] = useState<DashboardAppointment | null>(null);
  const [activeDownloadDetail, setActiveDownloadDetail] = useState<DashboardDownload | null>(null);

  const fullName = buildFullName(user);

  const purchasedProducts = useMemo(() => {
    const bySlug = new Map<string, {
      slug: string;
      name: string;
      order_number: string;
      fulfillment_status: string;
      selected_tier_name?: string;
      license?: DashboardLicense;
    }>();

    for (const order of orders) {
      for (const item of order.items) {
        if (!bySlug.has(item.product_slug)) {
          bySlug.set(item.product_slug, {
            slug: item.product_slug,
            name: item.product_name,
            order_number: order.order_number,
            fulfillment_status: order.fulfillment_status,
            selected_tier_name: order.selected_tier_name,
            license: licenses.find((entry) => entry.order_id === order.id),
          });
        }
      }
    }

    return Array.from(bySlug.values());
  }, [licenses, orders]);

  async function refreshState() {
    setLoading(true);
    setError(null);

    try {
      const [meData, ordersData, appointmentsData, downloadsData, licensesData] = await Promise.all([
        loadJson<{ user: Viewer }>("/api/v1/me"),
        loadJson<DashboardOrder[]>("/api/v1/me/orders"),
        loadJson<DashboardAppointment[]>("/api/v1/me/appointments"),
        loadJson<DashboardDownload[]>("/api/v1/me/downloads"),
        loadJson<DashboardLicense[]>("/api/v1/me/licenses"),
      ]);

      setUser(meData.user);
      setOrders(ordersData);
      setAppointments(appointmentsData);
      setDownloads(downloadsData);
      setLicenses(licensesData);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load the dashboard.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void refreshState();
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  async function handleDownload(downloadId: string) {
    setActiveDownloadId(downloadId);
    setNotice(null);

    try {
      const response = await fetch(`/api/v1/downloads/${downloadId}/signed-url`, {
        method: "POST",
        credentials: "same-origin",
      });
      const payload = (await response.json().catch(() => null)) as {
        data?: { download_url: string };
        error?: { message?: string };
      } | null;

      if (!response.ok || !payload?.data?.download_url) {
        setNotice(payload?.error?.message ?? "Download could not be authorized.");
        return;
      }

      window.location.assign(payload.data.download_url);
      await refreshState();
    } finally {
      setActiveDownloadId(null);
    }
  }

  async function handleSupportSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSupportStatus("submitting");
    setSupportMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const subject = String(formData.get("subject") ?? "").trim();
    const details = String(formData.get("details") ?? formData.get("brief") ?? "").trim();
    const brief = [subject, details].filter(Boolean).join("\n\n").trim();
    const productSlug = String(formData.get("product_slug") ?? "").trim();

    try {
      const response = await fetch("/api/v1/service-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          customer_email: user?.email,
          customer_name: fullName,
          product_slug: productSlug || undefined,
          brief,
          metadata: {
            source: "dashboard_support",
          },
        }),
      });

      const payload = (await response.json().catch(() => null)) as {
        data?: { request_number?: string };
        error?: { message?: string };
      } | null;

      if (!response.ok) {
        setSupportStatus("error");
        setSupportMessage(payload?.error?.message ?? "Support request could not be sent.");
        return;
      }

      setSupportStatus("success");
      setSupportMessage(
        payload?.data?.request_number
          ? `Support request ${payload.data.request_number} was sent successfully.`
          : "Support request sent successfully."
      );
      form.reset();
    } catch {
      setSupportStatus("error");
      setSupportMessage("Support request could not be sent.");
    }
  }

  function renderOverview() {
    const quickStats = [
      {
        key: "orders",
        label: "Orders",
        value: orders.length,
        subtitle: "Total orders",
        href: "/dashboard/orders",
        icon: <ShoppingBagIcon className="size-5" />,
      },
      {
        key: "downloads",
        label: "Downloads",
        value: downloads.length,
        subtitle: "Total downloads",
        href: "/dashboard/downloads",
        icon: <ArrowDownTrayIcon className="size-5" />,
      },
      {
        key: "licenses",
        label: "Licenses",
        value: licenses.length,
        subtitle: "Active licenses",
        href: "/dashboard/products",
        icon: <ShieldCheckIcon className="size-5" />,
      },
      {
        key: "appointments",
        label: "Appointments",
        value: appointments.length,
        subtitle: "Scheduled",
        href: "/dashboard/appointments",
        icon: <CalendarDaysIcon className="size-5" />,
      },
    ] as const;

    const recentOrders = orders.slice(0, 3);
    const readyDownloads = downloads.filter((entry) => entry.status.toLowerCase() === "delivered");

    return (
      <div className="space-y-4">
        <section className="dashboard-hero-surface relative overflow-hidden rounded-md border border-primary/25 p-6 lg:p-7">
          <div
            className="dashboard-hero-glow pointer-events-none absolute inset-y-0 right-0 hidden w-2/5 lg:block"
            aria-hidden
          />

          <div className="relative grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-primary">Portal summary</p>
              <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight tracking-tight sm:text-4xl">
                Welcome back,
                <br />
                <span className="text-primary">{fullName}</span>
              </h2>
              <p className="mt-3 text-base text-text-muted">Orders, downloads, and next steps from one place.</p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <Link href="/digital-products" className="rounded-sm border border-primary/30 bg-primary/10 px-3.5 py-3 transition-colors hover:bg-primary/15">
                  <div className="flex items-center gap-2 text-primary"><CubeIcon className="size-4" /><span className="text-sm font-semibold">Browse Products</span></div>
                  <p className="mt-1 text-sm text-text-muted">Explore new products</p>
                </Link>
                <Link href="/dashboard/orders" className="rounded-sm border border-border/55 bg-surface/25 px-3.5 py-3 transition-colors hover:border-primary/30">
                  <div className="flex items-center gap-2 text-text"><ClipboardDocumentListIcon className="size-4" /><span className="text-sm font-semibold">View Orders</span></div>
                  <p className="mt-1 text-sm text-text-muted">Track your orders</p>
                </Link>
                <Link href="/dashboard/support" className="rounded-sm border border-border/55 bg-surface/25 px-3.5 py-3 transition-colors hover:border-primary/30">
                  <div className="flex items-center gap-2 text-text"><LifebuoyIcon className="size-4" /><span className="text-sm font-semibold">Need Support?</span></div>
                  <p className="mt-1 text-sm text-text-muted">We are here to help</p>
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex lg:justify-center">
              <div className="dashboard-orb relative h-48 w-48 rounded-4xl border border-primary/30 p-5">
                <div className="grid grid-cols-3 gap-2.5">
                  {Array.from({ length: 9 }).map((_, index) => (
                    <span key={index} className="h-8 rounded-xs border border-primary/20 bg-primary/10" />
                  ))}
                </div>
                <div className="pointer-events-none absolute -inset-6 rounded-[2.5rem] border border-primary/15" aria-hidden />
                <div className="pointer-events-none absolute -inset-12 rounded-[3rem] border border-primary/10" aria-hidden />
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {quickStats.map((item) => (
            <Link
              key={item.key}
              href={item.href}
                className="dashboard-panel-surface group rounded-sm border border-border/65 p-4 transition-all hover:border-primary/40 hover:shadow-(--shadow-2)"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex size-11 items-center justify-center rounded-sm border border-primary/25 bg-primary/12 text-primary">{item.icon}</span>
                <span className="inline-flex size-9 items-center justify-center rounded-full border border-border/60 text-text-muted transition-colors group-hover:border-primary/45 group-hover:text-primary">
                  <ArrowRightIcon className="size-4" />
                </span>
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.14em] text-text-muted">{item.label}</p>
              <p className="mt-1 font-display text-4xl leading-none tracking-tight">{item.value}</p>
              <p className="mt-1 text-sm text-text-muted">{item.subtitle}</p>
            </Link>
          ))}
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <Card className="dashboard-panel-surface rounded-sm border-border/65 p-4 sm:p-5" hoverable={false}>
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-2xl tracking-tight">Recent Orders</h3>
              <LinkButton href="/dashboard/orders" variant="outline" size="sm">View all orders</LinkButton>
            </div>

            <div className="mt-4 space-y-2.5">
              {recentOrders.map((order, index) => (
                <Link
                  key={order.id}
                  href={`/dashboard/orders/${order.id}`}
                  className="flex flex-wrap items-center gap-3 rounded-sm border border-border/55 bg-surface/25 px-3.5 py-3 transition-colors hover:border-primary/35"
                >
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-sm border border-primary/20 bg-primary/12 text-sm font-semibold text-text-muted">
                    {order.items[0]?.product_name?.slice(0, 2).toUpperCase() ?? `P${index + 1}`}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-text">{order.order_number}</p>
                    <p className="truncate text-sm text-text-muted">{order.items[0]?.product_name ?? "Product"}</p>
                  </div>

                  <div className="ml-auto text-right">
                    <p className="font-semibold text-text">{currencyFormatter.format(order.total_cents / 100)}</p>
                    <p className="text-sm text-text-muted">{formatShortDate(order.created_at)}</p>
                  </div>

                  <span className="rounded-full border border-primary/35 bg-primary/12 px-2.5 py-1 text-xs font-semibold text-primary">
                    {order.payment_status === "succeeded" ? "Completed" : order.payment_status}
                  </span>
                </Link>
              ))}

              {recentOrders.length === 0 ? (
                <div className="rounded-sm border border-dashed border-border/65 bg-surface/20 px-4 py-7 text-center text-sm text-text-muted">
                  No orders yet.
                </div>
              ) : null}
            </div>

            {recentOrders.length > 0 ? (
              <div className="mt-3 text-center">
                <Link href="/dashboard/orders" className="inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-primary">
                  View all orders
                  <ArrowRightIcon className="size-4" />
                </Link>
              </div>
            ) : null}
          </Card>

          <Card className="dashboard-panel-surface rounded-sm border-border/65 p-4 sm:p-5" hoverable={false}>
            <h3 className="font-display text-2xl tracking-tight">Downloads Ready</h3>

            {readyDownloads.length === 0 ? (
              <div className="mt-10 flex flex-col items-center text-center">
                <span className="inline-flex size-14 items-center justify-center rounded-sm border border-primary/30 bg-primary/14 text-primary">
                  <ArrowDownTrayIcon className="size-6" />
                </span>
                <p className="mt-6 text-xl font-semibold">No delivered downloads yet.</p>
                <p className="mt-2 max-w-xs text-sm text-text-muted">
                  When your files are ready, they will appear here.
                </p>
                <LinkButton href="/digital-products" variant="outline" className="mt-7">
                  Browse Products
                  <ArrowRightIcon className="ml-1 size-4" />
                </LinkButton>
              </div>
            ) : (
              <div className="mt-4 space-y-2.5">
                {readyDownloads.slice(0, 3).map((download) => (
                  <div key={download.id} className="rounded-sm border border-border/55 bg-surface/25 px-3.5 py-3">
                    <p className="font-semibold text-text">{download.file_label ?? download.product_slug}</p>
                    <p className="mt-1 text-sm text-text-muted">
                      {download.download_count}/{download.max_downloads} downloads used
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </section>

        <section className="dashboard-strip-surface rounded-md border border-primary/20 p-5">
          <div className="grid gap-5 xl:grid-cols-[1.2fr_1fr] xl:items-center">
            <div>
              <h3 className="font-display text-3xl tracking-tight text-primary">Everything you need in one place</h3>
              <p className="mt-2 max-w-2xl text-base text-text-muted">
                Manage your orders, access downloads, track appointments, and get support from your dashboard.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "Secure & Private", text: "Your data is safe and encrypted", icon: <ShieldCheckIcon className="size-5" /> },
                { label: "Instant Access", text: "Get products and downloads instantly", icon: <BoltIcon className="size-5" /> },
                { label: "Expert Support", text: "Real humans, real solutions", icon: <ChatBubbleLeftRightIcon className="size-5" /> },
                { label: "Always Updated", text: "New features and improvements", icon: <ArrowPathIcon className="size-5" /> },
              ].map((feature) => (
                <div key={feature.label} className="dashboard-strip-tile rounded-sm border border-primary/20 p-3.5">
                  <div className="flex items-center gap-2 text-primary">
                    {feature.icon}
                    <p className="text-sm font-semibold text-text">{feature.label}</p>
                  </div>
                  <p className="mt-1 text-sm text-text-muted">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  function renderProducts() {
    const productKinds = ["All Products", "Website Templates", "Business Profiles", "Landing Pages", "Themes", "Mobile Apps", "Tools"];
    const sortedProducts = [...purchasedProducts].sort((a, b) => a.name.localeCompare(b.name));

    return (
      <div className="space-y-4">
        <section className="dashboard-hero-surface relative overflow-hidden rounded-md border border-primary/25 p-6 lg:p-7">
          <div className="dashboard-hero-glow pointer-events-none absolute inset-y-0 right-0 hidden w-2/5 lg:block" aria-hidden />
          <div className="relative">
            <p className="text-xs uppercase tracking-[0.18em] text-primary">Portal summary</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight tracking-tight sm:text-4xl">
              Welcome back, <span className="text-primary">{fullName}</span> <span aria-hidden>👋</span>
            </h2>
            <p className="mt-3 text-base text-text-muted">Everything you have unlocked, including licenses and fulfillment status.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Total orders", value: orders.length, icon: <ShoppingBagIcon className="size-5" /> },
                { label: "Downloads", value: downloads.length, icon: <ArrowDownTrayIcon className="size-5" /> },
                { label: "Licenses", value: licenses.length, icon: <ShieldCheckIcon className="size-5" /> },
                { label: "Appointments", value: appointments.length, icon: <TagIcon className="size-5" /> },
              ].map((stat) => (
                <div key={stat.label} className="rounded-sm border border-primary/20 bg-surface/25 px-3.5 py-3">
                  <div className="flex items-center gap-2 text-primary">{stat.icon}<span className="text-2xl font-semibold text-text">{stat.value}</span></div>
                  <p className="mt-1 text-sm text-text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex flex-wrap items-center justify-between gap-3">
          <div className="dashboard-panel-surface flex flex-wrap gap-2 rounded-sm border border-border/65 p-2">
            {productKinds.map((kind, index) => (
              <button
                key={kind}
                type="button"
                className={index === 0 ? "rounded-sm bg-primary/20 px-4 py-2 text-sm font-medium text-primary" : "rounded-sm border border-border/60 px-4 py-2 text-sm text-text-muted hover:border-primary/30"}
              >
                {kind}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button type="button" className="inline-flex h-11 items-center rounded-sm border border-border/60 px-4 text-sm text-text">Sort by: Latest</button>
            <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-primary/30 bg-primary/12 text-primary" aria-label="Grid view">
              <span className="grid grid-cols-2 gap-0.5">
                <span className="h-1.5 w-1.5 rounded-xs bg-current" />
                <span className="h-1.5 w-1.5 rounded-xs bg-current" />
                <span className="h-1.5 w-1.5 rounded-xs bg-current" />
                <span className="h-1.5 w-1.5 rounded-xs bg-current" />
              </span>
            </button>
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-3">
          {sortedProducts.map((product) => {
            const state = product.fulfillment_status.toLowerCase();
            const stateTone = state.includes("delivered") || state.includes("complete")
              ? "border-primary/35 bg-primary/12 text-primary"
              : "border-warning/40 bg-warning/12 text-warning";

            return (
              <Card key={product.slug} className="dashboard-panel-surface rounded-sm border-border/65 p-3" hoverable={false}>
                <div className="grid gap-3 sm:grid-cols-[9rem_1fr]">
                  <div className="flex h-52 items-end rounded-sm border border-border/60 bg-linear-to-br from-primary/18 to-surface p-3">
                    <p className="text-base font-semibold text-text">{product.name.slice(0, 22)}</p>
                  </div>
                  <div>
                    <p className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${stateTone}`}>
                      {state.includes("delivered") || state.includes("complete") ? "Completed" : "In progress"}
                    </p>
                    <h3 className="mt-3 font-display text-4xl leading-tight tracking-tight">{product.name}</h3>
                    <p className="mt-1 text-2xl text-text-muted">{product.slug.replaceAll("-", " ")}</p>
                    <p className="mt-2 text-base text-text-muted">Order ID</p>
                    <p className="text-2xl text-text">{product.order_number}</p>
                    <p className="mt-1 text-base text-text-muted">Purchased on {orders.find((order) => order.order_number === product.order_number)?.created_at ? formatShortDate(orders.find((order) => order.order_number === product.order_number)?.created_at) : "Not available"}</p>
                    {product.selected_tier_name ? <p className="mt-2 text-sm text-text-muted">Tier: {product.selected_tier_name}</p> : null}
                    <LinkButton href="/dashboard/orders" variant="outline" size="sm" fullWidth className="mt-4 justify-between">
                      View Details
                      <ArrowRightIcon className="size-4" />
                    </LinkButton>
                  </div>
                </div>
              </Card>
            );
          })}
        </section>

        {sortedProducts.length === 0 ? (
          <Card className="dashboard-panel-surface rounded-sm border-border/65 text-center" hoverable={false}>
            <p className="text-sm text-text-muted">Your purchased products will appear here after your first order.</p>
          </Card>
        ) : null}

        {sortedProducts.length > 0 ? (
          <Card className="dashboard-panel-surface rounded-sm border-border/65 px-4 py-3" hoverable={false}>
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-text-muted">
              <p>Showing 1 to {sortedProducts.length} of {sortedProducts.length} products</p>
              <div className="flex items-center gap-2">
                <button type="button" className="h-9 rounded-sm border border-border/60 px-3 text-text-muted" disabled>Previous</button>
                <button type="button" className="h-9 rounded-sm border border-primary/35 bg-primary/12 px-3 text-primary">1</button>
                <button type="button" className="h-9 rounded-sm border border-border/60 px-3 text-text-muted" disabled>Next</button>
              </div>
            </div>
          </Card>
        ) : null}
      </div>
    );
  }

  function renderDownloads() {
    const readyDownloads = downloads.filter((entry) => entry.status.toLowerCase() === "delivered");
    const totalDownloadSize = `${(downloads.length * 1.24).toFixed(1)} GB`;

    return (
      <div className="space-y-4">
        <section className="dashboard-hero-surface relative overflow-hidden rounded-md border border-primary/25 p-6 lg:p-7">
          <div className="dashboard-hero-glow pointer-events-none absolute inset-y-0 right-0 hidden w-2/5 lg:block" aria-hidden />
          <div className="relative">
            <p className="text-xs uppercase tracking-[0.18em] text-primary">Portal summary</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight tracking-tight sm:text-4xl">Welcome back, <span className="text-primary">{fullName}</span> <span aria-hidden>👋</span></h2>
            <p className="mt-3 text-base text-text-muted">Manage and access all your downloaded files and assets.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Ready to download", value: readyDownloads.length, icon: <ArrowDownTrayIcon className="size-5" /> },
                { label: "Updates available", value: 0, icon: <ArrowPathIcon className="size-5" /> },
                { label: "Total downloaded size", value: totalDownloadSize, icon: <CubeTransparentIcon className="size-5" /> },
                { label: "Products downloaded", value: new Set(downloads.map((item) => item.product_slug)).size, icon: <ShoppingBagIcon className="size-5" /> },
              ].map((stat) => (
                <div key={stat.label} className="rounded-sm border border-primary/20 bg-surface/25 px-3.5 py-3">
                  <div className="flex items-center gap-2 text-primary">{stat.icon}<span className="text-2xl font-semibold text-text">{stat.value}</span></div>
                  <p className="mt-1 text-sm text-text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex flex-wrap items-center justify-between gap-3">
          <div className="dashboard-panel-surface flex flex-wrap gap-2 rounded-sm border border-border/65 p-2">
            {[
              "All Downloads",
              "Ready to Download",
              "Updates Available",
              "Installed",
              "Expired",
            ].map((tab, index) => (
              <button key={tab} type="button" className={index === 0 ? "rounded-sm bg-primary/20 px-4 py-2 text-sm font-medium text-primary" : "rounded-sm border border-border/60 px-4 py-2 text-sm text-text-muted hover:border-primary/30"}>{tab}</button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="relative">
              <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
              <input type="text" placeholder="Search downloads..." className="h-11 rounded-sm border border-border/60 bg-surface/45 pl-10 pr-3 text-sm text-text placeholder:text-text-muted" />
            </label>
            <button type="button" className="inline-flex h-11 items-center rounded-sm border border-border/60 px-4 text-sm text-text">Sort by: Latest</button>
          </div>
        </section>

        <Card className="dashboard-panel-surface rounded-md border-border/65 p-4 sm:p-6" hoverable={false}>
          {downloads.length === 0 ? (
            <div className="rounded-md border border-border/60 bg-surface/20 px-4 py-12 text-center">
              <span className="mx-auto inline-flex size-16 items-center justify-center rounded-sm border border-primary/25 bg-primary/12 text-primary">
                <ArrowDownTrayIcon className="size-7" />
              </span>
              <h3 className="mt-6 font-display text-4xl tracking-tight">No downloads ready yet</h3>
              <p className="mx-auto mt-3 max-w-lg text-base text-text-muted">
                Once your orders are completed, your downloadable files will appear here automatically.
              </p>
              <LinkButton href="/digital-products" className="mt-6">
                Browse Products
                <ArrowRightIcon className="ml-1 size-4" />
              </LinkButton>
            </div>
          ) : (
            <div className="space-y-3">
              {downloads.map((download) => (
                <div key={download.id} className="flex flex-wrap items-center gap-3 rounded-sm border border-border/55 bg-surface/25 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-text">{download.file_label ?? download.product_slug}</p>
                    <p className="text-sm text-text-muted">Usage {download.download_count}/{download.max_downloads} · Last: {formatDateTime(download.last_downloaded_at)}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button type="button" variant="ghost" size="sm" onClick={() => setActiveDownloadDetail(download)}>View details</Button>
                    <Button type="button" variant="outline" size="sm" disabled={activeDownloadId === download.id} onClick={() => void handleDownload(download.id)}>
                      {activeDownloadId === download.id ? "Authorizing..." : "Open download"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "Secure & Safe", text: "All files are scanned and 100% secure.", icon: <ShieldCheckIcon className="size-5" /> },
              { title: "Instant Access", text: "Download your files instantly when they are ready.", icon: <BoltIcon className="size-5" /> },
              { title: "Cloud Storage", text: "Your downloads are stored safely in the cloud.", icon: <CubeTransparentIcon className="size-5" /> },
              { title: "Need Help?", text: "Our support team is here to assist you.", icon: <LifebuoyIcon className="size-5" /> },
            ].map((item) => (
              <div key={item.title} className="rounded-sm border border-border/60 bg-surface/25 p-3.5">
                <div className="flex items-center gap-2 text-primary">{item.icon}<p className="text-sm font-semibold text-text">{item.title}</p></div>
                <p className="mt-1 text-sm text-text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="dashboard-panel-surface rounded-sm border-border/65 px-5 py-4" hoverable={false}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-text">Can&apos;t find your download?</p>
              <p className="text-sm text-text-muted">If you believe something is missing, our support team can help.</p>
            </div>
            <LinkButton href="/dashboard/support" variant="outline" size="sm" className="justify-between">Contact Support <ArrowRightIcon className="size-4" /></LinkButton>
          </div>
        </Card>
      </div>
    );
  }

  function renderOrders() {
    const totalSpent = orders.reduce((sum, order) => sum + order.total_cents, 0);
    const pendingAction = orders.filter((order) => !["delivered", "completed"].includes(order.fulfillment_status.toLowerCase())).length;
    const completedCount = orders.filter((order) => ["succeeded", "paid"].includes(order.payment_status.toLowerCase())).length;
    const sortedOrders = [...orders].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return (
      <div className="space-y-4">
        <section className="dashboard-hero-surface relative overflow-hidden rounded-md border border-primary/25 p-6 lg:p-7">
          <div className="dashboard-hero-glow pointer-events-none absolute inset-y-0 right-0 hidden w-2/5 lg:block" aria-hidden />
          <div className="relative grid gap-4 xl:grid-cols-[1.1fr_1fr] xl:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-primary">Portal summary</p>
              <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight tracking-tight sm:text-4xl">Welcome back, <span className="text-primary">{fullName}</span> <span aria-hidden>👋</span></h2>
              <p className="mt-3 text-base text-text-muted">Track payment and fulfillment progress for each purchase.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Total orders", value: orders.length, icon: <ShoppingBagIcon className="size-5" /> },
                { label: "Total spent", value: currencyFormatter.format(totalSpent / 100), icon: <TagIcon className="size-5" /> },
                { label: "Pending action", value: pendingAction, icon: <ClockIcon className="size-5" /> },
                { label: "Completed", value: completedCount, icon: <ShieldCheckIcon className="size-5" /> },
              ].map((stat) => (
                <div key={stat.label} className="rounded-sm border border-primary/20 bg-surface/25 px-3.5 py-3">
                  <div className="flex items-center gap-2 text-primary">{stat.icon}<span className="text-2xl font-semibold text-text">{stat.value}</span></div>
                  <p className="mt-1 text-sm text-text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-3">
            {["All Orders", "Processing", "Completed", "Cancelled", "Refunded"].map((tab, index) => (
              <button key={tab} type="button" className={index === 0 ? "border-b-2 border-primary pb-2 text-base font-medium text-primary" : "pb-2 text-base text-text-muted"}>{tab}</button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button type="button" className="inline-flex h-11 items-center gap-2 rounded-sm border border-border/60 px-4 text-sm text-text"><FunnelIcon className="size-4" />Filter</button>
            <button type="button" className="inline-flex h-11 items-center rounded-sm border border-border/60 px-4 text-sm text-text">Sort: Newest</button>
          </div>
        </section>

        <section className="space-y-3">
          {sortedOrders.map((order) => {
            const paymentDone = ["paid", "succeeded"].includes(order.payment_status.toLowerCase());
            const fulfillmentDone = ["delivered", "completed"].includes(order.fulfillment_status.toLowerCase());

            return (
              <Link key={order.id} href={`/dashboard/orders/${order.id}`} className="dashboard-panel-surface block rounded-sm border border-border/65 px-4 py-3 transition-colors hover:border-primary/35">
              <div className="grid gap-3 xl:grid-cols-[1.3fr_0.55fr_0.6fr_0.62fr_0.58fr_0.52fr_auto] xl:items-center">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-sm border border-primary/20 bg-linear-to-br from-primary/30 to-surface text-sm font-semibold text-text-muted">{order.items[0]?.product_name.slice(0, 2).toUpperCase() ?? "PD"}</span>
                  <div className="min-w-0">
                    <p className="truncate text-3xl font-semibold tracking-tight text-text">{order.order_number}</p>
                    <p className="truncate text-2xl text-text">{order.items[0]?.product_name ?? "Product"}</p>
                    <p className="truncate text-base text-text-muted">{order.items[0]?.product_slug?.replaceAll("-", " ") ?? "Website Template"} · {order.selected_tier_name ?? "Standard"}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-text-muted">Payment status</p>
                  <p className="mt-1 inline-flex items-center gap-2 text-base text-text"><span className={paymentDone ? "size-2 rounded-full bg-success" : "size-2 rounded-full bg-warning"} aria-hidden />{paymentDone ? "Paid" : order.payment_status}</p>
                </div>
                <div>
                  <p className="text-sm text-text-muted">Fulfillment status</p>
                  <p className="mt-1 inline-flex items-center gap-2 text-base text-text"><span className={fulfillmentDone ? "size-2 rounded-full bg-success" : "size-2 rounded-full bg-warning"} aria-hidden />{fulfillmentDone ? "Completed" : "Pending"}</p>
                </div>
                <div>
                  <p className="text-sm text-text-muted">Created</p>
                  <p className="mt-1 text-base text-text">{formatDateTime(order.created_at)}</p>
                </div>
                <div>
                  <p className="text-sm text-text-muted">Completed</p>
                  <p className="mt-1 text-base text-text">{order.completed_at ? formatDateTime(order.completed_at) : "Not available"}</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-semibold tracking-tight text-text">{currencyFormatter.format(order.total_cents / 100)}</p>
                </div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border/60 bg-surface/35 text-text-muted"><ChevronRightIcon className="size-5" /></span>
              </div>
            </Link>
            );
          })}
        </section>

        {sortedOrders.length === 0 ? (
          <Card className="dashboard-panel-surface rounded-sm border-border/65 text-center" hoverable={false}>
            <p className="text-sm text-text-muted">No orders yet.</p>
          </Card>
        ) : null}

        {sortedOrders.length > 0 ? (
          <Card className="dashboard-panel-surface rounded-sm border-border/65 px-4 py-3" hoverable={false}>
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-text-muted">
              <p>Showing 1 to {sortedOrders.length} of {sortedOrders.length} orders</p>
              <div className="flex items-center gap-2">
                <button type="button" className="h-9 rounded-sm border border-border/60 px-3 text-text-muted" disabled>Previous</button>
                <button type="button" className="h-9 rounded-sm border border-primary/35 bg-primary/12 px-3 text-primary">1</button>
                <button type="button" className="h-9 rounded-sm border border-border/60 px-3 text-text-muted" disabled>Next</button>
              </div>
              <div className="flex items-center gap-2">
                <span>Show</span>
                <button type="button" className="inline-flex h-9 items-center rounded-sm border border-border/60 px-3 text-text">10 per page</button>
              </div>
            </div>
          </Card>
        ) : null}
      </div>
    );
  }

  function renderAppointments() {
    const totalAppointments = appointments.length;
    const upcomingAppointments = appointments.filter((entry) => ["inquiry", "confirmed"].includes(entry.status.toLowerCase())).length;
    const pendingAppointments = appointments.filter((entry) => entry.status.toLowerCase().includes("pending") || entry.status.toLowerCase() === "inquiry").length;
    const completedAppointments = appointments.filter((entry) => entry.status.toLowerCase().includes("complete")).length;
    const sortedAppointments = [...appointments].sort((a, b) => new Date(b.preferred_datetime).getTime() - new Date(a.preferred_datetime).getTime());

    return (
      <div className="space-y-4">
        <section className="dashboard-hero-surface relative overflow-hidden rounded-md border border-primary/25 p-6 lg:p-7">
          <div className="dashboard-hero-glow pointer-events-none absolute inset-y-0 right-0 hidden w-2/5 lg:block" aria-hidden />
          <div className="relative grid gap-4 xl:grid-cols-[1.1fr_1fr] xl:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-primary">Portal summary</p>
              <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight tracking-tight sm:text-4xl">Welcome back, <span className="text-primary">{fullName}</span> <span aria-hidden>👋</span></h2>
              <p className="mt-3 text-base text-text-muted">Upcoming and requested sessions connected to your account.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Total appointments", value: totalAppointments, icon: <CalendarDaysIcon className="size-5" /> },
                { label: "Upcoming", value: upcomingAppointments, icon: <ClockIcon className="size-5" /> },
                { label: "Pending", value: pendingAppointments, icon: <TagIcon className="size-5" /> },
                { label: "Completed", value: completedAppointments, icon: <ShieldCheckIcon className="size-5" /> },
              ].map((stat) => (
                <div key={stat.label} className="rounded-sm border border-primary/20 bg-surface/25 px-3.5 py-3">
                  <div className="flex items-center gap-2 text-primary">{stat.icon}<span className="text-xl font-semibold text-text">{stat.value}</span></div>
                  <p className="mt-1 text-sm text-text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-3">
            {["All Appointments", "Upcoming", "Pending", "Completed", "Cancelled"].map((tab, index) => (
              <button key={tab} type="button" className={index === 0 ? "border-b-2 border-primary pb-2 text-base font-medium text-primary" : "pb-2 text-base text-text-muted"}>{tab}</button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className="inline-flex h-11 items-center rounded-sm border border-border/60 px-4 text-sm text-text">Sort by: Upcoming first</button>
            <button type="button" className="inline-flex h-11 items-center gap-2 rounded-sm border border-border/60 px-4 text-sm text-text"><FunnelIcon className="size-4" />Filter</button>
          </div>
        </section>

        <section className="space-y-3">
          {sortedAppointments.map((appointment) => {
            const canModify = appointment.status === "inquiry" || appointment.status === "confirmed";
            const statusLower = appointment.status.toLowerCase();
            const statusTone = statusLower.includes("complete")
              ? "border-primary/35 bg-primary/12 text-primary"
              : statusLower.includes("cancel")
                ? "border-destructive/40 bg-destructive/10 text-destructive"
                : "border-warning/40 bg-warning/10 text-warning";

            return (
              <div key={appointment.id} className="dashboard-panel-surface rounded-sm border border-border/65 px-4 py-3">
                <div className="grid gap-3 xl:grid-cols-[1.35fr_0.9fr_auto] xl:items-center">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-sm border border-primary/25 bg-primary/14 text-primary"><CalendarDaysIcon className="size-8" /></span>
                    <div>
                      <p className="text-3xl font-semibold tracking-tight text-text">{appointment.service_interested_in}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-4 text-base text-text-muted">
                        <span className="inline-flex items-center gap-1"><CalendarDaysIcon className="size-4" />{formatShortDate(appointment.preferred_datetime)}</span>
                        <span className="inline-flex items-center gap-1"><ClockIcon className="size-4" />{new Date(appointment.preferred_datetime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                      </div>
                      <p className="text-sm text-text-muted">Type: Inquiry</p>
                    </div>
                  </div>

                  <div>
                    <p className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusTone}`}>{appointment.status}</p>
                    <p className="mt-2 text-sm text-text-muted">{canModify ? "Awaiting confirmation" : "Session completed"}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {canModify ? (
                      <Button type="button" variant="outline" size="sm" onClick={() => setRescheduleAppointment(appointment)}>
                        Reschedule or cancel
                      </Button>
                    ) : (
                      <Button type="button" variant="outline" size="sm">View details</Button>
                    )}
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-text-muted"><ChevronRightIcon className="size-5" /></span>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {appointments.length === 0 ? (
          <Card className="dashboard-panel-surface rounded-sm border-border/65 text-center" hoverable={false}>
            <p className="text-sm text-text-muted">No appointments are linked to this account yet.</p>
          </Card>
        ) : null}

        {sortedAppointments.length > 0 ? (
          <Card className="dashboard-panel-surface rounded-sm border-border/65 px-4 py-3" hoverable={false}>
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-text-muted">
              <p>Showing 1 to {sortedAppointments.length} of {sortedAppointments.length} appointments</p>
              <div className="flex items-center gap-2">
                <button type="button" className="h-9 rounded-sm border border-border/60 px-3 text-text-muted" disabled>Previous</button>
                <button type="button" className="h-9 rounded-sm border border-primary/35 bg-primary/12 px-3 text-primary">1</button>
                <button type="button" className="h-9 rounded-sm border border-border/60 px-3 text-text-muted" disabled>Next</button>
              </div>
              <div className="flex items-center gap-2">
                <span>Show</span>
                <button type="button" className="inline-flex h-9 items-center rounded-sm border border-border/60 px-3 text-text">10 per page</button>
              </div>
            </div>
          </Card>
        ) : null}
      </div>
    );
  }

  function renderSupport() {
    return (
      <div className="space-y-4">
        <section className="dashboard-hero-surface relative overflow-hidden rounded-md border border-primary/25 p-6 lg:p-7">
          <div className="dashboard-hero-glow pointer-events-none absolute inset-y-0 right-0 hidden w-2/5 lg:block" aria-hidden />
          <div className="relative">
            <p className="text-xs uppercase tracking-[0.18em] text-primary">Portal summary</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight tracking-tight sm:text-4xl">Welcome back, <span className="text-primary">{fullName}</span> <span aria-hidden>👋</span></h2>
            <p className="mt-3 text-base text-text-muted">Send a product or service request and get help from our team.</p>
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.12fr_0.88fr]">
          <Card className="dashboard-panel-surface rounded-sm border-border/65 p-5" hoverable={false}>
            <p className="text-xs uppercase tracking-[0.18em] text-primary">Support request</p>
            <h2 className="mt-3 font-display text-5xl tracking-tight">Send a request to the team</h2>
            <p className="mt-3 text-base leading-7 text-text-muted">
              This creates a tracked service request tied to your account and our team can follow up from the same conversation.
            </p>

            <form onSubmit={handleSupportSubmit} className="mt-7 space-y-4">
              <label className="block">
                <span className="text-xs uppercase tracking-[0.18em] text-text-muted">Request category</span>
                <select name="product_slug" className="signal-input mt-1.5">
                  <option value="">General support</option>
                  {purchasedProducts.map((product) => (
                    <option key={product.slug} value={product.slug}>{product.name}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-xs uppercase tracking-[0.18em] text-text-muted">Subject</span>
                <input
                  name="subject"
                  required
                  minLength={6}
                  className="signal-input mt-1.5"
                  placeholder="Enter a short summary of your request"
                />
              </label>

              <label className="block">
                <span className="text-xs uppercase tracking-[0.18em] text-text-muted">Details</span>
                <textarea
                  name="details"
                  required
                  minLength={20}
                  rows={6}
                  className="signal-input mt-1.5 min-h-36 resize-y py-3"
                  placeholder="Describe the issue, request, delivery or customization help you need..."
                />
              </label>

              <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-text-muted">
                <button type="button" className="inline-flex items-center gap-2 text-text-muted hover:text-text">
                  <PaperClipIcon className="size-4" />
                  Add attachment (optional)
                </button>
                <span>0 / 5 files • Max 10MB each</span>
              </div>

              {supportMessage ? (
                <p className={supportStatus === "error" ? "text-sm text-destructive" : "text-sm text-text-muted"}>
                  {supportMessage}
                </p>
              ) : null}

              <Button type="submit" disabled={supportStatus === "submitting"}>
                {supportStatus === "submitting" ? "Sending..." : "Send request"}
                <ArrowRightIcon className="ml-1 size-4" />
              </Button>
            </form>
          </Card>

          <div className="space-y-4">
            <Card className="dashboard-panel-surface rounded-sm border-border/65 p-4" hoverable={false}>
              <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Fast paths</p>
              <div className="mt-4 space-y-2.5">
                {[
                  { href: "/live-chat", title: "Open live chat", hint: "Instant help from our support team", icon: <ChatBubbleLeftRightIcon className="size-5" /> },
                  { href: "/contact", title: "Contact the team", hint: "Reach out to our support specialists", icon: <LifebuoyIcon className="size-5" /> },
                  { href: "/book-appointment", title: "Book another session", hint: "Schedule a call or meeting", icon: <CalendarDaysIcon className="size-5" /> },
                ].map((item) => (
                  <Link key={item.title} href={item.href} className="flex items-center gap-3 rounded-sm border border-border/60 bg-surface/25 px-3.5 py-3 transition-colors hover:border-primary/35">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-primary/25 bg-primary/12 text-primary">{item.icon}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-base font-semibold text-text">{item.title}</p>
                      <p className="truncate text-sm text-text-muted">{item.hint}</p>
                    </div>
                    <ChevronRightIcon className="size-5 text-text-muted" />
                  </Link>
                ))}
              </div>
            </Card>

            <Card className="dashboard-panel-surface rounded-sm border-border/65 p-4" hoverable={false}>
              <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Support hours</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-primary/25 bg-primary/12 text-primary"><ClockIcon className="size-7" /></span>
                <div>
                  <p className="text-base text-text-muted">We&apos;re available</p>
                  <p className="text-3xl font-semibold tracking-tight text-text">Mon - Fri, 9:00 AM - 6:00 PM (UTC)</p>
                  <p className="text-sm text-text-muted">Average response time: 2h 14m</p>
                </div>
              </div>
            </Card>

            <Card className="dashboard-panel-surface rounded-sm border-border/65 p-4" hoverable={false}>
              <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Helpful resources</p>
              <div className="mt-4 space-y-2.5">
                {[
                  { title: "Knowledge base", hint: "Browse articles and guides", icon: <BookOpenIcon className="size-5" /> },
                  { title: "Video tutorials", hint: "Step-by-step walkthroughs", icon: <PlayIcon className="size-5" /> },
                  { title: "System status", hint: "Check our system health", icon: <ServerStackIcon className="size-5" /> },
                ].map((item) => (
                  <div key={item.title} className="flex items-center gap-3 rounded-sm border border-border/60 bg-surface/25 px-3.5 py-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-primary/25 bg-primary/12 text-primary">{item.icon}</span>
                    <div className="flex-1">
                      <p className="text-base text-text">{item.title}</p>
                      <p className="text-sm text-text-muted">{item.hint}</p>
                    </div>
                    <ChevronRightIcon className="size-5 text-text-muted" />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  function renderView() {
    if (loading) {
      return (
        <Card>
          <p className="text-sm text-text-muted">Loading your dashboard...</p>
        </Card>
      );
    }

    switch (view) {
      case "products":
        return renderProducts();
      case "downloads":
        return renderDownloads();
      case "orders":
        return renderOrders();
      case "appointments":
        return renderAppointments();
      case "support":
        return renderSupport();
      case "overview":
      default:
        return renderOverview();
    }
  }

  return (
    <div className="space-y-6 p-4 sm:p-5 lg:p-6">
      {error ? (
        <Card>
          <p className="text-sm text-destructive">{error}</p>
        </Card>
      ) : null}

      {notice ? (
        <Card>
          <p className="text-sm text-text-muted">{notice}</p>
        </Card>
      ) : null}

      {renderView()}

      <AppointmentRescheduleModal
        appointment={rescheduleAppointment}
        onClose={() => setRescheduleAppointment(null)}
        onUpdated={() => {
          setRescheduleAppointment(null);
          void refreshState();
        }}
      />

      <DownloadDetailModal
        download={activeDownloadDetail}
        onClose={() => setActiveDownloadDetail(null)}
        onAuthorized={() => {
          setActiveDownloadDetail(null);
          void refreshState();
        }}
      />
    </div>
  );
}