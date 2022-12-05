import * as THREE from 'three'
import { store } from '../+state/store'
import { SantaXPosition } from '../models/models'
import { getRandomInteger } from '../utils/utils'
import { BEHIND_CAMERA_THRESHOLD, TRACKBASE_Z, TRACK_LENGTH, TRACK_SPEED } from './constants'
import { MeshBase } from './meshbase.abstract'

export class Gift extends MeshBase {
  mesh: THREE.Mesh

  private readonly ROTATION_SPEED = 0.05
  private readonly SIZE = 0.4

  constructor({ position }: { position?: { x: SantaXPosition; y: number } } = {}) {
    super()
    const geometry = new THREE.BoxGeometry(this.SIZE, this.SIZE, this.SIZE)
    const texture = new THREE.TextureLoader().load(require(`../assets/textures/gift.jpg`))
    texture.anisotropy = 4
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.format = THREE.RGBFormat
    const material = new THREE.MeshLambertMaterial({
      color: Math.random() * 0xffffff,
      flatShading: true,
      map: texture,
    })
    this.mesh = new THREE.Mesh(geometry, material)
    this.mesh.castShadow = true
    this.mesh.receiveShadow = false
    const { x, y } = position
    this.mesh.position.set(x, y, TRACKBASE_Z)
  }

  isBehindCamera(): boolean {
    return this.mesh.position.y <= BEHIND_CAMERA_THRESHOLD
  }

  isCollected(): boolean {
    return store.getState().santa.collectedPackages.includes(this.id)
  }

  update() {
    if (this.isBehindCamera()) return

    if (this.isCollected()) {
      this.animateCollected()
    } else {
      this.mesh.rotation.z += this.ROTATION_SPEED
      this.mesh.position.y -= TRACK_SPEED
    }
  }

  getRandomPosition(): { x: number; y: number; z: number } {
    const posX = getRandomInteger(-1, 1)
    const posY = getRandomInteger(5, TRACK_LENGTH / 2)
    const posZ = TRACKBASE_Z
    return { x: posX, y: posY, z: posZ }
  }

  animateCollected(): void {
    const direction = new THREE.Vector3(4, 2, 2)
    const worldPosition = new THREE.Vector3()
    const speed = 0.04

    this.mesh.localToWorld(worldPosition)
    const vector = direction.multiplyScalar(speed)

    this.mesh.position.x += vector.x
    this.mesh.position.y += vector.y
    this.mesh.position.z += vector.z
  }
}
