import Link from "next/link";
import { ArrowRightIcon, CalendarDaysIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { LinkButton, Button } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import {
  DASHBOARD_CARD_META_CLASS,
  DASHBOARD_CARD_TITLE_CLASS,
  DASHBOARD_RECORD_AMOUNT_CLASS,
} from "@/lib/dashboard-typography";
import { cn } from "@/lib/utils";

type DashboardProductCardProps = {
  name: string;
  slug: string;
  orderNumber: string;
  purchasedOn: string;
  tierName?: string;
  fulfillmentStatus: string;
};

function fulfillmentTone(status: string) {
  const state = status.toLowerCase();
  if (state.includes("delivered") || state.includes("complete")) {
    return "border-primary/35 bg-primary/12 text-primary";
  }
  return "border-warning/40 bg-warning/12 text-warning";
}

function fulfillmentLabel(status: string) {
  const state = status.toLowerCase();
  if (state.includes("delivered") || state.includes("complete")) {
    return "Completed";
  }
  return "In progress";
}

export function DashboardProductCard({
  name,
  slug,
  orderNumber,
  purchasedOn,
  tierName,
  fulfillmentStatus,
}: DashboardProductCardProps) {
  const initials = name.slice(0, 2).toUpperCase();

  return (
    <Card className="dashboard-panel-surface rounded-sm border-border/65 p-0" hoverable={false}>
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-stretch">
        <div className="dashboard-product-card__media" aria-hidden>
          <span className="text-sm font-semibold text-text">{initials}</span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <span
            className={cn(
              "inline-flex w-fit rounded-full border px-2.5 py-0.5 text-xs font-semibold",
              fulfillmentTone(fulfillmentStatus),
            )}
          >
            {fulfillmentLabel(fulfillmentStatus)}
          </span>

          <h3 className={cn(DASHBOARD_CARD_TITLE_CLASS, "mt-2")}>{name}</h3>
          <p className={cn(DASHBOARD_CARD_META_CLASS, "mt-0.5 capitalize")}>{slug.replaceAll("-", " ")}</p>

          <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            <div className="min-w-0">
              <dt className="text-xs uppercase tracking-wide text-text-muted">Order</dt>
              <dd className="truncate font-medium text-text">{orderNumber}</dd>
            </div>
            <div className="min-w-0">
              <dt className="text-xs uppercase tracking-wide text-text-muted">Purchased</dt>
              <dd className="text-text">{purchasedOn}</dd>
            </div>
            {tierName ? (
              <div className="min-w-0 sm:col-span-2">
                <dt className="text-xs uppercase tracking-wide text-text-muted">Tier</dt>
                <dd className="truncate text-text">{tierName}</dd>
              </div>
            ) : null}
          </dl>

          <LinkButton
            href="/dashboard/orders"
            variant="outline"
            size="sm"
            fullWidth
            className="mt-4 justify-between sm:mt-auto sm:w-fit sm:min-w-40"
          >
            View order
            <ArrowRightIcon className="size-4" />
          </LinkButton>
        </div>
      </div>
    </Card>
  );
}

type DashboardOrderCardProps = {
  href: string;
  orderNumber: string;
  productName: string;
  productMeta: string;
  paymentStatus: string;
  paymentDone: boolean;
  fulfillmentDone: boolean;
  createdAt: string;
  completedAt: string;
  amount: string;
  initials: string;
};

export function DashboardOrderCard({
  href,
  orderNumber,
  productName,
  productMeta,
  paymentStatus,
  paymentDone,
  fulfillmentDone,
  createdAt,
  completedAt,
  amount,
  initials,
}: DashboardOrderCardProps) {
  return (
    <Link href={href} className="dashboard-panel-surface dashboard-order-card">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <span className="dashboard-record-icon">{initials}</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-text">{orderNumber}</p>
            <p className={cn(DASHBOARD_CARD_TITLE_CLASS, "mt-0.5")}>{productName}</p>
            <p className={cn(DASHBOARD_CARD_META_CLASS, "mt-0.5 truncate capitalize")}>{productMeta}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border/55 pt-3 text-sm sm:grid-cols-4 lg:border-t-0 lg:pt-0 xl:gap-6">
          <div className="min-w-0">
            <p className="text-xs text-text-muted">Payment</p>
            <p className="mt-1 inline-flex items-center gap-1.5 font-medium text-text">
              <span
                className={cn("size-1.5 shrink-0 rounded-full", paymentDone ? "bg-success" : "bg-warning")}
                aria-hidden
              />
              <span className="truncate">{paymentDone ? "Paid" : paymentStatus}</span>
            </p>
          </div>
          <div className="min-w-0">
            <p className="text-xs text-text-muted">Fulfillment</p>
            <p className="mt-1 inline-flex items-center gap-1.5 font-medium text-text">
              <span
                className={cn("size-1.5 shrink-0 rounded-full", fulfillmentDone ? "bg-success" : "bg-warning")}
                aria-hidden
              />
              <span className="truncate">{fulfillmentDone ? "Completed" : "Pending"}</span>
            </p>
          </div>
          <div className="min-w-0">
            <p className="text-xs text-text-muted">Created</p>
            <p className="mt-1 truncate text-text">{createdAt}</p>
          </div>
          <div className="min-w-0">
            <p className="text-xs text-text-muted">Completed</p>
            <p className="mt-1 truncate text-text">{completedAt}</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-border/55 pt-3 lg:min-w-30 lg:flex-col lg:items-end lg:border-t-0 lg:pt-0">
          <p className={DASHBOARD_RECORD_AMOUNT_CLASS} title={amount}>
            {amount}
          </p>
          <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border/60 bg-surface/35 text-text-muted">
            <ChevronRightIcon className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

type DashboardAppointmentCardProps = {
  serviceName: string;
  dateLabel: string;
  timeLabel: string;
  status: string;
  statusTone: string;
  statusHint: string;
  canModify: boolean;
  onReschedule: () => void;
};

export function DashboardAppointmentCard({
  serviceName,
  dateLabel,
  timeLabel,
  status,
  statusTone,
  statusHint,
  canModify,
  onReschedule,
}: DashboardAppointmentCardProps) {
  return (
    <div className="dashboard-panel-surface rounded-sm border border-border/65 px-4 py-3.5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <span className="dashboard-record-icon text-primary">
            <CalendarDaysIcon className="size-5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className={DASHBOARD_CARD_TITLE_CLASS}>{serviceName}</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-muted">
              <span>{dateLabel}</span>
              <span>{timeLabel}</span>
            </div>
            <p className="mt-1 text-xs text-text-muted">Type: Inquiry</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/55 pt-3 lg:justify-end lg:border-t-0 lg:pt-0">
          <div className="min-w-0">
            <span className={cn("inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold", statusTone)}>
              {status}
            </span>
            <p className="mt-1.5 text-xs text-text-muted sm:text-sm">{statusHint}</p>
          </div>

          <div className="flex items-center gap-2">
            {canModify ? (
              <Button type="button" variant="outline" size="sm" onClick={onReschedule}>
                Reschedule
              </Button>
            ) : (
              <Button type="button" variant="outline" size="sm">
                View details
              </Button>
            )}
            <span className="inline-flex size-9 items-center justify-center rounded-full border border-border/60 text-text-muted">
              <ChevronRightIcon className="size-4" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
