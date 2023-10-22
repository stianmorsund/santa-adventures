import * as THREE from 'three'
import { LoadingManager } from '../utils/loading-manager'
import { MeshBase } from './meshbase.abstract'

export class Snow extends MeshBase {
  private loadingManager: LoadingManager = LoadingManager.getInstance()
  private readonly NUMBER_OF_SNOWFLAKES = 2000
  private readonly SPEED = 100
  private material: THREE.PointsMaterial
  private particles: THREE.Geometry
  public mesh: THREE.Points

  constructor() {
    super()
    const snowFlake = require('../assets/textures/snowflake.png')
    this.material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1,
      map: new THREE.TextureLoader(this.loadingManager.manager).load(snowFlake),
      blending: THREE.AdditiveBlending,
      depthTest: true,
      transparent: true,
      flatShading: true,
      fog: false,
    })

    this.makeSnow()
  }

  simulateSnow(delta: number) {
    let pCount = this.NUMBER_OF_SNOWFLAKES
    while (pCount--) {
      const particle = this.particles.vertices[pCount]
      if (particle.y < -200) {
        particle.y = 200
      }
      const velocity = 0 - Math.random() * this.SPEED * delta
      particle.y += velocity
    }

    this.particles.verticesNeedUpdate = true
  }

  update(delta: number) {
    this.simulateSnow(delta)
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
