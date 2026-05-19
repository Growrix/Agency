-- Supabase bootstrap schema for Agency app-state persistence.
-- Run this in the Supabase SQL editor before enabling SUPABASE_* env variables.

create table if not exists public.app_state (
  id text primary key,
  payload jsonb not null,
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists app_state_updated_at_idx on public.app_state (updated_at desc);

-- The server uses the service-role key for writes/reads in this table.
alter table public.app_state disable row level security;