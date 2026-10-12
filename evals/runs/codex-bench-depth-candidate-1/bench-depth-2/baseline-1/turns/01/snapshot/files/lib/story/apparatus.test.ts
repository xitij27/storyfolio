import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formations } from '../../content/formations.ts';
import type { Pose } from './formation.ts';
import { blankFormation, mixFormation } from './formation.ts';

// Regression for the browser-observed occlusion during staggered travel.
// Synchronized interpolation must retain clear space between printed panels.
test('apparatus panels retain clearance through every adjacent transition', () => {
 const beats=Object.values(formations);
 for(let b=0;b<beats.length-1;b++)for(let step=0;step<=20;step++){
  const f=mixFormation(blankFormation(6),beats[b].rest,beats[b+1].rest,step/20);
  const [fixture,board,command,observation,projection,run]=f.pieces;
  const right= (p: Pose)=>p.position[0]+p.size[0]/2;
  const left= (p: Pose)=>p.position[0]-p.size[0]/2;
  const top= (p: Pose)=>p.position[1]+p.size[1]/2;
  const bottom= (p: Pose)=>p.position[1]-p.size[1]/2;
  assert.ok(right(command)<left(board),`command / board at ${b}:${step}`);
  assert.ok(right(board)<left(observation),`board / observation at ${b}:${step}`);
  assert.ok(top(board)<bottom(projection),`board / projection at ${b}:${step}`);
  assert.ok(top(board)<bottom(run),`board / run at ${b}:${step}`);
  assert.ok(right(projection)<left(run),`separate evidence at ${b}:${step}`);
  assert.ok(top(fixture)<bottom(board),`fixture / board at ${b}:${step}`);
 }
});
