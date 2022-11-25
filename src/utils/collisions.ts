import { FinishLine } from '../meshes/finish-line';
import { Gift } from '../meshes/gift';
import { Hero } from '../meshes/hero';
import { Hinder } from '../meshes/hinder';
import { Pole } from '../meshes/pole';

export function getCollectedGift(gifts: Gift[], hero: Hero): Gift | undefined {
  return gifts.find(
    (g) => Math.floor(g.mesh.position.y * 2) === 0 && g.mesh.position.x === hero.currentPosition && !hero.isJumping
  );
}

export function isHinderCollision(hinders: Hinder[], hero: Hero): boolean {
  return hinders.some((hinder) => Math.floor(hinder.mesh.position.y * 2) === 0 && !hero.isJumping);
}

export function isPoleCollision(poles: Pole[], hero: Hero): boolean {
  return poles.some((pole) => Math.floor(pole.mesh.position.y * 2) === 0 && !hero.isCrawling);
}

export function isPastFinishLine(finishLine: FinishLine): boolean {
  return Math.floor(finishLine.mesh.position.y * 2) === 0;
}
