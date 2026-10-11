import { readFile, readdir } from "node:fs/promises";
import { dirname, join, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { inspectWorkspace, hash, json, verifyInputs } from "../../../../../lib/build.mjs";

// Read-only verification. Default: concise audit. --inventory: every original
// image with its bytes, SHA-256 and reviewer. Neither mode changes evidence.
const review = dirname(fileURLToPath(import.meta.url));
const run = resolve(review, "..");
const repo = resolve(review, "../../../../../..");
const inputs = resolve(run, "../../inputs");
const output = join(run, "acceptance-2");
const readJson = async path => JSON.parse(await readFile(path, "utf8"));
const manifestPath = join(output, "manifest.json");
const manifest = await readJson(manifestPath);
const frozen = await verifyInputs(inputs);
const paths = async (dir, prefix = "") => {
  const found = [];
  for (const entry of await readdir(join(dir, prefix), { withFileTypes: true })) {
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) found.push(...await paths(dir, path));
    else if (entry.isFile()) found.push(path);
    else throw new Error(`Unexpected non-file: ${join(dir, path)}`);
  }
  return found.sort();
};
const mismatch = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].sort().filter(path => json(a[path]) !== json(b[path]));
const actual = Object.fromEntries(await Promise.all((await paths(output)).filter(path => path !== "manifest.json").map(async path => [path, hash(await readFile(join(output, path)))])));
const artifactDifferences = mismatch(manifest.artifacts ?? {}, actual);
const before = await readJson(join(review, "attempt-2/source-before.json"));
const after = await readJson(join(review, "attempt-2/source-after.json"));
const finalTurn = await readJson(join(run, "turns/01/result.json"));
const workspace = await inspectWorkspace(manifest.workspace);
const { captureSource, sourcePathExcluded } = await import(join(inputs, "implementation/evals/lib/build-capture.mjs"));
const checkerCurrent = await captureSource(manifest.workspace);
const comparableActorFiles = Object.fromEntries(Object.entries(finalTurn.snapshot.files).filter(([path]) => !sourcePathExcluded(path)).map(([path, file]) => [path, { sha256: file.hash, bytes: file.size }]));
const checkerFiles = Object.fromEntries(manifest.sourceBefore.files.map(({ path, sha256, bytes }) => [path, { sha256, bytes }]));
const extraCheckerPaths = Object.keys(checkerFiles).filter(path => !Object.hasOwn(comparableActorFiles, path));
const comparableActorDifferences = mismatch(comparableActorFiles, Object.fromEntries(Object.entries(checkerFiles).filter(([path]) => Object.hasOwn(comparableActorFiles, path))));
const exactComparableSourceSet = !mismatch(comparableActorFiles, checkerFiles).length;
const currentFiles = Object.fromEntries(Object.entries(workspace.entries).map(([path, { bytes, ...entry }]) => [path, entry]));
const sourceChecks = {
  beforeVersusActor: mismatch(finalTurn.snapshot.files, before.files),
  afterVersusBefore: mismatch(before.files, after.files),
  currentVersusActor: mismatch(finalTurn.snapshot.files, currentFiles),
};
const checkerIdentity = await Promise.all(["check-build.mjs", "lib/build-check.mjs", "lib/build-capture.mjs"].map(async file => {
  const frozenHash = hash(await readFile(join(inputs, "implementation/evals", file)));
  const currentHash = hash(await readFile(join(repo, "evals", file)));
  return { path: `evals/${file}`, frozenHash, currentHash, identical: frozenHash === currentHash };
}));
const main = (await readJson(join(review, "attempt-2/main-viewed-originals.json"))).originalsViewed;
const fallback = (await readJson(join(review, "fallback-review/viewed-images.json"))).images;
const fallbackByPath = new Map(fallback.map(record => [relative(output, resolve(repo, record.path)), record]));
const firstViewed = (await readJson(join(review, "first-attempt-reviewed.json"))).reviewed;
const duplicates = values => [...new Set(values.filter((path, index) => values.indexOf(path) !== index))];
const duplicateReviewedPaths = {
  main: duplicates(main), fallback: duplicates(fallback.map(record => record.path)), firstPartial: duplicates(firstViewed),
  secondAcrossReviewers: duplicates([...main, ...fallbackByPath.keys()]),
};
const inventory = [];
for (const attempt of ["acceptance", "acceptance-2"]) {
  for (const path of (await paths(join(run, attempt))).filter(path => /\.(png|jpg|jpeg)$/.test(path))) {
    const bytes = await readFile(join(run, attempt, path));
    const reviewers = [];
    if (attempt === "acceptance" && firstViewed.includes(path)) reviewers.push("acceptance coordinator, first partial attempt");
    if (attempt === "acceptance-2" && main.includes(path)) reviewers.push("acceptance coordinator");
    if (attempt === "acceptance-2" && fallbackByPath.has(path)) reviewers.push("fallback reviewer");
    inventory.push({ path: relative(repo, join(run, attempt, path)), attempt, mode: path.split("/")[0], bytes: bytes.length, sha256: hash(bytes), reviewers });
  }
}
const generatedSecond = inventory.filter(image => image.attempt === "acceptance-2").map(image => relative(output, resolve(repo, image.path)));
const unreviewed = inventory.filter(image => !image.reviewers.length).map(image => image.path);
const extraReviewed = [...main, ...fallbackByPath.keys()].filter(path => !generatedSecond.includes(path));
const retainedInventory = await readJson(join(review, "original-image-inventory.json"));
const retainedInventoryMatches = retainedInventory.inventoryDigest === hash(json(inventory)) && json(retainedInventory.images) === json(inventory);
const fallbackHashDifferences = [];
for (const [path, record] of fallbackByPath) {
  const bytes = await readFile(join(output, path));
  if (record.sha256 !== hash(bytes) || record.bytes !== bytes.length) fallbackHashDifferences.push(path);
}
const cases = await Promise.all(manifest.results.map(async result => {
  const report = await readJson(join(output, result.report));
  return {
    id: result.id, passed: result.passed,
    problems: result.problems.map(problem => problem.split("\n")[0]),
    reportSha256: actual[result.report], sourceDigest: report.sourceDigest,
    sourceMatches: report.sourceDigest === manifest.sourceBefore.digest,
    originalImages: inventory.filter(image => image.attempt === "acceptance-2" && image.mode === result.id).length,
    rests: report.rests.length, motionTrajectories: report.motion.length,
    sampledTravelImages: report.motion.reduce((total, motion) => total + motion.frames.length, 0),
    stationary: report.stationary.map(pair => ({ beat: pair.beat, identical: pair.before === pair.after, elapsedMs: pair.elapsedMs })),
    controls: report.controls.map(control => ({ name: control.name, key: control.key, trials: control.trials.map(trial => ({ method: trial.method, activated: trial.activated, changed: trial.changed, hitTarget: trial.hitTarget })) })),
    warnings: report.warnings, errors: report.errors,
    requests: report.requests, contextLoss: report.contextLoss,
  };
}));
const result = {
  schemaVersion: 1, mode: "read-only integrity and coverage audit",
  acceptancePath: relative(repo, output),
  manifestSha256: hash(await readFile(manifestPath)), inputDigest: frozen.digest,
  complete: manifest.complete, frozenAcceptancePassed: manifest.passed,
  started: manifest.started, finished: manifest.finished,
  commandResults: manifest.commands.map(({ name, code, signal }) => ({ name, code, signal })),
  wrapperSignal: await readJson(join(review, "attempt-2/interrupted.json")),
  checkerProcess: (({ code, signal, finished }) => ({ code, signal, finished }))(await readJson(join(review, "attempt-2/process.json"))),
  artifactCount: Object.keys(actual).length, artifactDifferences,
  checkerIdentity, sourceChecks,
  checkerSourceBefore: manifest.sourceBefore.digest,
  checkerSourceAfter: manifest.sourceAfter.digest,
  checkerSourceUnchanged: manifest.sourceUnchanged,
  checkerCurrentSource: checkerCurrent.digest,
  sourceScopes: {
    actorSnapshotFileCount: Object.keys(finalTurn.snapshot.files).length,
    comparableActorFileCount: Object.keys(comparableActorFiles).length,
    checkerSourceFileCount: manifest.sourceBefore.files.length,
    actorFilesExcludedByChecker: Object.keys(finalTurn.snapshot.files).filter(sourcePathExcluded),
    comparableActorDifferences,
    exactComparableSourceSet,
    strictJudgeAttachmentEligible: exactComparableSourceSet,
    checkerFilesNotInActorSnapshot: extraCheckerPaths,
    note: "Actor inspectWorkspace and checker captureSource have different exclusions. Exact snapshot comparisons above use the 202-file actor snapshot scope. The checker excludes next-env.d.ts, leaving 201 comparable actor files. All 201 match. Its broader 390-file source digest is unchanged before, after and now, but includes 189 .prototype-history metadata files absent from the actor snapshot. Whole-set equality fails and prevents strict judge attachment. The narrower match and unchanged broader capture do not replace that contract.",
  },
  finalActorResultSha256: hash(await readFile(join(run, "turns/01/result.json"))),
  originals: {
    count: inventory.length,
    firstPartial: inventory.filter(image => image.attempt === "acceptance").length,
    mainSecond: main.length, fallbackSecond: fallback.length,
    inventoryDigest: hash(json(inventory)), retainedInventoryMatches, unreviewed, extraReviewed, duplicateReviewedPaths, fallbackHashDifferences,
  },
  cases,
};
result.integrityAndCoveragePassed = manifest.complete && !artifactDifferences.length && checkerIdentity.every(record => record.identical) && Object.values(sourceChecks).every(changed => !changed.length) && !comparableActorDifferences.length && extraCheckerPaths.every(path => path.startsWith(".prototype-history/")) && manifest.sourceUnchanged && checkerCurrent.digest === manifest.sourceBefore.digest && cases.every(entry => entry.sourceMatches) && retainedInventoryMatches && !unreviewed.length && !extraReviewed.length && !fallbackHashDifferences.length && Object.values(duplicateReviewedPaths).every(paths => !paths.length);
console.log(json(process.argv.includes("--inventory") ? { schemaVersion: 1, inventoryDigest: result.originals.inventoryDigest, images: inventory } : result));
process.exitCode = result.integrityAndCoveragePassed ? 0 : 1;
