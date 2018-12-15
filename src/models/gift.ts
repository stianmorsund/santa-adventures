import * as THREE from 'three';
import { ThreeModel } from './three.abstract';
import { Scene } from '../scene';
import { getRandomInteger } from '../utils/utils';
import { TRACK_LENGTH, GIFT_HEIGHT_FROM_FLOOR } from './constants';

export class Gift extends ThreeModel {
  geometry: THREE.BoxGeometry;
  mesh: THREE.Mesh;
  scene: Scene = Scene.getInstance();
  isVisible: boolean = true;
  private readonly SIZE = 0.3;

  constructor() {
    super();
    this.geometry = new THREE.BoxGeometry(this.SIZE, this.SIZE, this.SIZE);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    this.mesh = new THREE.Mesh(this.geometry, material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    const { x, y, z } = this.getRandomGiftPosition();
    this.mesh.position.set(x, y, z);
  }

  update() {
    this.mesh.visible = this.isVisible;

    this.mesh.rotation.z += 0.05;
    this.mesh.position.y -= 0.08;
    // Set new position if behind camera, we dont want to create more gifts,
    // Only reposition to increase performance
    if (this.isBehindCamera()) {
      const { x, y, z } = this.getRandomGiftPosition();
      this.isVisible = true;
      this.mesh.position.set(x, y, z);
    }
  }

  getRandomGiftPosition(): { x: number; y: number; z: number } {
    const posX = getRandomInteger(-1, 1);
    const posY = getRandomInteger(5, TRACK_LENGTH);
    const posZ = GIFT_HEIGHT_FROM_FLOOR;
    return { x: posX, y: posY, z: posZ };
  }

  isBehindCamera(): boolean {
    return this.mesh.position.y <= -1;
  }
}
