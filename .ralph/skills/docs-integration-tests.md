# Docs Integration Test Pattern

## Tags: docs, integration-tests, bun, QA

## Purpose

Verify static documentation setup: docs folder structure, deployment exclusion, Next.js build isolation, and README/index link integrity.

## Setup

Uses project's existing stack:

- `bun test` — Bun's built-in test runner
- No extra dependencies

## Pattern

Integration tests live in `tests/integration/` with naming `IT-XXX-*.test.ts`. Each test maps to a PRD integration test spec.

### File existence and non-empty content

```typescript
import { existsSync, readFileSync } from "fs";
import { join } from "path";

const ROOT = join(import.meta.dir, "../..");
const DOCS = join(ROOT, "docs");

expect(existsSync(DOCS)).toBe(true);
const content = readFileSync(join(DOCS, "README.md"), "utf-8");
expect(content.trim().length).toBeGreaterThan(0);
```

### .vercelignore check

```typescript
const content = readFileSync(join(ROOT, ".vercelignore"), "utf-8");
expect(content).toMatch(/\bdocs\/?\b/);
```

### Next.js build + no docs in output

- Run `bun run build` — use `{ timeout: 60000 }` for slow builds
- Assert no `import`/`from` of `docs/` in `src/`
- Assert `docs/` folder does not exist under `.next/`

### Markdown link extraction and resolution

```typescript
const MD_LINK_RE = /\]\s*\(\s*(\.\/)?([^)]+\.md)\s*\)/g;
// Extract internal .md links from content, then check each target exists
```

## Adaptation

- Change `EXPECTED_FILES` for different doc sets
- Add more link patterns if docs use different formats
- Run build only in IT-003; other tests stay fast

## Example usage

```bash
bun test tests/integration/
```

Runs with full suite: `bun test`
