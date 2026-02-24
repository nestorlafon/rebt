/**
 * IT-005: Verify docs index links resolve to existing files
 * Steps:
 *   1. Parse docs/README.md and extract internal links (architecture.md, database-schema.md, etc.)
 *   2. For each link, verify target file exists under docs/
 */
import { describe, test, expect } from "bun:test";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

const ROOT = join(import.meta.dir, "../..");
const DOCS = join(ROOT, "docs");

// Match markdown links: [text](path) where path is relative (architecture.md, ./setup.md, etc.)
const MD_LINK_RE = /\]\s*\(\s*(\.\/)?([^)]+\.md)\s*\)/g;

function extractInternalLinks(content: string): string[] {
  const links: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = MD_LINK_RE.exec(content)) !== null) {
    const target = m[2]; // e.g. architecture.md or setup.md
    if (!target.startsWith("http") && !target.startsWith("www")) {
      links.push(target);
    }
  }
  return [...new Set(links)];
}

describe("IT-005: docs index links resolve to existing files", () => {
  test("Step 1: parse docs/README.md and extract internal links", () => {
    const indexPath = join(DOCS, "README.md");
    expect(existsSync(indexPath)).toBe(true);
    const content = readFileSync(indexPath, "utf-8");
    const links = extractInternalLinks(content);
    expect(links.length).toBeGreaterThan(0);
  });

  test("Step 2: each extracted link targets an existing file under docs/", () => {
    const indexPath = join(DOCS, "README.md");
    const content = readFileSync(indexPath, "utf-8");
    const links = extractInternalLinks(content);

    for (const link of links) {
      const targetPath = join(DOCS, link.replace(/^\.\//, ""));
      expect(existsSync(targetPath)).toBe(true);
    }
  });
});
