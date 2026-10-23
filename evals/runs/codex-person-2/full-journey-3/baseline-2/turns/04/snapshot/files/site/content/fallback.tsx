import type { ReactNode } from "react";
export function Diagram({kind}:{kind:"library"|"database"|"complete"}):ReactNode{
 const description=kind==="library"?"Illustration: missing catalogue records restored from the nightly dump; a separate recovery route connects the stores.":"Illustration: writes split between old and new databases; comparison precedes read and write moves. The old target stays available as a way back.";
 // Original, self-contained local diagrams are readable without JavaScript or WebGL.
 // eslint-disable-next-line @next/next/no-img-element
 return <figure><img src={`/diagrams/${kind}.svg`} width="720" height="400" alt={description}/><figcaption>Illustration · {kind==="library"?"catalogue recovery":"dual writes and the return route"}</figcaption></figure>;
}
