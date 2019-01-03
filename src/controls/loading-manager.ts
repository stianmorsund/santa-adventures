import * as THREE from 'three';

let instance = null;
const progressbar = document.getElementById('progressbar');
const progressbarWrap = document.getElementById('progressbar-wrap');

export class LoadingManager {
  static getInstance() {
    if (instance) {
      return instance;
    } else {
      return new LoadingManager();
    }
  }
  manager = new THREE.LoadingManager();
  isAllLoaded: boolean;
  isError: boolean;

  constructor() {
    // Singleton setup
    if (instance) {
      return instance;
    } else {
      instance = this;
    }
    this.manager.onStart = (url, itemsLoaded, itemsTotal) => {};
    this.manager.onLoad = () => this.setFinished();
    this.manager.onProgress = (url, itemsLoaded, itemsTotal) => this.setProgress(itemsLoaded, itemsTotal);
    this.manager.onError = (url) => this.setError(url);
  }

  private setProgress(itemsLoaded: number, itemsTotal: number) {
    const percent = (itemsLoaded / itemsTotal) * 100;
    progressbar.style.width = `${percent}%`;
  }

  private setError(url: string) {
    this.isError = true;
    console.log('There was an error loading ' + url);
  }

  private setFinished() {
    this.isAllLoaded = !!!this.isError;
    setTimeout(() => {
      progressbarWrap.style.display = `none`;
    }, 500);
  }
}
