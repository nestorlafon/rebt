/**
 * US-002: Document architecture
 * Verifies docs/architecture.md exists with required sections reflecting the codebase.
 */
import { describe, test, expect } from "bun:test";
import { existsSync } from "fs";
import { readFileSync } from "fs";
import { join } from "path";

const ROOT = join(import.meta.dir, "..");

describe("US-002: architecture documentation", () => {
  test("docs/architecture.md exists", () => {
    const path = join(ROOT, "docs", "architecture.md");
    expect(existsSync(path)).toBe(true);
  });

  test("architecture.md has app structure section covering src/app/ and src/lib/", () => {
    const content = readFileSync(join(ROOT, "docs", "architecture.md"), "utf-8");
    expect(content).toMatch(/app structure|App Structure/i);
    expect(content).toMatch(/src\/app\//);
    expect(content).toMatch(/src\/lib\//);
  });

  test("architecture.md has Next.js 16 App Router section", () => {
    const content = readFileSync(join(ROOT, "docs", "architecture.md"), "utf-8");
    expect(content).toMatch(/Next\.js.*16|App Router/i);
  });

  test("architecture.md has Supabase integration section", () => {
    const content = readFileSync(join(ROOT, "docs", "architecture.md"), "utf-8");
    expect(content).toMatch(/Supabase.*integration|Supabase Integration/i);
  });

  test("architecture.md content reflects current codebase (key modules)", () => {
    const content = readFileSync(join(ROOT, "docs", "architecture.md"), "utf-8");
    expect(content).toMatch(/rebt_sections|rebt_itc|quiz_questions/);
    expect(content).toMatch(/createClient|createBrowserClient|createServerClient/);
  });
});
