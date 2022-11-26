import * as THREE from 'three'
import { TRACK_SPEED } from './constants'
import { MeshBase } from './meshbase.abstract'

export class Enemy extends MeshBase {
  geometry: THREE.SphereGeometry
  isHit: boolean = false
  position: { x: number; y: number; z: number }
  material: any
  mesh: any
  private readonly SIZE = 0.008

  constructor(mesh: any, position?: { x: number; y: number; z: number }) {
    super()
    this.position = position

    this.mesh = mesh
    this.buildEnemy()
  }

  buildEnemy() {
    this.mesh.rotation.x = Math.PI / 2
    this.mesh.scale.set(this.SIZE, this.SIZE, this.SIZE)
    const mesh = this.mesh.children[0]
    const hat = mesh.material.find((m) => m.name === 'hatmat')
    const hands = mesh.material.find((m) => m.name === 'handsmat')
    hat.color.setHex(0x222222)
    hands.color.setHex(0x222222)
    mesh.receiveShadow = true
    mesh.castShadow = true

    const { x, y, z } = this.position
    this.mesh.position.set(x, y, z)
  }

  update() {
    if (!this.mesh) {
      return
    }

    this.mesh.position.y -= TRACK_SPEED * 2

    // Reset position when behind camera
    if (this.isBehindCamera()) {
      this.isHit = false
      const { x, y, z } = this.position
      this.mesh.position.set(x, y, z)
    }
  }

  isBehindCamera(): boolean {
    return this.mesh.position.y <= -1
  }
}
