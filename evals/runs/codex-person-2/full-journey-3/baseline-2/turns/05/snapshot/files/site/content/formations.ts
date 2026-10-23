import { blankFormation, type BeatFormation, type Formation } from "../lib/story/formation.ts";
import { type BeatId } from "./story.ts";
function formation(turn=0,span=7.7,rise=5.2):Formation{return {...blankFormation(1),pieces:[{position:[0,0,0],rotation:[0,0,0],size:[1,1]}],span,rise,anchor:[.5,.05],turn:[.22,turn],near:8,floor:-3,drift:0,sway:[0,0,0]};}
export const formations={
 "opening.hello":{rest:formation(-.12)},"opening.library":{rest:formation(-.12),within:formation(.06)},
 "places.route":{rest:formation(.06,8,6)},"study.logger":{rest:formation(-.08)},
 "career.library":{rest:formation(-.06)},"career.lumen":{rest:formation(.04)},"career.kestrel":{rest:formation(-.08)},
 "practice.plan":{rest:formation(-.06)},"practice.influences":{rest:formation(.08)},
 "work.waves":{rest:formation(-.08),within:formation(.08)},"work.database":{rest:formation(-.08),within:formation(.12)},
 "work.runbook":{rest:formation(-.06)},"work.oncall":{rest:formation(.06)},"work.ferry":{rest:formation(-.04)},"work.talk":{rest:formation(.04)},
 "contact.complete":{rest:formation(.05)},
} satisfies Record<BeatId,BeatFormation>;
