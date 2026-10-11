import type { Controls } from "@/lib/story/controls";

const stores = new WeakMap<Controls, number>();
let next = 0;
export function identity(controls: Controls) {
  let id = stores.get(controls);
  if (!id) { id = ++next; stores.set(controls, id); }
  return id;
}
