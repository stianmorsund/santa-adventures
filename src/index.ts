// add styles
import './style.css';
// three.js
import * as THREE from 'three';
const OrbitControls = require('three-orbit-controls')(THREE);

import { Camera } from './controls/camera';
import { Snow } from './models/snow';
import { Scene } from './scene';
import { Track } from './models/track';
import { Hero } from './models/hero';

// create the scene
const scene: Scene = Scene.getInstance();
const clock = new THREE.Clock();
clock.start();
const threeScene: THREE.Scene = scene.scene;
const renderer = new THREE.WebGLRenderer({ alpha: false });
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 6.5;
camera.position.y = 10;

// set size
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; //enable shadow
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// add canvas to dom
document.body.appendChild(renderer.domElement);

/***
 * Add models
 * */

scene.addModel(new Track());
scene.addModel(new Hero());

// ground

// let planeGeometry = new THREE.PlaneGeometry(5, 5, 4, 4);
// let planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
// let ground = new THREE.Mesh(planeGeometry, planeMaterial);
// ground.receiveShadow = true;
// ground.castShadow = false;
// ground.rotation.x = -Math.PI / 2;
// threeScene.add(ground);

// Orbit

// let orbitControl = new OrbitControls(camera, renderer.domElement); //helper to rotate around in scene
// orbitControl.addEventListener('change', render);
// orbitControl.enableDamping = true;
// orbitControl.dampingFactor = 0.8;
// orbitControl.enableZoom = true;

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
  if (scene.models) {
    scene.models.forEach(m => {
      m.update(clock);
    });
  }

  renderer.render(threeScene, camera);
}

animate();
