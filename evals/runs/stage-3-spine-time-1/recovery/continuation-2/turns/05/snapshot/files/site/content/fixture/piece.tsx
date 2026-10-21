import type { PieceProps } from "@/components/story/types";

/** Original teaching geometry. No dimensions, wiring or real fixture are reproduced. */
export function FixtureSegment({ material, look }: PieceProps) {
  const dark = look.id === "dark";
  const metal = dark ? "#9eafb1" : "#a1acae";
  const insulator = dark ? "#1c343a" : "#394449";
  return <group>
    <mesh position={[0, -.32, 0]} castShadow receiveShadow>
      <boxGeometry args={[.98, .42, 1.58]} />
      <meshStandardMaterial color={look.surface.color} roughness={.58} metalness={.45} />
    </mesh>
    {[-.56, .56].map(z => <mesh key={z} position={[0, -.08, z]} rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[.045, .045, .98, 12]} />
      <meshStandardMaterial color={metal} roughness={.35} metalness={.75} />
    </mesh>)}
    {[-.33, .33].map(x => <group key={x}>
      <mesh position={[x, -.61, .1]}><boxGeometry args={[.2, .16, 1.15]} /><meshStandardMaterial color={insulator} roughness={.9} /></mesh>
      <mesh position={[x, -.09, -.56]} rotation={[-Math.PI / 2, 0, 0]}><cylinderGeometry args={[.075, .075, .04, 12]} /><meshStandardMaterial color={insulator} metalness={.3} /></mesh>
      <mesh position={[x, .35, -.29]}><cylinderGeometry args={[.06, .085, .92, 16]} /><meshStandardMaterial color={metal} roughness={.25} metalness={.8} /></mesh>
      <mesh position={[x, .87, -.29]}><cylinderGeometry args={[.025, .055, .16, 12]} /><meshStandardMaterial color={look.accent} roughness={.3} metalness={.55} /></mesh>
      {[.08, .16, .24].map(y => <mesh key={y} position={[x, y, -.29]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.078, .015, 6, 12]} /><meshStandardMaterial color={metal} metalness={.7} roughness={.4} /></mesh>)}
    </group>)}
    <mesh position={[0, .1, .23]}><boxGeometry args={[.68, .43, .5]} /><meshStandardMaterial color={insulator} roughness={.78} /></mesh>
    <mesh position={[0, .34, .23]}><boxGeometry args={[.68, .055, .5]} /><meshStandardMaterial color={look.accent} roughness={.48} metalness={.25} /></mesh>
    <mesh position={[0, -.31, .798]} material={material}><planeGeometry args={[.9, .35]} /></mesh>
  </group>;
}
