import assert from "node:assert/strict";
import { test } from "node:test";
import { blankFormation } from "./formation.ts";
import { pieceOnScreen, type ProjectionView } from "./overlay.ts";

const identity = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
const view: ProjectionView = { distance: 10, fov: 90, aspect: 2, fromStack: identity };
const close = (actual: number[], expected: number[]) => actual.forEach((value, index) => assert.ok(Math.abs(value - expected[index]) < 1e-9, `${actual} differs from ${expected}`));

test("projects the piece centre and both half axes for a DOM transform", () => {
  const pose = blankFormation(1).pieces[0];
  pose.size = [4, 6];
  pose.position = [2, 3, 0];
  const out: number[] = [];
  assert.equal(pieceOnScreen(out, pose, view), out);
  close(out, [0.1, 0.3, 0.1, 0, 0, 0.3]);
});

test("projection follows formation translation and piece rotation", () => {
  const pose = blankFormation(1).pieces[0];
  pose.size = [4, 6];
  pose.rotation[2] = Math.PI / 2;
  const translated = [...identity];
  translated[12] = 2;
  translated[13] = 3;
  translated[14] = 5;
  close(pieceOnScreen([], pose, { ...view, fromStack: translated }), [0.2, 0.6, 0, 0.4, -0.3, 0]);
});

test("turning in depth accounts for perspective instead of a fixed scale", () => {
  const pose = blankFormation(1).pieces[0];
  pose.size = [4, 6];
  pose.rotation[1] = Math.PI / 3;
  const projected = pieceOnScreen([], pose, view);
  const left = -1 / ((10 - Math.sqrt(3)) * 2);
  const right = 1 / ((10 + Math.sqrt(3)) * 2);
  assert.ok(Math.abs(projected[2] - (right - left) / 2) < 1e-9);
});

test("pieces behind the camera produce nonfinite coordinates so links can be hidden", () => {
  const pose = blankFormation(1).pieces[0];
  pose.position[2] = 11;
  assert.ok(pieceOnScreen([], pose, view).every(Number.isNaN));
});
