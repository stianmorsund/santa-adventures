import * as THREE from 'three';
import { ThreeModel } from './models/three.abstract';

let instance = null;

export class Scene {
  private _scene: THREE.Scene;
  private _models: ThreeModel[] = [];
  constructor() {
    // Singleton
    if (instance) {
      return instance;
    } else {
      instance = this;
    }
    this._scene = new THREE.Scene();
    // Add some fog
    this._scene.fog = new THREE.FogExp2(0xf0fff0, 0.14);
    const hemisphereLight = new THREE.HemisphereLight(0xfffafa, 0x000000, 0.9);
    this._scene.add(hemisphereLight);
    const sun = new THREE.DirectionalLight(0xcdc1c5, 0.9);
    sun.position.set(12, 6, -7);
    sun.castShadow = true;
    this._scene.add(sun);
  }

  get models() {
    return this._models;
  }

  get scene() {
    return this._scene;
  }

  static getInstance() {
    if (instance) {
      return instance;
    } else {
      return new Scene();
    }
  }

  addModel(model: ThreeModel) {
    this._models.push(model);
    this._scene.add(model.mesh);
  }
}
