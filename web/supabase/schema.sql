-- Supabase bootstrap schema for Agency app-state persistence.
-- Run this in the Supabase SQL editor before enabling SUPABASE_* env variables.

create table if not exists public.app_state (
  id text primary key,
  payload jsonb not null,
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists app_state_updated_at_idx on public.app_state (updated_at desc);

-- Security hardening:
-- - Keep app_state server-only
-- - Enable RLS to satisfy Supabase advisor checks
-- - Explicitly block anon/authenticated client roles
-- - Allow backend access through service_role key
alter table public.app_state enable row level security;

revoke all on table public.app_state from anon;
revoke all on table public.app_state from authenticated;
grant all on table public.app_state to service_role;

drop policy if exists app_state_client_block_all on public.app_state;
create policy app_state_client_block_all
on public.app_state
for all
to anon, authenticated
using (false)
with check (false);

-- =====================================================================
-- Normalized product-led transactional schema (Phase P9, T048)
-- =====================================================================
-- All tables below are server-mediated. anon/authenticated roles are
-- explicitly blocked. service_role (used by Next.js server) holds
-- full access. Customer reads happen via API handlers that enforce
-- ownership.
-- ---------------------------------------------------------------------

-- Helper trigger for keeping updated_at fresh
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

-- ---------------------------------------------------------------------
-- products
-- ---------------------------------------------------------------------
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text,
  type text,
  industry text,
  active boolean not null default true,
  sanity_document_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);
create index if not exists products_slug_idx on public.products (slug);
create index if not exists products_active_idx on public.products (active);

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- product_variants
-- ---------------------------------------------------------------------
create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  slug text not null,
  tier_name text not null check (tier_name in ('Standard','Premium','Done-For-You')),
  title text not null,
  price_cents integer not null default 0,
  currency text not null default 'USD',
  fulfillment_type text not null check (fulfillment_type in ('digital_download','hybrid_support','done_for_you_service')),
  includes jsonb not null default '[]'::jsonb,
  comparison_points jsonb not null default '[]'::jsonb,
  recommended boolean not null default false,
  active boolean not null default true,
  payment_provider text,
  payment_provider_price_id text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (product_id, slug)
);
create index if not exists product_variants_product_idx on public.product_variants (product_id);

drop trigger if exists product_variants_set_updated_at on public.product_variants;
create trigger product_variants_set_updated_at
before update on public.product_variants
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- orders
-- ---------------------------------------------------------------------
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_email text not null,
  customer_name text not null,
  customer_phone text,
  user_id uuid,
  payment_status text not null default 'pending' check (payment_status in ('pending','succeeded','failed','refunded')),
  fulfillment_status text not null default 'pending' check (fulfillment_status in ('pending','intake_pending','fulfilling','qa_review','delivered','archived')),
  subtotal_cents integer not null default 0,
  tax_cents integer not null default 0,
  discount_cents integer not null default 0,
  total_cents integer not null default 0,
  currency text not null default 'USD',
  stripe_checkout_session_id text,
  stripe_payment_intent_id text,
  selected_variant_slug text,
  selected_tier_name text,
  selected_fulfillment_type text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  completed_at timestamptz,
  refunded_at timestamptz
);
create index if not exists orders_customer_email_idx on public.orders (customer_email);
create index if not exists orders_payment_status_idx on public.orders (payment_status);
create index if not exists orders_user_id_idx on public.orders (user_id);

drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at
before update on public.orders
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- order_items
-- ---------------------------------------------------------------------
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_slug text not null,
  product_name text not null,
  product_variant_slug text,
  product_tier_name text,
  fulfillment_type text,
  quantity integer not null default 1,
  unit_price_cents integer not null default 0,
  total_cents integer not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);
create index if not exists order_items_order_idx on public.order_items (order_id);

-- ---------------------------------------------------------------------
-- downloads
-- ---------------------------------------------------------------------
create table if not exists public.downloads (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  user_email text not null,
  user_id uuid,
  product_slug text not null,
  variant_slug text,
  asset_path text not null,
  file_label text,
  max_downloads integer not null default 5,
  download_count integer not null default 0,
  status text not null default 'issued' check (status in ('issued','expired','revoked')),
  expires_at timestamptz,
  last_downloaded_at timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);
create index if not exists downloads_user_email_idx on public.downloads (user_email);
create index if not exists downloads_order_idx on public.downloads (order_id);

-- ---------------------------------------------------------------------
-- licenses
-- ---------------------------------------------------------------------
create table if not exists public.licenses (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  user_email text not null,
  user_id uuid,
  product_slug text not null,
  variant_slug text,
  license_key text not null unique,
  license_type text not null default 'single_site' check (license_type in ('single_site','team','agency')),
  status text not null default 'active' check (status in ('active','revoked','expired')),
  notes text,
  issued_at timestamptz not null default timezone('utc', now()),
  expires_at timestamptz
);
create index if not exists licenses_user_email_idx on public.licenses (user_email);
create index if not exists licenses_order_idx on public.licenses (order_id);

-- ---------------------------------------------------------------------
-- leads
-- ---------------------------------------------------------------------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  phone text,
  company text,
  status text not null default 'new' check (status in ('new','engaged','qualified','customer','lost')),
  temperature text not null default 'cold' check (temperature in ('cold','warm','hot','customer')),
  score integer not null default 0,
  primary_source text not null,
  last_source text not null,
  last_route text,
  last_event_type text,
  notes text,
  user_id uuid,
  assigned_to_user_id uuid,
  related_inquiry_id uuid,
  related_appointment_id uuid,
  related_order_ids jsonb not null default '[]'::jsonb,
  related_service_request_ids jsonb not null default '[]'::jsonb,
  conversation_ids jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);
create index if not exists leads_temperature_idx on public.leads (temperature);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_user_id_idx on public.leads (user_id);

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
before update on public.leads
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- lead_events
-- ---------------------------------------------------------------------
create table if not exists public.lead_events (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  event_type text not null,
  score_delta integer not null default 0,
  route text,
  source text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);
create index if not exists lead_events_lead_idx on public.lead_events (lead_id, created_at desc);
create index if not exists lead_events_event_type_idx on public.lead_events (event_type);

-- ---------------------------------------------------------------------
-- service_requests
-- ---------------------------------------------------------------------
create table if not exists public.service_requests (
  id uuid primary key default gen_random_uuid(),
  request_number text not null unique,
  lead_id uuid references public.leads(id) on delete set null,
  customer_email text not null,
  customer_name text not null,
  customer_phone text,
  company text,
  product_slug text,
  product_name text,
  variant_slug text,
  variant_tier_name text,
  budget text,
  timeline text,
  brief text not null,
  status text not null default 'new' check (status in ('new','scoping','in_progress','qa_review','delivered','cancelled')),
  assigned_to_user_id uuid,
  notes text,
  resolution_notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  completed_at timestamptz
);
create index if not exists service_requests_status_idx on public.service_requests (status);
create index if not exists service_requests_customer_email_idx on public.service_requests (customer_email);

drop trigger if exists service_requests_set_updated_at on public.service_requests;
create trigger service_requests_set_updated_at
before update on public.service_requests
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- conversations + messages (normalized successor to app_state.conversations)
-- ---------------------------------------------------------------------
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  source text not null check (source in ('ai_concierge','live_chat')),
  status text not null default 'active' check (status in ('active','qualified','closed')),
  page_path text not null,
  lead_id uuid references public.leads(id) on delete set null,
  lead_email text,
  user_id uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);
create index if not exists conversations_lead_id_idx on public.conversations (lead_id);

drop trigger if exists conversations_set_updated_at on public.conversations;
create trigger conversations_set_updated_at
before update on public.conversations
for each row execute function public.set_updated_at();

create table if not exists public.conversation_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  role text not null check (role in ('user','assistant','system')),
  content text not null,
  created_at timestamptz not null default timezone('utc', now())
);
create index if not exists conversation_messages_conversation_idx on public.conversation_messages (conversation_id, created_at);

-- ---------------------------------------------------------------------
-- notification_log
-- ---------------------------------------------------------------------
create table if not exists public.notification_log (
  id uuid primary key default gen_random_uuid(),
  channel text not null check (channel in ('lark','resend','console')),
  kind text not null,
  status text not null check (status in ('pending','sent','failed','skipped')),
  title text not null,
  payload jsonb not null default '{}'::jsonb,
  related_lead_id uuid references public.leads(id) on delete set null,
  related_order_id uuid references public.orders(id) on delete set null,
  related_service_request_id uuid references public.service_requests(id) on delete set null,
  error_message text,
  attempt_count integer not null default 0,
  delivered_at timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);
create index if not exists notification_log_kind_idx on public.notification_log (kind, created_at desc);
create index if not exists notification_log_status_idx on public.notification_log (status);

-- =====================================================================
-- RLS policies for the normalized tables
-- =====================================================================
-- Every new table: enable RLS, revoke from anon/authenticated, grant
-- to service_role, and block all client-direct access. API handlers
-- enforce per-customer ownership.

do $$
declare
  tbl text;
begin
  foreach tbl in array array[
    'products',
    'product_variants',
    'orders',
    'order_items',
    'downloads',
    'licenses',
    'leads',
    'lead_events',
    'service_requests',
    'conversations',
    'conversation_messages',
    'notification_log'
  ] loop
    execute format('alter table public.%I enable row level security', tbl);
    execute format('revoke all on table public.%I from anon', tbl);
    execute format('revoke all on table public.%I from authenticated', tbl);
    execute format('grant all on table public.%I to service_role', tbl);
    execute format('drop policy if exists %I_client_block_all on public.%I', tbl, tbl);
    execute format(
      'create policy %I_client_block_all on public.%I for all to anon, authenticated using (false) with check (false)',
      tbl,
      tbl
    );
  end loop;
end;
$$;