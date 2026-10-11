export const copy = {
  lang: "en",
  metadata: { title: "Ada Mensah — From code to a bench check", description: "A fictional five-beat prototype about firmware, scheduling and the limits of bench evidence." },
  railLabel: "Story beats", lookLabel: "Appearance", fpsLabel: "Frames per second",
  skipLabel: "Skip to the answer", backLabel: "Return to the question",
  beats: {
    question: {
      title: "How do you check a decision made in code?",
      body: "Ada Mensah works with embedded firmware: code that controls a physical device. For Mosslink, an environmental sensor, she wrote the firmware, scheduled power states and built the bring-up fixture.",
      detail: "Bring-up means checking a new board’s basic operation. Follow the connection from a code decision to something observable on the bench.",
      note: "Fictional prototype · The apparatus is an explanatory model, not an actual Mosslink device.",
    },
    scheduling: {
      title: "Give each activity its place.",
      body: "Sleep → Measure → Transmit → repeat. This teaching loop explains scheduling: organizing different activities over a repeated cycle. Separating the activities makes it easier to ask which behavior to inspect at each step.",
      detail: "Ada scheduled power states. This simplified sequence illustrates the idea; it is not recovered Mosslink firmware, its actual state topology or measured timing.",
      note: "No durations or current values are supplied. The console shows a teaching sequence only.",
    },
    bench: {
      title: "A command needs a physical check.",
      body: "Firmware sends a command; the board responds. The bring-up fixture provides access so that behavior on the physical board can be checked through a bench observation. The fixture supports inspection; it does not replace the board’s circuitry.",
      detail: "Ada wrote the firmware, scheduled power states and built the fixture. A colleague designed the PCB (printed circuit board) and the analogue front end, the circuitry handling analogue signals.",
      note: "The separated rig illustrates those relationships. It is not a circuit, wiring plan or recovered implementation.",
    },
    evidence: {
      title: "Two paths. Two different claims.",
      body: "Measured sleep and transmit current, together with an assumed reporting interval, support a two-year projection. A separate continuous bench run supports 72 hours observed.",
      detail: "The 72-hour run does not validate two years of endurance. Neither path establishes field conditions or customer deployment. State tables, timing diagrams, current traces and bench checklists are working documents; no original measurement table, trace, spreadsheet or run notebook is supplied here.",
      note: "The instruments label a projection and an observation. Their displays are explanatory labels, not original evidence.",
    },
    scope: {
      title: "Code, connected to an observable check.",
      body: "Ada’s firmware and power-state scheduling define device behavior; her fixture work connects that behavior to a physical bench check. That is the contribution this story supports, with the projection and observed run kept distinct.",
      detail: "Forty engineering samples were assembled; six were tested on the bench; none went to customers. One preliminary emissions check passed. Full qualification is unfinished.",
      note: "This is bounded bench evidence, not whole-product ownership, certification, field testing or a customer launch.",
    },
  },
};
