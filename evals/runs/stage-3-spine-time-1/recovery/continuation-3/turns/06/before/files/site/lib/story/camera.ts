/*
  Framing: how far back the camera stands, and how high the scene sits.

  On a wide screen the caption is at the lower left and each formation is
  anchored off centre, so it is framed in the room that leaves. On a narrow one the
  caption takes the lower part of the screen, by an amount that differs from
  beat to beat and language to language, so the scene is fitted into the band
  that is left between the site header and the caption.
*/

/** What the page shell measures for the scene, in pixels. */
export type Stage = {
  viewport: number;
  /** Visible distance from the viewport top to a scene that has not pinned yet. */
  offset?: number;
  /** Height of what is pinned to the top of the screen: the story's own bar. */
  header: number;
  /** Height of each beat's caption when it is pinned, in beat order. */
  captions: number[];
};

/** Room left around a formation, as a share of its size. */
const MARGIN = 1.15;

/** No band or room is ever treated as thinner than this share of the screen. */
const THINNEST = 0.15;

/**
 * How far back the camera must stand for a formation `span` units wide and
 * `rise` units tall to fit, and never closer than `nearest`. `shareX` and
 * `shareY` are how much of the screen's width and height the formation has
 * to itself: 1 when it is centred and nothing covers it.
 */
export function cameraDistance(
  span: number,
  rise: number,
  aspect: number,
  shareX: number,
  shareY: number,
  fovDegrees: number,
  nearest: number,
): number {
  if (!(aspect > 0)) return nearest;
  const heightPerUnitOfDistance = 2 * Math.tan((fovDegrees * Math.PI) / 360);
  const forWidth =
    (span * MARGIN) / (heightPerUnitOfDistance * aspect * Math.max(THINNEST, shareX));
  const forHeight =
    (rise * MARGIN) / (heightPerUnitOfDistance * Math.max(THINNEST, shareY));
  return Math.max(nearest, forWidth, forHeight);
}

/** Half the width and half the height the camera sees at a distance. */
export function viewHalf(
  distance: number,
  fovDegrees: number,
  aspect: number,
): [number, number] {
  const halfHeight = distance * Math.tan((fovDegrees * Math.PI) / 360);
  return [halfHeight * aspect, halfHeight];
}

/**
 * The share of the screen a formation has to itself when it is anchored off
 * centre by `anchor`, a share of half the screen.
 */
export function roomBeside(anchor: number): number {
  return Math.max(THINNEST, 1 - Math.abs(anchor));
}

/** The height of screen the framing on a wide screen was tuned on, in pixels. */
export const TUNED_HEIGHT = 900;

/** A formation fitted to less room than it was framed for is never drawn smaller than this. */
const SMALLEST = 0.4;

/**
 * On a wide screen most formations stand beside the caption. One that
 * stands over it instead was framed on a screen `TUNED_HEIGHT` tall. A
 * caption is as many pixels tall on a shorter screen, so it takes more of
 * it, and the formation would run into the text. This is how much smaller
 * to draw the formation there: by as much as the band between the header
 * and the caption has shrunk, as a share of the screen. It is 1 on a screen
 * that tall or taller.
 */
export function overScale(viewport: number, header: number, caption: number): number {
  const tuned = (TUNED_HEIGHT - header - caption) / TUNED_HEIGHT;
  if (!(viewport > 0) || !(tuned > 0)) return 1;
  const now = (viewport - header - caption) / viewport;
  return Math.min(1, Math.max(SMALLEST, now / tuned));
}

/**
 * And where to put it: the anchor, a share of half the screen's height,
 * that keeps the formation at the same place within that band as `anchor`
 * gave it on the screen it was framed on.
 */
export function overAnchor(
  anchor: number,
  viewport: number,
  header: number,
  caption: number,
): number {
  const tunedBand = TUNED_HEIGHT - header - caption;
  if (!(viewport > 0) || viewport >= TUNED_HEIGHT || !(tunedBand > 0)) return anchor;
  const within = (TUNED_HEIGHT * (0.5 - anchor / 2) - header) / tunedBand;
  const centre = header + within * Math.max(0, viewport - header - caption);
  return 1 - (2 * centre) / viewport;
}

/** The share of the screen's height left between the header and a caption. */
export function bandShare(viewport: number, header: number, caption: number): number {
  if (!(viewport > 0)) return 1;
  return Math.min(1, Math.max(THINNEST, (viewport - header - caption) / viewport));
}

/**
 * On a narrow screen a tall caption can leave a band thinner than the
 * thinnest the scene is framed for, and the pieces would then stand over the
 * header and the text. This is how much smaller to draw them so that they
 * keep to the band: 1 where the band is thick enough, and 0 where so little
 * is left that they should not be drawn at all.
 */
export function bandFit(viewport: number, header: number, caption: number): number {
  if (!(viewport > 0)) return 1;
  const fit = (viewport - header - caption) / viewport / THINNEST;
  if (fit >= 1) return 1;
  return fit < SMALLEST ? 0 : fit;
}

/**
 * How far above the middle of the screen the middle of that band is, as a
 * share of the screen's height. The scene is raised by this much.
 */
export function stageLift(viewport: number, header: number, caption: number): number {
  if (!(viewport > 0)) return 0;
  return (caption - header) / (2 * viewport);
}
