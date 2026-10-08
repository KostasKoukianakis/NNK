# ΝΝΚ — Ναυτικό Νοσοκομείο Κρήτης

Δημόσιος ιστότοπος και portal ασθενών για το Ναυτικό Νοσοκομείο Κρήτης (Σούδα, Χανιά).

## Stack

- Next.js App Router, TypeScript, Tailwind CSS
- Supabase (Postgres, Auth, RLS, Storage)
- TanStack Query, Zustand, Zod, React Hook Form, Framer Motion

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Fill `.env.local` with the project URL and publishable key from the Supabase dashboard. Until those exist, public pages render from local catalog fallbacks so the site is reviewable.

## Database

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Run `supabase/seed.sql` for NNK clinics and guidelines.

Roles live in `public.users.role`, never in `user_metadata`. New Auth users get a `patient` row via trigger.

## Scripts

- `npm run dev` — local server
- `npm run build` — production build
- `npm run lint` — ESLint

Architecture: `ARCHITECTURE.md`. Visual tokens: `DESIGN.md`. Product intent: `PRODUCT.md`.
