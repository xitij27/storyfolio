/*
  The maze of the self-navigating robot project, carved once and always the
  same, with the search that solves it. Shared by the 2D figure in the
  project modal and the 3D exhibit in the V3 paper.

  Schematic: this maze is generated here, and a breadth-first search stands
  in for the robot's own.
*/

export const MAZE_WIDTH = 15;
export const MAZE_HEIGHT = 9;

/** A cell's walls are a sum of these. */
export const WALL = { north: 1, east: 2, south: 4, west: 8 } as const;

const DX = [0, 1, 0, -1];
const DY = [-1, 0, 1, 0];
const BIT = [WALL.north, WALL.east, WALL.south, WALL.west];
const OPPOSITE = [WALL.south, WALL.west, WALL.north, WALL.east];

/** Every cell's walls, row by row from the top left. */
export const MAZE: Uint8Array = (() => {
  let seed = 20240611;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const cells = new Uint8Array(MAZE_WIDTH * MAZE_HEIGHT).fill(0b1111);
  const seen = new Uint8Array(MAZE_WIDTH * MAZE_HEIGHT);
  const stack = [0];
  seen[0] = 1;
  while (stack.length) {
    const cell = stack[stack.length - 1];
    const cx = cell % MAZE_WIDTH;
    const cy = (cell / MAZE_WIDTH) | 0;
    const ways = [0, 1, 2, 3].filter((d) => {
      const nx = cx + DX[d];
      const ny = cy + DY[d];
      return (
        nx >= 0 &&
        nx < MAZE_WIDTH &&
        ny >= 0 &&
        ny < MAZE_HEIGHT &&
        !seen[ny * MAZE_WIDTH + nx]
      );
    });
    if (!ways.length) {
      stack.pop();
      continue;
    }
    const d = ways[Math.floor(random() * ways.length) % ways.length];
    const next = (cy + DY[d]) * MAZE_WIDTH + cx + DX[d];
    cells[cell] &= ~BIT[d];
    cells[next] &= ~OPPOSITE[d];
    seen[next] = 1;
    stack.push(next);
  }
  return cells;
})();

/**
 * A breadth-first search from the top left to the bottom right: the cells in
 * the order it reached them, and the shortest path it found.
 */
export const SOLVE: { order: number[]; path: number[] } = (() => {
  const start = 0;
  const goal = MAZE_WIDTH * MAZE_HEIGHT - 1;
  const previous = new Int32Array(MAZE_WIDTH * MAZE_HEIGHT).fill(-1);
  const seen = new Uint8Array(MAZE_WIDTH * MAZE_HEIGHT);
  const order: number[] = [];
  const queue = [start];
  seen[start] = 1;
  while (queue.length) {
    const cell = queue.shift()!;
    order.push(cell);
    if (cell === goal) break;
    const cx = cell % MAZE_WIDTH;
    const cy = (cell / MAZE_WIDTH) | 0;
    for (let d = 0; d < 4; d++) {
      if (MAZE[cell] & BIT[d]) continue;
      const nx = cx + DX[d];
      const ny = cy + DY[d];
      if (nx < 0 || nx >= MAZE_WIDTH || ny < 0 || ny >= MAZE_HEIGHT) continue;
      const next = ny * MAZE_WIDTH + nx;
      if (seen[next]) continue;
      seen[next] = 1;
      previous[next] = cell;
      queue.push(next);
    }
  }
  const path: number[] = [];
  for (let cell = goal; cell !== -1; cell = previous[cell]) path.push(cell);
  path.reverse();
  return { order, path };
})();

/**
 * Every wall once, as a line between two corners of the grid: x1, y1, x2,
 * y2, in cells. A wall between two cells belongs to both; it is taken from
 * the one above or to the left.
 */
export function mazeWalls(): [number, number, number, number][] {
  const walls: [number, number, number, number][] = [];
  for (let cell = 0; cell < MAZE_WIDTH * MAZE_HEIGHT; cell++) {
    const x = cell % MAZE_WIDTH;
    const y = (cell / MAZE_WIDTH) | 0;
    if (MAZE[cell] & WALL.north && y === 0) walls.push([x, y, x + 1, y]);
    if (MAZE[cell] & WALL.west && x === 0) walls.push([x, y, x, y + 1]);
    if (MAZE[cell] & WALL.south) walls.push([x, y + 1, x + 1, y + 1]);
    if (MAZE[cell] & WALL.east) walls.push([x + 1, y, x + 1, y + 1]);
  }
  return walls;
}
