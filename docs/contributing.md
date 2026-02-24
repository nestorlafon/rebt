# Contributing to REBT

This document explains how to run, test, lint, add content, and contribute changes to the REBT learning platform.

## How to run dev

Start the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000). Changes to source files hot-reload automatically.

For initial setup (dependencies, env, Supabase), see [setup.md](setup.md).

## How to lint

Run ESLint on the codebase:

```bash
bun run lint
```

Or with npx:

```bash
npx eslint .
```

Fix auto-fixable issues:

```bash
npx eslint . --fix
```

Ensure lint passes before opening a PR.

## How to add content (SQL)

Content (REBT articles, ITC-BT instructions, quiz questions) is stored in Supabase and managed via SQL.

### Schema changes (new tables, columns)

Add a new migration file under `supabase/migrations/`:

- Filename: `YYYYMMDDHHMMSS_descriptive_name.sql` (e.g. `20250224120000_add_new_column.sql`)
- Run the SQL in the Supabase **SQL Editor** or via the Supabase CLI
- Migrations are additive; avoid dropping columns used in production

### Adding sections, ITCs, or quiz questions

**Sections (REBT artículos):** Insert into `rebt_sections`:

```sql
INSERT INTO rebt_sections (code, title, content, "order", section_type) VALUES
  ('art-N', 'Artículo N. Título', 'Contenido...', 5, 'articulo');
```

**ITC-BT instructions:** Insert into `rebt_itc`:

```sql
INSERT INTO rebt_itc (code, title, summary, content, "order") VALUES
  ('ITC-BT-XX', 'ITC-BT XX: Título', 'Resumen breve', 'Contenido completo...', XX);
```

**Quiz questions:** Insert into `quiz_questions` referencing `section_id` or `itc_id`:

```sql
INSERT INTO quiz_questions (section_id, question, options, correct_index, explanation, difficulty)
SELECT id, '¿Pregunta?', '["A", "B", "C", "D"]'::jsonb, 1, 'Explicación.', 'facil'
FROM rebt_sections WHERE code = 'art-2';
```

For local development, append new rows to `supabase/seed.sql` so they load when seeding. For production, run the SQL in the Supabase dashboard.

## Code style

- **TypeScript:** Use strict mode. Prefer types over `any`.
- **ESLint:** The project uses `eslint-config-next`. Run `bun run lint` and fix reported issues.
- **Formatting:** No Prettier in this repo; follow existing patterns. Use consistent indentation (2 spaces).
- **Naming:** `camelCase` for variables/functions, `PascalCase` for components and types.
- **Imports:** Order: external packages, then internal (`src/`), then relative.

## PR process

1. Create a branch from `main` (e.g. `feature/add-itc-bt-42`).
2. Make your changes. Ensure new functionality is covered by tests.
3. Run quality checks before pushing:
   ```bash
   bun run lint
   bun test
   bun run build
   npx tsc --noEmit
   ```
4. Push your branch and open a Pull Request.
5. Describe what changed and link any related issues.
6. Wait for review. Address feedback and ensure CI passes.
