import * as THREE from 'three';
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';
const FBXLoader = require('wge-three-fbx-loader');

import { MeshBase } from './meshbase.abstract';
import { Scene } from '../scene';
import { GROUND_LEVEL } from './constants';
import { Mesh, SkinnedMesh } from 'three';

export class Hero extends MeshBase {
  mesh: THREE.Group = new THREE.Group();
  scene: Scene = Scene.getInstance();
  private loader = new FBXLoader();
  private readonly RADIUS = 0.3;
  private readonly MOVE_SPEED_FACTOR = 1500;
  private readonly GRAVITY = 99 / 10000;
  mixer: THREE.AnimationMixer;

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
      'src/assets/models/santa/santa_blender.fbx',
      object => {
        this.mesh = object;
        const clips = object.animations;
        this.mixer = new THREE.AnimationMixer(this.mesh);
        const clip = THREE.AnimationClip.findByName(clips, 'Santa.001|Santa.001|Take 001|BaseLayer');
        const action = this.mixer.clipAction(clip);
        const skinnedMesh: any = this.mesh.children.find(c => c.name === 'Santa_skinned')
        const uvmap = new THREE.TextureLoader().load(require('../assets/models/santa/Santa_UV.png'));
        skinnedMesh.material.map = uvmap
        skinnedMesh.receiveShadow = true;
        skinnedMesh.castShadow = true;
        

        this.mesh.position.y = .6;
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

    // // this.mesh.rotation.y += 0.05;
    if (this.isJumbing) {
      // this.mesh.rotation.x -= 0.05;
    } else {
      // this.mesh.rotation.x -= 0.05;
    }

    if (this.mesh.position.y <= .6) {
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
