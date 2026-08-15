-- Move SECURITY DEFINER helpers out of the exposed public schema.

create schema if not exists private;

create or replace function private.is_org_member(target_org_id uuid)
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

create or replace function private.is_org_admin(target_org_id uuid)
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

create or replace function private.handle_new_user()
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
  for each row execute procedure private.handle_new_user();

drop policy if exists "organizations_select_member" on public.organizations;
drop policy if exists "organizations_update_admin" on public.organizations;
drop policy if exists "memberships_select_member" on public.memberships;
drop policy if exists "memberships_insert_admin" on public.memberships;
drop policy if exists "memberships_update_admin" on public.memberships;
drop policy if exists "memberships_delete_admin" on public.memberships;
drop policy if exists "projects_select_member" on public.projects;
drop policy if exists "projects_insert_member" on public.projects;
drop policy if exists "projects_update_member" on public.projects;
drop policy if exists "projects_delete_admin" on public.projects;

create policy "organizations_select_member" on public.organizations
  for select using (private.is_org_member(id) or owner_id = auth.uid());
create policy "organizations_update_admin" on public.organizations
  for update using (private.is_org_admin(id) or owner_id = auth.uid());

create policy "memberships_select_member" on public.memberships
  for select using (user_id = auth.uid() or private.is_org_member(organization_id));
create policy "memberships_insert_admin" on public.memberships
  for insert with check (private.is_org_admin(organization_id) or exists (
    select 1 from public.organizations o where o.id = organization_id and o.owner_id = auth.uid()
  ));
create policy "memberships_update_admin" on public.memberships
  for update using (private.is_org_admin(organization_id));
create policy "memberships_delete_admin" on public.memberships
  for delete using (private.is_org_admin(organization_id));

create policy "projects_select_member" on public.projects
  for select using (private.is_org_member(organization_id));
create policy "projects_insert_member" on public.projects
  for insert with check (private.is_org_member(organization_id));
create policy "projects_update_member" on public.projects
  for update using (private.is_org_member(organization_id));
create policy "projects_delete_admin" on public.projects
  for delete using (private.is_org_admin(organization_id));

drop function if exists public.handle_new_user();
drop function if exists public.is_org_member(uuid);
drop function if exists public.is_org_admin(uuid);

revoke all on schema private from public;
grant usage on schema private to authenticated;
grant execute on function private.is_org_member(uuid) to authenticated;
grant execute on function private.is_org_admin(uuid) to authenticated;
revoke execute on function private.handle_new_user() from public, anon, authenticated;
