import type { FaceDef } from "@/components/story/types";
import { copy } from "./copy";
import { story } from "./story";

// The middle chapter's picture is a file; the others are drawn.
export const faces: FaceDef[] = story.chapters.flatMap((chapter) => chapter.beats.map((beat): FaceDef => ({
  id: beat.id, beat: beat.id, piece: 0,
  ...(chapter.id === "middle" ? { src: "/plain/face.svg" } : {
    draw(ctx, width, height, look) {
      ctx.fillStyle = look.surface.color;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = look.accent;
      ctx.font = `${width * 0.1}px system-ui`;
      ctx.fillText(String(chapter.number).padStart(2, "0"), width * 0.12, height * 0.16);
      ctx.fillStyle = look.ink;
      ctx.font = `${width * 0.11}px Georgia, serif`;
      ctx.fillText(copy.faceWords, width * 0.12, height * 0.56);
    },
  }),
})));
