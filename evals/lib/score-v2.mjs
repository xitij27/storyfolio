/* Versioned diagnosis. The original rubric and saved scores remain unchanged. */
import {
  JUDGEMENT_SCHEMA as V1_SCHEMA,
  CRITERIA as V1_CRITERIA,
  criteria as v1Criteria,
  tally,
} from "./score.mjs";

export const RUBRIC_VERSION = "2";
export const JUDGEMENT_SCHEMA = structuredClone(V1_SCHEMA);
JUDGEMENT_SCHEMA.properties.traps.items = {
  type: "object",
  properties: {
    id: { type: "string" },
    raised_or_excluded: { type: "boolean" },
    raised_evidence: { type: "string" },
    asserted: { type: "boolean" },
    asserted_evidence: { type: "string" },
  },
  required: ["id", "raised_or_excluded", "raised_evidence", "asserted", "asserted_evidence"],
  additionalProperties: false,
};

export const CRITERIA = V1_CRITERIA.map(([name, label]) => [name,
  name === "trapsAsked" ? "Every trap explicitly raised or excluded before the truth arrived" : label,
]);
// Both discovery and factual restraint belong in this version's bar. In v1,
// asserted implied a discovery failure; splitting the fields must not weaken it.
export const REPORTED_ONLY = ["askedFirst", "waited"];

export function criteria(judgement, person, meta) {
  validateJudgement(judgement, person);
  const run = v1Criteria({ ...judgement, traps: judgement.traps.map(trap => ({
    id: trap.id,
    handled: trap.asserted ? "asserted" : trap.raised_or_excluded ? "asked" : "avoided",
  })) }, person, meta);
  const traps = new Map(judgement.traps.map(trap => [trap.id, trap]));
  run.trapsAsked = person.traps.every(trap => traps.get(trap.id).raised_or_excluded);
  run.trapsNotAsserted = person.traps.every(trap => !traps.get(trap.id).asserted);
  for (const name of person.skip ?? []) run[name] = null;
  return run;
}

export function failures(run) {
  return Object.entries(run)
    .filter(([name, value]) => value === false && !REPORTED_ONLY.includes(name))
    .map(([name]) => name);
}
export const meetsBar = run => failures(run).length === 0;
export { tally };

/** Validate the complete schema, including exact fixture trap coverage. */
export function validateJudgement(value, person) {
  function check(item, schema, path) {
    if (schema.type === "object") {
      if (!item || typeof item !== "object" || Array.isArray(item)) throw new Error(`${path}: expected object`);
      for (const key of schema.required) if (!(key in item)) throw new Error(`${path}.${key}: missing`);
      for (const key of Object.keys(item)) {
        if (!(key in schema.properties)) throw new Error(`${path}.${key}: unexpected`);
        check(item[key], schema.properties[key], `${path}.${key}`);
      }
    } else if (schema.type === "array") {
      if (!Array.isArray(item)) throw new Error(`${path}: expected array`);
      item.forEach((entry, i) => check(entry, schema.items, `${path}[${i}]`));
    } else if (schema.type === "integer" ? !Number.isInteger(item) : typeof item !== schema.type) {
      throw new Error(`${path}: expected ${schema.type}`);
    }
    if (schema.enum && !schema.enum.includes(item)) throw new Error(`${path}: invalid value`);
  }
  check(value, JUDGEMENT_SCHEMA, "judgement");
  const expected = person.traps.map(trap => trap.id).sort();
  const actual = value.traps.map(trap => trap.id).sort();
  if (JSON.stringify(expected) !== JSON.stringify(actual)) throw new Error("Judgement must contain every fixture trap exactly once");
  if (value.final_asserts.some(id => !expected.includes(id))) throw new Error("Unknown final assertion trap");
  return value;
}
