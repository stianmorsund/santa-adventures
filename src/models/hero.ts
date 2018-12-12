import * as THREE from 'three';
import { ThreeModel } from './three.abstract';
import { Scene } from '../scene';

export class Hero extends ThreeModel {
  geometry: THREE.DodecahedronGeometry;
  mesh: THREE.Mesh;
  scene: Scene = Scene.getInstance();
  private readonly RADIUS = 0.5;
  private readonly MOVE_SPEED_FACTOR = 25;
  private readonly GRAVITY = 99 / 10000;
  private readonly GROUND_LEVEL = 9.6;

  // Game logic
  isJumbing = false;
  currentPosition: 'left' | 'center' | 'right' = 'center';
  positionMap = {
    left: -1,
    center: 0,
    right: 1
  };
  bounceValue = 0.06;

  constructor() {
    super();
    this.geometry = new THREE.DodecahedronGeometry(this.RADIUS, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0xe5f2f2 });
    this.mesh = new THREE.Mesh(this.geometry, material);
    this.mesh.position.y = this.GROUND_LEVEL;
    this.mesh.position.z = 3.7;

    document.onkeydown = e => this.onkeydown(e);
  }

  update(clock: THREE.Clock) {
    this.mesh.rotation.x -= 0.05;

    if (this.mesh.position.y <= this.GROUND_LEVEL) {
      this.isJumbing = false;
      this.bounceValue = Math.random() * 0.04 + 0.005;
    }
    this.mesh.position.y += this.bounceValue;

    this.mesh.position.x = THREE.Math.lerp(
      this.mesh.position.x,
      this.positionMap[this.currentPosition],
      this.MOVE_SPEED_FACTOR * clock.getDelta()
    );

    this.bounceValue -= this.GRAVITY;

    // this.bounceValue -= this.GRAVITY;

    // if (this.mesh.position.y < this.GROUND_LEVEL) {
    //   this.isJumbing = false;
    //   this.mesh.position.y = this.GROUND_LEVEL;
    // }
  }

  onkeydown(event: KeyboardEvent) {
    if (this.isJumbing) return;
    switch (event.key) {
      case 'a':
      case 'ArrowLeft':
        this.currentPosition = this.currentPosition === 'right' ? 'center' : 'left';
        break;
      case 'd':
      case 'ArrowRight':
        this.currentPosition = this.currentPosition === 'left' ? 'center' : 'right';
        break;
      case ' ':
        console.log('jump');
        this.bounceValue = 0.1;
        this.isJumbing = true;
        break;
    }
  }
}
