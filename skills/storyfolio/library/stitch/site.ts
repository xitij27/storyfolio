// What the person chose for their site beyond their facts and the mix: the
// look (stop 4), their own words for any chapter (stop 5), and where the CV
// is (stop 6). A site keeps these in content/site.ts. Pure.
import type { ChapterKey } from "./chapters.ts";
import type { LookId } from "./look.ts";

export type SiteChoices = { look: LookId; words: Partial<Record<ChapterKey, string>>; cv?: string };
