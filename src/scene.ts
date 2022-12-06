import * as Stats from 'stats.js'

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
  private clock = new THREE.Clock()
  private stats = new Stats()

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

    this.addMesh(this.track, new Santa(), new Forest(), new Snow())

    this.addStats()
  }

  addFog() {
    this._threeScene.fog = new THREE.FogExp2(0x16122d, 0.06)
  }

  addLights() {
    const hemisphereLight = new THREE.HemisphereLight(0x1f305e, 0xffffff, 1.2)
    const sun = new THREE.DirectionalLight(0xf3e87f, 0.7)
    sun.position.set(10, 100, -70)
    sun.castShadow = true

    this._threeScene.add(hemisphereLight)
    this._threeScene.add(sun)
  }

  addStats() {
    this.stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(this.stats.dom)
    this.stats.begin()
  }

  resetLevel() {
    this.track.setLevel(new Level1())
  }

  addMesh(...meshes: MeshBase[]) {
    this._meshes.push(...meshes)
    this._threeScene.add(...meshes.map((m) => m.mesh))
  }

  render() {
    this.stats.begin()
    const { gifts, walls, poles, finishLine } = this.track.currentLevel
    const { hasGameStarted, isGamePaused } = store.getState().ui
    const { isAlive, isJumping, isCrawling, santaPosition } = store.getState().santa

    if (!hasGameStarted || isGamePaused || !isAlive) {
      this.stats.end()
      return
    }

    this._meshes.forEach((m) => m.update(this.clock))

    if (isWallCollision({ walls, isJumping })) {
      store.dispatch(santa.crashedOnWall())
    }

    if (isPoleCollision({ poles, isCrawling })) {
      store.dispatch(santa.crashedOnPole())
    }

    if (isPastFinishLine(finishLine)) {
      store.dispatch(santa.reachedFinishline())
    }

    const collected = getCollectedGift({ gifts, isJumping, santaPosition })
    if (collected) {
      store.dispatch(santa.collectedPackage(collected.id))
    }
    this.stats.end()
  }
}
