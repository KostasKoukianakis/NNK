-- NNK Ναυτικό Νοσοκομείο Κρήτης
-- Initial schema for public site, patient portal, and staff tools.
-- Apply in the Supabase SQL editor or via the CLI after `supabase init`.

create extension if not exists "pgcrypto";

create schema if not exists private;

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------

do $$
begin
  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type public.user_role as enum ('patient', 'doctor', 'admin');
  end if;
  if not exists (select 1 from pg_type where typname = 'appointment_status') then
    create type public.appointment_status as enum (
      'pending',
      'confirmed',
      'cancelled',
      'completed'
    );
  end if;
  if not exists (select 1 from pg_type where typname = 'department_sector') then
    create type public.department_sector as enum (
      'surgical',
      'pathology',
      'laboratory',
      'dental',
      'emergency',
      'outpatient'
    );
  end if;
end $$;

-- ---------------------------------------------------------------------------
-- Core identity
-- public.users is a 1:1 projection of auth.users. Role lives here, never in
-- raw_user_meta_data (that claim is user-editable).
-- ---------------------------------------------------------------------------

create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  role public.user_role not null default 'patient',
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references public.users (id) on delete cascade,
  full_name text not null default '',
  amka text,
  phone text,
  dob date,
  rank_or_status text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_amka_format check (
    amka is null or amka ~ '^\d{11}$'
  )
);

create unique index if not exists profiles_amka_key
  on public.profiles (amka)
  where amka is not null;

-- ---------------------------------------------------------------------------
-- Public catalog
-- ---------------------------------------------------------------------------

create table if not exists public.departments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  location_floor text,
  slug text not null unique,
  sector public.department_sector not null default 'outpatient',
  phone text,
  visiting_notes text,
  is_bookable boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.doctors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users (id) on delete set null,
  department_id uuid not null references public.departments (id) on delete restrict,
  specialty text not null,
  bio text not null default '',
  full_name text not null,
  rank_title text,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists doctors_department_id_idx on public.doctors (department_id);
create index if not exists doctors_user_id_idx on public.doctors (user_id);

create table if not exists public.doctor_schedules (
  id uuid primary key default gen_random_uuid(),
  doctor_id uuid not null references public.doctors (id) on delete cascade,
  weekday smallint not null check (weekday between 0 and 6),
  start_time time not null,
  end_time time not null,
  slot_minutes smallint not null default 20,
  constraint doctor_schedules_window check (end_time > start_time)
);

create index if not exists doctor_schedules_doctor_id_idx on public.doctor_schedules (doctor_id);

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  published_at timestamptz,
  author_id uuid references public.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists announcements_author_id_idx on public.announcements (author_id);
create index if not exists announcements_published_at_idx
  on public.announcements (published_at desc)
  where published_at is not null;

create table if not exists public.guidelines (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  content text not null,
  category text not null default 'general',
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Clinical / portal
-- ---------------------------------------------------------------------------

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.users (id) on delete cascade,
  doctor_id uuid not null references public.doctors (id) on delete restrict,
  department_id uuid not null references public.departments (id) on delete restrict,
  appointment_date timestamptz not null,
  status public.appointment_status not null default 'pending',
  notes text,
  staff_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists appointments_patient_id_idx on public.appointments (patient_id);
create index if not exists appointments_doctor_id_idx on public.appointments (doctor_id);
create index if not exists appointments_department_id_idx on public.appointments (department_id);
create index if not exists appointments_date_idx on public.appointments (appointment_date);

create unique index if not exists appointments_doctor_slot_key
  on public.appointments (doctor_id, appointment_date)
  where status <> 'cancelled';

create table if not exists public.test_results (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.users (id) on delete cascade,
  title text not null,
  ordered_at timestamptz not null default now(),
  released_at timestamptz,
  storage_path text not null,
  mime_type text not null default 'application/pdf',
  created_at timestamptz not null default now()
);

create index if not exists test_results_patient_id_idx on public.test_results (patient_id);

-- ---------------------------------------------------------------------------
-- Private helpers (not exposed through the Data API)
-- ---------------------------------------------------------------------------

create or replace function private.current_user_role()
returns public.user_role
language sql
stable
security definer
set search_path = ''
as $$
  select u.role
  from public.users u
  where u.id = (select auth.uid())
$$;

create or replace function private.is_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(
    (select private.current_user_role() in ('admin', 'doctor')),
    false
  )
$$;

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce((select private.current_user_role() = 'admin'), false)
$$;

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  assigned_role public.user_role := 'patient';
begin
  if new.raw_app_meta_data ? 'role'
     and (new.raw_app_meta_data ->> 'role') in ('patient', 'doctor', 'admin') then
    assigned_role := (new.raw_app_meta_data ->> 'role')::public.user_role;
  end if;

  insert into public.users (id, role)
  values (new.id, assigned_role)
  on conflict (id) do nothing;

  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function private.handle_new_user();

revoke all on function private.current_user_role() from public;
revoke all on function private.is_staff() from public;
revoke all on function private.is_admin() from public;
revoke all on function private.handle_new_user() from public;

grant execute on function private.current_user_role() to authenticated;
grant execute on function private.is_staff() to authenticated;
grant execute on function private.is_admin() to authenticated;

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

alter table public.users enable row level security;
alter table public.profiles enable row level security;
alter table public.departments enable row level security;
alter table public.doctors enable row level security;
alter table public.doctor_schedules enable row level security;
alter table public.announcements enable row level security;
alter table public.guidelines enable row level security;
alter table public.appointments enable row level security;
alter table public.test_results enable row level security;

alter table public.users force row level security;
alter table public.profiles force row level security;
alter table public.appointments force row level security;
alter table public.test_results force row level security;

-- users
drop policy if exists users_select_self_or_staff on public.users;
create policy users_select_self_or_staff
  on public.users
  for select
  to authenticated
  using (
    id = (select auth.uid())
    or (select private.is_staff())
  );

drop policy if exists users_update_self on public.users;
create policy users_update_self
  on public.users
  for update
  to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()) and role = (select private.current_user_role()));

drop policy if exists users_admin_all on public.users;
create policy users_admin_all
  on public.users
  for all
  to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

-- profiles
drop policy if exists profiles_select_self_or_staff on public.profiles;
create policy profiles_select_self_or_staff
  on public.profiles
  for select
  to authenticated
  using (
    id = (select auth.uid())
    or (select private.is_staff())
  );

drop policy if exists profiles_update_self on public.profiles;
create policy profiles_update_self
  on public.profiles
  for update
  to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

drop policy if exists profiles_admin_all on public.profiles;
create policy profiles_admin_all
  on public.profiles
  for all
  to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

-- public catalogs
drop policy if exists departments_public_read on public.departments;
create policy departments_public_read
  on public.departments
  for select
  to anon, authenticated
  using (true);

drop policy if exists departments_admin_write on public.departments;
create policy departments_admin_write
  on public.departments
  for all
  to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

drop policy if exists doctors_public_read on public.doctors;
create policy doctors_public_read
  on public.doctors
  for select
  to anon, authenticated
  using (is_published or (select private.is_staff()));

drop policy if exists doctors_admin_write on public.doctors;
create policy doctors_admin_write
  on public.doctors
  for all
  to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

drop policy if exists schedules_public_read on public.doctor_schedules;
create policy schedules_public_read
  on public.doctor_schedules
  for select
  to anon, authenticated
  using (true);

drop policy if exists schedules_admin_write on public.doctor_schedules;
create policy schedules_admin_write
  on public.doctor_schedules
  for all
  to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

drop policy if exists announcements_public_read on public.announcements;
create policy announcements_public_read
  on public.announcements
  for select
  to anon, authenticated
  using (published_at is not null and published_at <= now());

drop policy if exists announcements_staff_read_all on public.announcements;
create policy announcements_staff_read_all
  on public.announcements
  for select
  to authenticated
  using ((select private.is_staff()));

drop policy if exists announcements_admin_write on public.announcements;
create policy announcements_admin_write
  on public.announcements
  for all
  to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

drop policy if exists guidelines_public_read on public.guidelines;
create policy guidelines_public_read
  on public.guidelines
  for select
  to anon, authenticated
  using (true);

drop policy if exists guidelines_admin_write on public.guidelines;
create policy guidelines_admin_write
  on public.guidelines
  for all
  to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

-- appointments
drop policy if exists appointments_patient_select on public.appointments;
create policy appointments_patient_select
  on public.appointments
  for select
  to authenticated
  using (
    patient_id = (select auth.uid())
    or (select private.is_staff())
  );

drop policy if exists appointments_patient_insert on public.appointments;
create policy appointments_patient_insert
  on public.appointments
  for insert
  to authenticated
  with check (
    patient_id = (select auth.uid())
    and status = 'pending'
  );

drop policy if exists appointments_patient_cancel on public.appointments;
create policy appointments_patient_cancel
  on public.appointments
  for update
  to authenticated
  using (patient_id = (select auth.uid()))
  with check (
    patient_id = (select auth.uid())
    and status in ('pending', 'cancelled')
  );

drop policy if exists appointments_staff_update on public.appointments;
create policy appointments_staff_update
  on public.appointments
  for update
  to authenticated
  using ((select private.is_staff()))
  with check ((select private.is_staff()));

-- test results
drop policy if exists test_results_patient_select on public.test_results;
create policy test_results_patient_select
  on public.test_results
  for select
  to authenticated
  using (
    (
      patient_id = (select auth.uid())
      and released_at is not null
    )
    or (select private.is_staff())
  );

drop policy if exists test_results_admin_write on public.test_results;
create policy test_results_admin_write
  on public.test_results
  for all
  to authenticated
  using ((select private.is_staff()))
  with check ((select private.is_staff()));

-- ---------------------------------------------------------------------------
-- Storage: private results
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('test-results', 'test-results', false)
on conflict (id) do nothing;

drop policy if exists test_results_objects_select on storage.objects;
create policy test_results_objects_select
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'test-results'
    and (
      (select private.is_staff())
      or split_part(name, '/', 1) = (select auth.uid())::text
    )
  );

drop policy if exists test_results_objects_staff_write on storage.objects;
create policy test_results_objects_staff_write
  on storage.objects
  for all
  to authenticated
  using (
    bucket_id = 'test-results'
    and (select private.is_staff())
  )
  with check (
    bucket_id = 'test-results'
    and (select private.is_staff())
  );
