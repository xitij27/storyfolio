/*
  Setting type on a canvas: where lines break and how text fills columns.
  The canvas does the measuring; these decide, so they are tested without one.
*/

export type Measure = (text: string) => number;

/**
 * Breaks text into lines no wider than `width`. A single word wider than
 * that gets a line of its own instead of being cut.
 */
export function wrapText(text: string, width: number, measure: Measure): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    if (!word) continue;
    const longer = line ? `${line} ${word}` : word;
    if (line && measure(longer) > width) {
      lines.push(line);
      line = word;
    } else {
      line = longer;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/**
 * Fills `columns` columns of `perColumn` lines in turn. What is left over is
 * dropped.
 */
export function intoColumns(
  lines: readonly string[],
  columns: number,
  perColumn: number,
): string[][] {
  return Array.from({ length: columns }, (_, column) =>
    lines.slice(column * perColumn, (column + 1) * perColumn),
  );
}

/**
 * Sets things side by side in rows no wider than `width`, with `gap` between
 * two of them: names across a page, say, where each must stay whole. One
 * wider than a row gets a row to itself.
 */
export function intoRows(
  items: readonly string[],
  width: number,
  gap: number,
  measure: Measure,
): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let taken = 0;
  for (const item of items) {
    const wide = measure(item);
    if (row.length > 0 && taken + gap + wide > width) {
      rows.push(row);
      row = [];
      taken = 0;
    }
    taken += (row.length > 0 ? gap : 0) + wide;
    row.push(item);
  }
  if (row.length > 0) rows.push(row);
  return rows;
}

/**
 * The largest of `sizes` at which `text` wraps into `maxLines` lines or
 * fewer, or the smallest of them if none does. `sizes` runs large to small.
 */
export function fitSize(
  text: string,
  width: number,
  maxLines: number,
  sizes: readonly number[],
  measureAt: (size: number) => Measure,
): number {
  for (const size of sizes) {
    if (wrapText(text, width, measureAt(size)).length <= maxLines) return size;
  }
  return sizes[sizes.length - 1];
}

/**
 * The largest of `sizes` at which `text` is no wider than `width` on one
 * line, or the smallest of them if none is. `sizes` runs large to small.
 * Unlike `fitSize` it shrinks a single word: wrapping never cuts a word, so
 * a word too wide for the line still counts there as one line.
 */
export function fitLine(
  text: string,
  width: number,
  sizes: readonly number[],
  measureAt: (size: number) => Measure,
): number {
  for (const size of sizes) {
    if (measureAt(size)(text) <= width) return size;
  }
  return sizes[sizes.length - 1];
}

/**
 * The font family to draw with, from the value next/font puts in a CSS
 * variable. Only the first family is kept. The second is a fallback built
 * from a font on the visitor's machine, and where that font is missing
 * (most Linux and Android) asking the browser to load the list fails
 * altogether.
 */
export function primaryFamily(cssValue: string, generic: string): string {
  const first = cssValue.split(",")[0].trim();
  return first ? `${first}, ${generic}` : generic;
}
