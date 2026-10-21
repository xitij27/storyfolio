import { copy } from "./copy";

/** Decision archive: user selected Opening A and Closing A. Alternatives retained locally. */
export const wordingVersions = [
  { id: "A", name: "Code and observation", recommended: true,
    opening: { title: copy.beats["prepare.assemble"].title, body: copy.beats["prepare.assemble"].body },
    closing: { title: copy.beats["record.close"].title, body: copy.beats["record.close"].body },
  },
  { id: "B", name: "Contribution and evidence", recommended: false,
    opening: { title: "Firmware for a physical device.", body: "I’m Ada Mensah. On Mosslink, an environmental sensor, I wrote the firmware, scheduled power states and built the bring-up fixture. I’m looking for embedded firmware roles involving physical devices." },
    closing: { title: "A projection and a run support different claims.", body: "The two-year battery figure is a projection from bench current readings and an assumed reporting cycle. The longest continuous run was 72 hours. My lesson: a firmware decision needs a physical observation." },
  },
  { id: "C", name: "From code to the bench", recommended: false,
    opening: { title: "From firmware to observation.", body: "I’m Ada Mensah. My work on Mosslink, an environmental sensor, was writing the firmware, scheduling power states and building the bring-up fixture. I’m looking for embedded firmware roles involving physical devices." },
    closing: { title: "Keep the evidence with the claim.", body: "A firmware decision needs a physical observation. For Mosslink, two years is a battery projection; 72 hours is the longest continuous run. An estimate and an observed run support different claims." },
  },
] as const;

export const wordingContext = {
  person: "Ada Mensah / Embedded firmware",
  question: "How does a firmware decision become something you can check?",
  openingNote: copy.beats["prepare.assemble"].note,
  closingNote: copy.beats["record.close"].note,
};

export const selectedWording = { opening: "A", closing: "A" } as const;
