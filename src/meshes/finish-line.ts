import * as THREE from 'three';
import { TRACK_SPEED } from './constants';
import { MeshBase } from './meshbase.abstract';

export class FinishLine extends MeshBase {
  private sizeW = 4;
  private sizeH = 1;
  private widthSegments = 6;
  private heightSegments = 3;
  private flagFabric: THREE.Mesh;
  mesh: THREE.Group = new THREE.Group();

  constructor({ position }: { position?: { y: number } } = {}) {
    super();

    const poleLeft = this.buildFlagpole();
    const poleRight = this.buildFlagpole();
    this.flagFabric = this.buildFlag();

    poleLeft.position.set(-2, 0, 0);
    poleRight.position.set(2, 0, 0);
    this.flagFabric.position.y = 1;

    this.mesh.add(poleLeft, poleRight, this.flagFabric);
    this.mesh.rotation.x = Math.PI / 2;

    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    const { y } = position;
    this.mesh.position.set(0, y, 1.2);
  }

  buildFlagpole(): THREE.Mesh {
    const poleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 5, 16, 1);
    const poleMaterial = new THREE.MeshPhongMaterial({
      color: '#ffcc99',
      specular: '#999999',
      shininess: 30,
    });
    return new THREE.Mesh(poleGeometry, poleMaterial);
  }

  buildFlag() {
    const flagGeometry = new THREE.PlaneGeometry(this.sizeW, this.sizeH, this.widthSegments, this.heightSegments);
    const flagMaterial = new THREE.MeshLambertMaterial({
      color: '#ffffff',
      side: THREE.DoubleSide,
    });
    return new THREE.Mesh(flagGeometry, flagMaterial);
  }

  updateFlagfabric() {
    const h = 0.5;
    const v = 0.3;
    const w = 0.2;
    const s = 0.5;

    for (let y = 0; y < this.heightSegments + 1; y++) {
      for (let x = 0; x < this.widthSegments + 1; x++) {
        const index = x + y * (this.widthSegments + 1);
        const vertex = (this.flagFabric.geometry as THREE.Geometry).vertices[index];
        const time = (Date.now() * s) / 50;
        vertex.z = (Math.sin(h * x + v * y - time) * w * x) / 4;
      }
    }
    (this.flagFabric.geometry as THREE.Geometry).verticesNeedUpdate = true;
  }

  update() {
    this.updateFlagfabric();
    this.mesh.position.y -= TRACK_SPEED;
  }
}
