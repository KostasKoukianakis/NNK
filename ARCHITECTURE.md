# Architecture

NNK is a Next.js App Router application with Supabase as the system of record. The public site, patient portal, and staff tools share one codebase and one Postgres database. Access is enforced with Row Level Security, not with client-side role checks alone.

## System shape

```
Browser
  └─ Next.js 16 (App Router, React 19)
        ├─ Server Components / Server Actions  ── createClient() ── Postgres RLS
        ├─ Client Components (wizard, forms)   ── browser client + React Query
        └─ proxy.ts                            ── refresh session cookies (getClaims / getUser)
                     │
                     ▼
              Supabase
                ├─ Auth (email, later gov.gr / Taxis if required)
                ├─ Postgres + RLS
                └─ Storage (test-results bucket)
```

## Route groups

| Group | URL prefix | Who | Layout |
| --- | --- | --- | --- |
| `(public)` | `/` | Anyone | Civic header + footer |
| `(auth)` | `/login`, `/register` | Guests | Minimal shell |
| `(patient)` | `/portal/*` | Authenticated patient (or staff acting as themselves) | Portal app shell |
| `(admin)` | `/admin/*` | `admin` role | Dense staff shell |

`proxy.ts` refreshes the Auth token on every matched request and redirects unauthenticated users away from `/portal` and `/admin`. Role gates (patient vs admin vs doctor) run on the server with `public.users.role`. Roles are never read from `user_metadata`.

## Feature map vs ΝΝΑ / hellenicnavy.gr

The public IA follows what naval hospitals already publish, then adds the missing task layer.

| Capability | NNA / GEN NNK today | This app |
| --- | --- | --- |
| Mission, history, organisation | Static HTML | `/about` |
| Clinics / departments | Tables | `/departments`, `/departments/[slug]` |
| Outpatient roster | Partial | `/doctors` |
| Announcements | News page | `/announcements` |
| Visiting / patient guidelines | FAQ / instructions | `/guidelines` |
| Eligibility (δικαιούχοι) | Prose | `/eligibility` |
| Contact + phones | Tables | `/contact` |
| Emergency (ΤΕΠ, hyperbaric) | Phone list | `/emergency` |
| FAQ / patient rights | FAQ | `/faq` |
| Appointment booking | Phone only | `/portal/book` wizard |
| Visit history + results | Paper / in person | `/portal/history`, `/portal/results` |
| Staff ops | Internal | `/admin` |

## Data

Canonical SQL: `supabase/schema.sql`.

- `auth.users` is identity. `public.users` holds `role`. `profiles` holds AMKA and demographics.
- Authorization helpers live in the unexposed `private` schema (`security definer`, `search_path = ''`).
- Appointments are the calendar of record. Unique `(doctor_id, appointment_date)` excluding cancelled rows.
- `test_results` points at Storage objects. Patients read their own files; doctors and admins read files for patients they are allowed to treat.
- Public catalogs (`departments`, published `doctors`, published `announcements`, `guidelines`) are readable by `anon`.

## Server state vs client state

- **TanStack Query**: patient appointments, results, and admin lists that refetch after mutations.
- **React Hook Form + Zod**: booking wizard and auth forms.
- **Zustand**: UI-only (mobile nav). Do not put medical data in Zustand.

## Security notes

- AMKA is unique, digit-checked, and RLS-scoped. Never put it in a URL.
- The public contact form (later) must refuse health-data requests; copy already says so, matching NNA policy.
- `service_role` never ships to the browser. Only `NEXT_PUBLIC_SUPABASE_URL` and the publishable/anon key are public.
