import * as THREE from 'three'
import { SantaXPosition } from '../models/models'
import { LoadingManager } from '../utils/loading-manager'
import { getRandomInteger } from '../utils/utils'
import { TRACKBASE_Z, TRACK_LENGTH, TRACK_SPEED } from './constants'
import { MeshBase } from './meshbase.abstract'

export class Wall extends MeshBase {
  private loadingManager: LoadingManager = LoadingManager.getInstance()
  geometry: THREE.BoxGeometry
  mesh: THREE.Mesh

  constructor({ position }: { position?: { x: SantaXPosition; y: number } } = {}) {
    super()

    this.geometry = new THREE.BoxGeometry(7, 0.2, 1)
    const texture = new THREE.TextureLoader(this.loadingManager.manager).load(require(`../assets/textures/snow.jpg`))
    texture.anisotropy = 4
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.format = THREE.RGBFormat
    const material = new THREE.MeshLambertMaterial({
      // color: Math.random() * 0xffffff,
      flatShading: true,
      map: texture,
    })
    this.mesh = new THREE.Mesh(this.geometry, material)
    this.mesh.castShadow = false
    this.mesh.receiveShadow = true
    const { x, y } = position
    this.mesh.position.set(x, y, TRACKBASE_Z)
  }

  update() {
    this.mesh.position.y -= TRACK_SPEED
  }

  getPosition(): { x: number; y: number; z: number } {
    const posX = getRandomInteger(-1, 1)
    const posY = getRandomInteger(5, TRACK_LENGTH / 2)
    const posZ = 0
    return { x: posX, y: posY, z: posZ }
  }

  isBehindCamera(): boolean {
    return this.mesh.position.y <= -1
  }
}
