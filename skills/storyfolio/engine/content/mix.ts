import { WHOLE, type Mix } from "@/stitch/mix";

// Which world holds each chapter, in chapter order. The gallery's mixer
// writes this as one line, such as "sheet,map,map,book,book,sheet,map,book";
// read it with parseMix from stitch/mix.ts.
export const mix: Mix = WHOLE.sheet;
