/**
 * US-007: Create docs index and root README link
 * Verifies docs/README.md exists as index, links to all doc files,
 * root README has Documentación/Documentation section with link to docs/README.md,
 * and all index links resolve to existing files.
 */
import { describe, test, expect } from "bun:test";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

const ROOT = join(import.meta.dir, "..");
const DOCS = join(ROOT, "docs");

const EXPECTED_DOCS = [
  "architecture.md",
  "database-schema.md",
  "setup.md",
  "api-flows.md",
  "contributing.md",
];

describe("US-007: docs index and root README link", () => {
  test("docs/README.md exists as index", () => {
    const path = join(DOCS, "README.md");
    expect(existsSync(path)).toBe(true);
    const content = readFileSync(path, "utf-8");
    expect(content.length).toBeGreaterThan(0);
  });

  test("docs/README.md links to architecture.md, database-schema.md, setup.md, api-flows.md, contributing.md", () => {
    const content = readFileSync(join(DOCS, "README.md"), "utf-8");
    for (const doc of EXPECTED_DOCS) {
      expect(content).toMatch(new RegExp(`\\(${doc.replace(".", "\\.")}\\)|\\(./${doc.replace(".", "\\.")}\\)`));
    }
  });

  test("root README.md has Documentación or Documentation section with link to docs/README.md", () => {
    const content = readFileSync(join(ROOT, "README.md"), "utf-8");
    expect(content).toMatch(/Documentaci[oó]n|Documentation/i);
    expect(content).toMatch(/docs\/README\.md/);
  });

  test("all index links resolve to existing files", () => {
    const indexPath = join(DOCS, "README.md");
    expect(existsSync(indexPath)).toBe(true);

    for (const doc of EXPECTED_DOCS) {
      const targetPath = join(DOCS, doc);
      expect(existsSync(targetPath)).toBe(true);
    }
  });
});
