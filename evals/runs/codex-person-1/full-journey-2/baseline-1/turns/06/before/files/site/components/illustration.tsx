export function Illustration({name,alt,caption="Illustration · own geometry"}:{name:string;alt:string;caption?:string}){
 return <figure>
 {/* A local SVG has an explicit size and needs no image optimizer. */}
 {/* eslint-disable-next-line @next/next/no-img-element */}
 <img src={`/illustrations/${name}.svg`} width="720" height="500" alt={alt}/>
 <figcaption>{caption}</figcaption></figure>;
}
