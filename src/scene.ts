import * as THREE from 'three'
import { santaCollectedPackage, santaCrashedOnPole, santaCrashedOnWall, santaReachedFinishline } from './+state/actions'
import { store } from './+state/effects'
import { Controls } from './controls/controls'
import { LoadingManager } from './controls/loading-manager'
import { Level1 } from './levels/level1'
import { Forest } from './meshes/forest'
import { MeshBase } from './meshes/meshbase.abstract'
import { Santa } from './meshes/santa'
import { Snow } from './meshes/snow'
import { Track } from './meshes/track'
import { getCollectedGift, isHinderCollision, isPastFinishLine, isPoleCollision } from './utils/collisions'

let instance = null

export class Scene {
  track: Track
  santa: Santa
  controls: Controls
  forest: Forest
  clock = new THREE.Clock()
  level = new Level1()

  get models() {
    return this._models
  }

  get scene() {
    return this._scene
  }

  static getInstance() {
    if (instance) {
      return instance
    } else {
      return new Scene()
    }
  }
  private _scene: THREE.Scene
  private _models: MeshBase[] = []
  constructor() {
    // Singleton
    if (instance) {
      return instance
    } else {
      instance = this
    }
    this._scene = new THREE.Scene()

    this.clock.start()

    // Add some fog
    this._scene.fog = new THREE.FogExp2(0x16122d, 0.06)
    const hemisphereLight = new THREE.HemisphereLight(0x1f305e, 0xffffff, 1.2)

    this._scene.add(hemisphereLight)
    const sun = new THREE.DirectionalLight(0xf3e87f, 0.7)
    const sun2 = new THREE.DirectionalLight(0xf3e87f, 0.3)
    sun.position.set(10, 100, -70)
    sun2.position.set(20, 10, 40)
    sun.castShadow = true
    this._scene.add(sun)

    const loadingmanager = new LoadingManager()

    this.track = new Track()
    this.addModel(this.track)

    const santa = new Santa()

    this.addModel(santa)

    const controls = new Controls()

    const forest = new Forest()
    this.addModel(forest)

    const snow = new Snow()
    this.addModel(snow)

    // Use level1
    const { gifts, hinders, poles, finishLine } = this.level

    // Hinders, gifts and poles are tied to tracks matrix,
    // so it needs to be added
    this.track.addModel(...hinders, ...gifts, ...poles, finishLine)
  }

  addModel(...models: MeshBase[]) {
    this._models.push(...models)
    this._scene.add(...models.map((m) => m.mesh))
  }

  render() {
    const { gifts, hinders, poles, finishLine } = this.level
    const { isGameFinished, isGamePaused, isAlive, isJumping, isCrawling, santaPosition } = store.getState()
    if (isGamePaused || !isAlive || isGameFinished) return

    if (isHinderCollision({ hinders, isJumping })) {
      store.dispatch(santaCrashedOnWall())
    }

    if (isPoleCollision({ poles, isCrawling })) {
      store.dispatch(santaCrashedOnPole())
    }

    if (isPastFinishLine(finishLine)) {
      store.dispatch(santaReachedFinishline())
    }

    this.models.forEach((m) => m.update(this.clock))

    const collected = getCollectedGift({ gifts, isJumping, santaPosition })
    if (collected) {
      store.dispatch(santaCollectedPackage(collected.id))
    }
  }
}
