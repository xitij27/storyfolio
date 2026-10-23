import type { ComponentType } from 'react';
import {RouteSketch,BenchSketch,RunbookSketch} from './sketch';
export const sketches:Record<string,ComponentType>={route:RouteSketch,bench:BenchSketch,runbook:RunbookSketch};
