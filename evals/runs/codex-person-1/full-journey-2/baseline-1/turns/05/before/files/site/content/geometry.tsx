"use client";
import { useEffect, useMemo } from "react";
import { BoxGeometry, DoubleSide, Quaternion, Vector3 } from "three";
export type V3 = [number, number, number];
export function Block({ position = [0,0,0], size = [1,1,1], color = "#495b50", rotation = [0,0,0] }: { position?: V3; size?: V3; color?: string; rotation?: V3 }) {
  return <mesh position={position} rotation={rotation} castShadow receiveShadow><boxGeometry args={size} /><meshStandardMaterial color={color} roughness={.92} /></mesh>;
}
export function Stroke({ from, to, color = "#9d532f", radius = .015 }: { from: V3; to: V3; color?: string; radius?: number }) {
  const a=new Vector3(...from), b=new Vector3(...to), d=b.clone().sub(a);
  return <mesh position={a.add(b).multiplyScalar(.5)} quaternion={new Quaternion().setFromUnitVectors(new Vector3(0,1,0), d.clone().normalize())} castShadow><cylinderGeometry args={[radius,radius,d.length(),8]} /><meshStandardMaterial color={color} roughness={.9} /></mesh>;
}
export function Leaf({ color, curl = .09 }: { color: string; curl?: number }) {
  const geometry = useMemo(() => {
    const g = new BoxGeometry(2.15,.018,2.95,24,1,12), p=g.attributes.position;
    for(let i=0;i<p.count;i++) p.setY(i,p.getY(i)+curl*Math.sin((p.getX(i)/2.15+.5)*Math.PI));
    g.computeVertexNormals();return g;
  },[curl]);
  useEffect(()=>()=>geometry.dispose(),[geometry]);
  return <mesh geometry={geometry} castShadow receiveShadow><meshStandardMaterial color={color} side={DoubleSide} roughness={.92} /></mesh>;
}
export function Catalogue({ accent }: { accent: string }) {
  return <group position={[0,.04,-.45]}>
    <Block position={[0,.65,0]} size={[2.25,1.3,.78]} color="#ae9370" />
    {[-.74,0,.74].flatMap(x=>[0,1,2].map(row=><group key={`${x}-${row}`} position={[x,.24+row*.4,.415]}>
      <Block size={[.66,.32,.04]} color="#e0cfaa" /><Block position={[0,-.01,.045]} size={[.19,.055,.04]} color="#34443c" />
    </group>))}
    <Block position={[1.4,.5,-.1]} size={[.15,.92,.65]} color={accent} rotation={[0,0,-.15]} />
    <Block position={[-1.4,.43,-.1]} size={[.16,.8,.65]} color="#657866" rotation={[0,0,.13]} />
  </group>;
}
