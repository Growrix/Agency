export type AdminNavHref =
  | "/admin"
  | "/admin/activity"
  | "/admin/catalog"
  | "/admin/pipeline"
  | "/admin/orders"
  | "/admin/submissions"
  | "/admin/intakes"
  | "/admin/projects"
  | "/admin/users"
  | "/admin/coupons"
  | "/admin/reviews"
  | "/admin/reports"
  | "/admin/email-templates"
  | "/admin/email-log";

export type AdminNavItemMeta = {
  href: AdminNavHref;
  label: string;
  icon: AdminNavIconKey;
};

export type AdminNavIconKey =
  | "overview"
  | "activity"
  | "catalog"
  | "pipeline"
  | "orders"
  | "submissions"
  | "intakes"
  | "projects"
  | "users"
  | "coupons"
  | "reviews"
  | "reports"
  | "emailTemplates"
  | "emailLog";

export const ADMIN_NAV_ITEMS: AdminNavItemMeta[] = [
  { href: "/admin", label: "Overview", icon: "overview" },
  { href: "/admin/activity", label: "Activity", icon: "activity" },
  { href: "/admin/catalog", label: "Catalog", icon: "catalog" },
  { href: "/admin/pipeline", label: "Pipeline", icon: "pipeline" },
  { href: "/admin/orders", label: "Orders", icon: "orders" },
  { href: "/admin/submissions", label: "Submissions", icon: "submissions" },
  { href: "/admin/intakes", label: "Intakes", icon: "intakes" },
  { href: "/admin/projects", label: "Projects", icon: "projects" },
  { href: "/admin/users", label: "Users", icon: "users" },
  { href: "/admin/coupons", label: "Coupons", icon: "coupons" },
  { href: "/admin/reviews", label: "Reviews", icon: "reviews" },
  { href: "/admin/reports", label: "Reports", icon: "reports" },
  { href: "/admin/email-templates", label: "Email templates", icon: "emailTemplates" },
  { href: "/admin/email-log", label: "Email log", icon: "emailLog" },
];

type AdminSectionMeta = {
  match: (pathname: string) => boolean;
  title: string;
  eyebrow?: string;
  description?: string;
};

export type ResolvedAdminSectionMeta = Pick<AdminSectionMeta, "title" | "eyebrow" | "description">;

const ADMIN_SECTION_META: AdminSectionMeta[] = [
  {
    match: (pathname) => pathname === "/admin",
    title: "Operational Snapshot",
    eyebrow: "Overview",
    description: "Real-time volume and health of customer-facing touchpoints.",
  },
  {
    match: (pathname) => pathname.startsWith("/admin/activity"),
    title: "Activity Stream",
    eyebrow: "Activity",
    description: "Recent analytics and audit events across the platform.",
  },
  {
    match: (pathname) => pathname.startsWith("/admin/catalog"),
    title: "Catalog Studio",
    eyebrow: "Catalog",
    description: "Manage services, products, and portfolio records in one workspace.",
  },
  {
    match: (pathname) => pathname.startsWith("/admin/pipeline"),
    title: "Pipeline Monitor",
    eyebrow: "Pipeline",
    description: "Latest inquiries, appointments, and order movement.",
  },
  {
    match: (pathname) => pathname.startsWith("/admin/orders"),
    title: "Orders",
    eyebrow: "Admin",
    description: "Track all orders, search and filter quickly, mark fulfillment state, and capture internal notes.",
  },
  {
    match: (pathname) => pathname === "/admin/submissions",
    title: "Submissions Inbox",
    eyebrow: "Operations",
    description: "Unified queue across contact, booking, service request, order, and newsletter records.",
  },
  {
    match: (pathname) => pathname.startsWith("/admin/submissions/"),
    title: "Submission detail",
    eyebrow: "Operations",
  },
  {
    match: (pathname) => pathname === "/admin/intakes",
    title: "Client intakes",
    eyebrow: "Operations",
    description: "Free demo requests and project brief submissions.",
  },
  {
    match: (pathname) => pathname.startsWith("/admin/intakes/"),
    title: "Intake detail",
    eyebrow: "Operations",
  },
  {
    match: (pathname) => pathname === "/admin/projects",
    title: "Client projects",
    eyebrow: "Operations",
    description: "Ongoing website builds and collaborative workspaces.",
  },
  {
    match: (pathname) => pathname.startsWith("/admin/projects/"),
    title: "Project workspace",
    eyebrow: "Operations",
  },
  {
    match: (pathname) => pathname === "/admin/users",
    title: "Users",
    eyebrow: "Admin",
    description:
      "Role assignment + sign-up completion state. Revoking admission forces the user back through /complete-account on their next visit.",
  },
  {
    match: (pathname) => pathname.startsWith("/admin/users/"),
    title: "User detail",
    eyebrow: "Admin",
  },
  {
    match: (pathname) => pathname.startsWith("/admin/coupons"),
    title: "Coupons",
    eyebrow: "Admin",
    description:
      "Percent-only discount codes. Codes are matched case-insensitively at checkout. Deactivating a coupon prevents new use immediately without deleting the record.",
  },
  {
    match: (pathname) => pathname.startsWith("/admin/reviews"),
    title: "Moderation queue",
    eyebrow: "Reviews",
    description: "Approve or reject verified-purchase reviews before they appear on product pages.",
  },
  {
    match: (pathname) => pathname.startsWith("/admin/reports"),
    title: "Business intelligence",
    eyebrow: "Reports",
    description: "Revenue, best-sellers, and coupon usage aggregated from paid orders.",
  },
  {
    match: (pathname) => pathname.startsWith("/admin/email-templates"),
    title: "Order email templates",
    eyebrow: "Admin",
    description:
      "Customize the team notification sent for every new order. Placeholders in double curly braces are replaced automatically.",
  },
  {
    match: (pathname) => pathname.startsWith("/admin/email-log"),
    title: "Email log",
    eyebrow: "Admin",
    description:
      "Audit trail of outbound team notifications routed through Resend. Surfaces delivered, failed, and configuration-skipped attempts.",
  },
];

export function resolveAdminSectionMeta(pathname: string): ResolvedAdminSectionMeta {
  return (
    ADMIN_SECTION_META.find((entry) => entry.match(pathname)) ?? {
      title: "Admin Dashboard",
      eyebrow: "Admin",
    }
  );
}

export function resolveAdminHeaderTitle(pathname: string) {
  return resolveAdminSectionMeta(pathname).title;
}
