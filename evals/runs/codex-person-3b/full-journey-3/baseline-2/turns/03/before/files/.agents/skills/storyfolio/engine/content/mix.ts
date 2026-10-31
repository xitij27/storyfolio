import { WHOLE, type Mix } from "@/stitch/mix";

// Which world holds each chapter, in chapter order: the agent chooses it to
// suit the person, from the pieces in the library's gallery. As one line it
// reads like "sheet,map,map,book,book,sheet,map,book" (parseMix and formatMix
// in stitch/mix.ts), which is also what /preview?mix= takes.
export const mix: Mix = WHOLE.sheet;
