import * as THREE from 'three';

const OBJLoader = require('three-obj-loader');
OBJLoader(THREE);
import { ThreeModel } from './three.abstract';
import { Scene } from '../scene';
import { getRandomInteger } from '../utils/utils';

export class Forest extends ThreeModel {
  public material: THREE.PointsMaterial;
  public particles: THREE.Geometry;
  public mesh: THREE.Group;
  private loader = new THREE.OBJLoader();
  private NUMBER_OF_TREES = 5;
  scene: Scene = Scene.getInstance();

  constructor() {
    super();
    this.buildForest();
  }
  update() {}

  getMesh() {
    return this.mesh;
  }

  buildForest() {
    this.loader.load('src/assets/models/tree.obj', tree => {
      const forest = Array.from({ length: this.NUMBER_OF_TREES }, () => tree.clone());
      // forest.forEach(t => {
      //   this.buildTree(t);
      //   // t.position.x = getRandomInteger(-1, 1);
      //   // t.position.z = getRandomInteger(-1, 1);
      //   this.scene.scene.add(t);
      // });
    });
  }

  buildTree(tree: THREE.Group) {
    tree.traverse(child => {
      if (child instanceof THREE.Mesh) {
        const top: THREE.MeshPhongMaterial = child.material[0];
        top.color.setHex(0x3c8d0d);
        const trunk = child.material[1];
        trunk.color.setHex(0x3c8d0d);
      }
    });
  }
}
