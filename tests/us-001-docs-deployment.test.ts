/**
 * US-001: Create docs folder and deployment exclusion
 * Verifies docs/ exists, is in .vercelignore, and is not imported/served by Next.js.
 */
import { describe, test, expect } from "bun:test";
import { existsSync } from "fs";
import { readFileSync } from "fs";
import { join } from "path";
import { readdirSync } from "fs";

const ROOT = join(import.meta.dir, "..");

describe("US-001: docs folder and deployment exclusion", () => {
  test("docs/ folder exists at repo root", () => {
    const docsPath = join(ROOT, "docs");
    expect(existsSync(docsPath)).toBe(true);
    expect(() => readdirSync(docsPath)).not.toThrow();
  });

  test(".vercelignore includes docs so folder is not uploaded to Vercel", () => {
    const vercelignorePath = join(ROOT, ".vercelignore");
    expect(existsSync(vercelignorePath)).toBe(true);
    const content = readFileSync(vercelignorePath, "utf-8");
    expect(content).toMatch(/docs/);
  });

  test("docs/ is not imported or served by the Next.js app", () => {
    const srcDir = join(ROOT, "src");
    const files = globRecursive(srcDir, [".ts", ".tsx", ".js", ".jsx"]);
    for (const file of files) {
      const content = readFileSync(file, "utf-8");
      expect(content).not.toMatch(/from\s+["']\.\.\/docs|from\s+["']docs\/|import\s+.*["']docs\//);
      expect(content).not.toMatch(/require\s*\(\s*["']\.\.\/docs|require\s*\(\s*["']docs\//);
    }
  });
});

function globRecursive(
  dir: string,
  exts: string[],
  results: string[] = []
): string[] {
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
