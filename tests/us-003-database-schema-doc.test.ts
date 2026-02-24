/**
 * US-003: Document database schema
 * Verifies docs/database-schema.md exists with required tables, relationships, and RLS from migrations.
 */
import { describe, test, expect } from "bun:test";
import { existsSync } from "fs";
import { readFileSync } from "fs";
import { join } from "path";

const ROOT = join(import.meta.dir, "..");

describe("US-003: database schema documentation", () => {
  test("docs/database-schema.md exists", () => {
    const path = join(ROOT, "docs", "database-schema.md");
    expect(existsSync(path)).toBe(true);
  });

  test("database-schema.md describes all required tables", () => {
    const content = readFileSync(join(ROOT, "docs", "database-schema.md"), "utf-8");
    expect(content).toMatch(/rebt_sections/);
    expect(content).toMatch(/rebt_itc/);
    expect(content).toMatch(/quiz_questions/);
    expect(content).toMatch(/user_progress/);
    expect(content).toMatch(/user_quiz_attempts/);
  });

  test("database-schema.md describes relationships", () => {
    const content = readFileSync(join(ROOT, "docs", "database-schema.md"), "utf-8");
    expect(content).toMatch(/relationship|Relationships/i);
    expect(content).toMatch(/references|REFERENCES/i);
  });

  test("database-schema.md describes RLS", () => {
    const content = readFileSync(join(ROOT, "docs", "database-schema.md"), "utf-8");
    expect(content).toMatch(/RLS|Row Level Security/i);
    expect(content).toMatch(/auth\.uid\(\)/);
  });

  test("database-schema.md content is derived from migrations (key columns)", () => {
    const content = readFileSync(join(ROOT, "docs", "database-schema.md"), "utf-8");
    expect(content).toMatch(/section_type|section_type.*titulo.*articulo|articulo.*titulo/i);
    expect(content).toMatch(/options.*JSONB|JSONB.*options/i);
    expect(content).toMatch(/progress_has_target|section_id.*itc_id/i);
  });
});
