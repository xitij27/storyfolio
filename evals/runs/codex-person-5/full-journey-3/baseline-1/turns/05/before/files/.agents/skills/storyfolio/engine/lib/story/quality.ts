export type Quality = { dpr: number; shadows: boolean; step: number };
export type QualityOptions = { dpr?: number; shadows?: boolean; window?: number; slowMs?: number };

/** A rolling frame-time window, with a full fresh window after every reduction.
 * Long pauses from a hidden tab are ignored. Quality only moves down.
 */
export function createQuality(options: QualityOptions = {}): {
  get(): Quality;
  sample(milliseconds: number): Quality;
} {
  const requestedDpr = options.dpr ?? 2;
  const dpr = Number.isFinite(requestedDpr) ? Math.max(0.75, Math.min(2, requestedDpr)) : 2;
  const tiers = [dpr, ...[1.5, 1, 0.75].filter((tier) => tier < dpr)];
  const requestedWindow = options.window ?? 60;
  const window = Number.isFinite(requestedWindow) ? Math.max(1, Math.floor(requestedWindow)) : 60;
  const requestedSlow = options.slowMs ?? 24;
  const slowMs = Number.isFinite(requestedSlow) && requestedSlow > 0 ? requestedSlow : 24;
  let state: Quality = { dpr, shadows: options.shadows ?? true, step: 0 };
  let frames: number[] = [];
  let total = 0;
  return {
    get: () => state,
    sample(milliseconds) {
      if (!Number.isFinite(milliseconds) || milliseconds <= 0 || milliseconds > 250) return state;
      frames.push(milliseconds);
      total += milliseconds;
      if (frames.length > window) total -= frames.shift()!;
      if (frames.length < window || total / window <= slowMs) return state;
      const step = state.step + 1;
      const nextDpr = tiers[Math.min(step, tiers.length - 1)];
      const shadows = state.shadows && step < 2 && step < tiers.length;
      if (nextDpr < state.dpr || shadows !== state.shadows) state = { dpr: nextDpr, shadows, step };
      frames = [];
      total = 0;
      return state;
    },
  };
}
