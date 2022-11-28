import * as THREE from 'three'
import * as assets from '../+state/assets-slice'
import { store } from '../+state/store'

let instance = null

export class LoadingManager {
  static getInstance() {
    if (instance) {
      return instance
    } else {
      return new LoadingManager()
    }
  }
  manager = new THREE.LoadingManager()

  constructor() {
    // Singleton
    if (instance) {
      return instance
    } else {
      instance = this
    }
    this.manager.onStart = (url, itemsLoaded, itemsTotal) => {}
    this.manager.onLoad = () => store.dispatch(assets.loaded())
    this.manager.onProgress = (_url, itemsLoaded, itemsTotal) =>
      store.dispatch(assets.progress({ itemsLoaded, itemsTotal }))
    this.manager.onError = (_url) => store.dispatch(assets.failed())
  }
}
