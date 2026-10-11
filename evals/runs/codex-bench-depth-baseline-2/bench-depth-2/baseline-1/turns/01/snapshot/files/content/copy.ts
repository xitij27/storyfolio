export const copy = {
  lang: "en",
  metadata: { title: "Ada Mensah · Code to bench", description: "An illustrative five-beat prototype about embedded firmware, bench checks and the limits of evidence." },
  railLabel: "Five beats", lookLabel: "Appearance", fpsLabel: "Frames per second",
  skipLabel: "Skip to the answer",
  beats: {
    question: {
      title: "How does code become a physical check?",
      body: "Ada Mensah works with embedded firmware: code that controls a physical device. For Mosslink, an environmental sensor, she wrote the firmware, scheduled its power states and built the bring-up fixture.",
      note: "Bring-up means checking a new board’s basic operation. Follow the apparatus to see how a code decision connects to something observable on the bench.",
      detail: "Illustrative apparatus · fictional subject and sensor. This is an explanatory model, not an actual Mosslink device.",
    },
    scheduling: {
      title: "Give each activity its place.",
      body: "Sleep → Measure → Transmit → repeat. This teaching loop shows how scheduling organizes different activities into a cycle. It gives a reader an order of behavior to inspect when code meets a board.",
      note: "Ada scheduled power states. This simplified sequence is illustrative, not recovered Mosslink firmware or measured timing. No durations or current values are supplied.",
      detail: "The three colored towers mark the teaching sequence; their spacing and heights carry no timing or current data.",
    },
    bench: {
      title: "Make the board accessible.",
      body: "A firmware command asks the physical board to act. The bring-up fixture provides access so that its response can be observed on the bench. The fixture helps check behavior; the board’s circuitry still performs the device’s work.",
      note: "Ada: firmware, power-state scheduling and bring-up fixture. A colleague: the PCB (printed circuit board) and analogue front end, the circuitry interfacing with sensor signals.",
      detail: "The opened model explains command → board response → fixture access → bench observation. It is not a wiring plan or a public debugging incident.",
    },
    evidence: {
      title: "Two claims. Two kinds of support.",
      body: "Measured sleep and transmit current, together with an assumed reporting interval, support a two-year endurance projection. Separately, the longest continuous bench run was 72 hours: an observed duration.",
      note: "The 72-hour run does not validate two years of endurance. Neither path establishes field conditions or customer deployment. No original measurements, current trace, spreadsheet or run notebook is supplied.",
      detail: "Left: measured inputs + assumed interval → projection. Right: continuous bench run → observation. The display labels are explanatory, not recovered instrument readings.",
    },
    scope: {
      title: "A connection you can check. A claim with limits.",
      body: "Ada’s firmware and scheduling decisions connect to an observable bench check through the fixture she built. That is the contribution this story can support—not ownership of the whole sensor.",
      note: "Forty engineering samples were assembled; six were bench-tested; none went to customers. One preliminary emissions check passed. Full qualification is unfinished.",
      detail: "State tables, timing diagrams, current traces and bench checklists are working documents. None is supplied here as original evidence. This fictional local prototype is ready for review, not publication.",
    },
  },
};
