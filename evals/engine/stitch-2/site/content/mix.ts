import { parseMix, type Mix } from "@/stitch/mix";

// Dawit's mix, chosen at stop 2 (reasons in docs/story/concepts.md). He has no
// quotes, so the seventh place is never shown.
export const mix: Mix = parseMix("sheet,map,map,map,sheet,sheet,sheet,sheet")!;
