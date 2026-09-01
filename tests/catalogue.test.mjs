import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const registry = JSON.parse(readFileSync(new URL("../portfolio/products.json", import.meta.url), "utf8"));
const page = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");

test("every portfolio product is rendered from the registry", () => {
  assert.match(page, /registry\.products/);
  assert.equal(registry.products.filter((product) => product.id !== "portfolio").length, 9);
});

test("only evidenced canonical surfaces are live links", () => {
  const live = registry.products.flatMap((product) => product.surfaces).filter((surface) => surface.state === "live");
  assert.ok(live.length > 0);
  for (const surface of live) {
    assert.equal(surface.canonical, true);
    assert.ok(surface.provider);
    assert.ok(surface.evidence);
  }
});
