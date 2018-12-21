import * as THREE from 'three';
import { ThreeModel } from './three.abstract';
import { Scene } from '../scene';
import { GROUND_LEVEL } from './constants';

export class Hero extends ThreeModel {
  geometry: THREE.DodecahedronGeometry;
  mesh: THREE.Mesh;
  scene: Scene = Scene.getInstance();
  private readonly RADIUS = 0.3;
  private readonly MOVE_SPEED_FACTOR = 25;
  private readonly GRAVITY = 99 / 10000;

  // Game logic
  isJumbing = false;
  currentPosition: -1 | 0 | 1 = 0; // from left to right
  bounceValue = 0;

  constructor() {
    super();
    this.geometry = new THREE.DodecahedronGeometry(this.RADIUS, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0xffcc00 });
    this.mesh = new THREE.Mesh(this.geometry, material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.position.y = GROUND_LEVEL;
    this.mesh.position.z = 4.4;

    document.onkeydown = e => this.onkeydown(e);
  }

  update(clock: THREE.Clock) {
    if (this.isJumbing) {
      this.mesh.rotation.x -= 10;
    } else {
      this.mesh.rotation.x -= 0.05;
    }

    if (this.mesh.position.y <= GROUND_LEVEL) {
      this.isJumbing = false;
      this.bounceValue = Math.random() * 0.04 + this.GRAVITY;
      // this.bounceValue = this.GRAVITY;
    }
    this.mesh.position.y += this.bounceValue;

    this.mesh.position.x = THREE.Math.lerp(
      this.mesh.position.x,
      this.currentPosition,
      this.MOVE_SPEED_FACTOR * clock.getDelta()
    );

    this.bounceValue -= this.GRAVITY;
  }

  onkeydown(event: KeyboardEvent) {
    // event.preventDefault();
    if (this.isJumbing) return;
    switch (event.key) {
      case 'a':
      case 'ArrowLeft':
        this.currentPosition = this.currentPosition === 1 ? 0 : -1;
        break;
      case 'd':
      case 'ArrowRight':
        this.currentPosition = this.currentPosition === -1 ? 0 : 1;
        break;
      case ' ':
        console.log('jump');
        this.bounceValue = 0.16;
        this.isJumbing = true;
        break;
    }
  }
}
