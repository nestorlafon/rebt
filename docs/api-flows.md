# API and Data Flows

This document describes how data moves through the REBT app: Supabase client usage, data fetching patterns, and server/client responsibilities.

## Supabase Client vs Server Usage

The app uses three Supabase client entry points from `src/lib/supabase/`:

### Server client (`server.ts`)

- **Usage**: Server Components (pages, layouts)
- **Factory**: `createServerClient` from `@supabase/ssr`
- **Behavior**: Uses `cookies()` from `next/headers` for session; returns `null` if env vars (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`) are missing
- **Import**: `import { createClient } from "@/lib/supabase/server"`

### Browser client (`client.ts`)

- **Usage**: Client Components that need direct Supabase access (e.g. auth, mutations)
- **Factory**: `createBrowserClient` from `@supabase/ssr`
- **Behavior**: Uses browser cookies automatically; expects env vars to be set
- **Import**: `import { createClient } from "@/lib/supabase/client"`
- **Note**: Currently no component uses the browser client; all data fetching is done in Server Components.

### Middleware (`middleware.ts`)

- **Usage**: Session refresh in middleware (via `proxy.ts` route matcher)
- **Factory**: `createServerClient` from `@supabase/ssr` with request cookies
- **Behavior**: Calls `supabase.auth.getUser()` to refresh expired sessions; required for SSR auth
- **Wiring**: `updateSession()` is invoked by `proxy()` in `src/proxy.ts` for matching routes

---

## Data Fetching

All content is fetched in Server Components using the server client. Tables: `rebt_sections`, `rebt_itc`, `quiz_questions`.

### Sections (Reglamento)

| Page | Route | Table | Query |
|------|-------|-------|-------|
| List | `/estudiar` | `rebt_sections` | `select("*").order("order", { ascending: true })` |
| Detail | `/estudiar/[id]` | `rebt_sections` | `select("*").eq("id", id).single()` |

- **Files**: `src/app/estudiar/page.tsx`, `src/app/estudiar/[id]/page.tsx`

### ITCs (Instrucciones Técnicas Complementarias)

| Page | Route | Table | Query |
|------|-------|-------|-------|
| List | `/itc` | `rebt_itc` | `select("*").order("order", { ascending: true })` |
| Detail | `/itc/[id]` | `rebt_itc` | `select("*").eq("id", id).single()` |

- **Files**: `src/app/itc/page.tsx`, `src/app/itc/[id]/page.tsx`

### Quiz

| Page | Route | Table | Query |
|------|-------|-------|-------|
| Quiz | `/quiz` | `quiz_questions` | `select("*").limit(20)` |

- **Files**: `src/app/quiz/page.tsx`
- **Flow**: Page fetches questions server-side and passes them as props to `QuizRunner` (client component). `QuizRunner` does not call Supabase; it receives questions and manages local state (answer selection, score, next/restart).

### Error and Missing-Config Handling

- Missing env: `createClient()` returns `null` → `SupabaseConfigNeeded`
- Fetch error or empty result: same fallback
- Detail pages: `error || !data` → `notFound()`

---

## Server Actions

The app does **not** use Next.js Server Actions (`"use server"`). All data fetching is done in async Server Components. Mutations (e.g. `user_progress`, `user_quiz_attempts`) are not implemented yet; when added, they could use server actions or API routes.
