import * as THREE from 'three'
import { LoadingManager } from '../controls/loading-manager'
import { MeshBase } from './meshbase.abstract'

export class Snow extends MeshBase {
  private loadingManager: LoadingManager = LoadingManager.getInstance()
  public readonly NUMBER_OF_SNOWFLAKES = 2000
  public readonly SPEED = 2
  public material: THREE.PointsMaterial
  public particles: THREE.Geometry
  public mesh: THREE.Points

  constructor() {
    super()
    const snowFlake = require('../assets/textures/snowflake.png')
    this.material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 2,
      map: new THREE.TextureLoader(this.loadingManager.manager).load(snowFlake),
      blending: THREE.AdditiveBlending,
      depthTest: true,
      transparent: true,
      flatShading: true,
      fog: false,
    })

    this.makeSnow()
  }

  simulateSnow() {
    let pCount = this.NUMBER_OF_SNOWFLAKES
    while (pCount--) {
      const particle = this.particles.vertices[pCount]
      if (particle.y < -200) {
        particle.y = 200
      }
      const velocity = 0 - Math.random() * this.SPEED
      particle.y += velocity
    }

    this.particles.verticesNeedUpdate = true
  }

  update() {
    this.simulateSnow()
  }

  getMesh() {
    return this.mesh
  }

  private makeSnow() {
    this.particles = new THREE.Geometry()
    for (let i = 0; i < this.NUMBER_OF_SNOWFLAKES; i++) {
      const particle = new THREE.Vector3(
        Math.random() * 500 - 250,
        Math.random() * 500 - 250,
        Math.random() * 500 - 250
      )
      this.particles.vertices.push(particle)
    }
    this.mesh = new THREE.Points(this.particles, this.material)
  }
}
