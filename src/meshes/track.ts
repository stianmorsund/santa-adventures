import * as THREE from 'three';
import { MeshBase } from './meshbase.abstract';
import { Scene } from '../scene';
import { Gift } from './gift';
import { TRACK_LENGTH } from './constants';

export class Track extends MeshBase {
  geometry: THREE.PlaneGeometry;
  mesh: THREE.Mesh;
  scene: Scene = Scene.getInstance();
  gifts: Gift[] = [];
  readonly NUMBER_OF_GIFTS = 5;

  constructor() {
    super();
    this.geometry = new THREE.PlaneGeometry(10, TRACK_LENGTH, 32);

    const texture = new THREE.TextureLoader().load(require('../assets/textures/snow.jpg'));
    texture.anisotropy = 4;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.format = THREE.RGBFormat;
    const material = new THREE.MeshLambertMaterial({  color: 0xffffff });
    this.mesh = new THREE.Mesh(this.geometry, material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.position.y = 0;
    this.mesh.position.z = 5;
    this.mesh.rotation.x = 4.75 

    this.gifts = Array.from({ length: this.NUMBER_OF_GIFTS }, () => new Gift());
    this.mesh.add(...this.gifts.map(g => g.mesh));
  }

  update(_clock: THREE.Clock) {
    this.gifts.forEach(g => g.update());
  }
}
