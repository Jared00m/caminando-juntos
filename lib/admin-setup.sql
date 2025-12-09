-- Run this in your Supabase SQL Editor to set up Admin permissions

-- 1. Add role column to user_profiles (safe to re-run)
alter table user_profiles add column if not exists role text default 'user' check (role in ('user', 'admin'));

-- 2. Drop existing policies to avoid "already exists" errors and recursion
drop policy if exists "Admins can view all profiles" on user_profiles;
drop policy if exists "Admins can update profiles" on user_profiles;
drop policy if exists "Admins can manage cities" on cities;
drop policy if exists "Admins can manage regions" on regions;
drop policy if exists "Admins can manage events" on events;
drop policy if exists "Admins can manage contacts" on contacts;
drop policy if exists "Admins can manage feature flags" on feature_flags;

-- 3. Create a secure function to check admin status without recursion
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1
    from user_profiles
    where id = auth.uid()
    and role = 'admin'
  );
end;
$$ language plpgsql security definer;

-- 4. Create policies using the secure function

-- Cities
create policy "Admins can manage cities" on cities
  for all using ( is_admin() );

-- Regions
create policy "Admins can manage regions" on regions
  for all using ( is_admin() );

-- Events
create policy "Admins can manage events" on events
  for all using ( is_admin() );

-- Contacts
create policy "Admins can manage contacts" on contacts
  for all using ( is_admin() );

-- Feature Flags
create policy "Admins can manage feature flags" on feature_flags
  for all using ( is_admin() );

-- User Profiles (Admins can view all and update roles)
create policy "Admins can view all profiles" on user_profiles
  for select using ( is_admin() );

create policy "Admins can update profiles" on user_profiles
  for update using ( is_admin() );

-- 5. INSTRUCTION:
-- After running this, you must manually promote your user to admin:
-- update user_profiles set role = 'admin' where email = 'your-email@example.com';
