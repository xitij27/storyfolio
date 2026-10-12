export const copy = {
  lang: "en",
  metadata: {
    title: "Ada Mensah — Firmware and the bench",
    description: "Firmware, power-state scheduling and the bring-up fixture: Ada Mensah's contribution to Mosslink, with the evidence limits visible.",
    openGraph: { title: "Ada Mensah — Firmware and the bench", description: "How does a firmware decision become a measurable signal?", images: ["/assets/share-card.svg"] },
  },
  railLabel: "Chapters", lookLabel: "Appearance", fpsLabel: "Frames per second",
  // Stop-5 recommended surrounding copy is provisional until the user chooses.
  beats: {
    "scope.opening": { title: "Ada Mensah", lead: "Follow one firmware contribution from power-state scheduling to the bench, with its limits in view.", body: "Firmware is code that controls a physical device.", note: "I wrote the firmware, scheduled the power states and built the bring-up fixture." },
    "responsibilities.split": { title: "Who made what", body: "I wrote the firmware, scheduled the power states and built the bring-up fixture.", note: "A colleague designed the PCB and analogue front end." },
    "state.table": { title: "Scheduling power states", body: "State tables, timing diagrams and current traces are daily working documents.", note: "Power-state scheduling is part of my contribution. These six rows organise this story; they are not actual firmware state-machine entries." },
    "transition.diagram": { title: "Reading transitions", body: "Sleep → Measure → Transmit → Sleep. This teaching loop explains a transition between states.", note: "Explanatory schematic, not a measured trace or a firmware specification." },
    "observation.fixture": { title: "Checking basic operation", body: "Bring-up means checking a new board's basic operation.", note: "In this explanatory drawing, a firmware command reaches a generic board; the fixture makes a response available to bench instruments." },
    "observation.evidence": { title: "What the bench supports", body: "Forty engineering samples were assembled. Six were tested on the bench. None went to customers.", note: "Two years is a projection from bench current readings and an assumed reporting cycle." },
    "review.close": { title: "Code beside evidence", lead: "Read the firmware contribution beside what the bench supports.", body: "I connect firmware decisions to bench observations through power-state scheduling and the bring-up fixture, while keeping the evidence limits visible.", note: "Two years is a projection from bench current readings and an assumed reporting cycle." },
  },
};
