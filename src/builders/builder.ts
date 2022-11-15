import { NUMBER_OF_GIFTS } from '../meshes/constants';
import { Gift } from '../meshes/gift';
import { Hinder } from '../meshes/hinder';
import { LightHinder } from '../meshes/light-hinder';
import { getRandomInteger } from '../utils/utils';

export function buildLightHinders(): LightHinder[] {
  return Array.from({ length: 10 }, (_, i) => new LightHinder({ position: { x: 0, y: i * 30 + 30, z: 1 } }));
}

export function buildHinders(): Hinder[] {
  return Array.from(
    { length: 10 },
    (_, i) => new Hinder({ position: { x: getRandomInteger(-1, 1), y: i * 20 + 20, z: 0 } })
  );
}

export function buildGifts(): Gift[] {
  return Array.from({ length: NUMBER_OF_GIFTS }, () => new Gift());
}
