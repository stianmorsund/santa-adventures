import * as THREE from 'three';
import { Scene } from '../scene';
import { TRACK_SPEED } from './constants';
import { MeshBase } from './meshbase.abstract';

let flagColor = '#ffffff';
let flagTexture = null;
const [sizeW, sizeH, widthSegments, heightSegments] = [4, 1, 6, 3];
export class FinishLine extends MeshBase {
  private flag: THREE.Mesh;
  geometry: THREE.CylinderGeometry;

  mesh: THREE.Group = new THREE.Group();
  scene: Scene = Scene.getInstance();

  constructor({ position }: { position?: { y: number } } = {}) {
    super();

    const poleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 5, 16, 1);
    const poleMaterial = new THREE.MeshPhongMaterial({
      color: '#ffcc99',
      specular: '#999999',
      shininess: 30,
    });
    const pole = new THREE.Mesh(poleGeometry, poleMaterial);
    const pole2 = new THREE.Mesh(poleGeometry, poleMaterial);

    pole.position.set(-2, 0, 0);
    pole2.position.set(2, 0, 0);
    this.mesh.add(pole);
    this.mesh.add(pole2);

    const flagGeometry = new THREE.PlaneGeometry(sizeW, sizeH, widthSegments, heightSegments);
    const flagMaterial = new THREE.MeshLambertMaterial({
      color: flagColor,
      side: THREE.DoubleSide,
    });
    this.flag = new THREE.Mesh(flagGeometry, flagMaterial);
    this.flag.position.y = 1;

    this.mesh.add(this.flag);
    this.mesh.rotation.x = Math.PI / 2;

    // this.mesh.rotation.z = Math.PI / 2;
    // this.mesh.castShadow = true;
    // this.mesh.receiveShadow = false;
    const { y } = position;
    this.mesh.position.set(0, y, 1.2);
  }

  updateWaves() {
    const h = 0.5;
    const v = 0.3;
    const w = 0.2;
    const s = 0.5;

    for (let y = 0; y < heightSegments + 1; y++) {
      for (let x = 0; x < widthSegments + 1; x++) {
        const index = x + y * (widthSegments + 1);
        const vertex = (this.flag.geometry as THREE.Geometry).vertices[index];
        const time = (Date.now() * s) / 50;
        vertex.z = (Math.sin(h * x + v * y - time) * w * x) / 4;
      }
    }
    (this.flag.geometry as THREE.Geometry).verticesNeedUpdate = true;
  }

  update() {
    this.updateWaves();
    this.mesh.position.y -= TRACK_SPEED;
  }
}
