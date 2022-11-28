import { FinishLine } from '../meshes/finish-line'
import { Gift } from '../meshes/gift'
import { Pole } from '../meshes/pole'
import { Wall } from '../meshes/wall'
import { SantaXPosition } from '../models/models'

export function getCollectedGift({
  gifts,
  santaPosition,
  isJumping,
}: {
  gifts: Gift[]
  santaPosition: SantaXPosition
  isJumping: boolean
}): Gift | undefined {
  return gifts.find((g) => Math.floor(g.mesh.position.y * 2) === 0 && g.mesh.position.x === santaPosition && !isJumping)
}

export function isWallCollision({ walls, isJumping }: { walls: Wall[]; isJumping: boolean }): boolean {
  return walls.some((wall) => Math.floor(wall.mesh.position.y * 2) === 0 && !isJumping)
}

export function isPoleCollision({ poles, isCrawling }: { poles: Pole[]; isCrawling: boolean }): boolean {
  return poles.some((pole) => Math.floor(pole.mesh.position.y * 2) === 0 && !isCrawling)
}

export function isPastFinishLine(finishLine: FinishLine): boolean {
  return Math.floor(finishLine.mesh.position.y * 2) === 0
}
