import * as THREE from 'three';
import { Scene } from '../scene';
import { TRACK_SPEED } from './constants';
import { MeshBase } from './meshbase.abstract';

import { POSSIBLE_X_POSITIONS } from '../models/models';
import { LoadingManager } from '../controls/loading-manager';

const POLE_Z = 1.2;
export class Pole extends MeshBase {
  private loadingManager: LoadingManager = LoadingManager.getInstance();
  geometry: THREE.CylinderGeometry;
  mesh: THREE.Mesh;
  scene: Scene = Scene.getInstance();

  constructor({ position }: { position?: { x: POSSIBLE_X_POSITIONS; y: number } } = {}) {
    super();

    this.geometry = new THREE.CylinderGeometry(0.1, 0.1, 10, 32);
    const texture = new THREE.TextureLoader(this.loadingManager.manager).load(require(`../assets/candycane.jpg`));
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
