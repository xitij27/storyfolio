/** Controls are mutable values shared by accessible DOM inputs and the scene.
 * The built-in `piece` key is the focused or pointed-at piece, or null.
 */
export type ControlKey = string;

export type Controls = {
  /** What a control is set to, or null if the reader has not touched it. */
  get(key: ControlKey): number | null;
  set(key: ControlKey, value: number | null): void;
  /** Calls `listener` whenever any value changes. Returns how to stop. */
  subscribe(listener: () => void): () => void;
};

export function createControls(): Controls {
  const values = new Map<ControlKey, number>();
  const listeners = new Set<() => void>();
  return {
    get: (key) => values.get(key) ?? null,
    set(key, value) {
      if ((values.get(key) ?? null) === value) return;
      if (value === null) values.delete(key);
      else values.set(key, value);
      for (const listener of listeners) listener();
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

