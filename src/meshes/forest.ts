import * as THREE from 'three'
import * as FBXLoader from 'wge-three-fbx-loader'
import { store } from '../+state/store'

import { LoadingManager } from '../utils/loading-manager'
import { FOREST_SPEED } from './constants'
import { MeshBase } from './meshbase.abstract'

export class Forest extends MeshBase {
  public mesh: THREE.Group = new THREE.Group()
  private readonly TREE_MODEL_PATH = 'assets/models/tree2.fbx'
  private loadingManager: LoadingManager = LoadingManager.getInstance()
  private loader = new FBXLoader(this.loadingManager.manager)
  private readonly NUMBER_OF_TREES = 70
  private leftside: THREE.Group
  private rightside: THREE.Group

  constructor() {
    super()
    this.buildForest()
  }

  update(_clock: THREE.Clock) {
    const { isCurrentLevelFinished } = store.getState().santa
    // Slow down speed when level is finished.
    const speed = isCurrentLevelFinished ? FOREST_SPEED * 0.5 : FOREST_SPEED
    this.mesh.position.z += speed

    if (this.mesh.position.z > -40) {
      this.mesh.position.z = -65
    }
  }

  getMesh() {
    return this.mesh
  }

  buildForest() {
    this.loader.load(this.TREE_MODEL_PATH, (tree: THREE.Mesh) => {
      this.leftside = new THREE.Group()
      this.rightside = new THREE.Group()
      let i = 0
      for (; i < this.NUMBER_OF_TREES; i++) {
        this.leftside.add(this.buildTree(tree.clone(), i, 'left'))
        this.rightside.add(this.buildTree(tree.clone(), i, 'right'))
      }
      this.mesh.add(this.leftside)
      this.mesh.add(this.rightside)
      this.mesh.position.z = -65
    })
  }

  buildTree(tree: any, index: number, side: 'left' | 'right'): THREE.Group {
    tree.traverse((child) => {
      child.castShadow = true
      child.receiveShadow = true
      if (child.name === 'Cone001') {
        child.material.color.setHex(0xffffff)
      } else {
        if (child && child.material) {
          child.material.color.setHex(0x6ab24d)
        }
      }
    })
    const size = 0.0015
    tree.scale.set(size, size, size)
    tree.position.y = 0.5
    tree.position.x = side === 'left' ? -3.1 : 3.1
    tree.position.z = index * 1.5
    return tree
  }
}
