import * as THREE from 'three';
import * as FBXLoader from 'wge-three-fbx-loader';

import { MeshBase } from './meshbase.abstract';
import { Scene } from '../scene';
import { LoadingManager } from '../controls/loading-manager';
import { POSSIBLE_X_POSITIONS } from '../models/models';

export class Hero extends MeshBase {
  mesh: THREE.Group = new THREE.Group();
  scene: Scene = Scene.getInstance();
  mixer: THREE.AnimationMixer;

  // Game logic
  isJumping = false;
  isJumpAllowed = true;
  isCrawling = false;
  currentPosition: POSSIBLE_X_POSITIONS = 0;
  bounceValue = 0;

  private readonly SANTA_MODEL_PATH = 'assets/models/santa/santa_blender.fbx';
  private loadingManager: LoadingManager = LoadingManager.getInstance();
  private loader = new FBXLoader(this.loadingManager.manager);
  
  private readonly MOVE_SPEED_FACTOR = 1500;
  private readonly GRAVITY = 120 / 10000;

  constructor() {
    super();
    this.buildHero();
  }

  buildHero() {
    this.loader.load(this.SANTA_MODEL_PATH, (object: any) => {
      this.mesh = object;
      const clips = object.animations;
      this.mixer = new THREE.AnimationMixer(this.mesh);
      const clip = THREE.AnimationClip.findByName(clips, 'Santa.001|Santa.001|Take 001|BaseLayer');
      const action = this.mixer.clipAction(clip);
      const skinnedMesh: any = this.mesh.children.find((c) => c.name === 'Santa_skinned');
      const uvmap = new THREE.TextureLoader(this.loadingManager.manager).load(
        require('../assets/models/santa/Santa_UV.png')
      );
      skinnedMesh.material.map = uvmap;
      skinnedMesh.receiveShadow = true;
      skinnedMesh.castShadow = true;

      this.mesh.position.y = 0.6;
      this.mesh.position.z = 6;
      this.mesh.rotation.x = -(Math.PI / 2);

      this.scene.scene.add(this.mesh);
      action.timeScale = 1.2;

      action.play();
    });
  }

  update(clock: THREE.Clock) {
    if (this.mixer) {
      this.mixer.update(clock.getDelta() * 2);
    }

    // Initial animation rotation
    if (this.mesh.position.z > 4.4) {
      this.mesh.position.z -= 0.2;
    }
    if (this.mesh.rotation.z < Math.PI) {
      this.mesh.rotation.z += 0.2;
    }
    // End initial animation rotation

    this.mesh.position.x = THREE.Math.lerp(
      this.mesh.position.x,
      this.currentPosition,
      this.MOVE_SPEED_FACTOR * clock.getDelta()
    );

    if (this.isJumping) {
      this.isJumpAllowed = false;
      this.mesh.rotation.x -= 0.2;
      this.mesh.position.y += this.bounceValue;
      this.bounceValue -= this.GRAVITY;
    } else {
      this.mesh.rotation.x = -(Math.PI / 2);
    }

    if (this.isCrawling) {
      this.isJumpAllowed = false;
      this.mesh.rotation.x = -0.5;
      this.mesh.position.y = 0.6;
    }

    // Allow jumping slightly above ground level for better experience
    this.isJumpAllowed = this.mesh.position.y <= 0.8;

    if (this.mesh.position.y <= 0.62) {
      this.isJumping = false;
    }
  }

  handleMoveLeft() {
    this.currentPosition = this.currentPosition === 1 ? 0 : -1;
  }

  handleMoveRight() {
    this.currentPosition = this.currentPosition === -1 ? 0 : 1;
  }

  handleJump() {
    if (this.isJumpAllowed) {
      this.bounceValue = 0.16;
      this.isCrawling = false;
      this.isJumping = true;
    }
  }

  handleCrawl() {
    this.isCrawling = true;
  }
}
