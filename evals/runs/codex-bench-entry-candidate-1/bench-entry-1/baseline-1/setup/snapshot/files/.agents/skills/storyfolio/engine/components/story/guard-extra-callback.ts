/**
 * Stop a failed extra callback immediately, even before React unmounts its
 * owner. Each guard is independent, so other extras and the core keep running.
 */
export function guardExtraCallback<Args extends unknown[]>(
  callback: (...args: Args) => void,
  onError: (error: unknown) => void,
): (...args: Args) => void {
  let failed = false;
  return (...args) => {
    if (failed) return;
    try { callback(...args); }
    catch (error) {
      failed = true;
      onError(error);
    }
  };
}
