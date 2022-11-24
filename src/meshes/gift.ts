import * as THREE from 'three';
import { MeshBase } from './meshbase.abstract';
import { Scene } from '../scene';
import { getRandomInteger } from '../utils/utils';
import { TRACK_LENGTH, TRACKBASE_Z, TRACK_SPEED } from './constants';
import { POSSIBLE_X_POSITIONS } from '../models/models';
import { store } from '../+state/effects';

export class Gift extends MeshBase {
  geometry: THREE.BoxGeometry;
  mesh: THREE.Mesh;
  scene: Scene = Scene.getInstance();
  
  private readonly ROTATION_SPEED = 0.05;
  private readonly SIZE = 0.4;

  constructor({ position }: { position?: { x: POSSIBLE_X_POSITIONS; y: number } } = {}) {
    super();
    this.geometry = new THREE.BoxGeometry(this.SIZE, this.SIZE, this.SIZE);
    const texture = new THREE.TextureLoader().load(require(`../assets/textures/gift.jpg`));
    texture.anisotropy = 4;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.format = THREE.RGBFormat;
    const material = new THREE.MeshLambertMaterial({
      color: Math.random() * 0xffffff,
      flatShading: true,
      map: texture,
    });
    this.mesh = new THREE.Mesh(this.geometry, material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = false;
    const { x, y } = position;
    this.mesh.position.set(x, y, TRACKBASE_Z);
  }

  update() {
    if (store.getState().collectedPackages.includes(this.id)) {
      this.animateCollected();
    } else {
      this.mesh.rotation.z += this.ROTATION_SPEED;
      this.mesh.position.y -= TRACK_SPEED;
    }
  }

  getRandomPosition(): { x: number; y: number; z: number } {
    const posX = getRandomInteger(-1, 1);
    const posY = getRandomInteger(5, TRACK_LENGTH / 2);
    const posZ = TRACKBASE_Z;
    return { x: posX, y: posY, z: posZ };
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
