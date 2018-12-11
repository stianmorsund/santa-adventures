import * as THREE from 'three';
import { ThreeModel } from './three.abstract';
import { Scene } from '../scene';

export class Track extends ThreeModel {
  geometry: THREE.SphereGeometry;
  mesh: THREE.Mesh;
  scene: Scene = Scene.getInstance();

  constructor() {
    super();
    this.geometry = new THREE.SphereGeometry(1, 32, 32);
    const texture = new THREE.TextureLoader().load(require('../assets/textures/snow.jpg'));
    texture.anisotropy = 4;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.format = THREE.RGBFormat;
    const material = new THREE.MeshLambertMaterial({
      map: texture,
      combine: THREE.MixOperation
    });
    this.mesh = new THREE.Mesh(this.geometry, material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = false;
    this.mesh.position.y = 2;
  }

  update() {
    this.mesh.rotation.x += 0.01;
  }
}
