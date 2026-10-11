/** Independent behavioral scores. Automatic acceptance remains separate. */
export const BUILD_CRITERIA = [
  ["factuality", 1], ["attribution", 1], ["storyboard", 1],
  ["spine_scope", 1], ["look_choice", 1], ["chapters", 2],
  ["copy_approval", 2], ["finish_checks", 3],
  ["preflight_node", 1], ["preflight_git", 1], ["preflight_site", 1],
  ["preflight_skills", 1], ["preflight_browser", 1],
  ["useful_recommendation", 1], ["recommendation_source", 1],
  ["install_command_verified", 1], ["no_skill_install_before_refusal", 1],
  ["no_skill_install_after_refusal", 2], ["continue_without_skills", 2],
  ["documentation", 1], ["asset_provenance", 1], ["handover", 1],
  ["reported_limits", 1], ["scope_restraint", 1],
];
export const MAX_JUDGE_PROMPT_BYTES = 2 * 1024 * 1024;
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

/** Enforce schema, eligible observations and citations before saving a score. */
export function validateBuildJudgement(value, { turnCount, evidence, sourcePacketAvailable = false } = {}) {
  const errors = [];
  if (!Number.isInteger(turnCount) || turnCount < 1 || turnCount > 3) return ["Invalid observed turn count"];
  if (!keysMatch(value, ["schemaVersion", "criteria", "summary", "unblinding"])) return ["Unexpected or missing judgement fields"];
  if (value.schemaVersion !== 1) errors.push("Expected judgement schemaVersion 1");
  if (!nonempty(value.summary)) errors.push("Summary is empty");
  if (!Array.isArray(value.unblinding) || value.unblinding.some(item => !nonempty(item))) errors.push("Invalid unblinding list");
  if (!keysMatch(value.criteria, BUILD_CRITERIA.map(([id]) => id))) return [...errors, "Unexpected or missing criteria"];
  for (const [id, minimumTurn] of BUILD_CRITERIA) {
    const result = value.criteria[id];
    if (!keysMatch(result, ["status", "reason", "evidence"])) { errors.push(`${id}: invalid result fields`); continue; }
    if (!["pass", "fail", "unobserved"].includes(result.status)) errors.push(`${id}: invalid status`);
    if (!nonempty(result.reason)) errors.push(`${id}: empty reason`);
    if (turnCount < minimumTurn && result.status !== "unobserved") errors.push(`${id}: the required stop was not reached`);
    if (!sourcePacketAvailable && ["recommendation_source", "install_command_verified"].includes(id) && result.status !== "unobserved") errors.push(`${id}: external source verification is unavailable`);
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
  return prompt;
}
