import type { FaceDef } from "@/components/story/types";
import { copy } from "./copy";
import { story } from "./story";

export const faces: FaceDef[] = story.chapters.flatMap((chapter) =>
  chapter.beats.flatMap((beat) => Array.from({ length: story.pieces }, (_, piece): FaceDef => ({
    id: `${beat.id}-${piece}`, beat: beat.id, piece,
    ...(piece === 6 ? { src: "/plain/face.svg" } : {
      draw(ctx, width, height, look) {
        ctx.fillStyle = look.surface.color;
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = look.accent;
        ctx.font = `${width * 0.1}px system-ui`;
        ctx.fillText(String(piece + 1).padStart(2, "0"), width * 0.12, height * 0.16);
        ctx.fillStyle = look.ink;
        ctx.font = `${width * 0.12}px Georgia, serif`;
        ctx.fillText(copy.faceWords[piece], width * 0.12, height * 0.56);
      },
    }),
  }))),
);
