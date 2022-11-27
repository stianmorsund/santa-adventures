import * as THREE from 'three'
import { assetsFailed, assetsFinishedLoading, assetsProgress } from '../+state/actions'
import { store } from '../+state/effects'

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
    this.manager.onLoad = () => store.dispatch(assetsFinishedLoading())
    this.manager.onProgress = (_url, itemsLoaded, itemsTotal) =>
      store.dispatch(assetsProgress({ itemsLoaded, itemsTotal }))
    this.manager.onError = (_url) => store.dispatch(assetsFailed())
  }
}
