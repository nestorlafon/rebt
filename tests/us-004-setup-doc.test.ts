/**
 * US-004: Document setup and deployment
 * Verifies docs/setup.md exists with prerequisites, env vars, local install, Supabase, Vercel.
 */
import { describe, test, expect } from "bun:test";
import { existsSync } from "fs";
import { readFileSync } from "fs";
import { join } from "path";

const ROOT = join(import.meta.dir, "..");

describe("US-004: setup and deployment documentation", () => {
  test("docs/setup.md exists", () => {
    const path = join(ROOT, "docs", "setup.md");
    expect(existsSync(path)).toBe(true);
  });

  test("setup.md has prerequisites section (Bun, mise)", () => {
    const content = readFileSync(join(ROOT, "docs", "setup.md"), "utf-8");
    expect(content).toMatch(/prerequisite|Prerequisites/i);
    expect(content).toMatch(/Bun|bun\.sh/i);
    expect(content).toMatch(/mise/i);
  });

  test("setup.md has env vars section", () => {
    const content = readFileSync(join(ROOT, "docs", "setup.md"), "utf-8");
    expect(content).toMatch(/environment|env var|\.env/i);
    expect(content).toMatch(/NEXT_PUBLIC_SUPABASE_URL/);
    expect(content).toMatch(/NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY/);
  });

  test("setup.md has local install section", () => {
    const content = readFileSync(join(ROOT, "docs", "setup.md"), "utf-8");
    expect(content).toMatch(/install|Install/i);
    expect(content).toMatch(/bun install/);
    expect(content).toMatch(/bun run dev/);
    expect(content).toMatch(/localhost:3000/);
  });

  test("setup.md has Supabase setup (migrations + seed)", () => {
    const content = readFileSync(join(ROOT, "docs", "setup.md"), "utf-8");
    expect(content).toMatch(/Supabase.*setup|Supabase Setup/i);
    expect(content).toMatch(/migration|migrations/i);
    expect(content).toMatch(/seed\.sql|seed/i);
    expect(content).toMatch(/20250220000000_initial_schema|initial_schema\.sql/i);
  });

  test("setup.md has Vercel deployment section", () => {
    const content = readFileSync(join(ROOT, "docs", "setup.md"), "utf-8");
    expect(content).toMatch(/Vercel|vercel\.com/i);
    expect(content).toMatch(/deploy|Deploy/i);
    expect(content).toMatch(/NEXT_PUBLIC_SUPABASE_URL|environment variables/i);
  });

  test("setup.md content aligns with root README (key commands)", () => {
    const setupContent = readFileSync(join(ROOT, "docs", "setup.md"), "utf-8");
    const readmeContent = readFileSync(join(ROOT, "README.md"), "utf-8");
    expect(setupContent).toMatch(/bun install/);
    expect(setupContent).toMatch(/bun run dev/);
    expect(setupContent).toMatch(/supabase\.com/);
    expect(setupContent).toMatch(/vercel\.com/);
    expect(readmeContent).toMatch(/bun install/);
    expect(readmeContent).toMatch(/bun run dev/);
    expect(readmeContent).toMatch(/supabase\.com/);
    expect(readmeContent).toMatch(/vercel\.com/);
  });
});
