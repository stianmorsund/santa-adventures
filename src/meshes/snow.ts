import * as THREE from 'three'
import { LoadingManager } from '../utils/loading-manager'
import { MeshBase } from './meshbase.abstract'

export class Snow extends MeshBase {
  private loadingManager: LoadingManager = LoadingManager.getInstance()
  private readonly NUMBER_OF_SNOWFLAKES = 2000
  private readonly SPEED = 50
  private material: THREE.PointsMaterial
  private particles: THREE.BufferGeometry
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
      fog: false,
    })

    this.makeSnow()
  }

  simulateSnow(delta: number) {
    const positions = this.particles.attributes.position.array as unknown as number[];

    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] -= Math.random() * this.SPEED * delta;

      if (positions[i + 1] < -200) {
        positions[i + 1] = 200;
      }
    }

    this.particles.attributes.position.needsUpdate = true;
  }

  update(delta: number) {
    this.simulateSnow(delta)
  }

  getMesh() {
    return this.mesh
  }

  private makeSnow() {
    const vertices = [];

    for (let i = 0; i < this.NUMBER_OF_SNOWFLAKES; i++) {
      const x = Math.random() * 500 - 250;
      const y = Math.random() * 500 - 250;
      const z = Math.random() * 500 - 250;

      vertices.push(x, y, z);
    }

    this.particles = new THREE.BufferGeometry();
    this.particles.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    this.mesh = new THREE.Points(this.particles, this.material);
  }
}
