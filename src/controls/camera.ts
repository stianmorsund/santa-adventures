import * as THREE from 'three';

export class Camera {
  private camera: THREE.PerspectiveCamera;
  private cameraHelper: THREE.CameraHelper;
  private cameraEye: THREE.Mesh;

  constructor() {
    this.camera = new THREE.PerspectiveCamera(84, window.innerWidth / window.innerHeight, 0.01, 1000);
    // parent.add(camera);
    this.cameraHelper = new THREE.CameraHelper(this.camera);
    // scene.add(cameraHelper);

    // debug camera
    this.cameraEye = new THREE.Mesh(
      new THREE.SphereBufferGeometry(5),
      new THREE.MeshBasicMaterial({ color: 0xdddddd })
    );
    // parent.add(cameraEye);

    // window.addEventListener('resize', this.onWindowResize, false);
  }

  getCamera() {
    return this.camera;
  }

  getCameraHelper() {
    return this.cameraHelper;
  }

  getCameraEye() {
    return this.cameraEye;
  }

//   onWindowResize() {
//     this.camera.aspect = window.innerWidth / window.innerHeight;
//     this.camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//   }
}
