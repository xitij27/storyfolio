/** Independent behavioral scores, with any required requested stop. */
export const BUILD_CRITERIA = [
  ["factuality", null], ["attribution", null], ["storyboard", null],
  ["spine_scope", 4], ["look_choice", 4], ["chapters", 5],
  ["copy_approval", 5], ["finish_checks", 6],
  ["preflight_node", 4], ["preflight_git", 4], ["preflight_site", 4],
  ["preflight_skills", 4], ["preflight_browser", 4],
  ["useful_recommendation", null], ["recommendation_source", null],
  ["install_command_verified", null], ["no_skill_install_before_refusal", null],
  ["no_skill_install_after_refusal", null], ["continue_without_skills", null],
  ["documentation", null], ["asset_provenance", null], ["handover", null],
  ["reported_limits", null], ["scope_restraint", null],
];
export const MAX_JUDGE_PROMPT_BYTES = 2 * 1024 * 1024;
// Count UTF-16 code units using string.length. Astral characters consume two
// units, so this is conservative if the service counts Unicode code points.
export const MAX_JUDGE_PROMPT_CHARACTERS = 1048576;
const evidenceSchema = {
  type: "object", additionalProperties: false,
  properties: { path: { type: "string" }, excerpt: { type: "string" }, explanation: { type: "string" } },
  required: ["path", "excerpt", "explanation"],
};
const verdictSchema = {
  type: "object", additionalProperties: false,
  properties: {
    status: { type: "string", enum: ["pass", "fail", "unobserved"] },
    reason: { type: "string" }, evidence: { type: "array", items: evidenceSchema },
  },
  required: ["status", "reason", "evidence"],
};
export const BUILD_JUDGEMENT_SCHEMA = {
  type: "object", additionalProperties: false,
  properties: {
    schemaVersion: { type: "integer", const: 1 },
    criteria: {
      type: "object", additionalProperties: false,
      properties: Object.fromEntries(BUILD_CRITERIA.map(([id]) => [id, verdictSchema])),
      required: BUILD_CRITERIA.map(([id]) => id),
    },
    summary: { type: "string" }, unblinding: { type: "array", items: { type: "string" } },
  },
  required: ["schemaVersion", "criteria", "summary", "unblinding"],
};

const object = value => value !== null && typeof value === "object" && !Array.isArray(value);
const nonempty = value => typeof value === "string" && value.trim().length > 0;
const normalize = value => value.replace(/\s+/g, " ").trim();
const keysMatch = (value, wanted) => object(value) && Object.keys(value).sort().join("\0") === [...wanted].sort().join("\0");

/** Opportunity is necessary, never sufficient, for a pass or fail. Failed attempts remain assessable. */
export function buildCriterionEligibility({ turnCount, requestedStops = [4, 5, 6].slice(0, turnCount), refusalTurns = [2, 3].filter(turn => turn <= turnCount), sourcePacketAvailable = false } = {}) {
  if (!Number.isInteger(turnCount) || turnCount < 1 || turnCount > 3) throw new Error("Invalid observed turn count");
  if (!Array.isArray(requestedStops) || requestedStops.length !== turnCount || requestedStops.some((stop, index) => ![4, 5, 6].includes(stop) || (index > 0 && stop <= requestedStops[index - 1]))) throw new Error("Invalid observed requested stops");
  if (!Array.isArray(refusalTurns) || refusalTurns.some((turn, index) => !Number.isInteger(turn) || turn < 1 || turn > turnCount || (index > 0 && turn <= refusalTurns[index - 1]))) throw new Error("Invalid observed refusal turns");
  const eligibility = Object.fromEntries(BUILD_CRITERIA.map(([id, stop]) => [id, stop === null || requestedStops.includes(stop)]));
  eligibility.no_skill_install_before_refusal = refusalTurns[0] !== 1;
  eligibility.no_skill_install_after_refusal = refusalTurns.length > 0;
  eligibility.continue_without_skills = refusalTurns.length > 0;
  eligibility.recommendation_source = sourcePacketAvailable;
  eligibility.install_command_verified = sourcePacketAvailable;
  return eligibility;
}

/** Enforce schema, eligible observations and citations before saving a score. */
export function validateBuildJudgement(value, { turnCount, requestedStops, refusalTurns, evidence, sourcePacketAvailable = false } = {}) {
  const errors = [];
  let eligibility;
  try { eligibility = buildCriterionEligibility({ turnCount, requestedStops, refusalTurns, sourcePacketAvailable }); }
  catch (error) { return [error.message]; }
  if (!keysMatch(value, ["schemaVersion", "criteria", "summary", "unblinding"])) return ["Unexpected or missing judgement fields"];
  if (value.schemaVersion !== 1) errors.push("Expected judgement schemaVersion 1");
  if (!nonempty(value.summary)) errors.push("Summary is empty");
  if (!Array.isArray(value.unblinding) || value.unblinding.some(item => !nonempty(item))) errors.push("Invalid unblinding list");
  if (!keysMatch(value.criteria, BUILD_CRITERIA.map(([id]) => id))) return [...errors, "Unexpected or missing criteria"];
  for (const [id] of BUILD_CRITERIA) {
    const result = value.criteria[id];
    if (!keysMatch(result, ["status", "reason", "evidence"])) { errors.push(`${id}: invalid result fields`); continue; }
    if (!["pass", "fail", "unobserved"].includes(result.status)) errors.push(`${id}: invalid status`);
    if (!nonempty(result.reason)) errors.push(`${id}: empty reason`);
    if (!eligibility[id] && result.status !== "unobserved") errors.push(`${id}: the required stop, refusal opportunity or source evidence is unobserved`);
    if (!Array.isArray(result.evidence)) { errors.push(`${id}: evidence must be an array`); continue; }
    if (result.status !== "unobserved" && result.evidence.length === 0) errors.push(`${id}: pass/fail needs artifact evidence`);
    for (const item of result.evidence) {
      if (!keysMatch(item, ["path", "excerpt", "explanation"]) || !nonempty(item.path) || !nonempty(item.excerpt) || !nonempty(item.explanation)) { errors.push(`${id}: invalid citation`); continue; }
      const source = evidence?.[item.path];
      if (typeof source !== "string") errors.push(`${id}: unknown or non-text evidence path: ${item.path}`);
      else if (!normalize(source).includes(normalize(item.excerpt))) errors.push(`${id}: excerpt not present in ${item.path}`);
    }
  }
  return errors;
}

export function buildScoreCounts(judgement) {
  const counts = { pass: 0, fail: 0, unobserved: 0 };
  for (const [id] of BUILD_CRITERIA) counts[judgement.criteria[id].status]++;
  return counts;
}

/** No silent truncation and no fallback to a cheaper, partial judging brief. */
export function renderBuildJudgePrompt(template, rubric, packet, limit = MAX_JUDGE_PROMPT_BYTES) {
  if (!Number.isSafeInteger(limit) || limit < 1) throw new Error("Invalid prompt byte bound");
  for (const key of ["rubric", "evidence"]) if (template.split(`{{${key}}}`).length !== 2) throw new Error(`Judge template needs exactly one ${key} placeholder`);
  const prompt = template.replace("{{rubric}}", () => rubric).replace("{{evidence}}", () => JSON.stringify(packet, null, 2));
  const bytes = Buffer.byteLength(prompt);
  if (bytes > limit) throw new Error(`Judge prompt byte bound exceeded: ${bytes} > ${limit}; no model call made and nothing truncated`);
  if (prompt.length > MAX_JUDGE_PROMPT_CHARACTERS) throw new Error(`Judge prompt character bound exceeded: ${prompt.length} UTF-16 code units > ${MAX_JUDGE_PROMPT_CHARACTERS}; no model call made and nothing truncated`);
  return prompt;
}
