/**
 * US-006: Document contributing guidelines
 * Verifies docs/contributing.md exists with run dev, lint, add content (SQL), code style, PR process.
 */
import { describe, test, expect } from "bun:test";
import { existsSync } from "fs";
import { readFileSync } from "fs";
import { join } from "path";

const ROOT = join(import.meta.dir, "..");

describe("US-006: contributing documentation", () => {
  test("docs/contributing.md exists", () => {
    const path = join(ROOT, "docs", "contributing.md");
    expect(existsSync(path)).toBe(true);
  });

  test("contributing.md has section on running dev", () => {
    const content = readFileSync(join(ROOT, "docs", "contributing.md"), "utf-8");
    expect(content).toMatch(/run dev|development server|bun run dev/i);
    expect(content).toMatch(/localhost:3000/);
  });

  test("contributing.md has section on lint", () => {
    const content = readFileSync(join(ROOT, "docs", "contributing.md"), "utf-8");
    expect(content).toMatch(/lint|eslint/i);
    expect(content).toMatch(/bun run lint|npx eslint/i);
  });

  test("contributing.md has section on adding content (SQL)", () => {
    const content = readFileSync(join(ROOT, "docs", "contributing.md"), "utf-8");
    expect(content).toMatch(/add content|adding content|SQL/i);
    expect(content).toMatch(/supabase\/migrations|migrations/i);
    expect(content).toMatch(/seed\.sql|rebt_sections|rebt_itc|quiz_questions/i);
  });

  test("contributing.md has code style section", () => {
    const content = readFileSync(join(ROOT, "docs", "contributing.md"), "utf-8");
    expect(content).toMatch(/code style|Code style/i);
    expect(content).toMatch(/TypeScript|ESLint|camelCase|PascalCase/i);
  });

  test("contributing.md has PR process section", () => {
    const content = readFileSync(join(ROOT, "docs", "contributing.md"), "utf-8");
    expect(content).toMatch(/PR process|Pull Request|PR/i);
    expect(content).toMatch(/branch|bun run lint|bun test|bun run build/i);
  });
});
