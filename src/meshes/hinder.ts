import * as THREE from 'three';
import { MeshBase } from './meshbase.abstract';
import { Scene } from '../scene';
import { getRandomInteger } from '../utils/utils';
import { TRACK_LENGTH, TRACKBASE_Z, TRACK_SPEED } from './constants';
import { POSSIBLE_X_POSITIONS } from '../models/models';

export class Hinder extends MeshBase {
  geometry: THREE.BoxGeometry;
  mesh: THREE.Mesh;
  scene: Scene = Scene.getInstance();

  constructor({ position }: { position?: { x: POSSIBLE_X_POSITIONS; y: number } } = {}) {
    super();

    this.geometry = new THREE.BoxGeometry(7, 0.2, 1);
    const texture = new THREE.TextureLoader().load(require(`../assets/textures/snow.jpg`));
    texture.anisotropy = 4;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.format = THREE.RGBFormat;
    const material = new THREE.MeshLambertMaterial({
      // color: Math.random() * 0xffffff,
      flatShading: true,
      map: texture,
    });
    this.mesh = new THREE.Mesh(this.geometry, material);
    this.mesh.castShadow = false;
    this.mesh.receiveShadow = true;
    const { x, y } = position;
    this.mesh.position.set(x, y, TRACKBASE_Z);
  }

  update() {
    this.mesh.position.y -= TRACK_SPEED;
  }

  getPosition(): { x: number; y: number; z: number } {
    const posX = getRandomInteger(-1, 1);
    const posY = getRandomInteger(5, TRACK_LENGTH / 2);
    const posZ = 0;
    return { x: posX, y: posY, z: posZ };
  }

  isBehindCamera(): boolean {
    return this.mesh.position.y <= -1;
  }
}
