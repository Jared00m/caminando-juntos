-- Database schema for dios-habla application

-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Regions table for countries
create table if not exists regions(
  country_code text primary key,
  country_name text not null
);

-- Ensure unique constraint exists for ON CONFLICT (in case table existed previously without PK)
do $$
begin
  if not exists (
    select 1
    from pg_constraint c
    join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where n.nspname = 'public'
      and t.relname = 'regions'
      and c.contype in ('p','u')
      and pg_get_constraintdef(c.oid) like '%(country_code)%'
  ) then
    -- If duplicates exist from a previous non-constrained table, keep one row per country_code
    if exists (
      select 1 from regions group by country_code having count(*) > 1
    ) then
      delete from regions r
      using (
        select ctid,
               row_number() over (partition by country_code order by country_name asc) as rn
        from regions
      ) d
      where r.ctid = d.ctid
        and d.rn > 1;
    end if;

    alter table regions add constraint regions_country_code_key unique (country_code);
  end if;
end $$;

-- Cities table
create table if not exists cities(
  id bigserial primary key,
  country_code text references regions(country_code) on delete cascade,
  city_name text not null,
  created_at timestamptz default now()
);

-- Events table for local events
create table if not exists events(
  id bigserial primary key,
  title text not null,
  description text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  country_code text references regions(country_code),
  city_id bigint references cities(id),
  venue text,
  url text,
  published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Contacts table for local help
create table if not exists contacts(
  id bigserial primary key,
  country_code text references regions(country_code),
  city_id bigint references cities(id),
  channel_type text check (channel_type in ('email','whatsapp','phone','chatwoot_team')),
  value text not null,
  name text,
  description text,
  published boolean default true,
  created_at timestamptz default now()
);

-- Churches table for local churches
create table if not exists churches(
  id bigserial primary key,
  country_code text references regions(country_code) on delete cascade,
  city_id bigint references cities(id) on delete set null,
  name text not null,
  contact_phone text,
  contact_phone_type text check (contact_phone_type in ('whatsapp','phone')),
  contact_email text,
  website_url text,
  address text,
  published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Add/rename church address column if needed (migration)
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_name = 'churches' and column_name = 'directions'
  ) then
    alter table churches rename column directions to address;
  elsif not exists (
    select 1 from information_schema.columns
    where table_name = 'churches' and column_name = 'address'
  ) then
    alter table churches add column address text;
  end if;
end $$;

-- Study progress tracking (supports both anonymous and authenticated users)
create table if not exists study_progress(
  id bigserial primary key,
  anon_id uuid,
  study_id text not null,
  lesson_id text not null,
  step int not null,
  completed_at timestamptz default now()
);

-- Add user_id column if it doesn't exist (migration)
do $$ 
begin
  if not exists (select 1 from information_schema.columns 
                 where table_name = 'study_progress' and column_name = 'user_id') then
    alter table study_progress add column user_id uuid references auth.users(id) on delete cascade;
  end if;
end $$;

-- Add constraints if they don't exist
do $$
begin
  if not exists (select 1 from information_schema.table_constraints 
                 where constraint_name = 'user_or_anon_check' and table_name = 'study_progress') then
    alter table study_progress add constraint user_or_anon_check 
      check (user_id is not null or anon_id is not null);
  end if;
  
  if not exists (select 1 from information_schema.table_constraints 
                 where constraint_name = 'study_progress_user_id_study_id_lesson_id_step_key' 
                 and table_name = 'study_progress') then
    alter table study_progress add constraint study_progress_user_id_study_id_lesson_id_step_key
      unique(user_id, study_id, lesson_id, step);
  end if;
  
  if not exists (select 1 from information_schema.table_constraints 
                 where constraint_name = 'study_progress_anon_id_study_id_lesson_id_step_key' 
                 and table_name = 'study_progress') then
    alter table study_progress add constraint study_progress_anon_id_study_id_lesson_id_step_key
      unique(anon_id, study_id, lesson_id, step);
  end if;
end $$;

-- Study notes for authenticated users
create table if not exists study_notes(
  id bigserial primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  study_id text not null,
  lesson_id text not null,
  step int,
  note text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Study questions for authenticated users
create table if not exists study_questions(
  id bigserial primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  study_id text not null,
  lesson_id text not null,
  step int,
  question text not null,
  answered boolean default false,
  missionary_response text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- User profiles
create table if not exists user_profiles(
  id uuid references auth.users(id) on delete cascade primary key,
  display_name text,
  email text,
  country_code text references regions(country_code),
  city_id bigint references cities(id),
  missionary_id uuid references auth.users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Add email column if it doesn't exist (migration)
do $$ 
begin
  if not exists (select 1 from information_schema.columns 
                 where table_name = 'user_profiles' and column_name = 'email') then
    alter table user_profiles add column email text;
  end if;
end $$;

-- Feature flags
create table if not exists feature_flags(
  key text primary key,
  enabled boolean not null default false,
  country_code text references regions(country_code),
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Ensure unique constraint exists for ON CONFLICT (in case table existed previously without PK)
do $$
begin
  if not exists (
    select 1
    from pg_constraint c
    join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where n.nspname = 'public'
      and t.relname = 'feature_flags'
      and c.contype in ('p','u')
      and pg_get_constraintdef(c.oid) like '%(key)%'
  ) then
    -- If duplicates exist from a previous non-constrained table, keep one row per key.
    -- Preference order: enabled=true, latest updated_at/created_at.
    if exists (
      select 1 from feature_flags group by key having count(*) > 1
    ) then
      delete from feature_flags f
      using (
        select ctid,
               row_number() over (
                 partition by key
                 order by enabled desc,
                          updated_at desc nulls last,
                          created_at desc nulls last
               ) as rn
        from feature_flags
      ) d
      where f.ctid = d.ctid
        and d.rn > 1;
    end if;

    alter table feature_flags add constraint feature_flags_key_key unique (key);
  end if;
end $$;

-- Insert default feature flags
insert into feature_flags (key, enabled, notes) values
  ('reminders', false, 'Study reminders feature'),
  ('buddy', false, 'Study buddy matching feature'),
  ('events', true, 'Local events display'),
  ('help', true, 'Local help contacts display')
on conflict (key) do nothing;

-- Insert some sample regions
insert into regions (country_code, country_name) values
  ('ES', 'España'),
  ('MX', 'México'),
  ('AR', 'Argentina'),
  ('CO', 'Colombia'),
  ('PE', 'Perú'),
  ('CL', 'Chile'),
  ('VE', 'Venezuela'),
  ('EC', 'Ecuador'),
  ('BO', 'Bolivia'),
  ('PY', 'Paraguay'),
  ('UY', 'Uruguay'),
  ('CR', 'Costa Rica'),
  ('PA', 'Panamá'),
  ('GT', 'Guatemala'),
  ('HN', 'Honduras'),
  ('SV', 'El Salvador'),
  ('NI', 'Nicaragua'),
  ('DO', 'República Dominicana'),
  ('CU', 'Cuba'),
  ('PR', 'Puerto Rico'),
  ('US', 'Estados Unidos')
on conflict (country_code) do nothing;

-- Create indexes for better performance
create index if not exists idx_events_country_published on events(country_code, published);
create index if not exists idx_events_city_published on events(city_id, published);
create index if not exists idx_events_starts_at on events(starts_at);
create index if not exists idx_contacts_country_published on contacts(country_code, published);
create index if not exists idx_contacts_city_published on contacts(city_id, published);
create index if not exists idx_churches_country_published on churches(country_code, published);
create index if not exists idx_churches_city_published on churches(city_id, published);
create index if not exists idx_study_progress_user_id on study_progress(user_id);
create index if not exists idx_study_progress_anon_id on study_progress(anon_id);
create index if not exists idx_study_progress_study_lesson on study_progress(study_id, lesson_id);
create index if not exists idx_study_notes_user_id on study_notes(user_id);
create index if not exists idx_study_questions_user_id on study_questions(user_id);
create index if not exists idx_study_questions_answered on study_questions(answered);
create index if not exists idx_feature_flags_country on feature_flags(country_code);

-- Row Level Security (RLS) policies
alter table regions enable row level security;
alter table cities enable row level security;
alter table events enable row level security;
alter table contacts enable row level security;
alter table churches enable row level security;
alter table study_progress enable row level security;
alter table study_notes enable row level security;
alter table study_questions enable row level security;
alter table user_profiles enable row level security;
alter table feature_flags enable row level security;

-- Allow public read access to published content
drop policy if exists "Public regions access" on regions;
create policy "Public regions access" on regions for select using (true);

drop policy if exists "Public cities access" on cities;
create policy "Public cities access" on cities for select using (true);

drop policy if exists "Public events access" on events;
create policy "Public events access" on events for select using (published = true);

drop policy if exists "Public contacts access" on contacts;
create policy "Public contacts access" on contacts for select using (published = true);

drop policy if exists "Public churches access" on churches;
create policy "Public churches access" on churches for select using (published = true);

drop policy if exists "Public feature flags access" on feature_flags;
create policy "Public feature flags access" on feature_flags for select using (true);

-- Study progress policies
drop policy if exists "Users can manage their own progress" on study_progress;
drop policy if exists "Users can manage their study progress" on study_progress;
create policy "Users can manage their own progress" on study_progress 
  for all using (
    auth.uid() = user_id or 
    (user_id is null and anon_id is not null)
  );

-- Study notes policies
drop policy if exists "Users can manage their own notes" on study_notes;
create policy "Users can manage their own notes" on study_notes 
  for all using (auth.uid() = user_id);

-- Study questions policies
drop policy if exists "Users can manage their own questions" on study_questions;
create policy "Users can manage their own questions" on study_questions 
  for all using (auth.uid() = user_id);

drop policy if exists "Missionaries can view assigned user questions" on study_questions;
create policy "Missionaries can view assigned user questions" on study_questions
  for select using (
    exists (
      select 1 from user_profiles
      where id = study_questions.user_id
      and missionary_id = auth.uid()
    )
  );

drop policy if exists "Missionaries can update assigned user questions" on study_questions;
create policy "Missionaries can update assigned user questions" on study_questions
  for update using (
    exists (
      select 1 from user_profiles
      where id = study_questions.user_id
      and missionary_id = auth.uid()
    )
  );

-- User profiles policies
drop policy if exists "Users can view their own profile" on user_profiles;
create policy "Users can view their own profile" on user_profiles
  for select using (auth.uid() = id);

drop policy if exists "Users can update their own profile" on user_profiles;
create policy "Users can update their own profile" on user_profiles
  for update using (auth.uid() = id);

drop policy if exists "Users can insert their own profile" on user_profiles;
create policy "Users can insert their own profile" on user_profiles
  for insert with check (auth.uid() = id);

drop policy if exists "Missionaries can view assigned user profiles" on user_profiles;
create policy "Missionaries can view assigned user profiles" on user_profiles
  for select using (missionary_id = auth.uid());

-- Update function for updated_at timestamps
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Add triggers for updated_at
drop trigger if exists update_events_updated_at on events;
create trigger update_events_updated_at before update on events
  for each row execute procedure update_updated_at_column();

drop trigger if exists update_feature_flags_updated_at on feature_flags;
create trigger update_feature_flags_updated_at before update on feature_flags
  for each row execute procedure update_updated_at_column();

drop trigger if exists update_study_notes_updated_at on study_notes;
create trigger update_study_notes_updated_at before update on study_notes
  for each row execute procedure update_updated_at_column();

drop trigger if exists update_study_questions_updated_at on study_questions;
create trigger update_study_questions_updated_at before update on study_questions
  for each row execute procedure update_updated_at_column();

drop trigger if exists update_user_profiles_updated_at on user_profiles;
create trigger update_user_profiles_updated_at before update on user_profiles
  for each row execute procedure update_updated_at_column();

drop trigger if exists update_churches_updated_at on churches;
create trigger update_churches_updated_at before update on churches
  for each row execute procedure update_updated_at_column();

-- Function to handle new user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_profiles (id, display_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to automatically create user profile on signup confirmation
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();