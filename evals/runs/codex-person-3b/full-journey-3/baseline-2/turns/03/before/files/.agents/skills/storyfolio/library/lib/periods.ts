import type { Experience } from "@/content/sample";

/**
 * "Sep 2024 – Sep 2025" in the reader's language. Call this on the server and
 * pass the strings down: month names differ between ICU versions ("Sep." vs
 * "Sept." in German), so formatting again in the browser can disagree with
 * the server-rendered HTML and break hydration.
 */
export function formatPeriod(
  start: string,
  end: string | null,
  locale: string,
  present: string,
): string {
  const fmt = new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
  const month = (ym: string) => fmt.format(new Date(`${ym}-01T00:00:00Z`));
  return `${month(start)} – ${end ? month(end) : present}`;
}

/** Each role's period, keyed by experience id. */
export function getExperiencePeriods(
  experiences: Experience[],
  locale: string,
  present: string,
): Record<string, string> {
  return Object.fromEntries(
    experiences.map((e) => [
      e.id,
      formatPeriod(e.start, e.end, locale, present),
    ]),
  );
}
