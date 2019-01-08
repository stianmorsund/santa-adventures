import * as THREE from 'three';
import { MeshBase } from './meshbase.abstract';
import { Scene } from '../scene';
import { getRandomInteger } from '../utils/utils';
import { TRACK_LENGTH, TRACK_SPEED } from './constants';

export class Enemy extends MeshBase {
  geometry: THREE.SphereGeometry;
  scene: Scene = Scene.getInstance();
  isHit: boolean = false;
  position: { x: number; y: number; z: number };
  material: any;
  mesh: any;
  private readonly SIZE = 0.008;

  constructor(mesh: any, position?: { x: number; y: number; z: number }) {
    super();
    this.position = position;

    this.mesh = mesh;
    this.buildEnemy();
  }

  buildEnemy() {
    this.mesh.rotation.x = Math.PI / 2;
    this.mesh.scale.set(this.SIZE, this.SIZE, this.SIZE);
    const mesh = this.mesh.children[0];
    const hat = mesh.material.find((m) => m.name === 'hatmat');
    const hands = mesh.material.find((m) => m.name === 'handsmat');
    hat.color.setHex(0x222222);
    hands.color.setHex(0x222222);
    mesh.receiveShadow = true;
    mesh.castShadow = true;

    const { x, y, z } = this.position;
    this.mesh.position.set(x, y, z);
  }

  update() {
    if (!this.mesh) {
      return;
    }
    if (this.isHit) {
      this.enemyHit();
    } else {
      this.mesh.position.y -= TRACK_SPEED / 1.5;
    }

    // Reset position when behind camera
    if (this.isBehindCamera()) {
      this.isHit = false;
      const { x, y, z } = this.position;
      this.mesh.position.set(x, y, z);
    }
  }

  isBehindCamera(): boolean {
    // return this.mesh.position.z > 9;
    return this.mesh.position.y <= -1;
  }

  enemyHit(): void {
    // const direction = new THREE.Vector3(4, 2, 2);
    // // const direction = new THREE.Vector3(1,1,0);
    // const worldPosition = new THREE.Vector3();
    // const speed = 0.04;
    // this.mesh.localToWorld(worldPosition);
    // const vector = direction.multiplyScalar(speed);
    // this.mesh.position.x += vector.x;
    // this.mesh.position.y += vector.y;
    // this.mesh.position.z += vector.z;
  }
}
