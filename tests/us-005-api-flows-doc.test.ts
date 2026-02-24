/**
 * US-005: Document API and data flows
 * Verifies docs/api-flows.md exists with Supabase client vs server, data fetching, server actions.
 */
import { describe, test, expect } from "bun:test";
import { existsSync } from "fs";
import { readFileSync } from "fs";
import { join } from "path";

const ROOT = join(import.meta.dir, "..");

describe("US-005: API and data flows documentation", () => {
  test("docs/api-flows.md exists", () => {
    const path = join(ROOT, "docs", "api-flows.md");
    expect(existsSync(path)).toBe(true);
  });

  test("api-flows.md has Supabase client vs server usage section", () => {
    const content = readFileSync(join(ROOT, "docs", "api-flows.md"), "utf-8");
    expect(content).toMatch(/Supabase.*client.*server|client vs server|Client vs Server/i);
    expect(content).toMatch(/server\.ts|client\.ts|middleware\.ts/);
    expect(content).toMatch(/createServerClient|createBrowserClient/);
  });

  test("api-flows.md has data fetching sections for sections, ITCs, and quiz", () => {
    const content = readFileSync(join(ROOT, "docs", "api-flows.md"), "utf-8");
    expect(content).toMatch(/section|rebt_sections/i);
    expect(content).toMatch(/ITC|rebt_itc/i);
    expect(content).toMatch(/quiz|quiz_questions/i);
  });

  test("api-flows.md mentions server actions (applicable or not)", () => {
    const content = readFileSync(join(ROOT, "docs", "api-flows.md"), "utf-8");
    expect(content).toMatch(/server action|Server Action/i);
  });

  test("api-flows.md content reflects src/lib/supabase/ and app usage", () => {
    const content = readFileSync(join(ROOT, "docs", "api-flows.md"), "utf-8");
    expect(content).toMatch(/src\/lib\/supabase/);
    expect(content).toMatch(/estudiar|itc|quiz/);
    expect(content).toMatch(/@\/lib\/supabase\/server|@\/lib\/supabase\/client/);
  });
});
