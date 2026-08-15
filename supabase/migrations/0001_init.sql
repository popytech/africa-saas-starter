-- Africa SaaS Starter: tenancy and authorization baseline

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  owner_id uuid not null references auth.users(id) on delete restrict,
  plan text not null default 'free' check (plan in ('free','pro','business')),
  created_at timestamptz not null default now()
);

create table if not exists public.memberships (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('owner','admin','member')),
  created_at timestamptz not null default now(),
  unique (organization_id, user_id)
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  status text not null default 'active' check (status in ('active','archived')),
  created_at timestamptz not null default now()
);

create or replace function public.is_org_member(target_org_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.memberships
    where organization_id = target_org_id and user_id = auth.uid()
  );
$$;

create or replace function public.is_org_admin(target_org_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.memberships
    where organization_id = target_org_id
      and user_id = auth.uid()
      and role in ('owner','admin')
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.memberships enable row level security;
alter table public.projects enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using (id = auth.uid());
create policy "profiles_update_own" on public.profiles
  for update using (id = auth.uid()) with check (id = auth.uid());

create policy "organizations_select_member" on public.organizations
  for select using (public.is_org_member(id) or owner_id = auth.uid());
create policy "organizations_insert_owner" on public.organizations
  for insert with check (owner_id = auth.uid());
create policy "organizations_update_admin" on public.organizations
  for update using (public.is_org_admin(id) or owner_id = auth.uid());

create policy "memberships_select_member" on public.memberships
  for select using (user_id = auth.uid() or public.is_org_member(organization_id));
create policy "memberships_insert_admin" on public.memberships
  for insert with check (public.is_org_admin(organization_id) or exists (
    select 1 from public.organizations o where o.id = organization_id and o.owner_id = auth.uid()
  ));
create policy "memberships_update_admin" on public.memberships
  for update using (public.is_org_admin(organization_id));
create policy "memberships_delete_admin" on public.memberships
  for delete using (public.is_org_admin(organization_id));

create policy "projects_select_member" on public.projects
  for select using (public.is_org_member(organization_id));
create policy "projects_insert_member" on public.projects
  for insert with check (public.is_org_member(organization_id));
create policy "projects_update_member" on public.projects
  for update using (public.is_org_member(organization_id));
create policy "projects_delete_admin" on public.projects
  for delete using (public.is_org_admin(organization_id));
