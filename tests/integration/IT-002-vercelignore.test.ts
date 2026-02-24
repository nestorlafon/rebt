/**
 * IT-002: Verify deployment exclusion via .vercelignore
 * Steps:
 *   1. Read .vercelignore file
 *   2. Assert docs or docs/ is listed in ignore rules
 *   3. Optionally run vercel build — skipped in automated test (requires Vercel CLI)
 */
import { describe, test, expect } from "bun:test";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

const ROOT = join(import.meta.dir, "../..");

describe("IT-002: deployment exclusion via .vercelignore", () => {
  test("Step 1: .vercelignore file exists and is readable", () => {
    const path = join(ROOT, ".vercelignore");
    expect(existsSync(path)).toBe(true);
    expect(() => readFileSync(path, "utf-8")).not.toThrow();
  });

  test("Step 2: docs or docs/ is listed in ignore rules", () => {
    const path = join(ROOT, ".vercelignore");
    const content = readFileSync(path, "utf-8");
    // Match "docs" or "docs/" as a word/line
    expect(content).toMatch(/\bdocs\/?\b/);
  });
});
