import * as THREE from 'three';
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';
const FBXLoader = require('wge-three-fbx-loader');

import { MeshBase } from './meshbase.abstract';
import { Scene } from '../scene';
import { GROUND_LEVEL } from './constants';
import { Mesh } from 'three';

export class Hero extends MeshBase {
  mesh: THREE.Group = new THREE.Group();
  scene: Scene = Scene.getInstance();
  private loader = new FBXLoader();
  private readonly RADIUS = 0.3;
  private readonly MOVE_SPEED_FACTOR = 25;
  private readonly GRAVITY = 99 / 10000;

  // Game logic
  isJumbing = false;
  currentPosition: -1 | 0 | 1 = 0; // from left to right
  bounceValue = 0;

  constructor() {
    super();
    this.buildHero();
  }

  buildHero() {
    this.loader.load(
      'src/assets/models/santa/santa.fbx',
      object => {
        // console.log('object', object);
        this.mesh = object;
        this.mesh.traverse((child: Mesh) => {
          child.receiveShadow = true;
          child.castShadow = true;
          // console.log('child', child)
          const { material } = child;

          if (material instanceof THREE.MeshPhongMaterial) {
            material.flatShading = true;
          }
        });

        // this.mesh.position.y = 0;
        this.mesh.position.z = 4.4;
        this.mesh.rotation.y = Math.PI;

        // this.mesh.scale.set(0.01, 0.01, 0.01);
        this.scene.scene.add(this.mesh);
      },
      () => {},
      err => {
        console.log('error', err);
      }
    );
  }

  update(clock: THREE.Clock) {
    // this.mesh.rotation.y += 0.05;
    if (this.isJumbing) {
      // this.mesh.rotation.x -= 10;
    } else {
      // this.mesh.rotation.x -= 0.05;
    }

    if (this.mesh.position.y <= GROUND_LEVEL) {
      this.isJumbing = false;
      // this.bounceValue = Math.random() * 0.04 + this.GRAVITY;
      this.bounceValue = this.GRAVITY;
    }
    // this.mesh.position.y += this.bounceValue;

    this.mesh.position.x = THREE.Math.lerp(
      this.mesh.position.x,
      this.currentPosition,
      this.MOVE_SPEED_FACTOR * clock.getDelta()
    );

    this.bounceValue -= this.GRAVITY;
  }

  handleMoveLeft() {
    this.currentPosition = this.currentPosition === 1 ? 0 : -1;
  }

  handleMoveRight() {
    this.currentPosition = this.currentPosition === -1 ? 0 : 1;
  }

  handleJump() {
    this.bounceValue = 0.16;
    this.isJumbing = true;
  }
}
