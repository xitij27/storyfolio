"use client";

import type { ReactNode } from "react";

/**
 * A labelled slider for a caption. A real range input, so it works from the
 * keyboard and announces itself, and tall enough to take a thumb.
 */
export function Slider({
  label,
  min,
  max,
  step,
  value,
  onChange,
  readout,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  /** The value as the reader should see it, beside the slider. */
  readout?: ReactNode;
}) {
  return (
    <label className="paper-control mt-5 flex min-h-11 w-fit items-center gap-3 font-mono text-[0.8125rem] text-paper-muted">
      <span>{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-11 w-40 cursor-pointer rounded-sm accent-paper-accent outline-none focus-visible:ring-2 focus-visible:ring-paper-accent sm:w-48"
      />
      {readout !== undefined ? (
        <span aria-hidden className="w-12 text-right tabular-nums">
          {readout}
        </span>
      ) : null}
    </label>
  );
}
