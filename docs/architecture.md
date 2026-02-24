# REBT App Architecture

This document describes the application structure, tech stack, and integrations for the REBT (Reglamento Electrotécnico para Baja Tensión) learning platform.

## App Structure

### src/app/

The application uses Next.js App Router. The `src/app/` directory contains:

- **layout.tsx** — Root layout with shared header (nav: Estudiar, ITC-BT, Quiz), fonts (Outfit, JetBrains Mono), and metadata
- **page.tsx** — Home page with links to Estudiar, ITC, and Quiz
- **globals.css** — Global styles (Tailwind)
- **estudiar/** — Reglamento sections: list (`page.tsx`) and section detail (`[id]/page.tsx`)
- **itc/** — ITC-BT instructions: list (`page.tsx`) and ITC detail (`[id]/page.tsx`)
- **quiz/** — Quiz page and `QuizRunner.tsx` client component

### src/lib/

Shared libraries and utilities:

- **supabase/** — Supabase client setup:
  - `client.ts` — Browser client (`createBrowserClient`) for client components
  - `server.ts` — Server client (`createServerClient`) for Server Components; uses `cookies()` from `next/headers`; returns `null` if env vars missing
  - `middleware.ts` — `updateSession()` for session refresh in middleware; uses `createServerClient` with request cookies

### src/components/

- **SupabaseConfigNeeded.tsx** — Fallback UI when Supabase is not configured or data fetch fails

### src/types/

- **rebt.ts** — Types: `RebtSection`, `RebtItc`, `QuizQuestion`

### src/proxy.ts

Exports `proxy()` which delegates to `updateSession()` from `@/lib/supabase/middleware`; defines route matcher for middleware.

## Next.js 16 App Router

- **Framework**: Next.js 16.1.6 with React 19
- **Routing**: File-based routing under `src/app/`
- **Server Components**: Default; data fetching in page components via `createClient()` from `@/lib/supabase/server`
- **Client Components**: Used where interactivity is needed (e.g. `QuizRunner` with `"use client"`)
- **Dynamic routes**: `[id]` for section and ITC detail pages
- **Metadata**: Set in root `layout.tsx` via `metadata` export

## Supabase Integration

- **Packages**: `@supabase/ssr` (^0.8.0), `@supabase/supabase-js` (^2.97.0)
- **Env vars**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
- **Client vs Server**:
  - Server Components use `createClient()` from `@/lib/supabase/server`; cookie store from `next/headers`
  - Browser client uses `createClient()` from `@/lib/supabase/client`
- **Tables used**: `rebt_sections`, `rebt_itc`, `quiz_questions`
- **Graceful degradation**: Missing env or fetch error shows `SupabaseConfigNeeded` instead of crashing
