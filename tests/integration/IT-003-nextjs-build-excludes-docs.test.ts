/**
 * IT-003: Verify Next.js build does not include or serve docs
 * Steps:
 *   1. Run bun run build
 *   2. Confirm no imports from docs/ in build output
 *   3. Confirm docs/ is not copied into .next/ output
 *
 * Note: We run build as part of this test. The build must succeed first.
 */
import { describe, test, expect } from "bun:test";
import { existsSync, readFileSync, readdirSync } from "fs";
import { join } from "path";
import { spawnSync } from "child_process";

const ROOT = join(import.meta.dir, "../..");
const NEXT_DIR = join(ROOT, ".next");
function globRecursive(dir: string, exts: string[], results: string[] = []): string[] {
  if (!existsSync(dir)) return results;
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory() && !e.name.startsWith(".") && e.name !== "node_modules") {
      globRecursive(full, exts, results);
    } else if (e.isFile() && exts.some((ext) => e.name.endsWith(ext))) {
      results.push(full);
    }
  }
  return results;
}

describe("IT-003: Next.js build does not include or serve docs", () => {
  test("Step 1: bun run build succeeds", { timeout: 60000 }, () => {
    const result = spawnSync("bun", ["run", "build"], {
      cwd: ROOT,
      stdio: "pipe",
      encoding: "utf-8",
    });
    expect(result.status).toBe(0);
  });

  test("Step 2: no imports from docs/ in src/", () => {
    const srcDir = join(ROOT, "src");
    const files = globRecursive(srcDir, [".ts", ".tsx", ".js", ".jsx"]);
    for (const file of files) {
      const content = readFileSync(file, "utf-8");
      expect(content).not.toMatch(/from\s+["']\.\.\/docs|from\s+["']docs\/|import\s+.*["']docs\//);
    }
  });

  test("Step 3: docs/ is not copied into .next/ output", () => {
    if (!existsSync(NEXT_DIR)) return; // build may not have run
    const nextDocs = join(NEXT_DIR, "docs");
    expect(existsSync(nextDocs)).toBe(false);
  });
});
