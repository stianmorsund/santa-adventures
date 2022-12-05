import * as THREE from 'three'
import { BEHIND_CAMERA_THRESHOLD, TRACK_SPEED } from './constants'
import { MeshBase } from './meshbase.abstract'

import { SantaXPosition } from '../models/models'
import { LoadingManager } from '../utils/loading-manager'

export class Pole extends MeshBase {
  private readonly Z_POSITION = 1.2
  private loadingManager: LoadingManager = LoadingManager.getInstance()
  mesh: THREE.Mesh

  constructor({ position }: { position?: { x: SantaXPosition; y: number } } = {}) {
    super()

    const geometry = new THREE.CylinderGeometry(0.1, 0.1, 10, 32)
    const texture = new THREE.TextureLoader(this.loadingManager.manager).load(
      require(`../assets/textures/candycane.jpg`)
    )
    texture.anisotropy = 4
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.format = THREE.RGBFormat
    const material = new THREE.MeshLambertMaterial({
      // color: Math.random() * 0xffffff,
      flatShading: true,
      map: texture,
    })
    this.mesh = new THREE.Mesh(geometry, material)
    this.mesh.rotation.z = Math.PI / 2
    this.mesh.castShadow = true
    this.mesh.receiveShadow = false
    const { x, y } = position
    this.mesh.position.set(x, y, this.Z_POSITION)
  }

  isBehindCamera(): boolean {
    return this.mesh.position.y <= BEHIND_CAMERA_THRESHOLD
  }

  update() {
    if (this.isBehindCamera()) return
    this.mesh.position.y -= TRACK_SPEED
  }
}
