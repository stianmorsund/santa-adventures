import * as THREE from 'three';
const FBXLoader = require('wge-three-fbx-loader');

import { MeshBase } from './meshbase.abstract';
import { Scene } from '../scene';
import { LoadingManager } from '../controls/loading-manager';

export class Hero extends MeshBase {
  mesh: THREE.Group = new THREE.Group();
  scene: Scene = Scene.getInstance();

  mixer: THREE.AnimationMixer;
  private readonly SANTA_MODEL_PATH = 'src/assets/models/santa/santa_blender.fbx';
  private loadingManager: LoadingManager = LoadingManager.getInstance();
  private loader = new FBXLoader(this.loadingManager.manager);
  private readonly RADIUS = 0.3;
  private readonly MOVE_SPEED_FACTOR = 1500;
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
      this.SANTA_MODEL_PATH,
      object => {
        this.mesh = object;
        const clips = object.animations;
        this.mixer = new THREE.AnimationMixer(this.mesh);
        const clip = THREE.AnimationClip.findByName(clips, 'Santa.001|Santa.001|Take 001|BaseLayer');
        const action = this.mixer.clipAction(clip);
        const skinnedMesh: any = this.mesh.children.find(c => c.name === 'Santa_skinned');
        const uvmap = new THREE.TextureLoader().load(require('../assets/models/santa/Santa_UV.png'));
        skinnedMesh.material.map = uvmap;
        skinnedMesh.receiveShadow = true;
        skinnedMesh.castShadow = true;

        this.mesh.position.y = 0.6;
        this.mesh.position.z = 4.4;
        this.mesh.rotation.x = -(Math.PI / 2);
        this.mesh.rotation.z = Math.PI;

        // this.mesh.scale.set(0.001, 0.001, 0.001);
        this.scene.scene.add(this.mesh);

        action.play();
      },
      () => {},
      err => {
        console.log('error loading santa fbx', err);
      }
    );
  }

  update(clock: THREE.Clock) {
    if (this.mixer) {
      this.mixer.update(clock.getDelta() * 2);
    }
    if (this.isJumbing) {
      this.mesh.rotation.x -= 0.2;
    } else {
      this.mesh.rotation.x = -(Math.PI / 2);
    }

    // Setting threshold slighlty above "ground level" so we get better jumping controls
    if (this.mesh.position.y <= 0.65) {
      this.isJumbing = false;
      // this.bounceValue = Math.random() * 0.04 + this.GRAVITY;
      this.bounceValue = this.GRAVITY;
    }
    this.mesh.position.y += this.bounceValue;

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
