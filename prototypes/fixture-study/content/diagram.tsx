/** Authored vector explanation, retained in server HTML without JS or WebGL. */
export function Diagram({ mode }: { mode: "assembly" | "relationship" | "evidence" }) {
  const connected = mode === "relationship";
  const positions = connected ? [[40, 30], [340, 30], [340, 205], [40, 205]] : [[70, 155], [100, 40], [305, 170], [320, 30]];
  const labels = ["COMMAND", "BOARD", "FIXTURE", "OBSERVE"];
  return <svg className="fixture-diagram" viewBox="0 0 580 350" role="img" aria-label={connected ? "Firmware command leads to board response, through the fixture to a bench observation. Relationships, not wiring." : "An illustrative bench assembly with command, board, fixture and observation modules."}>
    <defs><marker id={`arrow-${mode}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 10 5 0 10Z" fill="#a84c2d" /></marker></defs>
    {!connected && <><path d="M30 25H550V317H30Z" fill="#c6c5b4" stroke="#828e80" strokeWidth="2"/><path d="M46 41H534V300H46Z" fill="none" stroke="#e3e1d4" strokeWidth="5"/>{[50, 530].flatMap(x => [46, 296].map(y => <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill="#657465"/>))}</>}
    {connected && <g stroke="#a84c2d" strokeWidth="3" fill="none" markerEnd={`url(#arrow-${mode})`}><path d="M241 85H325"/><path d="M440 140V190"/><path d="M340 260H257"/></g>}
    {positions.map(([x, y], i) => <g key={i} transform={`translate(${x} ${y})`}>
      <rect x="0" y="7" width="200" height="113" rx="10" fill="#616d61"/>
      <rect width="200" height="108" rx="10" fill={i === 1 ? "#9cae96" : "#f5f1e6"} stroke="#697667" strokeWidth="1.5"/>
      <text x="15" y="28" fill="#697667" fontSize="10" fontFamily="monospace">0{i + 1} / {i === 2 ? "ACCESS" : "BENCH STUDY"}</text>
      <text x="15" y="55" fill="#263a33" fontSize="21" fontFamily="monospace">{labels[i]}</text>
      <path d="M15 69H180" stroke="#b8b9a9"/>
      <text x="15" y="91" fill="#39483e" fontSize="11" fontFamily="monospace">{i === 3 && mode === "evidence" ? "72h run / 2yr projection" : ["FIRMWARE DECISION", "COLLEAGUE'S CIRCUITRY", "ADA'S BRING-UP FIXTURE", "BENCH OBSERVATION"][i]}</text>
      <circle cx="181" cy="22" r="3" fill="#a84c2d"/>
    </g>)}
    <text x="30" y="342" fill="#5e6660" fontSize="11" fontFamily="monospace">ILLUSTRATIVE MODEL / NOT A WIRING PLAN</text>
  </svg>;
}
