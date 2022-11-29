import * as THREE from 'three'
import { Coordinates } from '../models/models'

let instance = null

export class Camera {
  _threeCamera: THREE.Camera
  readonly defaultPosition: Coordinates = {
    x: 0,
    y: 1.2,
    z: 7.5,
  }

  readonly defaultRotation: Coordinates = {
    x: -0.15,
    y: 0,
    z: 0,
  }

  static getInstance() {
    if (instance) {
      return instance
    } else {
      return new Camera()
    }
  }

  constructor() {
    // Singleton
    if (instance) {
      return instance
    } else {
      instance = this
    }
    this._threeCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
  }

  get threeCamera() {
    return this._threeCamera
  }

  setPosition(coordinates: Coordinates) {
    const { x, y, z } = coordinates ?? this.defaultPosition
    this._threeCamera.position.x = x
    this._threeCamera.position.y = y
    this._threeCamera.position.z = z
    return this;
  }

  setRotation(coordinates: Coordinates) {
    const { x, y, z } = coordinates || this.defaultRotation
    this._threeCamera.rotation.x = x
    this._threeCamera.rotation.y = y
    this._threeCamera.rotation.z = z
    return this;
  }
}
