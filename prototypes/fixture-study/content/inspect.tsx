"use client";
import { useControl, useControls } from "@/components/story/controls";

const steps = [
  { label: "Command", text: "Ada wrote the firmware and scheduled its power states. Firmware is code that controls a physical device." },
  { label: "Board", text: "A command reaches the board. A colleague designed the PCB and analogue front end." },
  { label: "Fixture", text: "Ada built the bring-up fixture. It makes a board response available to bench instruments." },
  { label: "Observe", text: "The bench makes the response observable. This model explains the relationship; it does not simulate a measured signal." },
];
export function Inspect() {
  const controls = useControls();
  const selected = useControl("inspect") ?? 0;
  return <div className="inspection story-control">
    <div className="inspection-buttons" role="group" aria-label="Explore the observation relationship">
      {steps.map((step, i) => <button key={step.label} aria-pressed={selected === i} onClick={() => controls.set("inspect", i)}><span className="step-number">0{i + 1}</span>{step.label}</button>)}
    </div>
    <p className="inspection-description" aria-live="polite">{steps[selected]?.text}</p>
  </div>;
}
