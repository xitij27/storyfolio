export const openingVersions={
 A:{title:'What does the bench let me claim?',body:'I write firmware: code that controls a physical device. For Mosslink, I wrote the firmware, scheduled its power states and built its bring-up fixture.'},
 B:{title:'What does the bench let me claim?',body:'For Mosslink, my work was firmware, power-state scheduling and a bring-up fixture. Firmware is the code that controls a physical device; this story connects that code to physical observation.'},
 C:{title:'What does the bench let me claim?',body:'I’m Ada Mensah, seeking embedded firmware roles involving physical devices. For Mosslink, I wrote the firmware, scheduled its power states and built its bring-up fixture. Firmware is code that controls a physical device.'},
} as const;
export const closingVersions={
 A:{title:'A claim needs an observation.',body:'A firmware decision needs a physical observation. An estimate and an observed run support different claims: Mosslink’s two-year battery projection is distinct from its longest run of 72 hours.'},
 B:{title:'Keep the claim with its evidence.',body:'Six Mosslink samples were bench tested out of forty assembled. A two-year battery projection and a 72-hour run support different claims. These observations do not establish a field pilot, two-year endurance or finished qualification.'},
 C:{title:'Code. Observation. Then a claim.',body:'I wrote Mosslink’s firmware, scheduled its power states and built its bring-up fixture. The lesson I want to express is that a firmware decision needs a physical observation, and that an estimate and an observed run support different claims.'},
} as const;
export type WordChoice='A'|'B'|'C';
// Approved by user on2026-10-22: use recommended openingA and closingA word for word.
export const approvedWords={opening:'A',closing:'A'} as const;
export const fixedWords={openingCredit:'My colleague designed the PCB and analogue front end. Bring-up means checking a new board’s basic operation.',openingEvidence:'Mosslink · 6 samples bench tested / 40 assembled',openingNote:'Fixture geometry is explanatory. It does not reproduce the hardware or wiring.',closingGoal:'I’m seeking embedded firmware roles involving physical devices.',closingNote:'ada@example.com is a public example contact.'};
