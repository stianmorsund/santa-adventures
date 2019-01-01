import * as THREE from 'three';

import { MeshBase } from './meshbase.abstract';
import { Scene } from '../scene';
import { getRandomInteger } from '../utils/utils';
import { GROUND_LEVEL } from './constants';
import { LoadingManager } from '../controls/loading-manager';
const FBXLoader = require('wge-three-fbx-loader');

export class Forest extends MeshBase {
  private readonly TREE_MODEL_PATH = 'src/assets/models/tree2.fbx';
  public material: THREE.PointsMaterial;
  public mesh: THREE.Group = new THREE.Group();
  private loadingManager: LoadingManager = LoadingManager.getInstance();
  private loader = new FBXLoader(this.loadingManager.manager);
  private readonly NUMBER_OF_TREES = 70;
  private scene: Scene = Scene.getInstance();
  private leftside: THREE.Group;
  private rightside: THREE.Group;

  constructor() {
    super();
    this.buildForest();
  }
  update(clock: THREE.Clock) {
    // this.leftside.position.z += 0.5;
    this.mesh.position.z += 0.05;

    if (this.mesh.position.z > -40) {
      this.mesh.position.z = -65;
    }
  }

  getMesh() {
    return this.mesh;
  }

  buildForest() {
    this.loader.load(this.TREE_MODEL_PATH, tree => {
      this.leftside = new THREE.Group();
      this.rightside = new THREE.Group();
      let i = 0;
      for (; i < this.NUMBER_OF_TREES; i++) {
        this.leftside.add(this.buildTree2(tree.clone(), i, 'left'));
        this.rightside.add(this.buildTree2(tree.clone(), i, 'right'));
      }
      this.mesh.add(this.leftside);
      this.mesh.add(this.rightside);
      this.mesh.position.z = -65;
      this.scene.scene.add(this.mesh);
    });
  }

  buildTree2(tree: any, index: number, side: 'left' | 'right'): THREE.Group {
    tree.traverse(child => {
      // console.log('child', child)
      child.castShadow = true;
      child.receiveShadow = true;
      if (child.name === 'Cone001') {
        child.material.color.setHex(0xffffff);
      } else {
        if (child && child.material) {
          child.material.color.setHex(0x6ab24d);
        }
      }
    });
    let size = 0.0015;
    tree.scale.set(size, size, size);
    tree.position.y = 0.5;
    tree.position.x = side === 'left' ? -3.1 : 3.1;
    tree.position.z = index * 1.5;
    return tree;
  }

  buildTree(tree: THREE.Group, index: number, side: 'left' | 'right'): THREE.Group {
    tree.traverse(child => {
      if (child instanceof THREE.Mesh) {
        const top: THREE.MeshPhongMaterial = child.material[0];
        top.color.setHex(0x232323);
        const trunk = child.material[1];
        trunk.color.setHex(0x000000);
        child.castShadow = true;
        child.receiveShadow = true;
      }
      tree.position.y = GROUND_LEVEL;
      const size = getRandomInteger(0.9, 1);
      tree.scale.set(size, size, size);
      tree.position.x = side === 'left' ? -3.1 : 3.1;
      tree.position.z = index * 1.5;
    });
    return tree;
  }
}
