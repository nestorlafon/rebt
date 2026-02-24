# REBT Setup and Deployment

This document describes how to set up the development environment and deploy the REBT learning platform. For a quick overview, see the [root README](../README.md).

## Prerequisites

- **[Bun](https://bun.sh)** — JavaScript runtime used for package management and scripts
- **[mise](https://mise.jdx.dev)** — Tool manager for Bun and Node; versions are defined in `.tool-versions`

Install tools via mise:

```bash
mise install
```

This reads `.tool-versions` and installs the specified versions (Bun 1.3.9, Node 22).

## Environment Variables

The app requires two environment variables for Supabase:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL (e.g. `https://xxx.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` | Supabase publishable/anon key (starts with `sb_publishable_...`) |

These are used by `src/lib/supabase/client.ts`, `server.ts`, and `middleware.ts`. Without them, the app shows `SupabaseConfigNeeded` instead of content.

## Local Install

1. **Install dependencies**

   ```bash
   bun install
   ```

2. **Configure environment**

   - If `.env.example` exists: `cp .env.example .env.local`
   - Otherwise, create `.env.local` with:

     ```bash
     NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
     NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-publishable-key
     ```

3. **Run the development server**

   ```bash
   bun run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com).

2. **Run migrations**

   In the Supabase **SQL Editor**, create a new query and run:

   - The contents of `supabase/migrations/20250220000000_initial_schema.sql`

   This creates tables: `rebt_sections`, `rebt_itc`, `quiz_questions`, `user_progress`, `user_quiz_attempts`, plus indexes and RLS policies.

3. **Seed sample data**

   Run `supabase/seed.sql` in the same SQL Editor to load example articles, ITCs, and quiz questions.

4. **Copy credentials**

   In **Settings → API**, copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Publishable key (anon) → `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`

   Paste them into `.env.local`.

## Vercel Deployment

1. Connect your repository at [vercel.com](https://vercel.com).

2. **Environment variables**

   In the Vercel project settings, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`

3. **Deploy**

   Vercel builds with `next build` automatically. Push to the connected branch to trigger a new deployment.

4. **Excluded from build**

   The `docs/` folder is listed in `.vercelignore` and is not uploaded or served.
