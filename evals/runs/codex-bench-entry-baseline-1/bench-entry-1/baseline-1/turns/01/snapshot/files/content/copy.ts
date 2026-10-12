export const copy = {
  lang: "en",
  metadata: { title: "Ada Mensah — Code to a physical check", description: "Ada's firmware, power-state scheduling and bring-up fixture for Mosslink, an environmental sensor. An illustrative bench story with explicit evidence limits." },
  railLabel: "Story chapters", lookLabel: "Appearance", fpsLabel: "Frames per second",
  skipLabel: "Skip to the answer", backLabel: "Return to the question",
  beats: {
    "question.inspect": {
      title: "How do you check a decision made in code?",
      body: "Ada Mensah works with embedded firmware: code that controls a physical device. For Mosslink, an environmental sensor, she wrote the firmware, scheduled power states and built the bring-up fixture.",
      note: "Bring-up means checking a new board’s basic operation. Follow the illustrative apparatus from a code decision to a bench observation. This is an explanatory model, not the actual device.",
    },
    "scheduling.loop": {
      title: "Give each activity its place.",
      body: "Sleep → Measure → Transmit → repeat. Scheduling organizes different activities over a cycle, making the order of device behavior something you can inspect. Ada scheduled Mosslink’s power states.",
      note: "The loop on the board is a teaching sequence, not recovered Mosslink firmware or measured timing. No durations or current values are represented.",
    },
    "bench.connect": {
      title: "A command needs a physical answer.",
      body: "A firmware command asks the board to act. The bring-up fixture provides access to that board so its response can be observed on the bench. The fixture enables the check; the board’s circuitry makes the device work.",
      note: "Ada: firmware, scheduling and fixture. A colleague: the PCB (printed circuit board) and analogue front end, the circuitry handling sensor signals. The connectors show relationships, not actual wiring.",
    },
    "evidence.paths": {
      title: "Two claims. Two kinds of support.",
      body: "Measured sleep and transmit current, plus an assumed reporting interval, support a two-year endurance projection. A separate continuous bench run supports 72 hours observed. That run does not validate two years of endurance.",
      note: "Neither path establishes field conditions or customer deployment. The instrument displays explain the claims; no original measurements table, trace, spreadsheet or run notebook is supplied.",
    },
    "scope.answer": {
      title: "Code, connected to a bench check.",
      body: "Ada’s firmware and scheduling define device behavior; her fixture makes a physical board response accessible to observation. That is the connection from a code decision to a check on the bench.",
      note: "Six of forty assembled engineering samples were bench-tested; none went to customers. One preliminary emissions check passed. Full qualification is unfinished. The projection and bench run remain distinct evidence, with distinct limits.",
    },
  },
};
