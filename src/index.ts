// add styles
import './style.css';
// three.js
import * as THREE from 'three';
const OrbitControls = require('three-orbit-controls')(THREE);

import { Camera } from './controls/camera';
import { Snow } from './models/snow';
import { Scene } from './scene';
import { Track } from './models/track';

// create the scene
const scene: Scene = Scene.getInstance();
const threeScene: THREE.Scene = scene.scene;
const renderer = new THREE.WebGLRenderer({ alpha: true });
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000); //perspective camera

// set size
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; //enable shadow
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// add canvas to dom
document.body.appendChild(renderer.domElement);

// const light2 = new THREE.DirectionalLight(0xffffff, 1.0);
// light2.position.set(-100, 100, -100);
// scene.add(light2);

// const parent = new THREE.Object3D();
// scene.add(parent);

//add items to scene


scene.addModel(new Track());

let planeGeometry = new THREE.PlaneGeometry(5, 5, 4, 4);
let planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
let ground = new THREE.Mesh(planeGeometry, planeMaterial);
ground.receiveShadow = true;
ground.castShadow = false;
ground.rotation.x = -Math.PI / 2;
threeScene.add(ground);

camera.position.z = 5;
camera.position.y = 1;

// Refactor lights to model
let sun = new THREE.DirectionalLight(0xffffff, 0.8);
sun.position.set(0, 4, 1);
sun.castShadow = true;
threeScene.add(sun);
//Set up shadow properties for the sun light
sun.shadow.mapSize.width = 256;
sun.shadow.mapSize.height = 256;
sun.shadow.camera.near = 0.5;
sun.shadow.camera.far = 50;

let orbitControl = new OrbitControls(camera, renderer.domElement); //helper to rotate around in scene
orbitControl.addEventListener('change', render);
//orbitControl.enableDamping = true;
//orbitControl.dampingFactor = 0.8;
orbitControl.enableZoom = false;

// const snow = new Snow();
// scene.add(snow.getMesh());

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate(): void {
  requestAnimationFrame(animate);
  render();
}

function render(): void {
  // animate camera along spline
  const time = Date.now();
  const looptime = 20 * 1000;
  const t = (time % looptime) / looptime;
  if (scene.models) {
    scene.models.forEach(m => {
      m.update();
    });
  }

  renderer.render(threeScene, camera);
}

animate();
