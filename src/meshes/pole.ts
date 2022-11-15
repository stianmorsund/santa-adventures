import * as THREE from 'three';
import { MeshBase } from './meshbase.abstract';
import { Scene } from '../scene';
import { getRandomInteger } from '../utils/utils';
import { TRACK_LENGTH, TRACKBASE_Z, TRACK_SPEED } from './constants';

export class Pole extends MeshBase {
  geometry: THREE.CylinderGeometry;
  mesh: THREE.Mesh;
  scene: Scene = Scene.getInstance();



  constructor({ position }: { position?: { x: number; y: number; z: number } } = {}) {
    super();

    this.geometry = new THREE.CylinderGeometry( .2, .2, 10, 32 );    
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
    this.mesh.rotation.z = Math.PI/2
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = false;
    const { x, y, z } = position || this.getPosition();
    this.mesh.position.set(x, y, z);
  }

  update() {

    this.mesh.position.y -= TRACK_SPEED;
  }

  getPosition(): { x: number; y: number; z: number } {
    const posX = 0;
    const posY = 20;
    const posZ = 0
    return { x: posX, y: posY, z: posZ };
  }

  isBehindCamera(): boolean {
    return this.mesh.position.y <= -1;
  }
}
