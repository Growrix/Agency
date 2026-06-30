"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { AppointmentRescheduleModal } from "@/components/dashboard/AppointmentRescheduleModal";
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

const viewMeta: Record<CustomerDashboardView, { title: string; description: string }> = {
  overview: {
    title: "Customer overview",
    description: "Orders, downloads, and next steps from one place.",
  },
  products: {
    title: "Purchased products",
    description: "Everything you have unlocked, including licenses and fulfillment state.",
  },
  downloads: {
    title: "Downloads",
    description: "Authorized download access for delivered assets.",
  },
  orders: {
    title: "Order history",
    description: "Track payment and fulfillment progress for each purchase.",
  },
  appointments: {
    title: "Appointments",
    description: "Upcoming and requested sessions connected to your account.",
  },
  support: {
    title: "Support",
    description: "Send a product or delivery request without leaving the portal.",
  },
};

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

  const currentMeta = viewMeta[view];
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
    const brief = String(formData.get("brief") ?? "").trim();
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
    return (
      <div className="grid gap-4 lg:grid-cols-4">
        <Card variant="inset">
          <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Orders</p>
          <p className="mt-3 font-display text-4xl tracking-tight">{orders.length}</p>
        </Card>
        <Card variant="inset">
          <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Downloads</p>
          <p className="mt-3 font-display text-4xl tracking-tight">{downloads.length}</p>
        </Card>
        <Card variant="inset">
          <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Licenses</p>
          <p className="mt-3 font-display text-4xl tracking-tight">{licenses.length}</p>
        </Card>
        <Card variant="inset">
          <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Appointments</p>
          <p className="mt-3 font-display text-4xl tracking-tight">{appointments.length}</p>
        </Card>

        <Card className="lg:col-span-2">
          <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Recent orders</p>
          <div className="mt-4 space-y-3">
            {orders.slice(0, 3).map((order) => (
              <div key={order.id} className="rounded-sm border border-border/60 bg-inset/35 px-4 py-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-text">{order.order_number}</p>
                    <p className="text-sm text-text-muted">{order.items.map((item) => item.product_name).join(", ")}</p>
                  </div>
                  <p className="text-sm text-text-muted">{currencyFormatter.format(order.total_cents / 100)}</p>
                </div>
              </div>
            ))}
            {orders.length === 0 ? <p className="text-sm text-text-muted">No orders yet.</p> : null}
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Downloads ready</p>
          <div className="mt-4 space-y-3">
            {downloads.slice(0, 3).map((download) => (
              <div key={download.id} className="rounded-sm border border-border/60 bg-inset/35 px-4 py-3">
                <p className="font-medium text-text">{download.file_label ?? download.product_slug}</p>
                <p className="mt-1 text-sm text-text-muted">
                  {download.status} · {download.download_count}/{download.max_downloads} used
                </p>
              </div>
            ))}
            {downloads.length === 0 ? <p className="text-sm text-text-muted">No delivered downloads yet.</p> : null}
          </div>
        </Card>
      </div>
    );
  }

  function renderProducts() {
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        {purchasedProducts.map((product) => (
          <Card key={product.slug}>
            <p className="text-xs uppercase tracking-[0.18em] text-text-muted">{product.slug}</p>
            <h2 className="mt-3 font-display text-3xl tracking-tight">{product.name}</h2>
            <p className="mt-3 text-sm text-text-muted">Order: {product.order_number}</p>
            <p className="mt-1 text-sm text-text-muted">Fulfillment: {product.fulfillment_status}</p>
            {product.selected_tier_name ? <p className="mt-1 text-sm text-text-muted">Tier: {product.selected_tier_name}</p> : null}
            {product.license ? (
              <div className="mt-4 rounded-sm border border-border/60 bg-inset/35 px-4 py-3 text-sm text-text-muted">
                <p className="font-medium text-text">License</p>
                <p className="mt-1 break-all">{product.license.license_key}</p>
                <p className="mt-1">{product.license.license_type} · {product.license.status}</p>
              </div>
            ) : null}
          </Card>
        ))}
        {purchasedProducts.length === 0 ? (
          <Card className="lg:col-span-2">
            <p className="text-sm text-text-muted">Your purchased products will appear here after your first order.</p>
          </Card>
        ) : null}
      </div>
    );
  }

  function renderDownloads() {
    return (
      <div className="space-y-4">
        {downloads.map((download) => (
          <Card key={download.id} className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-medium text-text">{download.file_label ?? download.product_slug}</p>
              <p className="mt-1 text-sm text-text-muted">Status: {download.status}</p>
              <p className="mt-1 text-sm text-text-muted">Usage: {download.download_count}/{download.max_downloads}</p>
              <p className="mt-1 text-sm text-text-muted">Last download: {formatDateTime(download.last_downloaded_at)}</p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={activeDownloadId === download.id}
              onClick={() => void handleDownload(download.id)}
            >
              {activeDownloadId === download.id ? "Authorizing..." : "Open download"}
            </Button>
          </Card>
        ))}
        {downloads.length === 0 ? (
          <Card>
            <p className="text-sm text-text-muted">No downloads are ready yet. Delivered assets will appear here automatically.</p>
          </Card>
        ) : null}
      </div>
    );
  }

  function renderOrders() {
    return (
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <Link
              href={`/dashboard/orders/${order.id}`}
              className="block transition-colors hover:opacity-90"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-text">{order.order_number}</p>
                  <p className="mt-1 text-sm text-text-muted">{order.items.map((item) => item.product_name).join(", ")}</p>
                </div>
                <p className="font-medium text-text">{currencyFormatter.format(order.total_cents / 100)}</p>
              </div>
              <div className="mt-4 grid gap-2 text-sm text-text-muted sm:grid-cols-2 lg:grid-cols-4">
                <p>Payment: {order.payment_status}</p>
                <p>Fulfillment: {order.fulfillment_status}</p>
                <p>Created: {formatDateTime(order.created_at)}</p>
                <p>Completed: {formatDateTime(order.completed_at)}</p>
              </div>
            </Link>
          </Card>
        ))}
        {orders.length === 0 ? (
          <Card>
            <p className="text-sm text-text-muted">No orders yet.</p>
          </Card>
        ) : null}
      </div>
    );
  }

  function renderAppointments() {
    return (
      <div className="space-y-4">
        {appointments.map((appointment) => {
          const canModify = appointment.status === "inquiry" || appointment.status === "confirmed";
          return (
            <Card key={appointment.id} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-text">{appointment.service_interested_in}</p>
                <p className="mt-1 text-sm text-text-muted">{formatDateTime(appointment.preferred_datetime)}</p>
                <p className="mt-1 text-sm text-text-muted">Status: {appointment.status}</p>
              </div>
              {canModify ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setRescheduleAppointment(appointment)}
                >
                  Reschedule or cancel
                </Button>
              ) : null}
            </Card>
          );
        })}
        {appointments.length === 0 ? (
          <Card>
            <p className="text-sm text-text-muted">No appointments are linked to this account yet.</p>
          </Card>
        ) : null}
      </div>
    );
  }

  function renderSupport() {
    return (
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Support request</p>
          <h2 className="mt-3 font-display text-3xl tracking-tight">Send a request to the team</h2>
          <p className="mt-3 text-sm leading-6 text-text-muted">
            This creates a tracked service request tied to your account email so the team can follow up from the same operational queue.
          </p>

          <form onSubmit={handleSupportSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-xs uppercase tracking-[0.18em] text-text-muted">Related product</span>
              <select name="product_slug" className="signal-input mt-1.5">
                <option value="">General support</option>
                {purchasedProducts.map((product) => (
                  <option key={product.slug} value={product.slug}>{product.name}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-[0.18em] text-text-muted">Brief</span>
              <textarea
                name="brief"
                required
                minLength={20}
                rows={6}
                className="signal-input mt-1.5 min-h-36 resize-y py-3"
                placeholder="Describe the support, delivery, or customization help you need."
              />
            </label>
            {supportMessage ? (
              <p className={supportStatus === "error" ? "text-sm text-destructive" : "text-sm text-text-muted"}>
                {supportMessage}
              </p>
            ) : null}
            <Button type="submit" disabled={supportStatus === "submitting"}>
              {supportStatus === "submitting" ? "Sending..." : "Send request"}
            </Button>
          </form>
        </Card>

        <Card variant="inset">
          <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Fast paths</p>
          <div className="mt-4 flex flex-col gap-3">
            <LinkButton href="/live-chat" variant="outline" fullWidth>Open live chat</LinkButton>
            <LinkButton href="/contact" variant="outline" fullWidth>Contact the team</LinkButton>
            <LinkButton href="/book-appointment" variant="outline" fullWidth>Book another session</LinkButton>
          </div>
        </Card>
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
      <Card variant="inset">
        <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Portal summary</p>
        <h2 className="mt-3 font-display text-3xl tracking-tight">Welcome back, {fullName}</h2>
        <p className="mt-3 text-sm leading-6 text-text-muted">{currentMeta.description}</p>
      </Card>

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
    </div>
  );
}