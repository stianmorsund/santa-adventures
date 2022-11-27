import * as THREE from 'three'
import { santaCollectedPackage, santaCrashedOnPole, santaCrashedOnWall, santaReachedFinishline } from './+state/actions'
import { store } from './+state/effects'
import { Controls } from './controls/controls'
import { LoadingManager } from './controls/loading-manager'
import { Level } from './levels/level.abstract'
import { Level1 } from './levels/level1'
import { Forest } from './meshes/forest'
import { MeshBase } from './meshes/meshbase.abstract'
import { Santa } from './meshes/santa'
import { Snow } from './meshes/snow'
import { Track } from './meshes/track'
import { getCollectedGift, isHinderCollision, isPastFinishLine, isPoleCollision } from './utils/collisions'

let instance = null

export class Scene {
  private _threeScene: THREE.Scene
  private _meshes: MeshBase[] = []
  controls = new Controls()
  loadingManager = new LoadingManager()
  track: Track
  clock = new THREE.Clock()
  level: Level

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
    this._threeScene = new THREE.Scene()
    this._threeScene.fog = new THREE.FogExp2(0x16122d, 0.06)
    this.clock.start()

    const hemisphereLight = new THREE.HemisphereLight(0x1f305e, 0xffffff, 1.2)
    const sun = new THREE.DirectionalLight(0xf3e87f, 0.7)
    sun.position.set(10, 100, -70)
    sun.castShadow = true

    this._threeScene.add(hemisphereLight)
    this._threeScene.add(sun)

    this.track = new Track().setLevel(new Level1())
    this.addMesh(this.track, new Santa(), new Forest(), new Snow())
  }

  addMesh(...meshes: MeshBase[]) {
    this._meshes.push(...meshes)
    this._threeScene.add(...meshes.map((m) => m.mesh))
  }

  render() {
    const { gifts, hinders, poles, finishLine } = this.track.currentLevel
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

    this._meshes.forEach((m) => m.update(this.clock))

    const collected = getCollectedGift({ gifts, isJumping, santaPosition })
    if (collected) {
      store.dispatch(santaCollectedPackage(collected.id))
    }
  }
}
