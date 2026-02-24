/**
 * IT-001: Verify docs folder contains all expected documentation files
 * Steps:
 *   1. Check that docs/ directory exists at repo root
 *   2. Verify files exist: docs/README.md, docs/architecture.md, docs/database-schema.md,
 *      docs/setup.md, docs/api-flows.md, docs/contributing.md
 *   3. Verify each file is non-empty
 */
import { describe, test, expect } from "bun:test";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

const ROOT = join(import.meta.dir, "../..");
const DOCS = join(ROOT, "docs");

const EXPECTED_FILES = [
  "README.md",
  "architecture.md",
  "database-schema.md",
  "setup.md",
  "api-flows.md",
  "contributing.md",
] as const;

describe("IT-001: docs folder contains all expected documentation files", () => {
  test("Step 1: docs/ directory exists at repo root", () => {
    expect(existsSync(DOCS)).toBe(true);
    expect(existsSync(join(ROOT, "docs"))).toBe(true);
  });

  test("Step 2: all expected doc files exist", () => {
    for (const file of EXPECTED_FILES) {
      const path = join(DOCS, file);
      expect(existsSync(path)).toBe(true);
    }
  });

  test("Step 3: each file is non-empty", () => {
    for (const file of EXPECTED_FILES) {
      const path = join(DOCS, file);
      const content = readFileSync(path, "utf-8");
      expect(content.trim().length).toBeGreaterThan(0);
    }
  });
});
