import * as THREE from 'three';
import { MeshBase } from './meshbase.abstract';
import { Scene } from '../scene';
import { getRandomInteger } from '../utils/utils';
import { TRACK_LENGTH, TRACKBASE_Z, TRACK_SPEED, POLE_Z } from './constants';
import { POSSIBLE_X_POSITIONS } from '../models/models';

export class Pole extends MeshBase {
  geometry: THREE.CylinderGeometry;
  mesh: THREE.Mesh;
  scene: Scene = Scene.getInstance();

  constructor({ position }: { position?: { x: POSSIBLE_X_POSITIONS; y: number } } = {}) {
    super();

    this.geometry = new THREE.CylinderGeometry(0.2, 0.2, 10, 32);
    const texture = new THREE.TextureLoader().load(require(`../assets/candycane.jpg`));
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
    this.mesh.rotation.z = Math.PI / 2;
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = false;
    const { x, y } = position;
    this.mesh.position.set(x, y, POLE_Z);
  }

  update() {
    this.mesh.position.y -= TRACK_SPEED;
  }
}
