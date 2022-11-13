// add styles
import './styles/style.css';
// three.js
import * as THREE from 'three';

const OrbitControls = require('three-orbit-controls')(THREE);

import { Camera } from './controls/camera';
import { Snow } from './meshes/snow';
import { Scene } from './scene';
import { Track } from './meshes/track';
import { Hero } from './meshes/hero';
import { Gift } from './meshes/gift';
import { Forest } from './meshes/forest';
import { Controls } from './controls/controls';
import { LoadingManager } from './controls/loading-manager';
import { Hinder } from './meshes/hinder';
import { LightHinder } from './meshes/light-hinder';
import { getRandomInteger } from './utils/utils';
import { NUMBER_OF_GIFTS } from './meshes/constants';

// create the scene
const scene: Scene = Scene.getInstance();
const clock = new THREE.Clock();
clock.start();
const threeScene: THREE.Scene = scene.scene;
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setClearColor(0x000000, 0);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 7.5;
camera.position.y = 1.2;
camera.rotation.x = -0.15;

// set size
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // enable shadow
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const canvas = renderer.domElement;
// add canvas to dom
document.body.appendChild(canvas);

/***
 * Add models
 * */

const loadingmanager = new LoadingManager();

const track = new Track();
scene.addModel(track);

const hero = new Hero();
scene.addModel(hero);

const controls = new Controls(canvas, hero);

const forest = new Forest();
scene.addModel(forest);

const snow = new Snow();
scene.addModel(snow);

let gifts: Gift[] = Array.from({ length: NUMBER_OF_GIFTS }, () => new Gift());
let hinders: Hinder[] = [];
let lightHinders: LightHinder[] = [];

for (let i = 1; i < 10; i++) {
  const position = {
    x: 0,
    y: i * 30,
    z: 1,
  };
  lightHinders = [...(lightHinders || []), new LightHinder({ position })];
}

for (let i = 1; i < 10; i++) {
  const x = getRandomInteger(-1, 1);
  const y = i * 20;
  const z = 0;
  hinders = [...(hinders || []), new Hinder({ position: { x, y, z } })];
}

track.addModel(...hinders.map((h) => h.mesh));
track.addModel(...gifts.map((g) => g.mesh));
track.addModel(...lightHinders.map((l) => l.mesh));

let previouslyCollected: Gift;

/**
 * @returns the gift our hero collided with
 */
function getCollectedGift(): Gift {
  return gifts.find(
    (g) => Math.floor(g.mesh.position.y * 2) === 0 && g.mesh.position.x === hero.currentPosition && !hero.isJumbing
  );
}

function isHinderCollision(): boolean {
  // return hinders.some(
  //   (hinder) =>
  //     // Math.floor(hinder.mesh.position.y) === 0 && hinder.mesh.position.x === hero.currentPosition && !hero.isJumbing
  //     Math.floor(hinder.mesh.position.y * 2) === 0 && !hero.isJumbing
  // );
  return false;
}

// Orbit

let orbitControl = new OrbitControls(camera, renderer.domElement); //helper to rotate around in scene
orbitControl.addEventListener('change', render);
orbitControl.enableDamping = true;
orbitControl.dampingFactor = 0.8;
orbitControl.enableZoom = true;

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
  if (!controls.isPlaying || !controls.isAlive) return;
  controls.isAlive = !isHinderCollision();
  if (!controls.isAlive) {
    controls.displayGameover();
  }

  if (scene.models) {
    scene.models.forEach((m) => {
      m.update(clock);
    });
  }

  hinders.forEach((g) => g.update());
  gifts.forEach((g) => g.update());
  lightHinders.forEach((l) => l.update());

  const collected: Gift = getCollectedGift();
  if (collected) {
    if (collected !== previouslyCollected) {
      previouslyCollected = collected;
      collected.isCollected = true;
      controls.increaseScore();
    }
  }

  renderer.render(threeScene, camera);
}

animate();
