/** Authored explanations of the supplied fictional notes, not recovered records. */
export function PowerCycle() {
  return <figure className="depth-cycle">
    <ol className="depth-cycle-steps" aria-label="Illustrative teaching cycle">
      <li><span className="depth-step-number">01</span><strong>Sleep</strong><span>Wait between work.</span></li>
      <li><span className="depth-step-number">02</span><strong>Measure</strong><span>Take a reading.</span></li>
      <li><span className="depth-step-number">03</span><strong>Transmit</strong><span>Send a report.</span></li>
    </ol>
    <p className="depth-cycle-return"><span aria-hidden="true">↶</span> Then back to Sleep.</p>
    <figcaption>Explanatory teaching loop, not Mosslink&apos;s actual firmware. No timings or current values are shown.</figcaption>
  </figure>;
}

export function EvidencePaths() {
  return <figure className="depth-paths">
    <div className="depth-path depth-path-projection">
      <h3>Inputs to an estimate</h3>
      <div className="depth-path-inputs">
        <p><strong>Measured</strong><span>Sleep and transmit current on the bench.</span></p>
        <span className="depth-path-plus" aria-hidden="true">+</span>
        <p><strong>Assumed</strong><span>The reporting interval.</span></p>
      </div>
      <p className="depth-path-result"><span aria-hidden="true">→</span><strong>2 years</strong><span>Projected battery life</span></p>
    </div>
    <div className="depth-path depth-path-observation">
      <h3>A separate observation</h3>
      <p className="depth-path-run">A continuous run on the bench.</p>
      <p className="depth-path-result"><span aria-hidden="true">→</span><strong>72 hours</strong><span>The longest observed run</span></p>
    </div>
    <figcaption>Authored explanation of the supplied fictional notes, not the original spreadsheet or a measured trace. The run does not establish two years of operation.</figcaption>
  </figure>;
}

export function SampleScope() {
  return <figure className="depth-scope">
    <dl className="depth-scope-counts">
      <div><dt>Engineering samples assembled</dt><dd>40</dd></div>
      <div><dt>Tested on the bench</dt><dd>6</dd></div>
      <div><dt>Sent to customers</dt><dd>0</dd></div>
    </dl>
    <div className="depth-sample-grid" aria-hidden="true">
      {Array.from({ length: 40 }, (_, i) => <span key={i} className={`depth-sample${i < 6 ? " is-tested" : ""}`} />)}
    </div>
    <figcaption>Six highlighted cells mark the bench-tested subset of forty. This illustrative count is not a pass/fail chart.</figcaption>
  </figure>;
}

export function PowerCycleDiagram() {
  return <svg className="fixture-diagram depth-cycle-diagram" viewBox="0 0 600 310" role="img" aria-label="Explanatory teaching loop: Sleep, then Measure, then Transmit, then back to Sleep. This is not Mosslink's actual firmware and shows no timings or current values.">
    <g fontFamily="monospace" fill="#263a33">
      <text x="24" y="28" fontSize="15">AN EXPLANATORY TEACHING LOOP</text>
      {[[24, "01", "SLEEP"], [222, "02", "MEASURE"], [420, "03", "TRANSMIT"]].map(([x, n, name]) => <g key={name} transform={`translate(${x} 63)`}>
        <rect width="156" height="112" rx="12" fill="#f5f1e6" stroke="#697667" strokeWidth="2" />
        <text x="15" y="30" fontSize="15" fill="#697667">{n}</text>
        <text x="15" y="74" fontSize="23">{name}</text>
      </g>)}
      <g fill="none" stroke="#a84c2d" strokeWidth="3">
        <path d="M182 119H211m-9-7 9 7-9 7M378 119H409m-9-7 9 7-9 7" />
        <path d="M498 176V213H102V187m-7 9 7-9 7 9" />
      </g>
      <text x="300" y="239" textAnchor="middle" fontSize="16">RETURN TO SLEEP</text>
      <text x="24" y="273" fontSize="16">Not Mosslink&apos;s actual firmware.</text>
      <text x="24" y="297" fontSize="15">No timings or current values shown.</text>
    </g>
  </svg>;
}

export function EvidencePathsDiagram() {
  return <svg className="fixture-diagram depth-evidence-diagram" viewBox="0 0 640 360" role="img" aria-label="Two separate evidence paths. Measured sleep and transmit currents plus an assumed reporting interval support a two-year battery projection. Separately, 72 hours was the longest continuous bench run. This explanatory diagram is not a measured trace or the original spreadsheet.">
    <g fontFamily="monospace" fill="#263a33">
      <text x="22" y="28" fontSize="15">INPUTS TO AN ESTIMATE</text>
      <rect x="22" y="44" width="344" height="114" rx="12" fill="#f5f1e6" stroke="#697667" />
      <text x="37" y="74" fontSize="18">Measured sleep / transmit</text>
      <text x="37" y="99" fontSize="18">current on the bench</text>
      <text x="37" y="134" fontSize="17">+ assumed reporting interval</text>
      <path d="M377 102H414m-10-7 10 7-10 7" fill="none" stroke="#a84c2d" strokeWidth="3" />
      <rect x="429" y="44" width="189" height="114" rx="12" fill="#ebe0cb" stroke="#a84c2d" />
      <text x="444" y="91" fontSize="30">2 YEARS</text>
      <text x="444" y="122" fontSize="16">Projected</text>
      <text x="444" y="143" fontSize="16">battery life</text>
      <path d="M22 184H618" stroke="#b8b9a9" />
      <text x="22" y="212" fontSize="15">A SEPARATE OBSERVATION</text>
      <rect x="22" y="228" width="344" height="78" rx="12" fill="#f5f1e6" stroke="#697667" />
      <text x="37" y="261" fontSize="20">Continuous bench run</text>
      <text x="37" y="287" fontSize="17">Longest recorded duration</text>
      <path d="M377 267H414m-10-7 10 7-10 7" fill="none" stroke="#657465" strokeWidth="3" />
      <rect x="429" y="228" width="189" height="78" rx="12" fill="#dce3ce" stroke="#697667" />
      <text x="444" y="264" fontSize="28">72 HOURS</text>
      <text x="444" y="290" fontSize="16">Observed</text>
      <text x="22" y="335" fontSize="15">Explanatory diagram from the fictional notes.</text>
      <text x="22" y="355" fontSize="14">Not the original spreadsheet or a measured trace.</text>
    </g>
  </svg>;
}
