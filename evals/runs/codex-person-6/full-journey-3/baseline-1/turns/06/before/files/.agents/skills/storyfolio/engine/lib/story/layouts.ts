import type { Pose, Vec3 } from "./formation.ts";
import { rand } from "./rand.ts";

type Size = [number, number];
function pieces(count: number, size: Size, place: (index: number) => { position: Vec3; rotation?: Vec3 }): Pose[] {
  if (!Number.isInteger(count) || count < 0) throw new RangeError("piece count must be a non-negative integer");
  if (!size.every((value) => Number.isFinite(value) && value > 0)) throw new RangeError("piece size must be finite and positive");
  return Array.from({ length: count }, (_, index) => {
    const pose = place(index);
    return { position: pose.position, rotation: pose.rotation ?? [0, 0, 0], size: [...size] };
  });
}

export function stack(count: number, size: Size, options: { offset?: Vec3 } = {}): Pose[] {
  const offset = options.offset ?? [0.018, 0.012, 0.07];
  return pieces(count, size, (index) => ({ position: offset.map((value) => value * (index - (count - 1) / 2)) as Vec3 }));
}

export function fan(count: number, size: Size, options: { angle?: number; radius?: number; depth?: number } = {}): Pose[] {
  const angle = options.angle ?? 1.4;
  const radius = options.radius ?? size[1] * 0.7;
  return pieces(count, size, (index) => {
    const turn = count > 1 ? (index / (count - 1) - 0.5) * angle : 0;
    return {
      position: [Math.sin(turn) * radius, (Math.cos(turn) - 1) * radius, (index - (count - 1) / 2) * (options.depth ?? 0.04)],
      rotation: [0, 0, -turn],
    };
  });
}

export function ring(count: number, size: Size, options: { radius?: number; start?: number } = {}): Pose[] {
  const radius = options.radius ?? Math.max(size[1], (count * size[0] * 1.1) / (2 * Math.PI));
  return pieces(count, size, (index) => {
    if (count === 1) return { position: [0, 0, 0] };
    const angle = (options.start ?? Math.PI / 2) + (index * 2 * Math.PI) / count;
    return { position: [Math.cos(angle) * radius, Math.sin(angle) * radius, 0], rotation: [0, 0, angle - Math.PI / 2] };
  });
}

export function grid(count: number, size: Size, options: { columns?: number; gap?: number } = {}): Pose[] {
  if (!Number.isInteger(count) || count < 0) throw new RangeError("piece count must be a non-negative integer");
  const columns = options.columns ?? Math.max(1, Math.ceil(Math.sqrt(count)));
  if (!Number.isInteger(columns) || columns < 1) throw new RangeError("columns must be a positive integer");
  const rows = Math.ceil(count / columns);
  const gap = options.gap ?? 0.2;
  return pieces(count, size, (index) => {
    const row = Math.floor(index / columns);
    const inRow = Math.min(columns, count - row * columns);
    return { position: [(index % columns - (inRow - 1) / 2) * (size[0] + gap), ((rows - 1) / 2 - row) * (size[1] + gap), 0] };
  });
}

export function row(count: number, size: Size, options: { gap?: number } = {}): Pose[] {
  return grid(count, size, { columns: Math.max(1, count), gap: options.gap });
}

export function scatter(count: number, size: Size, options: { seed?: number; span?: number; rise?: number; depth?: number } = {}): Pose[] {
  const seed = options.seed ?? 1;
  const span = options.span ?? size[0] * Math.sqrt(count) * 1.7;
  const rise = options.rise ?? size[1] * Math.sqrt(count) * 0.8;
  return pieces(count, size, (index) => ({
    position: [(rand(index, seed) - 0.5) * span, (rand(index, seed + 1) - 0.5) * rise, (rand(index, seed + 2) - 0.5) * (options.depth ?? 1.5)],
    rotation: [(rand(index, seed + 3) - 0.5) * 0.7, (rand(index, seed + 4) - 0.5) * 0.7, (rand(index, seed + 5) - 0.5) * 1.2],
  }));
}

/** Width and height centred on the formation's origin, enclosing every rotated
 * corner. The camera aims at that origin, so an offset layout needs room for
 * its farthest edge on both sides, even when its bounding box is smaller.
 */
export function measure(poses: readonly Pose[]): { span: number; rise: number } {
  if (!poses.length) return { span: 0, rise: 0 };
  let left = Infinity, right = -Infinity, bottom = Infinity, top = -Infinity;
  for (const pose of poses) {
    const [rx, ry, rz] = pose.rotation;
    const a = Math.cos(rx), b = Math.sin(rx), c = Math.cos(ry), d = Math.sin(ry), e = Math.cos(rz), f = Math.sin(rz);
    for (const x of [-pose.size[0] / 2, pose.size[0] / 2]) {
      for (const y of [-pose.size[1] / 2, pose.size[1] / 2]) {
        const px = pose.position[0] + c * e * x - c * f * y;
        const py = pose.position[1] + (a * f + b * e * d) * x + (a * e - b * f * d) * y;
        left = Math.min(left, px);
        right = Math.max(right, px);
        bottom = Math.min(bottom, py);
        top = Math.max(top, py);
      }
    }
  }
  return {
    span: 2 * Math.max(Math.abs(left), Math.abs(right)),
    rise: 2 * Math.max(Math.abs(bottom), Math.abs(top)),
  };
}
