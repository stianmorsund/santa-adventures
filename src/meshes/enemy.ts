import * as THREE from 'three';
import * as FBXLoader from 'wge-three-fbx-loader';
// import * as GLTFLoader from 'three-gltf-loader';
// import GLTFLoader from 'three-gltf-loader';

const GLTFLoader = require('three-gltf-loader');

// import { GltfLoader } from 'gltf-loader-ts';

import { MeshBase } from './meshbase.abstract';
import { Scene } from '../scene';
import { getRandomInteger } from '../utils/utils';
import { TRACK_LENGTH, GIFT_HEIGHT_FROM_FLOOR, TRACK_SPEED } from './constants';
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';
import { MeshLambertMaterial } from 'three';
import { LoadingManager } from '../controls/loading-manager';

export class Enemy extends MeshBase {
  geometry: THREE.SphereGeometry;
  mesh: any;
  scene: Scene = Scene.getInstance();
  isHit: boolean = false;
  private readonly ROTATION_SPEED = 0.05;
  private readonly SIZE = 0.009;
  private loadingManager: LoadingManager = LoadingManager.getInstance();
  private mtlLoader = new MTLLoader(this.loadingManager.manager);
  private objLoader = new OBJLoader(this.loadingManager.manager);

  constructor(position?: { x: number; y: number; z: number }) {
    super();

    this.mtlLoader.load('src/assets/models/snowman/SnowmanOBJ.mtl', (materials) => {
      materials.preload();
      this.objLoader.setMaterials(materials);
      this.objLoader.load('src/assets/models/snowman/SnowmanOBJ.obj', (snowman) => {
        snowman.scale.set(this.SIZE, this.SIZE, this.SIZE);
        console.log('snowman is', snowman);
        const mesh = snowman.children[0];
        const hat = mesh.material.find((m) => m.name === 'hatmat');
        const hands = mesh.material.find((m) => m.name === 'handsmat');
        hat.color.setHex(0x222222);
        hands.color.setHex(0x222222);
        snowman.position.x = -1;
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        // snowman.position.z = -10;
        this.mesh = snowman;
        this.scene.scene.add(snowman);
      });
    });
  }

  update(clock: THREE.Clock) {
    if (!this.mesh) {
      return;
    }
    if (this.isHit) {
      this.enemyHit();
    } else {
      // this.mesh.position.y = THREE.Math.lerp(this.mesh.position.y, 1,  clock.getDelta());
      this.mesh.position.z += TRACK_SPEED;
    }

    // Reset state when behind camera or done collected animation
    // Set new position if behind camera, we dont want to create more gifts,
    // Only reposition to increase performance
    if (this.isBehindCamera()) {
      // this.mesh.worldToLocal(new THREE.Vector3());
      this.isHit = false;
      const { x, y, z } = this.getRandomPosition();
      this.mesh.position.z = -10;
    }
  }

  getRandomPosition(): { x: number; y: number; z: number } {
    const posX = getRandomInteger(-1, 1);
    const posY = getRandomInteger(5, TRACK_LENGTH / 2);
    const posZ = GIFT_HEIGHT_FROM_FLOOR;
    return { x: posX, y: posY, z: posZ };
  }

  isBehindCamera(): boolean {
    return this.mesh.position.z > 9;
  }

  enemyHit(): void {
    // const direction = new THREE.Vector3(4, 2, 2);
    // // const direction = new THREE.Vector3(1,1,0);
    // const worldPosition = new THREE.Vector3();
    // const speed = 0.04;
    // this.mesh.localToWorld(worldPosition);
    // const vector = direction.multiplyScalar(speed);
    // this.mesh.position.x += vector.x;
    // this.mesh.position.y += vector.y;
    // this.mesh.position.z += vector.z;
  }
}
