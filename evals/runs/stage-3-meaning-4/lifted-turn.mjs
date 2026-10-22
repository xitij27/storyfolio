#!/usr/bin/env node
// Root-only: one rerun-4 turn with only the reported-token ceiling removed, on the author's 22 October decision.
// The frozen inputs and setup probe are verified unchanged; the turn runs on a copy whose case differs only in maxTokens.
import assert from "node:assert/strict";
import { cp, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { parseArgs } from "node:util";
import { executeBuildTurn, hash, json, regularBytes, validateCase, verifyBuildSetupProbe, verifyInputs } from "../../lib/build.mjs";

const root = resolve(import.meta.dirname, "../../..");
const decision = "docs/history/2026-10-22-rerun-4-reported-cap-decision.md";
const out = join(root, "evals/runs/codex-meaning-4/full-journey-1/baseline-1");
const frozen = join(root, "evals/runs/codex-meaning-4/inputs"), lifted = join(root, "evals/runs/codex-meaning-4/inputs-lifted");
const { values } = parseArgs({ options: { turn: { type: "string" }, gate: { type: "string" } } });
const turn = Number(values.turn);
assert.ok([5, 6].includes(turn), "Only turns 5 and 6 are covered by the decision");
await regularBytes(root, decision);

const manifest = await verifyInputs(frozen);
const original = validateCase(JSON.parse(await regularBytes(frozen, "case.json")));
const meta = JSON.parse(await regularBytes(out, "meta.json"));
assert.equal(meta.inputDigest, manifest.digest);
await verifyBuildSetupProbe({ source: original, manifest, setup: join(out, "setup"), work: meta.work });

const source = validateCase({ ...original, bounds: { ...original.bounds, maxTokens: Number.MAX_SAFE_INTEGER } });
try { await verifyInputs(lifted); }
catch {
  await cp(frozen, lifted, { recursive: true, errorOnExist: true, force: false });
  await writeFile(join(lifted, "case.json"), json(source));
  const hashes = { ...manifest.hashes, "case.json": hash(await readFile(join(lifted, "case.json"))) };
  await writeFile(join(lifted, "manifest.json"), json({ ...manifest, hashes, digest: hash(json(hashes)), liftedFrom: manifest.digest, decision }));
  await verifyInputs(lifted);
}
const liftedCase = JSON.parse(await regularBytes(lifted, "case.json"));
assert.deepEqual({ ...liftedCase, bounds: { ...liftedCase.bounds, maxTokens: original.bounds.maxTokens } }, original, "Lifted case differs beyond maxTokens");

const capabilities = JSON.parse(await regularBytes(frozen, "capabilities.json"));
const gate = JSON.parse(await readFile(resolve(values.gate), "utf8"));
const result = await executeBuildTurn({ out, work: meta.work, inputs: lifted, source, capabilities, turn, gate });
console.log(json({ complete: result.complete, turn: result.turn, durationMs: result.durationMs, usage: result.usage, error: result.error ?? result.captureError ?? null }));
