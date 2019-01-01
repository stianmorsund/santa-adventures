import * as THREE from 'three';

let instance = null;

export class LoadingManager {
  manager = new THREE.LoadingManager();
  constructor() {
    // Singleton
    if (instance) {
      return instance;
    } else {
      instance = this;
    }
    this.manager.onStart = (url, itemsLoaded, itemsTotal) => {
      console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
    };

    this.manager.onLoad = () => {
      console.log('Loading complete!');
    };

    this.manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
    };

    this.manager.onError = url => {
      console.log('There was an error loading ' + url);
    };
  }
  static getInstance() {
    if (instance) {
      return instance;
    } else {
      return new LoadingManager();
    }
  }
}
