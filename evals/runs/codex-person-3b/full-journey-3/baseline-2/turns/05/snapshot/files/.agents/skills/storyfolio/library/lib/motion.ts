/**
 * Timing shared by the Motion animations, mirroring --motion-ease-out and
 * --motion-ease-in-out in globals.css so CSS and JS motion feel the same.
 */

/** ease-out-quint: for things entering or leaving. */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/** ease-in-out-cubic: for things already on screen that move. */
export const EASE_IN_OUT = [0.645, 0.045, 0.355, 1] as const;
