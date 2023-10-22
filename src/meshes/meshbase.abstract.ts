import * as THREE from 'three'
import { randomFiveChars } from '../utils/utils'

export abstract class MeshBase {
  private _id = randomFiveChars()
  get id() {
    return this._id
  }
  public abstract mesh: THREE.Mesh | THREE.Points | THREE.Group
  public abstract update(delta: number): void // all meshes must inherit update for rendering
}
