import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  TUNED_HEIGHT,
  bandFit,
  bandShare,
  cameraDistance,
  overAnchor,
  overScale,
  roomBeside,
  stageLift,
  viewHalf,
} from "./camera.ts";

const FOV = 35;
const NEAREST = 11;
const PHONE = 390 / 844;

describe("cameraDistance", () => {
  test("stays at its nearest on a wide screen", () => {
    assert.equal(cameraDistance(8.4, 3.6, 1.6, 1, 1, FOV, NEAREST), NEAREST);
  });

  test("pulls back on a phone for something wide", () => {
    const z = cameraDistance(8.4, 3.6, PHONE, 1, 0.45, FOV, NEAREST);
    assert.ok(z > 30 && z < 36, String(z));
  });

  test("does not pull back on a phone for something small", () => {
    assert.equal(cameraDistance(2.6, 2.3, PHONE, 1, 0.5, FOV, NEAREST), NEAREST);
  });

  test("pulls back when the caption leaves only a short band for the scene", () => {
    const z = cameraDistance(2.6, 2.3, PHONE, 1, 0.2, FOV, NEAREST);
    assert.ok(z > 18, String(z));
  });

  test("fits the whole width on screen, with a margin", () => {
    const z = cameraDistance(8.4, 3.6, PHONE, 1, 0.45, FOV, NEAREST);
    const visible = 2 * z * Math.tan((FOV * Math.PI) / 360) * PHONE;
    assert.ok(visible > 8.4 * 1.1 && visible < 8.4 * 1.2, String(visible));
  });

  test("falls back to its nearest for a screen with no size", () => {
    assert.equal(cameraDistance(8.4, 3.6, 0, 1, 1, FOV, NEAREST), NEAREST);
    assert.equal(cameraDistance(8.4, 3.6, Number.NaN, 1, 1, FOV, NEAREST), NEAREST);
  });
});

describe("cameraDistance with room on one side only", () => {
  test("pulls back for something pushed to one side of the screen", () => {
    const centred = cameraDistance(4, 2, 1.6, 1, 1, FOV, 2);
    const aside = cameraDistance(4, 2, 1.6, 0.5, 1, FOV, 2);
    assert.ok(Math.abs(aside - centred * 2) < 1e-9);
  });
});

describe("viewHalf", () => {
  test("is half of what the camera sees at a distance", () => {
    const [halfWidth, halfHeight] = viewHalf(10, 90, 2);
    assert.ok(Math.abs(halfHeight - 10) < 1e-9);
    assert.ok(Math.abs(halfWidth - 20) < 1e-9);
  });
});

describe("roomBeside", () => {
  test("is the share of the screen left when something is off centre", () => {
    assert.equal(roomBeside(0), 1);
    assert.equal(roomBeside(0.4), 0.6);
    assert.equal(roomBeside(-0.4), 0.6);
  });

  test("never drops to nothing", () => {
    assert.equal(roomBeside(1), 0.15);
    assert.equal(roomBeside(3), 0.15);
  });
});

describe("bandShare", () => {
  test("is the share of the screen between the header and the caption", () => {
    assert.equal(bandShare(1000, 100, 400), 0.5);
  });

  test("never drops to nothing, however tall the caption", () => {
    assert.equal(bandShare(600, 64, 590), 0.15);
  });

  test("is the whole screen when the screen has no size", () => {
    assert.equal(bandShare(0, 64, 300), 1);
  });
});

describe("bandFit", () => {
  test("leaves the scene as it is where the band is as thick as it is framed for", () => {
    assert.equal(bandFit(1000, 100, 400), 1);
    assert.equal(bandFit(1000, 100, 750), 1);
  });

  test("draws the scene smaller by as much as the band is thinner than that", () => {
    assert.ok(Math.abs(bandFit(1000, 100, 810) - 0.6) < 1e-9);
  });

  test("draws nothing where the caption leaves almost no band, or none", () => {
    assert.equal(bandFit(1000, 100, 870), 0);
    assert.equal(bandFit(700, 142, 600), 0);
  });

  test("leaves the scene as it is when the screen has no size", () => {
    assert.equal(bandFit(0, 64, 300), 1);
  });
});

describe("stageLift", () => {
  test("is zero when the header and the caption take the same room", () => {
    assert.equal(stageLift(800, 100, 100), 0);
  });

  test("raises the scene by half the difference, as a share of the screen", () => {
    assert.equal(stageLift(1000, 100, 500), 0.2);
  });

  test("is zero when the screen has no size", () => {
    assert.equal(stageLift(0, 64, 300), 0);
  });
});

describe("a formation over the caption, on a screen shorter than it was framed for", () => {
  const HEADER = 72;
  const CAPTION = 426;

  test("is left alone on the screen it was framed for, and on a taller one", () => {
    assert.equal(overScale(TUNED_HEIGHT, HEADER, CAPTION), 1);
    assert.equal(overScale(1200, HEADER, CAPTION), 1);
    assert.equal(overAnchor(0.42, TUNED_HEIGHT, HEADER, CAPTION), 0.42);
    assert.equal(overAnchor(0.42, 1200, HEADER, CAPTION), 0.42);
  });

  test("is drawn smaller, by as much as the band above the caption has shrunk", () => {
    const tuned = (TUNED_HEIGHT - HEADER - CAPTION) / TUNED_HEIGHT;
    const now = (720 - HEADER - CAPTION) / 720;
    assert.ok(Math.abs(overScale(720, HEADER, CAPTION) - now / tuned) < 1e-9);
    assert.ok(overScale(720, HEADER, CAPTION) < overScale(800, HEADER, CAPTION));
  });

  test("keeps its place within that band", () => {
    const within = (viewport: number, anchor: number) =>
      (viewport * (0.5 - anchor / 2) - HEADER) / (viewport - HEADER - CAPTION);
    const before = within(TUNED_HEIGHT, 0.42);
    for (const viewport of [860, 800, 720, 660]) {
      const after = within(viewport, overAnchor(0.42, viewport, HEADER, CAPTION));
      assert.ok(Math.abs(after - before) < 1e-9, String(viewport));
    }
  });

  test("so that what cleared the caption there clears it here", () => {
    // Something that takes 30% of the tuned screen's height, centred where
    // an anchor of 0.42 puts it: its foot is above the caption there.
    const size = 0.3;
    const foot = (viewport: number) => {
      const anchor = overAnchor(0.42, viewport, HEADER, CAPTION);
      const scale = overScale(viewport, HEADER, CAPTION);
      return viewport * (0.5 - anchor / 2) + (viewport * size * scale) / 2;
    };
    const head = (viewport: number) => 2 * viewport * (0.5 - overAnchor(0.42, viewport, HEADER, CAPTION) / 2) - foot(viewport);
    assert.ok(foot(TUNED_HEIGHT) < TUNED_HEIGHT - CAPTION);
    for (let viewport = 620; viewport <= TUNED_HEIGHT; viewport += 20) {
      assert.ok(foot(viewport) < viewport - CAPTION, `foot at ${viewport}`);
      assert.ok(head(viewport) > HEADER, `head at ${viewport}`);
    }
  });

  test("is never drawn smaller than four tenths, however little room is left", () => {
    assert.equal(overScale(520, HEADER, CAPTION), 0.4);
  });

  test("is left alone when the screen has no size", () => {
    assert.equal(overScale(0, HEADER, CAPTION), 1);
    assert.equal(overAnchor(0.42, 0, HEADER, CAPTION), 0.42);
    assert.equal(overScale(Number.NaN, HEADER, CAPTION), 1);
  });
});
