import * as THREE from 'three'
import { LoadingManager } from '../controls/loading-manager'
import { Level } from '../levels/level.abstract'
import { TRACK_LENGTH } from './constants'
import { MeshBase } from './meshbase.abstract'

export class Track extends MeshBase {
  private loadingManager: LoadingManager = LoadingManager.getInstance()
  geometry: THREE.PlaneGeometry
  mesh: THREE.Mesh
  children: MeshBase[] = [] // Children of track should follow the track
  currentLevel: Level

  constructor() {
    super()
    this.buildPlane()
  }

  setLevel(level: Level) {
    this.currentLevel = level

    // Add everything that are tied to track-plane
    const { gifts, hinders, poles, finishLine } = this.currentLevel
    this.addModel(...hinders, ...gifts, ...poles, finishLine)
    return this
  }

  private buildPlane() {
    const texture = new THREE.TextureLoader(this.loadingManager.manager).load(
      require('../assets/textures/snow_down.jpg')
    )
    texture.anisotropy = 4
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.format = THREE.RGBFormat
    const geometry = new THREE.PlaneGeometry(10, TRACK_LENGTH, 32)
    const material = new THREE.MeshLambertMaterial({ color: 0xffffff, map: texture })
    this.mesh = new THREE.Mesh(geometry, material)
    this.mesh.castShadow = true
    this.mesh.receiveShadow = true
    this.mesh.position.y = 0
    this.mesh.position.z = 5
    this.mesh.rotation.x = 4.75
  }

  update(_clock: THREE.Clock) {
    this.children.forEach((m) => m.update())
  }

  addModel(...models: MeshBase[]) {
    this.children.push(...models)
    this.mesh.add(...models.map((m) => m.mesh))
  }
}
