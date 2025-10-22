-- Database schema for dios-habla application

-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Regions table for countries
create table if not exists regions(
  country_code text primary key,
  country_name text not null
);

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

-- Study progress tracking (anonymous)
create table if not exists study_progress(
  id bigserial primary key,
  anon_id uuid not null,
  study_id text not null,
  lesson_id text not null,
  step int not null,
  completed_at timestamptz default now(),
  unique(anon_id, study_id, lesson_id, step)
);

-- Feature flags
create table if not exists feature_flags(
  key text primary key,
  enabled boolean not null default false,
  country_code text references regions(country_code),
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

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
create index if not exists idx_study_progress_anon_id on study_progress(anon_id);
create index if not exists idx_study_progress_study_lesson on study_progress(study_id, lesson_id);
create index if not exists idx_feature_flags_country on feature_flags(country_code);

-- Row Level Security (RLS) policies
alter table regions enable row level security;
alter table cities enable row level security;
alter table events enable row level security;
alter table contacts enable row level security;
alter table study_progress enable row level security;
alter table feature_flags enable row level security;

-- Allow public read access to published content
create policy "Public regions access" on regions for select using (true);
create policy "Public cities access" on cities for select using (true);
create policy "Public events access" on events for select using (published = true);
create policy "Public contacts access" on contacts for select using (published = true);
create policy "Public feature flags access" on feature_flags for select using (true);

-- Allow anonymous users to manage their own progress
create policy "Users can manage their study progress" on study_progress 
  for all using (true);

-- Update function for updated_at timestamps
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Add triggers for updated_at
create trigger update_events_updated_at before update on events
  for each row execute procedure update_updated_at_column();

create trigger update_feature_flags_updated_at before update on feature_flags
  for each row execute procedure update_updated_at_column();