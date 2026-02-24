# REBT Database Schema

This document describes the database tables, relationships, and Row Level Security (RLS) policies for the REBT learning platform. Content is derived from `supabase/migrations/`.

## Tables

### rebt_sections

Regulation sections (Artículos, Títulos) from the REBT (RD 842/2002 Reglamento Electrotécnico para Baja Tensión).

| Column       | Type        | Constraints                               |
|-------------|-------------|-------------------------------------------|
| id          | UUID        | PRIMARY KEY, DEFAULT gen_random_uuid()    |
| parent_id   | UUID        | REFERENCES rebt_sections(id) ON DELETE CASCADE |
| code        | TEXT        | NOT NULL, UNIQUE                          |
| title       | TEXT        | NOT NULL                                  |
| content     | TEXT        |                                           |
| order       | INTEGER     | NOT NULL, DEFAULT 0                       |
| section_type| TEXT        | NOT NULL, CHECK IN ('titulo', 'articulo', 'anexo') |
| created_at  | TIMESTAMPTZ | DEFAULT now()                              |
| updated_at  | TIMESTAMPTZ | DEFAULT now()                              |

**Indexes**: `idx_rebt_sections_parent` (parent_id), `idx_rebt_sections_order` (order).

---

### rebt_itc

ITC-BT (Instrucciones Técnicas Complementarias) — complementary technical instructions.

| Column     | Type        | Constraints                    |
|------------|-------------|--------------------------------|
| id         | UUID        | PRIMARY KEY, DEFAULT gen_random_uuid() |
| code       | TEXT        | NOT NULL, UNIQUE               |
| title      | TEXT        | NOT NULL                       |
| content    | TEXT        |                                |
| summary    | TEXT        |                                |
| order      | INTEGER     | NOT NULL, DEFAULT 0            |
| created_at | TIMESTAMPTZ | DEFAULT now()                   |
| updated_at | TIMESTAMPTZ | DEFAULT now()                   |

**Indexes**: `idx_rebt_itc_order` (order).

---

### quiz_questions

Quiz questions for practice, optionally linked to a section or ITC.

| Column       | Type        | Constraints                                          |
|--------------|-------------|------------------------------------------------------|
| id           | UUID        | PRIMARY KEY, DEFAULT gen_random_uuid()                |
| section_id   | UUID        | REFERENCES rebt_sections(id) ON DELETE SET NULL      |
| itc_id       | UUID        | REFERENCES rebt_itc(id) ON DELETE SET NULL            |
| question     | TEXT        | NOT NULL                                             |
| options      | JSONB       | NOT NULL (array of strings: ["option1", ...])         |
| correct_index| INTEGER     | NOT NULL, CHECK >= 0                                 |
| explanation  | TEXT        |                                                      |
| difficulty   | TEXT        | CHECK IN ('facil', 'medio', 'dificil')               |
| created_at   | TIMESTAMPTZ | DEFAULT now()                                         |

**Indexes**: `idx_quiz_questions_section` (section_id), `idx_quiz_questions_itc` (itc_id).

---

### user_progress

Tracks completed sections or ITCs per user. Works with Supabase Auth.

| Column      | Type        | Constraints                                          |
|-------------|-------------|------------------------------------------------------|
| id          | UUID        | PRIMARY KEY, DEFAULT gen_random_uuid()                |
| user_id     | UUID        | NOT NULL, REFERENCES auth.users(id) ON DELETE CASCADE |
| section_id  | UUID        | REFERENCES rebt_sections(id) ON DELETE CASCADE       |
| itc_id      | UUID        | REFERENCES rebt_itc(id) ON DELETE CASCADE             |
| completed_at| TIMESTAMPTZ | DEFAULT now()                                         |

**Constraint**: `progress_has_target` — exactly one of `section_id` or `itc_id` must be non-null (mutually exclusive).

**Indexes**: `idx_user_section_progress` (user_id, section_id) WHERE section_id IS NOT NULL; `idx_user_itc_progress` (user_id, itc_id) WHERE itc_id IS NOT NULL; `idx_user_progress_user` (user_id).

---

### user_quiz_attempts

Quiz attempts and scores per user.

| Column      | Type        | Constraints                                          |
|-------------|-------------|------------------------------------------------------|
| id          | UUID        | PRIMARY KEY, DEFAULT gen_random_uuid()                |
| user_id     | UUID        | REFERENCES auth.users(id) ON DELETE CASCADE           |
| score       | INTEGER     | NOT NULL                                             |
| total       | INTEGER     | NOT NULL                                             |
| completed_at| TIMESTAMPTZ | DEFAULT now()                                         |

**Indexes**: `idx_user_quiz_attempts_user` (user_id).

---

## Relationships

```
rebt_sections
  ├── parent_id ──► rebt_sections (self-reference, tree hierarchy)
  └── referenced by: quiz_questions.section_id, user_progress.section_id

rebt_itc
  └── referenced by: quiz_questions.itc_id, user_progress.itc_id

auth.users
  └── referenced by: user_progress.user_id, user_quiz_attempts.user_id

quiz_questions
  ├── section_id ──► rebt_sections (nullable)
  └── itc_id ──► rebt_itc (nullable)

user_progress
  ├── user_id ──► auth.users
  ├── section_id ──► rebt_sections (nullable, mutually exclusive with itc_id)
  └── itc_id ──► rebt_itc (nullable, mutually exclusive with section_id)

user_quiz_attempts
  └── user_id ──► auth.users
```

---

## Row Level Security (RLS)

All five tables have RLS enabled.

### Content tables (public read)

- **rebt_sections**: `rebt_sections_read` — `SELECT` using `true` (anyone can read)
- **rebt_itc**: `rebt_itc_read` — `SELECT` using `true` (anyone can read)
- **quiz_questions**: `quiz_questions_read` — `SELECT` using `true` (anyone can read)

### User-scoped tables

- **user_progress**:
  - `user_progress_select` — `SELECT` using `auth.uid() = user_id`
  - `user_progress_insert` — `INSERT` with check `auth.uid() = user_id`
  - `user_progress_delete` — `DELETE` using `auth.uid() = user_id`
  - (No UPDATE policy; updates not allowed)

- **user_quiz_attempts**:
  - `user_quiz_select` — `SELECT` using `auth.uid() = user_id`
  - `user_quiz_insert` — `INSERT` with check `auth.uid() = user_id`
  - (No UPDATE or DELETE policies)
