import { FinishLine } from '../meshes/finish-line'
import { Gift } from '../meshes/gift'
import { Pole } from '../meshes/pole'
import { Wall } from '../meshes/wall'
import { SantaXPosition } from '../models/models'

const SANTA_COLLISION_THRESHOLD = 2 // Can be increased so that collisins occurs further away from santa
const SANTA_Y_POSITION = 0 // Never changes

export function getCollectedGift({
  gifts,
  santaXPosition,
  isJumping,
}: {
  gifts: Gift[]
  santaXPosition: SantaXPosition
  isJumping: boolean
}): Gift | undefined {
  return gifts.find(
    (g) =>
      Math.floor(g.mesh.position.y * SANTA_COLLISION_THRESHOLD) === SANTA_Y_POSITION &&
      g.mesh.position.x === santaXPosition &&
      !isJumping
  )
}

export function isWallCollision({ walls, isJumping }: { walls: Wall[]; isJumping: boolean }): boolean {
  return walls.some(
    (wall) => Math.floor(wall.mesh.position.y * SANTA_COLLISION_THRESHOLD) === SANTA_Y_POSITION && !isJumping
  )
}

export function isPoleCollision({ poles, isCrawling }: { poles: Pole[]; isCrawling: boolean }): boolean {
  return poles.some(
    (pole) => Math.floor(pole.mesh.position.y * SANTA_COLLISION_THRESHOLD) === SANTA_Y_POSITION && !isCrawling
  )
}

export function isPastFinishLine(finishLine: FinishLine): boolean {
  if (!finishLine) {
    return false
  }
  return Math.floor(finishLine.mesh.position.y * SANTA_COLLISION_THRESHOLD) === SANTA_Y_POSITION
}
