// Read-only extraction of actual recorded observations, not reassessment.
import { readFile } from "node:fs/promises";
const report = JSON.parse(await readFile(new URL("desktop/artifacts/desktop/report.json", import.meta.url)));
const pick = value => value && ({ scroll: value.scroll, scrollX: value.scrollX, geometry: value.geometry, viewport: value.viewport,
  visible: value.visible, inView: value.inView, focused: value.focused, hitTarget: value.hitTarget, state: value.state,
  targets: value.targets?.map(target => ({ id: target.id, exists: target.exists, visible: target.visible, inView: target.inView })) });
const settlement = value => value && ({ settled: value.settled, elapsedMs: value.elapsedMs, stableForMs: value.stableForMs,
  policy: value.policy, error: value.error, observations: value.trajectory.length, last: value.trajectory.at(-1) });
const controls = report.controls.map(control => ({ key: control.key, name: control.name, selector: control.selector, tag: control.tag,
  role: control.role, href: control.href, observedScroll: control.observedScroll,
  trials: control.trials.map(trial => ({ method: trial.method, reached: trial.reached, tabPresses: trial.tabPresses, activated: trial.activated,
    changed: trial.changed, error: trial.error, applicability: trial.applicability, targets: trial.targets, responseStatus: trial.responseStatus,
    before: pick(trial.before), beforeImageObservation: pick(trial.beforeImageObservation), after: pick(trial.after), afterImageObservation: pick(trial.afterImageObservation),
    preActivationSettlement: settlement(trial.preActivationSettlement), postActivationSettlement: settlement(trial.postActivationSettlement),
    peerPreparation: trial.peerPreparation && { ...trial.peerPreparation, settlement: settlement(trial.peerPreparation.settlement) } })) }));
console.log(JSON.stringify({ problems: report.problems, requests: report.requests, warnings: report.warnings, errors: report.errors, controls }, null, 2));
