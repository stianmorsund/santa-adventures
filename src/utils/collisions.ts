import { FinishLine } from '../meshes/finish-line';
import { Gift } from '../meshes/gift';
import { Hinder } from '../meshes/hinder';
import { Pole } from '../meshes/pole';
import { PossibleXPositions } from '../models/models';

export function getCollectedGift({
  gifts,
  santaPosition,
  isJumping,
}: {
  gifts: Gift[];
  santaPosition: PossibleXPositions;
  isJumping: boolean;
}): Gift | undefined {
  return gifts.find(
    (g) => Math.floor(g.mesh.position.y * 2) === 0 && g.mesh.position.x === santaPosition && !isJumping
  );
}

export function isHinderCollision({ hinders, isJumping }: { hinders: Hinder[]; isJumping: boolean }): boolean {
  return hinders.some((hinder) => Math.floor(hinder.mesh.position.y * 2) === 0 && !isJumping);
}

export function isPoleCollision({ poles, isCrawling }: { poles: Pole[]; isCrawling: boolean }): boolean {
  return poles.some((pole) => Math.floor(pole.mesh.position.y * 2) === 0 && !isCrawling);
}

export function isPastFinishLine(finishLine: FinishLine): boolean {
  return Math.floor(finishLine.mesh.position.y * 2) === 0;
}
