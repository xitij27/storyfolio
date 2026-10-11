# Approved story meanings

This is a five-beat prototype, with one appearance and one recognizable
illustrative physical bench apparatus. It is not a sheet/card concept.
Choose the 3D composition and implementation. No piece count, geometry,
palette, pose, camera angle, mechanism, duration or exact copy is prescribed.

The visitor is a firmware hiring manager, but technical terms still need
plain explanations. The opening raises how Ada's code becomes something
that can be checked physically. The ending must answer that question with
the supplied contribution and evidence limits.

Keep these ordered beat IDs in the supplied engine's `Beat` components.
Use one nonempty `h1` in `question`, and a nonempty `h2` in each later beat.
The headings and copy are yours to write. Every factual claim and its
limits must remain in readable HTML, including failure and still modes.
The diagrams are available teaching material, not a required composition.

## 1. `question`

Introduce Ada and the environmental sensor Mosslink. Explain firmware as
code that controls a physical device and bring-up as checking a new board's
basic operation. Establish Ada's contribution: firmware, power-state
scheduling and the bring-up fixture connect code to a physical check.
Make the opening question legible enough that the ending can resolve it.

## 2. `scheduling`

Explain scheduling through the supplied Sleep, Measure, Transmit loop:
different activities are organized over a repeated cycle. State visibly
that this is an illustrative teaching sequence, not recovered Mosslink
firmware or measured timing. Do not invent durations, current values,
states beyond the illustration, or debugging results. Help a visitor
understand what scheduling contributes to making device behavior
inspectable, rather than only showing three names.

## 3. `bench`

Explain how a firmware command, board response, fixture access and bench
observation relate. The fixture allows the behavior of a physical board
to be checked; it is not a substitute for the board's circuitry. Attribute
firmware, scheduling and fixture work to Ada, and the PCB and analogue
front end to a colleague. The relationships may have any suitable visual
representation. They do not prescribe four modules or four controls.

## 4. `evidence`

Separate the paths to two different claims. Measured sleep and transmit
current, together with an assumed reporting interval, support the two-year
projection. A separate continuous bench run supports 72 hours observed.
The 72-hour result does not validate two years of endurance. Neither path
establishes field conditions or a customer deployment. No original
spreadsheet, measurements table, current trace or run notebook is supplied.

## 5. `scope`

Resolve the opening through Ada's firmware/scheduling and fixture work
connecting a code decision to an observable bench check. Ground that answer
in the preceding explanations, then bound it: six of forty assembled
engineering samples were bench-tested, none went to customers, and one
preliminary emissions check passed while full qualification is unfinished.
Do not end with unsupported whole-product ownership, generalized success,
or a list of counts that never answers the opening.

## Across the whole prototype

Keep the same recognizable object through the scroll while its arrangement
and presentation explain the changing relationship. Detail should help a
visitor inspect the work, with readable HTML retained alongside it. A
normal phone and short-height view need a meaningful 3D treatment, with
complete still explanations for reduced motion and scene failures. Any
implemented controls must work with pointer and keyboard. These are
prototype requirements, not claims that the result already passes review.

## Implemented interpretation

The five IDs and meanings above remain the contract. Exact prototype headings
and complete explanations are in `content/copy.ts`; HTML rendering is in
`app/page.tsx`. One seven-piece physical apparatus moves from assembly to
teaching cycle, opened fixture access, separated evidence paths, and returned
assembly. This source implementation is new; supplied fictional storyboard
approval does not mean acceptance of its copy or appearance. See the handover
for actual validation and unresolved review work.
