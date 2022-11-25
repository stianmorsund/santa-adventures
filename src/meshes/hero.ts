import * as THREE from 'three';
import * as FBXLoader from 'wge-three-fbx-loader';

import { store } from '../+state/effects';
import { santaLanded } from '../+state/reducers';
import { LoadingManager } from '../controls/loading-manager';
import { Scene } from '../scene';
import { MeshBase } from './meshbase.abstract';

export class Hero extends MeshBase {
  mesh: THREE.Group = new THREE.Group();
  scene: Scene = Scene.getInstance();
  mixer: THREE.AnimationMixer;

  isJumpAllowed = true;

  private readonly SANTA_MODEL_PATH = 'assets/models/santa/santa_blender.fbx';
  private readonly BASE_BOUNCEVALUE = 0.16;
  private bounceValue = this.BASE_BOUNCEVALUE;
  private readonly GROUND_POSITION = 0.6;
  private readonly LERP_FACTOR = 1500;
  private readonly GRAVITY = 120 / 10000;

  private loadingManager: LoadingManager = LoadingManager.getInstance();
  private loader = new FBXLoader(this.loadingManager.manager);

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

      this.mesh.position.y = this.GROUND_POSITION;
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
      store.getState().santaPosition,
      this.LERP_FACTOR * clock.getDelta()
    );

    if (store.getState().isJumping) {
      this.isJumpAllowed = false;
      this.mesh.rotation.x -= 0.2;
      this.mesh.position.y += this.bounceValue;
      this.bounceValue -= this.GRAVITY;
    } else {
      this.mesh.rotation.x = -(Math.PI / 2);
      this.bounceValue = this.BASE_BOUNCEVALUE;
    }

    if (store.getState().isCrawling) {
      this.isJumpAllowed = false;
      this.mesh.rotation.x = -0.5;
      this.mesh.position.y = this.GROUND_POSITION;
    }

    // Allow jumping slightly above ground level for better experience
    this.isJumpAllowed = this.mesh.position.y <= 0.8;

    if (store.getState().isJumping && this.mesh.position.y < this.GROUND_POSITION) {
      store.dispatch(santaLanded());
      this.mesh.position.y = this.GROUND_POSITION;
    }
  }
}
