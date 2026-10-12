# Operation 02: phone enclosure chooser diagnosis

The saved failure is not a failure to scroll a below-fold link into view. Both phone trials record `scroll: 0`, `inView: true`, `visible: true`, `disabled: false`. Only `hitTarget` is false. The keyboard trial reached and focused the exact enclosure link in two Tab presses. These observations do not establish inaccessible navigation.

Operation 02 closed normally with code 1, not a signal or timeout: the bounded child records 49898 ms, `timedOut: false`, `externalSignal: null`, `signal: null`, `logError: null`; the outer recorder closed at `2026-10-12T19:53:10.264Z`, duration 51616 ms, with child exit/close observed and no signal. The artifact manifest remains `complete: true`, `passed: false`, `sourceUnchanged: true` for 185 files. Its desktop report has no recorded problems; the phone report has four recorded problems from the two unexercised trials and absent alternative responses. Coordinator closure remains incomplete/failed. No rescore, retry or turn-3 permission follows from this diagnosis.

## Mechanism supported by the evidence

The saved `site/app/page.tsx` uses an ordinary Next link for “Inside the power cycle ↗”. Its `.concept-index li a` rule sets font properties but does not make it block-level. The two phone before originals show the title on one line and its arrow on a second line. The keyboard image visibly outlines the two-line focused link. No overlay is apparent in those originals.

The immutable worker, [gate-worker.mjs](measurement/gate-worker.mjs:91), calls `scrollIntoViewIfNeeded()`. It then optionally tabs to the control, samples `getBoundingClientRect()` and tests `elementFromPoint()` at the center of that union rectangle. It requires that center to hit the element or a descendant before either pointer click or keyboard activation. For both failed trials, the rectangle is `(52.796875, 482.875, 302.4375, 63)`, making the tested point `(204.015625, 514.375)`.

A wrapping inline element's union rectangle can include blank space between or beside its line fragments. The saved wrapping, geometry and false center hit strongly support an apparatus-specific false negative at that union center, not missing scroll or disabled focus. The worker does not save individual client rectangles or the identity of the hit element, so the exact runtime hit cause is not proved retrospectively. No new browser experiment was performed.

There is also affirmative, limited runtime evidence already in the same phone report: `initialActivation.fromRoute` is `/`, and its observation is `/sketch/enclosure`. The unchanged `choice-activation.mjs` obtains the exact selector/name and performs an ordinary locator click before recording that observation. Thus an actual click on this chooser already succeeded during initial activation. It does not substitute for the separately required pointer/keyboard before/after trials. Those trials failed at the precondition before click/Enter, so their `activated: false` and absent after images do not mean that the app ignored an activation that was actually sent.

## Review and retained limits

This reviewer individually viewed the two saved originals with `view_image` at original detail:

| Artifact under `concepts-1/batches/02/artifacts/` | Bytes | SHA-256 |
| --- | ---: | --- |
| `02-phone/pointer-before.png` | 70659 | `64007eb1db7e48cf86de3ab24661fea79bf2c8e1d173863a3c630e674caba5c3` |
| `02-phone/keyboard-before.png` | 71099 | `89abdd00bcb48dfa5841c32bf33dfa72dd0871d4ab3403832dd664da00beb9ae` |

The phone report SHA-256 is `fbc80fefd0dc11d7ae0e0b501d93fe2690118299270fc9b1367657756a913ae0`; desktop report is `9a7877eb1b32e7ab5320ae046d4385ac19c8340294ead734b3674fce2a4397b0`; manifest is `99186a4950151671ab2e94cfd672dbade6f902e855db4392e1689582557308b9`. The reviewed worker hash `32a36aa26ce05ccd3e1c269aa50d719e47ab24bfb4deb4891f21211c27579e37` equals its frozen supplemental binding.

The other source reviewer independently reached the same qualified inline-fragment diagnosis without execution. This finding explains why the generic assertion text is too broad to attribute the failure to inaccessible app navigation. It does not make the incomplete required trial coverage a pass, establish the unmeasured seven remaining batches, or finish the concept gate. Root stopped the sequence; no source/helper change or runtime was made for this diagnosis.
