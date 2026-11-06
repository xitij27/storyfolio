/** Surface, light and text colours can change without changing the story. */
export type Look = {
  id: string;
  name?: string;
  ground: string;
  ink: string;
  faint: string;
  accent: string;
  surface: { color: string; roughness: number; glows: boolean };
  lights: { ambient: number; key: number; fill: number; rim: number };
  floor: "matte" | "none";
  shadows: boolean;
};

export function parseLook(value: string | null | undefined, looks: readonly Look[], defaultId?: string): string {
  const fallback = looks.find((look) => look.id === defaultId) ?? looks[0];
  if (!fallback) throw new Error("A story needs at least one look");
  return looks.find((look) => look.id === value)?.id ?? fallback.id;
}

export function lookFromSearch(search: string, looks: readonly Look[], defaultId?: string): string {
  return parseLook(new URLSearchParams(search).get("look"), looks, defaultId);
}

/** Preserves unrelated parameters and leaves the default look out of the URL. */
export function searchWithLook(search: string, id: string, defaultId: string): string {
  const params = new URLSearchParams(search);
  if (id === defaultId) params.delete("look");
  else params.set("look", id);
  const text = params.toString();
  return text ? `?${text}` : "";
}
