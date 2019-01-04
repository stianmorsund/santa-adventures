import * as THREE from 'three';
import { MeshBase } from './meshbase.abstract';
import { Scene } from '../scene';
import { getRandomInteger } from '../utils/utils';
import { TRACK_LENGTH, GIFT_HEIGHT_FROM_FLOOR, TRACK_SPEED } from './constants';

export class Gift extends MeshBase {
  geometry: THREE.BoxGeometry;
  mesh: THREE.Mesh;
  scene: Scene = Scene.getInstance();
  isCollected: boolean = false;
  private readonly ROTATION_SPEED = 0.05;
  private readonly SIZE = 0.3;
  private readonly Z_POSITION_TO_RESET_POSITION = 5;

  constructor(position?: { x; y; z }) {
    super();
    this.geometry = new THREE.BoxGeometry(this.SIZE, this.SIZE, this.SIZE);
    const texture = new THREE.TextureLoader().load(require('../assets/textures/gift.jpg'));
    texture.anisotropy = 4;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.format = THREE.RGBFormat;
    const material = new THREE.MeshLambertMaterial({
      color: Math.random() * 0xffffff,
      flatShading: true,
      map: texture
    });
    this.mesh = new THREE.Mesh(this.geometry, material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    const { x, y, z } = position || this.getRandomGiftPosition();
    this.mesh.position.set(x, y, z);
  }

  update() {
    if (this.isCollected) {
      this.animateCollected();
    } else {
      this.mesh.rotation.z += this.ROTATION_SPEED;
      this.mesh.position.y -= TRACK_SPEED;
    }

    // Reset state when behind camera or done collected animation
    // Set new position if behind camera, we dont want to create more gifts,
    // Only reposition to increase performance
    if (this.isDoneWithCollectedAnimation() || this.isBehindCamera()) {
      this.mesh.worldToLocal(new THREE.Vector3());
      this.isCollected = false;
      const { x, y, z } = this.getRandomGiftPosition();
      this.mesh.position.set(x, y, z);
    }
  }

  getRandomGiftPosition(): { x: number; y: number; z: number } {
    const posX = getRandomInteger(-1, 1);
    const posY = getRandomInteger(5, TRACK_LENGTH / 2);
    const posZ = GIFT_HEIGHT_FROM_FLOOR;
    return { x: posX, y: posY, z: posZ };
  }

  isBehindCamera(): boolean {
    return this.mesh.position.y <= -1;
  }

  isDoneWithCollectedAnimation(): boolean {
    return this.mesh.position.z > this.Z_POSITION_TO_RESET_POSITION;
  }

  animateCollected(): void {
    const direction = new THREE.Vector3(4, 2, 2);
    // const direction = new THREE.Vector3(1,1,0);
    const worldPosition = new THREE.Vector3();

    const speed = 0.04;

    this.mesh.localToWorld(worldPosition);
    const vector = direction.multiplyScalar(speed);

    this.mesh.position.x += vector.x;
    this.mesh.position.y += vector.y;
    this.mesh.position.z += vector.z;
  }
}
