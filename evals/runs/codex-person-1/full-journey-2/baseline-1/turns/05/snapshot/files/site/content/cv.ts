// Confirmed facts only. Shared by the print page and self-contained download.
export const cv = {
  name:"Dawit Bekele",email:"dawit@example.com",focus:"Migration work. Planning to go independent in 2027.",
  sections:[
    {title:"Career milestones",paragraphs:[
      "Entoto Technical University Library — after studying, I came to software keeping the library’s catalogue servers running.",
      "Lumen Pay — Card payment systems.",
      "Kestrel Freight — I moved to Rotterdam in 2020 for Kestrel Freight.",
    ]},
    {title:"Migration and reliability work",paragraphs:[
      "Migration: measured availability of the order API was 99.98% over 26 months. There were two incidents during the migration, both internal and both under ten minutes.",
      "Runbook: I wrote the first version and still own it. 40 teams use it.",
      "On-call: we reduced pages per week from 85 to 22 over about a year, as an on-call team of nine. Half of it was deleting alerts nobody needed.",
    ]},
    {title:"ferry",paragraphs:["Created by a former colleague. I have maintained ferry since 2022, and I wrote its cutover command."]},
    {title:"Speaking",paragraphs:["I open my talk with the first production outage I caused, in 2014 at the library: I dropped a table. It is why I care about rollbacks."]},
    {title:"Education",paragraphs:["BSc Electrical Engineering, Entoto Technical University, Addis Ababa, 2009–2013."]},
    {title:"Places",paragraphs:["I grew up and studied in Addis Ababa. I moved to Amsterdam in 2016 for Lumen Pay, and to Rotterdam in 2020 for Kestrel Freight."]},
  ],
};
