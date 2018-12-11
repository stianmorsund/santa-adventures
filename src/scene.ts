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
