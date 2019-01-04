import * as THREE from 'three';
import { MeshBase } from './meshbase.abstract';

export class Snow extends MeshBase {
  public readonly NUMBER_OF_SNOWFLAKES = 2000;
  public readonly SPEED = 2;
  public material: THREE.PointsMaterial;
  public particles: THREE.Geometry;
  public mesh: THREE.Points;

  constructor() {
    super();
    const snowFlake = require('../assets/textures/snowflake.png');
    this.material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 2,
      map: new THREE.TextureLoader().load(snowFlake),
      blending: THREE.AdditiveBlending,
      depthTest: true,
      transparent: true,
      flatShading: true,
      fog: false
    });

    // this.material.flatShading = true;

    this.particles = new THREE.Geometry();
    this.makeSnow();
    this.mesh = new THREE.Points(this.particles, this.material);
    // this.mesh.position.y = 5;
    // this.mesh.position.z = 1;
  }

  simulateSnow() {
    let pCount = this.NUMBER_OF_SNOWFLAKES;
    while (pCount--) {
      const particle = this.particles.vertices[pCount];
      if (particle.y < -200) {
        particle.y = 200;
      }
      // Give random y-value
      const velocity = 0 - Math.random() * this.SPEED;
      particle.y += velocity;
    }

    this.particles.verticesNeedUpdate = true;
  }

  update() {
    this.simulateSnow();
  }

  getMesh() {
    return this.mesh;
  }

  /**
   * Make N snowflakes with random position
   * @private
   */
  private makeSnow() {
    for (let i = 0; i < this.NUMBER_OF_SNOWFLAKES; i++) {
      const particle = new THREE.Vector3(
        Math.random() * 500 - 250,
        Math.random() * 500 - 250,
        Math.random() * 500 - 250
      );
      this.particles.vertices.push(particle);
    }
  }
}
