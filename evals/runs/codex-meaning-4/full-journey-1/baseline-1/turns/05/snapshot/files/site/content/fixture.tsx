import type {PieceProps} from '@/components/story/types';
export function FixtureBar({material,look}:PieceProps){return <group>
 <mesh castShadow receiveShadow><boxGeometry args={[1,.92,.22]}/><meshStandardMaterial color={look.surface.color} roughness={look.surface.roughness}/></mesh>
 <mesh position={[0,0,.116]} material={material}><planeGeometry args={[1,.92]}/></mesh>
 {Array.from({length:5},(_,j)=><mesh key={j} position={[-.35+j*.175,0,.128]} scale={[.04,.31,.04]}><torusGeometry args={[1,.13,8,24]}/><meshStandardMaterial color={look.id==='dark'?'#a9b5ae':'#c3c9bd'} metalness={.65} roughness={.38}/></mesh>)}
 {[-.46,.46].map(x=><mesh key={x} position={[x,0,.14]}><boxGeometry args={[.02,.84,.065]}/><meshStandardMaterial color="#a6b0a8" metalness={.6} roughness={.4}/></mesh>)}
 </group>}
