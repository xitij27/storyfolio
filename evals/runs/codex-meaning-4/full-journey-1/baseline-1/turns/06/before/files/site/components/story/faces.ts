import * as THREE from "three";
import type { Look } from "@/lib/story/looks";
import type { FaceDef } from "./types";
import { blankFaceTexture } from "./face-material";

/** Drawing is queued; at most two faces are painted by one animation frame. */
export function createFaces(faces: readonly FaceDef[], look: Look, coarse: boolean) {
  let disposed = false;
  const blank = blankFaceTexture(look);
  const made = new Map<string, { canvas: HTMLCanvasElement; texture: THREE.CanvasTexture }>();
  const images = new Map<string, HTMLImageElement>();
  const loading: HTMLImageElement[] = [];
  const waiting = [...faces];
  const queued = new Set(faces.map(face => face.id));
  const queue = (face: FaceDef) => { if (!disposed && !queued.has(face.id)) { waiting.push(face); queued.add(face.id); } };
  for (const face of faces) if (face.src) {
    const picture = new Image();
    loading.push(picture);
    picture.crossOrigin = "anonymous";
    picture.onload = () => { if (!disposed) { images.set(face.id, picture); queue(face); } };
    picture.onerror = () => { /* The background and any canvas drawing remain readable. */ };
    picture.src = face.src;
  }
  void document.fonts.ready.then(() => { if (!disposed) faces.forEach(queue); });
  return {
    blank,
    get(beat: string, piece: number) {
      const face = faces.find(item => item.beat === beat && item.piece === piece);
      if (!face) return blank;
      const texture = made.get(face.id)?.texture;
      if (texture) return texture;
      // A deep link or look change needs the visible faces before offscreen ones.
      const pending = waiting.indexOf(face);
      if (pending > 0) waiting.unshift(...waiting.splice(pending, 1));
      return blank;
    },
    draw() {
      for (let n = 0; n < 2 && waiting.length && !disposed; n++) {
        const face = waiting.shift()!;
        queued.delete(face.id);
        let record = made.get(face.id);
        if (!record) {
          const canvas = document.createElement("canvas");
          canvas.width = coarse ? 384 : 768; canvas.height = coarse ? 512 : 1024;
          const texture = new THREE.CanvasTexture(canvas);
          texture.colorSpace = THREE.SRGBColorSpace;
          record = { canvas, texture }; made.set(face.id, record);
        }
        const { canvas, texture } = record;
        const context = canvas.getContext("2d");
        if (!context) continue;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = look.surface.glows ? "#000000" : look.surface.color;
        context.fillRect(0, 0, canvas.width, canvas.height);
        const picture = images.get(face.id);
        if (picture) context.drawImage(picture, 0, 0, canvas.width, canvas.height);
        context.save();
        face.draw?.(context, canvas.width, canvas.height, look);
        context.restore();
        texture.needsUpdate = true;
      }
    },
    dispose() {
      disposed = true;
      for (const image of loading) { image.onload = null; image.onerror = null; }
      images.clear();
      for (const { texture } of made.values()) texture.dispose();
      made.clear(); waiting.length = 0; blank.dispose();
    },
  };
}
