import * as THREE from 'three'

import { Level } from '../levels/level.abstract'
import { LoadingManager } from '../utils/loading-manager'
import { TRACK_LENGTH } from './constants'
import { MeshBase } from './meshbase.abstract'

export class Track extends MeshBase {
  private loadingManager: LoadingManager = LoadingManager.getInstance()
  geometry: THREE.PlaneGeometry
  mesh: THREE.Mesh
  children: MeshBase[] = []
  currentLevel: Level

  constructor() {
    super()
    this.buildPlane()
  }

  setLevel(level: Level) {
    this.resetTrackChildren()
    this.currentLevel = level

    // Add everything that are tied to track-plane
    this.addMesh(...this.currentLevel.meshes)
    return this
  }

  resetTrackChildren() {
    this.mesh.remove(...this.children.map((c) => c.mesh))
    this.children = []
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

  addMesh(...meshes: MeshBase[]) {
    this.children.push(...meshes)
    this.mesh.add(...meshes.map((m) => m.mesh))
  }
}
