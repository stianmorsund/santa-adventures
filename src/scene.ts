import * as THREE from 'three'
import * as santa from './+state/santa-slice'
import { store } from './+state/store'
import { addControls } from './controls/controls'
import { Level1 } from './levels/level1'
import { Forest } from './meshes/forest'
import { MeshBase } from './meshes/meshbase.abstract'
import { Santa } from './meshes/santa'
import { Snow } from './meshes/snow'
import { Track } from './meshes/track'
import { getCollectedGift, isPastFinishLine, isPoleCollision, isWallCollision } from './utils/collisions'

let instance: Scene = null

export class Scene {
  private _threeScene: THREE.Scene = new THREE.Scene()
  private _meshes: MeshBase[] = []
  private track: Track = new Track().setLevel(new Level1())

  get threeScene() {
    return this._threeScene
  }

  static getInstance() {
    if (instance) {
      return instance
    } else {
      return new Scene()
    }
  }

  constructor() {
    // Singleton
    if (instance) {
      return instance
    } else {
      instance = this
    }

    this.addFog()
    this.addLights()
    addControls()

    this.addMesh(this.track, 
      new Santa(), 
      new Forest(), 
      new Snow())
  }

  addFog() {
    this._threeScene.fog = new THREE.Fog(0x16122d, 10, 30)
  }

  addLights() {
    const hemisphereLight = new THREE.HemisphereLight(0x1f305e, 0xffffff, 1.2)
    const sun = new THREE.DirectionalLight(0xf3e87f, 0.7)
    sun.position.set(10, 100, -70)
    sun.castShadow = true

    this._threeScene.add(hemisphereLight)
    this._threeScene.add(sun)
  }

  resetLevel() {
    this.track.setLevel(new Level1())
  }

  addMesh(...meshes: MeshBase[]) {
    this._meshes.push(...meshes)
    this._threeScene.add(...meshes.map((m) => m.mesh))
  }

  render(clock: THREE.Clock) {
    const delta = clock.getDelta()
    const { gifts, walls, poles, finishLine } = this.track.currentLevel
    const { hasGameStarted, isGamePaused } = store.getState().ui
    const { isAlive, isJumping, isCrawling, santaXPosition } = store.getState().santa

    if (!hasGameStarted || isGamePaused || !isAlive) {
      return
    }

    this._meshes.forEach((m) => m.update(delta))

    if (isWallCollision({ walls, isJumping })) {
      store.dispatch(santa.crashedOnWall())
    }

    if (isPoleCollision({ poles, isCrawling })) {
      store.dispatch(santa.crashedOnPole())
    }

    if (isPastFinishLine(finishLine)) {
      store.dispatch(santa.reachedFinishline())
    }

    const collected = getCollectedGift({ gifts, isJumping, santaXPosition })
    if (collected) {
      store.dispatch(santa.collectedPackage(collected.id))
    }
  }
}
