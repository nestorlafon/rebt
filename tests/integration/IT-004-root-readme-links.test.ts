/**
 * IT-004: Verify root README links to docs
 * Steps:
 *   1. Read root README.md content
 *   2. Assert it contains a link to docs/README.md (e.g. [Documentación](docs/README.md) or equivalent)
 */
import { describe, test, expect } from "bun:test";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

const ROOT = join(import.meta.dir, "../..");

describe("IT-004: root README links to docs", () => {
  test("Step 1: root README.md exists", () => {
    const path = join(ROOT, "README.md");
    expect(existsSync(path)).toBe(true);
  });

  test("Step 2: README contains link to docs/README.md", () => {
    const path = join(ROOT, "README.md");
    const content = readFileSync(path, "utf-8");
    // Match [text](docs/README.md) or similar markdown link
    expect(content).toMatch(/docs\/README\.md/);
  });
});
