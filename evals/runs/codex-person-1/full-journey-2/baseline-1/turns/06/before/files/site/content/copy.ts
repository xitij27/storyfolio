import type { Metadata } from "next";
import type { BeatId } from "./story";
export const copy = {
  lang:"en",railLabel:"Story chapters",lookLabel:"Choose the material look",fpsLabel:"Frames per second",
  metadata:{
    metadataBase:new URL("http://127.0.0.1:3000"),
    title:"Dawit Bekele — Migration work",description:"Migration work, runbooks and rollback plans. Dawit Bekele is planning to go independent in 2027.",
    robots:{index:false,follow:false},
    openGraph:{type:"website",locale:"en_GB",siteName:"Dawit Bekele",title:"Dawit Bekele — Migration work",description:"Runbooks, cutover checklists and rollback plans. Planning to go independent in 2027.",images:[{url:"/share-preview.png",width:1200,height:630,alt:"Dawit Bekele — Migration work. An illustrated open runbook."}]},
    twitter:{card:"summary_large_image",title:"Dawit Bekele — Migration work",description:"Runbooks, cutover checklists and rollback plans.",images:["/share-preview.png"]},
    icons:{icon:[{url:"/icon.svg",type:"image/svg+xml"},{url:"/icon-32.png",sizes:"32x32",type:"image/png"}],apple:[{url:"/apple-touch-icon.png",sizes:"180x180"}]},
  } satisfies Metadata,
  beats:{
    "hello.intro":{title:"Dawit Bekele.",body:"",note:"Illustration · library catalogue on a runbook"},
    "hello.origin":{title:"A table, dropped.",body:"My first production outage was in 2014, at the university library. I dropped a table. It is why I care about rollbacks.",note:"Illustration · a whole table disappears. No actual data or recovery is depicted."},
    "places.route":{title:"Three places.",body:"I grew up and studied in Addis Ababa. I moved to Amsterdam in 2016 for Lumen Pay, and to Rotterdam in 2020 for Kestrel Freight.",note:"Illustration · a paper route, with three stops"},
    "study.degree":{title:"Electrical engineering. Then software.",body:"I studied for a BSc in Electrical Engineering at Entoto Technical University, in Addis Ababa, from 2009 to 2013. I came to software through the job afterwards, keeping the university library’s catalogue servers running.",note:"Illustration · a reading stand and degree leaf"},
    "career.library-lumen":{title:"Work along the way.",body:"At Entoto Technical University Library, I kept the catalogue servers running.",note:"Illustration · an open runbook"},
    "career.kestrel":{title:"Kestrel Freight.",body:"I moved to Rotterdam in 2020 for Kestrel Freight.",note:"Illustration · working documents, not internal materials"},
    "practice.documents":{title:"Three working documents.",body:"I work from the runbook, the cutover checklist and the rollback plan. A postmortem only when something has gone wrong, which is the point.",note:"Illustration · runbook, checklist and rollback plan"},
    "practice.oncall":{title:"Fewer pages, together.",body:"We reduced pages per week from 85 to 22, as an on-call team of nine, over about a year. Half of that was deleting alerts nobody needed.",note:"Illustration · alert tags and a checklist. The tags do not encode the page counts."},
    "practice.reading":{title:"On the reading stand.",body:"Books I learned from: the Google SRE book, and Release It! by Michael Nygard.",note:"Illustration · two reading volumes, not reproduced covers"},
    "projects.migration":{title:"A migration, measured.",body:"Measured availability of the order API over the 26-month migration.",note:"Illustration of moving between systems; not Kestrel Freight’s architecture or migration method."},
    "projects.database":{title:"Database upgrade.",body:"",note:"Illustration · a cutaway view of generic, unversioned database cylinders"},
    "projects.runbook":{title:"First version. Continuing ownership.",body:"I wrote the first version of the runbook, and I still own it. 40 teams use it.",note:"Illustration · a runbook and working leaf, not the actual document"},
    "projects.ferry":{title:"ferry.",body:"A former colleague created ferry. I have maintained it since 2022, and I wrote its cutover command.",note:"Illustration · a command display and cutover control, without actual code or output"},
    "projects.talk":{title:"The story I open with.",body:"I start my talk with the first production outage I caused, in 2014, at the library. I dropped a table. It is why I care about rollbacks.",note:"Illustration · a lectern, microphone and notes"},
    "contact.close":{title:"The next conversation.",body:"",note:"Illustration · a complete runbook, invitation and CV"},
  } satisfies Record<BeatId,{title:string;body:string;note:string}>,
};
