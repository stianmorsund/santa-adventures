import * as THREE from 'three';

export class Snow {
  public readonly NUMBER_OF_SNOWFLAKES = 2000;
  public readonly SPEED = 2;
  public material: THREE.PointsMaterial;
  public particles: THREE.Geometry;
  public particleSystem: THREE.Points;

  constructor() {
    const snowFlake = require('../assets/textures/snowflake.png');
    this.material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 2,
      map: new THREE.TextureLoader().load(snowFlake),
      blending: THREE.AdditiveBlending,
      depthTest: true,
      transparent: true
    });
    this.particles = new THREE.Geometry();
    this.makeSnow();
    this.particleSystem = new THREE.Points(this.particles, this.material);
  }

  /**
   * Make N snowflakes with random position
   * @private
   */
  private makeSnow() {
    for (let i = 0; i < this.NUMBER_OF_SNOWFLAKES; i++) {
      let pX = Math.random() * 500 - 250,
        pY = Math.random() * 500 - 250,
        pZ = Math.random() * 500 - 250,
        particle = new THREE.Vector3(pX, pY, pZ);

      this.particles.vertices.push(particle);
    }
  }

  public simulateSnow() {
    let pCount = this.NUMBER_OF_SNOWFLAKES;
    while (pCount--) {
      let particle = this.particles.vertices[pCount];
      if (particle.y < -200) {
        particle.y = 200;
      }

      // Give random y-value
      const velocity = 0 - Math.random() * this.SPEED;
      particle.y += velocity;
    }

    this.particles.verticesNeedUpdate = true;
  }

  /**
   * MAke snow follow camera
   */
  update() {
    this.simulateSnow();
    // this.particleSystem.position.copy(this.state.controlImp.controls.getObject().position);
    // this.particleSystem.rotation.copy( this.state.camera.rotation );
    this.particleSystem.updateMatrix();
    this.particleSystem.translateZ(-10);
  }

  getMesh() {
    return this.particleSystem;
  }
}
