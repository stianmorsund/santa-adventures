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
    this._scene.fog = new THREE.FogExp2(0x16122d, 0.06);
    const hemisphereLight = new THREE.HemisphereLight(0x1f305e, 0xffffff, 1.2);
    
    this._scene.add(hemisphereLight);
    const sun = new THREE.DirectionalLight(0xf3e87f, .7);
    const sun2 = new THREE.DirectionalLight(0xf3e87f, .3);
    sun.position.set(10, 100, -70);
    sun2.position.set(20, 10, 40)
    sun.castShadow = true;
    this._scene.add(sun);
    this._scene.add(sun2)
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
