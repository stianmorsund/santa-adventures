// add styles
import './style.css';
// three.js
import * as THREE from 'three';
const OrbitControls = require('three-orbit-controls')(THREE);

import { Camera } from './controls/camera';
import { Snow } from './models/snow';

// create the scene
const scene = new THREE.Scene();
// scene.background = new THREE.Color( 0xf0f0f0 );

const renderer = new THREE.WebGLRenderer();
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
let heroGeometry = new THREE.BoxGeometry(1, 1, 1); //cube
let heroMaterial = new THREE.MeshStandardMaterial({ color: 0x883333 });
let hero = new THREE.Mesh(heroGeometry, heroMaterial);
hero.castShadow = true;
hero.receiveShadow = false;
hero.position.y = 2;
scene.add(hero);
let planeGeometry = new THREE.PlaneGeometry(5, 5, 4, 4);
let planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
let ground = new THREE.Mesh(planeGeometry, planeMaterial);
ground.receiveShadow = true;
ground.castShadow = false;
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

camera.position.z = 5;
camera.position.y = 1;

let sun = new THREE.DirectionalLight(0xffffff, 0.8);
sun.position.set(0, 4, 1);
sun.castShadow = true;
scene.add(sun);
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
  //animate
  hero.rotation.x += 0.01;
  hero.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
