/**
 * A stand-in for Math.random that gives the same number for the same inputs,
 * so the scene is laid out identically on every load and in every test.
 * `i` is which thing is being placed; `salt` separates one use from another.
 */
export function rand(i: number, salt: number): number {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}
