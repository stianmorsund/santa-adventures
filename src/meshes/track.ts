import * as THREE from 'three'
import { LoadingManager } from '../controls/loading-manager'
import { TRACK_LENGTH } from './constants'
import { MeshBase } from './meshbase.abstract'

export class Track extends MeshBase {
  private loadingManager: LoadingManager = LoadingManager.getInstance()
  geometry: THREE.PlaneGeometry
  mesh: THREE.Mesh
  children: MeshBase[] // Children of track should follow the track

  constructor() {
    super()
    this.geometry = new THREE.PlaneGeometry(10, TRACK_LENGTH, 32)

    const texture = new THREE.TextureLoader(this.loadingManager.manager).load(
      require('../assets/textures/snow_down.jpg')
    )
    texture.anisotropy = 4
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.format = THREE.RGBFormat
    const material = new THREE.MeshLambertMaterial({ color: 0xffffff, map: texture })
    this.mesh = new THREE.Mesh(this.geometry, material)
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
    this.children = models
    models.forEach((m) => {
      this.mesh.add(m.mesh)
    })
  }
}
