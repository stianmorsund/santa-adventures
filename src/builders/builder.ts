/**
 * Builders for stuff on the track
 */

import { TRACKBASE_Z, NUMBER_OF_GIFTS, POLE_Z } from '../meshes/constants';
import { Gift } from '../meshes/gift';
import { Hinder } from '../meshes/hinder';
import { LightHinder } from '../meshes/light-hinder';
import { getRandomInteger } from '../utils/utils';

// Todo; encapsulate into Track1
export function buildLightHinders(): LightHinder[] {
  
  return [
    new LightHinder({ position: {x: 0, y: 100, z: POLE_Z}})
  ];
}

export function buildHinders(): Hinder[] {
  
  return [
    new Hinder({ position: { x: 0, y: 60, z: TRACKBASE_Z } })
  ]
}

export function buildGifts(): Gift[] {

  return [
    new Gift({ position: { x: -1, y: 30, z: TRACKBASE_Z } }),
    new Gift({ position: { x: 0, y: 30, z: TRACKBASE_Z } }),
    new Gift({ position: { x: 1, y: 30, z: TRACKBASE_Z } }),
    // 
    new Gift({ position: { x: -1, y: 70, z: TRACKBASE_Z } }),
    new Gift({ position: { x: 0, y: 70, z: TRACKBASE_Z } }),
    new Gift({ position: { x: 1, y: 70, z: TRACKBASE_Z } }),
    //
    new Gift({ position: { x: 1, y: 80, z: TRACKBASE_Z } }),
    //
    new Gift({ position: { x: 1, y: 105, z: TRACKBASE_Z } }),
    new Gift({ position: { x: 1, y: 107, z: TRACKBASE_Z } }),
    new Gift({ position: { x: 1, y: 109, z: TRACKBASE_Z } }),
    new Gift({ position: { x: 1, y: 111, z: TRACKBASE_Z } }),
    new Gift({ position: { x: 0, y: 113, z: TRACKBASE_Z } }),
    new Gift({ position: { x: -1, y: 115, z: TRACKBASE_Z } }),
    
  ];
}
